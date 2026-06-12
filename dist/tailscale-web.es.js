(() => {
  const i = () => {
    const o = new Error("not implemented");
    return o.code = "ENOSYS", o;
  };
  if (!globalThis.fs) {
    let o = "";
    globalThis.fs = {
      constants: { O_WRONLY: -1, O_RDWR: -1, O_CREAT: -1, O_TRUNC: -1, O_APPEND: -1, O_EXCL: -1, O_DIRECTORY: -1 },
      // unused
      writeSync(n, s) {
        o += u.decode(s);
        const r = o.lastIndexOf(`
`);
        return r != -1 && (console.log(o.substring(0, r)), o = o.substring(r + 1)), s.length;
      },
      write(n, s, r, c, y, d) {
        if (r !== 0 || c !== s.length || y !== null) {
          d(i());
          return;
        }
        const w = this.writeSync(n, s);
        d(null, w);
      },
      chmod(n, s, r) {
        r(i());
      },
      chown(n, s, r, c) {
        c(i());
      },
      close(n, s) {
        s(i());
      },
      fchmod(n, s, r) {
        r(i());
      },
      fchown(n, s, r, c) {
        c(i());
      },
      fstat(n, s) {
        s(i());
      },
      fsync(n, s) {
        s(null);
      },
      ftruncate(n, s, r) {
        r(i());
      },
      lchown(n, s, r, c) {
        c(i());
      },
      link(n, s, r) {
        r(i());
      },
      lstat(n, s) {
        s(i());
      },
      mkdir(n, s, r) {
        r(i());
      },
      open(n, s, r, c) {
        c(i());
      },
      read(n, s, r, c, y, d) {
        d(i());
      },
      readdir(n, s) {
        s(i());
      },
      readlink(n, s) {
        s(i());
      },
      rename(n, s, r) {
        r(i());
      },
      rmdir(n, s) {
        s(i());
      },
      stat(n, s) {
        s(i());
      },
      symlink(n, s, r) {
        r(i());
      },
      truncate(n, s, r) {
        r(i());
      },
      unlink(n, s) {
        s(i());
      },
      utimes(n, s, r, c) {
        c(i());
      }
    };
  }
  if (globalThis.process || (globalThis.process = {
    getuid() {
      return -1;
    },
    getgid() {
      return -1;
    },
    geteuid() {
      return -1;
    },
    getegid() {
      return -1;
    },
    getgroups() {
      throw i();
    },
    pid: -1,
    ppid: -1,
    umask() {
      throw i();
    },
    cwd() {
      throw i();
    },
    chdir() {
      throw i();
    }
  }), globalThis.path || (globalThis.path = {
    resolve(...o) {
      return o.join("/");
    }
  }), !globalThis.crypto)
    throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");
  if (!globalThis.performance)
    throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");
  if (!globalThis.TextEncoder)
    throw new Error("globalThis.TextEncoder is not available, polyfill required");
  if (!globalThis.TextDecoder)
    throw new Error("globalThis.TextDecoder is not available, polyfill required");
  const h = new TextEncoder("utf-8"), u = new TextDecoder("utf-8");
  globalThis.Go = class {
    constructor() {
      this.argv = ["js"], this.env = {}, this.exit = (t) => {
        t !== 0 && console.warn("exit code:", t);
      }, this._exitPromise = new Promise((t) => {
        this._resolveExitPromise = t;
      }), this._pendingEvent = null, this._scheduledTimeouts = /* @__PURE__ */ new Map(), this._nextCallbackTimeoutID = 1;
      const o = (t, e) => {
        this.mem.setUint32(t + 0, e, !0), this.mem.setUint32(t + 4, Math.floor(e / 4294967296), !0);
      }, n = (t) => {
        const e = this.mem.getUint32(t + 0, !0), l = this.mem.getInt32(t + 4, !0);
        return e + l * 4294967296;
      }, s = (t) => {
        const e = this.mem.getFloat64(t, !0);
        if (e === 0)
          return;
        if (!isNaN(e))
          return e;
        const l = this.mem.getUint32(t, !0);
        return this._values[l];
      }, r = (t, e) => {
        if (typeof e == "number" && e !== 0) {
          if (isNaN(e)) {
            this.mem.setUint32(t + 4, 2146959360, !0), this.mem.setUint32(t, 0, !0);
            return;
          }
          this.mem.setFloat64(t, e, !0);
          return;
        }
        if (e === void 0) {
          this.mem.setFloat64(t, 0, !0);
          return;
        }
        let a = this._ids.get(e);
        a === void 0 && (a = this._idPool.pop(), a === void 0 && (a = this._values.length), this._values[a] = e, this._goRefCounts[a] = 0, this._ids.set(e, a)), this._goRefCounts[a]++;
        let f = 0;
        switch (typeof e) {
          case "object":
            e !== null && (f = 1);
            break;
          case "string":
            f = 2;
            break;
          case "symbol":
            f = 3;
            break;
          case "function":
            f = 4;
            break;
        }
        this.mem.setUint32(t + 4, 2146959360 | f, !0), this.mem.setUint32(t, a, !0);
      }, c = (t) => {
        const e = n(t + 0), l = n(t + 8);
        return new Uint8Array(this._inst.exports.mem.buffer, e, l);
      }, y = (t) => {
        const e = n(t + 0), l = n(t + 8), a = new Array(l);
        for (let f = 0; f < l; f++)
          a[f] = s(e + f * 8);
        return a;
      }, d = (t) => {
        const e = n(t + 0), l = n(t + 8);
        return u.decode(new DataView(this._inst.exports.mem.buffer, e, l));
      }, w = (t, e) => (this._inst.exports.testExport0(), this._inst.exports.testExport(t, e)), g = Date.now() - performance.now();
      this.importObject = {
        _gotest: {
          add: (t, e) => t + e,
          callExport: w
        },
        gojs: {
          // Go's SP does not change as long as no Go code is running. Some operations (e.g. calls, getters and setters)
          // may synchronously trigger a Go event handler. This makes Go code get executed in the middle of the imported
          // function. A goroutine can switch to a new stack if the current stack is too small (see morestack function).
          // This changes the SP, thus we have to update the SP used by the imported function.
          // func wasmExit(code int32)
          "runtime.wasmExit": (t) => {
            t >>>= 0;
            const e = this.mem.getInt32(t + 8, !0);
            this.exited = !0, delete this._inst, delete this._values, delete this._goRefCounts, delete this._ids, delete this._idPool, this.exit(e);
          },
          // func wasmWrite(fd uintptr, p unsafe.Pointer, n int32)
          "runtime.wasmWrite": (t) => {
            t >>>= 0;
            const e = n(t + 8), l = n(t + 16), a = this.mem.getInt32(t + 24, !0);
            fs.writeSync(e, new Uint8Array(this._inst.exports.mem.buffer, l, a));
          },
          // func resetMemoryDataView()
          "runtime.resetMemoryDataView": (t) => {
            this.mem = new DataView(this._inst.exports.mem.buffer);
          },
          // func nanotime1() int64
          "runtime.nanotime1": (t) => {
            t >>>= 0, o(t + 8, (g + performance.now()) * 1e6);
          },
          // func walltime() (sec int64, nsec int32)
          "runtime.walltime": (t) => {
            t >>>= 0;
            const e = (/* @__PURE__ */ new Date()).getTime();
            o(t + 8, e / 1e3), this.mem.setInt32(t + 16, e % 1e3 * 1e6, !0);
          },
          // func scheduleTimeoutEvent(delay int64) int32
          "runtime.scheduleTimeoutEvent": (t) => {
            t >>>= 0;
            const e = this._nextCallbackTimeoutID;
            this._nextCallbackTimeoutID++, this._scheduledTimeouts.set(e, setTimeout(
              () => {
                for (this._resume(); this._scheduledTimeouts.has(e); )
                  console.warn("scheduleTimeoutEvent: missed timeout event"), this._resume();
              },
              n(t + 8)
            )), this.mem.setInt32(t + 16, e, !0);
          },
          // func clearTimeoutEvent(id int32)
          "runtime.clearTimeoutEvent": (t) => {
            t >>>= 0;
            const e = this.mem.getInt32(t + 8, !0);
            clearTimeout(this._scheduledTimeouts.get(e)), this._scheduledTimeouts.delete(e);
          },
          // func getRandomData(r []byte)
          "runtime.getRandomData": (t) => {
            t >>>= 0, crypto.getRandomValues(c(t + 8));
          },
          // func finalizeRef(v ref)
          "syscall/js.finalizeRef": (t) => {
            t >>>= 0;
            const e = this.mem.getUint32(t + 8, !0);
            if (this._goRefCounts[e]--, this._goRefCounts[e] === 0) {
              const l = this._values[e];
              this._values[e] = null, this._ids.delete(l), this._idPool.push(e);
            }
          },
          // func stringVal(value string) ref
          "syscall/js.stringVal": (t) => {
            t >>>= 0, r(t + 24, d(t + 8));
          },
          // func valueGet(v ref, p string) ref
          "syscall/js.valueGet": (t) => {
            t >>>= 0;
            const e = Reflect.get(s(t + 8), d(t + 16));
            t = this._inst.exports.getsp() >>> 0, r(t + 32, e);
          },
          // func valueSet(v ref, p string, x ref)
          "syscall/js.valueSet": (t) => {
            t >>>= 0, Reflect.set(s(t + 8), d(t + 16), s(t + 32));
          },
          // func valueDelete(v ref, p string)
          "syscall/js.valueDelete": (t) => {
            t >>>= 0, Reflect.deleteProperty(s(t + 8), d(t + 16));
          },
          // func valueIndex(v ref, i int) ref
          "syscall/js.valueIndex": (t) => {
            t >>>= 0, r(t + 24, Reflect.get(s(t + 8), n(t + 16)));
          },
          // valueSetIndex(v ref, i int, x ref)
          "syscall/js.valueSetIndex": (t) => {
            t >>>= 0, Reflect.set(s(t + 8), n(t + 16), s(t + 24));
          },
          // func valueCall(v ref, m string, args []ref) (ref, bool)
          "syscall/js.valueCall": (t) => {
            t >>>= 0;
            try {
              const e = s(t + 8), l = Reflect.get(e, d(t + 16)), a = y(t + 32), f = Reflect.apply(l, e, a);
              t = this._inst.exports.getsp() >>> 0, r(t + 56, f), this.mem.setUint8(t + 64, 1);
            } catch (e) {
              t = this._inst.exports.getsp() >>> 0, r(t + 56, e), this.mem.setUint8(t + 64, 0);
            }
          },
          // func valueInvoke(v ref, args []ref) (ref, bool)
          "syscall/js.valueInvoke": (t) => {
            t >>>= 0;
            try {
              const e = s(t + 8), l = y(t + 16), a = Reflect.apply(e, void 0, l);
              t = this._inst.exports.getsp() >>> 0, r(t + 40, a), this.mem.setUint8(t + 48, 1);
            } catch (e) {
              t = this._inst.exports.getsp() >>> 0, r(t + 40, e), this.mem.setUint8(t + 48, 0);
            }
          },
          // func valueNew(v ref, args []ref) (ref, bool)
          "syscall/js.valueNew": (t) => {
            t >>>= 0;
            try {
              const e = s(t + 8), l = y(t + 16), a = Reflect.construct(e, l);
              t = this._inst.exports.getsp() >>> 0, r(t + 40, a), this.mem.setUint8(t + 48, 1);
            } catch (e) {
              t = this._inst.exports.getsp() >>> 0, r(t + 40, e), this.mem.setUint8(t + 48, 0);
            }
          },
          // func valueLength(v ref) int
          "syscall/js.valueLength": (t) => {
            t >>>= 0, o(t + 16, parseInt(s(t + 8).length));
          },
          // valuePrepareString(v ref) (ref, int)
          "syscall/js.valuePrepareString": (t) => {
            t >>>= 0;
            const e = h.encode(String(s(t + 8)));
            r(t + 16, e), o(t + 24, e.length);
          },
          // valueLoadString(v ref, b []byte)
          "syscall/js.valueLoadString": (t) => {
            t >>>= 0;
            const e = s(t + 8);
            c(t + 16).set(e);
          },
          // func valueInstanceOf(v ref, t ref) bool
          "syscall/js.valueInstanceOf": (t) => {
            t >>>= 0, this.mem.setUint8(t + 24, s(t + 8) instanceof s(t + 16) ? 1 : 0);
          },
          // func copyBytesToGo(dst []byte, src ref) (int, bool)
          "syscall/js.copyBytesToGo": (t) => {
            t >>>= 0;
            const e = c(t + 8), l = s(t + 32);
            if (!(l instanceof Uint8Array || l instanceof Uint8ClampedArray)) {
              this.mem.setUint8(t + 48, 0);
              return;
            }
            const a = l.subarray(0, e.length);
            e.set(a), o(t + 40, a.length), this.mem.setUint8(t + 48, 1);
          },
          // func copyBytesToJS(dst ref, src []byte) (int, bool)
          "syscall/js.copyBytesToJS": (t) => {
            t >>>= 0;
            const e = s(t + 8), l = c(t + 16);
            if (!(e instanceof Uint8Array || e instanceof Uint8ClampedArray)) {
              this.mem.setUint8(t + 48, 0);
              return;
            }
            const a = l.subarray(0, e.length);
            e.set(a), o(t + 40, a.length), this.mem.setUint8(t + 48, 1);
          },
          debug: (t) => {
            console.log(t);
          }
        }
      };
    }
    async run(o) {
      if (!(o instanceof WebAssembly.Instance))
        throw new Error("Go.run: WebAssembly.Instance expected");
      this._inst = o, this.mem = new DataView(this._inst.exports.mem.buffer), this._values = [
        // JS values that Go currently has references to, indexed by reference id
        NaN,
        0,
        null,
        !0,
        !1,
        globalThis,
        this
      ], this._goRefCounts = new Array(this._values.length).fill(1 / 0), this._ids = /* @__PURE__ */ new Map([
        // mapping from JS values to reference ids
        [0, 1],
        [null, 2],
        [!0, 3],
        [!1, 4],
        [globalThis, 5],
        [this, 6]
      ]), this._idPool = [], this.exited = !1;
      let n = 4096;
      const s = (g) => {
        const t = n, e = h.encode(g + "\0");
        return new Uint8Array(this.mem.buffer, n, e.length).set(e), n += e.length, n % 8 !== 0 && (n += 8 - n % 8), t;
      }, r = this.argv.length, c = [];
      this.argv.forEach((g) => {
        c.push(s(g));
      }), c.push(0), Object.keys(this.env).sort().forEach((g) => {
        c.push(s(`${g}=${this.env[g]}`));
      }), c.push(0);
      const d = n;
      if (c.forEach((g) => {
        this.mem.setUint32(n, g, !0), this.mem.setUint32(n + 4, 0, !0), n += 8;
      }), n >= 12288)
        throw new Error("total length of command line and environment variables exceeds limit");
      this._inst.exports.run(r, d), this.exited && this._resolveExitPromise(), await this._exitPromise;
    }
    _resume() {
      if (this.exited)
        throw new Error("Go program has already exited");
      this._inst.exports.resume(), this.exited && this._resolveExitPromise();
    }
    _makeFuncWrapper(o) {
      const n = this;
      return function() {
        const s = { id: o, this: this, args: arguments };
        return n._pendingEvent = s, n._resume(), s.result;
      };
    }
  };
})();
const x = new URL("main.wasm", import.meta.url).href;
(() => {
  const i = globalThis, h = "process";
  i[h] ? i[h].pid == null && (i[h].pid = 1) : i[h] = { pid: 1 };
})();
let _ = null;
function b() {
  return _ || (_ = (async () => {
    const i = new globalThis.Go(), h = await WebAssembly.instantiateStreaming(
      fetch(x),
      i.importObject
    );
    i.run(h.instance);
  })()), _;
}
function m() {
  return globalThis.__tailscaleWeb;
}
function T(i) {
  return {
    status: i.status,
    statusText: i.statusText,
    ok: i.ok,
    headers: i.headers,
    text: async () => new TextDecoder().decode(i.body),
    json: async () => JSON.parse(new TextDecoder().decode(i.body)),
    arrayBuffer: async () => i.body.buffer,
    bytes: async () => i.body
  };
}
const p = {
  /**
   * Initialize and connect the Tailscale node. Must be called before any
   * other method. Resolves once the node is authenticated and ready.
   *
   * If the node has persisted state from a previous session it reconnects
   * automatically. Otherwise the OAuth flow is triggered via onAuthRequired.
   * Rejects if the auth URL does not arrive within 60 seconds, or if the
   * user does not complete authentication within 5 minutes.
   *
   * @example
   * await network.init({
   *   hostname: "my-app",
   *   onAuthRequired(url) {
   *     window.open(url, "_blank", "width=600,height=700")
   *   },
   *   onAuthComplete() {
   *     console.log("connected!")
   *   },
   * })
   *
   * @example
   * // Custom storage backend (e.g. sessionStorage or any key/value store)
   * await network.init({
   *   hostname: "my-app",
   *   storage: {
   *     get: key => sessionStorage.getItem(key),
   *     set: (key, val) => sessionStorage.setItem(key, val),
   *   },
   *   onAuthRequired(url) { console.log("Authenticate at:", url) },
   * })
   */
  async init(i = {}) {
    return await b(), m().init(i);
  },
  /**
   * Send an ICMP ping to addr and measure round-trip time.
   * addr may be a hostname or Tailscale IP.
   *
   * @example
   * const result = await network.ping("my-server")
   * if (result.alive) {
   *   console.log(`rtt: ${result.rttMs.toFixed(3)} ms  ip: ${result.nodeIP}`)
   * } else {
   *   console.warn("unreachable:", result.err)
   * }
   */
  async ping(i) {
    return m().ping(i);
  },
  /**
   * Open a raw TCP connection through the Tailscale network.
   * Returns a Connection object for sending and receiving data.
   *
   * @example
   * const conn = await network.dialTCP("my-server:8080")
   *
   * conn.onData(data => {
   *   console.log(new TextDecoder().decode(data))
   * })
   *
   * conn.write("hello\n")
   * conn.close()
   */
  async dialTCP(i) {
    const h = await m().dialTCP(i);
    return {
      onData(u) {
        h.onData(u);
      },
      onClose(u) {
        h.onClose(u);
      },
      write(u) {
        h.write(
          typeof u == "string" ? new TextEncoder().encode(u) : u
        );
      },
      close() {
        h.close();
      }
    };
  },
  /**
   * Listen for inbound TCP connections on the given Tailscale port.
   * Pass port 0 (default) to get an ephemeral port assigned automatically.
   * onConnection is called for each accepted connection.
   * Returns a Listener with the assigned port number and a close() method.
   *
   * @example
   * const listener = await network.listenTCP(8080, conn => {
   *   conn.onData(data => console.log(new TextDecoder().decode(data)))
   *   conn.write("hello\n")
   * })
   * console.log("listening on port", listener.port)
   *
   * @example
   * // Ephemeral port
   * const listener = await network.listenTCP(0, conn => { conn.close() })
   * console.log("assigned port:", listener.port)
   * listener.close()
   */
  async listenTCP(i = 0, h) {
    const u = await m().listenTCP(i, (o) => {
      h({
        onData(n) {
          o.onData(n);
        },
        onClose(n) {
          o.onClose(n);
        },
        write(n) {
          o.write(
            typeof n == "string" ? new TextEncoder().encode(n) : n
          );
        },
        close() {
          o.close();
        }
      });
    });
    return {
      port: u.port,
      close() {
        u.close();
      }
    };
  },
  /**
   * Make an HTTP request through the Tailscale network. Supports method,
   * headers, and body. Does not yet support AbortSignal, streaming bodies
   * or responses, or other advanced Fetch API options.
   *
   * @example
   * const resp = await network.fetch("https://internal-service/api", {
   *   method: "POST",
   *   headers: { "Content-Type": "application/json" },
   *   body: JSON.stringify({ key: "value" }),
   * })
   * console.log(resp.status, resp.ok)
   * const data = await resp.json()
   */
  async fetch(i, h = {}) {
    return T(await m().fetch(i, h));
  },
  /**
   * Return this node's Tailscale IPv4 address, or an empty string if not yet assigned.
   * Synchronous — no await needed. Must be called after init() resolves.
   */
  localIPv4() {
    return m().localIPv4();
  },
  /**
   * Return this node's Tailscale IPv6 address, or an empty string if not yet assigned.
   * Synchronous — no await needed. Must be called after init() resolves.
   */
  localIPv6() {
    return m().localIPv6();
  },
  /**
   * Return the current preferences (acceptRoutes, exitNodeId).
   * Synchronous — no await needed. Must be called after init() resolves.
   *
   * @example
   * const { acceptRoutes, exitNodeId } = network.getPrefs()
   * console.log("exit node:", exitNodeId || "(none)")
   */
  getPrefs() {
    return m().getPrefs();
  },
  /**
   * Enable or disable acceptance of subnet routes advertised by peers.
   * Equivalent to `tailscale set --accept-routes`.
   *
   * @example
   * await network.setAcceptRoutes(true)
   */
  async setAcceptRoutes(i) {
    return m().setAcceptRoutes(i);
  },
  /**
   * Return all peers that advertise exit-node capability.
   * Synchronous — no await needed. Returns an empty array if called before init() resolves.
   *
   * @example
   * const nodes = network.listExitNodes()
   * for (const n of nodes) {
   *   console.log(n.hostName, n.tailscaleIP, n.online ? "online" : "offline")
   * }
   */
  listExitNodes() {
    return Array.from(m().listExitNodes());
  },
  /**
   * Activate an exit node by its stable node ID.
   * Pass an empty string (or omit) to clear the exit node.
   *
   * @example
   * // Activate the first available online exit node
   * const node = network.listExitNodes().find(n => n.online)
   * if (node) await network.setExitNode(node.id)
   *
   * @example
   * // Clear the active exit node
   * await network.setExitNode()
   */
  async setExitNode(i = "") {
    return m().setExitNode(i);
  },
  /**
   * Return the full routing table (self + all peers).
   * Synchronous — no await needed. Returns an empty array if called before init() resolves.
   *
   * @example
   * const routes = network.getRoutes()
   * for (const r of routes) {
   *   console.log(r.prefix, "via", r.via, r.isExitRoute ? "(exit)" : "")
   * }
   */
  getRoutes() {
    return Array.from(m().getRoutes());
  },
  /**
   * Return the current Tailscale-managed DNS configuration.
   * Synchronous — no await needed. Returns an empty DNSInfo object if called before init() resolves.
   *
   * @example
   * const dns = network.getDNS()
   * console.log("resolvers:", dns.resolvers)
   * console.log("MagicDNS:", dns.magicDNS)
   * for (const [suffix, resolvers] of Object.entries(dns.routes)) {
   *   console.log(`split-DNS: ${suffix} → ${resolvers.join(", ")}`)
   * }
   */
  getDNS() {
    return m().getDNS();
  }
};
export {
  p as network
};
