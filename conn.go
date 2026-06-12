//go:build js

package main

import (
	"errors"
	"io"
	"net"
	"syscall/js"

	"github.com/adrianosela/tailscale-web/pkg/jsutil"
)

// newJSConn wraps a net.Conn in a JS object { write(data), onData(fn),
// onClose(fn), close() } and starts a goroutine that pumps reads back to the
// onData callback and, when the connection ends, fires onClose.
func newJSConn(conn net.Conn) js.Value {
	var onDataCb, onCloseCb js.Value
	var writeFn, onDataFn, onCloseFn, closeFn js.Func

	writeFn = js.FuncOf(func(this js.Value, args []js.Value) any {
		if len(args) > 0 {
			go conn.Write(jsutil.ToBytes(args[0]))
		}
		return nil
	})

	onDataFn = js.FuncOf(func(this js.Value, args []js.Value) any {
		if len(args) > 0 && args[0].Type() == js.TypeFunction {
			onDataCb = args[0]
		}
		return nil
	})

	// onClose registers a handler invoked once when the connection ends: null on
	// a clean EOF, or the error string on a read/write failure. Mirrors onData —
	// register it before the first write, since the connection can close at any
	// time after dial.
	onCloseFn = js.FuncOf(func(this js.Value, args []js.Value) any {
		if len(args) > 0 && args[0].Type() == js.TypeFunction {
			onCloseCb = args[0]
		}
		return nil
	})

	closeFn = js.FuncOf(func(this js.Value, args []js.Value) any {
		conn.Close()
		writeFn.Release()
		onDataFn.Release()
		onCloseFn.Release()
		closeFn.Release()
		return nil
	})

	jsConn := jsutil.NewObject()
	jsConn.Set("write", writeFn)
	jsConn.Set("onData", onDataFn)
	jsConn.Set("onClose", onCloseFn)
	jsConn.Set("close", closeFn)

	go func() {
		buf := make([]byte, 32*1024)
		for {
			n, err := conn.Read(buf)
			if n > 0 && onDataCb.Type() == js.TypeFunction {
				onDataCb.Invoke(jsutil.ToUint8Array(buf[:n]))
			}
			if err != nil {
				if onCloseCb.Type() == js.TypeFunction {
					if errors.Is(err, io.EOF) {
						onCloseCb.Invoke(js.Null())
					} else {
						onCloseCb.Invoke(js.ValueOf(err.Error()))
					}
				}
				break
			}
		}
	}()

	return jsConn
}
