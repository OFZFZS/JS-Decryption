    !function(a) {
        "use strict";
        var b, c = a.Base64, d = "2.1.8", e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", f = function(a) {
            for (var b = {}, c = 0, d = a.length; d > c; c++)
                b[a.charAt(c)] = c;
            return b
        }(e), g = String.fromCharCode, h = function(a) {
            if (a.length < 2) {
                var b = a.charCodeAt(0);
                return 128 > b ? a : 2048 > b ? g(192 | b >>> 6) + g(128 | 63 & b) : g(224 | b >>> 12 & 15) + g(128 | b >>> 6 & 63) + g(128 | 63 & b)
            }
            var b = 65536 + 1024 * (a.charCodeAt(0) - 55296) + (a.charCodeAt(1) - 56320);
            return g(240 | b >>> 18 & 7) + g(128 | b >>> 12 & 63) + g(128 | b >>> 6 & 63) + g(128 | 63 & b)
        }, i = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g, j = function(a) {
            return a.replace(i, h)
        }, k = function(a) {
            var b = [0, 2, 1][a.length % 3]
              , c = a.charCodeAt(0) << 16 | (a.length > 1 ? a.charCodeAt(1) : 0) << 8 | (a.length > 2 ? a.charCodeAt(2) : 0)
              , d = [e.charAt(c >>> 18), e.charAt(c >>> 12 & 63), b >= 2 ? "=" : e.charAt(c >>> 6 & 63), b >= 1 ? "=" : e.charAt(63 & c)];
            return d.join("")
        }, l = a.btoa ? function(b) {
            return a.btoa(b)
        }
        : function(a) {
            return a.replace(/[\s\S]{1,3}/g, k)
        }
        , m = b ? function(a) {
            return (a.constructor === b.constructor ? a : new b(a)).toString("base64")
        }
        : function(a) {
            return l(j(a))
        }
        , n = function(a, b) {
            return b ? m(String(a)).replace(/[+\/]/g, function(a) {
                return "+" == a ? "-" : "_"
            }).replace(/=/g, "") : m(String(a))
        }, o = function(a) {
            return n(a, !0)
        },  q = function(a) {
            switch (a.length) {
            case 4:
                var b = (7 & a.charCodeAt(0)) << 18 | (63 & a.charCodeAt(1)) << 12 | (63 & a.charCodeAt(2)) << 6 | 63 & a.charCodeAt(3)
                  , c = b - 65536;
                return g((c >>> 10) + 55296) + g((1023 & c) + 56320);
            case 3:
                return g((15 & a.charCodeAt(0)) << 12 | (63 & a.charCodeAt(1)) << 6 | 63 & a.charCodeAt(2));
            default:
                return g((31 & a.charCodeAt(0)) << 6 | 63 & a.charCodeAt(1))
            }
        }, r = function(a) {
            return a.replace(p, q)
        }, s = function(a) {
            var b = a.length
              , c = b % 4
              , d = (b > 0 ? f[a.charAt(0)] << 18 : 0) | (b > 1 ? f[a.charAt(1)] << 12 : 0) | (b > 2 ? f[a.charAt(2)] << 6 : 0) | (b > 3 ? f[a.charAt(3)] : 0)
              , e = [g(d >>> 16), g(d >>> 8 & 255), g(255 & d)];
            return e.length -= [0, 0, 2, 1][c],
            e.join("")
        }, t = a.atob ? function(b) {
            return a.atob(b)
        }
        : function(a) {
            return a.replace(/[\s\S]{1,4}/g, s)
        }
        , u = b ? function(a) {
            return (a.constructor === b.constructor ? a : new b(a,"base64")).toString()
        }
        : function(a) {
            return r(t(a))
        }
        , v = function(a) {
            return u(String(a).replace(/[-_]/g, function(a) {
                return "-" == a ? "+" : "/"
            }).replace(/[^A-Za-z0-9\+\/]/g, ""))
        }, w = function() {
            var b = a.Base64;
            return a.Base64 = c,
            b
        };
        if (a.Base64 = {
            VERSION: d,
            atob: t,
            btoa: l,
            fromBase64: v,
            toBase64: n,
            utob: j,
            encode: n,
            encodeURI: o,
            btou: r,
            decode: v,
            noConflict: w
        },
        "function" == typeof Object.defineProperty) {
            var x = function(a) {
                return {
                    value: a,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            };
            a.Base64.extendString = function() {
                Object.defineProperty(String.prototype, "fromBase64", x(function() {
                    return v(this)
                })),
                Object.defineProperty(String.prototype, "toBase64", x(function(a) {
                    return n(this, a)
                })),
                Object.defineProperty(String.prototype, "toBase64URI", x(function() {
                    return n(this, !0)
                }))
            }
        }
    }(this);

function base64(pwd) {
    return  Base64.encode(pwd);
}
//Not hex_md5(hex_md5('pass')) For API
