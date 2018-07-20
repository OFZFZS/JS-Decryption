function Base64() {
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    this.encode = function(c) {
        var b = "";
        var j, g, e, k, h, f, d;
        var a = 0;
        c = _utf8_encode(c);
        while (a < c.length) {
            j = c.charCodeAt(a++);
            g = c.charCodeAt(a++);
            e = c.charCodeAt(a++);
            k = j >> 2;
            h = ((j & 3) << 4) | (g >> 4);
            f = ((g & 15) << 2) | (e >> 6);
            d = e & 63;
            if (isNaN(g)) {
                f = d = 64
            } else {
                if (isNaN(e)) {
                    d = 64
                }
            }
            b = b + _keyStr.charAt(k) + _keyStr.charAt(h) + _keyStr.charAt(f) + _keyStr.charAt(d)
        }
        return b
    }
    ;
    this.decode = function(c) {
        var b = "";
        var j, g, e;
        var k, h, f, d;
        var a = 0;
        c = c.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (a < c.length) {
            k = _keyStr.indexOf(c.charAt(a++));
            h = _keyStr.indexOf(c.charAt(a++));
            f = _keyStr.indexOf(c.charAt(a++));
            d = _keyStr.indexOf(c.charAt(a++));
            j = (k << 2) | (h >> 4);
            g = ((h & 15) << 4) | (f >> 2);
            e = ((f & 3) << 6) | d;
            b = b + String.fromCharCode(j);
            if (f != 64) {
                b = b + String.fromCharCode(g)
            }
            if (d != 64) {
                b = b + String.fromCharCode(e)
            }
        }
        b = _utf8_decode(b);
        return b
    }
    ;
    _utf8_encode = function(a) {
        a = a.replace(/\r\n/g, "\n");
        var b = "";
        for (var e = 0; e < a.length; e++) {
            var d = a.charCodeAt(e);
            if (d < 128) {
                b += String.fromCharCode(d)
            } else {
                if ((d > 127) && (d < 2048)) {
                    b += String.fromCharCode((d >> 6) | 192);
                    b += String.fromCharCode((d & 63) | 128)
                } else {
                    b += String.fromCharCode((d >> 12) | 224);
                    b += String.fromCharCode(((d >> 6) & 63) | 128);
                    b += String.fromCharCode((d & 63) | 128)
                }
            }
        }
        return b
    }
    ;
    _utf8_decode = function(d) {
        var b = "";
        var a = 0;
        var e = c1 = c2 = 0;
        while (a < d.length) {
            e = d.charCodeAt(a);
            if (e < 128) {
                b += String.fromCharCode(e);
                a++
            } else {
                if ((e > 191) && (e < 224)) {
                    c2 = d.charCodeAt(a + 1);
                    b += String.fromCharCode(((e & 31) << 6) | (c2 & 63));
                    a += 2
                } else {
                    c2 = d.charCodeAt(a + 1);
                    c3 = d.charCodeAt(a + 2);
                    b += String.fromCharCode(((e & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    a += 3
                }
            }
        }
        return b
    }
}
;
function getPwd(pwd){
	var b =new Base64();
	return b.encode(pwd);
}