var navigator = {};
var window = this;
var dbits, canary = 244837814094590, j_lm = 15715070 == (canary & 16777215);
var thspubkey = {
    "v": "default_2",
    "p": "10001",
    "m": "C2D859056373B0178E5EB53D11BA73E4444774E96EAEBE8A25420034443B0B05DB8089BE1008B5F30ED410F3DDAA23C9F8B0E96AE40514C728301C4A145E2DB8856A0E8FAC7B3A5675C53BC8297DBA8111ECB2AA1BE26411F610A819FB2FC02D2BBE900DEFC5C5D5C390F901C0495F17100A7C2ABB0A836DDF62F1BCEA9018F9"
};

function BigInteger(b, a, c) {
    null != b && ("number" == typeof b ? this.fromNumber(b, a, c) : null == a && "string" != typeof b ? this.fromString(b, 256) : this.fromString(b, a))
}
function nbi() {
    return new BigInteger(null)
}
function am1(b, a, c, d, e, f) {
    for (; 0 <= --f; ) {
        var g = a * this[b++] + c[d] + e
          , e = Math.floor(g / 67108864);
        c[d++] = g & 67108863
    }
    return e
}
function am2(b, a, c, d, e, f) {
    for (var g = a & 32767, a = a >> 15; 0 <= --f; ) {
        var h = this[b] & 32767
          , i = this[b++] >> 15
          , k = a * h + i * g
          , h = g * h + ((k & 32767) << 15) + c[d] + (e & 1073741823)
          , e = (h >>> 30) + (k >>> 15) + a * i + (e >>> 30);
        c[d++] = h & 1073741823
    }
    return e
}
function am3(b, a, c, d, e, f) {
    for (var g = a & 16383, a = a >> 14; 0 <= --f; ) {
        var h = this[b] & 16383
          , i = this[b++] >> 14
          , k = a * h + i * g
          , h = g * h + ((k & 16383) << 14) + c[d] + e
          , e = (h >> 28) + (k >> 14) + a * i;
        c[d++] = h & 268435455
    }
    return e
}
j_lm && "Microsoft Internet Explorer" == navigator.appName ? (BigInteger.prototype.am = am2,
dbits = 30) : j_lm && "Netscape" != navigator.appName ? (BigInteger.prototype.am = am1,
dbits = 26) : (BigInteger.prototype.am = am3,
dbits = 28);
BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = (1 << dbits) - 1;
BigInteger.prototype.DV = 1 << dbits;
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP);
BigInteger.prototype.F1 = BI_FP - dbits;
BigInteger.prototype.F2 = 2 * dbits - BI_FP;
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz", BI_RC = [], rr, vv;
rr = 48;
for (vv = 0; 9 >= vv; ++vv)
    BI_RC[rr++] = vv;
rr = 97;
for (vv = 10; 36 > vv; ++vv)
    BI_RC[rr++] = vv;
rr = 65;
for (vv = 10; 36 > vv; ++vv)
    BI_RC[rr++] = vv;
