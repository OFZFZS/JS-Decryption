var navigator = {};
var window = this;
!function(t, e) {
			"function" == typeof define && define.amd ? define(["exports"], e) : e("object" == typeof exports && "string" != typeof exports.nodeName ? module.exports : t)
		}(this, function(t) {
			function e(t, e, n) {
				null  != t && ("number" == typeof t ? this.fromNumber(t, e, n) : null  == e && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, e))
			}
			function n() {
				return new e(null )
			}
			function r(t, e, n, r, i, o) {
				for (; --o >= 0; ) {
					var s = e * this[t++] + n[r] + i;
					i = Math.floor(s / 67108864),
					n[r++] = 67108863 & s
				}
				return i
			}
			function i(t, e, n, r, i, o) {
				for (var s = 32767 & e, a = e >> 15; --o >= 0; ) {
					var u = 32767 & this[t]
					  , c = this[t++] >> 15
					  , l = a * u + c * s;
					u = s * u + ((32767 & l) << 15) + n[r] + (1073741823 & i),
					i = (u >>> 30) + (l >>> 15) + a * c + (i >>> 30),
					n[r++] = 1073741823 & u
				}
				return i
			}
			function o(t, e, n, r, i, o) {
				for (var s = 16383 & e, a = e >> 14; --o >= 0; ) {
					var u = 16383 & this[t]
					  , c = this[t++] >> 14
					  , l = a * u + c * s;
					u = s * u + ((16383 & l) << 14) + n[r] + i,
					i = (u >> 28) + (l >> 14) + a * c,
					n[r++] = 268435455 & u
				}
				return i
			}
			function s(t) {
				return Ne.charAt(t)
			}
			function a(t, e) {
				var n = ke[t.charCodeAt(e)];
				return null  == n ? -1 : n
			}
			function u(t) {
				for (var e = this.t - 1; e >= 0; --e)
					t[e] = this[e];
				t.t = this.t,
				t.s = this.s
			}
			function c(t) {
				this.t = 1,
				this.s = 0 > t ? -1 : 0,
				t > 0 ? this[0] = t : -1 > t ? this[0] = t + this.DV : this.t = 0
			}
			function l(t) {
				var e = n();
				return e.fromInt(t),
				e
			}
			function h(t, n) {
				var r;
				if (16 == n)
					r = 4;
				else if (8 == n)
					r = 3;
				else if (256 == n)
					r = 8;
				else if (2 == n)
					r = 1;
				else if (32 == n)
					r = 5;
				else {
					if (4 != n)
						return void this.fromRadix(t, n);
					r = 2
				}
				this.t = 0,
				this.s = 0;
				for (var i = t.length, o = !1, s = 0; --i >= 0; ) {
					var u = 8 == r ? 255 & t[i] : a(t, i);
					0 > u ? "-" == t.charAt(i) && (o = !0) : (o = !1,
					0 == s ? this[this.t++] = u : s + r > this.DB ? (this[this.t - 1] |= (u & (1 << this.DB - s) - 1) << s,
					this[this.t++] = u >> this.DB - s) : this[this.t - 1] |= u << s,
					s += r,
					s >= this.DB && (s -= this.DB))
				}
				8 == r && 0 != (128 & t[0]) && (this.s = -1,
				s > 0 && (this[this.t - 1] |= (1 << this.DB - s) - 1 << s)),
				this.clamp(),
				o && e.ZERO.subTo(this, this)
			}
			function f() {
				for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t; )
					--this.t
			}
			function d(t) {
				if (this.s < 0)
					return "-" + this.negate().toString(t);
				var e;
				if (16 == t)
					e = 4;
				else if (8 == t)
					e = 3;
				else if (2 == t)
					e = 1;
				else if (32 == t)
					e = 5;
				else {
					if (4 != t)
						return this.toRadix(t);
					e = 2
				}
				var n, r = (1 << e) - 1, i = !1, o = "", a = this.t, u = this.DB - a * this.DB % e;
				if (a-- > 0)
					for (u < this.DB && (n = this[a] >> u) > 0 && (i = !0,
					o = s(n)); a >= 0; )
						e > u ? (n = (this[a] & (1 << u) - 1) << e - u,
						n |= this[--a] >> (u += this.DB - e)) : (n = this[a] >> (u -= e) & r,
						0 >= u && (u += this.DB,
						--a)),
						n > 0 && (i = !0),
						i && (o += s(n));
				return i ? o : "0"
			}
			function p() {
				var t = n();
				return e.ZERO.subTo(this, t),
				t
			}
			function g() {
				return this.s < 0 ? this.negate() : this
			}
			function m(t) {
				var e = this.s - t.s;
				if (0 != e)
					return e;
				var n = this.t;
				if (e = n - t.t,
				0 != e)
					return this.s < 0 ? -e : e;
				for (; --n >= 0; )
					if (0 != (e = this[n] - t[n]))
						return e;
				return 0
			}
			function y(t) {
				var e, n = 1;
				return 0 != (e = t >>> 16) && (t = e,
				n += 16),
				0 != (e = t >> 8) && (t = e,
				n += 8),
				0 != (e = t >> 4) && (t = e,
				n += 4),
				0 != (e = t >> 2) && (t = e,
				n += 2),
				0 != (e = t >> 1) && (t = e,
				n += 1),
				n
			}
			function b() {
				return this.t <= 0 ? 0 : this.DB * (this.t - 1) + y(this[this.t - 1] ^ this.s & this.DM)
			}
			function x(t, e) {
				var n;
				for (n = this.t - 1; n >= 0; --n)
					e[n + t] = this[n];
				for (n = t - 1; n >= 0; --n)
					e[n] = 0;
				e.t = this.t + t,
				e.s = this.s
			}
			function w(t, e) {
				for (var n = t; n < this.t; ++n)
					e[n - t] = this[n];
				e.t = Math.max(this.t - t, 0),
				e.s = this.s
			}
			function T(t, e) {
				var n, r = t % this.DB, i = this.DB - r, o = (1 << i) - 1, s = Math.floor(t / this.DB), a = this.s << r & this.DM;
				for (n = this.t - 1; n >= 0; --n)
					e[n + s + 1] = this[n] >> i | a,
					a = (this[n] & o) << r;
				for (n = s - 1; n >= 0; --n)
					e[n] = 0;
				e[s] = a,
				e.t = this.t + s + 1,
				e.s = this.s,
				e.clamp()
			}
			function S(t, e) {
				e.s = this.s;
				var n = Math.floor(t / this.DB);
				if (n >= this.t)
					return void (e.t = 0);
				var r = t % this.DB
				  , i = this.DB - r
				  , o = (1 << r) - 1;
				e[0] = this[n] >> r;
				for (var s = n + 1; s < this.t; ++s)
					e[s - n - 1] |= (this[s] & o) << i,
					e[s - n] = this[s] >> r;
				r > 0 && (e[this.t - n - 1] |= (this.s & o) << i),
				e.t = this.t - n,
				e.clamp()
			}
			function E(t, e) {
				for (var n = 0, r = 0, i = Math.min(t.t, this.t); i > n; )
					r += this[n] - t[n],
					e[n++] = r & this.DM,
					r >>= this.DB;
				if (t.t < this.t) {
					for (r -= t.s; n < this.t; )
						r += this[n],
						e[n++] = r & this.DM,
						r >>= this.DB;
					r += this.s
				} else {
					for (r += this.s; n < t.t; )
						r -= t[n],
						e[n++] = r & this.DM,
						r >>= this.DB;
					r -= t.s
				}
				e.s = 0 > r ? -1 : 0,
				-1 > r ? e[n++] = this.DV + r : r > 0 && (e[n++] = r),
				e.t = n,
				e.clamp()
			}
			function C(t, n) {
				var r = this.abs()
				  , i = t.abs()
				  , o = r.t;
				for (n.t = o + i.t; --o >= 0; )
					n[o] = 0;
				for (o = 0; o < i.t; ++o)
					n[o + r.t] = r.am(0, i[o], n, o, 0, r.t);
				n.s = 0,
				n.clamp(),
				this.s != t.s && e.ZERO.subTo(n, n)
			}
			function D(t) {
				for (var e = this.abs(), n = t.t = 2 * e.t; --n >= 0; )
					t[n] = 0;
				for (n = 0; n < e.t - 1; ++n) {
					var r = e.am(n, e[n], t, 2 * n, 0, 1);
					(t[n + e.t] += e.am(n + 1, 2 * e[n], t, 2 * n + 1, r, e.t - n - 1)) >= e.DV && (t[n + e.t] -= e.DV,
					t[n + e.t + 1] = 1)
				}
				t.t > 0 && (t[t.t - 1] += e.am(n, e[n], t, 2 * n, 0, 1)),
				t.s = 0,
				t.clamp()
			}
			function N(t, r, i) {
				var o = t.abs();
				if (!(o.t <= 0)) {
					var s = this.abs();
					if (s.t < o.t)
						return null  != r && r.fromInt(0),
						void (null  != i && this.copyTo(i));
					null  == i && (i = n());
					var a = n()
					  , u = this.s
					  , c = t.s
					  , l = this.DB - y(o[o.t - 1]);
					l > 0 ? (o.lShiftTo(l, a),
					s.lShiftTo(l, i)) : (o.copyTo(a),
					s.copyTo(i));
					var h = a.t
					  , f = a[h - 1];
					if (0 != f) {
						var d = f * (1 << this.F1) + (h > 1 ? a[h - 2] >> this.F2 : 0)
						  , p = this.FV / d
						  , g = (1 << this.F1) / d
						  , m = 1 << this.F2
						  , v = i.t
						  , b = v - h
						  , x = null  == r ? n() : r;
						for (a.dlShiftTo(b, x),
						i.compareTo(x) >= 0 && (i[i.t++] = 1,
						i.subTo(x, i)),
						e.ONE.dlShiftTo(h, x),
						x.subTo(a, a); a.t < h; )
							a[a.t++] = 0;
						for (; --b >= 0; ) {
							var w = i[--v] == f ? this.DM : Math.floor(i[v] * p + (i[v - 1] + m) * g);
							if ((i[v] += a.am(0, w, i, b, 0, h)) < w)
								for (a.dlShiftTo(b, x),
								i.subTo(x, i); i[v] < --w; )
									i.subTo(x, i)
						}
						null  != r && (i.drShiftTo(h, r),
						u != c && e.ZERO.subTo(r, r)),
						i.t = h,
						i.clamp(),
						l > 0 && i.rShiftTo(l, i),
						0 > u && e.ZERO.subTo(i, i)
					}
				}
			}
			function k(t) {
				var r = n();
				return this.abs().divRemTo(t, null , r),
				this.s < 0 && r.compareTo(e.ZERO) > 0 && t.subTo(r, r),
				r
			}
			function R(t) {
				this.m = t
			}
			function A(t) {
				return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t
			}
			function O(t) {
				return t
			}
			function B(t) {
				t.divRemTo(this.m, null , t)
			}
			function L(t, e, n) {
				t.multiplyTo(e, n),
				this.reduce(n)
			}
			function M(t, e) {
				t.squareTo(e),
				this.reduce(e)
			}
			function j() {
				if (this.t < 1)
					return 0;
				var t = this[0];
				if (0 == (1 & t))
					return 0;
				var e = 3 & t;
				return e = e * (2 - (15 & t) * e) & 15,
				e = e * (2 - (255 & t) * e) & 255,
				e = e * (2 - ((65535 & t) * e & 65535)) & 65535,
				e = e * (2 - t * e % this.DV) % this.DV,
				e > 0 ? this.DV - e : -e
			}
			function I(t) {
				this.m = t,
				this.mp = t.invDigit(),
				this.mpl = 32767 & this.mp,
				this.mph = this.mp >> 15,
				this.um = (1 << t.DB - 15) - 1,
				this.mt2 = 2 * t.t
			}
			function H(t) {
				var r = n();
				return t.abs().dlShiftTo(this.m.t, r),
				r.divRemTo(this.m, null , r),
				t.s < 0 && r.compareTo(e.ZERO) > 0 && this.m.subTo(r, r),
				r
			}
			function q(t) {
				var e = n();
				return t.copyTo(e),
				this.reduce(e),
				e
			}
			function P(t) {
				for (; t.t <= this.mt2; )
					t[t.t++] = 0;
				for (var e = 0; e < this.m.t; ++e) {
					var n = 32767 & t[e]
					  , r = n * this.mpl + ((n * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;
					for (n = e + this.m.t,
					t[n] += this.m.am(0, r, t, e, 0, this.m.t); t[n] >= t.DV; )
						t[n] -= t.DV,
						t[++n]++
				}
				t.clamp(),
				t.drShiftTo(this.m.t, t),
				t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
			}
			function $(t, e) {
				t.squareTo(e),
				this.reduce(e)
			}
			function U(t, e, n) {
				t.multiplyTo(e, n),
				this.reduce(n)
			}
			function K() {
				return 0 == (this.t > 0 ? 1 & this[0] : this.s)
			}
			function V(t, r) {
				if (t > 4294967295 || 1 > t)
					return e.ONE;
				var i = n()
				  , o = n()
				  , s = r.convert(this)
				  , a = y(t) - 1;
				for (s.copyTo(i); --a >= 0; )
					if (r.sqrTo(i, o),
					(t & 1 << a) > 0)
						r.mulTo(o, s, i);
					else {
						var u = i;
						i = o,
						o = u
					}
				return r.revert(i)
			}
			function _(t, e) {
				var n;
				return n = 256 > t || e.isEven() ? new R(e) : new I(e),
				this.exp(t, n)
			}
			function F() {
				var t = n();
				return this.copyTo(t),
				t
			}
			function J() {
				if (this.s < 0) {
					if (1 == this.t)
						return this[0] - this.DV;
					if (0 == this.t)
						return -1
				} else {
					if (1 == this.t)
						return this[0];
					if (0 == this.t)
						return 0
				}
				return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
			}
			function W() {
				return 0 == this.t ? this.s : this[0] << 24 >> 24
			}
			function z() {
				return 0 == this.t ? this.s : this[0] << 16 >> 16
			}
			function X(t) {
				return Math.floor(Math.LN2 * this.DB / Math.log(t))
			}
			function Q() {
				return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
			}
			function G(t) {
				if (null  == t && (t = 10),
				0 == this.signum() || 2 > t || t > 36)
					return "0";
				var e = this.chunkSize(t)
				  , r = Math.pow(t, e)
				  , i = l(r)
				  , o = n()
				  , s = n()
				  , a = "";
				for (this.divRemTo(i, o, s); o.signum() > 0; )
					a = (r + s.intValue()).toString(t).substr(1) + a,
					o.divRemTo(i, o, s);
				return s.intValue().toString(t) + a
			}
			function Z(t, n) {
				this.fromInt(0),
				null  == n && (n = 10);
				for (var r = this.chunkSize(n), i = Math.pow(n, r), o = !1, s = 0, u = 0, c = 0; c < t.length; ++c) {
					var l = a(t, c);
					0 > l ? "-" == t.charAt(c) && 0 == this.signum() && (o = !0) : (u = n * u + l,
					++s >= r && (this.dMultiply(i),
					this.dAddOffset(u, 0),
					s = 0,
					u = 0))
				}
				s > 0 && (this.dMultiply(Math.pow(n, s)),
				this.dAddOffset(u, 0)),
				o && e.ZERO.subTo(this, this)
			}
			function Y(t, n, r) {
				if ("number" == typeof n)
					if (2 > t)
						this.fromInt(1);
					else
						for (this.fromNumber(t, r),
						this.testBit(t - 1) || this.bitwiseTo(e.ONE.shiftLeft(t - 1), at, this),
						this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(n); )
							this.dAddOffset(2, 0),
							this.bitLength() > t && this.subTo(e.ONE.shiftLeft(t - 1), this);
				else {
					var i = new Array
					  , o = 7 & t;
					i.length = (t >> 3) + 1,
					n.nextBytes(i),
					o > 0 ? i[0] &= (1 << o) - 1 : i[0] = 0,
					this.fromString(i, 256)
				}
			}
			function tt() {
				var t = this.t
				  , e = new Array;
				e[0] = this.s;
				var n, r = this.DB - t * this.DB % 8, i = 0;
				if (t-- > 0)
					for (r < this.DB && (n = this[t] >> r) != (this.s & this.DM) >> r && (e[i++] = n | this.s << this.DB - r); t >= 0; )
						8 > r ? (n = (this[t] & (1 << r) - 1) << 8 - r,
						n |= this[--t] >> (r += this.DB - 8)) : (n = this[t] >> (r -= 8) & 255,
						0 >= r && (r += this.DB,
						--t)),
						0 != (128 & n) && (n |= -256),
						0 == i && (128 & this.s) != (128 & n) && ++i,
						(i > 0 || n != this.s) && (e[i++] = n);
				return e
			}
			function et(t) {
				return 0 == this.compareTo(t)
			}
			function nt(t) {
				return this.compareTo(t) < 0 ? this : t
			}
			function rt(t) {
				return this.compareTo(t) > 0 ? this : t
			}
			function it(t, e, n) {
				var r, i, o = Math.min(t.t, this.t);
				for (r = 0; o > r; ++r)
					n[r] = e(this[r], t[r]);
				if (t.t < this.t) {
					for (i = t.s & this.DM,
					r = o; r < this.t; ++r)
						n[r] = e(this[r], i);
					n.t = this.t
				} else {
					for (i = this.s & this.DM,
					r = o; r < t.t; ++r)
						n[r] = e(i, t[r]);
					n.t = t.t
				}
				n.s = e(this.s, t.s),
				n.clamp()
			}
			function ot(t, e) {
				return t & e
			}
			function st(t) {
				var e = n();
				return this.bitwiseTo(t, ot, e),
				e
			}
			function at(t, e) {
				return t | e
			}
			function ut(t) {
				var e = n();
				return this.bitwiseTo(t, at, e),
				e
			}
			function ct(t, e) {
				return t ^ e
			}
			function lt(t) {
				var e = n();
				return this.bitwiseTo(t, ct, e),
				e
			}
			function ht(t, e) {
				return t & ~e
			}
			function ft(t) {
				var e = n();
				return this.bitwiseTo(t, ht, e),
				e
			}
			function dt() {
				for (var t = n(), e = 0; e < this.t; ++e)
					t[e] = this.DM & ~this[e];
				return t.t = this.t,
				t.s = ~this.s,
				t
			}
			function pt(t) {
				var e = n();
				return 0 > t ? this.rShiftTo(-t, e) : this.lShiftTo(t, e),
				e
			}
			function gt(t) {
				var e = n();
				return 0 > t ? this.lShiftTo(-t, e) : this.rShiftTo(t, e),
				e
			}
			function mt(t) {
				if (0 == t)
					return -1;
				var e = 0;
				return 0 == (65535 & t) && (t >>= 16,
				e += 16),
				0 == (255 & t) && (t >>= 8,
				e += 8),
				0 == (15 & t) && (t >>= 4,
				e += 4),
				0 == (3 & t) && (t >>= 2,
				e += 2),
				0 == (1 & t) && ++e,
				e
			}
			function vt() {
				for (var t = 0; t < this.t; ++t)
					if (0 != this[t])
						return t * this.DB + mt(this[t]);
				return this.s < 0 ? this.t * this.DB : -1
			}
			function yt(t) {
				for (var e = 0; 0 != t; )
					t &= t - 1,
					++e;
				return e
			}
			function bt() {
				for (var t = 0, e = this.s & this.DM, n = 0; n < this.t; ++n)
					t += yt(this[n] ^ e);
				return t
			}
			function xt(t) {
				var e = Math.floor(t / this.DB);
				return e >= this.t ? 0 != this.s : 0 != (this[e] & 1 << t % this.DB)
			}
			function wt(t, n) {
				var r = e.ONE.shiftLeft(t);
				return this.bitwiseTo(r, n, r),
				r
			}
			function Tt(t) {
				return this.changeBit(t, at)
			}
			function St(t) {
				return this.changeBit(t, ht)
			}
			function Et(t) {
				return this.changeBit(t, ct)
			}
			function Ct(t, e) {
				for (var n = 0, r = 0, i = Math.min(t.t, this.t); i > n; )
					r += this[n] + t[n],
					e[n++] = r & this.DM,
					r >>= this.DB;
				if (t.t < this.t) {
					for (r += t.s; n < this.t; )
						r += this[n],
						e[n++] = r & this.DM,
						r >>= this.DB;
					r += this.s
				} else {
					for (r += this.s; n < t.t; )
						r += t[n],
						e[n++] = r & this.DM,
						r >>= this.DB;
					r += t.s
				}
				e.s = 0 > r ? -1 : 0,
				r > 0 ? e[n++] = r : -1 > r && (e[n++] = this.DV + r),
				e.t = n,
				e.clamp()
			}
			function Dt(t) {
				var e = n();
				return this.addTo(t, e),
				e
			}
			function Nt(t) {
				var e = n();
				return this.subTo(t, e),
				e
			}
			function kt(t) {
				var e = n();
				return this.multiplyTo(t, e),
				e
			}
			function Rt() {
				var t = n();
				return this.squareTo(t),
				t
			}
			function At(t) {
				var e = n();
				return this.divRemTo(t, e, null ),
				e
			}
			function Ot(t) {
				var e = n();
				return this.divRemTo(t, null , e),
				e
			}
			function Bt(t) {
				var e = n()
				  , r = n();
				return this.divRemTo(t, e, r),
				new Array(e,r)
			}
			function Lt(t) {
				this[this.t] = this.am(0, t - 1, this, 0, 0, this.t),
				++this.t,
				this.clamp()
			}
			function Mt(t, e) {
				if (0 != t) {
					for (; this.t <= e; )
						this[this.t++] = 0;
					for (this[e] += t; this[e] >= this.DV; )
						this[e] -= this.DV,
						++e >= this.t && (this[this.t++] = 0),
						++this[e]
				}
			}
			function jt() {}
			function It(t) {
				return t
			}
			function Ht(t, e, n) {
				t.multiplyTo(e, n)
			}
			function qt(t, e) {
				t.squareTo(e)
			}
			function Pt(t) {
				return this.exp(t, new jt)
			}
			function $t(t, e, n) {
				var r = Math.min(this.t + t.t, e);
				for (n.s = 0,
				n.t = r; r > 0; )
					n[--r] = 0;
				var i;
				for (i = n.t - this.t; i > r; ++r)
					n[r + this.t] = this.am(0, t[r], n, r, 0, this.t);
				for (i = Math.min(t.t, e); i > r; ++r)
					this.am(0, t[r], n, r, 0, e - r);
				n.clamp()
			}
			function Ut(t, e, n) {
				--e;
				var r = n.t = this.t + t.t - e;
				for (n.s = 0; --r >= 0; )
					n[r] = 0;
				for (r = Math.max(e - this.t, 0); r < t.t; ++r)
					n[this.t + r - e] = this.am(e - r, t[r], n, 0, 0, this.t + r - e);
				n.clamp(),
				n.drShiftTo(1, n)
			}
			function Kt(t) {
				this.r2 = n(),
				this.q3 = n(),
				e.ONE.dlShiftTo(2 * t.t, this.r2),
				this.mu = this.r2.divide(t),
				this.m = t
			}
			function Vt(t) {
				if (t.s < 0 || t.t > 2 * this.m.t)
					return t.mod(this.m);
				if (t.compareTo(this.m) < 0)
					return t;
				var e = n();
				return t.copyTo(e),
				this.reduce(e),
				e
			}
			function _t(t) {
				return t
			}
			function Ft(t) {
				for (t.drShiftTo(this.m.t - 1, this.r2),
				t.t > this.m.t + 1 && (t.t = this.m.t + 1,
				t.clamp()),
				this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3),
				this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); t.compareTo(this.r2) < 0; )
					t.dAddOffset(1, this.m.t + 1);
				for (t.subTo(this.r2, t); t.compareTo(this.m) >= 0; )
					t.subTo(this.m, t)
			}
			function Jt(t, e) {
				t.squareTo(e),
				this.reduce(e)
			}
			function Wt(t, e, n) {
				t.multiplyTo(e, n),
				this.reduce(n)
			}
			function zt(t, e) {
				var r, i, o = t.bitLength(), s = l(1);
				if (0 >= o)
					return s;
				r = 18 > o ? 1 : 48 > o ? 3 : 144 > o ? 4 : 768 > o ? 5 : 6,
				i = 8 > o ? new R(e) : e.isEven() ? new Kt(e) : new I(e);
				var a = new Array
				  , u = 3
				  , c = r - 1
				  , h = (1 << r) - 1;
				if (a[1] = i.convert(this),
				r > 1) {
					var f = n();
					for (i.sqrTo(a[1], f); h >= u; )
						a[u] = n(),
						i.mulTo(f, a[u - 2], a[u]),
						u += 2
				}
				var d, p, g = t.t - 1, m = !0, v = n();
				for (o = y(t[g]) - 1; g >= 0; ) {
					for (o >= c ? d = t[g] >> o - c & h : (d = (t[g] & (1 << o + 1) - 1) << c - o,
					g > 0 && (d |= t[g - 1] >> this.DB + o - c)),
					u = r; 0 == (1 & d); )
						d >>= 1,
						--u;
					if ((o -= u) < 0 && (o += this.DB,
					--g),
					m)
						a[d].copyTo(s),
						m = !1;
					else {
						for (; u > 1; )
							i.sqrTo(s, v),
							i.sqrTo(v, s),
							u -= 2;
						u > 0 ? i.sqrTo(s, v) : (p = s,
						s = v,
						v = p),
						i.mulTo(v, a[d], s)
					}
					for (; g >= 0 && 0 == (t[g] & 1 << o); )
						i.sqrTo(s, v),
						p = s,
						s = v,
						v = p,
						--o < 0 && (o = this.DB - 1,
						--g)
				}
				return i.revert(s)
			}
			function Xt(t) {
				var e = this.s < 0 ? this.negate() : this.clone()
				  , n = t.s < 0 ? t.negate() : t.clone();
				if (e.compareTo(n) < 0) {
					var r = e;
					e = n,
					n = r
				}
				var i = e.getLowestSetBit()
				  , o = n.getLowestSetBit();
				if (0 > o)
					return e;
				for (o > i && (o = i),
				o > 0 && (e.rShiftTo(o, e),
				n.rShiftTo(o, n)); e.signum() > 0; )
					(i = e.getLowestSetBit()) > 0 && e.rShiftTo(i, e),
					(i = n.getLowestSetBit()) > 0 && n.rShiftTo(i, n),
					e.compareTo(n) >= 0 ? (e.subTo(n, e),
					e.rShiftTo(1, e)) : (n.subTo(e, n),
					n.rShiftTo(1, n));
				return o > 0 && n.lShiftTo(o, n),
				n
			}
			function Qt(t) {
				if (0 >= t)
					return 0;
				var e = this.DV % t
				  , n = this.s < 0 ? t - 1 : 0;
				if (this.t > 0)
					if (0 == e)
						n = this[0] % t;
					else
						for (var r = this.t - 1; r >= 0; --r)
							n = (e * n + this[r]) % t;
				return n
			}
			function Gt(t) {
				var n = t.isEven();
				if (this.isEven() && n || 0 == t.signum())
					return e.ZERO;
				for (var r = t.clone(), i = this.clone(), o = l(1), s = l(0), a = l(0), u = l(1); 0 != r.signum(); ) {
					for (; r.isEven(); )
						r.rShiftTo(1, r),
						n ? (o.isEven() && s.isEven() || (o.addTo(this, o),
						s.subTo(t, s)),
						o.rShiftTo(1, o)) : s.isEven() || s.subTo(t, s),
						s.rShiftTo(1, s);
					for (; i.isEven(); )
						i.rShiftTo(1, i),
						n ? (a.isEven() && u.isEven() || (a.addTo(this, a),
						u.subTo(t, u)),
						a.rShiftTo(1, a)) : u.isEven() || u.subTo(t, u),
						u.rShiftTo(1, u);
					r.compareTo(i) >= 0 ? (r.subTo(i, r),
					n && o.subTo(a, o),
					s.subTo(u, s)) : (i.subTo(r, i),
					n && a.subTo(o, a),
					u.subTo(s, u))
				}
				return 0 != i.compareTo(e.ONE) ? e.ZERO : u.compareTo(t) >= 0 ? u.subtract(t) : u.signum() < 0 ? (u.addTo(t, u),
				u.signum() < 0 ? u.add(t) : u) : u
			}
			function Zt(t) {
				var e, n = this.abs();
				if (1 == n.t && n[0] <= Re[Re.length - 1]) {
					for (e = 0; e < Re.length; ++e)
						if (n[0] == Re[e])
							return !0;
					return !1
				}
				if (n.isEven())
					return !1;
				for (e = 1; e < Re.length; ) {
					for (var r = Re[e], i = e + 1; i < Re.length && Ae > r; )
						r *= Re[i++];
					for (r = n.modInt(r); i > e; )
						if (r % Re[e++] == 0)
							return !1
				}
				return n.millerRabin(t)
			}
			function Yt(t) {
				var r = this.subtract(e.ONE)
				  , i = r.getLowestSetBit();
				if (0 >= i)
					return !1;
				var o = r.shiftRight(i);
				t = t + 1 >> 1,
				t > Re.length && (t = Re.length);
				for (var s = n(), a = 0; t > a; ++a) {
					s.fromInt(Re[Math.floor(Math.random() * Re.length)]);
					var u = s.modPow(o, this);
					if (0 != u.compareTo(e.ONE) && 0 != u.compareTo(r)) {
						for (var c = 1; c++ < i && 0 != u.compareTo(r); )
							if (u = u.modPowInt(2, this),
							0 == u.compareTo(e.ONE))
								return !1;
						if (0 != u.compareTo(r))
							return !1
					}
				}
				return !0
			}
			function te() {
				this.i = 0,
				this.j = 0,
				this.S = new Array
			}
			function ee(t) {
				var e, n, r;
				for (e = 0; 256 > e; ++e)
					this.S[e] = e;
				for (n = 0,
				e = 0; 256 > e; ++e)
					n = n + this.S[e] + t[e % t.length] & 255,
					r = this.S[e],
					this.S[e] = this.S[n],
					this.S[n] = r;
				this.i = 0,
				this.j = 0
			}
			function ne() {
				var t;
				return this.i = this.i + 1 & 255,
				this.j = this.j + this.S[this.i] & 255,
				t = this.S[this.i],
				this.S[this.i] = this.S[this.j],
				this.S[this.j] = t,
				this.S[t + this.S[this.i] & 255]
			}
			function re() {
				return new te
			}
			function ie() {
				if (null  == Oe) {
					for (Oe = re(); Me > Le; ) {
						var t = Math.floor(65536 * Math.random());
						Be[Le++] = 255 & t
					}
					for (Oe.init(Be),
					Le = 0; Le < Be.length; ++Le)
						Be[Le] = 0;
					Le = 0
				}
				return Oe.next()
			}
			function oe(t) {
				var e;
				for (e = 0; e < t.length; ++e)
					t[e] = ie()
			}
			function se() {}
			function ae(t, n) {
				return new e(t,n)
			}
			function ue(t, n) {
				if (n < t.length + 11)
					return console.error("Message too long for RSA"),
					null ;
				for (var r = new Array, i = t.length - 1; i >= 0 && n > 0; ) {
					var o = t.charCodeAt(i--);
					128 > o ? r[--n] = o : o > 127 && 2048 > o ? (r[--n] = 63 & o | 128,
					r[--n] = o >> 6 | 192) : (r[--n] = 63 & o | 128,
					r[--n] = o >> 6 & 63 | 128,
					r[--n] = o >> 12 | 224)
				}
				r[--n] = 0;
				for (var s = new se, a = new Array; n > 2; ) {
					for (a[0] = 0; 0 == a[0]; )
						s.nextBytes(a);
					r[--n] = a[0]
				}
				return r[--n] = 2,
				r[--n] = 0,
				new e(r)
			}
			function ce() {
				this.n = null ,
				this.e = 0,
				this.d = null ,
				this.p = null ,
				this.q = null ,
				this.dmp1 = null ,
				this.dmq1 = null ,
				this.coeff = null 
			}
			function le(t, e) {
				null  != t && null  != e && t.length > 0 && e.length > 0 ? (this.n = ae(t, 16),
				this.e = parseInt(e, 16)) : console.error("Invalid RSA public key")
			}
			function he(t) {
				return t.modPowInt(this.e, this.n)
			}
			function fe(t) {
				var e = ue(t, this.n.bitLength() + 7 >> 3);
				if (null  == e)
					return null ;
				var n = this.doPublic(e);
				if (null  == n)
					return null ;
				var r = n.toString(16);
				return 0 == (1 & r.length) ? r : "0" + r
			}
			function de(t, e) {
				for (var n = t.toByteArray(), r = 0; r < n.length && 0 == n[r]; )
					++r;
				if (n.length - r != e - 1 || 2 != n[r])
					return null ;
				for (++r; 0 != n[r]; )
					if (++r >= n.length)
						return null ;
				for (var i = ""; ++r < n.length; ) {
					var o = 255 & n[r];
					128 > o ? i += String.fromCharCode(o) : o > 191 && 224 > o ? (i += String.fromCharCode((31 & o) << 6 | 63 & n[r + 1]),
					++r) : (i += String.fromCharCode((15 & o) << 12 | (63 & n[r + 1]) << 6 | 63 & n[r + 2]),
					r += 2)
				}
				return i
			}
			function pe(t, e, n) {
				null  != t && null  != e && t.length > 0 && e.length > 0 ? (this.n = ae(t, 16),
				this.e = parseInt(e, 16),
				this.d = ae(n, 16)) : console.error("Invalid RSA private key")
			}
			function ge(t, e, n, r, i, o, s, a) {
				null  != t && null  != e && t.length > 0 && e.length > 0 ? (this.n = ae(t, 16),
				this.e = parseInt(e, 16),
				this.d = ae(n, 16),
				this.p = ae(r, 16),
				this.q = ae(i, 16),
				this.dmp1 = ae(o, 16),
				this.dmq1 = ae(s, 16),
				this.coeff = ae(a, 16)) : console.error("Invalid RSA private key")
			}
			function me(t, n) {
				var r = new se
				  , i = t >> 1;
				this.e = parseInt(n, 16);
				for (var o = new e(n,16); ; ) {
					for (; this.p = new e(t - i,1,r),
					0 != this.p.subtract(e.ONE).gcd(o).compareTo(e.ONE) || !this.p.isProbablePrime(10); )
						;
					for (; this.q = new e(i,1,r),
					0 != this.q.subtract(e.ONE).gcd(o).compareTo(e.ONE) || !this.q.isProbablePrime(10); )
						;
					if (this.p.compareTo(this.q) <= 0) {
						var s = this.p;
						this.p = this.q,
						this.q = s
					}
					var a = this.p.subtract(e.ONE)
					  , u = this.q.subtract(e.ONE)
					  , c = a.multiply(u);
					if (0 == c.gcd(o).compareTo(e.ONE)) {
						this.n = this.p.multiply(this.q),
						this.d = o.modInverse(c),
						this.dmp1 = this.d.mod(a),
						this.dmq1 = this.d.mod(u),
						this.coeff = this.q.modInverse(this.p);
						break
					}
				}
			}
			function ve(t) {
				if (null  == this.p || null  == this.q)
					return t.modPow(this.d, this.n);
				for (var e = t.mod(this.p).modPow(this.dmp1, this.p), n = t.mod(this.q).modPow(this.dmq1, this.q); e.compareTo(n) < 0; )
					e = e.add(this.p);
				return e.subtract(n).multiply(this.coeff).mod(this.p).multiply(this.q).add(n)
			}
			function ye(t) {
				var e = ae(t, 16)
				  , n = this.doPrivate(e);
				return null  == n ? null  : de(n, this.n.bitLength() + 7 >> 3)
			}
			function be(t) {
				var e, n, r = "";
				for (e = 0; e + 3 <= t.length; e += 3)
					n = parseInt(t.substring(e, e + 3), 16),
					r += qe.charAt(n >> 6) + qe.charAt(63 & n);
				for (e + 1 == t.length ? (n = parseInt(t.substring(e, e + 1), 16),
				r += qe.charAt(n << 2)) : e + 2 == t.length && (n = parseInt(t.substring(e, e + 2), 16),
				r += qe.charAt(n >> 2) + qe.charAt((3 & n) << 4)); (3 & r.length) > 0; )
					r += Pe;
				return r
			}
			function xe(t) {
				var e, n, r = "", i = 0;
				for (e = 0; e < t.length && t.charAt(e) != Pe; ++e)
					v = qe.indexOf(t.charAt(e)),
					v < 0 || (0 == i ? (r += s(v >> 2),
					n = 3 & v,
					i = 1) : 1 == i ? (r += s(n << 2 | v >> 4),
					n = 15 & v,
					i = 2) : 2 == i ? (r += s(n),
					r += s(v >> 2),
					n = 3 & v,
					i = 3) : (r += s(n << 2 | v >> 4),
					r += s(15 & v),
					i = 0));
				return 1 == i && (r += s(n << 2)),
				r
			}
			var we, Te = 0xdeadbeefcafe, Se = 15715070 == (16777215 & Te);
			Se && "Microsoft Internet Explorer" == navigator.appName ? (e.prototype.am = i,
			we = 30) : Se && "Netscape" != navigator.appName ? (e.prototype.am = r,
			we = 26) : (e.prototype.am = o,
			we = 28),
			e.prototype.DB = we,
			e.prototype.DM = (1 << we) - 1,
			e.prototype.DV = 1 << we;
			var Ee = 52;
			e.prototype.FV = Math.pow(2, Ee),
			e.prototype.F1 = Ee - we,
			e.prototype.F2 = 2 * we - Ee;
			var Ce, De, Ne = "0123456789abcdefghijklmnopqrstuvwxyz", ke = new Array;
			for (Ce = "0".charCodeAt(0),
			De = 0; 9 >= De; ++De)
				ke[Ce++] = De;
			for (Ce = "a".charCodeAt(0),
			De = 10; 36 > De; ++De)
				ke[Ce++] = De;
			for (Ce = "A".charCodeAt(0),
			De = 10; 36 > De; ++De)
				ke[Ce++] = De;
			R.prototype.convert = A,
			R.prototype.revert = O,
			R.prototype.reduce = B,
			R.prototype.mulTo = L,
			R.prototype.sqrTo = M,
			I.prototype.convert = H,
			I.prototype.revert = q,
			I.prototype.reduce = P,
			I.prototype.mulTo = U,
			I.prototype.sqrTo = $,
			e.prototype.copyTo = u,
			e.prototype.fromInt = c,
			e.prototype.fromString = h,
			e.prototype.clamp = f,
			e.prototype.dlShiftTo = x,
			e.prototype.drShiftTo = w,
			e.prototype.lShiftTo = T,
			e.prototype.rShiftTo = S,
			e.prototype.subTo = E,
			e.prototype.multiplyTo = C,
			e.prototype.squareTo = D,
			e.prototype.divRemTo = N,
			e.prototype.invDigit = j,
			e.prototype.isEven = K,
			e.prototype.exp = V,
			e.prototype.toString = d,
			e.prototype.negate = p,
			e.prototype.abs = g,
			e.prototype.compareTo = m,
			e.prototype.bitLength = b,
			e.prototype.mod = k,
			e.prototype.modPowInt = _,
			e.ZERO = l(0),
			e.ONE = l(1),
			jt.prototype.convert = It,
			jt.prototype.revert = It,
			jt.prototype.mulTo = Ht,
			jt.prototype.sqrTo = qt,
			Kt.prototype.convert = Vt,
			Kt.prototype.revert = _t,
			Kt.prototype.reduce = Ft,
			Kt.prototype.mulTo = Wt,
			Kt.prototype.sqrTo = Jt;
			var Re = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997]
			  , Ae = (1 << 26) / Re[Re.length - 1];
			e.prototype.chunkSize = X,
			e.prototype.toRadix = G,
			e.prototype.fromRadix = Z,
			e.prototype.fromNumber = Y,
			e.prototype.bitwiseTo = it,
			e.prototype.changeBit = wt,
			e.prototype.addTo = Ct,
			e.prototype.dMultiply = Lt,
			e.prototype.dAddOffset = Mt,
			e.prototype.multiplyLowerTo = $t,
			e.prototype.multiplyUpperTo = Ut,
			e.prototype.modInt = Qt,
			e.prototype.millerRabin = Yt,
			e.prototype.clone = F,
			e.prototype.intValue = J,
			e.prototype.byteValue = W,
			e.prototype.shortValue = z,
			e.prototype.signum = Q,
			e.prototype.toByteArray = tt,
			e.prototype.equals = et,
			e.prototype.min = nt,
			e.prototype.max = rt,
			e.prototype.and = st,
			e.prototype.or = ut,
			e.prototype.xor = lt,
			e.prototype.andNot = ft,
			e.prototype.not = dt,
			e.prototype.shiftLeft = pt,
			e.prototype.shiftRight = gt,
			e.prototype.getLowestSetBit = vt,
			e.prototype.bitCount = bt,
			e.prototype.testBit = xt,
			e.prototype.setBit = Tt,
			e.prototype.clearBit = St,
			e.prototype.flipBit = Et,
			e.prototype.add = Dt,
			e.prototype.subtract = Nt,
			e.prototype.multiply = kt,
			e.prototype.divide = At,
			e.prototype.remainder = Ot,
			e.prototype.divideAndRemainder = Bt,
			e.prototype.modPow = zt,
			e.prototype.modInverse = Gt,
			e.prototype.pow = Pt,
			e.prototype.gcd = Xt,
			e.prototype.isProbablePrime = Zt,
			e.prototype.square = Rt,
			te.prototype.init = ee,
			te.prototype.next = ne;
			var Oe, Be, Le, Me = 256;
			if (null  == Be) {
				Be = new Array,
				Le = 0;
				var je;
				if (window.crypto && window.crypto.getRandomValues) {
					var Ie = new Uint32Array(256);
					for (window.crypto.getRandomValues(Ie),
					je = 0; je < Ie.length; ++je)
						Be[Le++] = 255 & Ie[je]
				}
				var He = function(t) {
					if (this.count = this.count || 0,
					this.count >= 256 || Le >= Me)
						return void (window.removeEventListener ? window.removeEventListener("mousemove", He, !1) : window.detachEvent && window.detachEvent("onmousemove", He));
					try {
						var e = t.x + t.y;
						Be[Le++] = 255 & e,
						this.count += 1
					} catch (n) {}
				}
				;
				window.addEventListener ? window.addEventListener("mousemove", He, !1) : window.attachEvent && window.attachEvent("onmousemove", He)
			}
			se.prototype.nextBytes = oe,
			ce.prototype.doPublic = he,
			ce.prototype.setPublic = le,
			ce.prototype.encrypt = fe,
			ce.prototype.doPrivate = ve,
			ce.prototype.setPrivate = pe,
			ce.prototype.setPrivateEx = ge,
			ce.prototype.generate = me,
			ce.prototype.decrypt = ye,
			function() {
				var t = function(t, r, i) {
					var o = new se
					  , s = t >> 1;
					this.e = parseInt(r, 16);
					var a = new e(r,16)
					  , u = this
					  , c = function() {
						var r = function() {
							if (u.p.compareTo(u.q) <= 0) {
								var t = u.p;
								u.p = u.q,
								u.q = t
							}
							var n = u.p.subtract(e.ONE)
							  , r = u.q.subtract(e.ONE)
							  , o = n.multiply(r);
							0 == o.gcd(a).compareTo(e.ONE) ? (u.n = u.p.multiply(u.q),
							u.d = a.modInverse(o),
							u.dmp1 = u.d.mod(n),
							u.dmq1 = u.d.mod(r),
							u.coeff = u.q.modInverse(u.p),
							setTimeout(function() {
								i()
							}, 0)) : setTimeout(c, 0)
						}
						  , l = function() {
							u.q = n(),
							u.q.fromNumberAsync(s, 1, o, function() {
								u.q.subtract(e.ONE).gcda(a, function(t) {
									0 == t.compareTo(e.ONE) && u.q.isProbablePrime(10) ? setTimeout(r, 0) : setTimeout(l, 0)
								})
							})
						}
						  , h = function() {
							u.p = n(),
							u.p.fromNumberAsync(t - s, 1, o, function() {
								u.p.subtract(e.ONE).gcda(a, function(t) {
									0 == t.compareTo(e.ONE) && u.p.isProbablePrime(10) ? setTimeout(l, 0) : setTimeout(h, 0)
								})
							})
						}
						;
						setTimeout(h, 0)
					}
					;
					setTimeout(c, 0)
				}
				;
				ce.prototype.generateAsync = t;
				var r = function(t, e) {
					var n = this.s < 0 ? this.negate() : this.clone()
					  , r = t.s < 0 ? t.negate() : t.clone();
					if (n.compareTo(r) < 0) {
						var i = n;
						n = r,
						r = i
					}
					var o = n.getLowestSetBit()
					  , s = r.getLowestSetBit();
					if (0 > s)
						return void e(n);
					s > o && (s = o),
					s > 0 && (n.rShiftTo(s, n),
					r.rShiftTo(s, r));
					var a = function() {
						(o = n.getLowestSetBit()) > 0 && n.rShiftTo(o, n),
						(o = r.getLowestSetBit()) > 0 && r.rShiftTo(o, r),
						n.compareTo(r) >= 0 ? (n.subTo(r, n),
						n.rShiftTo(1, n)) : (r.subTo(n, r),
						r.rShiftTo(1, r)),
						n.signum() > 0 ? setTimeout(a, 0) : (s > 0 && r.lShiftTo(s, r),
						setTimeout(function() {
							e(r)
						}, 0))
					}
					;
					setTimeout(a, 10)
				}
				;
				e.prototype.gcda = r;
				var i = function(t, n, r, i) {
					if ("number" == typeof n)
						if (2 > t)
							this.fromInt(1);
						else {
							this.fromNumber(t, r),
							this.testBit(t - 1) || this.bitwiseTo(e.ONE.shiftLeft(t - 1), at, this),
							this.isEven() && this.dAddOffset(1, 0);
							var o = this
							  , s = function() {
								o.dAddOffset(2, 0),
								o.bitLength() > t && o.subTo(e.ONE.shiftLeft(t - 1), o),
								o.isProbablePrime(n) ? setTimeout(function() {
									i()
								}, 0) : setTimeout(s, 0)
							}
							;
							setTimeout(s, 0)
						}
					else {
						var a = new Array
						  , u = 7 & t;
						a.length = (t >> 3) + 1,
						n.nextBytes(a),
						u > 0 ? a[0] &= (1 << u) - 1 : a[0] = 0,
						this.fromString(a, 256)
					}
				}
				;
				e.prototype.fromNumberAsync = i
			}();
			var qe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
			  , Pe = "="
			  , $e = $e || {};
			$e.env = $e.env || {};
			var Ue = $e
			  , Ke = Object.prototype
			  , Ve = "[object Function]"
			  , _e = ["toString", "valueOf"];
			$e.env.parseUA = function(t) {
				var e, n = function(t) {
					var e = 0;
					return parseFloat(t.replace(/\./g, function() {
						return 1 == e++ ? "" : "."
					}))
				}
				, r = navigator, i = {
					ie: 0,
					opera: 0,
					gecko: 0,
					webkit: 0,
					chrome: 0,
					mobile: null ,
					air: 0,
					ipad: 0,
					iphone: 0,
					ipod: 0,
					ios: null ,
					android: 0,
					webos: 0,
					caja: r && r.cajaVersion,
					secure: !1,
					os: null 
				}, o = t || navigator && navigator.userAgent, s = window && window.location, a = s && s.href;
				return i.secure = a && 0 === a.toLowerCase().indexOf("https"),
				o && (/windows|win32/i.test(o) ? i.os = "windows" : /macintosh/i.test(o) ? i.os = "macintosh" : /rhino/i.test(o) && (i.os = "rhino"),
				/KHTML/.test(o) && (i.webkit = 1),
				e = o.match(/AppleWebKit\/([^\s]*)/),
				e && e[1] && (i.webkit = n(e[1]),
				/ Mobile\//.test(o) ? (i.mobile = "Apple",
				e = o.match(/OS ([^\s]*)/),
				e && e[1] && (e = n(e[1].replace("_", "."))),
				i.ios = e,
				i.ipad = i.ipod = i.iphone = 0,
				e = o.match(/iPad|iPod|iPhone/),
				e && e[0] && (i[e[0].toLowerCase()] = i.ios)) : (e = o.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/),
				e && (i.mobile = e[0]),
				/webOS/.test(o) && (i.mobile = "WebOS",
				e = o.match(/webOS\/([^\s]*);/),
				e && e[1] && (i.webos = n(e[1]))),
				/ Android/.test(o) && (i.mobile = "Android",
				e = o.match(/Android ([^\s]*);/),
				e && e[1] && (i.android = n(e[1])))),
				e = o.match(/Chrome\/([^\s]*)/),
				e && e[1] ? i.chrome = n(e[1]) : (e = o.match(/AdobeAIR\/([^\s]*)/),
				e && (i.air = e[0]))),
				i.webkit || (e = o.match(/Opera[\s\/]([^\s]*)/),
				e && e[1] ? (i.opera = n(e[1]),
				e = o.match(/Version\/([^\s]*)/),
				e && e[1] && (i.opera = n(e[1])),
				e = o.match(/Opera Mini[^;]*/),
				e && (i.mobile = e[0])) : (e = o.match(/MSIE\s([^;]*)/),
				e && e[1] ? i.ie = n(e[1]) : (e = o.match(/Gecko\/([^\s]*)/),
				e && (i.gecko = 1,
				e = o.match(/rv:([^\s\)]*)/),
				e && e[1] && (i.gecko = n(e[1]))))))),
				i
			}
			,
			$e.env.ua = $e.env.parseUA(),
			$e.isFunction = function(t) {
				return "function" == typeof t || Ke.toString.apply(t) === Ve
			}
			,
			$e._IEEnumFix = $e.env.ua.ie ? function(t, e) {
				var n, r, i;
				for (n = 0; n < _e.length; n += 1)
					r = _e[n],
					i = e[r],
					Ue.isFunction(i) && i != Ke[r] && (t[r] = i)
			}
			 : function() {}
			,
			$e.extend = function(t, e, n) {
				if (!e || !t)
					throw new Error("extend failed, please check that all dependencies are included.");
				var r, i = function() {}
				;
				if (i.prototype = e.prototype,
				t.prototype = new i,
				t.prototype.constructor = t,
				t.superclass = e.prototype,
				e.prototype.constructor == Ke.constructor && (e.prototype.constructor = e),
				n) {
					for (r in n)
						Ue.hasOwnProperty(n, r) && (t.prototype[r] = n[r]);
					Ue._IEEnumFix(t.prototype, n)
				}
			}
			,
			"undefined" != typeof KJUR && KJUR || (KJUR = {}),
			"undefined" != typeof KJUR.asn1 && KJUR.asn1 || (KJUR.asn1 = {}),
			KJUR.asn1.ASN1Util = new function() {
				this.integerToByteHex = function(t) {
					var e = t.toString(16);
					return e.length % 2 == 1 && (e = "0" + e),
					e
				}
				,
				this.bigIntToMinTwosComplementsHex = function(t) {
					var n = t.toString(16);
					if ("-" != n.substr(0, 1))
						n.length % 2 == 1 ? n = "0" + n : n.match(/^[0-7]/) || (n = "00" + n);
					else {
						var r = n.substr(1)
						  , i = r.length;
						i % 2 == 1 ? i += 1 : n.match(/^[0-7]/) || (i += 2);
						for (var o = "", s = 0; i > s; s++)
							o += "f";
						var a = new e(o,16)
						  , u = a.xor(t).add(e.ONE);
						n = u.toString(16).replace(/^-/, "")
					}
					return n
				}
				,
				this.getPEMStringFromHex = function(t, e) {
					var n = CryptoJS.enc.Hex.parse(t)
					  , r = CryptoJS.enc.Base64.stringify(n)
					  , i = r.replace(/(.{64})/g, "$1\r\n");
					return i = i.replace(/\r\n$/, ""),
					"-----BEGIN " + e + "-----\r\n" + i + "\r\n-----END " + e + "-----\r\n"
				}
			}
			,
			KJUR.asn1.ASN1Object = function() {
				var t = "";
				this.getLengthHexFromValue = function() {
					if ("undefined" == typeof this.hV || null  == this.hV)
						throw "this.hV is null or undefined.";
					if (this.hV.length % 2 == 1)
						throw "value hex must be even length: n=" + t.length + ",v=" + this.hV;
					var e = this.hV.length / 2
					  , n = e.toString(16);
					if (n.length % 2 == 1 && (n = "0" + n),
					128 > e)
						return n;
					var r = n.length / 2;
					if (r > 15)
						throw "ASN.1 length too long to represent by 8x: n = " + e.toString(16);
					var i = 128 + r;
					return i.toString(16) + n
				}
				,
				this.getEncodedHex = function() {
					return (null  == this.hTLV || this.isModified) && (this.hV = this.getFreshValueHex(),
					this.hL = this.getLengthHexFromValue(),
					this.hTLV = this.hT + this.hL + this.hV,
					this.isModified = !1),
					this.hTLV
				}
				,
				this.getValueHex = function() {
					return this.getEncodedHex(),
					this.hV
				}
				,
				this.getFreshValueHex = function() {
					return ""
				}
			}
			,
			KJUR.asn1.DERAbstractString = function(t) {
				KJUR.asn1.DERAbstractString.superclass.constructor.call(this),
				this.getString = function() {
					return this.s
				}
				,
				this.setString = function(t) {
					this.hTLV = null ,
					this.isModified = !0,
					this.s = t,
					this.hV = stohex(this.s)
				}
				,
				this.setStringHex = function(t) {
					this.hTLV = null ,
					this.isModified = !0,
					this.s = null ,
					this.hV = t
				}
				,
				this.getFreshValueHex = function() {
					return this.hV
				}
				,
				"undefined" != typeof t && ("undefined" != typeof t.str ? this.setString(t.str) : "undefined" != typeof t.hex && this.setStringHex(t.hex))
			}
			,
			$e.extend(KJUR.asn1.DERAbstractString, KJUR.asn1.ASN1Object),
			KJUR.asn1.DERAbstractTime = function(t) {
				KJUR.asn1.DERAbstractTime.superclass.constructor.call(this),
				this.localDateToUTC = function(t) {
					utc = t.getTime() + 6e4 * t.getTimezoneOffset();
					var e = new Date(utc);
					return e
				}
				,
				this.formatDate = function(t, e) {
					var n = this.zeroPadding
					  , r = this.localDateToUTC(t)
					  , i = String(r.getFullYear());
					"utc" == e && (i = i.substr(2, 2));
					var o = n(String(r.getMonth() + 1), 2)
					  , s = n(String(r.getDate()), 2)
					  , a = n(String(r.getHours()), 2)
					  , u = n(String(r.getMinutes()), 2)
					  , c = n(String(r.getSeconds()), 2);
					return i + o + s + a + u + c + "Z"
				}
				,
				this.zeroPadding = function(t, e) {
					return t.length >= e ? t : new Array(e - t.length + 1).join("0") + t
				}
				,
				this.getString = function() {
					return this.s
				}
				,
				this.setString = function(t) {
					this.hTLV = null ,
					this.isModified = !0,
					this.s = t,
					this.hV = stohex(this.s)
				}
				,
				this.setByDateValue = function(t, e, n, r, i, o) {
					var s = new Date(Date.UTC(t, e - 1, n, r, i, o, 0));
					this.setByDate(s)
				}
				,
				this.getFreshValueHex = function() {
					return this.hV
				}
			}
			,
			$e.extend(KJUR.asn1.DERAbstractTime, KJUR.asn1.ASN1Object),
			KJUR.asn1.DERAbstractStructured = function(t) {
				KJUR.asn1.DERAbstractString.superclass.constructor.call(this),
				this.setByASN1ObjectArray = function(t) {
					this.hTLV = null ,
					this.isModified = !0,
					this.asn1Array = t
				}
				,
				this.appendASN1Object = function(t) {
					this.hTLV = null ,
					this.isModified = !0,
					this.asn1Array.push(t)
				}
				,
				this.asn1Array = new Array,
				"undefined" != typeof t && "undefined" != typeof t.array && (this.asn1Array = t.array)
			}
			,
			$e.extend(KJUR.asn1.DERAbstractStructured, KJUR.asn1.ASN1Object),
			KJUR.asn1.DERBoolean = function() {
				KJUR.asn1.DERBoolean.superclass.constructor.call(this),
				this.hT = "01",
				this.hTLV = "0101ff"
			}
			,
			$e.extend(KJUR.asn1.DERBoolean, KJUR.asn1.ASN1Object),
			KJUR.asn1.DERInteger = function(t) {
				KJUR.asn1.DERInteger.superclass.constructor.call(this),
				this.hT = "02",
				this.setByBigInteger = function(t) {
					this.hTLV = null ,
					this.isModified = !0,
					this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
				}
				,
				this.setByInteger = function(t) {
					var n = new e(String(t),10);
					this.setByBigInteger(n)
				}
				,
				this.setValueHex = function(t) {
					this.hV = t
				}
				,
				this.getFreshValueHex = function() {
					return this.hV
				}
				,
				"undefined" != typeof t && ("undefined" != typeof t.bigint ? this.setByBigInteger(t.bigint) : "undefined" != typeof t["int"] ? this.setByInteger(t["int"]) : "undefined" != typeof t.hex && this.setValueHex(t.hex))
			}
			,
			$e.extend(KJUR.asn1.DERInteger, KJUR.asn1.ASN1Object),
			KJUR.asn1.DERBitString = function(t) {
				KJUR.asn1.DERBitString.superclass.constructor.call(this),
				this.hT = "03",
				this.setHexValueIncludingUnusedBits = function(t) {
					this.hTLV = null ,
					this.isModified = !0,
					this.hV = t
				}
				,
				this.setUnusedBitsAndHexValue = function(t, e) {
					if (0 > t || t > 7)
						throw "unused bits shall be from 0 to 7: u = " + t;
					var n = "0" + t;
					this.hTLV = null ,
					this.isModified = !0,
					this.hV = n + e
				}
				,
				this.setByBinaryString = function(t) {
					t = t.replace(/0+$/, "");
					var e = 8 - t.length % 8;
					8 == e && (e = 0);
					for (var n = 0; e >= n; n++)
						t += "0";
					for (var r = "", n = 0; n < t.length - 1; n += 8) {
						var i = t.substr(n, 8)
						  , o = parseInt(i, 2).toString(16);
						1 == o.length && (o = "0" + o),
						r += o
					}
					this.hTLV = null ,
					this.isModified = !0,
					this.hV = "0" + e + r
				}
				,
				this.setByBooleanArray = function(t) {
					for (var e = "", n = 0; n < t.length; n++)
						e += 1 == t[n] ? "1" : "0";
					this.setByBinaryString(e)
				}
				,
				this.newFalseArray = function(t) {
					for (var e = new Array(t), n = 0; t > n; n++)
						e[n] = !1;
					return e
				}
				,
				this.getFreshValueHex = function() {
					return this.hV
				}
				,
				"undefined" != typeof t && ("undefined" != typeof t.hex ? this.setHexValueIncludingUnusedBits(t.hex) : "undefined" != typeof t.bin ? this.setByBinaryString(t.bin) : "undefined" != typeof t.array && this.setByBooleanArray(t.array))
			}
			,
			$e.extend(KJUR.asn1.DERBitString, KJUR.asn1.ASN1Object),
			KJUR.asn1.DEROctetString = function(t) {
				KJUR.asn1.DEROctetString.superclass.constructor.call(this, t),
				this.hT = "04"
			}
			,
			$e.extend(KJUR.asn1.DEROctetString, KJUR.asn1.DERAbstractString),
			KJUR.asn1.DERNull = function() {
				KJUR.asn1.DERNull.superclass.constructor.call(this),
				this.hT = "05",
				this.hTLV = "0500"
			}
			,
			$e.extend(KJUR.asn1.DERNull, KJUR.asn1.ASN1Object),
			KJUR.asn1.DERObjectIdentifier = function(t) {
				var n = function(t) {
					var e = t.toString(16);
					return 1 == e.length && (e = "0" + e),
					e
				}
				  , r = function(t) {
					var r = ""
					  , i = new e(t,10)
					  , o = i.toString(2)
					  , s = 7 - o.length % 7;
					7 == s && (s = 0);
					for (var a = "", u = 0; s > u; u++)
						a += "0";
					o = a + o;
					for (var u = 0; u < o.length - 1; u += 7) {
						var c = o.substr(u, 7);
						u != o.length - 7 && (c = "1" + c),
						r += n(parseInt(c, 2))
					}
					return r
				}
				;
				KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this),
				this.hT = "06",
				this.setValueHex = function(t) {
					this.hTLV = null ,
					this.isModified = !0,
					this.s = null ,
					this.hV = t
				}
				,
				this.setValueOidString = function(t) {
					if (!t.match(/^[0-9.]+$/))
						throw "malformed oid string: " + t;
					var e = ""
					  , i = t.split(".")
					  , o = 40 * parseInt(i[0]) + parseInt(i[1]);
					e += n(o),
					i.splice(0, 2);
					for (var s = 0; s < i.length; s++)
						e += r(i[s]);
					this.hTLV = null ,
					this.isModified = !0,
					this.s = null ,
					this.hV = e
				}
				,
				this.setValueName = function(t) {
					if ("undefined" == typeof KJUR.asn1.x509.OID.name2oidList[t])
						throw "DERObjectIdentifier oidName undefined: " + t;
					var e = KJUR.asn1.x509.OID.name2oidList[t];
					this.setValueOidString(e)
				}
				,
				this.getFreshValueHex = function() {
					return this.hV
				}
				,
				"undefined" != typeof t && ("undefined" != typeof t.oid ? this.setValueOidString(t.oid) : "undefined" != typeof t.hex ? this.setValueHex(t.hex) : "undefined" != typeof t.name && this.setValueName(t.name))
			}
			,
			$e.extend(KJUR.asn1.DERObjectIdentifier, KJUR.asn1.ASN1Object),
			KJUR.asn1.DERUTF8String = function(t) {
				KJUR.asn1.DERUTF8String.superclass.constructor.call(this, t),
				this.hT = "0c"
			}
			,
			$e.extend(KJUR.asn1.DERUTF8String, KJUR.asn1.DERAbstractString),
			KJUR.asn1.DERNumericString = function(t) {
				KJUR.asn1.DERNumericString.superclass.constructor.call(this, t),
				this.hT = "12"
			}
			,
			$e.extend(KJUR.asn1.DERNumericString, KJUR.asn1.DERAbstractString),
			KJUR.asn1.DERPrintableString = function(t) {
				KJUR.asn1.DERPrintableString.superclass.constructor.call(this, t),
				this.hT = "13"
			}
			,
			$e.extend(KJUR.asn1.DERPrintableString, KJUR.asn1.DERAbstractString),
			KJUR.asn1.DERTeletexString = function(t) {
				KJUR.asn1.DERTeletexString.superclass.constructor.call(this, t),
				this.hT = "14"
			}
			,
			$e.extend(KJUR.asn1.DERTeletexString, KJUR.asn1.DERAbstractString),
			KJUR.asn1.DERIA5String = function(t) {
				KJUR.asn1.DERIA5String.superclass.constructor.call(this, t),
				this.hT = "16"
			}
			,
			$e.extend(KJUR.asn1.DERIA5String, KJUR.asn1.DERAbstractString),
			KJUR.asn1.DERUTCTime = function(t) {
				KJUR.asn1.DERUTCTime.superclass.constructor.call(this, t),
				this.hT = "17",
				this.setByDate = function(t) {
					this.hTLV = null ,
					this.isModified = !0,
					this.date = t,
					this.s = this.formatDate(this.date, "utc"),
					this.hV = stohex(this.s)
				}
				,
				"undefined" != typeof t && ("undefined" != typeof t.str ? this.setString(t.str) : "undefined" != typeof t.hex ? this.setStringHex(t.hex) : "undefined" != typeof t.date && this.setByDate(t.date))
			}
			,
			$e.extend(KJUR.asn1.DERUTCTime, KJUR.asn1.DERAbstractTime),
			KJUR.asn1.DERGeneralizedTime = function(t) {
				KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this, t),
				this.hT = "18",
				this.setByDate = function(t) {
					this.hTLV = null ,
					this.isModified = !0,
					this.date = t,
					this.s = this.formatDate(this.date, "gen"),
					this.hV = stohex(this.s)
				}
				,
				"undefined" != typeof t && ("undefined" != typeof t.str ? this.setString(t.str) : "undefined" != typeof t.hex ? this.setStringHex(t.hex) : "undefined" != typeof t.date && this.setByDate(t.date))
			}
			,
			$e.extend(KJUR.asn1.DERGeneralizedTime, KJUR.asn1.DERAbstractTime),
			KJUR.asn1.DERSequence = function(t) {
				KJUR.asn1.DERSequence.superclass.constructor.call(this, t),
				this.hT = "30",
				this.getFreshValueHex = function() {
					for (var t = "", e = 0; e < this.asn1Array.length; e++) {
						var n = this.asn1Array[e];
						t += n.getEncodedHex()
					}
					return this.hV = t,
					this.hV
				}
			}
			,
			$e.extend(KJUR.asn1.DERSequence, KJUR.asn1.DERAbstractStructured),
			KJUR.asn1.DERSet = function(t) {
				KJUR.asn1.DERSet.superclass.constructor.call(this, t),
				this.hT = "31",
				this.getFreshValueHex = function() {
					for (var t = new Array, e = 0; e < this.asn1Array.length; e++) {
						var n = this.asn1Array[e];
						t.push(n.getEncodedHex())
					}
					return t.sort(),
					this.hV = t.join(""),
					this.hV
				}
			}
			,
			$e.extend(KJUR.asn1.DERSet, KJUR.asn1.DERAbstractStructured),
			KJUR.asn1.DERTaggedObject = function(t) {
				KJUR.asn1.DERTaggedObject.superclass.constructor.call(this),
				this.hT = "a0",
				this.hV = "",
				this.isExplicit = !0,
				this.asn1Object = null ,
				this.setASN1Object = function(t, e, n) {
					this.hT = e,
					this.isExplicit = t,
					this.asn1Object = n,
					this.isExplicit ? (this.hV = this.asn1Object.getEncodedHex(),
					this.hTLV = null ,
					this.isModified = !0) : (this.hV = null ,
					this.hTLV = n.getEncodedHex(),
					this.hTLV = this.hTLV.replace(/^../, e),
					this.isModified = !1)
				}
				,
				this.getFreshValueHex = function() {
					return this.hV
				}
				,
				"undefined" != typeof t && ("undefined" != typeof t.tag && (this.hT = t.tag),
				"undefined" != typeof t.explicit && (this.isExplicit = t.explicit),
				"undefined" != typeof t.obj && (this.asn1Object = t.obj,
				this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)))
			}
			,
			$e.extend(KJUR.asn1.DERTaggedObject, KJUR.asn1.ASN1Object),
			function(t) {
				"use strict";
				var e, n = {};
				n.decode = function(n) {
					var r;
					if (e === t) {
						var i = "0123456789ABCDEF"
						  , o = " \f\n\r     \u2028\u2029";
						for (e = [],
						r = 0; 16 > r; ++r)
							e[i.charAt(r)] = r;
						for (i = i.toLowerCase(),
						r = 10; 16 > r; ++r)
							e[i.charAt(r)] = r;
						for (r = 0; r < o.length; ++r)
							e[o.charAt(r)] = -1
					}
					var s = []
					  , a = 0
					  , u = 0;
					for (r = 0; r < n.length; ++r) {
						var c = n.charAt(r);
						if ("=" == c)
							break;
						if (c = e[c],
						-1 != c) {
							if (c === t)
								throw "Illegal character at offset " + r;
							a |= c,
							++u >= 2 ? (s[s.length] = a,
							a = 0,
							u = 0) : a <<= 4
						}
					}
					if (u)
						throw "Hex encoding incomplete: 4 bits missing";
					return s
				}
				,
				window.Hex = n
			}(),
			function(t) {
				"use strict";
				var e, n = {};
				n.decode = function(n) {
					var r;
					if (e === t) {
						var i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
						  , o = "= \f\n\r    \u2028\u2029";
						for (e = [],
						r = 0; 64 > r; ++r)
							e[i.charAt(r)] = r;
						for (r = 0; r < o.length; ++r)
							e[o.charAt(r)] = -1
					}
					var s = []
					  , a = 0
					  , u = 0;
					for (r = 0; r < n.length; ++r) {
						var c = n.charAt(r);
						if ("=" == c)
							break;
						if (c = e[c],
						-1 != c) {
							if (c === t)
								throw "Illegal character at offset " + r;
							a |= c,
							++u >= 4 ? (s[s.length] = a >> 16,
							s[s.length] = a >> 8 & 255,
							s[s.length] = 255 & a,
							a = 0,
							u = 0) : a <<= 6
						}
					}
					switch (u) {
					case 1:
						throw "Base64 encoding incomplete: at least 2 bits missing";
					case 2:
						s[s.length] = a >> 10;
						break;
					case 3:
						s[s.length] = a >> 16,
						s[s.length] = a >> 8 & 255
					}
					return s
				}
				,
				n.re = /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
				n.unarmor = function(t) {
					var e = n.re.exec(t);
					if (e)
						if (e[1])
							t = e[1];
						else {
							if (!e[2])
								throw "RegExp out of sync";
							t = e[2]
						}
					return n.decode(t)
				}
				,
				window.Base64 = n
			}(),
			function(t) {
				"use strict";
				function e(t, n) {
					t instanceof e ? (this.enc = t.enc,
					this.pos = t.pos) : (this.enc = t,
					this.pos = n)
				}
				function n(t, e, n, r, i) {
					this.stream = t,
					this.header = e,
					this.length = n,
					this.tag = r,
					this.sub = i
				}
				var r = 100
				  , i = "…"
				  , o = {
					tag: function(t, e) {
						var n = document.createElement(t);
						return n.className = e,
						n
					},
					text: function(t) {
						return document.createTextNode(t)
					}
				};
				e.prototype.get = function(e) {
					if (e === t && (e = this.pos++),
					e >= this.enc.length)
						throw "Requesting byte offset " + e + " on a stream of length " + this.enc.length;
					return this.enc[e]
				}
				,
				e.prototype.hexDigits = "0123456789ABCDEF",
				e.prototype.hexByte = function(t) {
					return this.hexDigits.charAt(t >> 4 & 15) + this.hexDigits.charAt(15 & t)
				}
				,
				e.prototype.hexDump = function(t, e, n) {
					for (var r = "", i = t; e > i; ++i)
						if (r += this.hexByte(this.get(i)),
						n !== !0)
							switch (15 & i) {
							case 7:
								r += "  ";
								break;
							case 15:
								r += "\n";
								break;
							default:
								r += " "
							}
					return r
				}
				,
				e.prototype.parseStringISO = function(t, e) {
					for (var n = "", r = t; e > r; ++r)
						n += String.fromCharCode(this.get(r));
					return n
				}
				,
				e.prototype.parseStringUTF = function(t, e) {
					for (var n = "", r = t; e > r; ) {
						var i = this.get(r++);
						n += 128 > i ? String.fromCharCode(i) : i > 191 && 224 > i ? String.fromCharCode((31 & i) << 6 | 63 & this.get(r++)) : String.fromCharCode((15 & i) << 12 | (63 & this.get(r++)) << 6 | 63 & this.get(r++))
					}
					return n
				}
				,
				e.prototype.parseStringBMP = function(t, e) {
					for (var n = "", r = t; e > r; r += 2) {
						var i = this.get(r)
						  , o = this.get(r + 1);
						n += String.fromCharCode((i << 8) + o)
					}
					return n
				}
				,
				e.prototype.reTime = /^((?:1[89]|2\d)?\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/,
				e.prototype.parseTime = function(t, e) {
					var n = this.parseStringISO(t, e)
					  , r = this.reTime.exec(n);
					return r ? (n = r[1] + "-" + r[2] + "-" + r[3] + " " + r[4],
					r[5] && (n += ":" + r[5],
					r[6] && (n += ":" + r[6],
					r[7] && (n += "." + r[7]))),
					r[8] && (n += " UTC",
					"Z" != r[8] && (n += r[8],
					r[9] && (n += ":" + r[9]))),
					n) : "Unrecognized time: " + n
				}
				,
				e.prototype.parseInteger = function(t, e) {
					var n = e - t;
					if (n > 4) {
						n <<= 3;
						var r = this.get(t);
						if (0 === r)
							n -= 8;
						else
							for (; 128 > r; )
								r <<= 1,
								--n;
						return "(" + n + " bit)"
					}
					for (var i = 0, o = t; e > o; ++o)
						i = i << 8 | this.get(o);
					return i
				}
				,
				e.prototype.parseBitString = function(t, e) {
					var n = this.get(t)
					  , r = (e - t - 1 << 3) - n
					  , i = "(" + r + " bit)";
					if (20 >= r) {
						var o = n;
						i += " ";
						for (var s = e - 1; s > t; --s) {
							for (var a = this.get(s), u = o; 8 > u; ++u)
								i += a >> u & 1 ? "1" : "0";
							o = 0
						}
					}
					return i
				}
				,
				e.prototype.parseOctetString = function(t, e) {
					var n = e - t
					  , o = "(" + n + " byte) ";
					n > r && (e = t + r);
					for (var s = t; e > s; ++s)
						o += this.hexByte(this.get(s));
					return n > r && (o += i),
					o
				}
				,
				e.prototype.parseOID = function(t, e) {
					for (var n = "", r = 0, i = 0, o = t; e > o; ++o) {
						var s = this.get(o);
						if (r = r << 7 | 127 & s,
						i += 7,
						!(128 & s)) {
							if ("" === n) {
								var a = 80 > r ? 40 > r ? 0 : 1 : 2;
								n = a + "." + (r - 40 * a)
							} else
								n += "." + (i >= 31 ? "bigint" : r);
							r = i = 0
						}
					}
					return n
				}
				,
				n.prototype.typeName = function() {
					if (this.tag === t)
						return "unknown";
					var e = this.tag >> 6
					  , n = (this.tag >> 5 & 1,
					31 & this.tag);
					switch (e) {
					case 0:
						switch (n) {
						case 0:
							return "EOC";
						case 1:
							return "BOOLEAN";
						case 2:
							return "INTEGER";
						case 3:
							return "BIT_STRING";
						case 4:
							return "OCTET_STRING";
						case 5:
							return "NULL";
						case 6:
							return "OBJECT_IDENTIFIER";
						case 7:
							return "ObjectDescriptor";
						case 8:
							return "EXTERNAL";
						case 9:
							return "REAL";
						case 10:
							return "ENUMERATED";
						case 11:
							return "EMBEDDED_PDV";
						case 12:
							return "UTF8String";
						case 16:
							return "SEQUENCE";
						case 17:
							return "SET";
						case 18:
							return "NumericString";
						case 19:
							return "PrintableString";
						case 20:
							return "TeletexString";
						case 21:
							return "VideotexString";
						case 22:
							return "IA5String";
						case 23:
							return "UTCTime";
						case 24:
							return "GeneralizedTime";
						case 25:
							return "GraphicString";
						case 26:
							return "VisibleString";
						case 27:
							return "GeneralString";
						case 28:
							return "UniversalString";
						case 30:
							return "BMPString";
						default:
							return "Universal_" + n.toString(16)
						}
					case 1:
						return "Application_" + n.toString(16);
					case 2:
						return "[" + n + "]";
					case 3:
						return "Private_" + n.toString(16)
					}
				}
				,
				n.prototype.reSeemsASCII = /^[ -~]+$/,
				n.prototype.content = function() {
					if (this.tag === t)
						return null ;
					var e = this.tag >> 6
					  , n = 31 & this.tag
					  , o = this.posContent()
					  , s = Math.abs(this.length);
					if (0 !== e) {
						if (null  !== this.sub)
							return "(" + this.sub.length + " elem)";
						var a = this.stream.parseStringISO(o, o + Math.min(s, r));
						return this.reSeemsASCII.test(a) ? a.substring(0, 2 * r) + (a.length > 2 * r ? i : "") : this.stream.parseOctetString(o, o + s)
					}
					switch (n) {
					case 1:
						return 0 === this.stream.get(o) ? "false" : "true";
					case 2:
						return this.stream.parseInteger(o, o + s);
					case 3:
						return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(o, o + s);
					case 4:
						return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(o, o + s);
					case 6:
						return this.stream.parseOID(o, o + s);
					case 16:
					case 17:
						return "(" + this.sub.length + " elem)";
					case 12:
						return this.stream.parseStringUTF(o, o + s);
					case 18:
					case 19:
					case 20:
					case 21:
					case 22:
					case 26:
						return this.stream.parseStringISO(o, o + s);
					case 30:
						return this.stream.parseStringBMP(o, o + s);
					case 23:
					case 24:
						return this.stream.parseTime(o, o + s)
					}
					return null 
				}
				,
				n.prototype.toString = function() {
					return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (null  === this.sub ? "null" : this.sub.length) + "]"
				}
				,
				n.prototype.print = function(e) {
					if (e === t && (e = ""),
					document.writeln(e + this),
					null  !== this.sub) {
						e += "  ";
						for (var n = 0, r = this.sub.length; r > n; ++n)
							this.sub[n].print(e)
					}
				}
				,
				n.prototype.toPrettyString = function(e) {
					e === t && (e = "");
					var n = e + this.typeName() + " @" + this.stream.pos;
					if (this.length >= 0 && (n += "+"),
					n += this.length,
					32 & this.tag ? n += " (constructed)" : 3 != this.tag && 4 != this.tag || null  === this.sub || (n += " (encapsulates)"),
					n += "\n",
					null  !== this.sub) {
						e += "  ";
						for (var r = 0, i = this.sub.length; i > r; ++r)
							n += this.sub[r].toPrettyString(e)
					}
					return n
				}
				,
				n.prototype.toDOM = function() {
					var t = o.tag("div", "node");
					t.asn1 = this;
					var e = o.tag("div", "head")
					  , n = this.typeName().replace(/_/g, " ");
					e.innerHTML = n;
					var r = this.content();
					if (null  !== r) {
						r = String(r).replace(/</g, "&lt;");
						var i = o.tag("span", "preview");
						i.appendChild(o.text(r)),
						e.appendChild(i)
					}
					t.appendChild(e),
					this.node = t,
					this.head = e;
					var s = o.tag("div", "value");
					if (n = "Offset: " + this.stream.pos + "<br/>",
					n += "Length: " + this.header + "+",
					n += this.length >= 0 ? this.length : -this.length + " (undefined)",
					32 & this.tag ? n += "<br/>(constructed)" : 3 != this.tag && 4 != this.tag || null  === this.sub || (n += "<br/>(encapsulates)"),
					null  !== r && (n += "<br/>Value:<br/><b>" + r + "</b>",
					"object" == typeof oids && 6 == this.tag)) {
						var a = oids[r];
						a && (a.d && (n += "<br/>" + a.d),
						a.c && (n += "<br/>" + a.c),
						a.w && (n += "<br/>(warning!)"))
					}
					s.innerHTML = n,
					t.appendChild(s);
					var u = o.tag("div", "sub");
					if (null  !== this.sub)
						for (var c = 0, l = this.sub.length; l > c; ++c)
							u.appendChild(this.sub[c].toDOM());
					return t.appendChild(u),
					e.onclick = function() {
						t.className = "node collapsed" == t.className ? "node" : "node collapsed"
					}
					,
					t
				}
				,
				n.prototype.posStart = function() {
					return this.stream.pos
				}
				,
				n.prototype.posContent = function() {
					return this.stream.pos + this.header
				}
				,
				n.prototype.posEnd = function() {
					return this.stream.pos + this.header + Math.abs(this.length)
				}
				,
				n.prototype.fakeHover = function(t) {
					this.node.className += " hover",
					t && (this.head.className += " hover")
				}
				,
				n.prototype.fakeOut = function(t) {
					var e = / ?hover/;
					this.node.className = this.node.className.replace(e, ""),
					t && (this.head.className = this.head.className.replace(e, ""))
				}
				,
				n.prototype.toHexDOM_sub = function(t, e, n, r, i) {
					if (!(r >= i)) {
						var s = o.tag("span", e);
						s.appendChild(o.text(n.hexDump(r, i))),
						t.appendChild(s)
					}
				}
				,
				n.prototype.toHexDOM = function(e) {
					var n = o.tag("span", "hex");
					if (e === t && (e = n),
					this.head.hexNode = n,
					this.head.onmouseover = function() {
						this.hexNode.className = "hexCurrent"
					}
					,
					this.head.onmouseout = function() {
						this.hexNode.className = "hex"
					}
					,
					n.asn1 = this,
					n.onmouseover = function() {
						var t = !e.selected;
						t && (e.selected = this.asn1,
						this.className = "hexCurrent"),
						this.asn1.fakeHover(t)
					}
					,
					n.onmouseout = function() {
						var t = e.selected == this.asn1;
						this.asn1.fakeOut(t),
						t && (e.selected = null ,
						this.className = "hex")
					}
					,
					this.toHexDOM_sub(n, "tag", this.stream, this.posStart(), this.posStart() + 1),
					this.toHexDOM_sub(n, this.length >= 0 ? "dlen" : "ulen", this.stream, this.posStart() + 1, this.posContent()),
					null  === this.sub)
						n.appendChild(o.text(this.stream.hexDump(this.posContent(), this.posEnd())));
					else if (this.sub.length > 0) {
						var r = this.sub[0]
						  , i = this.sub[this.sub.length - 1];
						this.toHexDOM_sub(n, "intro", this.stream, this.posContent(), r.posStart());
						for (var s = 0, a = this.sub.length; a > s; ++s)
							n.appendChild(this.sub[s].toHexDOM(e));
						this.toHexDOM_sub(n, "outro", this.stream, i.posEnd(), this.posEnd())
					}
					return n
				}
				,
				n.prototype.toHexString = function(t) {
					return this.stream.hexDump(this.posStart(), this.posEnd(), !0)
				}
				,
				n.decodeLength = function(t) {
					var e = t.get()
					  , n = 127 & e;
					if (n == e)
						return n;
					if (n > 3)
						throw "Length over 24 bits not supported at position " + (t.pos - 1);
					if (0 === n)
						return -1;
					e = 0;
					for (var r = 0; n > r; ++r)
						e = e << 8 | t.get();
					return e
				}
				,
				n.hasContent = function(t, r, i) {
					if (32 & t)
						return !0;
					if (3 > t || t > 4)
						return !1;
					var o = new e(i);
					3 == t && o.get();
					var s = o.get();
					if (s >> 6 & 1)
						return !1;
					try {
						var a = n.decodeLength(o);
						return o.pos - i.pos + a == r
					} catch (u) {
						return !1
					}
				}
				,
				n.decode = function(t) {
					t instanceof e || (t = new e(t,0));
					var r = new e(t)
					  , i = t.get()
					  , o = n.decodeLength(t)
					  , s = t.pos - r.pos
					  , a = null ;
					if (n.hasContent(i, o, t)) {
						var u = t.pos;
						if (3 == i && t.get(),
						a = [],
						o >= 0) {
							for (var c = u + o; t.pos < c; )
								a[a.length] = n.decode(t);
							if (t.pos != c)
								throw "Content size is not correct for container starting at offset " + u
						} else
							try {
								for (; ; ) {
									var l = n.decode(t);
									if (0 === l.tag)
										break;
									a[a.length] = l
								}
								o = u - t.pos
							} catch (h) {
								throw "Exception while decoding undefined length content: " + h
							}
					} else
						t.pos += o;
					return new n(r,s,o,i,a)
				}
				,
				n.test = function() {
					for (var t = [{
						value: [39],
						expected: 39
					}, {
						value: [129, 201],
						expected: 201
					}, {
						value: [131, 254, 220, 186],
						expected: 16702650
					}], r = 0, i = t.length; i > r; ++r) {
						var o = new e(t[r].value,0)
						  , s = n.decodeLength(o);
						s != t[r].expected && document.write("In test[" + r + "] expected " + t[r].expected + " got " + s + "\n")
					}
				}
				,
				window.ASN1 = n
			}(),
			ASN1.prototype.getHexStringValue = function() {
				var t = this.toHexString()
				  , e = 2 * this.header
				  , n = 2 * this.length;
				return t.substr(e, n)
			}
			,
			ce.prototype.parseKey = function(t) {
				try {
					var e = 0
					  , n = 0
					  , r = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/
					  , i = r.test(t) ? Hex.decode(t) : Base64.unarmor(t)
					  , o = ASN1.decode(i);
					if (3 === o.sub.length && (o = o.sub[2].sub[0]),
					9 === o.sub.length) {
						e = o.sub[1].getHexStringValue(),
						this.n = ae(e, 16),
						n = o.sub[2].getHexStringValue(),
						this.e = parseInt(n, 16);
						var s = o.sub[3].getHexStringValue();
						this.d = ae(s, 16);
						var a = o.sub[4].getHexStringValue();
						this.p = ae(a, 16);
						var u = o.sub[5].getHexStringValue();
						this.q = ae(u, 16);
						var c = o.sub[6].getHexStringValue();
						this.dmp1 = ae(c, 16);
						var l = o.sub[7].getHexStringValue();
						this.dmq1 = ae(l, 16);
						var h = o.sub[8].getHexStringValue();
						this.coeff = ae(h, 16)
					} else {
						if (2 !== o.sub.length)
							return !1;
						var f = o.sub[1]
						  , d = f.sub[0];
						e = d.sub[0].getHexStringValue(),
						this.n = ae(e, 16),
						n = d.sub[1].getHexStringValue(),
						this.e = parseInt(n, 16)
					}
					return !0
				} catch (p) {
					return !1
				}
			}
			,
			ce.prototype.getPrivateBaseKey = function() {
				var t = {
					array: [new KJUR.asn1.DERInteger({
						"int": 0
					}), new KJUR.asn1.DERInteger({
						bigint: this.n
					}), new KJUR.asn1.DERInteger({
						"int": this.e
					}), new KJUR.asn1.DERInteger({
						bigint: this.d
					}), new KJUR.asn1.DERInteger({
						bigint: this.p
					}), new KJUR.asn1.DERInteger({
						bigint: this.q
					}), new KJUR.asn1.DERInteger({
						bigint: this.dmp1
					}), new KJUR.asn1.DERInteger({
						bigint: this.dmq1
					}), new KJUR.asn1.DERInteger({
						bigint: this.coeff
					})]
				}
				  , e = new KJUR.asn1.DERSequence(t);
				return e.getEncodedHex()
			}
			,
			ce.prototype.getPrivateBaseKeyB64 = function() {
				return be(this.getPrivateBaseKey())
			}
			,
			ce.prototype.getPublicBaseKey = function() {
				var t = {
					array: [new KJUR.asn1.DERObjectIdentifier({
						oid: "1.2.840.113549.1.1.1"
					}), new KJUR.asn1.DERNull]
				}
				  , e = new KJUR.asn1.DERSequence(t);
				t = {
					array: [new KJUR.asn1.DERInteger({
						bigint: this.n
					}), new KJUR.asn1.DERInteger({
						"int": this.e
					})]
				};
				var n = new KJUR.asn1.DERSequence(t);
				t = {
					hex: "00" + n.getEncodedHex()
				};
				var r = new KJUR.asn1.DERBitString(t);
				t = {
					array: [e, r]
				};
				var i = new KJUR.asn1.DERSequence(t);
				return i.getEncodedHex()
			}
			,
			ce.prototype.getPublicBaseKeyB64 = function() {
				return be(this.getPublicBaseKey())
			}
			,
			ce.prototype.wordwrap = function(t, e) {
				if (e = e || 64,
				!t)
					return t;
				var n = "(.{1," + e + "})( +|$\n?)|(.{1," + e + "})";
				return t.match(RegExp(n, "g")).join("\n")
			}
			,
			ce.prototype.getPrivateKey = function() {
				var t = "-----BEGIN RSA PRIVATE KEY-----\n";
				return t += this.wordwrap(this.getPrivateBaseKeyB64()) + "\n",
				t += "-----END RSA PRIVATE KEY-----"
			}
			,
			ce.prototype.getPublicKey = function() {
				var t = "-----BEGIN PUBLIC KEY-----\n";
				return t += this.wordwrap(this.getPublicBaseKeyB64()) + "\n",
				t += "-----END PUBLIC KEY-----"
			}
			,
			ce.prototype.hasPublicKeyProperty = function(t) {
				return t = t || {},
				t.hasOwnProperty("n") && t.hasOwnProperty("e")
			}
			,
			ce.prototype.hasPrivateKeyProperty = function(t) {
				return t = t || {},
				t.hasOwnProperty("n") && t.hasOwnProperty("e") && t.hasOwnProperty("d") && t.hasOwnProperty("p") && t.hasOwnProperty("q") && t.hasOwnProperty("dmp1") && t.hasOwnProperty("dmq1") && t.hasOwnProperty("coeff")
			}
			,
			ce.prototype.parsePropertiesFrom = function(t) {
				this.n = t.n,
				this.e = t.e,
				t.hasOwnProperty("d") && (this.d = t.d,
				this.p = t.p,
				this.q = t.q,
				this.dmp1 = t.dmp1,
				this.dmq1 = t.dmq1,
				this.coeff = t.coeff)
			}
			;
			var Fe = function(t) {
				ce.call(this),
				t && ("string" == typeof t ? this.parseKey(t) : (this.hasPrivateKeyProperty(t) || this.hasPublicKeyProperty(t)) && this.parsePropertiesFrom(t))
			}
			;
			Fe.prototype = new ce,
			Fe.prototype.constructor = Fe;
			var Je = function(t) {
				t = t || {},
				this.default_key_size = parseInt(t.default_key_size) || 1024,
				this.default_public_exponent = t.default_public_exponent || "010001",
				this.log = t.log || !1,
				this.key = null 
			}
			;
			Je.prototype.setKey = function(t) {
				this.log && this.key && console.warn("A key was already set, overriding existing."),
				this.key = new Fe(t)
			}
			,
			Je.prototype.setPrivateKey = function(t) {
				this.setKey(t)
			}
			,
			Je.prototype.setPublicKey = function(t) {
				this.setKey(t)
			}
			,
			Je.prototype.decrypt = function(t) {
				try {
					return this.getKey().decrypt(xe(t))
				} catch (e) {
					return !1
				}
			}
			,
			Je.prototype.encrypt = function(t) {
				try {
					return be(this.getKey().encrypt(t))
				} catch (e) {
					return !1
				}
			}
			,
			Je.prototype.getKey = function(t) {
				if (!this.key) {
					if (this.key = new Fe,
					t && "[object Function]" === {}.toString.call(t))
						return void this.key.generateAsync(this.default_key_size, this.default_public_exponent, t);
					this.key.generate(this.default_key_size, this.default_public_exponent)
				}
				return this.key
			}
			,
			Je.prototype.getPrivateKey = function() {
				return this.getKey().getPrivateKey()
			}
			,
			Je.prototype.getPrivateKeyB64 = function() {
				return this.getKey().getPrivateBaseKeyB64()
			}
			,
			Je.prototype.getPublicKey = function() {
				return this.getKey().getPublicKey()
			}
			,
			Je.prototype.getPublicKeyB64 = function() {
				return this.getKey().getPublicBaseKeyB64()
			}
			,
			Je.version = "2.3.1",
			t.JSEncrypt = Je
		}),
function getPwd(pwd){
	//最上面匿名函数的this其实就是t 后面函数里面的其实是局部变量,t.JSEncrypt = Je
	var e = new this.JSEncrypt;
	var once = "fgeSBH3WD5Lkb0qxWLoAOrpTlshLuRa1";
	var key = "-----BEGIN PUBLIC KEY----- MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDvEpk7iB6BF8ZLXG0vSMr7Qedl B9Q4c9qrqiNziUt3RokRkr7pHxWlelQPC3JIMs+UvMkabTkDNE4pvx/DkFWEMzzu HuDeenKNo1Ywymf8A6EtQIEL7MQpUaszPx6/u5YqLVvjN7fyvF5LSVgtzjYhTTHK hTJF2R5dTkO3VswLVwIDAQAB -----END PUBLIC KEY----- ";

	e.setPublicKey(key)
	return e.encrypt(pwd + once);
}