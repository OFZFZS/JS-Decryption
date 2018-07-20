var window = this;
!function(a) {
    function b(a) {
        var b = f
          , c = b.biDivideByRadixPower(a, this.k - 1)
          , d = b.biMultiply(c, this.mu)
          , e = b.biDivideByRadixPower(d, this.k + 1)
          , g = b.biModuloByRadixPower(a, this.k + 1)
          , h = b.biMultiply(e, this.modulus)
          , i = b.biModuloByRadixPower(h, this.k + 1)
          , j = b.biSubtract(g, i);
        j.isNeg && (j = b.biAdd(j, this.bkplus1));
        for (var k = b.biCompare(j, this.modulus) >= 0; k; )
            j = b.biSubtract(j, this.modulus),
            k = b.biCompare(j, this.modulus) >= 0;
        return j
    }
    function c(a, b) {
        var c = f.biMultiply(a, b);
        return this.modulo(c)
    }
    function d(a, b) {
        var c = new s;
        c.digits[0] = 1;
        for (var d = a, e = b; ; ) {
            if (0 != (1 & e.digits[0]) && (c = this.multiplyMod(c, d)),
            e = f.biShiftRight(e, 1),
            0 == e.digits[0] && 0 == f.biHighIndex(e))
                break;
            d = this.multiplyMod(d, d)
        }
        return c
    }
    function e(a) {
        for (var b = "", c = 0; a > c; c++)
            b += Math.floor(10 * Math.random());
        return b
    }
    if ("undefined" == typeof a.RSAUtils)
        var f = a.RSAUtils = {};
    var g, h, k, l, m = 16, n = m, o = 65536, p = o >>> 1, q = o * o, r = o - 1, s = a.BigInt = function(a) {
        this.digits = "boolean" == typeof a && 1 == a ? null : h.slice(0),
        this.isNeg = !1
    }
    ;
    f.setMaxDigits = function(a) {
        g = a,
        h = new Array(g);
        for (var b = 0; b < h.length; b++)
            h[b] = 0;
        k = new s,
        l = new s,
        l.digits[0] = 1
    }
    ,
    f.setMaxDigits(20),
    f.biCopy = function(a) {
        var b = new s(!0);
        return b.digits = a.digits.slice(0),
        b.isNeg = a.isNeg,
        b
    }
    ,
    f.reverseStr = function(a) {
        for (var b = "", c = a.length - 1; c > -1; --c)
            b += a.charAt(c);
        return b
    }
    ;
    var t = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    f.biToString = function(a, b) {
        var c = new s;
        c.digits[0] = b;
        for (var d = f.biDivideModulo(a, c), e = t[d[1].digits[0]]; 1 == f.biCompare(d[0], k); )
            d = f.biDivideModulo(d[0], c),
            digit = d[1].digits[0],
            e += t[d[1].digits[0]];
        return (a.isNeg ? "-" : "") + f.reverseStr(e)
    }
    ;
    var u = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    f.digitToHex = function(a) {
        var b = 15
          , c = "";
        for (i = 0; 4 > i; ++i)
            c += u[a & b],
            a >>>= 4;
        return f.reverseStr(c)
    }
    ,
    f.biToHex = function(a) {
        for (var b = "", c = (f.biHighIndex(a),
        f.biHighIndex(a)); c > -1; --c)
            b += f.digitToHex(a.digits[c]);
        return b
    }
    ,
    f.charToHex = function(a) {
        var b, c = 48, d = c + 9, e = 97, f = e + 25, g = 65, h = 90;
        return b = a >= c && d >= a ? a - c : a >= g && h >= a ? 10 + a - g : a >= e && f >= a ? 10 + a - e : 0
    }
    ,
    f.hexToDigit = function(a) {
        for (var b = 0, c = Math.min(a.length, 4), d = 0; c > d; ++d)
            b <<= 4,
            b |= f.charToHex(a.charCodeAt(d));
        return b
    }
    ,
    f.biFromHex = function(a) {
        for (var b = new s, c = a.length, d = c, e = 0; d > 0; d -= 4,
        ++e)
            b.digits[e] = f.hexToDigit(a.substr(Math.max(d - 4, 0), Math.min(d, 4)));
        return b
    }
    ,
    f.biAdd = function(a, b) {
        var c;
        if (a.isNeg != b.isNeg)
            b.isNeg = !b.isNeg,
            c = f.biSubtract(a, b),
            b.isNeg = !b.isNeg;
        else {
            c = new s;
            for (var d, e = 0, g = 0; g < a.digits.length; ++g)
                d = a.digits[g] + b.digits[g] + e,
                c.digits[g] = d % o,
                e = Number(d >= o);
            c.isNeg = a.isNeg
        }
        return c
    }
    ,
    f.biSubtract = function(a, b) {
        var c;
        if (a.isNeg != b.isNeg)
            b.isNeg = !b.isNeg,
            c = f.biAdd(a, b),
            b.isNeg = !b.isNeg;
        else {
            c = new s;
            var d, e;
            e = 0;
            for (var g = 0; g < a.digits.length; ++g)
                d = a.digits[g] - b.digits[g] + e,
                c.digits[g] = d % o,
                c.digits[g] < 0 && (c.digits[g] += o),
                e = 0 - Number(0 > d);
            if (-1 == e) {
                e = 0;
                for (var g = 0; g < a.digits.length; ++g)
                    d = 0 - c.digits[g] + e,
                    c.digits[g] = d % o,
                    c.digits[g] < 0 && (c.digits[g] += o),
                    e = 0 - Number(0 > d);
                c.isNeg = !a.isNeg
            } else
                c.isNeg = a.isNeg
        }
        return c
    }
    ,
    f.biHighIndex = function(a) {
        for (var b = a.digits.length - 1; b > 0 && 0 == a.digits[b]; )
            --b;
        return b
    }
    ,
    f.biNumBits = function(a) {
        var b, c = f.biHighIndex(a), d = a.digits[c], e = (c + 1) * n;
        for (b = e; b > e - n && 0 == (32768 & d); --b)
            d <<= 1;
        return b
    }
    ,
    f.biMultiply = function(a, b) {
        for (var c, d, e, g = new s, h = f.biHighIndex(a), i = f.biHighIndex(b), k = 0; i >= k; ++k) {
            for (c = 0,
            e = k,
            j = 0; h >= j; ++j,
            ++e)
                d = g.digits[e] + a.digits[j] * b.digits[k] + c,
                g.digits[e] = d & r,
                c = d >>> m;
            g.digits[k + h + 1] = c
        }
        return g.isNeg = a.isNeg != b.isNeg,
        g
    }
    ,
    f.biMultiplyDigit = function(a, b) {
        var c, d, e;
        result = new s,
        c = f.biHighIndex(a),
        d = 0;
        for (var g = 0; c >= g; ++g)
            e = result.digits[g] + a.digits[g] * b + d,
            result.digits[g] = e & r,
            d = e >>> m;
        return result.digits[1 + c] = d,
        result
    }
    ,
    f.arrayCopy = function(a, b, c, d, e) {
        for (var f = Math.min(b + e, a.length), g = b, h = d; f > g; ++g,
        ++h)
            c[h] = a[g]
    }
    ;
    var v = [0, 32768, 49152, 57344, 61440, 63488, 64512, 65024, 65280, 65408, 65472, 65504, 65520, 65528, 65532, 65534, 65535];
    f.biShiftLeft = function(a, b) {
        var c = Math.floor(b / n)
          , d = new s;
        f.arrayCopy(a.digits, 0, d.digits, c, d.digits.length - c);
        for (var e = b % n, g = n - e, h = d.digits.length - 1, i = h - 1; h > 0; --h,
        --i)
            d.digits[h] = d.digits[h] << e & r | (d.digits[i] & v[e]) >>> g;
        return d.digits[0] = d.digits[h] << e & r,
        d.isNeg = a.isNeg,
        d
    }
    ;
    var w = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535];
    f.biShiftRight = function(a, b) {
        var c = Math.floor(b / n)
          , d = new s;
        f.arrayCopy(a.digits, c, d.digits, 0, a.digits.length - c);
        for (var e = b % n, g = n - e, h = 0, i = h + 1; h < d.digits.length - 1; ++h,
        ++i)
            d.digits[h] = d.digits[h] >>> e | (d.digits[i] & w[e]) << g;
        return d.digits[d.digits.length - 1] >>>= e,
        d.isNeg = a.isNeg,
        d
    }
    ,
    f.biMultiplyByRadixPower = function(a, b) {
        var c = new s;
        return f.arrayCopy(a.digits, 0, c.digits, b, c.digits.length - b),
        c
    }
    ,
    f.biDivideByRadixPower = function(a, b) {
        var c = new s;
        return f.arrayCopy(a.digits, b, c.digits, 0, c.digits.length - b),
        c
    }
    ,
    f.biModuloByRadixPower = function(a, b) {
        var c = new s;
        return f.arrayCopy(a.digits, 0, c.digits, 0, b),
        c
    }
    ,
    f.biCompare = function(a, b) {
        if (a.isNeg != b.isNeg)
            return 1 - 2 * Number(a.isNeg);
        for (var c = a.digits.length - 1; c >= 0; --c)
            if (a.digits[c] != b.digits[c])
                return a.isNeg ? 1 - 2 * Number(a.digits[c] > b.digits[c]) : 1 - 2 * Number(a.digits[c] < b.digits[c]);
        return 0
    }
    ,
    f.biDivideModulo = function(a, b) {
        var c, d, e = f.biNumBits(a), g = f.biNumBits(b), h = b.isNeg;
        if (g > e)
            return a.isNeg ? (c = f.biCopy(l),
            c.isNeg = !b.isNeg,
            a.isNeg = !1,
            b.isNeg = !1,
            d = biSubtract(b, a),
            a.isNeg = !0,
            b.isNeg = h) : (c = new s,
            d = f.biCopy(a)),
            [c, d];
        c = new s,
        d = a;
        for (var i = Math.ceil(g / n) - 1, j = 0; b.digits[i] < p; )
            b = f.biShiftLeft(b, 1),
            ++j,
            ++g,
            i = Math.ceil(g / n) - 1;
        d = f.biShiftLeft(d, j),
        e += j;
        for (var k = Math.ceil(e / n) - 1, m = f.biMultiplyByRadixPower(b, k - i); -1 != f.biCompare(d, m); )
            ++c.digits[k - i],
            d = f.biSubtract(d, m);
        for (var t = k; t > i; --t) {
            var u = t >= d.digits.length ? 0 : d.digits[t]
              , v = t - 1 >= d.digits.length ? 0 : d.digits[t - 1]
              , w = t - 2 >= d.digits.length ? 0 : d.digits[t - 2]
              , x = i >= b.digits.length ? 0 : b.digits[i]
              , y = i - 1 >= b.digits.length ? 0 : b.digits[i - 1];
            c.digits[t - i - 1] = u == x ? r : Math.floor((u * o + v) / x);
            for (var z = c.digits[t - i - 1] * (x * o + y), A = u * q + (v * o + w); z > A; )
                --c.digits[t - i - 1],
                z = c.digits[t - i - 1] * (x * o | y),
                A = u * o * o + (v * o + w);
            m = f.biMultiplyByRadixPower(b, t - i - 1),
            d = f.biSubtract(d, f.biMultiplyDigit(m, c.digits[t - i - 1])),
            d.isNeg && (d = f.biAdd(d, m),
            --c.digits[t - i - 1])
        }
        return d = f.biShiftRight(d, j),
        c.isNeg = a.isNeg != h,
        a.isNeg && (c = h ? f.biAdd(c, l) : f.biSubtract(c, l),
        b = f.biShiftRight(b, j),
        d = f.biSubtract(b, d)),
        0 == d.digits[0] && 0 == f.biHighIndex(d) && (d.isNeg = !1),
        [c, d]
    }
    ,
    f.biDivide = function(a, b) {
        return f.biDivideModulo(a, b)[0]
    }
    ,
    f.biModulo = function(a, b) {
        return f.biDivideModulo(a, b)[1]
    }
    ,
    f.biMultiplyMod = function(a, b, c) {
        return f.biModulo(f.biMultiply(a, b), c)
    }
    ,
    f.biPow = function(a, b) {
        for (var c = l, d = a; ; ) {
            if (0 != (1 & b) && (c = f.biMultiply(c, d)),
            b >>= 1,
            0 == b)
                break;
            d = f.biMultiply(d, d)
        }
        return c
    }
    ,
    f.biPowMod = function(a, b, c) {
        for (var d = l, e = a, g = b; ; ) {
            if (0 != (1 & g.digits[0]) && (d = f.biMultiplyMod(d, e, c)),
            g = f.biShiftRight(g, 1),
            0 == g.digits[0] && 0 == f.biHighIndex(g))
                break;
            e = f.biMultiplyMod(e, e, c)
        }
        return d
    }
    ,
    a.BarrettMu = function(a) {
        this.modulus = f.biCopy(a),
        this.k = f.biHighIndex(this.modulus) + 1;
        var e = new s;
        e.digits[2 * this.k] = 1,
        this.mu = f.biDivide(e, this.modulus),
        this.bkplus1 = new s,
        this.bkplus1.digits[this.k + 1] = 1,
        this.modulo = b,
        this.multiplyMod = c,
        this.powMod = d
    }
    ;
    var x = function(b, c, d, e) {
        var g = f;
        this.e = g.biFromHex(b),
        this.d = g.biFromHex(c),
        this.m = g.biFromHex(d),
        this.chunkSize = 2 * g.biHighIndex(this.m),
        this.radix = 16,
        this.barrett = new a.BarrettMu(this.m),
        this.rndLen = e
    };
    f.getKeyPair = function(a, b, c, d) {
        return new x(a,b,c,d)
    }
    ,
    "undefined" == typeof a.twoDigit && (a.twoDigit = function(a) {
        return (10 > a ? "0" : "") + String(a)
    }
    );
    var y = "00a862cf2d0d9549a26f73b0d944392c90433fb4ec5a8b3c572bd885dbf77c424f7d60437029aef3a4dc9daaf587697379a639494e21c42f79638914d7ce93de3f6e83d51f8e382dcb506f7a54f82cd7589ca9d8529090209290afb5ba6b8afc282fdabebb5c2e2d78686487a17a4ef519f259430972dbb42c444e15e091b1cc11"
      , z = "010001"
      , A = "7";
    f.pwdEncode = function(a) {
        var b = f.getKeyPair(z, "", y, A);
        return f.encryptedString(b, a)
    }
    ,
    f.encryptedString = function(a, b) {
        for (var c = e(a.rndLen) + b, d = [], g = c.length, h = 0; g > h; )
            d[h] = c.charCodeAt(h),
            h++;
        for (; d.length % a.chunkSize != 0; )
            d[h++] = 0;
        var i, j, k, l = d.length, m = "";
        for (h = 0; l > h; h += a.chunkSize) {
            for (k = new s,
            i = 0,
            j = h; j < h + a.chunkSize; ++i)
                k.digits[i] = d[j++],
                k.digits[i] += d[j++] << 8;
            var n = a.barrett.powMod(k, a.e)
              , o = 16 == a.radix ? f.biToHex(n) : f.biToString(n, a.radix);
            m += o + " "
        }
        return m.substring(0, m.length - 1)
    }
    ,
    f.setMaxDigits(130)
}(window);
function getPwd(pwd){
	return RSAUtils.pwdEncode(pwd);
}