function int2char(b) {
    return BI_RM.charAt(b)
}
function intAt(b, a) {
    var c = BI_RC[b.charCodeAt(a)];
    return null == c ? -1 : c
}
function bnpCopyTo(b) {
    for (var a = this.t - 1; 0 <= a; --a)
        b[a] = this[a];
    b.t = this.t;
    b.s = this.s
}
function bnpFromInt(b) {
    this.t = 1;
    this.s = 0 > b ? -1 : 0;
    0 < b ? this[0] = b : -1 > b ? this[0] = b + this.DV : this.t = 0
}
function nbv(b) {
    var a = nbi();
    a.fromInt(b);
    return a
}
function bnpFromString(b, a) {
    var c;
    if (16 == a)
        c = 4;
    else if (8 == a)
        c = 3;
    else if (256 == a)
        c = 8;
    else if (2 == a)
        c = 1;
    else if (32 == a)
        c = 5;
    else if (4 == a)
        c = 2;
    else {
        this.fromRadix(b, a);
        return
    }
    this.s = this.t = 0;
    for (var d = b.length, e = !1, f = 0; 0 <= --d; ) {
        var g = 8 == c ? b[d] & 255 : intAt(b, d);
        0 > g ? "-" == b.charAt(d) && (e = !0) : (e = !1,
        0 == f ? this[this.t++] = g : f + c > this.DB ? (this[this.t - 1] |= (g & (1 << this.DB - f) - 1) << f,
        this[this.t++] = g >> this.DB - f) : this[this.t - 1] |= g << f,
        f += c,
        f >= this.DB && (f -= this.DB))
    }
    if (8 == c && 0 != (b[0] & 128))
        this.s = -1,
        0 < f && (this[this.t - 1] |= (1 << this.DB - f) - 1 << f);
    this.clamp();
    e && BigInteger.ZERO.subTo(this, this)
}
function bnpClamp() {
    for (var b = this.s & this.DM; 0 < this.t && this[this.t - 1] == b; )
        --this.t
}
function bnToString(b) {
    if (0 > this.s)
        return "-" + this.negate().toString(b);
    if (16 == b)
        b = 4;
    else if (8 == b)
        b = 3;
    else if (2 == b)
        b = 1;
    else if (32 == b)
        b = 5;
    else if (4 == b)
        b = 2;
    else
        return this.toRadix(b);
    var a = (1 << b) - 1, c, d = !1, e = "", f = this.t, g = this.DB - f * this.DB % b;
    if (0 < f--) {
        if (g < this.DB && 0 < (c = this[f] >> g))
            d = !0,
            e = int2char(c);
        for (; 0 <= f; )
            g < b ? (c = (this[f] & (1 << g) - 1) << b - g,
            c |= this[--f] >> (g += this.DB - b)) : (c = this[f] >> (g -= b) & a,
            0 >= g && (g += this.DB,
            --f)),
            0 < c && (d = !0),
            d && (e += int2char(c))
    }
    return d ? e : "0"
}
function bnNegate() {
    var b = nbi();
    BigInteger.ZERO.subTo(this, b);
    return b
}
function bnAbs() {
    return 0 > this.s ? this.negate() : this
}
function bnCompareTo(b) {
    var a = this.s - b.s;
    if (0 != a)
        return a;
    var c = this.t
      , a = c - b.t;
    if (0 != a)
        return 0 > this.s ? -a : a;
    for (; 0 <= --c; )
        if (0 != (a = this[c] - b[c]))
            return a;
    return 0
}
function nbits(b) {
    var a = 1, c;
    if (0 != (c = b >>> 16))
        b = c,
        a += 16;
    if (0 != (c = b >> 8))
        b = c,
        a += 8;
    if (0 != (c = b >> 4))
        b = c,
        a += 4;
    if (0 != (c = b >> 2))
        b = c,
        a += 2;
    0 != b >> 1 && (a += 1);
    return a
}
function bnBitLength() {
    return 0 >= this.t ? 0 : this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM)
}
function bnpDLShiftTo(b, a) {
    var c;
    for (c = this.t - 1; 0 <= c; --c)
        a[c + b] = this[c];
    for (c = b - 1; 0 <= c; --c)
        a[c] = 0;
    a.t = this.t + b;
    a.s = this.s
}
function bnpDRShiftTo(b, a) {
    for (var c = b; c < this.t; ++c)
        a[c - b] = this[c];
    a.t = Math.max(this.t - b, 0);
    a.s = this.s
}
function bnpLShiftTo(b, a) {
    var c = b % this.DB, d = this.DB - c, e = (1 << d) - 1, f = Math.floor(b / this.DB), g = this.s << c & this.DM, h;
    for (h = this.t - 1; 0 <= h; --h)
        a[h + f + 1] = this[h] >> d | g,
        g = (this[h] & e) << c;
    for (h = f - 1; 0 <= h; --h)
        a[h] = 0;
    a[f] = g;
    a.t = this.t + f + 1;
    a.s = this.s;
    a.clamp()
}
function bnpRShiftTo(b, a) {
    a.s = this.s;
    var c = Math.floor(b / this.DB);
    if (c >= this.t)
        a.t = 0;
    else {
        var d = b % this.DB
          , e = this.DB - d
          , f = (1 << d) - 1;
        a[0] = this[c] >> d;
        for (var g = c + 1; g < this.t; ++g)
            a[g - c - 1] |= (this[g] & f) << e,
            a[g - c] = this[g] >> d;
        0 < d && (a[this.t - c - 1] |= (this.s & f) << e);
        a.t = this.t - c;
        a.clamp()
    }
}
function bnpSubTo(b, a) {
    for (var c = 0, d = 0, e = Math.min(b.t, this.t); c < e; )
        d += this[c] - b[c],
        a[c++] = d & this.DM,
        d >>= this.DB;
    if (b.t < this.t) {
        for (d -= b.s; c < this.t; )
            d += this[c],
            a[c++] = d & this.DM,
            d >>= this.DB;
        d += this.s
    } else {
        for (d += this.s; c < b.t; )
            d -= b[c],
            a[c++] = d & this.DM,
            d >>= this.DB;
        d -= b.s
    }
    a.s = 0 > d ? -1 : 0;
    -1 > d ? a[c++] = this.DV + d : 0 < d && (a[c++] = d);
    a.t = c;
    a.clamp()
}
function bnpMultiplyTo(b, a) {
    var c = this.abs()
      , d = b.abs()
      , e = c.t;
    for (a.t = e + d.t; 0 <= --e; )
        a[e] = 0;
    for (e = 0; e < d.t; ++e)
        a[e + c.t] = c.am(0, d[e], a, e, 0, c.t);
    a.s = 0;
    a.clamp();
    this.s != b.s && BigInteger.ZERO.subTo(a, a)
}
function bnpSquareTo(b) {
    for (var a = this.abs(), c = b.t = 2 * a.t; 0 <= --c; )
        b[c] = 0;
    for (c = 0; c < a.t - 1; ++c) {
        var d = a.am(c, a[c], b, 2 * c, 0, 1);
        if ((b[c + a.t] += a.am(c + 1, 2 * a[c], b, 2 * c + 1, d, a.t - c - 1)) >= a.DV)
            b[c + a.t] -= a.DV,
            b[c + a.t + 1] = 1
    }
    0 < b.t && (b[b.t - 1] += a.am(c, a[c], b, 2 * c, 0, 1));
    b.s = 0;
    b.clamp()
}
function bnpDivRemTo(b, a, c) {
    var d = b.abs();
    if (!(0 >= d.t)) {
        var e = this.abs();
        if (e.t < d.t)
            null != a && a.fromInt(0),
            null != c && this.copyTo(c);
        else {
            null == c && (c = nbi());
            var f = nbi()
              , g = this.s
              , b = b.s
              , h = this.DB - nbits(d[d.t - 1]);
            0 < h ? (d.lShiftTo(h, f),
            e.lShiftTo(h, c)) : (d.copyTo(f),
            e.copyTo(c));
            d = f.t;
            e = f[d - 1];
            if (0 != e) {
                var i = e * (1 << this.F1) + (1 < d ? f[d - 2] >> this.F2 : 0)
                  , k = this.FV / i
                  , i = (1 << this.F1) / i
                  , o = 1 << this.F2
                  , l = c.t
                  , m = l - d
                  , j = null == a ? nbi() : a;
                f.dlShiftTo(m, j);
                0 <= c.compareTo(j) && (c[c.t++] = 1,
                c.subTo(j, c));
                BigInteger.ONE.dlShiftTo(d, j);
                for (j.subTo(f, f); f.t < d; )
                    f[f.t++] = 0;
                for (; 0 <= --m; ) {
                    var n = c[--l] == e ? this.DM : Math.floor(c[l] * k + (c[l - 1] + o) * i);
                    if ((c[l] += f.am(0, n, c, m, 0, d)) < n) {
                        f.dlShiftTo(m, j);
                        for (c.subTo(j, c); c[l] < --n; )
                            c.subTo(j, c)
                    }
                }
                null != a && (c.drShiftTo(d, a),
                g != b && BigInteger.ZERO.subTo(a, a));
                c.t = d;
                c.clamp();
                0 < h && c.rShiftTo(h, c);
                0 > g && BigInteger.ZERO.subTo(c, c)
            }
        }
    }
}
function bnMod(b) {
    var a = nbi();
    this.abs().divRemTo(b, null, a);
    0 > this.s && 0 < a.compareTo(BigInteger.ZERO) && b.subTo(a, a);
    return a
}
function Classic(b) {
    this.m = b
}
function cConvert(b) {
    return 0 > b.s || 0 <= b.compareTo(this.m) ? b.mod(this.m) : b
}
function cRevert(b) {
    return b
}
function cReduce(b) {
    b.divRemTo(this.m, null, b)
}
function cMulTo(b, a, c) {
    b.multiplyTo(a, c);
    this.reduce(c)
}
function cSqrTo(b, a) {
    b.squareTo(a);
    this.reduce(a)
}
Classic.prototype.convert = cConvert;
Classic.prototype.revert = cRevert;
Classic.prototype.reduce = cReduce;
Classic.prototype.mulTo = cMulTo;
Classic.prototype.sqrTo = cSqrTo;
function bnpInvDigit() {
    if (1 > this.t)
        return 0;
    var b = this[0];
    if (0 == (b & 1))
        return 0;
    var a = b & 3
      , a = a * (2 - (b & 15) * a) & 15
      , a = a * (2 - (b & 255) * a) & 255
      , a = a * (2 - ((b & 65535) * a & 65535)) & 65535
      , a = a * (2 - b * a % this.DV) % this.DV;
    return 0 < a ? this.DV - a : -a
}
function Montgomery(b) {
    this.m = b;
    this.mp = b.invDigit();
    this.mpl = this.mp & 32767;
    this.mph = this.mp >> 15;
    this.um = (1 << b.DB - 15) - 1;
    this.mt2 = 2 * b.t
}
function montConvert(b) {
    var a = nbi();
    b.abs().dlShiftTo(this.m.t, a);
    a.divRemTo(this.m, null, a);
    0 > b.s && 0 < a.compareTo(BigInteger.ZERO) && this.m.subTo(a, a);
    return a
}
function montRevert(b) {
    var a = nbi();
    b.copyTo(a);
    this.reduce(a);
    return a
}
function montReduce(b) {
    for (; b.t <= this.mt2; )
        b[b.t++] = 0;
    for (var a = 0; a < this.m.t; ++a) {
        var c = b[a] & 32767
          , d = c * this.mpl + ((c * this.mph + (b[a] >> 15) * this.mpl & this.um) << 15) & b.DM
          , c = a + this.m.t;
        for (b[c] += this.m.am(0, d, b, a, 0, this.m.t); b[c] >= b.DV; )
            b[c] -= b.DV,
            b[++c]++
    }
    b.clamp();
    b.drShiftTo(this.m.t, b);
    0 <= b.compareTo(this.m) && b.subTo(this.m, b)
}
function montSqrTo(b, a) {
    b.squareTo(a);
    this.reduce(a)
}
function montMulTo(b, a, c) {
    b.multiplyTo(a, c);
    this.reduce(c)
}
Montgomery.prototype.convert = montConvert;
Montgomery.prototype.revert = montRevert;
Montgomery.prototype.reduce = montReduce;
Montgomery.prototype.mulTo = montMulTo;
Montgomery.prototype.sqrTo = montSqrTo;
function bnpIsEven() {
    return 0 == (0 < this.t ? this[0] & 1 : this.s)
}
function bnpExp(b, a) {
    if (4294967295 < b || 1 > b)
        return BigInteger.ONE;
    var c = nbi()
      , d = nbi()
      , e = a.convert(this)
      , f = nbits(b) - 1;
    for (e.copyTo(c); 0 <= --f; )
        if (a.sqrTo(c, d),
        0 < (b & 1 << f))
            a.mulTo(d, e, c);
        else
            var g = c
              , c = d
              , d = g;
    return a.revert(c)
}
function bnModPowInt(b, a) {
    var c;
    c = 256 > b || a.isEven() ? new Classic(a) : new Montgomery(a);
    return this.exp(b, c)
}
BigInteger.prototype.copyTo = bnpCopyTo;
BigInteger.prototype.fromInt = bnpFromInt;
BigInteger.prototype.fromString = bnpFromString;
BigInteger.prototype.clamp = bnpClamp;
BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
BigInteger.prototype.drShiftTo = bnpDRShiftTo;
BigInteger.prototype.lShiftTo = bnpLShiftTo;
BigInteger.prototype.rShiftTo = bnpRShiftTo;
BigInteger.prototype.subTo = bnpSubTo;
BigInteger.prototype.multiplyTo = bnpMultiplyTo;
BigInteger.prototype.squareTo = bnpSquareTo;
BigInteger.prototype.divRemTo = bnpDivRemTo;
BigInteger.prototype.invDigit = bnpInvDigit;
BigInteger.prototype.isEven = bnpIsEven;
BigInteger.prototype.exp = bnpExp;
BigInteger.prototype.toString = bnToString;
BigInteger.prototype.negate = bnNegate;
BigInteger.prototype.abs = bnAbs;
BigInteger.prototype.compareTo = bnCompareTo;
BigInteger.prototype.bitLength = bnBitLength;
BigInteger.prototype.mod = bnMod;
BigInteger.prototype.modPowInt = bnModPowInt;
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);
function Arcfour() {
    this.j = this.i = 0;
    this.S = []
}
function ARC4init(b) {
    var a, c, d;
    for (a = 0; 256 > a; ++a)
        this.S[a] = a;
    for (a = c = 0; 256 > a; ++a)
        c = c + this.S[a] + b[a % b.length] & 255,
        d = this.S[a],
        this.S[a] = this.S[c],
        this.S[c] = d;
    this.j = this.i = 0
}
function ARC4next() {
    var b;
    this.i = this.i + 1 & 255;
    this.j = this.j + this.S[this.i] & 255;
    b = this.S[this.i];
    this.S[this.i] = this.S[this.j];
    this.S[this.j] = b;
    return this.S[b + this.S[this.i] & 255]
}
Arcfour.prototype.init = ARC4init;
Arcfour.prototype.next = ARC4next;
function prng_newstate() {
    return new Arcfour
}
var rng_psize = 256, rng_state, rng_pool, rng_pptr;
function rng_seed_int(b) {
    rng_pool[rng_pptr++] ^= b & 255;
    rng_pool[rng_pptr++] ^= b >> 8 & 255;
    rng_pool[rng_pptr++] ^= b >> 16 & 255;
    rng_pool[rng_pptr++] ^= b >> 24 & 255;
    rng_pptr >= rng_psize && (rng_pptr -= rng_psize)
}
function rng_seed_time() {
    rng_seed_int((new Date).getTime())
}
if (null == rng_pool) {
    rng_pool = [];
    rng_pptr = 0;
    var t;
    if (window.crypto && window.crypto.getRandomValues) {
        var ua = new Uint8Array(32);
        window.crypto.getRandomValues(ua);
        for (t = 0; 32 > t; ++t)
            rng_pool[rng_pptr++] = ua[t]
    }
    if ("Netscape" == navigator.appName && "5" > navigator.appVersion && window.crypto) {
        var z = window.crypto.random(32);
        for (t = 0; t < z.length; ++t)
            rng_pool[rng_pptr++] = z.charCodeAt(t) & 255
    }
    for (; rng_pptr < rng_psize; )
        t = Math.floor(65536 * Math.random()),
        rng_pool[rng_pptr++] = t >>> 8,
        rng_pool[rng_pptr++] = t & 255;
    rng_pptr = 0;
    rng_seed_time()
}
function rng_get_byte() {
    if (null == rng_state) {
        rng_seed_time();
        rng_state = prng_newstate();
        rng_state.init(rng_pool);
        for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr)
            rng_pool[rng_pptr] = 0;
        rng_pptr = 0
    }
    return rng_state.next()
}
function rng_get_bytes(b) {
    var a;
    for (a = 0; a < b.length; ++a)
        b[a] = rng_get_byte()
}
function SecureRandom() {}
SecureRandom.prototype.nextBytes = rng_get_bytes;
function parseBigInt(b, a) {
    return new BigInteger(b,a)
}
function linebrk(b, a) {
    for (var c = "", d = 0; d + a < b.length; )
        c += b.substring(d, d + a) + "\n",
        d += a;
    return c + b.substring(d, b.length)
}
function byte2Hex(b) {
    return 16 > b ? "0" + b.toString(16) : b.toString(16)
}
function pkcs1pad2(b, a) {
    if (a < b.length + 11)
        return alert("Message too long for RSA"),
        null;
    for (var c = [], d = b.length - 1; 0 <= d && 0 < a; ) {
        var e = b.charCodeAt(d--);
        128 > e ? c[--a] = e : 127 < e && 2048 > e ? (c[--a] = e & 63 | 128,
        c[--a] = e >> 6 | 192) : (c[--a] = e & 63 | 128,
        c[--a] = e >> 6 & 63 | 128,
        c[--a] = e >> 12 | 224)
    }
    c[--a] = 0;
    d = new SecureRandom;
    for (e = []; 2 < a; ) {
        for (e[0] = 0; 0 == e[0]; )
            d.nextBytes(e);
        c[--a] = e[0]
    }
    c[--a] = 2;
    c[--a] = 0;
    return new BigInteger(c)
}
function RSAKey() {
    this.n = null;
    this.e = 0;
    this.coeff = this.dmq1 = this.dmp1 = this.q = this.p = this.d = null
}
function RSASetPublic(b, a) {
    null != b && null != a && 0 < b.length && 0 < a.length ? (this.n = parseBigInt(b, 16),
    this.e = parseInt(a, 16)) : alert("Invalid RSA public key")
}
function RSADoPublic(b) {
    return b.modPowInt(this.e, this.n)
}
function RSAEncrypt(b) {
    b = pkcs1pad2(b, this.n.bitLength() + 7 >> 3);
    if (null == b)
        return null;
    b = this.doPublic(b);
    if (null == b)
        return null;
    b = b.toString(16);
    return 0 == (b.length & 1) ? b : "0" + b
}
RSAKey.prototype.doPublic = RSADoPublic;
RSAKey.prototype.setPublic = RSASetPublic;
RSAKey.prototype.encrypt = RSAEncrypt;
var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
  , b64padchar = "=";
function hex2b64(b) {
    var a, c, d = "";
    for (a = 0; a + 3 <= b.length; a += 3)
        c = parseInt(b.substring(a, a + 3), 16),
        d += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
    a + 1 == b.length ? (c = parseInt(b.substring(a, a + 1), 16),
    d += b64map.charAt(c << 2)) : a + 2 == b.length && (c = parseInt(b.substring(a, a + 2), 16),
    d += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4));
    for (; 0 < (d.length & 3); )
        d += b64padchar;
    return d
}
function b64tohex(b) {
    var a = "", c, d = 0, e;
    for (c = 0; c < b.length && !(b.charAt(c) == b64padchar); ++c) {
        v = b64map.indexOf(b.charAt(c));
        0 > v || (0 == d ? (a += int2char(v >> 2),
        e = v & 3,
        d = 1) : 1 == d ? (a += int2char(e << 2 | v >> 4),
        e = v & 15,
        d = 2) : 2 == d ? (a += int2char(e),
        a += int2char(v >> 2),
        e = v & 3,
        d = 3) : (a += int2char(e << 2 | v >> 4),
        a += int2char(v & 15),
        d = 0))
    }
    1 == d && (a += int2char(e << 2));
    return a
}
function b64toBA(b) {
    var b = b64tohex(b), a, c = [];
    for (a = 0; 2 * a < b.length; ++a)
        c[a] = parseInt(b.substring(2 * a, 2 * a + 2), 16);
    return c
}
var thsencrypt = {
    version: "",
    modulus: "",
    publicExponent: "",
    pubkeyScriptId: "__ths_pubkey__"
}
  , protocol = "http:";
"file:" === protocol && (protocol = "http:");
thsencrypt.pubkeyUrl = protocol + "//upass.10jqka.com.cn/pubkey/default.js";
thsencrypt.encode = function(b) {
    return encryptEncode(b, thsencrypt.modulus, thsencrypt.publicExponent)
}
;
thsencrypt.getVersion = function() {
    return thsencrypt.version
}
;
thsencrypt.setPubkeyUrl = function(b) {
    thsencrypt.pubkeyUrl = b;
    return thsencrypt
}
;
function encryptEncode(b, a, c) {
    var d;
    d = new RSAKey;
    d.setPublic(a, c);
    b = d.encrypt(b);
    if (!b)
        throw Error("encrypt failed");
    return hex2b64(b)
}
thsencrypt.load = function(b, a) {
    var c = document.getElementById(thsencrypt.pubkeyScriptId);
    c && document.body.removeChild(c);
    c = document.createElement("script");
    c.id = thsencrypt.pubkeyScriptId;
    c.language = "JavaScript";
    c.type = "text/javascript";
    c.src = thsencrypt.pubkeyUrl;
    document.body.appendChild(c);
    isIE() ? c.onreadystatechange = function(d) {
        if ("loaded" == c.readyState || "complete" == c.readyState)
            "undefined" !== typeof thspubkey ? (initPubkey(),
            "function" === typeof b && b(d)) : "function" === typeof a && a(d)
    }
    : (c.onload = function(a) {
        initPubkey();
        "function" === typeof b && b(a)
    }
    ,
    c.onerror = function(b) {
        "function" === typeof a && a(b)
    }
    )
}
;
function isIE() {
    var b, a;
    b = navigator.userAgent;
    a = -1 < b.indexOf("Opera");
    return -1 < b.indexOf("compatible") && -1 < b.indexOf("MSIE") && !a
}
function initPubkey() {
    thsencrypt.version = thspubkey.v;
    thsencrypt.modulus = thspubkey.m;
    thsencrypt.publicExponent = thspubkey.p
}
"undefined" !== typeof thspubkey && "" === thsencrypt.version && initPubkey();
function getpwd(pwd){
	return thsencrypt.encode(pwd);
}