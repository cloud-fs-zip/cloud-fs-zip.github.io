/*
  @license
	Rollup.js v3.23.0
	Mon, 22 May 2023 05:28:38 GMT - commit 5ea36552c447d2903050d2622f2dcae3dd2df975

	https://github.com/rollup/rollup

	Released under the MIT License.
*/
var e = "3.23.0";
"undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;
function t(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}
const s = {
    exports: {}
};
!(e => {
    const t = ",".charCodeAt(0)
      , s = ";".charCodeAt(0)
      , i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
      , n = new Uint8Array(64)
      , r = new Uint8Array(128);
    for (let e = 0; e < i.length; e++) {
        const t = i.charCodeAt(e);
        n[e] = t,
        r[t] = e
    }
    const o = "undefined" != typeof TextDecoder ? new TextDecoder : "undefined" != typeof Buffer ? {
        decode: ({buffer, byteOffset, byteLength}) => Buffer.from(buffer, byteOffset, byteLength).toString()
    } : {
        decode(e) {
            let t = "";
            for (let s = 0; s < e.length; s++)
                t += String.fromCharCode(e[s]);
            return t
        }
    };
    function a(e) {
        const t = new Int32Array(5)
          , s = [];
        let i = 0;
        do {
            const n = l(e, i)
              , r = [];
            let o = !0
              , a = 0;
            t[0] = 0;
            for (let s = i; s < n; s++) {
                let i;
                s = h(e, s, t, 0);
                const l = t[0];
                l < a && (o = !1),
                a = l,
                c(e, s, n) ? (s = h(e, s, t, 1),
                s = h(e, s, t, 2),
                s = h(e, s, t, 3),
                c(e, s, n) ? (s = h(e, s, t, 4),
                i = [l, t[1], t[2], t[3], t[4]]) : i = [l, t[1], t[2], t[3]]) : i = [l],
                r.push(i)
            }
            o || u(r),
            s.push(r),
            i = n + 1
        } while (i <= e.length);
        return s
    }
    function l(e, t) {
        const s = e.indexOf(";", t);
        return -1 === s ? e.length : s
    }
    function h(e, t, s, i) {
        let n = 0
          , o = 0
          , a = 0;
        do {
            const s = e.charCodeAt(t++);
            a = r[s],
            n |= (31 & a) << o,
            o += 5
        } while (32 & a);
        const l = 1 & n;
        return n >>>= 1,
        l && (n = -2147483648 | -n),
        s[i] += n,
        t
    }
    function c(e, s, i) {
        return !(s >= i) && e.charCodeAt(s) !== t
    }
    function u(e) {
        e.sort(d)
    }
    function d(e, t) {
        return e[0] - t[0]
    }
    function p(e) {
        const i = new Int32Array(5)
          , n = 16384
          , r = n - 36
          , a = new Uint8Array(n)
          , l = a.subarray(0, r);
        let h = 0
          , c = "";
        for (let u = 0; u < e.length; u++) {
            const d = e[u];
            if (u > 0 && (h === n && (c += o.decode(a),
            h = 0),
            a[h++] = s),
            0 !== d.length) {
                i[0] = 0;
                for (let e = 0; e < d.length; e++) {
                    const s = d[e];
                    h > r && (c += o.decode(l),
                    a.copyWithin(0, r, h),
                    h -= r),
                    e > 0 && (a[h++] = t),
                    h = f(a, h, i, s, 0),
                    1 !== s.length && (h = f(a, h, i, s, 1),
                    h = f(a, h, i, s, 2),
                    h = f(a, h, i, s, 3),
                    4 !== s.length && (h = f(a, h, i, s, 4)))
                }
            }
        }
        return c + o.decode(a.subarray(0, h))
    }
    function f(e, t, s, i, r) {
        const o = i[r];
        let a = o - s[r];
        s[r] = o,
        a = a < 0 ? -a << 1 | 1 : a << 1;
        do {
            let s = 31 & a;
            a >>>= 5,
            a > 0 && (s |= 32),
            e[t++] = n[s]
        } while (a > 0);
        return t
    }
    e.decode = a,
    e.encode = p,
    Object.defineProperty(e, "__esModule", {
        value: !0
    })
})(s.exports);
const i = s.exports;
class n {
    constructor(e) {
        this.bits = e instanceof n ? e.bits.slice() : []
    }
    add(e) {
        this.bits[e >> 5] |= 1 << (31 & e)
    }
    has(e) {
        return !!(this.bits[e >> 5] & 1 << (31 & e))
    }
}
let r = class e {
    constructor(e, t, s) {
        this.start = e,
        this.end = t,
        this.original = s,
        this.intro = "",
        this.outro = "",
        this.content = s,
        this.storeName = !1,
        this.edited = !1,
        this.previous = null,
        this.next = null
    }
    appendLeft(e) {
        this.outro += e
    }
    appendRight(e) {
        this.intro = this.intro + e
    }
    clone() {
        const t = new e(this.start,this.end,this.original);
        return t.intro = this.intro,
        t.outro = this.outro,
        t.content = this.content,
        t.storeName = this.storeName,
        t.edited = this.edited,
        t
    }
    contains(e) {
        return this.start < e && e < this.end
    }
    eachNext(e) {
        let t = this;
        for (; t; )
            e(t),
            t = t.next
    }
    eachPrevious(e) {
        let t = this;
        for (; t; )
            e(t),
            t = t.previous
    }
    edit(e, t, s) {
        return this.content = e,
        s || (this.intro = "",
        this.outro = ""),
        this.storeName = t,
        this.edited = !0,
        this
    }
    prependLeft(e) {
        this.outro = e + this.outro
    }
    prependRight(e) {
        this.intro = e + this.intro
    }
    split(t) {
        const s = t - this.start
          , i = this.original.slice(0, s)
          , n = this.original.slice(s);
        this.original = i;
        const r = new e(t,this.end,n);
        return r.outro = this.outro,
        this.outro = "",
        this.end = t,
        this.edited ? (r.edit("", !1),
        this.content = "") : this.content = i,
        r.next = this.next,
        r.next && (r.next.previous = r),
        r.previous = this,
        this.next = r,
        r
    }
    toString() {
        return this.intro + this.content + this.outro
    }
    trimEnd(e) {
        if (this.outro = this.outro.replace(e, ""),
        this.outro.length)
            return !0;
        const t = this.content.replace(e, "");
        return t.length ? (t !== this.content && this.split(this.start + t.length).edit("", void 0, !0),
        !0) : (this.edit("", void 0, !0),
        this.intro = this.intro.replace(e, ""),
        !!this.intro.length || void 0)
    }
    trimStart(e) {
        if (this.intro = this.intro.replace(e, ""),
        this.intro.length)
            return !0;
        const t = this.content.replace(e, "");
        return t.length ? (t !== this.content && (this.split(this.end - t.length),
        this.edit("", void 0, !0)),
        !0) : (this.edit("", void 0, !0),
        this.outro = this.outro.replace(e, ""),
        !!this.outro.length || void 0)
    }
}
;
function o() {
    return "undefined" != typeof window && "function" == typeof window.btoa ? e=>window.btoa(unescape(encodeURIComponent(e))) : "function" == typeof Buffer ? e=>Buffer.from(e, "utf-8").toString("base64") : ()=>{
        throw new Error("Unsupported environment: `window.btoa` or `Buffer` should be supported.")
    }
}
const a = o();
class l {
    constructor(e) {
        this.version = 3,
        this.file = e.file,
        this.sources = e.sources,
        this.sourcesContent = e.sourcesContent,
        this.names = e.names,
        this.mappings = i.encode(e.mappings),
        void 0 !== e.x_google_ignoreList && (this.x_google_ignoreList = e.x_google_ignoreList)
    }
    toString() {
        return JSON.stringify(this)
    }
    toUrl() {
        return `data:application/json;charset=utf-8;base64,${a(this.toString())}`;
    }
}
function h(e, t) {
    const s = e.split(/[/\\]/)
      , i = t.split(/[/\\]/);
    for (s.pop(); s[0] === i[0]; )
        s.shift(),
        i.shift();
    if (s.length) {
        let e = s.length;
        for (; e--; )
            s[e] = ".."
    }
    return s.concat(i).join("/")
}
const c = Object.prototype.toString;
function u(e) {
    return "[object Object]" === c.call(e)
}
function d(e) {
    const t = e.split("\n")
      , s = [];
    for (let e = 0, i = 0; e < t.length; e++)
        s.push(i),
        i += t[e].length + 1;
    return e => {
        let t = 0
          , i = s.length;
        for (; t < i; ) {
            const n = t + i >> 1;
            e < s[n] ? i = n : t = n + 1
        }
        const n = t - 1;
        return {
            line: n,
            column: e - s[n]
        }
    };
}
class p {
    constructor(e) {
        this.hires = e,
        this.generatedCodeLine = 0,
        this.generatedCodeColumn = 0,
        this.raw = [],
        this.rawSegments = this.raw[this.generatedCodeLine] = [],
        this.pending = null
    }
    addEdit(e, t, {line, column}, i) {
        if (t.length) {
            const t = [this.generatedCodeColumn, e, line, column];
            i >= 0 && t.push(i),
            this.rawSegments.push(t)
        } else
            this.pending && this.rawSegments.push(this.pending);
        this.advance(t),
        this.pending = null
    }
    addUneditedChunk(e, {start, end}, s, i, n) {
        let r = start
          , o = !0;
        for (; r < end; )
            (this.hires || o || n.has(r)) && this.rawSegments.push([this.generatedCodeColumn, e, i.line, i.column]),
            "\n" === s[r] ? (i.line += 1,
            i.column = 0,
            this.generatedCodeLine += 1,
            this.raw[this.generatedCodeLine] = this.rawSegments = [],
            this.generatedCodeColumn = 0,
            o = !0) : (i.column += 1,
            this.generatedCodeColumn += 1,
            o = !1),
            r += 1;
        this.pending = null
    }
    advance(e) {
        if (!e)
            return;
        const t = e.split("\n");
        if (t.length > 1) {
            for (let e = 0; e < t.length - 1; e++)
                this.generatedCodeLine++,
                this.raw[this.generatedCodeLine] = this.rawSegments = [];
            this.generatedCodeColumn = 0
        }
        this.generatedCodeColumn += t[t.length - 1].length
    }
}
const f = "\n"
  , m = {
    insertLeft: !1,
    insertRight: !1,
    storeName: !1
};
class g {
    constructor(e, t={}) {
        const s = new r(0,e.length,e);
        Object.defineProperties(this, {
            original: {
                writable: !0,
                value: e
            },
            outro: {
                writable: !0,
                value: ""
            },
            intro: {
                writable: !0,
                value: ""
            },
            firstChunk: {
                writable: !0,
                value: s
            },
            lastChunk: {
                writable: !0,
                value: s
            },
            lastSearchedChunk: {
                writable: !0,
                value: s
            },
            byStart: {
                writable: !0,
                value: {}
            },
            byEnd: {
                writable: !0,
                value: {}
            },
            filename: {
                writable: !0,
                value: t.filename
            },
            indentExclusionRanges: {
                writable: !0,
                value: t.indentExclusionRanges
            },
            sourcemapLocations: {
                writable: !0,
                value: new n
            },
            storedNames: {
                writable: !0,
                value: {}
            },
            indentStr: {
                writable: !0,
                value: void 0
            },
            ignoreList: {
                writable: !0,
                value: t.ignoreList
            }
        }),
        this.byStart[0] = s,
        this.byEnd[e.length] = s
    }
    addSourcemapLocation(e) {
        this.sourcemapLocations.add(e)
    }
    append(e) {
        if ("string" != typeof e)
            throw new TypeError("outro content must be a string");
        return this.outro += e,
        this
    }
    appendLeft(e, t) {
        if ("string" != typeof t)
            throw new TypeError("inserted content must be a string");
        this._split(e);
        const s = this.byEnd[e];
        return s ? s.appendLeft(t) : this.intro += t,
        this
    }
    appendRight(e, t) {
        if ("string" != typeof t)
            throw new TypeError("inserted content must be a string");
        this._split(e);
        const s = this.byStart[e];
        return s ? s.appendRight(t) : this.outro += t,
        this
    }
    clone() {
        const e = new g(this.original,{
            filename: this.filename
        });
        let t = this.firstChunk
          , s = e.firstChunk = e.lastSearchedChunk = t.clone();
        for (; t; ) {
            e.byStart[s.start] = s,
            e.byEnd[s.end] = s;
            const i = t.next
              , n = i && i.clone();
            n && (s.next = n,
            n.previous = s,
            s = n),
            t = i
        }
        return e.lastChunk = s,
        this.indentExclusionRanges && (e.indentExclusionRanges = this.indentExclusionRanges.slice()),
        e.sourcemapLocations = new n(this.sourcemapLocations),
        e.intro = this.intro,
        e.outro = this.outro,
        e
    }
    generateDecodedMap(e = {}) {
        const t = Object.keys(this.storedNames)
          , s = new p(e.hires)
          , i = d(this.original);
        return this.intro && s.advance(this.intro),
        this.firstChunk.eachNext((e=>{
            const n = i(e.start);
            e.intro.length && s.advance(e.intro),
            e.edited ? s.addEdit(0, e.content, n, e.storeName ? t.indexOf(e.original) : -1) : s.addUneditedChunk(0, e, this.original, n, this.sourcemapLocations),
            e.outro.length && s.advance(e.outro)
        }
        )),
        {
            file: e.file ? e.file.split(/[/\\]/).pop() : void 0,
            sources: [e.source ? h(e.file || "", e.source) : e.file || ""],
            sourcesContent: e.includeContent ? [this.original] : void 0,
            names: t,
            mappings: s.raw,
            x_google_ignoreList: this.ignoreList ? [0] : void 0
        }
    }
    generateMap(e) {
        return new l(this.generateDecodedMap(e))
    }
    _ensureindentStr() {
        void 0 === this.indentStr && (this.indentStr = (e => {
            const t = e.split("\n")
              , s = t.filter((e=>/^\t+/.test(e)))
              , i = t.filter((e=>/^ {2,}/.test(e)));
            if (0 === s.length && 0 === i.length)
                return null;
            if (s.length >= i.length)
                return "\t";
            const n = i.reduce(((e,t)=>{
                const s = /^ +/.exec(t)[0].length;
                return Math.min(s, e)
            }
            ), 1 / 0);
            return new Array(n + 1).join(" ")
        })(this.original))
    }
    _getRawIndentString() {
        return this._ensureindentStr(),
        this.indentStr
    }
    getIndentString() {
        return this._ensureindentStr(),
        null === this.indentStr ? "\t" : this.indentStr
    }
    indent(e, t) {
        const s = /^[^\r\n]/gm;
        if (u(e) && (t = e,
        e = void 0),
        void 0 === e && (this._ensureindentStr(),
        e = this.indentStr || "\t"),
        "" === e)
            return this;
        const i = {};
        if ((t = t || {}).exclude) {
            ("number" == typeof t.exclude[0] ? [t.exclude] : t.exclude).forEach((e=>{
                for (let t = e[0]; t < e[1]; t += 1)
                    i[t] = !0
            }
            ))
        }
        let n = !1 !== t.indentStart;
        const r = t=>n ? `${e}${t}` : (n = !0,
        t);
        this.intro = this.intro.replace(s, r);
        let o = 0
          , a = this.firstChunk;
        for (; a; ) {
            const t = a.end;
            if (a.edited)
                i[o] || (a.content = a.content.replace(s, r),
                a.content.length && (n = "\n" === a.content[a.content.length - 1]));
            else
                for (o = a.start; o < t; ) {
                    if (!i[o]) {
                        const t = this.original[o];
                        "\n" === t ? n = !0 : "\r" !== t && n && (n = !1,
                        o === a.start || (this._splitChunk(a, o),
                        a = a.next),
                        a.prependRight(e))
                    }
                    o += 1
                }
            o = a.end,
            a = a.next
        }
        return this.outro = this.outro.replace(s, r),
        this
    }
    insert() {
        throw new Error("magicString.insert(...) is deprecated. Use prependRight(...) or appendLeft(...)")
    }
    insertLeft(e, t) {
        return m.insertLeft || (console.warn("magicString.insertLeft(...) is deprecated. Use magicString.appendLeft(...) instead"),
        m.insertLeft = !0),
        this.appendLeft(e, t)
    }
    insertRight(e, t) {
        return m.insertRight || (console.warn("magicString.insertRight(...) is deprecated. Use magicString.prependRight(...) instead"),
        m.insertRight = !0),
        this.prependRight(e, t)
    }
    move(e, t, s) {
        if (s >= e && s <= t)
            throw new Error("Cannot move a selection inside itself");
        this._split(e),
        this._split(t),
        this._split(s);
        const i = this.byStart[e]
          , n = this.byEnd[t]
          , r = i.previous
          , o = n.next
          , a = this.byStart[s];
        if (!a && n === this.lastChunk)
            return this;
        const l = a ? a.previous : this.lastChunk;
        return r && (r.next = o),
        o && (o.previous = r),
        l && (l.next = i),
        a && (a.previous = n),
        i.previous || (this.firstChunk = n.next),
        n.next || (this.lastChunk = i.previous,
        this.lastChunk.next = null),
        i.previous = l,
        n.next = a || null,
        l || (this.firstChunk = i),
        a || (this.lastChunk = n),
        this
    }
    overwrite(e, t, s, i) {
        return i = i || {},
        this.update(e, t, s, {
            ...i,
            overwrite: !i.contentOnly
        })
    }
    update(e, t, s, i) {
        if ("string" != typeof s)
            throw new TypeError("replacement content must be a string");
        for (; e < 0; )
            e += this.original.length;
        for (; t < 0; )
            t += this.original.length;
        if (t > this.original.length)
            throw new Error("end is out of bounds");
        if (e === t)
            throw new Error("Cannot overwrite a zero-length range – use appendLeft or prependRight instead");
        this._split(e),
        this._split(t),
        !0 === i && (m.storeName || (console.warn("The final argument to magicString.overwrite(...) should be an options object. See https://github.com/rich-harris/magic-string"),
        m.storeName = !0),
        i = {
            storeName: !0
        });
        const n = void 0 !== i && i.storeName
          , o = void 0 !== i && i.overwrite;
        if (n) {
            const s = this.original.slice(e, t);
            Object.defineProperty(this.storedNames, s, {
                writable: !0,
                value: !0,
                enumerable: !0
            })
        }
        const a = this.byStart[e]
          , l = this.byEnd[t];
        if (a) {
            let e = a;
            for (; e !== l; ) {
                if (e.next !== this.byStart[e.end])
                    throw new Error("Cannot overwrite across a split point");
                e = e.next,
                e.edit("", !1)
            }
            a.edit(s, n, !o)
        } else {
            const i = new r(e,t,"").edit(s, n);
            l.next = i,
            i.previous = l
        }
        return this
    }
    prepend(e) {
        if ("string" != typeof e)
            throw new TypeError("outro content must be a string");
        return this.intro = e + this.intro,
        this
    }
    prependLeft(e, t) {
        if ("string" != typeof t)
            throw new TypeError("inserted content must be a string");
        this._split(e);
        const s = this.byEnd[e];
        return s ? s.prependLeft(t) : this.intro = t + this.intro,
        this
    }
    prependRight(e, t) {
        if ("string" != typeof t)
            throw new TypeError("inserted content must be a string");
        this._split(e);
        const s = this.byStart[e];
        return s ? s.prependRight(t) : this.outro = t + this.outro,
        this
    }
    remove(e, t) {
        for (; e < 0; )
            e += this.original.length;
        for (; t < 0; )
            t += this.original.length;
        if (e === t)
            return this;
        if (e < 0 || t > this.original.length)
            throw new Error("Character is out of bounds");
        if (e > t)
            throw new Error("end must be greater than start");
        this._split(e),
        this._split(t);
        let s = this.byStart[e];
        for (; s; )
            s.intro = "",
            s.outro = "",
            s.edit(""),
            s = t > s.end ? this.byStart[s.end] : null;
        return this
    }
    lastChar() {
        if (this.outro.length)
            return this.outro[this.outro.length - 1];
        let e = this.lastChunk;
        do {
            if (e.outro.length)
                return e.outro[e.outro.length - 1];
            if (e.content.length)
                return e.content[e.content.length - 1];
            if (e.intro.length)
                return e.intro[e.intro.length - 1]
        } while (e = e.previous);
        return this.intro.length ? this.intro[this.intro.length - 1] : ""
    }
    lastLine() {
        let e = this.outro.lastIndexOf(f);
        if (-1 !== e)
            return this.outro.substr(e + 1);
        let t = this.outro
          , s = this.lastChunk;
        do {
            if (s.outro.length > 0) {
                if (e = s.outro.lastIndexOf(f),
                -1 !== e)
                    return s.outro.substr(e + 1) + t;
                t = s.outro + t
            }
            if (s.content.length > 0) {
                if (e = s.content.lastIndexOf(f),
                -1 !== e)
                    return s.content.substr(e + 1) + t;
                t = s.content + t
            }
            if (s.intro.length > 0) {
                if (e = s.intro.lastIndexOf(f),
                -1 !== e)
                    return s.intro.substr(e + 1) + t;
                t = s.intro + t
            }
        } while (s = s.previous);
        return e = this.intro.lastIndexOf(f),
        -1 !== e ? this.intro.substr(e + 1) + t : this.intro + t
    }
    slice(e=0, t=this.original.length) {
        for (; e < 0; )
            e += this.original.length;
        for (; t < 0; )
            t += this.original.length;
        let s = ""
          , i = this.firstChunk;
        for (; i && (i.start > e || i.end <= e); ) {
            if (i.start < t && i.end >= t)
                return s;
            i = i.next
        }
        if (i && i.edited && i.start !== e)
            throw new Error(`Cannot use replaced character ${e} as slice start anchor.`);
        const n = i;
        for (; i; ) {
            !i.intro || n === i && i.start !== e || (s += i.intro);
            const r = i.start < t && i.end >= t;
            if (r && i.edited && i.end !== t)
                throw new Error(`Cannot use replaced character ${t} as slice end anchor.`);
            const o = n === i ? e - i.start : 0
              , a = r ? i.content.length + t - i.end : i.content.length;
            if (s += i.content.slice(o, a),
            !i.outro || r && i.end !== t || (s += i.outro),
            r)
                break;
            i = i.next
        }
        return s
    }
    snip(e, t) {
        const s = this.clone();
        return s.remove(0, e),
        s.remove(t, s.original.length),
        s
    }
    _split(e) {
        if (this.byStart[e] || this.byEnd[e])
            return;
        let t = this.lastSearchedChunk;
        const s = e > t.end;
        for (; t; ) {
            if (t.contains(e))
                return this._splitChunk(t, e);
            t = s ? this.byStart[t.end] : this.byEnd[t.start]
        }
    }
    _splitChunk(e, t) {
        if (e.edited && e.content.length) {
            const s = d(this.original)(t);
            throw new Error(`Cannot split a chunk that has already been edited (${s.line}:${s.column} – "${e.original}")`)
        }
        const s = e.split(t);
        return this.byEnd[t] = e,
        this.byStart[t] = s,
        this.byEnd[s.end] = s,
        e === this.lastChunk && (this.lastChunk = s),
        this.lastSearchedChunk = e,
        !0
    }
    toString() {
        let e = this.intro
          , t = this.firstChunk;
        for (; t; )
            e += t.toString(),
            t = t.next;
        return e + this.outro
    }
    isEmpty() {
        let e = this.firstChunk;
        do {
            if (e.intro.length && e.intro.trim() || e.content.length && e.content.trim() || e.outro.length && e.outro.trim())
                return !1
        } while (e = e.next);
        return !0
    }
    length() {
        let e = this.firstChunk
          , t = 0;
        do {
            t += e.intro.length + e.content.length + e.outro.length
        } while (e = e.next);
        return t
    }
    trimLines() {
        return this.trim("[\\r\\n]")
    }
    trim(e) {
        return this.trimStart(e).trimEnd(e)
    }
    trimEndAborted(e) {
        const t = new RegExp(`${e || "\\s"}+$`);
        if (this.outro = this.outro.replace(t, ""),
        this.outro.length)
            return !0;
        let s = this.lastChunk;
        do {
            const e = s.end
              , i = s.trimEnd(t);
            if (s.end !== e && (this.lastChunk === s && (this.lastChunk = s.next),
            this.byEnd[s.end] = s,
            this.byStart[s.next.start] = s.next,
            this.byEnd[s.next.end] = s.next),
            i)
                return !0;
            s = s.previous
        } while (s);
        return !1
    }
    trimEnd(e) {
        return this.trimEndAborted(e),
        this
    }
    trimStartAborted(e) {
        const t = new RegExp(`^${e || "\\s"}+`);
        if (this.intro = this.intro.replace(t, ""),
        this.intro.length)
            return !0;
        let s = this.firstChunk;
        do {
            const e = s.end
              , i = s.trimStart(t);
            if (s.end !== e && (s === this.lastChunk && (this.lastChunk = s.next),
            this.byEnd[s.end] = s,
            this.byStart[s.next.start] = s.next,
            this.byEnd[s.next.end] = s.next),
            i)
                return !0;
            s = s.next
        } while (s);
        return !1
    }
    trimStart(e) {
        return this.trimStartAborted(e),
        this
    }
    hasChanged() {
        return this.original !== this.toString()
    }
    _replaceRegexp(e, t) {
        function s(e, s) {
            return "string" == typeof t ? t.replace(/\$(\$|&|\d+)/g, ((t,s)=>{
                if ("$" === s)
                    return "$";
                if ("&" === s)
                    return e[0];
                return +s < e.length ? e[+s] : `$ ${s}`
            }
            )) : t(...e, e.index, s, e.groups)
        }
        if (e.global) {
            ((e, t) => {
                let s;
                const i = [];
                for (; s = e.exec(t); )
                    i.push(s);
                return i
            })(e, this.original).forEach((e=>{
                null != e.index && this.overwrite(e.index, e.index + e[0].length, s(e, this.original))
            }
            ))
        } else {
            const t = this.original.match(e);
            t && null != t.index && this.overwrite(t.index, t.index + t[0].length, s(t, this.original))
        }
        return this
    }
    _replaceString(e, t) {
        const {original: s} = this
          , i = s.indexOf(e);
        return -1 !== i && this.overwrite(i, i + e.length, t),
        this
    }
    replace(e, t) {
        return "string" == typeof e ? this._replaceString(e, t) : this._replaceRegexp(e, t)
    }
    _replaceAllString(e, t) {
        const {original: s} = this
          , i = e.length;
        for (let n = s.indexOf(e); -1 !== n; n = s.indexOf(e, n + i))
            this.overwrite(n, n + i, t);
        return this
    }
    replaceAll(e, t) {
        if ("string" == typeof e)
            return this._replaceAllString(e, t);
        if (!e.global)
            throw new TypeError("MagicString.prototype.replaceAll called with a non-global RegExp argument");
        return this._replaceRegexp(e, t)
    }
}
const y = Object.prototype.hasOwnProperty;
const x = /^(?:\/|(?:[A-Za-z]:)?[/\\|])/
  , b = /^\.?\.\//
  , E = /\\/g
  , v = /[/\\]/
  , S = /\.[^.]+$/;
function A(e) {
    return x.test(e)
}
function k(e) {
    return b.test(e)
}
function w(e) {
    return e.replace(E, "/")
}
function I(e) {
    return e.split(v).pop() || ""
}
function P(e) {
    const t = /[/\\][^/\\]*$/.exec(e);
    if (!t)
        return ".";
    return e.slice(0, -t[0].length) || "/"
}
function C(e) {
    const t = S.exec(I(e));
    return t ? t[0] : ""
}
function $(e, t) {
    const s = e.split(v).filter(Boolean)
      , i = t.split(v).filter(Boolean);
    for ("." === s[0] && s.shift(),
    "." === i[0] && i.shift(); s[0] && i[0] && s[0] === i[0]; )
        s.shift(),
        i.shift();
    for (; ".." === i[0] && s.length > 0; )
        i.shift(),
        s.pop();
    for (; s.pop(); )
        i.unshift("..");
    return i.join("/")
}
function N(...e) {
    const t = e.shift();
    if (!t)
        return "/";
    let s = t.split(v);
    for (const t of e)
        if (A(t))
            s = t.split(v);
        else {
            const e = t.split(v);
            for (; "." === e[0] || ".." === e[0]; ) {
                ".." === e.shift() && s.pop()
            }
            s.push(...e)
        }
    return s.join("/")
}
const _ = /[\n\r'\\\u2028\u2029]/
  , R = /([\n\r'\u2028\u2029])/g
  , M = /\\/g;
function T(e) {
    return _.test(e) ? e.replace(M, "\\\\").replace(R, "\\$1") : e
}
function O(e) {
    const t = I(e);
    return t.slice(0, Math.max(0, t.length - C(e).length))
}
function D(e) {
    return A(e) ? $(N(), e) : e
}
function L(e) {
    return "/" === e[0] || "." === e[0] && ("/" === e[1] || "." === e[1]) || A(e)
}
const V = /^(\.\.\/)*\.\.$/;
function B(e, t, s, i) {
    let n = w($(P(e), t));
    if (s && n.endsWith(".js") && (n = n.slice(0, -3)),
    i) {
        if ("" === n)
            return `../${I(t)}`;
        if (V.test(n))
            return [...n.split("/"), "..", I(t)].join("/")
    }
    return n ? n.startsWith("..") ? n : `./${n}` : ".";
}
class z {
    constructor({id, info, renormalizeRenderPath, suggestedVariableName}, t, s) {
        this.options = t,
        this.inputBase = s,
        this.defaultVariableName = "",
        this.namespaceVariableName = "",
        this.variableName = "",
        this.fileName = null,
        this.importAssertions = null,
        this.id = id,
        this.moduleInfo = info,
        this.renormalizeRenderPath = renormalizeRenderPath,
        this.suggestedVariableName = suggestedVariableName
    }
    getFileName() {
        if (this.fileName)
            return this.fileName;
        const {paths: e} = this.options;
        return this.fileName = ("function" == typeof e ? e(this.id) : e[this.id]) || (this.renormalizeRenderPath ? w($(this.inputBase, this.id)) : this.id)
    }
    getImportAssertions(e) {
        return this.importAssertions || (this.importAssertions = ((e, {getObject: t}) => {
            if (!e)
                return null;
            const s = Object.entries(e).map((([e,t])=>[e, `'${t}'`]));
            if (s.length > 0)
                return t(s, {
                    lineBreakIndent: null
                });
            return null
        })(
            "es" === this.options.format && this.options.externalImportAssertions && this.moduleInfo.assertions,
            e
        ));
    }
    getImportPath(e) {
        return T(this.renormalizeRenderPath ? B(e, this.getFileName(), "amd" === this.options.format, !1) : this.getFileName())
    }
}
function F(e, t, s) {
    const i = e.get(t);
    if (void 0 !== i)
        return i;
    const n = s();
    return e.set(t, n),
    n
}
function j() {
    return new Set
}
function U() {
    return []
}
const G = Symbol("Unknown Key")
  , W = Symbol("Unknown Non-Accessor Key")
  , q = Symbol("Unknown Integer")
  , H = Symbol("Symbol.toStringTag")
  , K = []
  , Y = [G]
  , X = [W]
  , Q = [q]
  , J = Symbol("Entities");
class Z {
    constructor() {
        this.entityPaths = Object.create(null, {
            [J]: {
                value: new Set
            }
        })
    }
    trackEntityAtPathAndGetIfTracked(e, t) {
        const s = this.getEntities(e);
        return !!s.has(t) || (s.add(t),
        !1)
    }
    withTrackedEntityAtPath(e, t, s, i) {
        const n = this.getEntities(e);
        if (n.has(t))
            return i;
        n.add(t);
        const r = s();
        return n.delete(t),
        r
    }
    getEntities(e) {
        let t = this.entityPaths;
        for (const s of e)
            t = t[s] = t[s] || Object.create(null, {
                [J]: {
                    value: new Set
                }
            });
        return t[J]
    }
}
const ee = new Z;
class te {
    constructor() {
        this.entityPaths = Object.create(null, {
            [J]: {
                value: new Map
            }
        })
    }
    trackEntityAtPathAndGetIfTracked(e, t, s) {
        let i = this.entityPaths;
        for (const t of e)
            i = i[t] = i[t] || Object.create(null, {
                [J]: {
                    value: new Map
                }
            });
        const n = F(i[J], t, j);
        return !!n.has(s) || (n.add(s),
        !1)
    }
}
const se = Symbol("Unknown Value")
  , ie = Symbol("Unknown Truthy Value");
class ne {
    constructor() {
        this.included = !1
    }
    deoptimizeArgumentsOnInteractionAtPath(e, t, s) {
        ae(e)
    }
    deoptimizePath(e) {}
    getLiteralValueAtPath(e, t, s) {
        return se
    }
    getReturnExpressionWhenCalledAtPath(e, t, s, i) {
        return oe
    }
    hasEffectsOnInteractionAtPath(e, t, s) {
        return !0
    }
    include(e, t, s) {
        this.included = !0
    }
    includeCallArguments(e, t) {
        for (const s of t)
            s.include(e, !1)
    }
    shouldBeIncluded(e) {
        return !0
    }
}
const re = new class extends ne {
}
  , oe = [re, !1]
  , ae = ({args}) => {
    for (const t of args)
        t?.deoptimizePath(Y)
}
  , le = {
    args: [null],
    type: 0
}
  , he = {
    args: [null, re],
    type: 1
}
  , ce = {
    args: [null],
    type: 2,
    withNew: !1
};
class ue extends ne {
    constructor(e) {
        super(),
        this.name = e,
        this.alwaysRendered = !1,
        this.forbiddenNames = null,
        this.initReached = !1,
        this.isId = !1,
        this.isReassigned = !1,
        this.kind = null,
        this.renderBaseName = null,
        this.renderName = null
    }
    addReference(e) {}
    forbidName(e) {
        (this.forbiddenNames || (this.forbiddenNames = new Set)).add(e)
    }
    getBaseVariableName() {
        return this.renderBaseName || this.renderName || this.name
    }
    getName(e, t) {
        if (t?.(this))
            return this.name;
        const s = this.renderName || this.name;
        return this.renderBaseName ? `${this.renderBaseName}${e(s)}` : s
    }
    hasEffectsOnInteractionAtPath({length}, {type: t}, s) {
        return 0 !== t || length > 0;
    }
    include() {
        this.included = !0
    }
    markCalledFromTryStatement() {}
    setRenderNames(e, t) {
        this.renderBaseName = e,
        this.renderName = t
    }
}
class de extends ue {
    constructor(e, t) {
        super(t),
        this.referenced = !1,
        this.module = e,
        this.isNamespace = "*" === t
    }
    addReference({name}) {
        this.referenced = !0,
        "default" !== this.name && "*" !== this.name || this.module.suggestName(name)
    }
    hasEffectsOnInteractionAtPath({length}, {type: t}) {
        return 0 !== t || length > (this.isNamespace ? 1 : 0);
    }
    include() {
        this.included || (this.included = !0,
        this.module.used = !0)
    }
}
const pe = Object.freeze(Object.create(null))
  , fe = Object.freeze({})
  , me = Object.freeze([])
  , ge = Object.freeze(new class extends Set {
    add() {
        throw new Error("Cannot add to empty set")
    }
}
);
function ye(e, t, s) {
    if ("number" == typeof s)
        throw new Error("locate takes a { startIndex, offsetLine, offsetColumn } object as the third argument");
    return ((e, t) => {
        void 0 === t && (t = {});
        const s = t.offsetLine || 0;
        const i = t.offsetColumn || 0;
        const n = e.split("\n");
        let r = 0;

        const o = n.map((({length}, t) => {
            const s = r + length + 1,
                  i = {
                      start: r,
                      end: s,
                      line: t
                  };
            return r = s,
            i
        }
        ));

        let a = 0;
        function l({start, end}, t) {
            return start <= t && t < end;
        }
        function h({line, start}, t) {
            return {
                line: s + line,
                column: i + t - start,
                character: t
            };
        }
        return (t, s) => {
            "string" == typeof t && (t = e.indexOf(t, s || 0));
            for (let i = o[a], n = t >= i.end ? 1 : -1; i; ) {
                if (l(i, t))
                    return h(i, t);
                i = o[a += n]
            }
        };
    })(e, s)(t, s && s.startIndex);
}
function xe(e) {
    return e.replace(/^\t+/, (e=>e.split("\t").join("  ")))
}
const be = 120
  , Ee = 10
  , ve = "...";
function Se(e, t, s) {
    let i = e.split("\n");
    if (t > i.length)
        return "";
    const n = Math.max(xe(i[t - 1].slice(0, s)).length + Ee + ve.length, be)
      , r = Math.max(0, t - 3);
    let o = Math.min(t + 2, i.length);
    for (i = i.slice(r, o); !/\S/.test(i[i.length - 1]); )
        i.pop(),
        o -= 1;
    const a = String(o).length;
    return i.map(((e,i)=>{
        const o = r + i + 1 === t;
        let l = String(i + r + 1);
        for (; l.length < a; )
            l = ` ${l}`;
        let h = xe(e);
        if (h.length > n && (h = `${h.slice(0, n - ve.length)}${ve}`),
        o) {
            const t = `${(e => {
    let t = "";
    for (; e--; )
        t += " ";
    return t
})(a + 2 + xe(e.slice(0, s)).length)}^`;
            return `${l}: ${h}\n ${t}`
        }
        return `${l}: ${h}`
    }
    )).join("\n");
}
function Ae(e, t) {
    const s = e.length <= 1
      , i = e.map((e=>`"${e}"`));
    let n = s ? i[0] : `${i.slice(0, -1).join(", ")} and ${i.slice(-1)[0]}`;
    return t && (n += ` ${s ? t[0] : t[1]}`),
    n
}
function ke(e) {
    return `https://rollupjs.org/${e}`
}
const we = "troubleshooting/#error-name-is-not-exported-by-module"
  , Ie = "troubleshooting/#warning-sourcemap-is-likely-to-be-incorrect"
  , Pe = "configuration-options/#output-amd-id"
  , Ce = "configuration-options/#output-dir"
  , $e = "configuration-options/#output-exports"
  , Ne = "configuration-options/#output-extend"
  , _e = "configuration-options/#output-format"
  , Re = "configuration-options/#output-experimentaldeepdynamicchunkoptimization"
  , Me = "configuration-options/#output-globals"
  , Te = "configuration-options/#output-inlinedynamicimports"
  , Oe = "configuration-options/#output-interop"
  , De = "configuration-options/#output-manualchunks"
  , Le = "configuration-options/#output-name"
  , Ve = "configuration-options/#output-sourcemapfile"
  , Be = "plugin-development/#this-getmoduleinfo";
function ze(e) {
    throw (e instanceof Error || (e = Object.assign(new Error(e.message), e),
    Object.defineProperty(e, "name", {
        value: "RollupError"
    })), e)
}
function Fe(e, t, s, i) {
    if ("object" == typeof t) {
        const {line: s, column: n} = t;
        e.loc = {
            column: n,
            file: i,
            line: s
        }
    } else {
        e.pos = t;
        const {line: n, column: r} = ye(s, t, {
            offsetLine: 1
        });
        e.loc = {
            column: r,
            file: i,
            line: n
        }
    }
    if (void 0 === e.frame) {
        const {line: t, column: i} = e.loc;
        e.frame = Se(s, t, i)
    }
}
const je = "ADDON_ERROR"
  , Ue = "ALREADY_CLOSED"
  , Ge = "ANONYMOUS_PLUGIN_CACHE"
  , We = "ASSET_NOT_FINALISED"
  , qe = "CANNOT_EMIT_FROM_OPTIONS_HOOK"
  , He = "CHUNK_NOT_GENERATED"
  , Ke = "CIRCULAR_REEXPORT"
  , Ye = "DEPRECATED_FEATURE"
  , Xe = "DUPLICATE_PLUGIN_NAME"
  , Qe = "FILE_NAME_CONFLICT"
  , Je = "ILLEGAL_IDENTIFIER_AS_NAME"
  , Ze = "INVALID_CHUNK"
  , et = "INVALID_EXPORT_OPTION"
  , tt = "INVALID_OPTION"
  , st = "INVALID_PLUGIN_HOOK"
  , it = "INVALID_ROLLUP_PHASE"
  , nt = "INVALID_SETASSETSOURCE"
  , rt = "MISSING_EXPORT"
  , ot = "MISSING_GLOBAL_NAME"
  , at = "MISSING_IMPLICIT_DEPENDANT"
  , lt = "MISSING_NAME_OPTION_FOR_IIFE_EXPORT"
  , ht = "MISSING_NODE_BUILTINS"
  , ct = "MISSING_OPTION"
  , ut = "MIXED_EXPORTS"
  , dt = "NO_TRANSFORM_MAP_OR_AST_WITHOUT_CODE"
  , pt = "PLUGIN_ERROR"
  , ft = "SOURCEMAP_BROKEN"
  , mt = "UNEXPECTED_NAMED_IMPORT"
  , gt = "UNKNOWN_OPTION"
  , yt = "UNRESOLVED_ENTRY"
  , xt = "UNRESOLVED_IMPORT"
  , bt = "VALIDATION_ERROR";
function Et() {
    return {
        code: Ue,
        message: 'Bundle is already closed, no more calls to "generate" or "write" are allowed.'
    }
}
function vt(e) {
    return {
        code: "CANNOT_CALL_NAMESPACE",
        message: `Cannot call a namespace ("${e}").`
    }
}
function St({fileName: e, code: t}, {message, loc}) {
    const i = {
        code: "CHUNK_INVALID",
        message: `Chunk "${e}" is not valid JavaScript: ${message}.`
    };
    return Fe(i, loc, t, e),
    i;
}
function At(e) {
    return {
        code: "CIRCULAR_DEPENDENCY",
        ids: e,
        message: `Circular dependency: ${e.map(D).join(" -> ")}`
    }
}
function kt(e, t) {
    return {
        code: "ILLEGAL_REASSIGNMENT",
        message: `Illegal reassignment of import "${e}" in "${D(t)}".`
    }
}
function wt(e, t, s, i) {
    return {
        code: "INCONSISTENT_IMPORT_ASSERTIONS",
        message: `Module "${D(i)}" tried to import "${D(s)}" with ${It(t)} assertions, but it was already imported elsewhere with ${It(e)} assertions. Please ensure that import assertions for the same module are always consistent.`
    }
}
const It = e=>{
    const t = Object.entries(e);
    return 0 === t.length ? "no" : t.map((([e,t])=>`"${e}": "${t}"`)).join(", ")
}
;
function Pt(e, t, s) {
    return {
        code: et,
        message: `"${e}" was specified for "output.exports", but entry module "${D(s)}" has the following exports: ${Ae(t)}`,
        url: ke($e)
    }
}
function Ct(e, t, s, i) {
    return {
        code: tt,
        message: `Invalid value ${void 0 === i ? "" : `${JSON.stringify(i)} `}for option "${e}" - ${s}.`,
        url: ke(t)
    }
}
function $t(e, t, s) {
    const i = ".json" === C(s);
    return {
        binding: e,
        code: rt,
        exporter: s,
        id: t,
        message: `"${e}" is not exported by "${D(s)}", imported by "${D(t)}".${i ? " (Note that you need @rollup/plugin-json to import JSON files)" : ""}`,
        url: ke(we)
    }
}
function Nt({implicitlyLoadedBefore, id}) {
    const t = [...implicitlyLoadedBefore].map((({id}) => D(id))).sort();
    return {
        code: at,
        message: `Module "${D(id)}" that should be implicitly loaded before ${Ae(t)} is not included in the module graph. Either it was not imported by an included module or only via a tree-shaken dynamic import, or no imported bindings were used and it had otherwise no side-effects.`
    };
}
function _t(e, t, {hook: s, id: i}={}) {
    return "string" == typeof e && (e = {
        message: e
    }),
    e.code && e.code !== pt && (e.pluginCode = e.code),
    e.code = pt,
    e.plugin = t,
    s && (e.hook = s),
    i && (e.id = i),
    e
}
function Rt(e) {
    return {
        code: ft,
        message: `Multiple conflicting contents for sourcemap source ${e}`
    }
}
function Mt(e, t, s) {
    const i = s ? "reexport" : "import";
    return {
        code: mt,
        exporter: e,
        message: `The named export "${t}" was ${i}ed from the external module "${D(e)}" even though its interop type is "defaultOnly". Either remove or change this ${i} or change the value of the "output.interop" option.`,
        url: ke(Oe)
    }
}
function Tt(e) {
    return {
        code: mt,
        exporter: e,
        message: `There was a namespace "*" reexport from the external module "${D(e)}" even though its interop type is "defaultOnly". This will be ignored as namespace reexports only reexport named exports. If this is not intended, either remove or change this reexport or change the value of the "output.interop" option.`,
        url: ke(Oe)
    }
}
function Ot(e) {
    return {
        code: bt,
        message: e
    }
}
function Dt(e, t, s, {onwarn, strictDeprecations}, n) {
    Lt(e, t, s, onwarn, strictDeprecations, n)
}
function Lt(e, t, s, i, n, r) {
    if (s || n) {
        const s = ((e, t, s) => ({
            code: Ye,
            message: e,
            url: ke(t),

            ...(s ? {
                plugin: s
            } : {})
        }))(e, t, r);
        if (n)
            return ze(s);
        i(s)
    }
}
const Vt = new Set(["await", "break", "case", "catch", "class", "const", "continue", "debugger", "default", "delete", "do", "else", "enum", "eval", "export", "extends", "false", "finally", "for", "function", "if", "implements", "import", "in", "instanceof", "interface", "let", "NaN", "new", "null", "package", "private", "protected", "public", "return", "static", "super", "switch", "this", "throw", "true", "try", "typeof", "undefined", "var", "void", "while", "with", "yield"]);
const Bt = /[^\w$]/g
  , zt = e=>(e=>/\d/.test(e[0]))(e) || Vt.has(e) || "arguments" === e;
function Ft(e) {
    return e = e.replace(/-(\w)/g, ((e,t)=>t.toUpperCase())).replace(Bt, "_"),
    zt(e) && (e = `_ ${e}`),
    e || "_"
}
class jt {
    constructor(e, t, s, i, n, r) {
        this.options = e,
        this.id = t,
        this.renormalizeRenderPath = n,
        this.dynamicImporters = [],
        this.execIndex = 1 / 0,
        this.exportedVariables = new Map,
        this.importers = [],
        this.reexported = !1,
        this.used = !1,
        this.declarations = new Map,
        this.mostCommonSuggestion = 0,
        this.nameSuggestions = new Map,
        this.suggestedVariableName = Ft(t.split(/[/\\]/).pop());
        const {importers: o, dynamicImporters: a} = this
          , l = this.info = {
            assertions: r,
            ast: null,
            code: null,
            dynamicallyImportedIdResolutions: me,
            dynamicallyImportedIds: me,
            get dynamicImporters() {
                return a.sort()
            },
            exportedBindings: null,
            exports: null,
            hasDefaultExport: null,
            get hasModuleSideEffects() {
                return Dt("Accessing ModuleInfo.hasModuleSideEffects from plugins is deprecated. Please use ModuleInfo.moduleSideEffects instead.", Be, !0, e),
                l.moduleSideEffects
            },
            id: t,
            implicitlyLoadedAfterOneOf: me,
            implicitlyLoadedBefore: me,
            importedIdResolutions: me,
            importedIds: me,
            get importers() {
                return o.sort()
            },
            isEntry: !1,
            isExternal: !0,
            isIncluded: null,
            meta: i,
            moduleSideEffects: s,
            syntheticNamedExports: !1
        };
        Object.defineProperty(this.info, "hasModuleSideEffects", {
            enumerable: !1
        })
    }
    getVariableForExportName(e) {
        const t = this.declarations.get(e);
        if (t)
            return [t];
        const s = new de(this,e);
        return this.declarations.set(e, s),
        this.exportedVariables.set(s, e),
        [s]
    }
    suggestName(e) {
        const t = (this.nameSuggestions.get(e) ?? 0) + 1;
        this.nameSuggestions.set(e, t),
        t > this.mostCommonSuggestion && (this.mostCommonSuggestion = t,
        this.suggestedVariableName = e)
    }
    warnUnusedImports() {
        const e = [...this.declarations].filter((([e,t])=>"*" !== e && !t.included && !this.reexported && !t.referenced)).map((([e])=>e));
        if (0 === e.length)
            return;
        const t = new Set;
        for (const s of e)
            for (const e of this.declarations.get(s).module.importers)
                t.add(e);
        const s = [...t];
        let i, n, r;
        this.options.onwarn({
            code: "UNUSED_EXTERNAL_IMPORT",
            exporter: i = this.id,
            ids: r = s,
            message: `${Ae(n = e, ["is", "are"])} imported from external module "${i}" but never used in ${Ae(r.map((e=>D(e))))}.`,
            names: n
        })
    }
}
const Ut = {
    ArrayPattern(e, {elements}) {
        for (const s of elements)
            s && Ut[s.type](e, s)
    },
    AssignmentPattern(e, {left}) {
        Ut[left.type](e, left)
    },
    Identifier(e, {name}) {
        e.push(name)
    },
    MemberExpression() {},
    ObjectPattern(e, {properties}) {
        for (const s of properties)
            "RestElement" === s.type ? Ut.RestElement(e, s) : Ut[s.value.type](e, s.value)
    },
    RestElement(e, {argument}) {
        Ut[argument.type](e, argument)
    }
}
  , Gt = e => {
    const t = [];
    return Ut[e.type](t, e),
    t
};
function Wt() {
    return {
        brokenFlow: !1,
        hasBreak: !1,
        hasContinue: !1,
        includedCallArguments: new Set,
        includedLabels: new Set
    }
}
function qt() {
    return {
        accessed: new Z,
        assigned: new Z,
        brokenFlow: !1,
        called: new te,
        hasBreak: !1,
        hasContinue: !1,
        ignore: {
            breaks: !1,
            continues: !1,
            labels: new Set,
            returnYield: !1,
            this: !1
        },
        includedLabels: new Set,
        instantiated: new te,
        replacedVariableInits: new Map
    }
}
function Ht(e, t=null) {
    return Object.create(t, e)
}
new Set("break case class catch const continue debugger default delete do else export extends finally for function if import in instanceof let new return super switch this throw try typeof var void while with yield enum await implements package protected static interface private public arguments Infinity NaN undefined null true false eval uneval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Symbol Error EvalError InternalError RangeError ReferenceError SyntaxError TypeError URIError Number Math Date String RegExp Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array Map Set WeakMap WeakSet SIMD ArrayBuffer DataView JSON Promise Generator GeneratorFunction Reflect Proxy Intl".split(" ")).add("");
const Kt = new class extends ne {
    getLiteralValueAtPath() {}
}
  , Yt = {
    value: {
        hasEffectsWhenCalled: null,
        returns: re
    }
}
  , Xt = new (class extends ne {
    getReturnExpressionWhenCalledAtPath(e) {
        return 1 === e.length ? hs(ns, e[0]) : oe
    }
    hasEffectsOnInteractionAtPath(e, t, s) {
        return 0 === t.type ? e.length > 1 : 2 !== t.type || 1 !== e.length || ls(ns, e[0], t, s)
    }
})
  , Qt = {
    value: {
        hasEffectsWhenCalled: null,
        returns: Xt
    }
}
  , Jt = new (class extends ne {
    getReturnExpressionWhenCalledAtPath(e) {
        return 1 === e.length ? hs(rs, e[0]) : oe
    }
    hasEffectsOnInteractionAtPath(e, t, s) {
        return 0 === t.type ? e.length > 1 : 2 !== t.type || 1 !== e.length || ls(rs, e[0], t, s)
    }
})
  , Zt = {
    value: {
        hasEffectsWhenCalled: null,
        returns: Jt
    }
}
  , es = new (class extends ne {
    getReturnExpressionWhenCalledAtPath(e) {
        return 1 === e.length ? hs(as, e[0]) : oe
    }
    hasEffectsOnInteractionAtPath(e, t, s) {
        return 0 === t.type ? e.length > 1 : 2 !== t.type || 1 !== e.length || ls(as, e[0], t, s)
    }
})
  , ts = {
    value: {
        hasEffectsWhenCalled: null,
        returns: es
    }
}
  , ss = {
    value: {
        hasEffectsWhenCalled({args: e}, t) {
            const s = e[2];
            return e.length < 3 || "symbol" == typeof s.getLiteralValueAtPath(K, ee, {
                deoptimizeCache() {}
            }) && s.hasEffectsOnInteractionAtPath(K, ce, t)
        },
        returns: es
    }
}
  , is = Ht({
    hasOwnProperty: Qt,
    isPrototypeOf: Qt,
    propertyIsEnumerable: Qt,
    toLocaleString: ts,
    toString: ts,
    valueOf: Yt
})
  , ns = Ht({
    valueOf: Qt
}, is)
  , rs = Ht({
    toExponential: ts,
    toFixed: ts,
    toLocaleString: ts,
    toPrecision: ts,
    valueOf: Zt
}, is)
  , os = Ht({
    exec: Yt,
    test: Qt
}, is)
  , as = Ht({
    anchor: ts,
    at: Yt,
    big: ts,
    blink: ts,
    bold: ts,
    charAt: ts,
    charCodeAt: Zt,
    codePointAt: Yt,
    concat: ts,
    endsWith: Qt,
    fixed: ts,
    fontcolor: ts,
    fontsize: ts,
    includes: Qt,
    indexOf: Zt,
    italics: ts,
    lastIndexOf: Zt,
    link: ts,
    localeCompare: Zt,
    match: Yt,
    matchAll: Yt,
    normalize: ts,
    padEnd: ts,
    padStart: ts,
    repeat: ts,
    replace: ss,
    replaceAll: ss,
    search: Zt,
    slice: ts,
    small: ts,
    split: Yt,
    startsWith: Qt,
    strike: ts,
    sub: ts,
    substr: ts,
    substring: ts,
    sup: ts,
    toLocaleLowerCase: ts,
    toLocaleUpperCase: ts,
    toLowerCase: ts,
    toString: ts,
    toUpperCase: ts,
    trim: ts,
    trimEnd: ts,
    trimLeft: ts,
    trimRight: ts,
    trimStart: ts,
    valueOf: ts
}, is);
function ls(e, t, s, i) {
    return "string" != typeof t || !e[t] || (e[t].hasEffectsWhenCalled?.(s, i) || !1)
}
function hs(e, t) {
    return "string" == typeof t && e[t] ? [e[t].returns, !1] : oe
}
function cs(e, t, s) {
    s(e, t)
}
function us(e, t, s) {}
const ds = {};
ds.Program = ds.BlockStatement = ds.StaticBlock = ({body}, t, s) => {
    for (let i = 0, n = body; i < n.length; i += 1) {
        s(n[i], t, "Statement")
    }
}
,
ds.Statement = cs,
ds.EmptyStatement = us,
ds.ExpressionStatement = ds.ParenthesizedExpression = ds.ChainExpression = ({expression}, t, s) => s(expression, t, "Expression")
,
ds.IfStatement = ({test, consequent, alternate}, t, s) => {
    s(test, t, "Expression"),
    s(consequent, t, "Statement"),
    alternate && s(alternate, t, "Statement")
}
,
ds.LabeledStatement = ({body}, t, s) => s(body, t, "Statement")
,
ds.BreakStatement = ds.ContinueStatement = us,
ds.WithStatement = ({object, body}, t, s) => {
    s(object, t, "Expression"),
    s(body, t, "Statement")
}
,
ds.SwitchStatement = ({discriminant, cases}, t, s) => {
    s(discriminant, t, "Expression");
    for (let i = 0, n = cases; i < n.length; i += 1) {
        const r = n[i];
        r.test && s(r.test, t, "Expression");
        for (let o = 0, a = r.consequent; o < a.length; o += 1) {
            s(a[o], t, "Statement")
        }
    }
}
,
ds.SwitchCase = ({test, consequent}, t, s) => {
    test && s(test, t, "Expression");
    for (let i = 0, n = consequent; i < n.length; i += 1) {
        s(n[i], t, "Statement")
    }
}
,
ds.ReturnStatement = ds.YieldExpression = ds.AwaitExpression = ({argument}, t, s) => {
    argument && s(argument, t, "Expression")
}
,
ds.ThrowStatement = ds.SpreadElement = ({argument}, t, s) => s(argument, t, "Expression")
,
ds.TryStatement = ({block, handler, finalizer}, t, s) => {
    s(block, t, "Statement"),
    handler && s(handler, t),
    finalizer && s(finalizer, t, "Statement")
}
,
ds.CatchClause = ({param, body}, t, s) => {
    param && s(param, t, "Pattern"),
    s(body, t, "Statement")
}
,
ds.WhileStatement = ds.DoWhileStatement = ({test, body}, t, s) => {
    s(test, t, "Expression"),
    s(body, t, "Statement")
}
,
ds.ForStatement = ({init, test, update, body}, t, s) => {
    init && s(init, t, "ForInit"),
    test && s(test, t, "Expression"),
    update && s(update, t, "Expression"),
    s(body, t, "Statement")
}
,
ds.ForInStatement = ds.ForOfStatement = ({left, right, body}, t, s) => {
    s(left, t, "ForInit"),
    s(right, t, "Expression"),
    s(body, t, "Statement")
}
,
ds.ForInit = (e, t, s) => {
    "VariableDeclaration" === e.type ? s(e, t) : s(e, t, "Expression")
}
,
ds.DebuggerStatement = us,
ds.FunctionDeclaration = (e, t, s) => s(e, t, "Function")
,
ds.VariableDeclaration = ({declarations}, t, s) => {
    for (let i = 0, n = declarations; i < n.length; i += 1) {
        s(n[i], t)
    }
}
,
ds.VariableDeclarator = ({id, init}, t, s) => {
    s(id, t, "Pattern"),
    init && s(init, t, "Expression")
}
,
ds.Function = ({id, params, body, expression}, t, s) => {
    id && s(id, t, "Pattern");
    for (let i = 0, n = params; i < n.length; i += 1) {
        s(n[i], t, "Pattern")
    }
    s(body, t, expression ? "Expression" : "Statement")
}
,
ds.Pattern = (e, t, s) => {
    "Identifier" === e.type ? s(e, t, "VariablePattern") : "MemberExpression" === e.type ? s(e, t, "MemberPattern") : s(e, t)
}
,
ds.VariablePattern = us,
ds.MemberPattern = cs,
ds.RestElement = ({argument}, t, s) => s(argument, t, "Pattern")
,
ds.ArrayPattern = ({elements}, t, s) => {
    for (let i = 0, n = elements; i < n.length; i += 1) {
        const r = n[i];
        r && s(r, t, "Pattern")
    }
}
,
ds.ObjectPattern = ({properties}, t, s) => {
    for (let i = 0, n = properties; i < n.length; i += 1) {
        const r = n[i];
        "Property" === r.type ? (r.computed && s(r.key, t, "Expression"),
        s(r.value, t, "Pattern")) : "RestElement" === r.type && s(r.argument, t, "Pattern")
    }
}
,
ds.Expression = cs,
ds.ThisExpression = ds.Super = ds.MetaProperty = us,
ds.ArrayExpression = ({elements}, t, s) => {
    for (let i = 0, n = elements; i < n.length; i += 1) {
        const r = n[i];
        r && s(r, t, "Expression")
    }
}
,
ds.ObjectExpression = ({properties}, t, s) => {
    for (let i = 0, n = properties; i < n.length; i += 1) {
        s(n[i], t)
    }
}
,
ds.FunctionExpression = ds.ArrowFunctionExpression = ds.FunctionDeclaration,
ds.SequenceExpression = ({expressions}, t, s) => {
    for (let i = 0, n = expressions; i < n.length; i += 1) {
        s(n[i], t, "Expression")
    }
}
,
ds.TemplateLiteral = ({quasis, expressions}, t, s) => {
    for (let i = 0, n = quasis; i < n.length; i += 1) {
        s(n[i], t)
    }
    for (let r = 0, o = expressions; r < o.length; r += 1) {
        s(o[r], t, "Expression")
    }
}
,
ds.TemplateElement = us,
ds.UnaryExpression = ds.UpdateExpression = ({argument}, t, s) => {
    s(argument, t, "Expression")
}
,
ds.BinaryExpression = ds.LogicalExpression = ({left, right}, t, s) => {
    s(left, t, "Expression"),
    s(right, t, "Expression")
}
,
ds.AssignmentExpression = ds.AssignmentPattern = ({left, right}, t, s) => {
    s(left, t, "Pattern"),
    s(right, t, "Expression")
}
,
ds.ConditionalExpression = ({test, consequent, alternate}, t, s) => {
    s(test, t, "Expression"),
    s(consequent, t, "Expression"),
    s(alternate, t, "Expression")
}
,
ds.NewExpression = ds.CallExpression = function(e, t, s) {
    if (s(e.callee, t, "Expression"),
    e.arguments)
        for (let i = 0, n = e.arguments; i < n.length; i += 1) {
            s(n[i], t, "Expression")
        }
}
,
ds.MemberExpression = ({object, computed, property}, t, s) => {
    s(object, t, "Expression"),
    computed && s(property, t, "Expression")
}
,
ds.ExportNamedDeclaration = ds.ExportDefaultDeclaration = ({declaration, type, source}, t, s) => {
    declaration && s(declaration, t, "ExportNamedDeclaration" === type || declaration.id ? "Statement" : "Expression"),
    source && s(source, t, "Expression")
}
,
ds.ExportAllDeclaration = ({exported, source}, t, s) => {
    exported && s(exported, t),
    s(source, t, "Expression")
}
,
ds.ImportDeclaration = ({specifiers, source}, t, s) => {
    for (let i = 0, n = specifiers; i < n.length; i += 1) {
        s(n[i], t)
    }
    s(source, t, "Expression")
}
,
ds.ImportExpression = ({source}, t, s) => {
    s(source, t, "Expression")
}
,
ds.ImportSpecifier = ds.ImportDefaultSpecifier = ds.ImportNamespaceSpecifier = ds.Identifier = ds.PrivateIdentifier = ds.Literal = us,
ds.TaggedTemplateExpression = ({tag, quasi}, t, s) => {
    s(tag, t, "Expression"),
    s(quasi, t, "Expression")
}
,
ds.ClassDeclaration = ds.ClassExpression = (e, t, s) => s(e, t, "Class")
,
ds.Class = ({id, superClass, body}, t, s) => {
    id && s(id, t, "Pattern"),
    superClass && s(superClass, t, "Expression"),
    s(body, t)
}
,
ds.ClassBody = ({body}, t, s) => {
    for (let i = 0, n = body; i < n.length; i += 1) {
        s(n[i], t)
    }
}
,
ds.MethodDefinition = ds.PropertyDefinition = ds.Property = ({computed, key, value}, t, s) => {
    computed && s(key, t, "Expression"),
    value && s(value, t, "Expression")
}
;
const ps = "ArrowFunctionExpression"
  , fs = "BinaryExpression"
  , ms = "BlockStatement"
  , gs = "CallExpression"
  , ys = "ChainExpression"
  , xs = "ConditionalExpression"
  , bs = "ExpressionStatement"
  , Es = "Identifier"
  , vs = "LogicalExpression"
  , Ss = "NewExpression"
  , As = "Program"
  , ks = "SequenceExpression";
let ws = "sourceMa";
ws += "ppingURL";
const Is = new RegExp(`^#[ \\f\\r\\t\\v\\u00a0\\u1680\\u2000-\\u200a\\u2028\\u2029\\u202f\\u205f\\u3000\\ufeff]+${ws}=.+`)
  , Ps = "_rollupAnnotations"
  , Cs = "_rollupRemoved";
function $s(e, t, s=e.type) {
    const {annotations: i, code: n} = t;
    let r = i[t.annotationIndex];
    for (; r && e.start >= r.end; )
        Rs(e, r, n),
        r = i[++t.annotationIndex];
    if (r && r.end <= e.end)
        for (ds[s](e, t, $s); (r = i[t.annotationIndex]) && r.end <= e.end; )
            ++t.annotationIndex,
            Os(e, r, !1)
}
const Ns = /[^\s(]/g
  , _s = /\S/g;
function Rs(e, t, s) {
    const i = [];
    let n;
    if (Ms(s.slice(t.end, e.start), Ns)) {
        const t = e.start;
        for (; ; ) {
            switch (i.push(e),
            e.type) {
            case bs:
            case ys:
                e = e.expression;
                continue;
            case ks:
                if (Ms(s.slice(t, e.start), _s)) {
                    e = e.expressions[0];
                    continue
                }
                n = !0;
                break;
            case xs:
                if (Ms(s.slice(t, e.start), _s)) {
                    e = e.test;
                    continue
                }
                n = !0;
                break;
            case vs:
            case fs:
                if (Ms(s.slice(t, e.start), _s)) {
                    e = e.left;
                    continue
                }
                n = !0;
                break;
            case gs:
            case Ss:
                break;
            default:
                n = !0
            }
            break
        }
    } else
        n = !0;
    if (n)
        Os(e, t, !1);
    else
        for (const e of i)
            Os(e, t, !0)
}
function Ms(e, t) {
    let s;
    for (; null !== (s = t.exec(e)); ) {
        if ("/" === s[0]) {
            const s = e.charCodeAt(t.lastIndex);
            if (42 === s) {
                t.lastIndex = e.indexOf("*/", t.lastIndex + 1) + 2;
                continue
            }
            if (47 === s) {
                t.lastIndex = e.indexOf("\n", t.lastIndex + 1) + 1;
                continue
            }
        }
        return t.lastIndex = 0,
        !1
    }
    return !0
}
const Ts = /[#@]__PURE__/;
function Os(e, t, s) {
    const i = s ? Ps : Cs
      , n = e[i];
    n ? n.push(t) : e[i] = [t]
}
const Ds = {
    ImportExpression: ["arguments"],
    Literal: [],
    Program: ["body"]
};
const Ls = "variables";
class Vs extends ne {
    constructor(e, t, s, i=!1) {
        super(),
        this.deoptimized = !1,
        this.esTreeNode = i ? e : null,
        this.keys = Ds[e.type] || (e => (Ds[e.type] = Object.keys(e).filter((t=>"object" == typeof e[t] && 95 !== t.charCodeAt(0))), Ds[e.type]))(e),
        this.parent = t,
        this.context = t.context,
        this.createScope(s),
        this.parseNode(e),
        this.initialise(),
        this.context.magicString.addSourcemapLocation(this.start),
        this.context.magicString.addSourcemapLocation(this.end)
    }
    addExportedVariables(e, t) {}
    bind() {
        for (const e of this.keys) {
            const t = this[e];
            if (Array.isArray(t))
                for (const e of t)
                    e?.bind();
            else
                t && t.bind()
        }
    }
    createScope(e) {
        this.scope = e
    }
    hasEffects(e) {
        this.deoptimized || this.applyDeoptimizations();
        for (const t of this.keys) {
            const s = this[t];
            if (null !== s)
                if (Array.isArray(s)) {
                    for (const t of s)
                        if (t?.hasEffects(e))
                            return !0
                } else if (s.hasEffects(e))
                    return !0
        }
        return !1
    }
    hasEffectsAsAssignmentTarget(e, t) {
        return this.hasEffects(e) || this.hasEffectsOnInteractionAtPath(K, this.assignmentInteraction, e)
    }
    include(e, t, s) {
        this.deoptimized || this.applyDeoptimizations(),
        this.included = !0;
        for (const s of this.keys) {
            const i = this[s];
            if (null !== i)
                if (Array.isArray(i))
                    for (const s of i)
                        s?.include(e, t);
                else
                    i.include(e, t)
        }
    }
    includeAsAssignmentTarget(e, t, s) {
        this.include(e, t)
    }
    initialise() {}
    insertSemicolon(e) {
        ";" !== e.original[this.end - 1] && e.appendLeft(this.end, ";")
    }
    parseNode(e, t) {
        for (const [s,i] of Object.entries(e))
            if (!this.hasOwnProperty(s))
                if (95 === s.charCodeAt(0)) {
                    if (s === Ps)
                        this.annotations = i;
                    else if (s === Cs)
                        for (const {start: e, end: t} of i)
                            this.context.magicString.remove(e, t)
                } else if ("object" != typeof i || null === i)
                    this[s] = i;
                else if (Array.isArray(i)) {
                    this[s] = [];
                    for (const e of i)
                        this[s].push(null === e ? null : new (this.context.getNodeConstructor(e.type))(e,this,this.scope,t?.includes(s)))
                } else
                    this[s] = new (this.context.getNodeConstructor(i.type))(i,this,this.scope,t?.includes(s))
    }
    render(e, t) {
        for (const s of this.keys) {
            const i = this[s];
            if (null !== i)
                if (Array.isArray(i))
                    for (const s of i)
                        s?.render(e, t);
                else
                    i.render(e, t)
        }
    }
    setAssignedValue(e) {
        this.assignmentInteraction = {
            args: [null, e],
            type: 1
        }
    }
    shouldBeIncluded({brokenFlow}) {
        return this.included || !brokenFlow && this.hasEffects(qt());
    }
    applyDeoptimizations() {
        this.deoptimized = !0;
        for (const e of this.keys) {
            const t = this[e];
            if (null !== t)
                if (Array.isArray(t))
                    for (const e of t)
                        e?.deoptimizePath(Y);
                else
                    t.deoptimizePath(Y)
        }
        this.context.requestTreeshakingPass()
    }
}
class Bs extends Vs {
    deoptimizeArgumentsOnInteractionAtPath(e, t, s) {
        t.length > 0 && this.argument.deoptimizeArgumentsOnInteractionAtPath(e, [G, ...t], s)
    }
    hasEffects(e) {
        this.deoptimized || this.applyDeoptimizations();
        const {propertyReadSideEffects: t} = this.context.options.treeshake;
        return this.argument.hasEffects(e) || t && ("always" === t || this.argument.hasEffectsOnInteractionAtPath(Y, le, e))
    }
    applyDeoptimizations() {
        this.deoptimized = !0,
        this.argument.deoptimizePath([G, G]),
        this.context.requestTreeshakingPass()
    }
}
class zs extends ne {
    constructor(e) {
        super(),
        this.description = e
    }
    deoptimizeArgumentsOnInteractionAtPath({args: e, type: t}, {length}) {
        2 === t && 0 === length && this.description.mutatesSelfAsArray && e[0]?.deoptimizePath(Q)
    }
    getReturnExpressionWhenCalledAtPath({length}, {args: t}) {
        return length > 0 ? oe : [this.description.returnsPrimitive || ("self" === this.description.returns ? t[0] || re : this.description.returns()), !1];
    }
    hasEffectsOnInteractionAtPath({length}, t, s) {
        const {type: i} = t;
        if (length > (0 === i ? 1 : 0))
            return !0;
        if (2 === i) {
            const {args: e} = t;
            if (!0 === this.description.mutatesSelfAsArray && e[0]?.hasEffectsOnInteractionAtPath(Q, he, s))
                return !0;
            if (this.description.callsArgs)
                for (const t of this.description.callsArgs)
                    if (e[t + 1]?.hasEffectsOnInteractionAtPath(K, ce, s))
                        return !0
        }
        return !1
    }
}
const Fs = [new zs({
    callsArgs: null,
    mutatesSelfAsArray: !1,
    returns: null,
    returnsPrimitive: Xt
})]
  , js = [new zs({
    callsArgs: null,
    mutatesSelfAsArray: !1,
    returns: null,
    returnsPrimitive: es
})]
  , Us = [new zs({
    callsArgs: null,
    mutatesSelfAsArray: !1,
    returns: null,
    returnsPrimitive: Jt
})]
  , Gs = [new zs({
    callsArgs: null,
    mutatesSelfAsArray: !1,
    returns: null,
    returnsPrimitive: re
})]
  , Ws = /^\d+$/;
class qs extends ne {
    constructor(e, t, s=!1) {
        if (super(),
        this.prototypeExpression = t,
        this.immutable = s,
        this.additionalExpressionsToBeDeoptimized = new Set,
        this.allProperties = [],
        this.deoptimizedPaths = Object.create(null),
        this.expressionsToBeDeoptimizedByKey = Object.create(null),
        this.gettersByKey = Object.create(null),
        this.hasLostTrack = !1,
        this.hasUnknownDeoptimizedInteger = !1,
        this.hasUnknownDeoptimizedProperty = !1,
        this.propertiesAndGettersByKey = Object.create(null),
        this.propertiesAndSettersByKey = Object.create(null),
        this.settersByKey = Object.create(null),
        this.unknownIntegerProps = [],
        this.unmatchableGetters = [],
        this.unmatchablePropertiesAndGetters = [],
        this.unmatchableSetters = [],
        Array.isArray(e))
            this.buildPropertyMaps(e);
        else {
            this.propertiesAndGettersByKey = this.propertiesAndSettersByKey = e;
            for (const t of Object.values(e))
                this.allProperties.push(...t)
        }
    }
    deoptimizeAllProperties(e) {
        const t = this.hasLostTrack || this.hasUnknownDeoptimizedProperty;
        if (e ? this.hasUnknownDeoptimizedProperty = !0 : this.hasLostTrack = !0,
        !t) {
            for (const e of [...Object.values(this.propertiesAndGettersByKey), ...Object.values(this.settersByKey)])
                for (const t of e)
                    t.deoptimizePath(Y);
            this.prototypeExpression?.deoptimizePath([G, G]),
            this.deoptimizeCachedEntities()
        }
    }
    deoptimizeArgumentsOnInteractionAtPath(e, t, s) {
        const [i,...n] = t
          , {args: r, type: o} = e;
        if (this.hasLostTrack || (2 === o || t.length > 1) && (this.hasUnknownDeoptimizedProperty || "string" == typeof i && this.deoptimizedPaths[i]))
            return void ae(e);
        const [a,l,h] = 2 === o || t.length > 1 ? [this.propertiesAndGettersByKey, this.propertiesAndGettersByKey, this.unmatchablePropertiesAndGetters] : 0 === o ? [this.propertiesAndGettersByKey, this.gettersByKey, this.unmatchableGetters] : [this.propertiesAndSettersByKey, this.settersByKey, this.unmatchableSetters];
        if ("string" == typeof i) {
            if (a[i]) {
                const t = l[i];
                if (t)
                    for (const i of t)
                        i.deoptimizeArgumentsOnInteractionAtPath(e, n, s);
                if (!this.immutable)
                    for (const e of r)
                        e && this.additionalExpressionsToBeDeoptimized.add(e);
                return
            }
            for (const t of h)
                t.deoptimizeArgumentsOnInteractionAtPath(e, n, s);
            if (Ws.test(i))
                for (const t of this.unknownIntegerProps)
                    t.deoptimizeArgumentsOnInteractionAtPath(e, n, s)
        } else {
            for (const t of [...Object.values(l), h])
                for (const i of t)
                    i.deoptimizeArgumentsOnInteractionAtPath(e, n, s);
            for (const t of this.unknownIntegerProps)
                t.deoptimizeArgumentsOnInteractionAtPath(e, n, s)
        }
        if (!this.immutable)
            for (const e of r)
                e && this.additionalExpressionsToBeDeoptimized.add(e);
        this.prototypeExpression?.deoptimizeArgumentsOnInteractionAtPath(e, t, s)
    }
    deoptimizeIntegerProperties() {
        if (!(this.hasLostTrack || this.hasUnknownDeoptimizedProperty || this.hasUnknownDeoptimizedInteger)) {
            this.hasUnknownDeoptimizedInteger = !0;
            for (const [e,t] of Object.entries(this.propertiesAndGettersByKey))
                if (Ws.test(e))
                    for (const e of t)
                        e.deoptimizePath(Y);
            this.deoptimizeCachedIntegerEntities()
        }
    }
    deoptimizePath(e) {
        if (this.hasLostTrack || this.immutable)
            return;
        const t = e[0];
        if (1 === e.length) {
            if ("string" != typeof t)
                return t === q ? this.deoptimizeIntegerProperties() : this.deoptimizeAllProperties(t === W);
            if (!this.deoptimizedPaths[t]) {
                this.deoptimizedPaths[t] = !0;
                const e = this.expressionsToBeDeoptimizedByKey[t];
                if (e)
                    for (const t of e)
                        t.deoptimizeCache()
            }
        }
        const s = 1 === e.length ? Y : e.slice(1);
        for (const e of "string" == typeof t ? [...(this.propertiesAndGettersByKey[t] || this.unmatchablePropertiesAndGetters), ...(this.settersByKey[t] || this.unmatchableSetters)] : this.allProperties)
            e.deoptimizePath(s);
        this.prototypeExpression?.deoptimizePath(1 === e.length ? [...e, G] : e)
    }
    getLiteralValueAtPath(e, t, s) {
        if (0 === e.length)
            return ie;
        const i = e[0]
          , n = this.getMemberExpressionAndTrackDeopt(i, s);
        return n ? n.getLiteralValueAtPath(e.slice(1), t, s) : this.prototypeExpression ? this.prototypeExpression.getLiteralValueAtPath(e, t, s) : 1 !== e.length ? se : void 0
    }
    getReturnExpressionWhenCalledAtPath(e, t, s, i) {
        if (0 === e.length)
            return oe;
        const [n,...r] = e
          , o = this.getMemberExpressionAndTrackDeopt(n, i);
        return o ? o.getReturnExpressionWhenCalledAtPath(r, t, s, i) : this.prototypeExpression ? this.prototypeExpression.getReturnExpressionWhenCalledAtPath(e, t, s, i) : oe
    }
    hasEffectsOnInteractionAtPath(e, t, s) {
        const [i,...n] = e;
        if (n.length > 0 || 2 === t.type) {
            const r = this.getMemberExpression(i);
            return r ? r.hasEffectsOnInteractionAtPath(n, t, s) : !this.prototypeExpression || this.prototypeExpression.hasEffectsOnInteractionAtPath(e, t, s)
        }
        if (i === W)
            return !1;
        if (this.hasLostTrack)
            return !0;
        const [r,o,a] = 0 === t.type ? [this.propertiesAndGettersByKey, this.gettersByKey, this.unmatchableGetters] : [this.propertiesAndSettersByKey, this.settersByKey, this.unmatchableSetters];
        if ("string" == typeof i) {
            if (r[i]) {
                const e = o[i];
                if (e)
                    for (const i of e)
                        if (i.hasEffectsOnInteractionAtPath(n, t, s))
                            return !0;
                return !1
            }
            for (const e of a)
                if (e.hasEffectsOnInteractionAtPath(n, t, s))
                    return !0
        } else
            for (const e of [...Object.values(o), a])
                for (const i of e)
                    if (i.hasEffectsOnInteractionAtPath(n, t, s))
                        return !0;
        return !!this.prototypeExpression && this.prototypeExpression.hasEffectsOnInteractionAtPath(e, t, s)
    }
    buildPropertyMaps(e) {
        const {allProperties: t, propertiesAndGettersByKey: s, propertiesAndSettersByKey: i, settersByKey: n, gettersByKey: r, unknownIntegerProps: o, unmatchablePropertiesAndGetters: a, unmatchableGetters: l, unmatchableSetters: h} = this
          , c = [];
        for (let u = e.length - 1; u >= 0; u--) {
            const {key: d, kind: p, property: f} = e[u];
            if (t.push(f),
            "string" == typeof d)
                "set" === p ? i[d] || (i[d] = [f, ...c],
                n[d] = [f, ...h]) : "get" === p ? s[d] || (s[d] = [f, ...a],
                r[d] = [f, ...l]) : (i[d] || (i[d] = [f, ...c]),
                s[d] || (s[d] = [f, ...a]));
            else {
                if (d === q) {
                    o.push(f);
                    continue
                }
                "set" === p && h.push(f),
                "get" === p && l.push(f),
                "get" !== p && c.push(f),
                "set" !== p && a.push(f)
            }
        }
    }
    deoptimizeCachedEntities() {
        for (const e of Object.values(this.expressionsToBeDeoptimizedByKey))
            for (const t of e)
                t.deoptimizeCache();
        for (const e of this.additionalExpressionsToBeDeoptimized)
            e.deoptimizePath(Y)
    }
    deoptimizeCachedIntegerEntities() {
        for (const [e,t] of Object.entries(this.expressionsToBeDeoptimizedByKey))
            if (Ws.test(e))
                for (const e of t)
                    e.deoptimizeCache();
        for (const e of this.additionalExpressionsToBeDeoptimized)
            e.deoptimizePath(Q)
    }
    getMemberExpression(e) {
        if (this.hasLostTrack || this.hasUnknownDeoptimizedProperty || "string" != typeof e || this.hasUnknownDeoptimizedInteger && Ws.test(e) || this.deoptimizedPaths[e])
            return re;
        const t = this.propertiesAndGettersByKey[e];
        return 1 === t?.length ? t[0] : t || this.unmatchablePropertiesAndGetters.length > 0 || this.unknownIntegerProps.length > 0 && Ws.test(e) ? re : null
    }
    getMemberExpressionAndTrackDeopt(e, t) {
        if ("string" != typeof e)
            return re;
        const s = this.getMemberExpression(e);
        if (s !== re && !this.immutable) {
            (this.expressionsToBeDeoptimizedByKey[e] = this.expressionsToBeDeoptimizedByKey[e] || []).push(t)
        }
        return s
    }
}
const Hs = e=>"string" == typeof e && /^\d+$/.test(e)
  , Ks = new (class extends ne {
    deoptimizeArgumentsOnInteractionAtPath(e, t) {
        2 !== e.type || 1 !== t.length || Hs(t[0]) || ae(e)
    }
    getLiteralValueAtPath(e) {
        return 1 === e.length && Hs(e[0]) ? void 0 : se
    }
    hasEffectsOnInteractionAtPath({length}, {type: t}) {
        return length > 1 || 2 === t;
    }
})
  , Ys = new qs({
    __proto__: null,
    hasOwnProperty: Fs,
    isPrototypeOf: Fs,
    propertyIsEnumerable: Fs,
    toLocaleString: js,
    toString: js,
    valueOf: Gs
},Ks,!0)
  , Xs = [{
    key: q,
    kind: "init",
    property: re
}, {
    key: "length",
    kind: "init",
    property: Jt
}]
  , Qs = [new zs({
    callsArgs: [0],
    mutatesSelfAsArray: "deopt-only",
    returns: null,
    returnsPrimitive: Xt
})]
  , Js = [new zs({
    callsArgs: [0],
    mutatesSelfAsArray: "deopt-only",
    returns: null,
    returnsPrimitive: Jt
})]
  , Zs = [new zs({
    callsArgs: null,
    mutatesSelfAsArray: !0,
    returns: ()=>new qs(Xs,li),
    returnsPrimitive: null
})]
  , ei = [new zs({
    callsArgs: null,
    mutatesSelfAsArray: "deopt-only",
    returns: ()=>new qs(Xs,li),
    returnsPrimitive: null
})]
  , ti = [new zs({
    callsArgs: [0],
    mutatesSelfAsArray: "deopt-only",
    returns: ()=>new qs(Xs,li),
    returnsPrimitive: null
})]
  , si = [new zs({
    callsArgs: null,
    mutatesSelfAsArray: !0,
    returns: null,
    returnsPrimitive: Jt
})]
  , ii = [new zs({
    callsArgs: null,
    mutatesSelfAsArray: !0,
    returns: null,
    returnsPrimitive: re
})]
  , ni = [new zs({
    callsArgs: null,
    mutatesSelfAsArray: "deopt-only",
    returns: null,
    returnsPrimitive: re
})]
  , ri = [new zs({
    callsArgs: [0],
    mutatesSelfAsArray: "deopt-only",
    returns: null,
    returnsPrimitive: re
})]
  , oi = [new zs({
    callsArgs: null,
    mutatesSelfAsArray: !0,
    returns: "self",
    returnsPrimitive: null
})]
  , ai = [new zs({
    callsArgs: [0],
    mutatesSelfAsArray: !0,
    returns: "self",
    returnsPrimitive: null
})]
  , li = new qs({
    __proto__: null,
    at: ni,
    concat: ei,
    copyWithin: oi,
    entries: ei,
    every: Qs,
    fill: oi,
    filter: ti,
    find: ri,
    findIndex: Js,
    findLast: ri,
    findLastIndex: Js,
    flat: ei,
    flatMap: ti,
    forEach: ri,
    includes: Fs,
    indexOf: Us,
    join: js,
    keys: Gs,
    lastIndexOf: Us,
    map: ti,
    pop: ii,
    push: si,
    reduce: ri,
    reduceRight: ri,
    reverse: oi,
    shift: ii,
    slice: ei,
    some: Qs,
    sort: ai,
    splice: Zs,
    toLocaleString: js,
    toString: js,
    unshift: si,
    values: ni
},Ys,!0);
class hi extends Vs {
    constructor(...args) {
        super(...args),
        this.objectEntity = null
    }
    deoptimizeArgumentsOnInteractionAtPath(e, t, s) {
        this.getObjectEntity().deoptimizeArgumentsOnInteractionAtPath(e, t, s)
    }
    deoptimizePath(e) {
        this.getObjectEntity().deoptimizePath(e)
    }
    getLiteralValueAtPath(e, t, s) {
        return this.getObjectEntity().getLiteralValueAtPath(e, t, s)
    }
    getReturnExpressionWhenCalledAtPath(e, t, s, i) {
        return this.getObjectEntity().getReturnExpressionWhenCalledAtPath(e, t, s, i)
    }
    hasEffectsOnInteractionAtPath(e, t, s) {
        return this.getObjectEntity().hasEffectsOnInteractionAtPath(e, t, s)
    }
    applyDeoptimizations() {
        this.deoptimized = !0;
        let e = !1;

        for (const s of this.elements) {
            s && (e || s instanceof Bs) && (e = !0,
            s.deoptimizePath(Y))
        }

        this.context.requestTreeshakingPass()
    }
    getObjectEntity() {
        if (null !== this.objectEntity)
            return this.objectEntity;
        const e = [{
            key: "length",
            kind: "init",
            property: Jt
        }];
        let t = !1;
        for (let s = 0; s < this.elements.length; s++) {
            const i = this.elements[s];
            t || i instanceof Bs ? i && (t = !0,
            e.unshift({
                key: q,
                kind: "init",
                property: i
            })) : i ? e.push({
                key: String(s),
                kind: "init",
                property: i
            }) : e.push({
                key: String(s),
                kind: "init",
                property: Kt
            })
        }
        return this.objectEntity = new qs(e,li)
    }
}
class ci extends Vs {
    addExportedVariables(e, t) {
        for (const s of this.elements)
            s?.addExportedVariables(e, t)
    }
    declare(e) {
        const t = [];
        for (const s of this.elements)
            null !== s && t.push(...s.declare(e, re));
        return t
    }
    deoptimizePath() {
        for (const e of this.elements)
            e?.deoptimizePath(K)
    }
    hasEffectsOnInteractionAtPath(e, t, s) {
        for (const e of this.elements)
            if (e?.hasEffectsOnInteractionAtPath(K, t, s))
                return !0;
        return !1
    }
    markDeclarationReached() {
        for (const e of this.elements)
            e?.markDeclarationReached()
    }
}
class ui extends ue {
    constructor(e, t, s, {deoptimizationTracker, module}) {
        super(e),
        this.init = s,
        this.calledFromTryStatement = !1,
        this.additionalInitializers = null,
        this.expressionsToBeDeoptimized = [],
        this.declarations = t ? [t] : [],
        this.deoptimizationTracker = deoptimizationTracker,
        this.module = module
    }
    addDeclaration(e, t) {
        this.declarations.push(e),
        this.markInitializersForDeoptimization().push(t)
    }
    consolidateInitializers() {
        if (this.additionalInitializers) {
            for (const e of this.additionalInitializers)
                e.deoptimizePath(Y);
            this.additionalInitializers = null
        }
    }
    deoptimizeArgumentsOnInteractionAtPath(e, t, s) {
        this.isReassigned ? ae(e) : s.withTrackedEntityAtPath(t, this.init, (()=>this.init.deoptimizeArgumentsOnInteractionAtPath(e, t, s)), void 0)
    }
    deoptimizePath(e) {
        if (!this.isReassigned && !this.deoptimizationTracker.trackEntityAtPathAndGetIfTracked(e, this))
            if (0 === e.length) {
                if (!this.isReassigned) {
                    this.isReassigned = !0;
                    const e = this.expressionsToBeDeoptimized;
                    this.expressionsToBeDeoptimized = me;
                    for (const t of e)
                        t.deoptimizeCache();
                    this.init.deoptimizePath(Y)
                }
            } else
                this.init.deoptimizePath(e)
    }
    getLiteralValueAtPath(e, t, s) {
        return this.isReassigned ? se : t.withTrackedEntityAtPath(e, this.init, (()=>(this.expressionsToBeDeoptimized.push(s),
        this.init.getLiteralValueAtPath(e, t, s))), se)
    }
    getReturnExpressionWhenCalledAtPath(e, t, s, i) {
        return this.isReassigned ? oe : s.withTrackedEntityAtPath(e, this.init, (()=>(this.expressionsToBeDeoptimized.push(i),
        this.init.getReturnExpressionWhenCalledAtPath(e, t, s, i))), oe)
    }
    hasEffectsOnInteractionAtPath(e, t, s) {
        switch (t.type) {
        case 0:
            return !!this.isReassigned || !s.accessed.trackEntityAtPathAndGetIfTracked(e, this) && this.init.hasEffectsOnInteractionAtPath(e, t, s);
        case 1:
            return !!this.included || 0 !== e.length && (!!this.isReassigned || !s.assigned.trackEntityAtPathAndGetIfTracked(e, this) && this.init.hasEffectsOnInteractionAtPath(e, t, s));
        case 2:
            return !!this.isReassigned || !(t.withNew ? s.instantiated : s.called).trackEntityAtPathAndGetIfTracked(e, t.args, this) && this.init.hasEffectsOnInteractionAtPath(e, t, s)
        }
    }
    include() {
        if (!this.included) {
            this.included = !0;
            for (const e of this.declarations) {
                e.included || e.include(Wt(), !1);
                let t = e.parent;
                for (; !t.included && (t.included = !0,
                t.type !== As); )
                    t = t.parent
            }
        }
    }
    includeCallArguments(e, t) {
        if (this.isReassigned || e.includedCallArguments.has(this.init))
            for (const s of t)
                s.include(e, !1);
        else
            e.includedCallArguments.add(this.init),
            this.init.includeCallArguments(e, t),
            e.includedCallArguments.delete(this.init)
    }
    markCalledFromTryStatement() {
        this.calledFromTryStatement = !0
    }
    markInitializersForDeoptimization() {
        return null === this.additionalInitializers && (this.additionalInitializers = [this.init],
        this.init = re,
        this.isReassigned = !0),
        this.additionalInitializers
    }
    mergeDeclarations({declarations, init, additionalInitializers}) {
        const {declarations: t} = this;
        for (const s of declarations)
            t.push(s);
        const s = this.markInitializersForDeoptimization();
        if (s.push(init),
        additionalInitializers)
            for (const t of additionalInitializers)
                s.push(t)
    }
}
const di = me
  , pi = new Set([G])
  , fi = new Z
  , mi = new Set([re]);
class gi extends ui {
    constructor(e, t, s) {
        super(e, t, re, s),
        this.deoptimizationInteractions = [],
        this.deoptimizations = new Z,
        this.deoptimizedFields = new Set,
        this.entitiesToBeDeoptimized = new Set
    }
    addEntityToBeDeoptimized(e) {
        if (e === re) {
            if (!this.entitiesToBeDeoptimized.has(re)) {
                this.entitiesToBeDeoptimized.add(re);
                for (const {interaction: e} of this.deoptimizationInteractions)
                    ae(e);
                this.deoptimizationInteractions = di
            }
        } else if (this.deoptimizedFields.has(G))
            e.deoptimizePath(Y);
        else if (!this.entitiesToBeDeoptimized.has(e)) {
            this.entitiesToBeDeoptimized.add(e);
            for (const t of this.deoptimizedFields)
                e.deoptimizePath([t]);
            for (const {interaction: t, path: s} of this.deoptimizationInteractions)
                e.deoptimizeArgumentsOnInteractionAtPath(t, s, ee)
        }
    }
    deoptimizeArgumentsOnInteractionAtPath(e, t) {
        if (t.length >= 2 || this.entitiesToBeDeoptimized.has(re) || this.deoptimizationInteractions.length >= 20 || 1 === t.length && (this.deoptimizedFields.has(G) || 2 === e.type && this.deoptimizedFields.has(t[0])))
            ae(e);
        else if (!this.deoptimizations.trackEntityAtPathAndGetIfTracked(t, e.args)) {
            for (const s of this.entitiesToBeDeoptimized)
                s.deoptimizeArgumentsOnInteractionAtPath(e, t, ee);
            this.entitiesToBeDeoptimized.has(re) || this.deoptimizationInteractions.push({
                interaction: e,
                path: t
            })
        }
    }
    deoptimizePath(e) {
        if (0 === e.length || this.deoptimizedFields.has(G))
            return;
        const t = e[0];
        if (!this.deoptimizedFields.has(t)) {
            this.deoptimizedFields.add(t);
            for (const t of this.entitiesToBeDeoptimized)
                t.deoptimizePath(e);
            t === G && (this.deoptimizationInteractions = di,
            this.deoptimizations = fi,
            this.deoptimizedFields = pi,
            this.entitiesToBeDeoptimized = mi)
        }
    }
    getReturnExpressionWhenCalledAtPath(e) {
        return 0 === e.length ? this.deoptimizePath(Y) : this.deoptimizedFields.has(e[0]) || this.deoptimizePath([e[0]]),
        oe
    }
}
const yi = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$"
  , xi = 64;
function bi(e) {
    let t = "";
    do {
        const s = e % xi;
        e = e / xi | 0,
        t = yi[s] + t
    } while (0 !== e);
    return t
}
function Ei(e, t, s) {
    let i = e
      , n = 1;
    for (; t.has(i) || Vt.has(i) || s?.has(i); )
        i = `${e}$ ${bi(n++)}`;
    return t.add(i),
    i
}
let vi = class {
    constructor() {
        this.children = [],
        this.variables = new Map
    }
    addDeclaration(e, t, s, i) {
        const n = e.name;
        let r = this.variables.get(n);
        return r ? r.addDeclaration(e, s) : (r = new ui(e.name,e,s || Kt,t),
        this.variables.set(n, r)),
        r
    }
    contains(e) {
        return this.variables.has(e)
    }
    findVariable(e) {
        throw new Error("Internal Error: findVariable needs to be implemented by a subclass")
    }
}
;
class Si extends vi {
    constructor(e) {
        super(),
        this.accessedOutsideVariables = new Map,
        this.parent = e,
        e.children.push(this)
    }
    addAccessedDynamicImport(e) {
        (this.accessedDynamicImports || (this.accessedDynamicImports = new Set)).add(e),
        this.parent instanceof Si && this.parent.addAccessedDynamicImport(e)
    }
    addAccessedGlobals(e, t) {
        const s = t.get(this) || new Set;
        for (const t of e)
            s.add(t);
        t.set(this, s),
        this.parent instanceof Si && this.parent.addAccessedGlobals(e, t)
    }
    addNamespaceMemberAccess(e, t) {
        this.accessedOutsideVariables.set(e, t),
        this.parent.addNamespaceMemberAccess(e, t)
    }
    addReturnExpression(e) {
        this.parent instanceof Si && this.parent.addReturnExpression(e)
    }
    addUsedOutsideNames(e, t, s, i) {
        for (const i of this.accessedOutsideVariables.values())
            i.included && (e.add(i.getBaseVariableName()),
            "system" === t && s.has(i) && e.add("exports"));
        const n = i.get(this);
        if (n)
            for (const t of n)
                e.add(t)
    }
    contains(e) {
        return this.variables.has(e) || this.parent.contains(e)
    }
    deconflict(e, t, s) {
        const i = new Set;
        if (this.addUsedOutsideNames(i, e, t, s),
        this.accessedDynamicImports)
            for (const e of this.accessedDynamicImports)
                e.inlineNamespace && i.add(e.inlineNamespace.getBaseVariableName());
        for (const [e,t] of this.variables)
            (t.included || t.alwaysRendered) && t.setRenderNames(null, Ei(e, i, t.forbiddenNames));
        for (const i of this.children)
            i.deconflict(e, t, s)
    }
    findLexicalBoundary() {
        return this.parent.findLexicalBoundary()
    }
    findVariable(e) {
        const t = this.variables.get(e) || this.accessedOutsideVariables.get(e);
        if (t)
            return t;
        const s = this.parent.findVariable(e);
        return this.accessedOutsideVariables.set(e, s),
        s
    }
}
class Ai extends Si {
    constructor(e, t) {
        super(e),
        this.parameters = [],
        this.hasRest = !1,
        this.context = t,
        this.hoistedBodyVarScope = new Si(this)
    }
    addParameterDeclaration(e) {
        const {name: t} = e
          , s = new gi(t,e,this.context)
          , i = this.hoistedBodyVarScope.variables.get(t);
        return i && (this.hoistedBodyVarScope.variables.set(t, s),
        s.mergeDeclarations(i)),
        this.variables.set(t, s),
        s
    }
    addParameterVariables(e, t) {
        this.parameters = e;
        for (const t of e)
            for (const e of t)
                e.alwaysRendered = !0;
        this.hasRest = t
    }
    includeCallArguments(e, t) {
        let s = !1
          , i = !1;
        const n = this.hasRest && this.parameters[this.parameters.length - 1];
        for (const s of t)
            if (s instanceof Bs) {
                for (const s of t)
                    s.include(e, !1);
                break
            }
        for (let r = t.length - 1; r >= 0; r--) {
            const o = this.parameters[r] || n
              , a = t[r];
            if (o)
                if (s = !1,
                0 === o.length)
                    i = !0;
                else
                    for (const e of o)
                        e.included && (i = !0),
                        e.calledFromTryStatement && (s = !0);
            !i && a.shouldBeIncluded(e) && (i = !0),
            i && a.include(e, s)
        }
    }
}
class ki extends Ai {
    constructor(...args) {
        super(...args),
        this.returnExpression = null,
        this.returnExpressions = []
    }
    addReturnExpression(e) {
        this.returnExpressions.push(e)
    }
    getReturnExpression() {
        return null === this.returnExpression && this.updateReturnExpression(),
        this.returnExpression
    }
    updateReturnExpression() {
        if (1 === this.returnExpressions.length)
            this.returnExpression = this.returnExpressions[0];
        else {
            this.returnExpression = re;
            for (const e of this.returnExpressions)
                e.deoptimizePath(Y)
        }
    }
}
function wi(e, t) {
    if ("MemberExpression" === e.type)
        return !e.computed && wi(e.object, e);
    if ("Identifier" === e.type) {
        if (!t)
            return !0;
        switch (t.type) {
        case "MemberExpression":
            return t.computed || e === t.object;
        case "MethodDefinition":
            return t.computed;
        case "PropertyDefinition":
        case "Property":
            return t.computed || e === t.value;
        case "ExportSpecifier":
        case "ImportSpecifier":
            return e === t.local;
        case "LabeledStatement":
        case "BreakStatement":
        case "ContinueStatement":
            return !1;
        default:
            return !0
        }
    }
    return !1
}
const Ii = Symbol("PureFunction")
  , Pi = ()=>{}
  , Ci = Symbol("Value Properties")
  , $i = ()=>ie
  , Ni = ()=>!0
  , _i = {
    deoptimizeArgumentsOnCall: Pi,
    getLiteralValue: $i,
    hasEffectsWhenCalled: ()=>!1
}
  , Ri = {
    deoptimizeArgumentsOnCall: Pi,
    getLiteralValue: $i,
    hasEffectsWhenCalled: Ni
}
  , Mi = {
    __proto__: null,
    [Ci]: Ri
}
  , Ti = {
    __proto__: null,
    [Ci]: _i
}
  , Oi = {
    __proto__: null,
    [Ci]: {
        deoptimizeArgumentsOnCall({args: [,e]}) {
            e?.deoptimizePath(Y)
        },
        getLiteralValue: $i,
        hasEffectsWhenCalled: ({args: e},t)=>e.length <= 1 || e[1].hasEffectsOnInteractionAtPath(X, he, t)
    }
}
  , Di = {
    __proto__: null,
    [Ci]: Ri,
    prototype: Mi
}
  , Li = {
    __proto__: null,
    [Ci]: _i,
    prototype: Mi
}
  , Vi = {
    __proto__: null,
    [Ci]: {
        deoptimizeArgumentsOnCall: Pi,
        getLiteralValue: $i,
        hasEffectsWhenCalled: ({args: e})=>e.length > 1 && !(e[1]instanceof hi)
    },
    prototype: Mi
}
  , Bi = {
    __proto__: null,
    [Ci]: _i,
    from: Mi,
    of: Ti,
    prototype: Mi
}
  , zi = {
    __proto__: null,
    [Ci]: _i,
    supportedLocalesOf: Li
}
  , Fi = {
    global: Mi,
    globalThis: Mi,
    self: Mi,
    window: Mi,
    __proto__: null,
    [Ci]: Ri,
    Array: {
        __proto__: null,
        [Ci]: Ri,
        from: Mi,
        isArray: Ti,
        of: Ti,
        prototype: Mi
    },
    ArrayBuffer: {
        __proto__: null,
        [Ci]: _i,
        isView: Ti,
        prototype: Mi
    },
    Atomics: Mi,
    BigInt: Di,
    BigInt64Array: Di,
    BigUint64Array: Di,
    Boolean: Li,
    constructor: Di,
    DataView: Li,
    Date: {
        __proto__: null,
        [Ci]: _i,
        now: Ti,
        parse: Ti,
        prototype: Mi,
        UTC: Ti
    },
    decodeURI: Ti,
    decodeURIComponent: Ti,
    encodeURI: Ti,
    encodeURIComponent: Ti,
    Error: Li,
    escape: Ti,
    eval: Mi,
    EvalError: Li,
    Float32Array: Bi,
    Float64Array: Bi,
    Function: Di,
    hasOwnProperty: Mi,
    Infinity: Mi,
    Int16Array: Bi,
    Int32Array: Bi,
    Int8Array: Bi,
    isFinite: Ti,
    isNaN: Ti,
    isPrototypeOf: Mi,
    JSON: Mi,
    Map: Vi,
    Math: {
        __proto__: null,
        [Ci]: Ri,
        abs: Ti,
        acos: Ti,
        acosh: Ti,
        asin: Ti,
        asinh: Ti,
        atan: Ti,
        atan2: Ti,
        atanh: Ti,
        cbrt: Ti,
        ceil: Ti,
        clz32: Ti,
        cos: Ti,
        cosh: Ti,
        exp: Ti,
        expm1: Ti,
        floor: Ti,
        fround: Ti,
        hypot: Ti,
        imul: Ti,
        log: Ti,
        log10: Ti,
        log1p: Ti,
        log2: Ti,
        max: Ti,
        min: Ti,
        pow: Ti,
        random: Ti,
        round: Ti,
        sign: Ti,
        sin: Ti,
        sinh: Ti,
        sqrt: Ti,
        tan: Ti,
        tanh: Ti,
        trunc: Ti
    },
    NaN: Mi,
    Number: {
        __proto__: null,
        [Ci]: _i,
        isFinite: Ti,
        isInteger: Ti,
        isNaN: Ti,
        isSafeInteger: Ti,
        parseFloat: Ti,
        parseInt: Ti,
        prototype: Mi
    },
    Object: {
        __proto__: null,
        [Ci]: _i,
        create: Ti,
        defineProperty: Oi,
        defineProperties: Oi,
        freeze: Oi,
        getOwnPropertyDescriptor: Ti,
        getOwnPropertyDescriptors: Ti,
        getOwnPropertyNames: Ti,
        getOwnPropertySymbols: Ti,
        getPrototypeOf: Ti,
        hasOwn: Ti,
        is: Ti,
        isExtensible: Ti,
        isFrozen: Ti,
        isSealed: Ti,
        keys: Ti,
        fromEntries: Mi,
        entries: Ti,
        prototype: Mi
    },
    parseFloat: Ti,
    parseInt: Ti,
    Promise: {
        __proto__: null,
        [Ci]: Ri,
        all: Mi,
        allSettled: Mi,
        any: Mi,
        prototype: Mi,
        race: Mi,
        reject: Mi,
        resolve: Mi
    },
    propertyIsEnumerable: Mi,
    Proxy: Mi,
    RangeError: Li,
    ReferenceError: Li,
    Reflect: Mi,
    RegExp: Li,
    Set: Vi,
    SharedArrayBuffer: Di,
    String: {
        __proto__: null,
        [Ci]: _i,
        fromCharCode: Ti,
        fromCodePoint: Ti,
        prototype: Mi,
        raw: Ti
    },
    Symbol: {
        __proto__: null,
        [Ci]: _i,
        for: Ti,
        keyFor: Ti,
        prototype: Mi,
        toStringTag: {
            __proto__: null,
            [Ci]: {
                deoptimizeArgumentsOnCall: Pi,
                getLiteralValue: ()=>H,
                hasEffectsWhenCalled: Ni
            }
        }
    },
    SyntaxError: Li,
    toLocaleString: Mi,
    toString: Mi,
    TypeError: Li,
    Uint16Array: Bi,
    Uint32Array: Bi,
    Uint8Array: Bi,
    Uint8ClampedArray: Bi,
    unescape: Ti,
    URIError: Li,
    valueOf: Mi,
    WeakMap: Vi,
    WeakSet: Vi,
    clearInterval: Di,
    clearTimeout: Di,
    console: {
        __proto__: null,
        [Ci]: Ri,
        assert: Di,
        clear: Di,
        count: Di,
        countReset: Di,
        debug: Di,
        dir: Di,
        dirxml: Di,
        error: Di,
        exception: Di,
        group: Di,
        groupCollapsed: Di,
        groupEnd: Di,
        info: Di,
        log: Di,
        table: Di,
        time: Di,
        timeEnd: Di,
        timeLog: Di,
        trace: Di,
        warn: Di
    },
    Intl: {
        __proto__: null,
        [Ci]: Ri,
        Collator: zi,
        DateTimeFormat: zi,
        ListFormat: zi,
        NumberFormat: zi,
        PluralRules: zi,
        RelativeTimeFormat: zi
    },
    setInterval: Di,
    setTimeout: Di,
    TextDecoder: Di,
    TextEncoder: Di,
    URL: Di,
    URLSearchParams: Di,
    AbortController: Di,
    AbortSignal: Di,
    addEventListener: Mi,
    alert: Mi,
    AnalyserNode: Di,
    Animation: Di,
    AnimationEvent: Di,
    applicationCache: Mi,
    ApplicationCache: Di,
    ApplicationCacheErrorEvent: Di,
    atob: Mi,
    Attr: Di,
    Audio: Di,
    AudioBuffer: Di,
    AudioBufferSourceNode: Di,
    AudioContext: Di,
    AudioDestinationNode: Di,
    AudioListener: Di,
    AudioNode: Di,
    AudioParam: Di,
    AudioProcessingEvent: Di,
    AudioScheduledSourceNode: Di,
    AudioWorkletNode: Di,
    BarProp: Di,
    BaseAudioContext: Di,
    BatteryManager: Di,
    BeforeUnloadEvent: Di,
    BiquadFilterNode: Di,
    Blob: Di,
    BlobEvent: Di,
    blur: Mi,
    BroadcastChannel: Di,
    btoa: Mi,
    ByteLengthQueuingStrategy: Di,
    Cache: Di,
    caches: Mi,
    CacheStorage: Di,
    cancelAnimationFrame: Mi,
    cancelIdleCallback: Mi,
    CanvasCaptureMediaStreamTrack: Di,
    CanvasGradient: Di,
    CanvasPattern: Di,
    CanvasRenderingContext2D: Di,
    ChannelMergerNode: Di,
    ChannelSplitterNode: Di,
    CharacterData: Di,
    clientInformation: Mi,
    ClipboardEvent: Di,
    close: Mi,
    closed: Mi,
    CloseEvent: Di,
    Comment: Di,
    CompositionEvent: Di,
    confirm: Mi,
    ConstantSourceNode: Di,
    ConvolverNode: Di,
    CountQueuingStrategy: Di,
    createImageBitmap: Mi,
    Credential: Di,
    CredentialsContainer: Di,
    crypto: Mi,
    Crypto: Di,
    CryptoKey: Di,
    CSS: Di,
    CSSConditionRule: Di,
    CSSFontFaceRule: Di,
    CSSGroupingRule: Di,
    CSSImportRule: Di,
    CSSKeyframeRule: Di,
    CSSKeyframesRule: Di,
    CSSMediaRule: Di,
    CSSNamespaceRule: Di,
    CSSPageRule: Di,
    CSSRule: Di,
    CSSRuleList: Di,
    CSSStyleDeclaration: Di,
    CSSStyleRule: Di,
    CSSStyleSheet: Di,
    CSSSupportsRule: Di,
    CustomElementRegistry: Di,
    customElements: Mi,
    CustomEvent: Di,
    DataTransfer: Di,
    DataTransferItem: Di,
    DataTransferItemList: Di,
    defaultstatus: Mi,
    defaultStatus: Mi,
    DelayNode: Di,
    DeviceMotionEvent: Di,
    DeviceOrientationEvent: Di,
    devicePixelRatio: Mi,
    dispatchEvent: Mi,
    document: Mi,
    Document: Di,
    DocumentFragment: Di,
    DocumentType: Di,
    DOMError: Di,
    DOMException: Di,
    DOMImplementation: Di,
    DOMMatrix: Di,
    DOMMatrixReadOnly: Di,
    DOMParser: Di,
    DOMPoint: Di,
    DOMPointReadOnly: Di,
    DOMQuad: Di,
    DOMRect: Di,
    DOMRectReadOnly: Di,
    DOMStringList: Di,
    DOMStringMap: Di,
    DOMTokenList: Di,
    DragEvent: Di,
    DynamicsCompressorNode: Di,
    Element: Di,
    ErrorEvent: Di,
    Event: Di,
    EventSource: Di,
    EventTarget: Di,
    external: Mi,
    fetch: Mi,
    File: Di,
    FileList: Di,
    FileReader: Di,
    find: Mi,
    focus: Mi,
    FocusEvent: Di,
    FontFace: Di,
    FontFaceSetLoadEvent: Di,
    FormData: Di,
    frames: Mi,
    GainNode: Di,
    Gamepad: Di,
    GamepadButton: Di,
    GamepadEvent: Di,
    getComputedStyle: Mi,
    getSelection: Mi,
    HashChangeEvent: Di,
    Headers: Di,
    history: Mi,
    History: Di,
    HTMLAllCollection: Di,
    HTMLAnchorElement: Di,
    HTMLAreaElement: Di,
    HTMLAudioElement: Di,
    HTMLBaseElement: Di,
    HTMLBodyElement: Di,
    HTMLBRElement: Di,
    HTMLButtonElement: Di,
    HTMLCanvasElement: Di,
    HTMLCollection: Di,
    HTMLContentElement: Di,
    HTMLDataElement: Di,
    HTMLDataListElement: Di,
    HTMLDetailsElement: Di,
    HTMLDialogElement: Di,
    HTMLDirectoryElement: Di,
    HTMLDivElement: Di,
    HTMLDListElement: Di,
    HTMLDocument: Di,
    HTMLElement: Di,
    HTMLEmbedElement: Di,
    HTMLFieldSetElement: Di,
    HTMLFontElement: Di,
    HTMLFormControlsCollection: Di,
    HTMLFormElement: Di,
    HTMLFrameElement: Di,
    HTMLFrameSetElement: Di,
    HTMLHeadElement: Di,
    HTMLHeadingElement: Di,
    HTMLHRElement: Di,
    HTMLHtmlElement: Di,
    HTMLIFrameElement: Di,
    HTMLImageElement: Di,
    HTMLInputElement: Di,
    HTMLLabelElement: Di,
    HTMLLegendElement: Di,
    HTMLLIElement: Di,
    HTMLLinkElement: Di,
    HTMLMapElement: Di,
    HTMLMarqueeElement: Di,
    HTMLMediaElement: Di,
    HTMLMenuElement: Di,
    HTMLMetaElement: Di,
    HTMLMeterElement: Di,
    HTMLModElement: Di,
    HTMLObjectElement: Di,
    HTMLOListElement: Di,
    HTMLOptGroupElement: Di,
    HTMLOptionElement: Di,
    HTMLOptionsCollection: Di,
    HTMLOutputElement: Di,
    HTMLParagraphElement: Di,
    HTMLParamElement: Di,
    HTMLPictureElement: Di,
    HTMLPreElement: Di,
    HTMLProgressElement: Di,
    HTMLQuoteElement: Di,
    HTMLScriptElement: Di,
    HTMLSelectElement: Di,
    HTMLShadowElement: Di,
    HTMLSlotElement: Di,
    HTMLSourceElement: Di,
    HTMLSpanElement: Di,
    HTMLStyleElement: Di,
    HTMLTableCaptionElement: Di,
    HTMLTableCellElement: Di,
    HTMLTableColElement: Di,
    HTMLTableElement: Di,
    HTMLTableRowElement: Di,
    HTMLTableSectionElement: Di,
    HTMLTemplateElement: Di,
    HTMLTextAreaElement: Di,
    HTMLTimeElement: Di,
    HTMLTitleElement: Di,
    HTMLTrackElement: Di,
    HTMLUListElement: Di,
    HTMLUnknownElement: Di,
    HTMLVideoElement: Di,
    IDBCursor: Di,
    IDBCursorWithValue: Di,
    IDBDatabase: Di,
    IDBFactory: Di,
    IDBIndex: Di,
    IDBKeyRange: Di,
    IDBObjectStore: Di,
    IDBOpenDBRequest: Di,
    IDBRequest: Di,
    IDBTransaction: Di,
    IDBVersionChangeEvent: Di,
    IdleDeadline: Di,
    IIRFilterNode: Di,
    Image: Di,
    ImageBitmap: Di,
    ImageBitmapRenderingContext: Di,
    ImageCapture: Di,
    ImageData: Di,
    indexedDB: Mi,
    innerHeight: Mi,
    innerWidth: Mi,
    InputEvent: Di,
    IntersectionObserver: Di,
    IntersectionObserverEntry: Di,
    isSecureContext: Mi,
    KeyboardEvent: Di,
    KeyframeEffect: Di,
    length: Mi,
    localStorage: Mi,
    location: Mi,
    Location: Di,
    locationbar: Mi,
    matchMedia: Mi,
    MediaDeviceInfo: Di,
    MediaDevices: Di,
    MediaElementAudioSourceNode: Di,
    MediaEncryptedEvent: Di,
    MediaError: Di,
    MediaKeyMessageEvent: Di,
    MediaKeySession: Di,
    MediaKeyStatusMap: Di,
    MediaKeySystemAccess: Di,
    MediaList: Di,
    MediaQueryList: Di,
    MediaQueryListEvent: Di,
    MediaRecorder: Di,
    MediaSettingsRange: Di,
    MediaSource: Di,
    MediaStream: Di,
    MediaStreamAudioDestinationNode: Di,
    MediaStreamAudioSourceNode: Di,
    MediaStreamEvent: Di,
    MediaStreamTrack: Di,
    MediaStreamTrackEvent: Di,
    menubar: Mi,
    MessageChannel: Di,
    MessageEvent: Di,
    MessagePort: Di,
    MIDIAccess: Di,
    MIDIConnectionEvent: Di,
    MIDIInput: Di,
    MIDIInputMap: Di,
    MIDIMessageEvent: Di,
    MIDIOutput: Di,
    MIDIOutputMap: Di,
    MIDIPort: Di,
    MimeType: Di,
    MimeTypeArray: Di,
    MouseEvent: Di,
    moveBy: Mi,
    moveTo: Mi,
    MutationEvent: Di,
    MutationObserver: Di,
    MutationRecord: Di,
    name: Mi,
    NamedNodeMap: Di,
    NavigationPreloadManager: Di,
    navigator: Mi,
    Navigator: Di,
    NetworkInformation: Di,
    Node: Di,
    NodeFilter: Mi,
    NodeIterator: Di,
    NodeList: Di,
    Notification: Di,
    OfflineAudioCompletionEvent: Di,
    OfflineAudioContext: Di,
    offscreenBuffering: Mi,
    OffscreenCanvas: Di,
    open: Mi,
    openDatabase: Mi,
    Option: Di,
    origin: Mi,
    OscillatorNode: Di,
    outerHeight: Mi,
    outerWidth: Mi,
    PageTransitionEvent: Di,
    pageXOffset: Mi,
    pageYOffset: Mi,
    PannerNode: Di,
    parent: Mi,
    Path2D: Di,
    PaymentAddress: Di,
    PaymentRequest: Di,
    PaymentRequestUpdateEvent: Di,
    PaymentResponse: Di,
    performance: Mi,
    Performance: Di,
    PerformanceEntry: Di,
    PerformanceLongTaskTiming: Di,
    PerformanceMark: Di,
    PerformanceMeasure: Di,
    PerformanceNavigation: Di,
    PerformanceNavigationTiming: Di,
    PerformanceObserver: Di,
    PerformanceObserverEntryList: Di,
    PerformancePaintTiming: Di,
    PerformanceResourceTiming: Di,
    PerformanceTiming: Di,
    PeriodicWave: Di,
    Permissions: Di,
    PermissionStatus: Di,
    personalbar: Mi,
    PhotoCapabilities: Di,
    Plugin: Di,
    PluginArray: Di,
    PointerEvent: Di,
    PopStateEvent: Di,
    postMessage: Mi,
    Presentation: Di,
    PresentationAvailability: Di,
    PresentationConnection: Di,
    PresentationConnectionAvailableEvent: Di,
    PresentationConnectionCloseEvent: Di,
    PresentationConnectionList: Di,
    PresentationReceiver: Di,
    PresentationRequest: Di,
    print: Mi,
    ProcessingInstruction: Di,
    ProgressEvent: Di,
    PromiseRejectionEvent: Di,
    prompt: Mi,
    PushManager: Di,
    PushSubscription: Di,
    PushSubscriptionOptions: Di,
    queueMicrotask: Mi,
    RadioNodeList: Di,
    Range: Di,
    ReadableStream: Di,
    RemotePlayback: Di,
    removeEventListener: Mi,
    Request: Di,
    requestAnimationFrame: Mi,
    requestIdleCallback: Mi,
    resizeBy: Mi,
    ResizeObserver: Di,
    ResizeObserverEntry: Di,
    resizeTo: Mi,
    Response: Di,
    RTCCertificate: Di,
    RTCDataChannel: Di,
    RTCDataChannelEvent: Di,
    RTCDtlsTransport: Di,
    RTCIceCandidate: Di,
    RTCIceTransport: Di,
    RTCPeerConnection: Di,
    RTCPeerConnectionIceEvent: Di,
    RTCRtpReceiver: Di,
    RTCRtpSender: Di,
    RTCSctpTransport: Di,
    RTCSessionDescription: Di,
    RTCStatsReport: Di,
    RTCTrackEvent: Di,
    screen: Mi,
    Screen: Di,
    screenLeft: Mi,
    ScreenOrientation: Di,
    screenTop: Mi,
    screenX: Mi,
    screenY: Mi,
    ScriptProcessorNode: Di,
    scroll: Mi,
    scrollbars: Mi,
    scrollBy: Mi,
    scrollTo: Mi,
    scrollX: Mi,
    scrollY: Mi,
    SecurityPolicyViolationEvent: Di,
    Selection: Di,
    ServiceWorker: Di,
    ServiceWorkerContainer: Di,
    ServiceWorkerRegistration: Di,
    sessionStorage: Mi,
    ShadowRoot: Di,
    SharedWorker: Di,
    SourceBuffer: Di,
    SourceBufferList: Di,
    speechSynthesis: Mi,
    SpeechSynthesisEvent: Di,
    SpeechSynthesisUtterance: Di,
    StaticRange: Di,
    status: Mi,
    statusbar: Mi,
    StereoPannerNode: Di,
    stop: Mi,
    Storage: Di,
    StorageEvent: Di,
    StorageManager: Di,
    styleMedia: Mi,
    StyleSheet: Di,
    StyleSheetList: Di,
    SubtleCrypto: Di,
    SVGAElement: Di,
    SVGAngle: Di,
    SVGAnimatedAngle: Di,
    SVGAnimatedBoolean: Di,
    SVGAnimatedEnumeration: Di,
    SVGAnimatedInteger: Di,
    SVGAnimatedLength: Di,
    SVGAnimatedLengthList: Di,
    SVGAnimatedNumber: Di,
    SVGAnimatedNumberList: Di,
    SVGAnimatedPreserveAspectRatio: Di,
    SVGAnimatedRect: Di,
    SVGAnimatedString: Di,
    SVGAnimatedTransformList: Di,
    SVGAnimateElement: Di,
    SVGAnimateMotionElement: Di,
    SVGAnimateTransformElement: Di,
    SVGAnimationElement: Di,
    SVGCircleElement: Di,
    SVGClipPathElement: Di,
    SVGComponentTransferFunctionElement: Di,
    SVGDefsElement: Di,
    SVGDescElement: Di,
    SVGDiscardElement: Di,
    SVGElement: Di,
    SVGEllipseElement: Di,
    SVGFEBlendElement: Di,
    SVGFEColorMatrixElement: Di,
    SVGFEComponentTransferElement: Di,
    SVGFECompositeElement: Di,
    SVGFEConvolveMatrixElement: Di,
    SVGFEDiffuseLightingElement: Di,
    SVGFEDisplacementMapElement: Di,
    SVGFEDistantLightElement: Di,
    SVGFEDropShadowElement: Di,
    SVGFEFloodElement: Di,
    SVGFEFuncAElement: Di,
    SVGFEFuncBElement: Di,
    SVGFEFuncGElement: Di,
    SVGFEFuncRElement: Di,
    SVGFEGaussianBlurElement: Di,
    SVGFEImageElement: Di,
    SVGFEMergeElement: Di,
    SVGFEMergeNodeElement: Di,
    SVGFEMorphologyElement: Di,
    SVGFEOffsetElement: Di,
    SVGFEPointLightElement: Di,
    SVGFESpecularLightingElement: Di,
    SVGFESpotLightElement: Di,
    SVGFETileElement: Di,
    SVGFETurbulenceElement: Di,
    SVGFilterElement: Di,
    SVGForeignObjectElement: Di,
    SVGGElement: Di,
    SVGGeometryElement: Di,
    SVGGradientElement: Di,
    SVGGraphicsElement: Di,
    SVGImageElement: Di,
    SVGLength: Di,
    SVGLengthList: Di,
    SVGLinearGradientElement: Di,
    SVGLineElement: Di,
    SVGMarkerElement: Di,
    SVGMaskElement: Di,
    SVGMatrix: Di,
    SVGMetadataElement: Di,
    SVGMPathElement: Di,
    SVGNumber: Di,
    SVGNumberList: Di,
    SVGPathElement: Di,
    SVGPatternElement: Di,
    SVGPoint: Di,
    SVGPointList: Di,
    SVGPolygonElement: Di,
    SVGPolylineElement: Di,
    SVGPreserveAspectRatio: Di,
    SVGRadialGradientElement: Di,
    SVGRect: Di,
    SVGRectElement: Di,
    SVGScriptElement: Di,
    SVGSetElement: Di,
    SVGStopElement: Di,
    SVGStringList: Di,
    SVGStyleElement: Di,
    SVGSVGElement: Di,
    SVGSwitchElement: Di,
    SVGSymbolElement: Di,
    SVGTextContentElement: Di,
    SVGTextElement: Di,
    SVGTextPathElement: Di,
    SVGTextPositioningElement: Di,
    SVGTitleElement: Di,
    SVGTransform: Di,
    SVGTransformList: Di,
    SVGTSpanElement: Di,
    SVGUnitTypes: Di,
    SVGUseElement: Di,
    SVGViewElement: Di,
    TaskAttributionTiming: Di,
    Text: Di,
    TextEvent: Di,
    TextMetrics: Di,
    TextTrack: Di,
    TextTrackCue: Di,
    TextTrackCueList: Di,
    TextTrackList: Di,
    TimeRanges: Di,
    toolbar: Mi,
    top: Mi,
    Touch: Di,
    TouchEvent: Di,
    TouchList: Di,
    TrackEvent: Di,
    TransitionEvent: Di,
    TreeWalker: Di,
    UIEvent: Di,
    ValidityState: Di,
    visualViewport: Mi,
    VisualViewport: Di,
    VTTCue: Di,
    WaveShaperNode: Di,
    WebAssembly: Mi,
    WebGL2RenderingContext: Di,
    WebGLActiveInfo: Di,
    WebGLBuffer: Di,
    WebGLContextEvent: Di,
    WebGLFramebuffer: Di,
    WebGLProgram: Di,
    WebGLQuery: Di,
    WebGLRenderbuffer: Di,
    WebGLRenderingContext: Di,
    WebGLSampler: Di,
    WebGLShader: Di,
    WebGLShaderPrecisionFormat: Di,
    WebGLSync: Di,
    WebGLTexture: Di,
    WebGLTransformFeedback: Di,
    WebGLUniformLocation: Di,
    WebGLVertexArrayObject: Di,
    WebSocket: Di,
    WheelEvent: Di,
    Window: Di,
    Worker: Di,
    WritableStream: Di,
    XMLDocument: Di,
    XMLHttpRequest: Di,
    XMLHttpRequestEventTarget: Di,
    XMLHttpRequestUpload: Di,
    XMLSerializer: Di,
    XPathEvaluator: Di,
    XPathExpression: Di,
    XPathResult: Di,
    XSLTProcessor: Di
};
for (const e of ["window", "global", "self", "globalThis"])
    Fi[e] = Fi;
function ji(e) {
    let t = Fi;
    for (const s of e) {
        if ("string" != typeof s)
            return null;
        if (t = t[s],
        !t)
            return null
    }
    return t[Ci]
}
class Ui extends ue {
    constructor(...args) {
        super(...args),
        this.isReassigned = !0
    }
    deoptimizeArgumentsOnInteractionAtPath(e, t, s) {
        switch (e.type) {
        case 0:
        case 1:
            return void (ji([this.name, ...t].slice(0, -1)) || super.deoptimizeArgumentsOnInteractionAtPath(e, t, s));
        case 2:
            {
                const i = ji([this.name, ...t]);
                return void (i ? i.deoptimizeArgumentsOnCall(e) : super.deoptimizeArgumentsOnInteractionAtPath(e, t, s))
            }
        }
    }
    getLiteralValueAtPath(e, t, s) {
        const i = ji([this.name, ...e]);
        return i ? i.getLiteralValue() : se
    }
    hasEffectsOnInteractionAtPath(e, t, s) {
        switch (t.type) {
        case 0:
            return 0 === e.length ? "undefined" !== this.name && !ji([this.name]) : !ji([this.name, ...e].slice(0, -1));
        case 1:
            return !0;
        case 2:
            {
                const i = ji([this.name, ...e]);
                return !i || i.hasEffectsWhenCalled(t, s)
            }
        }
    }
}
const Gi = {
    __proto__: null,
    class: !0,
    const: !0,
    let: !0,
    var: !0
};
class Wi extends Vs {
    constructor(...args) {
        super(...args),
        this.variable = null,
        this.isTDZAccess = null
    }
    addExportedVariables(e, t) {
        t.has(this.variable) && e.push(this.variable)
    }
    bind() {
        !this.variable && wi(this, this.parent) && (this.variable = this.scope.findVariable(this.name),
        this.variable.addReference(this))
    }
    declare(e, t) {
        let s;
        const {treeshake: i} = this.context.options;
        switch (e) {
        case "var":
            s = this.scope.addDeclaration(this, this.context, t, !0),
            i && i.correctVarValueBeforeDeclaration && s.markInitializersForDeoptimization();
            break;
        case "function":
        case "let":
        case "const":
        case "class":
            s = this.scope.addDeclaration(this, this.context, t, !1);
            break;
        case "parameter":
            s = this.scope.addParameterDeclaration(this);
            break;
        default:
            throw new Error(`Internal Error: Unexpected identifier kind ${e}.`)
        }
        return s.kind = e,
        [this.variable = s]
    }
    deoptimizeArgumentsOnInteractionAtPath(e, t, s) {
        this.variable.deoptimizeArgumentsOnInteractionAtPath(e, t, s)
    }
    deoptimizePath(e) {
        0 !== e.length || this.scope.contains(this.name) || this.disallowImportReassignment(),
        this.variable?.deoptimizePath(e)
    }
    getLiteralValueAtPath(e, t, s) {
        return this.getVariableRespectingTDZ().getLiteralValueAtPath(e, t, s)
    }
    getReturnExpressionWhenCalledAtPath(e, t, s, i) {
        const [n,r] = this.getVariableRespectingTDZ().getReturnExpressionWhenCalledAtPath(e, t, s, i);
        return [n, r || this.isPureFunction(e)]
    }
    hasEffects(e) {
        return this.deoptimized || this.applyDeoptimizations(),
        !(!this.isPossibleTDZ() || "var" === this.variable.kind) || this.context.options.treeshake.unknownGlobalSideEffects && this.variable instanceof Ui && !this.isPureFunction(K) && this.variable.hasEffectsOnInteractionAtPath(K, le, e)
    }
    hasEffectsOnInteractionAtPath(e, t, s) {
        switch (t.type) {
        case 0:
            return null !== this.variable && !this.isPureFunction(e) && this.getVariableRespectingTDZ().hasEffectsOnInteractionAtPath(e, t, s);
        case 1:
            return (e.length > 0 ? this.getVariableRespectingTDZ() : this.variable).hasEffectsOnInteractionAtPath(e, t, s);
        case 2:
            return !this.isPureFunction(e) && this.getVariableRespectingTDZ().hasEffectsOnInteractionAtPath(e, t, s)
        }
    }
    include() {
        this.deoptimized || this.applyDeoptimizations(),
        this.included || (this.included = !0,
        null !== this.variable && this.context.includeVariableInModule(this.variable))
    }
    includeCallArguments(e, t) {
        this.variable.includeCallArguments(e, t)
    }
    isPossibleTDZ() {
        if (null !== this.isTDZAccess)
            return this.isTDZAccess;
        if (!(this.variable instanceof ui && this.variable.kind && this.variable.kind in Gi && this.variable.module === this.context.module))
            return this.isTDZAccess = !1;
        let e;
        return this.variable.declarations && 1 === this.variable.declarations.length && (e = this.variable.declarations[0]) && this.start < e.start && qi(this) === qi(e) ? this.isTDZAccess = !0 : this.variable.initReached ? this.isTDZAccess = !1 : this.isTDZAccess = !0
    }
    markDeclarationReached() {
        this.variable.initReached = !0
    }
    render(e, {snippets: {getPropertyAccess: t}, useOriginalName: s}, {renderedParentType: i, isCalleeOfRenderedParent: n, isShorthandProperty: r}=pe) {
        if (this.variable) {
            const o = this.variable.getName(t, s);
            o !== this.name && (e.overwrite(this.start, this.end, o, {
                contentOnly: !0,
                storeName: !0
            }),
            r && e.prependRight(this.start, `${this.name}: `)),
            "eval" === o && i === gs && n && e.appendRight(this.start, "0, ")
        }
    }
    applyDeoptimizations() {
        this.deoptimized = !0,
        this.variable instanceof ui && (this.variable.consolidateInitializers(),
        this.context.requestTreeshakingPass())
    }
    disallowImportReassignment() {
        return this.context.error(kt(this.name, this.context.module.id), this.start)
    }
    getVariableRespectingTDZ() {
        return this.isPossibleTDZ() ? re : this.variable
    }
    isPureFunction(e) {
        let t = this.context.manualPureFunctions[this.name];
        for (const s of e) {
            if (!t)
                return !1;
            if (t[Ii])
                return !0;
            t = t[s]
        }
        return t?.[Ii]
    }
}
function qi(e) {
    for (; e && !/^Program|Function/.test(e.type); )
        e = e.parent;
    return e
}
function Hi({annotations}, t, s, i) {
    if (t.remove(s, i),
    annotations)
        for (const i of annotations) {
            if (!(i.start < s))
                return;
            t.remove(i.start, i.end)
        }
}
function Ki(e, t) {
    if (e.annotations || e.parent.type !== bs || (e = e.parent),
    e.annotations)
        for (const s of e.annotations)
            t.remove(s.start, s.end)
}
const Yi = {
    isNoStatement: !0
};
function Xi(e, t, s=0) {
    let i, n;
    for (i = e.indexOf(t, s); ; ) {
        if (-1 === (s = e.indexOf("/", s)) || s >= i)
            return i;
        n = e.charCodeAt(++s),
        ++s,
        (s = 47 === n ? e.indexOf("\n", s) + 1 : e.indexOf("*/", s) + 2) > i && (i = e.indexOf(t, s))
    }
}
const Qi = /\S/g;
function Ji(e, t) {
    Qi.lastIndex = t;
    return Qi.exec(e).index
}
function Zi(e) {
    let t, s, i = 0;
    for (t = e.indexOf("\n", i); ; ) {
        if (i = e.indexOf("/", i),
        -1 === i || i > t)
            return [t, t + 1];
        if (s = e.charCodeAt(i + 1),
        47 === s)
            return [i, t + 1];
        i = e.indexOf("*/", i + 3) + 2,
        i > t && (t = e.indexOf("\n", i))
    }
}
function en(e, t, s, i, n) {
    let r, o, a, l, h = e[0], c = !h.included || h.needsBoundaries;
    c && (l = s + Zi(t.original.slice(s, h.start))[1]);
    for (let s = 1; s <= e.length; s++)
        r = h,
        o = l,
        a = c,
        h = e[s],
        c = void 0 !== h && (!h.included || h.needsBoundaries),
        a || c ? (l = r.end + Zi(t.original.slice(r.end, void 0 === h ? i : h.start))[1],
        r.included ? a ? r.render(t, n, {
            end: l,
            start: o
        }) : r.render(t, n) : Hi(r, t, o, l)) : r.render(t, n)
}
function tn(e, {original}, s, i) {
    const n = [];
    let r, o, a, l, h = s - 1;
    for (const i of e) {
        for (void 0 !== r && (h = r.end + Xi(original.slice(r.end, i.start), ",")),
        o = a = h + 1 + Zi(original.slice(h + 1, i.start))[1]; l = original.charCodeAt(o),
        32 === l || 9 === l || 10 === l || 13 === l; )
            o++;
        void 0 !== r && n.push({
            contentEnd: a,
            end: o,
            node: r,
            separator: h,
            start: s
        }),
        r = i,
        s = o
    }
    return n.push({
        contentEnd: i,
        end: i,
        node: r,
        separator: null,
        start: s
    }),
    n
}
function sn(e, t, s) {
    for (; ; ) {
        const [i,n] = Zi(e.original.slice(t, s));
        if (-1 === i)
            break;
        e.remove(t + i, t += n)
    }
}
class nn extends Si {
    addDeclaration(e, t, s, i) {
        if (i) {
            const n = this.parent.addDeclaration(e, t, s, i);
            return n.markInitializersForDeoptimization(),
            n
        }
        return super.addDeclaration(e, t, s, !1)
    }
}
class rn extends Vs {
    initialise() {
        let e, t;
        this.directive && "use strict" !== this.directive && this.parent.type === As && this.context.warn((e = this.directive,
        {
            code: "MODULE_LEVEL_DIRECTIVE",
            id: t = this.context.module.id,
            message: `Module level directives cause errors when bundled, "${e}" in "${D(t)}" was ignored.`
        }), this.start)
    }
    render(e, t) {
        super.render(e, t),
        this.included && this.insertSemicolon(e)
    }
    shouldBeIncluded(e) {
        return this.directive && "use strict" !== this.directive ? this.parent.type !== As : super.shouldBeIncluded(e)
    }
    applyDeoptimizations() {}
}
class on extends Vs {
    constructor(...args) {
        super(...args),
        this.directlyIncluded = !1
    }
    addImplicitReturnExpressionToScope() {
        const e = this.body[this.body.length - 1];
        e && "ReturnStatement" === e.type || this.scope.addReturnExpression(re)
    }
    createScope(e) {
        this.scope = this.parent.preventChildBlockScope ? e : new nn(e)
    }
    hasEffects(e) {
        if (this.deoptimizeBody)
            return !0;
        for (const t of this.body) {
            if (e.brokenFlow)
                break;
            if (t.hasEffects(e))
                return !0
        }
        return !1
    }
    include(e, t) {
        if (!this.deoptimizeBody || !this.directlyIncluded) {
            this.included = !0,
            this.directlyIncluded = !0,
            this.deoptimizeBody && (t = !0);
            for (const s of this.body)
                (t || s.shouldBeIncluded(e)) && s.include(e, t)
        }
    }
    initialise() {
        const e = this.body[0];
        this.deoptimizeBody = e instanceof rn && "use asm" === e.directive
    }
    render(e, t) {
        this.body.length > 0 ? en(this.body, e, this.start + 1, this.end - 1, t) : super.render(e, t)
    }
}
class an extends Vs {
    constructor(...args) {
        super(...args),
        this.declarationInit = null
    }
    addExportedVariables(e, t) {
        this.argument.addExportedVariables(e, t)
    }
    declare(e, t) {
        return this.declarationInit = t,
        this.argument.declare(e, re)
    }
    deoptimizePath({length}) {
        0 === length && this.argument.deoptimizePath(K)
    }
    hasEffectsOnInteractionAtPath({length}, t, s) {
        return length > 0 || this.argument.hasEffectsOnInteractionAtPath(K, t, s);
    }
    markDeclarationReached() {
        this.argument.markDeclarationReached()
    }
    applyDeoptimizations() {
        this.deoptimized = !0,
        null !== this.declarationInit && (this.declarationInit.deoptimizePath([G, G]),
        this.context.requestTreeshakingPass())
    }
}
class ln extends Vs {
    constructor(...args) {
        super(...args),
        this.objectEntity = null,
        this.deoptimizedReturn = !1
    }
    deoptimizeArgumentsOnInteractionAtPath(e, t, s) {
        if (2 === e.type) {
            const {parameters: t} = this.scope
              , {args: s} = e;
            let i = !1;
            for (let e = 0; e < s.length - 1; e++) {
                const n = this.params[e]
                  , r = s[e + 1];
                i || n instanceof an ? (i = !0,
                r.deoptimizePath(Y)) : n instanceof Wi ? (t[e][0].addEntityToBeDeoptimized(r),
                this.addArgumentToBeDeoptimized(r)) : n ? r.deoptimizePath(Y) : this.addArgumentToBeDeoptimized(r)
            }
        } else
            this.getObjectEntity().deoptimizeArgumentsOnInteractionAtPath(e, t, s)
    }
    deoptimizePath(e) {
        this.getObjectEntity().deoptimizePath(e),
        1 === e.length && e[0] === G && this.scope.getReturnExpression().deoptimizePath(Y)
    }
    getLiteralValueAtPath(e, t, s) {
        return this.getObjectEntity().getLiteralValueAtPath(e, t, s)
    }
    getReturnExpressionWhenCalledAtPath(e, t, s, i) {
        return e.length > 0 ? this.getObjectEntity().getReturnExpressionWhenCalledAtPath(e, t, s, i) : this.async ? (this.deoptimizedReturn || (this.deoptimizedReturn = !0,
        this.scope.getReturnExpression().deoptimizePath(Y),
        this.context.requestTreeshakingPass()),
        oe) : [this.scope.getReturnExpression(), !1]
    }
    hasEffectsOnInteractionAtPath(e, t, s) {
        if (e.length > 0 || 2 !== t.type)
            return this.getObjectEntity().hasEffectsOnInteractionAtPath(e, t, s);
        if (this.async) {
            const {propertyReadSideEffects: e} = this.context.options.treeshake
              , t = this.scope.getReturnExpression();
            if (t.hasEffectsOnInteractionAtPath(["then"], ce, s) || e && ("always" === e || t.hasEffectsOnInteractionAtPath(["then"], le, s)))
                return !0
        }
        for (const e of this.params)
            if (e.hasEffects(s))
                return !0;
        return !1
    }
    include(e, t) {
        this.deoptimized || this.applyDeoptimizations(),
        this.included = !0;
        const {brokenFlow: s} = e;
        e.brokenFlow = !1,
        this.body.include(e, t),
        e.brokenFlow = s
    }
    includeCallArguments(e, t) {
        this.scope.includeCallArguments(e, t)
    }
    initialise() {
        this.scope.addParameterVariables(this.params.map((e=>e.declare("parameter", re))), this.params[this.params.length - 1]instanceof an),
        this.body instanceof on ? this.body.addImplicitReturnExpressionToScope() : this.scope.addReturnExpression(this.body)
    }
    parseNode(e) {
        e.body.type === ms && (this.body = new on(e.body,this,this.scope.hoistedBodyVarScope)),
        super.parseNode(e)
    }
    addArgumentToBeDeoptimized(e) {}
    applyDeoptimizations() {}
}
ln.prototype.preventChildBlockScope = !0;
class hn extends ln {
    constructor(...args) {
        super(...args),
        this.objectEntity = null
    }
    createScope(e) {
        this.scope = new ki(e,this.context)
    }
    hasEffects() {
        return this.deoptimized || this.applyDeoptimizations(),
        !1
    }
    hasEffectsOnInteractionAtPath(e, t, s) {
        if (super.hasEffectsOnInteractionAtPath(e, t, s))
            return !0;
        if (2 === t.type) {
            const {ignore: e, brokenFlow: t} = s;
            if (s.ignore = {
                breaks: !1,
                continues: !1,
                labels: new Set,
                returnYield: !0,
                this: !1
            },
            this.body.hasEffects(s))
                return !0;
            s.ignore = e,
            s.brokenFlow = t
        }
        return !1
    }
    include(e, t) {
        super.include(e, t);
        for (const s of this.params)
            s instanceof Wi || s.include(e, t)
    }
    getObjectEntity() {
        return null !== this.objectEntity ? this.objectEntity : this.objectEntity = new qs([],Ys)
    }
}
function cn(e, {exportNamesByVariable: t, snippets: {_: s, getObject: i, getPropertyAccess: n}}, r="") {
    if (1 === e.length && 1 === t.get(e[0]).length) {
        const i = e[0];
        return `exports('${t.get(i)}',${s}${i.getName(n)}${r})`
    }
    {
        const s = [];
        for (const i of e)
            for (const e of t.get(i))
                s.push([e, i.getName(n) + r]);
        return `exports(${i(s, {
            lineBreakIndent: null
        })})`
    }
}
function un(e, t, s, i, {exportNamesByVariable: n, snippets: {_: r}}) {
    i.prependRight(t, `exports('${n.get(e)}',${r}`),
    i.appendLeft(s, ")")
}
function dn(e, t, s, i, n, r) {
    const {_: o, getPropertyAccess: a} = r.snippets;
    n.appendLeft(s, `,${o}${cn([e], r)},${o}${e.getName(a)}`),
    i && (n.prependRight(t, "("),
    n.appendLeft(s, ")"))
}
class pn extends Vs {
    addExportedVariables(e, t) {
        for (const s of this.properties)
            "Property" === s.type ? s.value.addExportedVariables(e, t) : s.argument.addExportedVariables(e, t)
    }
    declare(e, t) {
        const s = [];
        for (const i of this.properties)
            s.push(...i.declare(e, t));
        return s
    }
    deoptimizePath(e) {
        if (0 === e.length)
            for (const t of this.properties)
                t.deoptimizePath(e)
    }
    hasEffectsOnInteractionAtPath(e, t, s) {
        for (const e of this.properties)
            if (e.hasEffectsOnInteractionAtPath(K, t, s))
                return !0;
        return !1
    }
    markDeclarationReached() {
        for (const e of this.properties)
            e.markDeclarationReached()
    }
}
class fn extends ui {
    constructor(e) {
        super("arguments", null, re, e),
        this.deoptimizedArguments = []
    }
    addArgumentToBeDeoptimized(e) {
        this.included ? e.deoptimizePath(Y) : this.deoptimizedArguments.push(e)
    }
    hasEffectsOnInteractionAtPath({length}, {type: t}) {
        return 0 !== t || length > 1;
    }
    include() {
        super.include();
        for (const e of this.deoptimizedArguments)
            e.deoptimizePath(Y);
        this.deoptimizedArguments.length = 0
    }
}
class mn extends gi {
    constructor(e) {
        super("this", null, e)
    }
    hasEffectsOnInteractionAtPath(e, t, s) {
        return (s.replacedVariableInits.get(this) || re).hasEffectsOnInteractionAtPath(e, t, s)
    }
}
class gn extends ki {
    constructor(e, t) {
        super(e, t),
        this.variables.set("arguments", this.argumentsVariable = new fn(t)),
        this.variables.set("this", this.thisVariable = new mn(t))
    }
    findLexicalBoundary() {
        return this
    }
    includeCallArguments(e, t) {
        if (super.includeCallArguments(e, t),
        this.argumentsVariable.included)
            for (const s of t)
                s.included || s.include(e, !1)
    }
}
class yn extends ln {
    constructor(...args) {
        super(...args),
        this.objectEntity = null
    }
    createScope(e) {
        this.scope = new gn(e,this.context),
        this.constructedEntity = new qs(Object.create(null),Ys),
        this.scope.thisVariable.addEntityToBeDeoptimized(this.constructedEntity)
    }
    deoptimizeArgumentsOnInteractionAtPath(e, t, s) {
        super.deoptimizeArgumentsOnInteractionAtPath(e, t, s),
        2 === e.type && 0 === t.length && e.args[0] && this.scope.thisVariable.addEntityToBeDeoptimized(e.args[0])
    }
    hasEffects(e) {
        return this.deoptimized || this.applyDeoptimizations(),
        !!this.id?.hasEffects(e)
    }
    hasEffectsOnInteractionAtPath(e, t, s) {
        if (super.hasEffectsOnInteractionAtPath(e, t, s))
            return !0;
        if (2 === t.type) {
            const e = s.replacedVariableInits.get(this.scope.thisVariable);
            s.replacedVariableInits.set(this.scope.thisVariable, t.withNew ? this.constructedEntity : re);
            const {brokenFlow: i, ignore: n, replacedVariableInits: r} = s;
            if (s.ignore = {
                breaks: !1,
                continues: !1,
                labels: new Set,
                returnYield: !0,
                this: t.withNew
            },
            this.body.hasEffects(s))
                return !0;
            s.brokenFlow = i,
            e ? r.set(this.scope.thisVariable, e) : r.delete(this.scope.thisVariable),
            s.ignore = n
        }
        return !1
    }
    include(e, t) {
        super.include(e, t),
        this.id?.include();
        const s = this.scope.argumentsVariable.included;
        for (const i of this.params)
            i instanceof Wi && !s || i.include(e, t)
    }
    initialise() {
        super.initialise(),
        this.id?.declare("function", this)
    }
    addArgumentToBeDeoptimized(e) {
        this.scope.argumentsVariable.addArgumentToBeDeoptimized(e)
    }
    getObjectEntity() {
        return null !== this.objectEntity ? this.objectEntity : this.objectEntity = new qs([{
            key: "prototype",
            kind: "init",
            property: new qs([],Ys)
        }],Ys)
    }
}
class xn extends Vs {
    hasEffects() {
        return this.deoptimized || this.applyDeoptimizations(),
        !0
    }
    include(e, t) {
        if (this.deoptimized || this.applyDeoptimizations(),
        !this.included) {
            this.included = !0;
            e: if (!this.context.usesTopLevelAwait) {
                let e = this.parent;
                do {
                    if (e instanceof yn || e instanceof hn)
                        break e
                } while (e = e.parent);
                this.context.usesTopLevelAwait = !0
            }
        }
        this.argument.include(e, t)
    }
}
const bn = {
    "!=": (e,t)=>e != t,
    "!==": (e,t)=>e !== t,
    "%": (e,t)=>e % t,
    "&": (e,t)=>e & t,
    "*": (e,t)=>e * t,
    "**": (e,t)=>e ** t,
    "+": (e,t)=>e + t,
    "-": (e,t)=>e - t,
    "/": (e,t)=>e / t,
    "<": (e,t)=>e < t,
    "<<": (e,t)=>e << t,
    "<=": (e,t)=>e <= t,
    "==": (e,t)=>e == t,
    "===": (e,t)=>e === t,
    ">": (e,t)=>e > t,
    ">=": (e,t)=>e >= t,
    ">>": (e,t)=>e >> t,
    ">>>": (e,t)=>e >>> t,
    "^": (e,t)=>e ^ t,
    "|": (e,t)=>e | t
};
function En(e, t, s) {
    if (s.arguments.length > 0)
        if (s.arguments[s.arguments.length - 1].included)
            for (const i of s.arguments)
                i.render(e, t);
        else {
            let i = s.arguments.length - 2;
            for (; i >= 0 && !s.arguments[i].included; )
                i--;
            if (i >= 0) {
                for (let n = 0; n <= i; n++)
                    s.arguments[n].render(e, t);
                e.remove(Xi(e.original, ",", s.arguments[i].end), s.end - 1)
            } else
                e.remove(Xi(e.original, "(", s.callee.end) + 1, s.end - 1)
        }
}
class vn extends Vs {
    deoptimizeArgumentsOnInteractionAtPath() {}
    getLiteralValueAtPath({length}) {
        return length > 0 || null === this.value && 110 !== this.context.code.charCodeAt(this.start) || "bigint" == typeof this.value || 47 === this.context.code.charCodeAt(this.start) ? se : this.value;
    }
    getReturnExpressionWhenCalledAtPath(e) {
        return 1 !== e.length ? oe : hs(this.members, e[0])
    }
    hasEffectsOnInteractionAtPath(e, t, s) {
        switch (t.type) {
        case 0:
            return e.length > (null === this.value ? 0 : 1);
        case 1:
            return !0;
        case 2:
            return !!(this.included && this.value instanceof RegExp && (this.value.global || this.value.sticky)) || (1 !== e.length || ls(this.members, e[0], t, s))
        }
    }
    initialise() {
        this.members = (e => {
            if (e instanceof RegExp)
                return os;
            switch (typeof e) {
            case "boolean":
                return ns;
            case "number":
                return rs;
            case "string":
                return as
            }
            return Object.create(null)
        })(this.value)
    }
    parseNode(e) {
        this.value = e.value,
        this.regex = e.regex,
        super.parseNode(e)
    }
    render({indentExclusionRanges}) {
        "string" == typeof this.value && indentExclusionRanges.push([this.start + 1, this.end - 1])
    }
}
function Sn({computed, property}) {
    return computed ? (e => {
        if (e instanceof vn)
            return String(e.value);
        return null
    })(property) : property.name;
}
function An({propertyKey, object, property}) {
    const t = propertyKey
      , s = object;
    if ("string" == typeof t) {
        if (s instanceof Wi)
            return [{
                key: s.name,
                pos: s.start
            }, {
                key: t,
                pos: property.start
            }];
        if (s instanceof kn) {
            const i = An(s);
            return i && [...i, {
                key: t,
                pos: property.start
            }];
        }
    }
    return null
}
class kn extends Vs {
    constructor(...args) {
        super(...args),
        this.variable = null,
        this.assignmentDeoptimized = !1,
        this.bound = !1,
        this.expressionsToBeDeoptimized = [],
        this.isUndefined = !1
    }
    bind() {
        this.bound = !0;
        const e = An(this)
          , t = e && this.scope.findVariable(e[0].key);
        if (t?.isNamespace) {
            const s = wn(t, e.slice(1), this.context);
            s ? "undefined" === s ? this.isUndefined = !0 : (this.variable = s,
            this.scope.addNamespaceMemberAccess((e => {
                let t = e[0].key;
                for (let s = 1; s < e.length; s++)
                    t += `.${e[s].key}`;
                return t
            })(e), s)) : super.bind()
        } else
            super.bind()
    }
    deoptimizeArgumentsOnInteractionAtPath(e, t, s) {
        this.variable ? this.variable.deoptimizeArgumentsOnInteractionAtPath(e, t, s) : this.isUndefined || (t.length < 7 ? this.object.deoptimizeArgumentsOnInteractionAtPath(e, [this.getPropertyKey(), ...t], s) : ae(e))
    }
    deoptimizeCache() {
        const {expressionsToBeDeoptimized: e, object: t} = this;
        this.expressionsToBeDeoptimized = me,
        this.propertyKey = G,
        t.deoptimizePath(Y);
        for (const t of e)
            t.deoptimizeCache()
    }
    deoptimizePath(e) {
        if (0 === e.length && this.disallowNamespaceReassignment(),
        this.variable)
            this.variable.deoptimizePath(e);
        else if (!this.isUndefined && e.length < 7) {
            const t = this.getPropertyKey();
            this.object.deoptimizePath([t === G ? W : t, ...e])
        }
    }
    getLiteralValueAtPath(e, t, s) {
        return this.variable ? this.variable.getLiteralValueAtPath(e, t, s) : this.isUndefined ? void 0 : this.propertyKey !== G && e.length < 7 ? (this.expressionsToBeDeoptimized.push(s),
        this.object.getLiteralValueAtPath([this.getPropertyKey(), ...e], t, s)) : se
    }
    getReturnExpressionWhenCalledAtPath(e, t, s, i) {
        return this.variable ? this.variable.getReturnExpressionWhenCalledAtPath(e, t, s, i) : this.isUndefined ? [Kt, !1] : this.propertyKey !== G && e.length < 7 ? (this.expressionsToBeDeoptimized.push(i),
        this.object.getReturnExpressionWhenCalledAtPath([this.getPropertyKey(), ...e], t, s, i)) : oe
    }
    hasEffects(e) {
        return this.deoptimized || this.applyDeoptimizations(),
        this.property.hasEffects(e) || this.object.hasEffects(e) || this.hasAccessEffect(e)
    }
    hasEffectsAsAssignmentTarget(e, t) {
        return t && !this.deoptimized && this.applyDeoptimizations(),
        this.assignmentDeoptimized || this.applyAssignmentDeoptimization(),
        this.property.hasEffects(e) || this.object.hasEffects(e) || t && this.hasAccessEffect(e) || this.hasEffectsOnInteractionAtPath(K, this.assignmentInteraction, e)
    }
    hasEffectsOnInteractionAtPath(e, t, s) {
        return this.variable ? this.variable.hasEffectsOnInteractionAtPath(e, t, s) : !!this.isUndefined || (!(e.length < 7) || this.object.hasEffectsOnInteractionAtPath([this.getPropertyKey(), ...e], t, s))
    }
    include(e, t) {
        this.deoptimized || this.applyDeoptimizations(),
        this.includeProperties(e, t)
    }
    includeAsAssignmentTarget(e, t, s) {
        this.assignmentDeoptimized || this.applyAssignmentDeoptimization(),
        s ? this.include(e, t) : this.includeProperties(e, t)
    }
    includeCallArguments(e, t) {
        this.variable ? this.variable.includeCallArguments(e, t) : super.includeCallArguments(e, t)
    }
    initialise() {
        this.propertyKey = Sn(this),
        this.accessInteraction = {
            args: [this.object],
            type: 0
        }
    }
    isSkippedAsOptional(e) {
        return !this.variable && !this.isUndefined && (this.object.isSkippedAsOptional?.(e) || this.optional && null == this.object.getLiteralValueAtPath(K, ee, e))
    }
    render(e, t, {renderedParentType: s, isCalleeOfRenderedParent: i, renderedSurroundingElement: n}=pe) {
        if (this.variable || this.isUndefined) {
            const {snippets: {getPropertyAccess: n}} = t;
            let r = this.variable ? this.variable.getName(n) : "undefined";
            s && i && (r = `0, ${r}`),
            e.overwrite(this.start, this.end, r, {
                contentOnly: !0,
                storeName: !0
            })
        } else
            s && i && e.appendRight(this.start, "0, "),
            this.object.render(e, t, {
                renderedSurroundingElement: n
            }),
            this.property.render(e, t)
    }
    setAssignedValue(e) {
        this.assignmentInteraction = {
            args: [this.object, e],
            type: 1
        }
    }
    applyDeoptimizations() {
        this.deoptimized = !0;
        const {propertyReadSideEffects: e} = this.context.options.treeshake;
        if (this.bound && e && !this.variable && !this.isUndefined) {
            const e = this.getPropertyKey();
            this.object.deoptimizeArgumentsOnInteractionAtPath(this.accessInteraction, [e], ee),
            this.context.requestTreeshakingPass()
        }
    }
    applyAssignmentDeoptimization() {
        this.assignmentDeoptimized = !0;
        const {propertyReadSideEffects: e} = this.context.options.treeshake;
        this.bound && e && !this.variable && !this.isUndefined && (this.object.deoptimizeArgumentsOnInteractionAtPath(this.assignmentInteraction, [this.getPropertyKey()], ee),
        this.context.requestTreeshakingPass())
    }
    disallowNamespaceReassignment() {
        if (this.object instanceof Wi) {
            this.scope.findVariable(this.object.name).isNamespace && (this.variable && this.context.includeVariableInModule(this.variable),
            this.context.warn(kt(this.object.name, this.context.module.id), this.start))
        }
    }
    getPropertyKey() {
        if (null === this.propertyKey) {
            this.propertyKey = G;
            const e = this.property.getLiteralValueAtPath(K, ee, this);
            return this.propertyKey = e === H ? e : "symbol" == typeof e ? G : String(e)
        }
        return this.propertyKey
    }
    hasAccessEffect(e) {
        const {propertyReadSideEffects: t} = this.context.options.treeshake;
        return !(this.variable || this.isUndefined) && t && ("always" === t || this.object.hasEffectsOnInteractionAtPath([this.getPropertyKey()], this.accessInteraction, e))
    }
    includeProperties(e, t) {
        this.included || (this.included = !0,
        this.variable && this.context.includeVariableInModule(this.variable)),
        this.object.include(e, t),
        this.property.include(e, t)
    }
}
function wn(e, t, s) {
    if (0 === t.length)
        return e;
    if (!e.isNamespace || e instanceof de)
        return null;
    const i = t[0].key
      , n = e.context.traceExport(i);
    if (!n) {
        if (1 === t.length) {
            const n = e.context.fileName;
            return s.warn($t(i, s.module.id, n), t[0].pos),
            "undefined"
        }
        return null
    }
    return wn(n, t.slice(1), s)
}
class In extends Vs {
    constructor(...args) {
        super(...args),
        this.returnExpression = null,
        this.deoptimizableDependentExpressions = [],
        this.expressionsToBeDeoptimized = new Set
    }
    deoptimizeArgumentsOnInteractionAtPath(e, t, s) {
        const {args: i} = e
          , [n,r] = this.getReturnExpression(s);
        if (r)
            return;
        const o = i.filter((e=>!!e && e !== re));
        if (0 !== o.length)
            if (n === re)
                for (const e of o)
                    e.deoptimizePath(Y);
            else
                s.withTrackedEntityAtPath(t, n, (()=>{
                    for (const e of o)
                        this.expressionsToBeDeoptimized.add(e);
                    n.deoptimizeArgumentsOnInteractionAtPath(e, t, s)
                }
                ), null)
    }
    deoptimizeCache() {
        if (this.returnExpression?.[0] !== re) {
            this.returnExpression = oe;
            const {deoptimizableDependentExpressions: e, expressionsToBeDeoptimized: t} = this;
            this.expressionsToBeDeoptimized = ge,
            this.deoptimizableDependentExpressions = me;
            for (const t of e)
                t.deoptimizeCache();
            for (const e of t)
                e.deoptimizePath(Y)
        }
    }
    deoptimizePath(e) {
        if (0 === e.length || this.context.deoptimizationTracker.trackEntityAtPathAndGetIfTracked(e, this))
            return;
        const [t] = this.getReturnExpression();
        t !== re && t.deoptimizePath(e)
    }
    getLiteralValueAtPath(e, t, s) {
        const [i] = this.getReturnExpression(t);
        return i === re ? se : t.withTrackedEntityAtPath(e, i, (()=>(this.deoptimizableDependentExpressions.push(s),
        i.getLiteralValueAtPath(e, t, s))), se)
    }
    getReturnExpressionWhenCalledAtPath(e, t, s, i) {
        const n = this.getReturnExpression(s);
        return n[0] === re ? n : s.withTrackedEntityAtPath(e, n, (()=>{
            this.deoptimizableDependentExpressions.push(i);
            const [r,o] = n[0].getReturnExpressionWhenCalledAtPath(e, t, s, i);
            return [r, o || n[1]]
        }
        ), oe)
    }
    hasEffectsOnInteractionAtPath(e, t, s) {
        const {type: i} = t;
        if (2 === i) {
            const {args: i, withNew: n} = t;
            if ((n ? s.instantiated : s.called).trackEntityAtPathAndGetIfTracked(e, i, this))
                return !1
        } else if ((1 === i ? s.assigned : s.accessed).trackEntityAtPathAndGetIfTracked(e, this))
            return !1;
        const [n,r] = this.getReturnExpression();
        return (1 === i || !r) && n.hasEffectsOnInteractionAtPath(e, t, s)
    }
}
class Pn extends In {
    bind() {
        if (super.bind(),
        this.callee instanceof Wi) {
            this.scope.findVariable(this.callee.name).isNamespace && this.context.warn(vt(this.callee.name), this.start),
            "eval" === this.callee.name && this.context.warn({
                code: "EVAL",
                id: e = this.context.module.id,
                message: `Use of eval in "${D(e)}" is strongly discouraged as it poses security risks and may cause issues with minification.`,
                url: ke("troubleshooting/#avoiding-eval")
            }, this.start)
        }
        var e;
        this.interaction = {
            args: [this.callee instanceof kn && !this.callee.variable ? this.callee.object : null, ...this.arguments],
            type: 2,
            withNew: !1
        }
    }
    hasEffects(e) {
        try {
            for (const t of this.arguments)
                if (t.hasEffects(e))
                    return !0;
            return (!this.context.options.treeshake.annotations || !this.annotations) && (this.callee.hasEffects(e) || this.callee.hasEffectsOnInteractionAtPath(K, this.interaction, e))
        } finally {
            this.deoptimized || this.applyDeoptimizations()
        }
    }
    include(e, t) {
        this.deoptimized || this.applyDeoptimizations(),
        t ? (super.include(e, t),
        t === Ls && this.callee instanceof Wi && this.callee.variable && this.callee.variable.markCalledFromTryStatement()) : (this.included = !0,
        this.callee.include(e, !1)),
        this.callee.includeCallArguments(e, this.arguments)
    }
    isSkippedAsOptional(e) {
        return this.callee.isSkippedAsOptional?.(e) || this.optional && null == this.callee.getLiteralValueAtPath(K, ee, e)
    }
    render(e, t, {renderedSurroundingElement: s}=pe) {
        this.callee.render(e, t, {
            isCalleeOfRenderedParent: !0,
            renderedSurroundingElement: s
        }),
        En(e, t, this)
    }
    applyDeoptimizations() {
        this.deoptimized = !0,
        this.callee.deoptimizeArgumentsOnInteractionAtPath(this.interaction, K, ee),
        this.context.requestTreeshakingPass()
    }
    getReturnExpression(e=ee) {
        return null === this.returnExpression ? (this.returnExpression = oe,
        this.returnExpression = this.callee.getReturnExpressionWhenCalledAtPath(K, this.interaction, e, this)) : this.returnExpression
    }
}
class Cn extends Ai {
    addDeclaration(e, t, s, i) {
        const n = this.variables.get(e.name);
        return n ? (this.parent.addDeclaration(e, t, Kt, i),
        n.addDeclaration(e, s),
        n) : this.parent.addDeclaration(e, t, s, i)
    }
}
class $n extends Si {
    constructor(e, t, s) {
        super(e),
        this.variables.set("this", this.thisVariable = new ui("this",null,t,s)),
        this.instanceScope = new Si(this),
        this.instanceScope.variables.set("this", new mn(s))
    }
    findLexicalBoundary() {
        return this
    }
}
class Nn extends Vs {
    constructor(...args) {
        super(...args),
        this.accessedValue = null
    }
    deoptimizeArgumentsOnInteractionAtPath(e, t, s) {
        return 0 === e.type && "get" === this.kind && 0 === t.length || 1 === e.type && "set" === this.kind && 0 === t.length ? this.value.deoptimizeArgumentsOnInteractionAtPath({
            args: e.args,
            type: 2,
            withNew: !1
        }, K, s) : void this.getAccessedValue()[0].deoptimizeArgumentsOnInteractionAtPath(e, t, s)
    }
    deoptimizeCache() {}
    deoptimizePath(e) {
        this.getAccessedValue()[0].deoptimizePath(e)
    }
    getLiteralValueAtPath(e, t, s) {
        return this.getAccessedValue()[0].getLiteralValueAtPath(e, t, s)
    }
    getReturnExpressionWhenCalledAtPath(e, t, s, i) {
        return this.getAccessedValue()[0].getReturnExpressionWhenCalledAtPath(e, t, s, i)
    }
    hasEffects(e) {
        return this.key.hasEffects(e)
    }
    hasEffectsOnInteractionAtPath(e, t, s) {
        return "get" === this.kind && 0 === t.type && 0 === e.length || "set" === this.kind && 1 === t.type ? this.value.hasEffectsOnInteractionAtPath(K, {
            args: t.args,
            type: 2,
            withNew: !1
        }, s) : this.getAccessedValue()[0].hasEffectsOnInteractionAtPath(e, t, s)
    }
    applyDeoptimizations() {}
    getAccessedValue() {
        return null === this.accessedValue ? "get" === this.kind ? (this.accessedValue = oe,
        this.accessedValue = this.value.getReturnExpressionWhenCalledAtPath(K, ce, ee, this)) : this.accessedValue = [this.value, !1] : this.accessedValue
    }
}
class _n extends Nn {
    applyDeoptimizations() {}
}
class Rn extends ne {
    constructor(e, t) {
        super(),
        this.object = e,
        this.key = t
    }
    deoptimizeArgumentsOnInteractionAtPath(e, t, s) {
        this.object.deoptimizeArgumentsOnInteractionAtPath(e, [this.key, ...t], s)
    }
    deoptimizePath(e) {
        this.object.deoptimizePath([this.key, ...e])
    }
    getLiteralValueAtPath(e, t, s) {
        return this.object.getLiteralValueAtPath([this.key, ...e], t, s)
    }
    getReturnExpressionWhenCalledAtPath(e, t, s, i) {
        return this.object.getReturnExpressionWhenCalledAtPath([this.key, ...e], t, s, i)
    }
    hasEffectsOnInteractionAtPath(e, t, s) {
        return this.object.hasEffectsOnInteractionAtPath([this.key, ...e], t, s)
    }
}
class Mn extends Vs {
    constructor(...args) {
        super(...args),
        this.objectEntity = null
    }
    createScope(e) {
        this.scope = new Si(e)
    }
    deoptimizeArgumentsOnInteractionAtPath(e, t, s) {
        this.getObjectEntity().deoptimizeArgumentsOnInteractionAtPath(e, t, s)
    }
    deoptimizeCache() {
        this.getObjectEntity().deoptimizeAllProperties()
    }
    deoptimizePath(e) {
        this.getObjectEntity().deoptimizePath(e)
    }
    getLiteralValueAtPath(e, t, s) {
        return this.getObjectEntity().getLiteralValueAtPath(e, t, s)
    }
    getReturnExpressionWhenCalledAtPath(e, t, s, i) {
        return this.getObjectEntity().getReturnExpressionWhenCalledAtPath(e, t, s, i)
    }
    hasEffects(e) {
        this.deoptimized || this.applyDeoptimizations();
        const t = this.superClass?.hasEffects(e) || this.body.hasEffects(e);
        return this.id?.markDeclarationReached(),
        t || super.hasEffects(e)
    }
    hasEffectsOnInteractionAtPath(e, t, s) {
        return 2 === t.type && 0 === e.length ? !t.withNew || (null === this.classConstructor ? this.superClass?.hasEffectsOnInteractionAtPath(e, t, s) : this.classConstructor.hasEffectsOnInteractionAtPath(e, t, s)) || !1 : this.getObjectEntity().hasEffectsOnInteractionAtPath(e, t, s)
    }
    include(e, t) {
        this.deoptimized || this.applyDeoptimizations(),
        this.included = !0,
        this.superClass?.include(e, t),
        this.body.include(e, t),
        this.id && (this.id.markDeclarationReached(),
        this.id.include())
    }
    initialise() {
        this.id?.declare("class", this);
        for (const e of this.body.body)
            if (e instanceof _n && "constructor" === e.kind)
                return void (this.classConstructor = e);
        this.classConstructor = null
    }
    applyDeoptimizations() {
        this.deoptimized = !0;
        for (const e of this.body.body)
            e.static || e instanceof _n && "constructor" === e.kind || e.deoptimizePath(Y);
        this.context.requestTreeshakingPass()
    }
    getObjectEntity() {
        if (null !== this.objectEntity)
            return this.objectEntity;
        const e = []
          , t = [];
        for (const s of this.body.body) {
            const i = s.static ? e : t
              , n = s.kind;
            if (i === t && !n)
                continue;
            const r = "set" === n || "get" === n ? n : "init";
            let o;
            if (s.computed) {
                const e = s.key.getLiteralValueAtPath(K, ee, this);
                if ("symbol" == typeof e) {
                    i.push({
                        key: G,
                        kind: r,
                        property: s
                    });
                    continue
                }
                o = String(e)
            } else
                o = s.key instanceof Wi ? s.key.name : String(s.key.value);
            i.push({
                key: o,
                kind: r,
                property: s
            })
        }
        return e.unshift({
            key: "prototype",
            kind: "init",
            property: new qs(t,this.superClass ? new Rn(this.superClass,"prototype") : Ys)
        }),
        this.objectEntity = new qs(e,this.superClass || Ys)
    }
}
class Tn extends Mn {
    initialise() {
        super.initialise(),
        null !== this.id && (this.id.variable.isId = !0)
    }
    parseNode(e) {
        null !== e.id && (this.id = new Wi(e.id,this,this.scope.parent)),
        super.parseNode(e)
    }
    render(e, t) {
        const {exportNamesByVariable: s, format: i, snippets: {_: n, getPropertyAccess: r}} = t;
        if (this.id) {
            const {variable: o, name: a} = this.id;
            "system" === i && s.has(o) && e.appendLeft(this.end, `${n}${cn([o], t)};`);
            const l = o.getName(r);
            if (l !== a)
                return this.superClass?.render(e, t),
                this.body.render(e, {
                    ...t,
                    useOriginalName: e=>e === o
                }),
                e.prependRight(this.start, `let ${l}${n}=${n}`),
                void e.prependLeft(this.end, ";")
        }
        super.render(e, t)
    }
    applyDeoptimizations() {
        super.applyDeoptimizations();
        const {id: e, scope: t} = this;
        if (e) {
            const {name: s, variable: i} = e;
            for (const e of t.accessedOutsideVariables.values())
                e !== i && e.forbidName(s)
        }
    }
}
class On extends Mn {
    render(e, t, {renderedSurroundingElement: s}=pe) {
        super.render(e, t),
        s === bs && (e.appendRight(this.start, "("),
        e.prependLeft(this.end, ")"))
    }
}
class Dn extends ne {
    constructor(e) {
        super(),
        this.expressions = e,
        this.included = !1
    }
    deoptimizePath(e) {
        for (const t of this.expressions)
            t.deoptimizePath(e)
    }
    getReturnExpressionWhenCalledAtPath(e, t, s, i) {
        return [new Dn(this.expressions.map((n=>n.getReturnExpressionWhenCalledAtPath(e, t, s, i)[0]))), !1]
    }
    hasEffectsOnInteractionAtPath(e, t, s) {
        for (const i of this.expressions)
            if (i.hasEffectsOnInteractionAtPath(e, t, s))
                return !0;
        return !1
    }
}
function Ln(e, t) {
    const {brokenFlow: s, hasBreak: i, hasContinue: n, ignore: r} = e
      , {breaks: o, continues: a} = r;
    return r.breaks = !0,
    r.continues = !0,
    e.hasBreak = !1,
    e.hasContinue = !1,
    !!t.hasEffects(e) || (r.breaks = o,
    r.continues = a,
    e.hasBreak = i,
    e.hasContinue = n,
    e.brokenFlow = s,
    !1)
}
function Vn(e, t, s) {
    const {brokenFlow: i, hasBreak: n, hasContinue: r} = e;
    e.hasBreak = !1,
    e.hasContinue = !1,
    t.include(e, s, {
        asSingleStatement: !0
    }),
    e.hasBreak = n,
    e.hasContinue = r,
    e.brokenFlow = i
}
class Bn extends Vs {
    hasEffects() {
        return !1
    }
    initialise() {
        this.context.addExport(this)
    }
    render(e, t, {start, end}) {
        e.remove(start, end)
    }
    applyDeoptimizations() {}
}
Bn.prototype.needsBoundaries = !0;
class zn extends yn {
    initialise() {
        super.initialise(),
        null !== this.id && (this.id.variable.isId = !0)
    }
    parseNode(e) {
        null !== e.id && (this.id = new Wi(e.id,this,this.scope.parent)),
        super.parseNode(e)
    }
}
class Fn extends Vs {
    include(e, t) {
        super.include(e, t),
        t && this.context.includeVariableInModule(this.variable)
    }
    initialise() {
        const e = this.declaration;
        this.declarationName = e.id && e.id.name || this.declaration.name,
        this.variable = this.scope.addExportDefaultDeclaration(this.declarationName || this.context.getModuleName(), this, this.context),
        this.context.addExport(this)
    }
    render(e, t, s) {
        const {start: i, end: n} = s
          , r = ((e, t) => Ji(e, Xi(e, "default", t) + 7))(e.original, this.start);
        if (this.declaration instanceof zn)
            this.renderNamedDeclaration(e, r, null === this.declaration.id ? ((e, t) => {
                const s = Xi(e, "function", t) + 8;
                e = e.slice(s, Xi(e, "(", s));
                const i = Xi(e, "*");
                return -1 === i ? s : s + i + 1
            })(e.original, r) : null, t);
        else if (this.declaration instanceof Tn)
            this.renderNamedDeclaration(e, r, null === this.declaration.id ? Xi(e.original, "class", i) + 5 : null, t);
        else {
            if (this.variable.getOriginalVariable() !== this.variable)
                return void Hi(this, e, i, n);
            if (!this.variable.included)
                return e.remove(this.start, r),
                this.declaration.render(e, t, {
                    renderedSurroundingElement: bs
                }),
                void (";" !== e.original[this.end - 1] && e.appendLeft(this.end, ";"));
            this.renderVariableDeclaration(e, r, t)
        }
        this.declaration.render(e, t)
    }
    applyDeoptimizations() {}
    renderNamedDeclaration(e, t, s, i) {
        const {exportNamesByVariable: n, format: r, snippets: {getPropertyAccess: o}} = i
          , a = this.variable.getName(o);
        e.remove(this.start, t),
        null !== s && e.appendLeft(s, ` ${a}`),
        "system" === r && this.declaration instanceof Tn && n.has(this.variable) && e.appendLeft(this.end, ` ${cn([this.variable], i)};`)
    }
    renderVariableDeclaration(e, t, {format: s, exportNamesByVariable: i, snippets: {cnst: n, getPropertyAccess: r}}) {
        const o = 59 === e.original.charCodeAt(this.end - 1)
          , a = "system" === s && i.get(this.variable);
        a ? (e.overwrite(this.start, t, `${n} ${this.variable.getName(r)} = exports('${a[0]}', `),
        e.appendRight(o ? this.end - 1 : this.end, `)${o ? "" : ";"}`)) : (e.overwrite(this.start, t, `${n} ${this.variable.getName(r)} = `),
        o || e.appendLeft(this.end, ";"))
    }
}
Fn.prototype.needsBoundaries = !0;
class jn extends Vs {
    bind() {
        this.declaration?.bind()
    }
    hasEffects(e) {
        return !!this.declaration?.hasEffects(e)
    }
    initialise() {
        this.context.addExport(this)
    }
    render(e, t, s) {
        const {start: i, end: n} = s;
        null === this.declaration ? e.remove(i, n) : (e.remove(this.start, this.declaration.start),
        this.declaration.render(e, t, {
            end: n,
            start: i
        }))
    }
    applyDeoptimizations() {}
}
jn.prototype.needsBoundaries = !0;
class Un extends yn {
    render(e, t, {renderedSurroundingElement: s}=pe) {
        super.render(e, t),
        s === bs && (e.appendRight(this.start, "("),
        e.prependLeft(this.end, ")"))
    }
}
class Gn extends nn {
    constructor(...args) {
        super(...args),
        this.hoistedDeclarations = []
    }
    addDeclaration(e, t, s, i) {
        return this.hoistedDeclarations.push(e),
        super.addDeclaration(e, t, s, i)
    }
}
const Wn = Symbol("unset");
class qn extends Vs {
    constructor(...args) {
        super(...args),
        this.testValue = Wn
    }
    deoptimizeCache() {
        this.testValue = se
    }
    hasEffects(e) {
        if (this.test.hasEffects(e))
            return !0;
        const t = this.getTestValue();
        if ("symbol" == typeof t) {
            const {brokenFlow: t} = e;
            if (this.consequent.hasEffects(e))
                return !0;
            const s = e.brokenFlow;
            return e.brokenFlow = t,
            null === this.alternate ? !1 : !!this.alternate.hasEffects(e) || (e.brokenFlow = e.brokenFlow && s,
            !1)
        }
        return t ? this.consequent.hasEffects(e) : !!this.alternate?.hasEffects(e)
    }
    include(e, t) {
        if (this.included = !0,
        t)
            this.includeRecursively(t, e);
        else {
            const t = this.getTestValue();
            "symbol" == typeof t ? this.includeUnknownTest(e) : this.includeKnownTest(e, t)
        }
    }
    parseNode(e) {
        this.consequentScope = new Gn(this.scope),
        this.consequent = new (this.context.getNodeConstructor(e.consequent.type))(e.consequent,this,this.consequentScope),
        e.alternate && (this.alternateScope = new Gn(this.scope),
        this.alternate = new (this.context.getNodeConstructor(e.alternate.type))(e.alternate,this,this.alternateScope)),
        super.parseNode(e)
    }
    render(e, t) {
        const {snippets: {getPropertyAccess: s}} = t
          , i = this.getTestValue()
          , n = []
          , r = this.test.included
          , o = !this.context.options.treeshake;
        r ? this.test.render(e, t) : e.remove(this.start, this.consequent.start),
        this.consequent.included && (o || "symbol" == typeof i || i) ? this.consequent.render(e, t) : (e.overwrite(this.consequent.start, this.consequent.end, r ? ";" : ""),
        n.push(...this.consequentScope.hoistedDeclarations)),
        this.alternate && (!this.alternate.included || !o && "symbol" != typeof i && i ? (r && this.shouldKeepAlternateBranch() ? e.overwrite(this.alternate.start, this.end, ";") : e.remove(this.consequent.end, this.end),
        n.push(...this.alternateScope.hoistedDeclarations)) : (r ? 101 === e.original.charCodeAt(this.alternate.start - 1) && e.prependLeft(this.alternate.start, " ") : e.remove(this.consequent.end, this.alternate.start),
        this.alternate.render(e, t))),
        this.renderHoistedDeclarations(n, e, s)
    }
    applyDeoptimizations() {}
    getTestValue() {
        return this.testValue === Wn ? this.testValue = this.test.getLiteralValueAtPath(K, ee, this) : this.testValue
    }
    includeKnownTest(e, t) {
        this.test.shouldBeIncluded(e) && this.test.include(e, !1),
        t && this.consequent.shouldBeIncluded(e) && this.consequent.include(e, !1, {
            asSingleStatement: !0
        }),
        !t && this.alternate?.shouldBeIncluded(e) && this.alternate.include(e, !1, {
            asSingleStatement: !0
        })
    }
    includeRecursively(e, t) {
        this.test.include(t, e),
        this.consequent.include(t, e),
        this.alternate?.include(t, e)
    }
    includeUnknownTest(e) {
        this.test.include(e, !1);
        const {brokenFlow: t} = e;
        let s = !1;
        this.consequent.shouldBeIncluded(e) && (this.consequent.include(e, !1, {
            asSingleStatement: !0
        }),
        s = e.brokenFlow,
        e.brokenFlow = t),
        this.alternate?.shouldBeIncluded(e) && (this.alternate.include(e, !1, {
            asSingleStatement: !0
        }),
        e.brokenFlow = e.brokenFlow && s)
    }
    renderHoistedDeclarations(e, t, s) {
        const i = [...new Set(e.map((({variable}) => {
            const t = variable;
            return t.included ? t.getName(s) : ""
        }
        )))].filter(Boolean).join(", ");
        if (i) {
            const e = this.parent.type
              , s = e !== As && e !== ms;
            t.prependRight(this.start, `${s ? "{ " : ""}var ${i}; `),
            s && t.appendLeft(this.end, " }")
        }
    }
    shouldKeepAlternateBranch() {
        let e = this.parent;
        do {
            if (e instanceof qn && e.alternate)
                return !0;
            if (e instanceof on)
                return !1;
            e = e.parent
        } while (e);
        return !1
    }
}
class Hn extends Vs {
    bind() {}
    hasEffects() {
        return !1
    }
    initialise() {
        this.context.addImport(this)
    }
    render(e, t, {start, end}) {
        e.remove(start, end)
    }
    applyDeoptimizations() {}
}
Hn.prototype.needsBoundaries = !0;
class Kn extends Vs {
    applyDeoptimizations() {}
}
const Yn = "_interopDefault"
  , Xn = "_interopDefaultCompat"
  , Qn = "_interopNamespace"
  , Jn = "_interopNamespaceCompat"
  , Zn = "_interopNamespaceDefault"
  , er = "_interopNamespaceDefaultOnly"
  , tr = "_mergeNamespaces"
  , sr = {
    auto: Yn,
    compat: Xn,
    default: null,
    defaultOnly: null,
    esModule: null
}
  , ir = (e,t)=>"esModule" === e || t && ("auto" === e || "compat" === e)
  , nr = {
    auto: Qn,
    compat: Jn,
    default: Zn,
    defaultOnly: er,
    esModule: null
}
  , rr = (e,t)=>"esModule" !== e && ir(e, t)
  , or = (e,t,s,i,n,r,o)=>{
    const a = new Set(e);
    for (const e of Er)
        t.has(e) && a.add(e);
    return Er.map((e=>a.has(e) ? ar[e](s, i, n, r, o, a) : "")).join("")
}
  , ar = {
    [Xn](e, t, s) {
        const {_: i, getDirectReturnFunction: n, n: r} = t
          , [o,a] = n(["e"], {
            functionReturn: !0,
            lineBreakIndent: null,
            name: Xn
        });
        return `${o}${cr(t)}${i}?${i}${s ? lr(t) : hr(t)}${a}${r}${r}`
    },
    [Yn](e, t, s) {
        const {_: i, getDirectReturnFunction: n, n: r} = t
          , [o,a] = n(["e"], {
            functionReturn: !0,
            lineBreakIndent: null,
            name: Yn
        });
        return `${o}e ${i}&&${i}e.__esModule ${i}?${i}${s ? lr(t) : hr(t)}${a}${r}${r}`
    },
    [Jn](e, t, s, i, n, r) {
        const {_: o, getDirectReturnFunction: a, n: l} = t;
        if (r.has(Zn)) {
            const [e,s] = a(["e"], {
                functionReturn: !0,
                lineBreakIndent: null,
                name: Jn
            });
            return `${e}${cr(t)}${o}?${o}e ${o}:${o}${Zn}(e)${s}${l}${l}`
        }
        return `function ${Jn}(e)${o}{${l}${e}if ${o}(${cr(t)})${o}return e;${l}` + ur(e, e, t, s, i, n) + `}${l}${l}`
    },
    [er](e, t, s, i, n) {
        const {getDirectReturnFunction: r, getObject: o, n: a} = t
          , [l,h] = r(["e"], {
            functionReturn: !0,
            lineBreakIndent: null,
            name: er
        });
        return `${l}${xr(i, br(n, o([["__proto__", "null"], ["default", "e"]], {
            lineBreakIndent: null
        }), t))}${h}${a}${a}`
    },
    [Zn](e, t, s, i, n) {
        const {_: r, n: o} = t;
        return `function ${Zn}(e)${r}{${o}` + ur(e, e, t, s, i, n) + `}${o}${o}`
    },
    [Qn](e, t, s, i, n, r) {
        const {_: o, getDirectReturnFunction: a, n: l} = t;
        if (r.has(Zn)) {
            const [e,t] = a(["e"], {
                functionReturn: !0,
                lineBreakIndent: null,
                name: Qn
            });
            return `${e}e ${o}&&${o}e.__esModule ${o}?${o}e ${o}:${o}${Zn}(e)${t}${l}${l}`
        }
        return `function ${Qn}(e)${o}{${l}${e}if ${o}(e ${o}&&${o}e.__esModule)${o}return e;${l}` + ur(e, e, t, s, i, n) + `}${l}${l}`
    },
    [tr](e, t, s, i, n) {
        const {_: r, cnst: o, n: a} = t
          , l = "var" === o && s;
        return `function ${tr}(n, m)${r}{${a}${e}${pr(`{${a}${e}${e}${e}if ${r}(k ${r}!==${r}'default'${r}&&${r}!(k in n))${r}{${a}` + (s ? l ? mr : gr : yr)(e, e + e + e + e, t) + `${e}${e}${e}}${a}` + `${e}${e}}`, l, e, t)}${a}${e}return ${xr(i, br(n, "n", t))};${a}}${a}${a}`
    }
}
  , lr = ({_: e, getObject: t})=>`e ${e}:${e}${t([["default", "e"]], {
    lineBreakIndent: null
})}`
  , hr = ({_: e, getPropertyAccess: t})=>`e ${t("default")}${e}:${e}e`
  , cr = ({_: e})=>`e ${e}&&${e}typeof e ${e}===${e}'object'${e}&&${e}'default'${e}in e`
  , ur = (e,t,s,i,n,r)=>{
    const {_: o, cnst: a, getObject: l, getPropertyAccess: h, n: c, s: u} = s
      , d = `{${c}` + (i ? fr : yr)(e, t + e + e, s) + `${t}${e}}`;
    return `${t}${a} n ${o}=${o}Object.create(null ${r ? `,${o}{${o}[Symbol.toStringTag]:${o}${vr(l)}${o}}` : ""});${c}${t}if ${o}(e)${o}{${c}${t}${e}${dr(d, !i, s)}${c}${t}}${c}${t}n ${h("default")}${o}=${o}e;${c}${t}return ${xr(n, "n")}${u}${c}`
}
  , dr = (e,t,{_: s, cnst: i, getFunctionIntro: n, s: r})=>"var" !== i || t ? `for ${s}(${i} k in e)${s}${e}` : `Object.keys(e).forEach(${n(["k"], {
    isAsync: !1,
    name: null
})}${e})${r}`
  , pr = (e,t,s,{_: i, cnst: n, getDirectReturnFunction: r, getFunctionIntro: o, n: a})=>{
    if (t) {
        const [t,n] = r(["e"], {
            functionReturn: !1,
            lineBreakIndent: {
                base: s,
                t: s
            },
            name: null
        });
        return `m.forEach(${t}e ${i}&&${i}typeof e ${i}!==${i}'string'${i}&&${i}!Array.isArray(e)${i}&&${i}Object.keys(e).forEach(${o(["k"], {
            isAsync: !1,
            name: null
        })}${e})${n});`
    }
    return `for ${i}(var i ${i}=${i}0;${i}i ${i}<${i}m.length;${i}i++)${i}{${a}${s}${s}${n} e ${i}=${i}m[i];${a}${s}${s}if ${i}(typeof e ${i}!==${i}'string'${i}&&${i}!Array.isArray(e))${i}{${i}for ${i}(${n} k in e)${i}${e}${i}}${a}${s}}`
}
  , fr = (e,t,s)=>{
    const {_: i, n} = s;
    return `${t}if ${i}(k ${i}!==${i}'default')${i}{${n}` + mr(e, t + e, s) + `${t}}${n}`
}
  , mr = (e,t,{_: s, cnst: i, getDirectReturnFunction: n, n: r})=>{
    const [o,a] = n([], {
        functionReturn: !0,
        lineBreakIndent: null,
        name: null
    });
    return `${t}${i} d ${s}=${s}Object.getOwnPropertyDescriptor(e,${s}k);${r}${t}Object.defineProperty(n,${s}k,${s}d.get ${s}?${s}d ${s}:${s}{${r}${t}${e}enumerable:${s}true,${r}${t}${e}get:${s}${o}e[k]${a}${r}${t}});${r}`
}
  , gr = (e,t,{_: s, cnst: i, getDirectReturnFunction: n, n: r})=>{
    const [o,a] = n([], {
        functionReturn: !0,
        lineBreakIndent: null,
        name: null
    });
    return `${t}${i} d ${s}=${s}Object.getOwnPropertyDescriptor(e,${s}k);${r}${t}if ${s}(d)${s}{${r}${t}${e}Object.defineProperty(n,${s}k,${s}d.get ${s}?${s}d ${s}:${s}{${r}${t}${e}${e}enumerable:${s}true,${r}${t}${e}${e}get:${s}${o}e[k]${a}${r}${t}${e}});${r}${t}}${r}`
}
  , yr = (e,t,{_: s, n: i})=>`${t}n[k]${s}=${s}e[k];${i}`
  , xr = (e,t)=>e ? `Object.freeze(${t})` : t
  , br = (e,t,{_: s, getObject: i})=>e ? `Object.defineProperty(${t},${s}Symbol.toStringTag,${s}${vr(i)})` : t
  , Er = Object.keys(ar);
function vr(e) {
    return e([["value", "'Module'"]], {
        lineBreakIndent: null
    })
}
function Sr(e, t) {
    return null !== e.renderBaseName && t.has(e) && e.isReassigned
}
class Ar extends Vs {
    declareDeclarator(e) {
        this.id.declare(e, this.init || Kt)
    }
    deoptimizePath(e) {
        this.id.deoptimizePath(e)
    }
    hasEffects(e) {
        this.deoptimized || this.applyDeoptimizations();
        const t = this.init?.hasEffects(e);
        return this.id.markDeclarationReached(),
        t || this.id.hasEffects(e)
    }
    include(e, t) {
        const {deoptimized: s, id: i, init: n} = this;
        s || this.applyDeoptimizations(),
        this.included = !0,
        n?.include(e, t),
        i.markDeclarationReached(),
        (t || i.shouldBeIncluded(e)) && i.include(e, t)
    }
    render(e, t) {
        const {exportNamesByVariable: s, snippets: {_: i, getPropertyAccess: n}} = t
          , {end: r, id: o, init: a, start: l} = this
          , h = o.included;
        if (h)
            o.render(e, t);
        else {
            const t = Xi(e.original, "=", o.end);
            e.remove(l, Ji(e.original, t + 1))
        }
        if (a) {
            if (o instanceof Wi && a instanceof On && !a.id) {
                o.variable.getName(n) !== o.name && e.appendLeft(a.start + 5, ` ${o.name}`)
            }
            a.render(e, t, h ? pe : {
                renderedSurroundingElement: bs
            })
        } else
            o instanceof Wi && Sr(o.variable, s) && e.appendLeft(r, `${i}=${i}void 0`)
    }
    applyDeoptimizations() {
        this.deoptimized = !0;
        const {id: e, init: t} = this;
        if (t && e instanceof Wi && t instanceof On && !t.id) {
            const {name: s, variable: i} = e;
            for (const e of t.scope.accessedOutsideVariables.values())
                e !== i && e.forbidName(s)
        }
    }
}
function kr(e, t, s) {
    return "external" === t ? nr[s(e instanceof jt ? e.id : null)] : "default" === t ? er : null
}
const wr = {
    amd: ["require"],
    cjs: ["require"],
    system: ["module"]
};
function Ir({properties}) {
    const t = [];
    for (const s of properties) {
        if ("RestElement" === s.type || s.computed || "Identifier" !== s.key.type)
            return;
        t.push(s.key.name)
    }
    return t
}
class Pr extends Vs {
    applyDeoptimizations() {}
}
const Cr = "ROLLUP_FILE_URL_"
  , $r = "import";
const Nr = {
    amd: ["document", "module", "URL"],
    cjs: ["document", "require", "URL"],
    es: [],
    iife: ["document", "URL"],
    system: ["module"],
    umd: ["document", "require", "URL"]
}
  , _r = {
    amd: ["document", "require", "URL"],
    cjs: ["document", "require", "URL"],
    es: [],
    iife: ["document", "URL"],
    system: ["module", "URL"],
    umd: ["document", "require", "URL"]
}
  , Rr = (e,t="URL")=>`new ${t}(${e}).href`
  , Mr = (e,t=!1)=>Rr(`'${T(e)}', ${t ? "typeof document === 'undefined' ? location.href : " : ""}document.currentScript && document.currentScript.src || document.baseURI`)
  , Tr = e=>(t,{chunkId: s})=>{
    const i = e(s);
    return null === t ? `({ url: ${i} })` : "url" === t ? i : "undefined"
}
  , Or = e=>`require('u' + 'rl').pathToFileURL(${e}).href`
  , Dr = e=>Or(`__dirname + '/${e}'`)
  , Lr = (e,t=!1)=>`${t ? "typeof document === 'undefined' ? location.href : " : ""}(document.currentScript && document.currentScript.src || new URL('${T(e)}', document.baseURI).href)`
  , Vr = {
    amd: e=>("." !== e[0] && (e = `./${e}`),
    Rr(`require.toUrl('${e}'), document.baseURI`)),
    cjs: e=>`(typeof document === 'undefined' ? ${Dr(e)} : ${Mr(e)})`,
    es: e=>Rr(`'${e}', import.meta.url`),
    iife: e=>Mr(e),
    system: e=>Rr(`'${e}', module.meta.url`),
    umd: e=>`(typeof document === 'undefined' && typeof location === 'undefined' ? ${Dr(e)} : ${Mr(e, !0)})`
}
  , Br = {
    amd: Tr((()=>Rr("module.uri, document.baseURI"))),
    cjs: Tr((e=>`(typeof document === 'undefined' ? ${Or("__filename")} : ${Lr(e)})`)),
    iife: Tr((e=>Lr(e))),
    system: (e,{snippets: {getPropertyAccess: t}})=>null === e ? "module.meta" : `module.meta ${t(e)}`,
    umd: Tr((e=>`(typeof document === 'undefined' && typeof location === 'undefined' ? ${Or("__filename")} : ${Lr(e, !0)})`))
};
function zr(e, t) {
    const s = e.filter((({mappings}) => !!mappings));
    e: for (; s.length > 0; ) {
        const e = s.pop().mappings[t.line - 1];
        if (e) {
            const s = e.filter((({length}) => length > 1))
              , i = s[s.length - 1];
            for (const e of s)
                if (e[0] >= t.column || e === i) {
                    t = {
                        column: e[3],
                        line: e[2] + 1
                    };
                    continue e
                }
        }
        throw new Error("Can't resolve original location of error.")
    }
    return t
}
class Fr extends Vs {
    constructor(...args) {
        super(...args),
        this.hasCachedEffect = null,
        this.hasLoggedEffect = !1
    }
    hasCachedEffects() {
        return !!this.included && (null === this.hasCachedEffect ? this.hasCachedEffect = this.hasEffects(qt()) : this.hasCachedEffect)
    }
    hasEffects(e) {
        for (const t of this.body)
            if (t.hasEffects(e)) {
                if (this.context.options.experimentalLogSideEffects && !this.hasLoggedEffect) {
                    this.hasLoggedEffect = !0;
                    const {code: e, module: s} = this.context
                      , {line: i, column: n} = ye(e, t.start, {
                        offsetLine: 1
                    });
                    console.log(`First side effect in ${D(s.id)} is at (${i}:${n})\n ${Se(e, i, n)}`);
                    try {
                        const {column: e, line: t} = zr(s.sourcemapChain, {
                            column: n,
                            line: i
                        });
                        t !== i && console.log(`Original location is at (${t}:${e})\n ${Se(s.originalCode, t, e)}\n`)
                    } catch {}
                    console.log()
                }
                return this.hasCachedEffect = !0
            }
        return !1
    }
    include(e, t) {
        this.included = !0;
        for (const s of this.body)
            (t || s.shouldBeIncluded(e)) && s.include(e, t)
    }
    render(e, t) {
        let s = this.start;
        if (e.original.startsWith("#!") && (s = Math.min(e.original.indexOf("\n") + 1, this.end),
        e.remove(0, s)),
        this.body.length > 0) {
            for (; "/" === e.original[s] && /[*/]/.test(e.original[s + 1]); ) {
                const t = Zi(e.original.slice(s, this.body[0].start));
                if (-1 === t[0])
                    break;
                s += t[1]
            }
            en(this.body, e, s, this.end, t)
        } else
            super.render(e, t)
    }
    applyDeoptimizations() {}
}
class jr extends Vs {
    hasEffects(e) {
        if (this.test?.hasEffects(e))
            return !0;
        for (const t of this.consequent) {
            if (e.brokenFlow)
                break;
            if (t.hasEffects(e))
                return !0
        }
        return !1
    }
    include(e, t) {
        this.included = !0,
        this.test?.include(e, t);
        for (const s of this.consequent)
            (t || s.shouldBeIncluded(e)) && s.include(e, t)
    }
    render(e, t, {end}) {
        if (this.consequent.length > 0) {
            this.test && this.test.render(e, t);
            const i = this.test ? this.test.end : Xi(e.original, "default", this.start) + 7
              , n = Xi(e.original, ":", i) + 1;
            en(this.consequent, e, n, end, t)
        } else
            super.render(e, t)
    }
}
jr.prototype.needsBoundaries = !0;
class Ur extends Vs {
    deoptimizeArgumentsOnInteractionAtPath() {}
    getLiteralValueAtPath({length}) {
        return length > 0 || 1 !== this.quasis.length ? se : this.quasis[0].value.cooked;
    }
    getReturnExpressionWhenCalledAtPath(e) {
        return 1 !== e.length ? oe : hs(as, e[0])
    }
    hasEffectsOnInteractionAtPath(e, t, s) {
        return 0 === t.type ? e.length > 1 : 2 !== t.type || 1 !== e.length || ls(as, e[0], t, s)
    }
    render(e, t) {
        e.indentExclusionRanges.push([this.start, this.end]),
        super.render(e, t)
    }
}
class Gr extends ue {
    constructor() {
        super("undefined")
    }
    getLiteralValueAtPath() {}
}
class Wr extends ui {
    constructor(e, t, s) {
        super(e, t, t.declaration, s),
        this.hasId = !1,
        this.originalId = null,
        this.originalVariable = null;
        const i = t.declaration;
        (i instanceof zn || i instanceof Tn) && i.id ? (this.hasId = !0,
        this.originalId = i.id) : i instanceof Wi && (this.originalId = i)
    }
    addReference({name}) {
        this.hasId || (this.name = name)
    }
    forbidName(e) {
        const t = this.getOriginalVariable();
        t === this ? super.forbidName(e) : t.forbidName(e)
    }
    getAssignedVariableName() {
        return this.originalId && this.originalId.name || null
    }
    getBaseVariableName() {
        const e = this.getOriginalVariable();
        return e === this ? super.getBaseVariableName() : e.getBaseVariableName()
    }
    getDirectOriginalVariable() {
        return !this.originalId || !this.hasId && (this.originalId.isPossibleTDZ() || this.originalId.variable.isReassigned || this.originalId.variable instanceof Gr || "syntheticNamespace"in this.originalId.variable) ? null : this.originalId.variable
    }
    getName(e) {
        const t = this.getOriginalVariable();
        return t === this ? super.getName(e) : t.getName(e)
    }
    getOriginalVariable() {
        if (this.originalVariable)
            return this.originalVariable;
        let e, t = this;
        const s = new Set;
        do {
            s.add(t),
            e = t,
            t = e.getDirectOriginalVariable()
        } while (t instanceof Wr && !s.has(t));
        return this.originalVariable = t || e
    }
}
class qr extends Si {
    constructor(e, t) {
        super(e),
        this.context = t,
        this.variables.set("this", new ui("this",null,Kt,t))
    }
    addExportDefaultDeclaration(e, t, s) {
        const i = new Wr(e,t,s);
        return this.variables.set("default", i),
        i
    }
    addNamespaceMemberAccess() {}
    deconflict(e, t, s) {
        for (const i of this.children)
            i.deconflict(e, t, s)
    }
    findLexicalBoundary() {
        return this
    }
    findVariable(e) {
        const t = this.variables.get(e) || this.accessedOutsideVariables.get(e);
        if (t)
            return t;
        const s = this.context.traceVariable(e) || this.parent.findVariable(e);
        return s instanceof Ui && this.accessedOutsideVariables.set(e, s),
        s
    }
}
const Hr = {
    "!": e=>!e,
    "+": e=>+e,
    "-": e=>-e,
    delete: ()=>se,
    typeof: e=>typeof e,
    void: ()=>{}
    ,
    "~": e=>~e
};
class Kr extends Vs {
    deoptimizePath() {
        for (const e of this.declarations)
            e.deoptimizePath(K)
    }
    hasEffectsOnInteractionAtPath() {
        return !1
    }
    include(e, t, {asSingleStatement: s}=pe) {
        this.included = !0;
        for (const i of this.declarations) {
            (t || i.shouldBeIncluded(e)) && i.include(e, t);
            const {id: n, init: r} = i;
            s && n.include(e, t),
            r && n.included && !r.included && (n instanceof pn || n instanceof ci) && r.include(e, t)
        }
    }
    initialise() {
        for (const e of this.declarations)
            e.declareDeclarator(this.kind)
    }
    render(e, t, s=pe) {
        if (((e, t) => {
            for (const s of e) {
                if (!s.id.included)
                    return !1;
                if (s.id.type === Es) {
                    if (t.has(s.id.variable))
                        return !1
                } else {
                    const e = [];
                    if (s.id.addExportedVariables(e, t),
                    e.length > 0)
                        return !1
                }
            }
            return !0
        })(this.declarations, t.exportNamesByVariable)) {
            for (const s of this.declarations)
                s.render(e, t);
            s.isNoStatement || 59 === e.original.charCodeAt(this.end - 1) || e.appendLeft(this.end, ";")
        } else
            this.renderReplacedDeclarations(e, t);
    }
    applyDeoptimizations() {}
    renderDeclarationEnd(e, t, s, i, n, r, o) {
        59 === e.original.charCodeAt(this.end - 1) && e.remove(this.end - 1, this.end),
        t += ";",
        null === s ? e.appendLeft(n, t) : (10 !== e.original.charCodeAt(i - 1) || 10 !== e.original.charCodeAt(this.end) && 13 !== e.original.charCodeAt(this.end) || (i--,
        13 === e.original.charCodeAt(i) && i--),
        i === s + 1 ? e.overwrite(s, n, t) : (e.overwrite(s, s + 1, t),
        e.remove(i, n))),
        r.length > 0 && e.appendLeft(n, ` ${cn(r, o)};`)
    }
    renderReplacedDeclarations(e, t) {
        const s = tn(this.declarations, e, this.start + this.kind.length, this.end - (59 === e.original.charCodeAt(this.end - 1) ? 1 : 0));
        let i, n;
        n = Ji(e.original, this.start + this.kind.length);
        let r = n - 1;
        e.remove(this.start, r);
        let o, a, l = !1, h = !1, c = "";
        const u = []
          , d = ((e, {format, exportNamesByVariable}, s) => {
            let i = null;
            if ("system" === format) {
                for (const {node: n} of e)
                    n.id instanceof Wi && n.init && 0 === s.length && 1 === exportNamesByVariable.get(n.id.variable)?.length ? (i = n.id.variable,
                    s.push(i)) : n.id.addExportedVariables(s, exportNamesByVariable);
                s.length > 1 ? i = null : i && (s.length = 0)
            }
            return i
        })(s, t, u);
        for (const {node: u, start: p, separator: f, contentEnd: m, end: g} of s)
            if (u.included) {
                if (u.render(e, t),
                o = "",
                a = "",
                !u.id.included || u.id instanceof Wi && Sr(u.id.variable, t.exportNamesByVariable))
                    h && (c += ";"),
                    l = !1;
                else {
                    if (d && d === u.id.variable) {
                        const s = Xi(e.original, "=", u.id.end);
                        un(d, Ji(e.original, s + 1), null === f ? m : f, e, t)
                    }
                    l ? c += "," : (h && (c += ";"),
                    o += `${this.kind} `,
                    l = !0)
                }
                n === r + 1 ? e.overwrite(r, n, c + o) : (e.overwrite(r, r + 1, c),
                e.appendLeft(n, o)),
                i = m,
                n = g,
                h = !0,
                r = f,
                c = ""
            } else
                e.remove(p, g);
        this.renderDeclarationEnd(e, c, r, i, n, u, t)
    }
}
const Yr = {
    ArrayExpression: hi,
    ArrayPattern: ci,
    ArrowFunctionExpression: hn,
    AssignmentExpression: class extends Vs {
        hasEffects(e) {
            const {deoptimized: t, left: s, operator: i, right: n} = this;
            return t || this.applyDeoptimizations(),
            n.hasEffects(e) || s.hasEffectsAsAssignmentTarget(e, "=" !== i)
        }
        hasEffectsOnInteractionAtPath(e, t, s) {
            return this.right.hasEffectsOnInteractionAtPath(e, t, s)
        }
        include(e, t) {
            const {deoptimized: s, left: i, right: n, operator: r} = this;
            s || this.applyDeoptimizations(),
            this.included = !0,
            (t || "=" !== r || i.included || i.hasEffectsAsAssignmentTarget(qt(), !1)) && i.includeAsAssignmentTarget(e, t, "=" !== r),
            n.include(e, t)
        }
        initialise() {
            this.left.setAssignedValue(this.right)
        }
        render(e, t, {preventASI: s, renderedParentType: i, renderedSurroundingElement: n}=pe) {
            const {left: r, right: o, start: a, end: l, parent: h} = this;
            if (r.included)
                r.render(e, t),
                o.render(e, t);
            else {
                const l = Ji(e.original, Xi(e.original, "=", r.end) + 1);
                e.remove(a, l),
                s && sn(e, l, o.start),
                o.render(e, t, {
                    renderedParentType: i || h.type,
                    renderedSurroundingElement: n || h.type
                })
            }
            if ("system" === t.format)
                if (r instanceof Wi) {
                    const s = r.variable
                      , i = t.exportNamesByVariable.get(s);
                    if (i)
                        return void (1 === i.length ? un(s, a, l, e, t) : dn(s, a, l, h.type !== bs, e, t))
                } else {
                    const s = [];
                    if (r.addExportedVariables(s, t.exportNamesByVariable),
                    s.length > 0)
                        return void ((e, t, s, i, n, r) => {
                            const {_: o, getDirectReturnIifeLeft: a} = r.snippets;
                            n.prependRight(t, a(["v"], `${cn(e, r)},${o}v`, {
                                needsArrowReturnParens: !0,
                                needsWrappedFunction: i
                            })),
                            n.appendLeft(s, ")")
                        })(s, a, l, n === bs, e, t);
                }
            r.included && r instanceof pn && (n === bs || n === ps) && (e.appendRight(a, "("),
            e.prependLeft(l, ")"))
        }
        applyDeoptimizations() {
            this.deoptimized = !0,
            this.left.deoptimizePath(K),
            this.right.deoptimizePath(Y),
            this.context.requestTreeshakingPass()
        }
    }
    ,
    AssignmentPattern: class extends Vs {
        addExportedVariables(e, t) {
            this.left.addExportedVariables(e, t)
        }
        declare(e, t) {
            return this.left.declare(e, t)
        }
        deoptimizePath(e) {
            0 === e.length && this.left.deoptimizePath(e)
        }
        hasEffectsOnInteractionAtPath({length}, t, s) {
            return length > 0 || this.left.hasEffectsOnInteractionAtPath(K, t, s);
        }
        markDeclarationReached() {
            this.left.markDeclarationReached()
        }
        render(e, t, {isShorthandProperty: s}=pe) {
            this.left.render(e, t, {
                isShorthandProperty: s
            }),
            this.right.render(e, t)
        }
        applyDeoptimizations() {
            this.deoptimized = !0,
            this.left.deoptimizePath(K),
            this.right.deoptimizePath(Y),
            this.context.requestTreeshakingPass()
        }
    }
    ,
    AwaitExpression: xn,
    BinaryExpression: class extends Vs {
        deoptimizeCache() {}
        getLiteralValueAtPath({length}, t, s) {
            if (length > 0)
                return se;
            const i = this.left.getLiteralValueAtPath(K, t, s);
            if ("symbol" == typeof i)
                return se;
            const n = this.right.getLiteralValueAtPath(K, t, s);
            if ("symbol" == typeof n)
                return se;
            const r = bn[this.operator];
            return r ? r(i, n) : se
        }
        hasEffects(e) {
            return "+" === this.operator && this.parent instanceof rn && "" === this.left.getLiteralValueAtPath(K, ee, this) || super.hasEffects(e)
        }
        hasEffectsOnInteractionAtPath({length}, {type: t}) {
            return 0 !== t || length > 1;
        }
        render(e, t, {renderedSurroundingElement: s}=pe) {
            this.left.render(e, t, {
                renderedSurroundingElement: s
            }),
            this.right.render(e, t)
        }
    }
    ,
    BlockStatement: on,
    BreakStatement: class extends Vs {
        hasEffects(e) {
            if (this.label) {
                if (!e.ignore.labels.has(this.label.name))
                    return !0;
                e.includedLabels.add(this.label.name)
            } else {
                if (!e.ignore.breaks)
                    return !0;
                e.hasBreak = !0
            }
            return e.brokenFlow = !0,
            !1
        }
        include(e) {
            this.included = !0,
            this.label ? (this.label.include(),
            e.includedLabels.add(this.label.name)) : e.hasBreak = !0,
            e.brokenFlow = !0
        }
    }
    ,
    CallExpression: Pn,
    CatchClause: class extends Vs {
        createScope(e) {
            this.scope = new Cn(e,this.context)
        }
        parseNode(e) {
            const {param: t} = e;
            t && (this.param = new (this.context.getNodeConstructor(t.type))(t,this,this.scope),
            this.param.declare("parameter", re)),
            super.parseNode(e)
        }
    }
    ,
    ChainExpression: class extends Vs {
        deoptimizeCache() {}
        getLiteralValueAtPath(e, t, s) {
            if (!this.expression.isSkippedAsOptional(s))
                return this.expression.getLiteralValueAtPath(e, t, s)
        }
        hasEffects(e) {
            return !this.expression.isSkippedAsOptional(this) && this.expression.hasEffects(e)
        }
    }
    ,
    ClassBody: class extends Vs {
        createScope(e) {
            this.scope = new $n(e,this.parent,this.context)
        }
        include(e, t) {
            this.included = !0,
            this.context.includeVariableInModule(this.scope.thisVariable);
            for (const s of this.body)
                s.include(e, t)
        }
        parseNode(e) {
            const t = this.body = [];
            for (const s of e.body)
                t.push(new (this.context.getNodeConstructor(s.type))(s,this,s.static ? this.scope : this.scope.instanceScope));
            super.parseNode(e)
        }
        applyDeoptimizations() {}
    }
    ,
    ClassDeclaration: Tn,
    ClassExpression: On,
    ConditionalExpression: class extends Vs {
        constructor(...args) {
            super(...args),
            this.expressionsToBeDeoptimized = [],
            this.isBranchResolutionAnalysed = !1,
            this.usedBranch = null
        }
        deoptimizeArgumentsOnInteractionAtPath(e, t, s) {
            this.consequent.deoptimizeArgumentsOnInteractionAtPath(e, t, s),
            this.alternate.deoptimizeArgumentsOnInteractionAtPath(e, t, s)
        }
        deoptimizeCache() {
            if (null !== this.usedBranch) {
                const e = this.usedBranch === this.consequent ? this.alternate : this.consequent;
                this.usedBranch = null,
                e.deoptimizePath(Y);
                const {expressionsToBeDeoptimized: t} = this;
                this.expressionsToBeDeoptimized = me;
                for (const e of t)
                    e.deoptimizeCache()
            }
        }
        deoptimizePath(e) {
            const t = this.getUsedBranch();
            t ? t.deoptimizePath(e) : (this.consequent.deoptimizePath(e),
            this.alternate.deoptimizePath(e))
        }
        getLiteralValueAtPath(e, t, s) {
            const i = this.getUsedBranch();
            return i ? (this.expressionsToBeDeoptimized.push(s),
            i.getLiteralValueAtPath(e, t, s)) : se
        }
        getReturnExpressionWhenCalledAtPath(e, t, s, i) {
            const n = this.getUsedBranch();
            return n ? (this.expressionsToBeDeoptimized.push(i),
            n.getReturnExpressionWhenCalledAtPath(e, t, s, i)) : [new Dn([this.consequent.getReturnExpressionWhenCalledAtPath(e, t, s, i)[0], this.alternate.getReturnExpressionWhenCalledAtPath(e, t, s, i)[0]]), !1]
        }
        hasEffects(e) {
            if (this.test.hasEffects(e))
                return !0;
            const t = this.getUsedBranch();
            return t ? t.hasEffects(e) : this.consequent.hasEffects(e) || this.alternate.hasEffects(e)
        }
        hasEffectsOnInteractionAtPath(e, t, s) {
            const i = this.getUsedBranch();
            return i ? i.hasEffectsOnInteractionAtPath(e, t, s) : this.consequent.hasEffectsOnInteractionAtPath(e, t, s) || this.alternate.hasEffectsOnInteractionAtPath(e, t, s)
        }
        include(e, t) {
            this.included = !0;
            const s = this.getUsedBranch();
            t || this.test.shouldBeIncluded(e) || null === s ? (this.test.include(e, t),
            this.consequent.include(e, t),
            this.alternate.include(e, t)) : s.include(e, t)
        }
        includeCallArguments(e, t) {
            const s = this.getUsedBranch();
            s ? s.includeCallArguments(e, t) : (this.consequent.includeCallArguments(e, t),
            this.alternate.includeCallArguments(e, t))
        }
        render(e, t, {isCalleeOfRenderedParent: s, preventASI: i, renderedParentType: n, renderedSurroundingElement: r}=pe) {
            const o = this.getUsedBranch();
            if (this.test.included)
                this.test.render(e, t, {
                    renderedSurroundingElement: r
                }),
                this.consequent.render(e, t),
                this.alternate.render(e, t);
            else {
                const a = Xi(e.original, ":", this.consequent.end)
                  , l = Ji(e.original, (this.consequent.included ? Xi(e.original, "?", this.test.end) : a) + 1);
                i && sn(e, l, o.start),
                e.remove(this.start, l),
                this.consequent.included && e.remove(a, this.end),
                Ki(this, e),
                o.render(e, t, {
                    isCalleeOfRenderedParent: s,
                    preventASI: !0,
                    renderedParentType: n || this.parent.type,
                    renderedSurroundingElement: r || this.parent.type
                })
            }
        }
        getUsedBranch() {
            if (this.isBranchResolutionAnalysed)
                return this.usedBranch;
            this.isBranchResolutionAnalysed = !0;
            const e = this.test.getLiteralValueAtPath(K, ee, this);
            return "symbol" == typeof e ? null : this.usedBranch = e ? this.consequent : this.alternate
        }
    }
    ,
    ContinueStatement: class extends Vs {
        hasEffects(e) {
            if (this.label) {
                if (!e.ignore.labels.has(this.label.name))
                    return !0;
                e.includedLabels.add(this.label.name)
            } else {
                if (!e.ignore.continues)
                    return !0;
                e.hasContinue = !0
            }
            return e.brokenFlow = !0,
            !1
        }
        include(e) {
            this.included = !0,
            this.label ? (this.label.include(),
            e.includedLabels.add(this.label.name)) : e.hasContinue = !0,
            e.brokenFlow = !0
        }
    }
    ,
    DoWhileStatement: class extends Vs {
        hasEffects(e) {
            return !!this.test.hasEffects(e) || Ln(e, this.body)
        }
        include(e, t) {
            this.included = !0,
            this.test.include(e, t),
            Vn(e, this.body, t)
        }
    }
    ,
    EmptyStatement: class extends Vs {
        hasEffects() {
            return !1
        }
    }
    ,
    ExportAllDeclaration: Bn,
    ExportDefaultDeclaration: Fn,
    ExportNamedDeclaration: jn,
    ExportSpecifier: class extends Vs {
        applyDeoptimizations() {}
    }
    ,
    ExpressionStatement: rn,
    ForInStatement: class extends Vs {
        createScope(e) {
            this.scope = new nn(e)
        }
        hasEffects(e) {
            const {body: t, deoptimized: s, left: i, right: n} = this;
            return s || this.applyDeoptimizations(),
            !(!i.hasEffectsAsAssignmentTarget(e, !1) && !n.hasEffects(e)) || Ln(e, t)
        }
        include(e, t) {
            const {body: s, deoptimized: i, left: n, right: r} = this;
            i || this.applyDeoptimizations(),
            this.included = !0,
            n.includeAsAssignmentTarget(e, t || !0, !1),
            r.include(e, t),
            Vn(e, s, t)
        }
        initialise() {
            this.left.setAssignedValue(re)
        }
        render(e, t) {
            this.left.render(e, t, Yi),
            this.right.render(e, t, Yi),
            110 === e.original.charCodeAt(this.right.start - 1) && e.prependLeft(this.right.start, " "),
            this.body.render(e, t)
        }
        applyDeoptimizations() {
            this.deoptimized = !0,
            this.left.deoptimizePath(K),
            this.context.requestTreeshakingPass()
        }
    }
    ,
    ForOfStatement: class extends Vs {
        createScope(e) {
            this.scope = new nn(e)
        }
        hasEffects() {
            return this.deoptimized || this.applyDeoptimizations(),
            !0
        }
        include(e, t) {
            const {body: s, deoptimized: i, left: n, right: r} = this;
            i || this.applyDeoptimizations(),
            this.included = !0,
            n.includeAsAssignmentTarget(e, t || !0, !1),
            r.include(e, t),
            Vn(e, s, t)
        }
        initialise() {
            this.left.setAssignedValue(re)
        }
        render(e, t) {
            this.left.render(e, t, Yi),
            this.right.render(e, t, Yi),
            102 === e.original.charCodeAt(this.right.start - 1) && e.prependLeft(this.right.start, " "),
            this.body.render(e, t)
        }
        applyDeoptimizations() {
            this.deoptimized = !0,
            this.left.deoptimizePath(K),
            this.right.deoptimizePath(Y),
            this.context.requestTreeshakingPass()
        }
    }
    ,
    ForStatement: class extends Vs {
        createScope(e) {
            this.scope = new nn(e)
        }
        hasEffects(e) {
            return !!(this.init?.hasEffects(e) || this.test?.hasEffects(e) || this.update?.hasEffects(e)) || Ln(e, this.body)
        }
        include(e, t) {
            this.included = !0,
            this.init?.include(e, t, {
                asSingleStatement: !0
            }),
            this.test?.include(e, t),
            this.update?.include(e, t),
            Vn(e, this.body, t)
        }
        render(e, t) {
            this.init?.render(e, t, Yi),
            this.test?.render(e, t, Yi),
            this.update?.render(e, t, Yi),
            this.body.render(e, t)
        }
    }
    ,
    FunctionDeclaration: zn,
    FunctionExpression: Un,
    Identifier: Wi,
    IfStatement: qn,
    ImportAttribute: class extends Vs {
    }
    ,
    ImportDeclaration: Hn,
    ImportDefaultSpecifier: Kn,
    ImportExpression: class extends Vs {
        constructor(...args) {
            super(...args),
            this.inlineNamespace = null,
            this.assertions = null,
            this.mechanism = null,
            this.namespaceExportName = void 0,
            this.resolution = null,
            this.resolutionString = null
        }
        bind() {
            this.source.bind()
        }
        getDeterministicImportedNames() {
            const e = this.parent;
            if (e instanceof rn)
                return me;
            if (e instanceof xn) {
                const t = e.parent;
                if (t instanceof rn)
                    return me;
                if (t instanceof Ar) {
                    const e = t.id;
                    return e instanceof pn ? Ir(e) : void 0
                }
                if (t instanceof kn) {
                    const e = t.property;
                    if (!t.computed && e instanceof Wi)
                        return [e.name]
                }
            } else if (e instanceof kn) {
                const t = e.parent
                  , s = e.property;
                if (!(t instanceof Pn && s instanceof Wi))
                    return;
                const i = s.name;
                if (t.parent instanceof rn && ["catch", "finally"].includes(i))
                    return me;
                if ("then" !== i)
                    return;
                if (0 === t.arguments.length)
                    return me;
                const n = t.arguments[0];
                if (1 !== t.arguments.length || !(n instanceof hn || n instanceof Un))
                    return;
                if (0 === n.params.length)
                    return me;
                const r = n.params[0];
                return 1 === n.params.length && r instanceof pn ? Ir(r) : void 0
            }
        }
        hasEffects() {
            return !0
        }
        include(e, t) {
            this.included || (this.included = !0,
            this.context.includeDynamicImport(this),
            this.scope.addAccessedDynamicImport(this)),
            this.source.include(e, t)
        }
        initialise() {
            this.context.addDynamicImport(this)
        }
        parseNode(e) {
            super.parseNode(e, ["source"])
        }
        render(e, t) {
            const {snippets: {_: s, getDirectReturnFunction: i, getObject: n, getPropertyAccess: r}} = t;
            if (this.inlineNamespace) {
                const [t,s] = i([], {
                    functionReturn: !0,
                    lineBreakIndent: null,
                    name: null
                });
                e.overwrite(this.start, this.end, `Promise.resolve().then(${t}${this.inlineNamespace.getName(r)}${s})`)
            } else {
                if (this.mechanism && (e.overwrite(this.start, Xi(e.original, "(", this.start + 6) + 1, this.mechanism.left),
                e.overwrite(this.end - 1, this.end, this.mechanism.right)),
                this.resolutionString) {
                    if (e.overwrite(this.source.start, this.source.end, this.resolutionString),
                    this.namespaceExportName) {
                        const [t,s] = i(["n"], {
                            functionReturn: !0,
                            lineBreakIndent: null,
                            name: null
                        });
                        e.prependLeft(this.end, `.then(${t}n.${this.namespaceExportName}${s})`)
                    }
                } else
                    this.source.render(e, t);
                !0 !== this.assertions && (this.arguments && e.overwrite(this.source.end, this.end - 1, "", {
                    contentOnly: !0
                }),
                this.assertions && e.appendLeft(this.end - 1, `,${s}${n([["assert", this.assertions]], {
                    lineBreakIndent: null
                })}`))
            }
        }
        setExternalResolution(e, t, s, i, n, r, o, a, l) {
            const {format: h} = s;
            this.inlineNamespace = null,
            this.resolution = t,
            this.resolutionString = o,
            this.namespaceExportName = a,
            this.assertions = l;
            const c = [...(wr[h] || [])];
            let u;
            ({helper: u, mechanism: this.mechanism} = this.getDynamicImportMechanismAndHelper(t, e, s, i, n)),
            u && c.push(u),
            c.length > 0 && this.scope.addAccessedGlobals(c, r)
        }
        setInternalResolution(e) {
            this.inlineNamespace = e
        }
        applyDeoptimizations() {}
        getDynamicImportMechanismAndHelper(e, t, {compact: s, dynamicImportFunction: i, dynamicImportInCjs: n, format: r, generatedCode: {arrowFunctions: o}, interop: a}, {_: l, getDirectReturnFunction: h, getDirectReturnIifeLeft: c}, u) {
            const d = u.hookFirstSync("renderDynamicImport", [{
                customResolution: "string" == typeof this.resolution ? this.resolution : null,
                format: r,
                moduleId: this.context.module.id,
                targetModuleId: this.resolution && "string" != typeof this.resolution ? this.resolution.id : null
            }]);
            if (d)
                return {
                    helper: null,
                    mechanism: d
                };
            const p = !this.resolution || "string" == typeof this.resolution;
            switch (r) {
            case "cjs":
                {
                    if (n && (!e || "string" == typeof e || e instanceof jt))
                        return {
                            helper: null,
                            mechanism: null
                        };
                    const s = kr(e, t, a);
                    let i = "require("
                      , r = ")";
                    s && (i = `/*#__PURE__*/${s}(${i}`,
                    r += ")");
                    const [l,u] = h([], {
                        functionReturn: !0,
                        lineBreakIndent: null,
                        name: null
                    });
                    return i = `Promise.resolve().then(${l}${i}`,
                    r += `${u})`,
                    !o && p && (i = c(["t"], `${i}t ${r}`, {
                        needsArrowReturnParens: !1,
                        needsWrappedFunction: !0
                    }),
                    r = ")"),
                    {
                        helper: s,
                        mechanism: {
                            left: i,
                            right: r
                        }
                    }
                }
            case "amd":
                {
                    const i = s ? "c" : "resolve"
                      , n = s ? "e" : "reject"
                      , r = kr(e, t, a)
                      , [u,d] = h(["m"], {
                        functionReturn: !1,
                        lineBreakIndent: null,
                        name: null
                    })
                      , f = r ? `${u}${i}(/*#__PURE__*/${r}(m))${d}` : i
                      , [m,g] = h([i, n], {
                        functionReturn: !1,
                        lineBreakIndent: null,
                        name: null
                    });
                    let y = `new Promise(${m}require([`
                      , x = `],${l}${f},${l}${n})${g})`;
                    return !o && p && (y = c(["t"], `${y}t ${x}`, {
                        needsArrowReturnParens: !1,
                        needsWrappedFunction: !0
                    }),
                    x = ")"),
                    {
                        helper: r,
                        mechanism: {
                            left: y,
                            right: x
                        }
                    }
                }
            case "system":
                return {
                    helper: null,
                    mechanism: {
                        left: "module.import(",
                        right: ")"
                    }
                };
            case "es":
                if (i)
                    return {
                        helper: null,
                        mechanism: {
                            left: `${i}(`,
                            right: ")"
                        }
                    }
            }
            return {
                helper: null,
                mechanism: null
            }
        }
    }
    ,
    ImportNamespaceSpecifier: Pr,
    ImportSpecifier: class extends Vs {
        applyDeoptimizations() {}
    }
    ,
    LabeledStatement: class extends Vs {
        hasEffects(e) {
            const t = e.brokenFlow;
            return e.ignore.labels.add(this.label.name),
            !!this.body.hasEffects(e) || (e.ignore.labels.delete(this.label.name),
            e.includedLabels.has(this.label.name) && (e.includedLabels.delete(this.label.name),
            e.brokenFlow = t),
            !1)
        }
        include(e, t) {
            this.included = !0;
            const s = e.brokenFlow;
            this.body.include(e, t),
            (t || e.includedLabels.has(this.label.name)) && (this.label.include(),
            e.includedLabels.delete(this.label.name),
            e.brokenFlow = s)
        }
        render(e, t) {
            this.label.included ? this.label.render(e, t) : e.remove(this.start, Ji(e.original, Xi(e.original, ":", this.label.end) + 1)),
            this.body.render(e, t)
        }
    }
    ,
    Literal: vn,
    LogicalExpression: class extends Vs {
        constructor(...args) {
            super(...args),
            this.expressionsToBeDeoptimized = [],
            this.isBranchResolutionAnalysed = !1,
            this.usedBranch = null
        }
        deoptimizeArgumentsOnInteractionAtPath(e, t, s) {
            this.left.deoptimizeArgumentsOnInteractionAtPath(e, t, s),
            this.right.deoptimizeArgumentsOnInteractionAtPath(e, t, s)
        }
        deoptimizeCache() {
            if (this.usedBranch) {
                const e = this.usedBranch === this.left ? this.right : this.left;
                this.usedBranch = null,
                e.deoptimizePath(Y);
                const {context: t, expressionsToBeDeoptimized: s} = this;
                this.expressionsToBeDeoptimized = me;
                for (const e of s)
                    e.deoptimizeCache();
                t.requestTreeshakingPass()
            }
        }
        deoptimizePath(e) {
            const t = this.getUsedBranch();
            t ? t.deoptimizePath(e) : (this.left.deoptimizePath(e),
            this.right.deoptimizePath(e))
        }
        getLiteralValueAtPath(e, t, s) {
            const i = this.getUsedBranch();
            return i ? (this.expressionsToBeDeoptimized.push(s),
            i.getLiteralValueAtPath(e, t, s)) : se
        }
        getReturnExpressionWhenCalledAtPath(e, t, s, i) {
            const n = this.getUsedBranch();
            return n ? (this.expressionsToBeDeoptimized.push(i),
            n.getReturnExpressionWhenCalledAtPath(e, t, s, i)) : [new Dn([this.left.getReturnExpressionWhenCalledAtPath(e, t, s, i)[0], this.right.getReturnExpressionWhenCalledAtPath(e, t, s, i)[0]]), !1]
        }
        hasEffects(e) {
            return !!this.left.hasEffects(e) || this.getUsedBranch() !== this.left && this.right.hasEffects(e)
        }
        hasEffectsOnInteractionAtPath(e, t, s) {
            const i = this.getUsedBranch();
            return i ? i.hasEffectsOnInteractionAtPath(e, t, s) : this.left.hasEffectsOnInteractionAtPath(e, t, s) || this.right.hasEffectsOnInteractionAtPath(e, t, s)
        }
        include(e, t) {
            this.included = !0;
            const s = this.getUsedBranch();
            t || s === this.right && this.left.shouldBeIncluded(e) || !s ? (this.left.include(e, t),
            this.right.include(e, t)) : s.include(e, t)
        }
        render(e, t, {isCalleeOfRenderedParent: s, preventASI: i, renderedParentType: n, renderedSurroundingElement: r}=pe) {
            if (this.left.included && this.right.included)
                this.left.render(e, t, {
                    preventASI: i,
                    renderedSurroundingElement: r
                }),
                this.right.render(e, t);
            else {
                const o = Xi(e.original, this.operator, this.left.end);
                if (this.right.included) {
                    const t = Ji(e.original, o + 2);
                    e.remove(this.start, t),
                    i && sn(e, t, this.right.start)
                } else
                    e.remove(o, this.end);
                Ki(this, e),
                this.getUsedBranch().render(e, t, {
                    isCalleeOfRenderedParent: s,
                    preventASI: i,
                    renderedParentType: n || this.parent.type,
                    renderedSurroundingElement: r || this.parent.type
                })
            }
        }
        getUsedBranch() {
            if (!this.isBranchResolutionAnalysed) {
                this.isBranchResolutionAnalysed = !0;
                const e = this.left.getLiteralValueAtPath(K, ee, this);
                if ("symbol" == typeof e)
                    return null;
                this.usedBranch = "||" === this.operator && e || "&&" === this.operator && !e || "??" === this.operator && null != e ? this.left : this.right
            }
            return this.usedBranch
        }
    }
    ,
    MemberExpression: kn,
    MetaProperty: class extends Vs {
        constructor(...args) {
            super(...args),
            this.metaProperty = null,
            this.preliminaryChunkId = null,
            this.referenceId = null
        }
        getReferencedFileName(e) {
            const {meta: {name: t}, metaProperty: s} = this;
            return t === $r && s?.startsWith(Cr) ? e.getFileName(s.slice(16)) : null
        }
        hasEffects() {
            return !1
        }
        hasEffectsOnInteractionAtPath({length}, {type: t}) {
            return length > 1 || 0 !== t;
        }
        include() {
            if (!this.included && (this.included = !0,
            this.meta.name === $r)) {
                this.context.addImportMeta(this);
                const e = this.parent
                  , t = this.metaProperty = e instanceof kn && "string" == typeof e.propertyKey ? e.propertyKey : null;
                t?.startsWith(Cr) && (this.referenceId = t.slice(16))
            }
        }
        render(e, {format: t, pluginDriver: s, snippets: i}) {
            const {context: {module: {id: n}}, meta: {name: r}, metaProperty: o, parent: a, preliminaryChunkId: l, referenceId: h, start: c, end: u} = this;
            if (r !== $r)
                return;
            const d = l;
            if (h) {
                const i = s.getFileName(h)
                  , r = w($(P(d), i))
                  , o = s.hookFirstSync("resolveFileUrl", [{
                    chunkId: d,
                    fileName: i,
                    format: t,
                    moduleId: n,
                    referenceId: h,
                    relativePath: r
                }]) || Vr[t](r);
                return void e.overwrite(a.start, a.end, o, {
                    contentOnly: !0
                })
            }
            const p = s.hookFirstSync("resolveImportMeta", [o, {
                chunkId: d,
                format: t,
                moduleId: n
            }]) || Br[t]?.(o, {
                chunkId: d,
                snippets: i
            });
            "string" == typeof p && (a instanceof kn ? e.overwrite(a.start, a.end, p, {
                contentOnly: !0
            }) : e.overwrite(c, u, p, {
                contentOnly: !0
            }))
        }
        setResolution(e, t, s) {
            this.preliminaryChunkId = s;
            const i = (this.metaProperty?.startsWith(Cr) ? _r : Nr)[e];
            i.length > 0 && this.scope.addAccessedGlobals(i, t)
        }
    }
    ,
    MethodDefinition: _n,
    NewExpression: class extends Vs {
        hasEffects(e) {
            try {
                for (const t of this.arguments)
                    if (t.hasEffects(e))
                        return !0;
                return (!this.context.options.treeshake.annotations || !this.annotations) && (this.callee.hasEffects(e) || this.callee.hasEffectsOnInteractionAtPath(K, this.interaction, e))
            } finally {
                this.deoptimized || this.applyDeoptimizations()
            }
        }
        hasEffectsOnInteractionAtPath({length}, {type: t}) {
            return length > 0 || 0 !== t;
        }
        include(e, t) {
            this.deoptimized || this.applyDeoptimizations(),
            t ? super.include(e, t) : (this.included = !0,
            this.callee.include(e, !1)),
            this.callee.includeCallArguments(e, this.arguments)
        }
        initialise() {
            this.interaction = {
                args: [null, ...this.arguments],
                type: 2,
                withNew: !0
            }
        }
        render(e, t) {
            this.callee.render(e, t),
            En(e, t, this)
        }
        applyDeoptimizations() {
            this.deoptimized = !0,
            this.callee.deoptimizeArgumentsOnInteractionAtPath(this.interaction, K, ee),
            this.context.requestTreeshakingPass()
        }
    }
    ,
    ObjectExpression: class extends Vs {
        constructor(...args) {
            super(...args),
            this.objectEntity = null
        }
        deoptimizeArgumentsOnInteractionAtPath(e, t, s) {
            this.getObjectEntity().deoptimizeArgumentsOnInteractionAtPath(e, t, s)
        }
        deoptimizeCache() {
            this.getObjectEntity().deoptimizeAllProperties()
        }
        deoptimizePath(e) {
            this.getObjectEntity().deoptimizePath(e)
        }
        getLiteralValueAtPath(e, t, s) {
            return this.getObjectEntity().getLiteralValueAtPath(e, t, s)
        }
        getReturnExpressionWhenCalledAtPath(e, t, s, i) {
            return this.getObjectEntity().getReturnExpressionWhenCalledAtPath(e, t, s, i)
        }
        hasEffectsOnInteractionAtPath(e, t, s) {
            return this.getObjectEntity().hasEffectsOnInteractionAtPath(e, t, s)
        }
        render(e, t, {renderedSurroundingElement: s}=pe) {
            super.render(e, t),
            s !== bs && s !== ps || (e.appendRight(this.start, "("),
            e.prependLeft(this.end, ")"))
        }
        applyDeoptimizations() {}
        getObjectEntity() {
            if (null !== this.objectEntity)
                return this.objectEntity;
            let e = Ys;
            const t = [];
            for (const s of this.properties) {
                if (s instanceof Bs) {
                    t.push({
                        key: G,
                        kind: "init",
                        property: s
                    });
                    continue
                }
                let i;
                if (s.computed) {
                    const e = s.key.getLiteralValueAtPath(K, ee, this);
                    if ("symbol" == typeof e) {
                        t.push({
                            key: G,
                            kind: s.kind,
                            property: s
                        });
                        continue
                    }
                    i = String(e)
                } else if (i = s.key instanceof Wi ? s.key.name : String(s.key.value),
                "__proto__" === i && "init" === s.kind) {
                    e = s.value instanceof vn && null === s.value.value ? null : s.value;
                    continue
                }
                t.push({
                    key: i,
                    kind: s.kind,
                    property: s
                })
            }
            return this.objectEntity = new qs(t,e)
        }
    }
    ,
    ObjectPattern: pn,
    PrivateIdentifier: class extends Vs {
    }
    ,
    Program: Fr,
    Property: class extends Nn {
        constructor(...args) {
            super(...args),
            this.declarationInit = null
        }
        declare(e, t) {
            return this.declarationInit = t,
            this.value.declare(e, re)
        }
        hasEffects(e) {
            this.deoptimized || this.applyDeoptimizations();
            const t = this.context.options.treeshake.propertyReadSideEffects;
            return "ObjectPattern" === this.parent.type && "always" === t || this.key.hasEffects(e) || this.value.hasEffects(e)
        }
        markDeclarationReached() {
            this.value.markDeclarationReached()
        }
        render(e, t) {
            this.shorthand || this.key.render(e, t),
            this.value.render(e, t, {
                isShorthandProperty: this.shorthand
            })
        }
        applyDeoptimizations() {
            this.deoptimized = !0,
            null !== this.declarationInit && (this.declarationInit.deoptimizePath([G, G]),
            this.context.requestTreeshakingPass())
        }
    }
    ,
    PropertyDefinition: class extends Vs {
        deoptimizeArgumentsOnInteractionAtPath(e, t, s) {
            this.value?.deoptimizeArgumentsOnInteractionAtPath(e, t, s)
        }
        deoptimizePath(e) {
            this.value?.deoptimizePath(e)
        }
        getLiteralValueAtPath(e, t, s) {
            return this.value ? this.value.getLiteralValueAtPath(e, t, s) : se
        }
        getReturnExpressionWhenCalledAtPath(e, t, s, i) {
            return this.value ? this.value.getReturnExpressionWhenCalledAtPath(e, t, s, i) : oe
        }
        hasEffects(e) {
            return this.key.hasEffects(e) || this.static && !!this.value?.hasEffects(e)
        }
        hasEffectsOnInteractionAtPath(e, t, s) {
            return !this.value || this.value.hasEffectsOnInteractionAtPath(e, t, s)
        }
        applyDeoptimizations() {}
    }
    ,
    RestElement: an,
    ReturnStatement: class extends Vs {
        hasEffects(e) {
            return !(e.ignore.returnYield && !this.argument?.hasEffects(e)) || (e.brokenFlow = !0,
            !1)
        }
        include(e, t) {
            this.included = !0,
            this.argument?.include(e, t),
            e.brokenFlow = !0
        }
        initialise() {
            this.scope.addReturnExpression(this.argument || re)
        }
        render(e, t) {
            this.argument && (this.argument.render(e, t, {
                preventASI: !0
            }),
            this.argument.start === this.start + 6 && e.prependLeft(this.start + 6, " "))
        }
    }
    ,
    SequenceExpression: class extends Vs {
        deoptimizeArgumentsOnInteractionAtPath(e, t, s) {
            this.expressions[this.expressions.length - 1].deoptimizeArgumentsOnInteractionAtPath(e, t, s)
        }
        deoptimizePath(e) {
            this.expressions[this.expressions.length - 1].deoptimizePath(e)
        }
        getLiteralValueAtPath(e, t, s) {
            return this.expressions[this.expressions.length - 1].getLiteralValueAtPath(e, t, s)
        }
        hasEffects(e) {
            for (const t of this.expressions)
                if (t.hasEffects(e))
                    return !0;
            return !1
        }
        hasEffectsOnInteractionAtPath(e, t, s) {
            return this.expressions[this.expressions.length - 1].hasEffectsOnInteractionAtPath(e, t, s)
        }
        include(e, t) {
            this.included = !0;
            const s = this.expressions[this.expressions.length - 1];
            for (const i of this.expressions)
                (t || i === s && !(this.parent instanceof rn) || i.shouldBeIncluded(e)) && i.include(e, t)
        }
        render(e, t, {renderedParentType: s, isCalleeOfRenderedParent: i, preventASI: n}=pe) {
            let r = 0
              , o = null;
            const a = this.expressions[this.expressions.length - 1];
            for (const {node: l, separator: h, start: c, end: u} of tn(this.expressions, e, this.start, this.end))
                if (l.included)
                    if (r++,
                    o = h,
                    1 === r && n && sn(e, c, l.start),
                    1 === r) {
                        const n = s || this.parent.type;
                        l.render(e, t, {
                            isCalleeOfRenderedParent: i && l === a,
                            renderedParentType: n,
                            renderedSurroundingElement: n
                        })
                    } else
                        l.render(e, t);
                else
                    Hi(l, e, c, u);
            o && e.remove(o, this.end)
        }
    }
    ,
    SpreadElement: Bs,
    StaticBlock: class extends Vs {
        createScope(e) {
            this.scope = new nn(e)
        }
        hasEffects(e) {
            for (const t of this.body)
                if (t.hasEffects(e))
                    return !0;
            return !1
        }
        include(e, t) {
            this.included = !0;
            for (const s of this.body)
                (t || s.shouldBeIncluded(e)) && s.include(e, t)
        }
        render(e, t) {
            if (this.body.length > 0) {
                const s = Xi(e.original.slice(this.start, this.end), "{") + 1;
                en(this.body, e, this.start + s, this.end - 1, t)
            } else
                super.render(e, t)
        }
    }
    ,
    Super: class extends Vs {
        bind() {
            this.variable = this.scope.findVariable("this")
        }
        deoptimizeArgumentsOnInteractionAtPath(e, t, s) {
            this.variable.deoptimizeArgumentsOnInteractionAtPath(e, t, s)
        }
        deoptimizePath(e) {
            this.variable.deoptimizePath(e)
        }
        include() {
            this.included || (this.included = !0,
            this.context.includeVariableInModule(this.variable))
        }
    }
    ,
    SwitchCase: jr,
    SwitchStatement: class extends Vs {
        createScope(e) {
            this.parentScope = e,
            this.scope = new nn(e)
        }
        hasEffects(e) {
            if (this.discriminant.hasEffects(e))
                return !0;
            const {brokenFlow: t, hasBreak: s, ignore: i} = e
              , {breaks: n} = i;
            i.breaks = !0,
            e.hasBreak = !1;
            let r = !0;
            for (const s of this.cases) {
                if (s.hasEffects(e))
                    return !0;
                r && (r = e.brokenFlow && !e.hasBreak),
                e.hasBreak = !1,
                e.brokenFlow = t
            }
            return null !== this.defaultCase && (e.brokenFlow = r),
            i.breaks = n,
            e.hasBreak = s,
            !1
        }
        include(e, t) {
            this.included = !0,
            this.discriminant.include(e, t);
            const {brokenFlow: s, hasBreak: i} = e;
            e.hasBreak = !1;
            let n = !0
              , r = t || null !== this.defaultCase && this.defaultCase < this.cases.length - 1;
            for (let i = this.cases.length - 1; i >= 0; i--) {
                const o = this.cases[i];
                if (o.included && (r = !0),
                !r) {
                    const e = qt();
                    e.ignore.breaks = !0,
                    r = o.hasEffects(e)
                }
                r ? (o.include(e, t),
                n && (n = e.brokenFlow && !e.hasBreak),
                e.hasBreak = !1,
                e.brokenFlow = s) : n = s
            }
            r && null !== this.defaultCase && (e.brokenFlow = n),
            e.hasBreak = i
        }
        initialise() {
            for (let e = 0; e < this.cases.length; e++)
                if (null === this.cases[e].test)
                    return void (this.defaultCase = e);
            this.defaultCase = null
        }
        parseNode(e) {
            this.discriminant = new (this.context.getNodeConstructor(e.discriminant.type))(e.discriminant,this,this.parentScope),
            super.parseNode(e)
        }
        render(e, t) {
            this.discriminant.render(e, t),
            this.cases.length > 0 && en(this.cases, e, this.cases[0].start, this.end - 1, t)
        }
    }
    ,
    TaggedTemplateExpression: class extends In {
        bind() {
            if (super.bind(),
            this.tag.type === Es) {
                const e = this.tag.name;
                this.scope.findVariable(e).isNamespace && this.context.warn(vt(e), this.start)
            }
        }
        hasEffects(e) {
            try {
                for (const t of this.quasi.expressions)
                    if (t.hasEffects(e))
                        return !0;
                return this.tag.hasEffects(e) || this.tag.hasEffectsOnInteractionAtPath(K, this.interaction, e)
            } finally {
                this.deoptimized || this.applyDeoptimizations()
            }
        }
        include(e, t) {
            this.deoptimized || this.applyDeoptimizations(),
            t ? super.include(e, t) : (this.included = !0,
            this.tag.include(e, t),
            this.quasi.include(e, t)),
            this.tag.includeCallArguments(e, this.args);
            const [s] = this.getReturnExpression();
            s.included || s.include(e, !1)
        }
        initialise() {
            this.args = [re, ...this.quasi.expressions],
            this.interaction = {
                args: [this.tag instanceof kn && !this.tag.variable ? this.tag.object : null, ...this.args],
                type: 2,
                withNew: !1
            }
        }
        render(e, t) {
            this.tag.render(e, t, {
                isCalleeOfRenderedParent: !0
            }),
            this.quasi.render(e, t)
        }
        applyDeoptimizations() {
            this.deoptimized = !0,
            this.tag.deoptimizeArgumentsOnInteractionAtPath(this.interaction, K, ee),
            this.context.requestTreeshakingPass()
        }
        getReturnExpression(e=ee) {
            return null === this.returnExpression ? (this.returnExpression = oe,
            this.returnExpression = this.tag.getReturnExpressionWhenCalledAtPath(K, this.interaction, e, this)) : this.returnExpression
        }
    }
    ,
    TemplateElement: class extends Vs {
        bind() {}
        hasEffects() {
            return !1
        }
        include() {
            this.included = !0
        }
        parseNode(e) {
            this.value = e.value,
            super.parseNode(e)
        }
        render() {}
    }
    ,
    TemplateLiteral: Ur,
    ThisExpression: class extends Vs {
        bind() {
            this.variable = this.scope.findVariable("this")
        }
        deoptimizeArgumentsOnInteractionAtPath(e, t, s) {
            this.variable.deoptimizeArgumentsOnInteractionAtPath(e, t, s)
        }
        deoptimizePath(e) {
            this.variable.deoptimizePath(e)
        }
        hasEffectsOnInteractionAtPath(e, t, s) {
            return 0 === e.length ? 0 !== t.type : this.variable.hasEffectsOnInteractionAtPath(e, t, s)
        }
        include() {
            this.included || (this.included = !0,
            this.context.includeVariableInModule(this.variable))
        }
        initialise() {
            this.alias = this.scope.findLexicalBoundary()instanceof qr ? this.context.moduleContext : null,
            "undefined" === this.alias && this.context.warn({
                code: "THIS_IS_UNDEFINED",
                message: "The 'this' keyword is equivalent to 'undefined' at the top level of an ES module, and has been rewritten",
                url: ke("troubleshooting/#error-this-is-undefined")
            }, this.start)
        }
        render(e) {
            null !== this.alias && e.overwrite(this.start, this.end, this.alias, {
                contentOnly: !1,
                storeName: !0
            })
        }
    }
    ,
    ThrowStatement: class extends Vs {
        hasEffects() {
            return !0
        }
        include(e, t) {
            this.included = !0,
            this.argument.include(e, t),
            e.brokenFlow = !0
        }
        render(e, t) {
            this.argument.render(e, t, {
                preventASI: !0
            }),
            this.argument.start === this.start + 5 && e.prependLeft(this.start + 5, " ")
        }
    }
    ,
    TryStatement: class extends Vs {
        constructor(...args) {
            super(...args),
            this.directlyIncluded = !1,
            this.includedLabelsAfterBlock = null
        }
        hasEffects(e) {
            return (this.context.options.treeshake.tryCatchDeoptimization ? this.block.body.length > 0 : this.block.hasEffects(e)) || !!this.finalizer?.hasEffects(e)
        }
        include(e, t) {
            const s = this.context.options.treeshake?.tryCatchDeoptimization
              , {brokenFlow: i, includedLabels: n} = e;
            if (this.directlyIncluded && s) {
                if (this.includedLabelsAfterBlock)
                    for (const e of this.includedLabelsAfterBlock)
                        n.add(e)
            } else
                this.included = !0,
                this.directlyIncluded = !0,
                this.block.include(e, s ? Ls : t),
                n.size > 0 && (this.includedLabelsAfterBlock = [...n]),
                e.brokenFlow = i;
            null !== this.handler && (this.handler.include(e, t),
            e.brokenFlow = i),
            this.finalizer?.include(e, t)
        }
    }
    ,
    UnaryExpression: class extends Vs {
        getLiteralValueAtPath({length}, t, s) {
            if (length > 0)
                return se;
            const i = this.argument.getLiteralValueAtPath(K, t, s);
            return "symbol" == typeof i ? se : Hr[this.operator](i)
        }
        hasEffects(e) {
            return this.deoptimized || this.applyDeoptimizations(),
            !("typeof" === this.operator && this.argument instanceof Wi) && (this.argument.hasEffects(e) || "delete" === this.operator && this.argument.hasEffectsOnInteractionAtPath(K, he, e))
        }
        hasEffectsOnInteractionAtPath({length}, {type: t}) {
            return 0 !== t || length > ("void" === this.operator ? 0 : 1);
        }
        applyDeoptimizations() {
            this.deoptimized = !0,
            "delete" === this.operator && (this.argument.deoptimizePath(K),
            this.context.requestTreeshakingPass())
        }
    }
    ,
    UnknownNode: class extends Vs {
        hasEffects() {
            return !0
        }
        include(e) {
            super.include(e, !0)
        }
    }
    ,
    UpdateExpression: class extends Vs {
        hasEffects(e) {
            return this.deoptimized || this.applyDeoptimizations(),
            this.argument.hasEffectsAsAssignmentTarget(e, !0)
        }
        hasEffectsOnInteractionAtPath({length}, {type: t}) {
            return length > 1 || 0 !== t;
        }
        include(e, t) {
            this.deoptimized || this.applyDeoptimizations(),
            this.included = !0,
            this.argument.includeAsAssignmentTarget(e, t, !0)
        }
        initialise() {
            this.argument.setAssignedValue(re)
        }
        render(e, t) {
            const {exportNamesByVariable: s, format: i, snippets: {_: n}} = t;
            if (this.argument.render(e, t),
            "system" === i) {
                const i = this.argument.variable
                  , r = s.get(i);
                if (r)
                    if (this.prefix)
                        1 === r.length ? un(i, this.start, this.end, e, t) : dn(i, this.start, this.end, this.parent.type !== bs, e, t);
                    else {
                        const s = this.operator[0];
                        !((e, t, s, i, n, r, o) => {
                            const {_: a} = r.snippets;
                            n.prependRight(t, `${cn([e], r, o)},${a}`),
                            i && (n.prependRight(t, "("),
                            n.appendLeft(s, ")"))
                        })(i, this.start, this.end, this.parent.type !== bs, e, t, `${n}${s}${n}1`)
                    }
            }
        }
        applyDeoptimizations() {
            if (this.deoptimized = !0,
            this.argument.deoptimizePath(K),
            this.argument instanceof Wi) {
                this.scope.findVariable(this.argument.name).isReassigned = !0
            }
            this.context.requestTreeshakingPass()
        }
    }
    ,
    VariableDeclaration: Kr,
    VariableDeclarator: Ar,
    WhileStatement: class extends Vs {
        hasEffects(e) {
            return !!this.test.hasEffects(e) || Ln(e, this.body)
        }
        include(e, t) {
            this.included = !0,
            this.test.include(e, t),
            Vn(e, this.body, t)
        }
    }
    ,
    YieldExpression: class extends Vs {
        hasEffects(e) {
            return this.deoptimized || this.applyDeoptimizations(),
            !(e.ignore.returnYield && !this.argument?.hasEffects(e))
        }
        render(e, t) {
            this.argument && (this.argument.render(e, t, {
                preventASI: !0
            }),
            this.argument.start === this.start + 5 && e.prependLeft(this.start + 5, " "))
        }
    }
}
  , Xr = "_missingExportShim";
class Qr extends ue {
    constructor(e) {
        super(Xr),
        this.module = e
    }
    include() {
        super.include(),
        this.module.needsExportShim = !0
    }
}
class Jr extends ue {
    constructor(e) {
        super(e.getModuleName()),
        this.memberVariables = null,
        this.mergedNamespaces = [],
        this.referencedEarly = !1,
        this.references = [],
        this.context = e,
        this.module = e.module
    }
    addReference(e) {
        this.references.push(e),
        this.name = e.name
    }
    deoptimizeArgumentsOnInteractionAtPath(e, t, s) {
        if (t.length > 1 || 1 === t.length && 2 === e.type) {
            const i = t[0];
            "string" == typeof i ? this.getMemberVariables()[i]?.deoptimizeArgumentsOnInteractionAtPath(e, t.slice(1), s) : ae(e)
        }
    }
    deoptimizePath(e) {
        if (e.length > 1) {
            const t = e[0];
            "string" == typeof t && this.getMemberVariables()[t]?.deoptimizePath(e.slice(1))
        }
    }
    getLiteralValueAtPath(e) {
        return e[0] === H ? "Module" : se
    }
    getMemberVariables() {
        if (this.memberVariables)
            return this.memberVariables;
        const e = Object.create(null)
          , t = [...this.context.getExports(), ...this.context.getReexports()].sort();
        for (const s of t)
            if ("*" !== s[0] && s !== this.module.info.syntheticNamedExports) {
                const t = this.context.traceExport(s);
                t && (e[s] = t)
            }
        return this.memberVariables = e
    }
    hasEffectsOnInteractionAtPath(e, t, s) {
        const {type: i} = t;
        if (0 === e.length)
            return !0;
        if (1 === e.length && 2 !== i)
            return 1 === i;
        const n = e[0];
        if ("string" != typeof n)
            return !0;
        const r = this.getMemberVariables()[n];
        return !r || r.hasEffectsOnInteractionAtPath(e.slice(1), t, s)
    }
    include() {
        this.included = !0,
        this.context.includeAllExports()
    }
    prepare(e) {
        this.mergedNamespaces.length > 0 && this.module.scope.addAccessedGlobals([tr], e)
    }
    renderBlock(e) {
        const {exportNamesByVariable: t, format: s, freeze: i, indent: n, namespaceToStringTag: r, snippets: {_: o, cnst: a, getObject: l, getPropertyAccess: h, n: c, s: u}} = e
          , d = this.getMemberVariables()
          , p = Object.entries(d).filter((([e,t])=>t.included)).map((([e,t])=>this.referencedEarly || t.isReassigned || t === this ? [null, `get ${e}${o}()${o}{${o}return ${t.getName(h)}${u}${o}}`] : [e, t.getName(h)]));
        p.unshift([null, `__proto__:${o}null`]);
        let f = l(p, {
            lineBreakIndent: {
                base: "",
                t: n
            }
        });
        if (this.mergedNamespaces.length > 0) {
            const e = this.mergedNamespaces.map((e=>e.getName(h)));
            f = `/*#__PURE__*/${tr}(${f},${o}[${e.join(`,${o}`)}])`
        } else
            r && (f = `/*#__PURE__*/Object.defineProperty(${f},${o}Symbol.toStringTag,${o}${vr(l)})`),
            i && (f = `/*#__PURE__*/Object.freeze(${f})`);
        return f = `${a} ${this.getName(h)}${o}=${o}${f};`,
        "system" === s && t.has(this) && (f += `${c}${cn([this], e)};`),
        f
    }
    renderFirst() {
        return this.referencedEarly
    }
    setMergedNamespaces(e) {
        this.mergedNamespaces = e;
        const t = this.context.getModuleExecIndex();
        for (const e of this.references)
            if (e.context.getModuleExecIndex() <= t) {
                this.referencedEarly = !0;
                break
            }
    }
}
Jr.prototype.isNamespace = !0;
class Zr extends ue {
    constructor(e, t, s) {
        super(t),
        this.baseVariable = null,
        this.context = e,
        this.module = e.module,
        this.syntheticNamespace = s
    }
    getBaseVariable() {
        if (this.baseVariable)
            return this.baseVariable;
        let e = this.syntheticNamespace;
        for (; e instanceof Wr || e instanceof Zr; ) {
            if (e instanceof Wr) {
                const t = e.getOriginalVariable();
                if (t === e)
                    break;
                e = t
            }
            e instanceof Zr && (e = e.syntheticNamespace)
        }
        return this.baseVariable = e
    }
    getBaseVariableName() {
        return this.syntheticNamespace.getBaseVariableName()
    }
    getName(e) {
        return `${this.syntheticNamespace.getName(e)}${e(this.name)}`
    }
    include() {
        this.included = !0,
        this.context.includeVariableInModule(this.syntheticNamespace)
    }
    setRenderNames(e, t) {
        super.setRenderNames(e, t)
    }
}
let eo;
function to({id}) {
    return id;
}
!(e => {
    e[e.LOAD_AND_PARSE = 0] = "LOAD_AND_PARSE",
    e[e.ANALYSE = 1] = "ANALYSE",
    e[e.GENERATE = 2] = "GENERATE"
})(eo || (eo = {}));
const so = ({key}) => {
    const t = key;
    return t && (t.name || t.value)
}
;
function io(e, t) {
    const s = Object.keys(e);
    return s.length !== Object.keys(t).length || s.some((s=>e[s] !== t[s]))
}
const no = "performance"in ("undefined" == typeof globalThis ? "undefined" == typeof window ? {} : window : globalThis) ? performance : {
          now: ()=>0
      },
      ro = {
          memoryUsage: ()=>({
              heapUsed: 0
          })
      };
let oo = new Map;
function ao(e, t) {
    switch (t) {
    case 1:
        return `# ${e}`;
    case 2:
        return `## ${e}`;
    case 3:
        return e;
    default:
        return `${"  ".repeat(t - 4)}- ${e}`
    }
}
function lo(e, t=3) {
    e = ao(e, t);
    const s = ro.memoryUsage().heapUsed
      , i = no.now()
      , n = oo.get(e);
    void 0 === n ? oo.set(e, {
        memory: 0,
        startMemory: s,
        startTime: i,
        time: 0,
        totalMemory: 0
    }) : (n.startMemory = s,
    n.startTime = i)
}
function ho(e, t=3) {
    e = ao(e, t);
    const s = oo.get(e);
    if (void 0 !== s) {
        const e = ro.memoryUsage().heapUsed;
        s.memory += e - s.startMemory,
        s.time += no.now() - s.startTime,
        s.totalMemory = Math.max(s.totalMemory, e)
    }
}
function co() {
    const e = {};
    for (const [t,{memory: s, time: i, totalMemory: n}] of oo)
        e[t] = [i, s, n];
    return e
}
let uo = Pi
  , po = Pi;
const fo = ["augmentChunkHash", "buildEnd", "buildStart", "generateBundle", "load", "moduleParsed", "options", "outputOptions", "renderChunk", "renderDynamicImport", "renderStart", "resolveDynamicImport", "resolveFileUrl", "resolveId", "resolveImportMeta", "shouldTransformCachedModule", "transform", "writeBundle"];
function mo(e, t) {
    for (const s of fo)
        if (s in e) {
            let i = `plugin ${t}`;
            e.name && (i += ` (${e.name})`),
            i += ` - ${s}`;
            const n = function(...e) {
                uo(i, 4);
                const t = r.apply(this, e);
                return po(i, 4),
                t
            };
            let r;
            "function" == typeof e[s].handler ? (r = e[s].handler,
            e[s].handler = n) : (r = e[s],
            e[s] = n)
        }
    return e
}
function go(e) {
    e.isExecuted = !0;
    const t = [e]
      , s = new Set;
    for (const e of t)
        for (const i of [...e.dependencies, ...e.implicitlyLoadedBefore])
            i instanceof jt || i.isExecuted || !i.info.moduleSideEffects && !e.implicitlyLoadedBefore.has(i) || s.has(i.id) || (i.isExecuted = !0,
            s.add(i.id),
            t.push(i))
}
const yo = {
    identifier: null,
    localName: Xr
};
function xo(e, t, s, i, n=new Map) {
    const r = n.get(t);
    if (r) {
        if (r.has(e))
            return i ? [null] : ze((o = t,
            a = e.id,
            {
                code: Ke,
                exporter: a,
                message: `"${o}" cannot be exported from "${D(a)}" as it is a reexport that references itself.`
            }));
        r.add(e)
    } else
        n.set(t, new Set([e]));
    var o, a;
    return e.getVariableForExportName(t, {
        importerForSideEffects: s,
        isExportAllSearch: i,
        searchedNamesAndModules: n
    })
}
class bo {
    constructor(e, t, s, i, n, r, o, a) {
        this.graph = e,
        this.id = t,
        this.options = s,
        this.alternativeReexportModules = new Map,
        this.chunkFileNames = new Set,
        this.chunkNames = [],
        this.cycles = new Set,
        this.dependencies = new Set,
        this.dynamicDependencies = new Set,
        this.dynamicImporters = [],
        this.dynamicImports = [],
        this.execIndex = 1 / 0,
        this.implicitlyLoadedAfter = new Set,
        this.implicitlyLoadedBefore = new Set,
        this.importDescriptions = new Map,
        this.importMetas = [],
        this.importedFromNotTreeshaken = !1,
        this.importers = [],
        this.includedDynamicImporters = [],
        this.includedImports = new Set,
        this.isExecuted = !1,
        this.isUserDefinedEntryPoint = !1,
        this.needsExportShim = !1,
        this.sideEffectDependenciesByVariable = new Map,
        this.sourcesWithAssertions = new Map,
        this.allExportNames = null,
        this.ast = null,
        this.exportAllModules = [],
        this.exportAllSources = new Set,
        this.exportNamesByVariable = null,
        this.exportShimVariable = new Qr(this),
        this.exports = new Map,
        this.namespaceReexportsByName = new Map,
        this.reexportDescriptions = new Map,
        this.relevantDependencies = null,
        this.syntheticExports = new Map,
        this.syntheticNamespace = null,
        this.transformDependencies = [],
        this.transitiveReexports = null,
        this.excludeFromSourcemap = /\0/.test(t),
        this.context = s.moduleContext(t),
        this.preserveSignature = this.options.preserveEntrySignatures;
        const l = this
          , {dynamicImports: h, dynamicImporters: c, exportAllSources: u, exports: d, implicitlyLoadedAfter: p, implicitlyLoadedBefore: f, importers: m, reexportDescriptions: g, sourcesWithAssertions: y} = this;
        this.info = {
            assertions: a,
            ast: null,
            code: null,
            get dynamicallyImportedIdResolutions() {
                return h.map((({argument: e})=>"string" == typeof e && l.resolvedIds[e])).filter(Boolean)
            },
            get dynamicallyImportedIds() {
                return h.map((({id: e})=>e)).filter((e=>null != e))
            },
            get dynamicImporters() {
                return c.sort()
            },
            get exportedBindings() {
                const e = {
                    ".": [...d.keys()]
                };
                for (const [t,{source: s}] of g)
                    (e[s] ?? (e[s] = [])).push(t);
                for (const t of u)
                    (e[t] ?? (e[t] = [])).push("*");
                return e
            },
            get exports() {
                return [...d.keys(), ...g.keys(), ...[...u].map((()=>"*"))]
            },
            get hasDefaultExport() {
                return l.ast ? l.exports.has("default") || g.has("default") : null
            },
            get hasModuleSideEffects() {
                return Dt("Accessing ModuleInfo.hasModuleSideEffects from plugins is deprecated. Please use ModuleInfo.moduleSideEffects instead.", Be, !0, s),
                this.moduleSideEffects
            },
            id: t,
            get implicitlyLoadedAfterOneOf() {
                return Array.from(p, to).sort()
            },
            get implicitlyLoadedBefore() {
                return Array.from(f, to).sort()
            },
            get importedIdResolutions() {
                return Array.from(y.keys(), (e=>l.resolvedIds[e])).filter(Boolean)
            },
            get importedIds() {
                return Array.from(y.keys(), (e=>l.resolvedIds[e]?.id)).filter(Boolean)
            },
            get importers() {
                return m.sort()
            },
            isEntry: i,
            isExternal: !1,
            get isIncluded() {
                return e.phase !== eo.GENERATE ? null : l.isIncluded()
            },
            meta: {
                ...o
            },
            moduleSideEffects: n,
            syntheticNamedExports: r
        },
        Object.defineProperty(this.info, "hasModuleSideEffects", {
            enumerable: !1
        })
    }
    basename() {
        const e = I(this.id)
          , t = C(this.id);
        return Ft(t ? e.slice(0, -t.length) : e)
    }
    bindReferences() {
        this.ast.bind()
    }
    error(e, t) {
        return this.addLocationToLogProps(e, t),
        ze(e)
    }
    estimateSize() {
        let e = 0;
        for (const t of this.ast.body)
            t.included && (e += t.end - t.start);
        return e
    }
    getAllExportNames() {
        if (this.allExportNames)
            return this.allExportNames;
        this.allExportNames = new Set([...this.exports.keys(), ...this.reexportDescriptions.keys()]);
        for (const e of this.exportAllModules)
            if (e instanceof jt)
                this.allExportNames.add(`*${e.id}`);
            else
                for (const t of e.getAllExportNames())
                    "default" !== t && this.allExportNames.add(t);
        return "string" == typeof this.info.syntheticNamedExports && this.allExportNames.delete(this.info.syntheticNamedExports),
        this.allExportNames
    }
    getDependenciesToBeIncluded() {
        if (this.relevantDependencies)
            return this.relevantDependencies;
        this.relevantDependencies = new Set;
        const e = new Set
          , t = new Set
          , s = new Set(this.includedImports);
        if (this.info.isEntry || this.includedDynamicImporters.length > 0 || this.namespace.included || this.implicitlyLoadedAfter.size > 0)
            for (const e of [...this.getReexports(), ...this.getExports()]) {
                const [t] = this.getVariableForExportName(e);
                t && s.add(t)
            }
        for (let i of s) {
            const s = this.sideEffectDependenciesByVariable.get(i);
            if (s)
                for (const e of s)
                    t.add(e);
            i instanceof Zr ? i = i.getBaseVariable() : i instanceof Wr && (i = i.getOriginalVariable()),
            e.add(i.module)
        }
        if (this.options.treeshake && "no-treeshake" !== this.info.moduleSideEffects)
            this.addRelevantSideEffectDependencies(this.relevantDependencies, e, t);
        else
            for (const e of this.dependencies)
                this.relevantDependencies.add(e);
        for (const t of e)
            this.relevantDependencies.add(t);
        return this.relevantDependencies
    }
    getExportNamesByVariable() {
        if (this.exportNamesByVariable)
            return this.exportNamesByVariable;
        const e = new Map;
        for (const t of this.getAllExportNames()) {
            let[s] = this.getVariableForExportName(t);
            if (s instanceof Wr && (s = s.getOriginalVariable()),
            !s || !(s.included || s instanceof de))
                continue;
            const i = e.get(s);
            i ? i.push(t) : e.set(s, [t])
        }
        return this.exportNamesByVariable = e
    }
    getExports() {
        return [...this.exports.keys()]
    }
    getReexports() {
        if (this.transitiveReexports)
            return this.transitiveReexports;
        this.transitiveReexports = [];
        const e = new Set(this.reexportDescriptions.keys());
        for (const t of this.exportAllModules)
            if (t instanceof jt)
                e.add(`*${t.id}`);
            else
                for (const s of [...t.getReexports(), ...t.getExports()])
                    "default" !== s && e.add(s);
        return this.transitiveReexports = [...e]
    }
    getRenderedExports() {
        const e = []
          , t = [];
        for (const s of this.exports.keys()) {
            const [i] = this.getVariableForExportName(s);
            (i && i.included ? e : t).push(s)
        }
        return {
            removedExports: t,
            renderedExports: e
        }
    }
    getSyntheticNamespace() {
        return null === this.syntheticNamespace && (this.syntheticNamespace = void 0,
        [this.syntheticNamespace] = this.getVariableForExportName("string" == typeof this.info.syntheticNamedExports ? this.info.syntheticNamedExports : "default", {
            onlyExplicit: !0
        })),
        this.syntheticNamespace ? this.syntheticNamespace : ze((e = this.id,
        t = this.info.syntheticNamedExports,
        {
            code: "SYNTHETIC_NAMED_EXPORTS_NEED_NAMESPACE_EXPORT",
            exporter: e,
            message: `Module "${D(e)}" that is marked with \`syntheticNamedExports: ${JSON.stringify(t)}\` needs ${"string" == typeof t && "default" !== t ? `an explicit export named "${t}"` : "a default export"} that does not reexport an unresolved named export of the same module.`
        }));
        var e, t
    }
    getVariableForExportName(e, {importerForSideEffects: t, isExportAllSearch: s, onlyExplicit: i, searchedNamesAndModules: n}=fe) {
        if ("*" === e[0]) {
            if (1 === e.length)
                return [this.namespace];
            return this.graph.modulesById.get(e.slice(1)).getVariableForExportName("*")
        }
        const r = this.reexportDescriptions.get(e);
        if (r) {
            const [e] = xo(r.module, r.localName, t, !1, n);
            return e ? (t && (Eo(e, t, this),
            this.info.moduleSideEffects && F(t.sideEffectDependenciesByVariable, e, j).add(this)),
            [e]) : this.error($t(r.localName, this.id, r.module.id), r.start)
        }
        const o = this.exports.get(e);
        if (o) {
            if (o === yo)
                return [this.exportShimVariable];
            const e = o.localName
              , s = this.traceVariable(e, {
                importerForSideEffects: t,
                searchedNamesAndModules: n
            });
            return t && (Eo(s, t, this),
            F(t.sideEffectDependenciesByVariable, s, j).add(this)),
            [s]
        }
        if (i)
            return [null];
        if ("default" !== e) {
            const s = this.namespaceReexportsByName.get(e) ?? this.getVariableFromNamespaceReexports(e, t, n);
            if (this.namespaceReexportsByName.set(e, s),
            s[0])
                return s
        }
        return this.info.syntheticNamedExports ? [F(this.syntheticExports, e, (()=>new Zr(this.astContext,e,this.getSyntheticNamespace())))] : !s && this.options.shimMissingExports ? (this.shimMissingExport(e),
        [this.exportShimVariable]) : [null]
    }
    hasEffects() {
        return "no-treeshake" === this.info.moduleSideEffects || this.ast.hasCachedEffects()
    }
    include() {
        const e = Wt();
        this.ast.shouldBeIncluded(e) && this.ast.include(e, !1)
    }
    includeAllExports(e) {
        this.isExecuted || (go(this),
        this.graph.needsTreeshakingPass = !0);
        for (const t of this.exports.keys())
            if (e || t !== this.info.syntheticNamedExports) {
                const e = this.getVariableForExportName(t)[0];
                e.deoptimizePath(Y),
                e.included || this.includeVariable(e)
            }
        for (const e of this.getReexports()) {
            const [t] = this.getVariableForExportName(e);
            t && (t.deoptimizePath(Y),
            t.included || this.includeVariable(t),
            t instanceof de && (t.module.reexported = !0))
        }
        e && this.namespace.setMergedNamespaces(this.includeAndGetAdditionalMergedNamespaces())
    }
    includeAllInBundle() {
        this.ast.include(Wt(), !0),
        this.includeAllExports(!1)
    }
    includeExportsByNames(e) {
        this.isExecuted || (go(this),
        this.graph.needsTreeshakingPass = !0);
        let t = !1;
        for (const s of e) {
            const e = this.getVariableForExportName(s)[0];
            e && (e.deoptimizePath(Y),
            e.included || this.includeVariable(e)),
            this.exports.has(s) || this.reexportDescriptions.has(s) || (t = !0)
        }
        t && this.namespace.setMergedNamespaces(this.includeAndGetAdditionalMergedNamespaces())
    }
    isIncluded() {
        return this.ast && (this.ast.included || this.namespace.included || this.importedFromNotTreeshaken || this.exportShimVariable.included)
    }
    linkImports() {
        this.addModulesToImportDescriptions(this.importDescriptions),
        this.addModulesToImportDescriptions(this.reexportDescriptions);
        const e = [];
        for (const t of this.exportAllSources) {
            const s = this.graph.modulesById.get(this.resolvedIds[t].id);
            s instanceof jt ? e.push(s) : this.exportAllModules.push(s)
        }
        this.exportAllModules.push(...e)
    }
    render(e) {
        const t = this.magicString.clone();
        this.ast.render(t, e),
        t.trim();
        const {usesTopLevelAwait: s} = this.astContext;
        return s && "es" !== e.format && "system" !== e.format ? ze((i = this.id,
        n = e.format,
        {
            code: "INVALID_TLA_FORMAT",
            id: i,
            message: `Module format "${n}" does not support top-level await. Use the "es" or "system" output formats rather.`
        })) : {
            source: t,
            usesTopLevelAwait: s
        };
        var i, n
    }
    setSource({ast: e, code: t, customTransformCache: s, originalCode: i, originalSourcemap: n, resolvedIds: r, sourcemapChain: o, transformDependencies: a, transformFiles: l, ...h}) {
        uo("generate ast", 3),
        this.info.code = t,
        this.originalCode = i,
        this.originalSourcemap = n,
        this.sourcemapChain = o,
        l && (this.transformFiles = l),
        this.transformDependencies = a,
        this.customTransformCache = s,
        this.updateOptions(h);
        const c = e ?? this.tryParse();
        po("generate ast", 3),
        uo("analyze ast", 3),
        this.resolvedIds = r ?? Object.create(null);
        const u = this.id;
        this.magicString = new g(t,{
            filename: this.excludeFromSourcemap ? null : u,
            indentExclusionRanges: []
        }),
        this.astContext = {
            addDynamicImport: this.addDynamicImport.bind(this),
            addExport: this.addExport.bind(this),
            addImport: this.addImport.bind(this),
            addImportMeta: this.addImportMeta.bind(this),
            code: t,
            deoptimizationTracker: this.graph.deoptimizationTracker,
            error: this.error.bind(this),
            fileName: u,
            getExports: this.getExports.bind(this),
            getModuleExecIndex: ()=>this.execIndex,
            getModuleName: this.basename.bind(this),
            getNodeConstructor: e=>Yr[e] || Yr.UnknownNode,
            getReexports: this.getReexports.bind(this),
            importDescriptions: this.importDescriptions,
            includeAllExports: ()=>this.includeAllExports(!0),
            includeDynamicImport: this.includeDynamicImport.bind(this),
            includeVariableInModule: this.includeVariableInModule.bind(this),
            magicString: this.magicString,
            manualPureFunctions: this.graph.pureFunctions,
            module: this,
            moduleContext: this.context,
            options: this.options,
            requestTreeshakingPass: ()=>this.graph.needsTreeshakingPass = !0,
            traceExport: e=>this.getVariableForExportName(e)[0],
            traceVariable: this.traceVariable.bind(this),
            usesTopLevelAwait: !1,
            warn: this.warn.bind(this)
        },
        this.scope = new qr(this.graph.scope,this.astContext),
        this.namespace = new Jr(this.astContext),
        this.ast = new Fr(c,{
            context: this.astContext,
            type: "Module"
        },this.scope),
        e || !1 !== this.options.cache ? this.info.ast = c : Object.defineProperty(this.info, "ast", {
            get: ()=>{
                if (this.graph.astLru.has(u))
                    return this.graph.astLru.get(u);
                {
                    const e = this.tryParse();
                    return this.graph.astLru.set(u, e),
                    e
                }
            }
        }),
        po("analyze ast", 3)
    }
    toJSON() {
        return {
            assertions: this.info.assertions,
            ast: this.info.ast,
            code: this.info.code,
            customTransformCache: this.customTransformCache,
            dependencies: Array.from(this.dependencies, to),
            id: this.id,
            meta: this.info.meta,
            moduleSideEffects: this.info.moduleSideEffects,
            originalCode: this.originalCode,
            originalSourcemap: this.originalSourcemap,
            resolvedIds: this.resolvedIds,
            sourcemapChain: this.sourcemapChain,
            syntheticNamedExports: this.info.syntheticNamedExports,
            transformDependencies: this.transformDependencies,
            transformFiles: this.transformFiles
        }
    }
    traceVariable(e, {importerForSideEffects: t, isExportAllSearch: s, searchedNamesAndModules: i}=fe) {
        const n = this.scope.variables.get(e);
        if (n)
            return n;
        const r = this.importDescriptions.get(e);
        if (r) {
            const e = r.module;
            if (e instanceof bo && "*" === r.name)
                return e.namespace;
            const [n] = xo(e, r.name, t || this, s, i);
            return n || this.error($t(r.name, this.id, e.id), r.start)
        }
        return null
    }
    updateOptions({meta: e, moduleSideEffects: t, syntheticNamedExports: s}) {
        null != t && (this.info.moduleSideEffects = t),
        null != s && (this.info.syntheticNamedExports = s),
        null != e && Object.assign(this.info.meta, e)
    }
    warn(e, t) {
        this.addLocationToLogProps(e, t),
        this.options.onwarn(e)
    }
    addDynamicImport(e) {
        let t = e.source;
        t instanceof Ur ? 1 === t.quasis.length && t.quasis[0].value.cooked && (t = t.quasis[0].value.cooked) : t instanceof vn && "string" == typeof t.value && (t = t.value),
        this.dynamicImports.push({
            argument: t,
            id: null,
            node: e,
            resolution: null
        })
    }
    addExport(e) {
        if (e instanceof Fn)
            this.exports.set("default", {
                identifier: e.variable.getAssignedVariableName(),
                localName: "default"
            });
        else if (e instanceof Bn) {
            const t = e.source.value;
            if (this.addSource(t, e),
            e.exported) {
                const s = e.exported.name;
                this.reexportDescriptions.set(s, {
                    localName: "*",
                    module: null,
                    source: t,
                    start: e.start
                })
            } else
                this.exportAllSources.add(t)
        } else if (e.source instanceof vn) {
            const t = e.source.value;
            this.addSource(t, e);
            for (const {exported: s, local: i, start: n} of e.specifiers) {
                const e = s instanceof vn ? s.value : s.name;
                this.reexportDescriptions.set(e, {
                    localName: i instanceof vn ? i.value : i.name,
                    module: null,
                    source: t,
                    start: n
                })
            }
        } else if (e.declaration) {
            const t = e.declaration;
            if (t instanceof Kr)
                for (const e of t.declarations)
                    for (const t of Gt(e.id))
                        this.exports.set(t, {
                            identifier: null,
                            localName: t
                        });
            else {
                const e = t.id.name;
                this.exports.set(e, {
                    identifier: null,
                    localName: e
                })
            }
        } else
            for (const {local: t, exported: s} of e.specifiers) {
                const e = t.name
                  , i = s instanceof Wi ? s.name : s.value;
                this.exports.set(i, {
                    identifier: null,
                    localName: e
                })
            }
    }
    addImport(e) {
        const t = e.source.value;
        this.addSource(t, e);
        for (const s of e.specifiers) {
            const e = s instanceof Kn ? "default" : s instanceof Pr ? "*" : s.imported instanceof Wi ? s.imported.name : s.imported.value;
            this.importDescriptions.set(s.local.name, {
                module: null,
                name: e,
                source: t,
                start: s.start
            })
        }
    }
    addImportMeta(e) {
        this.importMetas.push(e)
    }
    addLocationToLogProps(e, t) {
        e.id = this.id,
        e.pos = t;
        let s = this.info.code;
        const i = ye(s, t, {
            offsetLine: 1
        });
        if (i) {
            let {column: n, line: r} = i;
            try {
                ({column: n, line: r} = zr(this.sourcemapChain, {
                    column: n,
                    line: r
                })),
                s = this.originalCode
            } catch (e) {
                this.options.onwarn(((e, t, s, i, n) => ({
                    cause: e,
                    code: "SOURCEMAP_ERROR",
                    id: t,

                    loc: {
                        column: s,
                        file: t,
                        line: i
                    },

                    message: `Error when using sourcemap for reporting an error: ${e.message}`,
                    pos: n
                }))(e, this.id, n, r, t))
            }
            Fe(e, {
                column: n,
                line: r
            }, s, this.id)
        }
    }
    addModulesToImportDescriptions(e) {
        for (const t of e.values()) {
            const {id: e} = this.resolvedIds[t.source];
            t.module = this.graph.modulesById.get(e)
        }
    }
    addRelevantSideEffectDependencies(e, t, s) {
        const i = new Set
          , n = r=>{
            for (const o of r)
                i.has(o) || (i.add(o),
                t.has(o) ? e.add(o) : (o.info.moduleSideEffects || s.has(o)) && (o instanceof jt || o.hasEffects() ? e.add(o) : n(o.dependencies)))
        }
        ;
        n(this.dependencies),
        n(s)
    }
    addSource(e, {assertions, start}) {
        const s = (i = assertions,
        i?.length ? Object.fromEntries(i.map((e=>[so(e), e.value.value]))) : fe);
        var i;
        const n = this.sourcesWithAssertions.get(e);
        n ? io(n, s) && this.warn(wt(n, s, e, this.id), start) : this.sourcesWithAssertions.set(e, s)
    }
    getVariableFromNamespaceReexports(e, t, s) {
        let i = null;
        const n = new Map
          , r = new Set;
        for (const o of this.exportAllModules) {
            if (o.info.syntheticNamedExports === e)
                continue;
            const [a,l] = xo(o, e, t, !0, vo(s));
            o instanceof jt || l ? r.add(a) : a instanceof Zr ? i || (i = a) : a && n.set(a, o)
        }
        if (n.size > 0) {
            const t = [...n]
              , s = t[0][0];
            return 1 === t.length ? [s] : (this.options.onwarn((o = e,
            a = this.id,
            l = t.map((([,e])=>e.id)),
            {
                binding: o,
                code: "NAMESPACE_CONFLICT",
                ids: l,
                message: `Conflicting namespaces: "${D(a)}" re-exports "${o}" from one of the modules ${Ae(l.map((e=>D(e))))} (will be ignored).`,
                reexporter: a
            })),
            [null])
        }
        var o, a, l;
        if (r.size > 0) {
            const t = [...r]
              , s = t[0];
            return t.length > 1 && this.options.onwarn(((e, t, s, i) => ({
                binding: e,
                code: "AMBIGUOUS_EXTERNAL_NAMESPACES",
                ids: i,
                message: `Ambiguous external namespace resolution: "${D(t)}" re-exports "${e}" from one of the external modules ${Ae(i.map((e=>D(e))))}, guessing "${D(s)}".`,
                reexporter: t
            }))(e, this.id, s.module.id, t.map((({module}) => module.id)))),
            [s, !0];
        }
        return i ? [i] : [null]
    }
    includeAndGetAdditionalMergedNamespaces() {
        const e = new Set
          , t = new Set;
        for (const s of [this, ...this.exportAllModules])
            if (s instanceof jt) {
                const [t] = s.getVariableForExportName("*");
                t.include(),
                this.includedImports.add(t),
                e.add(t)
            } else if (s.info.syntheticNamedExports) {
                const e = s.getSyntheticNamespace();
                e.include(),
                this.includedImports.add(e),
                t.add(e)
            }
        return [...t, ...e]
    }
    includeDynamicImport(e) {
        const t = this.dynamicImports.find((({node}) => node === e)).resolution;
        if (t instanceof bo) {
            t.includedDynamicImporters.push(this);
            const s = this.options.treeshake ? e.getDeterministicImportedNames() : void 0;
            s ? t.includeExportsByNames(s) : t.includeAllExports(!0)
        }
    }
    includeVariable(e) {
        if (!e.included) {
            e.include(),
            this.graph.needsTreeshakingPass = !0;
            const t = e.module;
            if (t instanceof bo && (t.isExecuted || go(t),
            t !== this)) {
                const t = ((e, {sideEffectDependenciesByVariable}) => {
                    const s = F(sideEffectDependenciesByVariable, e, j);
                    let i = e;
                    const n = new Set([i]);
                    for (; ; ) {
                        const e = i.module;
                        if (i = i instanceof Wr ? i.getDirectOriginalVariable() : i instanceof Zr ? i.syntheticNamespace : null,
                        !i || n.has(i))
                            break;
                        n.add(i),
                        s.add(e);
                        const t = e.sideEffectDependenciesByVariable.get(i);
                        if (t)
                            for (const e of t)
                                s.add(e)
                    }
                    return s
                })(e, this);
                for (const e of t)
                    e.isExecuted || go(e)
            }
        }
    }
    includeVariableInModule(e) {
        this.includeVariable(e);
        const t = e.module;
        t && t !== this && this.includedImports.add(e)
    }
    shimMissingExport(e) {
        let t, s;
        this.options.onwarn((t = this.id,
        {
            binding: s = e,
            code: "SHIMMED_EXPORT",
            exporter: t,
            message: `Missing export "${s}" has been shimmed in module "${D(t)}".`
        })),
        this.exports.set(e, yo)
    }
    tryParse() {
        try {
            return this.graph.contextParse(this.info.code)
        } catch (e) {
            return this.error(((e, t) => {
                let s = e.message.replace(/ \(\d+:\d+\)$/, "");
                return t.endsWith(".json") ? s += " (Note that you need @rollup/plugin-json to import JSON files)" : t.endsWith(".js") || (s += " (Note that you need plugins to import files that are not JavaScript)"),
                {
                    cause: e,
                    code: "PARSE_ERROR",
                    id: t,
                    message: s
                }
            })(e, this.id), e.pos);
        }
    }
}
function Eo(e, {alternativeReexportModules}, s) {
    if (e.module instanceof bo && e.module !== s) {
        const i = e.module.cycles;
        if (i.size > 0) {
            const n = s.cycles;
            for (const r of n)
                if (i.has(r)) {
                    alternativeReexportModules.set(e, s);
                    break
                }
        }
    }
}
const vo = e=>e && new Map(Array.from(e, (([e,t])=>[e, new Set(t)])));
function So(e) {
    return e.endsWith(".js") ? e.slice(0, -3) : e
}
function Ao({autoId, basePath, id}, t) {
    return autoId ? `${basePath ? `${basePath}/` : ""}${So(t)}` : id ?? "";
}
function ko(e, t, s, i, n, r, o, a="return ") {
    const {_: l, getDirectReturnFunction: h, getFunctionIntro: c, getPropertyAccess: u, n: d, s: p} = n;
    if (!s)
        return `${d}${d}${a}${((e, t, s, i, n) => {
    if (e.length > 0)
        return e[0].local;
    for (const {defaultVariableName: e, importPath: r, isChunk: o, name: a, namedExportsMode: l, namespaceVariableName: h, reexports: c} of t)
        if (c)
            return wo(a, c[0].imported, l, o, e, h, s, r, i, n)
})(e, t, i, o, u)};`;
    let f = "";
    for (const {defaultVariableName: e, importPath: n, isChunk: a, name: c, namedExportsMode: p, namespaceVariableName: m, reexports: g} of t)
        if (g && s)
            for (const t of g)
                if ("*" !== t.reexported) {
                    const s = wo(c, t.imported, p, a, e, m, i, n, o, u);
                    if (f && (f += d),
                    "*" !== t.imported && t.needsLiveBinding) {
                        const [e,i] = h([], {
                            functionReturn: !0,
                            lineBreakIndent: null,
                            name: null
                        });
                        f += `Object.defineProperty(exports,${l}'${t.reexported}',${l}{${d}${r}enumerable:${l}true,${d}${r}get:${l}${e}${s}${i}${d}});`
                    } else
                        f += `exports ${u(t.reexported)}${l}=${l}${s};`
                }
    for (const {exported: t, local: s} of e) {
        const e = `exports ${u(t)}`;
        e !== s && (f && (f += d),
        f += `${e}${l}=${l}${s};`)
    }
    for (const {name: e, reexports: i} of t)
        if (i && s)
            for (const t of i)
                if ("*" === t.reexported) {
                    f && (f += d);
                    const s = `{${d}${r}if ${l}(k ${l}!==${l}'default'${l}&&${l}!exports.hasOwnProperty(k))${l}${Co(e, t.needsLiveBinding, r, n)}${p}${d}}`;
                    f += `Object.keys(${e}).forEach(${c(["k"], {
                        isAsync: !1,
                        name: null
                    })}${s});`
                }
    return f ? `${d}${d}${f}` : ""
}
function wo(e, t, s, i, n, r, o, a, l, h) {
    if ("default" === t) {
        if (!i) {
            const t = o(a)
              , s = sr[t] ? n : e;
            return ir(t, l) ? `${s}${h("default")}` : s
        }
        return s ? `${e}${h("default")}` : e
    }
    return "*" === t ? (i ? !s : nr[o(a)]) ? r : e : `${e}${h(t)}`
}
function Io(e) {
    return e([["value", "true"]], {
        lineBreakIndent: null
    })
}
function Po(e, t, s, {_: i, getObject: n}) {
    if (e) {
        if (t)
            return s ? `Object.defineProperties(exports,${i}${n([["__esModule", Io(n)], [null, `[Symbol.toStringTag]:${i}${vr(n)}`]], {
                lineBreakIndent: null
            })});` : `Object.defineProperty(exports,${i}'__esModule',${i}${Io(n)});`;
        if (s)
            return `Object.defineProperty(exports,${i}Symbol.toStringTag,${i}${vr(n)});`
    }
    return ""
}
const Co = (e,t,s,{_: i, getDirectReturnFunction: n, n: r})=>{
    if (t) {
        const [t,o] = n([], {
            functionReturn: !0,
            lineBreakIndent: null,
            name: null
        });
        return `Object.defineProperty(exports,${i}k,${i}{${r}${s}${s}enumerable:${i}true,${r}${s}${s}get:${i}${t}${e}[k]${o}${r}${s}})`
    }
    return `exports[k]${i}=${i}${e}[k]`
}
;
function $o(e, t, s, i, n, r, o, a) {
    const {_: l, cnst: h, n: c} = a
      , u = new Set
      , d = []
      , p = (e,t,s)=>{
        u.add(t),
        d.push(`${h} ${e}${l}=${l}/*#__PURE__*/${t}(${s});`)
    }
    ;
    for (const {defaultVariableName: s, imports: i, importPath: n, isChunk: r, name: o, namedExportsMode: a, namespaceVariableName: l, reexports: h} of e)
        if (r) {
            for (const {imported: e, reexported: t} of [...(i || []), ...(h || [])])
                if ("*" === e && "*" !== t) {
                    a || p(l, er, o);
                    break
                }
        } else {
            const e = t(n);
            let r = !1
              , a = !1;
            for (const {imported: t, reexported: n} of [...(i || []), ...(h || [])]) {
                let i, h;
                "default" === t ? r || (r = !0,
                s !== l && (h = s,
                i = sr[e])) : "*" !== t || "*" === n || a || (a = !0,
                i = nr[e],
                h = l),
                i && p(h, i, o)
            }
        }
    return `${or(u, r, o, a, s, i, n)}${d.length > 0 ? `${d.join(c)}${c}${c}` : ""}`
}
function No(e, t) {
    return "." !== e[0] ? e : t ? (s = e).endsWith(".js") ? s : `${s}.js` : So(e);
    var s
}
const _o = new Set([...t(["assert", "async_hooks", "buffer", "child_process", "cluster", "console", "constants", "crypto", "dgram", "diagnostics_channel", "dns", "domain", "events", "fs", "http", "http2", "https", "inspector", "module", "net", "os", "path", "perf_hooks", "process", "punycode", "querystring", "readline", "repl", "stream", "string_decoder", "timers", "tls", "trace_events", "tty", "url", "util", "v8", "vm", "wasi", "worker_threads", "zlib"]), "assert/strict", "dns/promises", "fs/promises", "path/posix", "path/win32", "readline/promises", "stream/consumers", "stream/promises", "stream/web", "timers/promises", "util/types"]);
function Ro(e, t) {
    const s = t.map((({importPath: e})=>e)).filter((e=>_o.has(e) || e.startsWith("node:")));
    0 !== s.length && e((e => ({
        code: ht,
        ids: e,
        message: `Creating a browser bundle that depends on Node.js built-in modules (${Ae(e)}). You might need to include https://github.com/FredKSchott/rollup-plugin-polyfill-node`
    }))(s))
}
const Mo = (e,t)=>e.split(".").map(t).join("");
function To(e, t, s, i, {_: n, getPropertyAccess: r}) {
    const o = e.split(".");
    o[0] = ("function" == typeof s ? s(o[0]) : s[o[0]]) || o[0];
    const a = o.pop();
    let l = t
      , h = [...o.map((e=>(l += r(e),
    `${l}${n}=${n}${l}${n}||${n}{}`))), `${l}${r(a)}`].join(`,${n}`) + `${n}=${n}${i}`;
    return o.length > 0 && (h = `(${h})`),
    h
}
function Oo(e) {
    let t = e.length;
    for (; t--; ) {
        const {imports: s, reexports: i} = e[t];
        if (s || i)
            return e.slice(0, t + 1)
    }
    return []
}
const Do = ({dependencies: e, exports: t})=>{
    const s = new Set(t.map((({exported}) => exported)));
    s.add("default");
    for (const {reexports: t} of e)
        if (t)
            for (const e of t)
                "*" !== e.reexported && s.add(e.reexported);
    return s
}
  , Lo = (e,t,{_: s, cnst: i, getObject: n, n: r})=>e ? `${r}${t}${i} _starExcludes ${s}=${s}${n([...e].map((e=>[e, "1"])), {
    lineBreakIndent: {
        base: t,
        t
    }
})};` : ""
  , Vo = (e,t,{_: s, n: i})=>e.length > 0 ? `${i}${t}var ${e.join(`,${s}`)};` : ""
  , Bo = (e,t,s)=>zo(e.filter((({hoisted}) => hoisted)).map((({exported, local}) => ({
    name: exported,
    value: local
}))), t, s);
function zo(e, t, {_: s, n: i}) {
    return 0 === e.length ? "" : 1 === e.length ? `exports('${e[0].name}',${s}${e[0].value});${i}${i}` : `exports({${i}` + e.map((({name: e, value: i})=>`${t}${e}:${s}${i}`)).join(`,${i}`) + `${i}});${i}${i}`
}
const Fo = (e,t,s)=>zo(e.filter((({expression}) => expression)).map((({exported, local}) => ({
    name: exported,
    value: local
}))), t, s)
  , jo = (e,t,s)=>zo(e.filter((({local}) => local === Xr)).map((({exported}) => ({
    name: exported,
    value: Xr
}))), t, s);
function Uo(e, t, s) {
    return e ? `${t}${Mo(e, s)}` : "null"
}
const Go = {
    amd(
        e,
        {accessedGlobals: t, dependencies: s, exports: i, hasDefaultExport: n, hasExports: r, id: o, indent: a, intro: l, isEntryFacade: h, isModuleFacade: c, namedExportsMode: u, outro: d, snippets: p, onwarn: f},
        {amd: m, esModule: g, externalLiveBindings: y, freeze: x, interop: b, namespaceToStringTag: E, strict: v}
    ) {
        Ro(f, s);
        const S = s.map((({importPath}) => `'${No(importPath, m.forceJsExtensionForImports)}'`))
          , A = s.map((({name}) => name))
          , {n: k, getNonArrowFunctionIntro: w, _: I} = p;
        u && r && (A.unshift("exports"),
        S.unshift("'exports'")),
        t.has("require") && (A.unshift("require"),
        S.unshift("'require'")),
        t.has("module") && (A.unshift("module"),
        S.unshift("'module'"));
        const P = Ao(m, o)
          , C = (P ? `'${P}',${I}` : "") + (S.length > 0 ? `[${S.join(`,${I}`)}],${I}` : "")
          , $ = v ? `${I}'use strict';` : "";
        e.prepend(`${l}${$o(s, b, y, x, E, t, a, p)}`);
        const N = ko(i, s, u, b, p, a, y);
        let _ = Po(u && r, h && (!0 === g || "if-default-prop" === g && n), c && E, p);
        _ && (_ = k + k + _),
        e.append(`${N}${_}${d}`).indent(a).prepend(`${m.define}(${C}(${w(A, {
            isAsync: !1,
            name: null
        })}{${$}${k}${k}`).append(`${k}${k}}));`)
    },
    cjs(
        e,
        {accessedGlobals: t, dependencies: s, exports: i, hasDefaultExport: n, hasExports: r, indent: o, intro: a, isEntryFacade: l, isModuleFacade: h, namedExportsMode: c, outro: u, snippets: d},
        {compact: p, esModule: f, externalLiveBindings: m, freeze: g, interop: y, namespaceToStringTag: x, strict: b}
    ) {
        const {_: E, n: v} = d
          , S = b ? `'use strict';${v}${v}` : "";
        let A = Po(c && r, l && (!0 === f || "if-default-prop" === f && n), h && x, d);
        A && (A += v + v);
        const k = ((e, {_: t, cnst: s, n: i}, n) => {
            let r = ""
              , o = !1;
            for (const {importPath: a, name: l, reexports: h, imports: c} of e)
                h || c ? (r += n && o ? "," : `${r ? `;${i}` : ""}${s} `,
                o = !0,
                r += `${l}${t}=${t}require('${a}')`) : (r && (r += n && !o ? "," : `;${i}`),
                o = !1,
                r += `require('${a}')`);
            if (r)
                return `${r};${i}${i}`;
            return ""
        })(s, d, p)
          , w = $o(s, y, m, g, x, t, o, d);
        e.prepend(`${S}${a}${A}${k}${w}`);
        const I = ko(i, s, c, y, d, o, m, `module.exports ${E}=${E}`);
        e.append(`${I}${u}`)
    },
    es(
        e,
        {accessedGlobals: t, indent: s, intro: i, outro: n, dependencies: r, exports: o, snippets: a},
        {externalLiveBindings: l, freeze: h, namespaceToStringTag: c}
    ) {
        const {n: u} = a
          , d = ((e, {_: t}) => {
            const s = [];
            for (const {importPath: i, reexports: n, imports: r, name: o, assertions: a} of e) {
                const e = `'${i}'${a ? `${t}assert ${t}${a}` : ""};`;
                if (n || r) {
                    if (r) {
                        let i = null
                          , n = null;
                        const o = [];
                        for (const e of r)
                            "default" === e.imported ? i = e : "*" === e.imported ? n = e : o.push(e);
                        n && s.push(`import ${t}*${t}as ${n.local} from ${t}${e}`),
                        i && 0 === o.length ? s.push(`import ${i.local} from ${t}${e}`) : o.length > 0 && s.push(`import ${i ? `${i.local},${t}` : ""}{${t}${o.map((({imported, local}) => imported === local ? imported : `${imported} as ${local}`)).join(`,${t}`)}${t}}${t}from ${t}${e}`)
                    }
                    if (n) {
                        let i = null;
                        const a = []
                          , l = [];
                        for (const e of n)
                            "*" === e.reexported ? i = e : "*" === e.imported ? a.push(e) : l.push(e);
                        if (i && s.push(`export ${t}*${t}from ${t}${e}`),
                        a.length > 0) {
                            r && r.some((({imported, local}) => "*" === imported && local === o)) || s.push(`import ${t}*${t}as ${o} from ${t}${e}`);
                            for (const e of a)
                                s.push(`export ${t}{${t}${o === e.reexported ? o : `${o} as ${e.reexported}`} };`)
                        }
                        l.length > 0 && s.push(`export ${t}{${t}${l.map((({imported, reexported}) => imported === reexported ? imported : `${imported} as ${reexported}`)).join(`,${t}`)}${t}}${t}from ${t}${e}`)
                    }
                } else
                    s.push(`import ${t}${e}`)
            }
            return s
        })(r, a);
        d.length > 0 && (i += d.join(u) + u + u),
        (i += or(null, t, s, a, l, h, c)) && e.prepend(i);
        const p = ((e, {_: t, cnst: s}) => {
            const i = []
              , n = [];
            for (const r of e)
                r.expression && i.push(`${s} ${r.local}${t}=${t}${r.expression};`),
                n.push(r.exported === r.local ? r.local : `${r.local} as ${r.exported}`);
            n.length > 0 && i.push(`export ${t}{${t}${n.join(`,${t}`)}${t}};`);
            return i
        })(o, a);
        p.length > 0 && e.append(u + u + p.join(u).trim()),
        n && e.append(n),
        e.trim()
    },
    iife(
        e,
        {accessedGlobals: t, dependencies: s, exports: i, hasDefaultExport: n, hasExports: r, indent: o, intro: a, namedExportsMode: l, outro: h, snippets: c, onwarn: u},
        {compact: d, esModule: p, extend: f, freeze: m, externalLiveBindings: g, globals: y, interop: x, name: b, namespaceToStringTag: E, strict: v}
    ) {
        const {_: S, getNonArrowFunctionIntro: A, getPropertyAccess: k, n: w} = c
          , I = b && b.includes(".")
          , P = !f && !I;
        if (b && P && (zt(C = b) || Bt.test(C)))
            return ze((e => ({
                code: Je,
                message: `Given name "${e}" is not a legal JS identifier. If you need this, you can try "output.extend: true".`,
                url: ke(Ne)
            }))(b));
        var C;
        Ro(u, s);
        const $ = Oo(s)
          , N = $.map((({globalName}) => globalName || "null"))
          , _ = $.map((({name}) => name));
        r && !b && u({
            code: lt,
            message: 'If you do not supply "output.name", you may not be able to access the exports of an IIFE bundle.',
            url: ke(Le)
        }),
        l && r && (f ? (N.unshift(`this ${Mo(b, k)}${S}=${S}this ${Mo(b, k)}${S}||${S}{}`),
        _.unshift("exports")) : (N.unshift("{}"),
        _.unshift("exports")));
        const R = v ? `${o}'use strict';${w}` : ""
          , M = $o(s, x, g, m, E, t, o, c);
        e.prepend(`${a}${M}`);
        let T = `(${A(_, {
            isAsync: !1,
            name: null
        })}{${w}${R}${w}`;
        r && (!b || f && l || (T = (P ? `var ${b}` : `this ${Mo(b, k)}`) + `${S}=${S}${T}`),
        I && (T = ((e, t, s, {_: i, getPropertyAccess: n, s: r}, o) => {
            const a = e.split(".");
            a[0] = ("function" == typeof s ? s(a[0]) : s[a[0]]) || a[0],
            a.pop();
            let l = t;
            return a.map((e=>(l += n(e),
            `${l}${i}=${i}${l}${i}||${i}{}${r}`))).join(o ? "," : "\n") + (o && a.length > 0 ? ";" : "\n")
        })(b, "this", y, c, d) + T));
        let O = `${w}${w}})(${N.join(`,${S}`)});`;
        r && !f && l && (O = `${w}${w}${o}return exports;${O}`);
        const D = ko(i, s, l, x, c, o, g);
        let L = Po(l && r, !0 === p || "if-default-prop" === p && n, E, c);
        L && (L = w + w + L),
        e.append(`${D}${L}${h}`).indent(o).prepend(T).append(O)
    },
    system(
        e,
        {accessedGlobals: t, dependencies: s, exports: i, hasExports: n, indent: r, intro: o, snippets: a, outro: l, usesTopLevelAwait: h},
        {externalLiveBindings: c, freeze: u, name: d, namespaceToStringTag: p, strict: f, systemNullSetters: m}
    ) {
        const {_: g, getFunctionIntro: y, getNonArrowFunctionIntro: x, n: b, s: E} = a
          , {importBindings: v, setters: S, starExcludes: A} = ((e, t, s, {_: i, cnst: n, getObject: r, getPropertyAccess: o, n: a}) => {
            const l = []
              , h = [];
            let c = null;
            for (const {imports: u, reexports: d} of e) {
                const p = [];
                if (u)
                    for (const e of u)
                        l.push(e.local),
                        "*" === e.imported ? p.push(`${e.local}${i}=${i}module;`) : p.push(`${e.local}${i}=${i}module ${o(e.imported)};`);
                if (d) {
                    const a = [];
                    let l = !1;
                    for (const {imported: e, reexported: t} of d)
                        "*" === t ? l = !0 : a.push([t, "*" === e ? "module" : `module ${o(e)}`]);
                    if (a.length > 1 || l) {
                        const o = r(a, {
                            lineBreakIndent: null
                        });
                        l ? (c || (c = Do({
                            dependencies: e,
                            exports: t
                        })),
                        p.push(`${n} setter ${i}=${i}${o};`, `for ${i}(${n} name in module)${i}{`, `${s}if ${i}(!_starExcludes[name])${i}setter[name]${i}=${i}module[name];`, "}", "exports(setter);")) : p.push(`exports(${o});`)
                    } else {
                        const [e,t] = a[0];
                        p.push(`exports('${e}',${i}${t});`)
                    }
                }
                h.push(p.join(`${a}${s}${s}${s}`))
            }
            return {
                importBindings: l,
                setters: h,
                starExcludes: c
            }
        })(s, i, r, a)
          , k = d ? `'${d}',${g}` : ""
          , w = t.has("module") ? ["exports", "module"] : n ? ["exports"] : [];
        let I = `System.register(${k}[` + s.map((({importPath: e})=>`'${e}'`)).join(`,${g}`) + `],${g}(${x(w, {
            isAsync: !1,
            name: null
        })}{${b}${r}${f ? "'use strict';" : ""}` + Lo(A, r, a) + Vo(v, r, a) + `${b}${r}return ${g}{${S.length > 0 ? `${b}${r}${r}setters:${g}[${S.map((e=>e ? `${y(["module"], {
            isAsync: !1,
            name: null
        })}{${b}${r}${r}${r}${e}${b}${r}${r}}` : m ? "null" : `${y([], {
            isAsync: !1,
            name: null
        })}{}`)).join(`,${g}`)}],` : ""}${b}`;
        I += `${r}${r}execute:${g}(${x([], {
            isAsync: h,
            name: null
        })}{${b}${b}`;
        const P = `${r}${r}})${b}${r}}${E}${b}}));`;
        e.prepend(o + or(null, t, r, a, c, u, p) + Bo(i, r, a)).append(`${l}${b}${b}` + Fo(i, r, a) + jo(i, r, a)).indent(`${r}${r}${r}`).append(P).prepend(I)
    },
    umd(
        e,
        {accessedGlobals: t, dependencies: s, exports: i, hasDefaultExport: n, hasExports: r, id: o, indent: a, intro: l, namedExportsMode: h, outro: c, snippets: u, onwarn: d},
        {amd: p, compact: f, esModule: m, extend: g, externalLiveBindings: y, freeze: x, interop: b, name: E, namespaceToStringTag: v, globals: S, noConflict: A, strict: k}
    ) {
        const {_: w, cnst: I, getFunctionIntro: P, getNonArrowFunctionIntro: C, getPropertyAccess: $, n: N, s: _} = u
          , R = f ? "f" : "factory"
          , M = f ? "g" : "global";
        if (r && !E)
            return ze({
                code: lt,
                message: 'You must supply "output.name" for UMD bundles that have exports so that the exports are accessible in environments without a module loader.',
                url: ke(Le)
            });
        Ro(d, s);
        const T = s.map((({importPath}) => `'${No(importPath, p.forceJsExtensionForImports)}'`))
          , O = s.map((({importPath}) => `require('${importPath}')`))
          , D = Oo(s)
          , L = D.map((({globalName}) => Uo(globalName, M, $)))
          , V = D.map((({name}) => name));
        h && (r || A) && (T.unshift("'exports'"),
        O.unshift("exports"),
        L.unshift(To(E, M, S, `${g ? `${Uo(E, M, $)}${w}||${w}` : ""}{}`, u)),
        V.unshift("exports"));
        const B = Ao(p, o)
          , z = (B ? `'${B}',${w}` : "") + (T.length > 0 ? `[${T.join(`,${w}`)}],${w}` : "")
          , F = p.define
          , j = !h && r ? `module.exports ${w}=${w}` : ""
          , U = k ? `${w}'use strict';${N}` : "";
        let G;
        if (A) {
            const e = f ? "e" : "exports";
            let t;
            if (!h && r)
                t = `${I} ${e}${w}=${w}${To(E, M, S, `${R}(${L.join(`,${w}`)})`, u)};`;
            else {
                t = `${I} ${e}${w}=${w}${L.shift()};${N}${a}${a}${R}(${[e, ...L].join(`,${w}`)});`
            }
            G = `(${P([], {
    isAsync: !1,
    name: null
})}{${N}${a}${a}${I} current ${w}=${w}${((e, t, {_: s, getPropertyAccess: i}) => {
    let n = t;
    return e.split(".").map((e=>n += i(e))).join(`${s}&&${s}`)
})(E, M, u)};${N}${a}${a}${t}${N}${a}${a}${e}.noConflict ${w}=${w}${P([], {
    isAsync: !1,
    name: null
})}{${w}${Uo(E, M, $)}${w}=${w}current;${w}return ${e}${_}${w}};${N}${a}})()`
        } else
            G = `${R}(${L.join(`,${w}`)})`,
            !h && r && (G = To(E, M, S, G, u));
        const W = r || A && h || L.length > 0
          , q = [R];
        W && q.unshift(M);
        const H = W ? `this,${w}` : ""
          , K = W ? `(${M}${w}=${w}typeof globalThis ${w}!==${w}'undefined'${w}?${w}globalThis ${w}:${w}${M}${w}||${w}self,${w}` : ""
          , Y = W ? ")" : ""
          , X = W ? `${a}typeof exports ${w}===${w}'object'${w}&&${w}typeof module ${w}!==${w}'undefined'${w}?${w}${j}${R}(${O.join(`,${w}`)})${w}:${N}` : ""
          , Q = `(${C(q, {
            isAsync: !1,
            name: null
        })}{${N}` + X + `${a}typeof ${F}${w}===${w}'function'${w}&&${w}${F}.amd ${w}?${w}${F}(${z}${R})${w}:${N}` + `${a}${K}${G}${Y};${N}` + `})(${H}(${C(V, {
            isAsync: !1,
            name: null
        })}{${U}${N}`
          , J = `${N + N}}));`;
        e.prepend(`${l}${$o(s, b, y, x, v, t, a, u)}`);
        const Z = ko(i, s, h, b, u, a, y);
        let ee = Po(h && r, !0 === m || "if-default-prop" === m && n, v, u);
        ee && (ee = N + N + ee),
        e.append(`${Z}${ee}${c}`).trim().indent(a).append(J).prepend(Q)
    }
};
const Wo = (e,t)=>t ? `${e}\n ${t}` : e
  , qo = (e,t)=>t ? `${e}\n\n ${t}` : e;
async function Ho(e, t, s) {
    try {
        let[i,n,r,o] = await Promise.all([t.hookReduceValue("banner", e.banner(s), [s], Wo), t.hookReduceValue("footer", e.footer(s), [s], Wo), t.hookReduceValue("intro", e.intro(s), [s], qo), t.hookReduceValue("outro", e.outro(s), [s], qo)]);
        return r && (r += "\n\n"),
        o && (o = `\n\n ${o}`),
        i && (i += "\n"),
        n && (n = `\n${n}`),
        {
            banner: i,
            footer: n,
            intro: r,
            outro: o
        };
    } catch (e) {
        return ze((i = e.message,
        n = e.hook,
        r = e.plugin,
        {
            code: je,
            message: `Could not retrieve "${n}". Check configuration of plugin "${r}".\n\tError Message: ${i}`
        }))
    }
    var i, n, r
}
const Ko = {
    amd: Qo,
    cjs: Qo,
    es: Xo,
    iife: Qo,
    system: Xo,
    umd: Qo
};
function Yo(e, t, s, i, n, r, o, a, l, h, c, u, d, p) {
    const f = [...e].reverse();
    for (const e of f)
        e.scope.addUsedOutsideNames(i, n, u, d);
    !((e, t, s) => {
        for (const i of t) {
            for (const t of i.scope.variables.values())
                t.included && !(t.renderBaseName || t instanceof Wr && t.getOriginalVariable() !== t) && t.setRenderNames(null, Ei(t.name, e, t.forbiddenNames));
            if (s.has(i)) {
                const t = i.namespace;
                t.setRenderNames(null, Ei(t.name, e, t.forbiddenNames))
            }
        }
    })(i, f, p),
    Ko[n](i, s, t, r, o, a, l, h, c);
    for (const e of f)
        e.scope.deconflict(n, u, d)
}
function Xo(e, t, {dependencies}, i, n, r, o, a, l) {
    for (const t of dependencies)
        (n || t instanceof z) && (t.variableName = Ei(t.suggestedVariableName, e, null));
    for (const s of t) {
        const t = s.module
          , i = s.name;
        s.isNamespace && (n || t instanceof jt) ? s.setRenderNames(null, (t instanceof jt ? a.get(t) : o.get(t)).variableName) : t instanceof jt && "default" === i ? s.setRenderNames(null, Ei([...t.exportedVariables].some((([e,t])=>"*" === t && e.included)) ? `${t.suggestedVariableName}__default` : t.suggestedVariableName, e, s.forbiddenNames)) : s.setRenderNames(null, Ei(i, e, s.forbiddenNames))
    }
    for (const t of l)
        t.setRenderNames(null, Ei(t.name, e, t.forbiddenNames))
}
function Qo(e, t, {deconflictedDefault: s, deconflictedNamespace: i, dependencies: n}, r, o, a, l, h) {
    for (const t of n)
        t.variableName = Ei(t.suggestedVariableName, e, null);
    for (const t of i)
        t.namespaceVariableName = Ei(`${t.suggestedVariableName}__namespace`, e, null);
    for (const t of s)
        t.defaultVariableName = i.has(t) && rr(r(t.id), a) ? t.namespaceVariableName : Ei(`${t.suggestedVariableName}__default`, e, null);
    for (const e of t) {
        const t = e.module;
        if (t instanceof jt) {
            const s = h.get(t)
              , i = e.name;
            if ("default" === i) {
                const i = r(t.id)
                  , n = sr[i] ? s.defaultVariableName : s.variableName;
                ir(i, a) ? e.setRenderNames(n, "default") : e.setRenderNames(null, n)
            } else
                "*" === i ? e.setRenderNames(null, nr[r(t.id)] ? s.namespaceVariableName : s.variableName) : e.setRenderNames(s.variableName, null)
        } else {
            const s = l.get(t);
            o && e.isNamespace ? e.setRenderNames(null, "default" === s.exportMode ? s.namespaceVariableName : s.variableName) : "default" === s.exportMode ? e.setRenderNames(null, s.variableName) : e.setRenderNames(s.variableName, s.getVariableExportName(e))
        }
    }
}
function Jo(e, {exports: t, name: s, format: i}, n, r) {
    const o = e.getExportNames();
    if ("default" === t) {
        if (1 !== o.length || "default" !== o[0])
            return ze(Pt("default", o, n))
    } else if ("none" === t && o.length > 0)
        return ze(Pt("none", o, n));
    return "auto" === t && (0 === o.length ? t = "none" : 1 === o.length && "default" === o[0] ? t = "default" : ("es" !== i && "system" !== i && o.includes("default") && r(((e, t) => ({
        code: ut,
        id: e,
        message: `Entry module "${D(e)}" is using named and default exports together. Consumers of your bundle will have to use \`${t || "chunk"}.default\` to access the default export, which may not be what you want. Use \`output.exports: "named"\` to disable this warning.`,
        url: ke($e)
    }))(n, s)),
    t = "named")),
    t;
}
function Zo(e) {
    const t = e.split("\n")
      , s = t.filter((e=>/^\t+/.test(e)))
      , i = t.filter((e=>/^ {2,}/.test(e)));
    if (0 === s.length && 0 === i.length)
        return null;
    if (s.length >= i.length)
        return "\t";
    const n = i.reduce(((e,t)=>{
        const s = /^ +/.exec(t)[0].length;
        return Math.min(s, e)
    }
    ), 1 / 0);
    return " ".repeat(n)
}
function ea(e, t, s, i, n, r) {
    const o = e.getDependenciesToBeIncluded();
    for (const e of o) {
        if (e instanceof jt) {
            t.push(r.get(e));
            continue
        }
        const o = n.get(e);
        o === i ? s.has(e) || (s.add(e),
        ea(e, t, s, i, n, r)) : t.push(o)
    }
}
const ta = "!~{"
  , sa = "}~"
  , ia = new RegExp(`${ta}[0-9a-zA-Z_$]{1,59}${sa}`,"g")
  , na = (e,t)=>e.replace(ia, (e=>t.get(e) || e))
  , ra = (e,t,s)=>e.replace(ia, (e=>e === t ? s : e))
  , oa = (e,t)=>{
    const s = new Set
      , i = e.replace(ia, (e=>t.has(e) ? (s.add(e),
    `${ta}${"0".repeat(e.length - 5)}${sa}`) : e));
    return {
        containedPlaceholders: s,
        transformedCode: i
    }
}
  , aa = Symbol("bundleKeys")
  , la = {
    type: "placeholder"
};
function ha(e, t, s) {
    return L(e) ? ze(Ot(`Invalid pattern "${e}" for "${t}", patterns can be neither absolute nor relative paths. If you want your files to be stored in a subdirectory, write its name without a leading slash like this: subdirectory/pattern.`)) : e.replace(/\[(\w+)(:\d+)?]/g, ((e,i,n)=>{
        if (!s.hasOwnProperty(i) || n && "hash" !== i)
            return ze(Ot(`"[${i}${n || ""}]" is not a valid placeholder in the "${t}" pattern.`));
        const r = s[i](n && Number.parseInt(n.slice(1)));
        return L(r) ? ze(Ot(`Invalid substitution "${r}" for placeholder "[${i}]" in "${t}" pattern, can be neither absolute nor relative path.`)) : r
    }
    ))
}
function ca(e, {[aa]: t}) {
    if (!t.has(e.toLowerCase()))
        return e;
    const s = C(e);
    e = e.slice(0, Math.max(0, e.length - s.length));
    let i, n = 1;
    for (; t.has((i = e + ++n + s).toLowerCase()); )
        ;
    return i
}
const ua = new Set([".js", ".jsx", ".ts", ".tsx", ".mjs", ".mts", ".cjs", ".cts"]);
function da({id, variableName}, t, s, i) {
    const n = "function" == typeof t ? t(id) : t[id];
    return n || (s ? (i((r = id,
    o = variableName,
    {
        code: ot,
        id: r,
        message: `No name was provided for external module "${r}" in "output.globals" – guessing "${o}".`,
        names: [o],
        url: ke(Me)
    })),
    variableName) : void 0);
    var r, o
}
class pa {
    constructor(e, t, s, i, n, r, o, a, l, h, c, u, d, p, f) {
        this.orderedModules = e,
        this.inputOptions = t,
        this.outputOptions = s,
        this.unsetOptions = i,
        this.pluginDriver = n,
        this.modulesById = r,
        this.chunkByModule = o,
        this.externalChunkByModule = a,
        this.facadeChunkByModule = l,
        this.includedNamespaces = h,
        this.manualChunkAlias = c,
        this.getPlaceholder = u,
        this.bundle = d,
        this.inputBase = p,
        this.snippets = f,
        this.entryModules = [],
        this.exportMode = "named",
        this.facadeModule = null,
        this.namespaceVariableName = "",
        this.variableName = "",
        this.accessedGlobalsByScope = new Map,
        this.dependencies = new Set,
        this.dynamicEntryModules = [],
        this.dynamicName = null,
        this.exportNamesByVariable = new Map,
        this.exports = new Set,
        this.exportsByName = new Map,
        this.fileName = null,
        this.implicitEntryModules = [],
        this.implicitlyLoadedBefore = new Set,
        this.imports = new Set,
        this.includedDynamicImports = null,
        this.includedReexportsByModule = new Map,
        this.isEmpty = !0,
        this.name = null,
        this.needsExportsShim = !1,
        this.preRenderedChunkInfo = null,
        this.preliminaryFileName = null,
        this.renderedChunkInfo = null,
        this.renderedDependencies = null,
        this.renderedModules = Object.create(null),
        this.sortedExportNames = null,
        this.strictFacade = !1,
        this.execIndex = e.length > 0 ? e[0].execIndex : 1 / 0;
        const m = new Set(e);
        for (const t of e) {
            o.set(t, this),
            t.namespace.included && !s.preserveModules && h.add(t),
            this.isEmpty && t.isIncluded() && (this.isEmpty = !1),
            (t.info.isEntry || s.preserveModules) && this.entryModules.push(t);
            for (const e of t.includedDynamicImporters)
                m.has(e) || (this.dynamicEntryModules.push(t),
                t.info.syntheticNamedExports && (h.add(t),
                this.exports.add(t.namespace)));
            t.implicitlyLoadedAfter.size > 0 && this.implicitEntryModules.push(t)
        }
        this.suggestedVariableName = Ft(this.generateVariableName())
    }
    static generateFacade(e, t, s, i, n, r, o, a, l, h, c, u, d, p, f) {
        const m = new pa([],e,t,s,i,n,r,o,a,l,null,u,d,p,f);
        m.assignFacadeName(c, h),
        a.has(h) || a.set(h, m);
        for (const e of h.getDependenciesToBeIncluded())
            m.dependencies.add(e instanceof bo ? r.get(e) : o.get(e));
        return !m.dependencies.has(r.get(h)) && h.info.moduleSideEffects && h.hasEffects() && m.dependencies.add(r.get(h)),
        m.ensureReexportsAreAvailableForModule(h),
        m.facadeModule = h,
        m.strictFacade = !0,
        m
    }
    canModuleBeFacade(e, t) {
        const s = e.getExportNamesByVariable();
        for (const e of this.exports)
            if (!s.has(e))
                return !1;
        for (const i of t)
            if (!(i.module === e || s.has(i) || i instanceof Zr && s.has(i.getBaseVariable())))
                return !1;
        return !0
    }
    finalizeChunk(e, t, s) {
        const i = this.getRenderedChunkInfo()
          , n = e=>na(e, s)
          , r = this.fileName = n(i.fileName);
        return {
            ...i,
            code: e,
            dynamicImports: i.dynamicImports.map(n),
            fileName: r,
            implicitlyLoadedBefore: i.implicitlyLoadedBefore.map(n),
            importedBindings: Object.fromEntries(Object.entries(i.importedBindings).map((([e,t])=>[n(e), t]))),
            imports: i.imports.map(n),
            map: t,
            referencedFiles: i.referencedFiles.map(n)
        }
    }
    generateExports() {
        this.sortedExportNames = null;
        const e = new Set(this.exports);
        if (null !== this.facadeModule && (!1 !== this.facadeModule.preserveSignature || this.strictFacade)) {
            const t = this.facadeModule.getExportNamesByVariable();
            for (const [s,i] of t) {
                this.exportNamesByVariable.set(s, [...i]);
                for (const e of i)
                    this.exportsByName.set(e, s);
                e.delete(s)
            }
        }
        this.outputOptions.minifyInternalExports ? ((e, t, s) => {
            let i = 0;
            for (const n of e) {
                let[e] = n.name;
                if (t.has(e))
                    do {
                        e = bi(++i),
                        49 === e.charCodeAt(0) && (i += 9 * 64 ** (e.length - 1),
                        e = bi(i))
                    } while (Vt.has(e) || t.has(e));
                t.set(e, n),
                s.set(n, [e])
            }
        })(e, this.exportsByName, this.exportNamesByVariable) : ((e, t, s) => {
            for (const i of e) {
                let e = 0
                  , n = i.name;
                for (; t.has(n); )
                    n = `${i.name}$${++e}`;
                t.set(n, i),
                s.set(i, [n])
            }
        })(e, this.exportsByName, this.exportNamesByVariable),
        (this.outputOptions.preserveModules || this.facadeModule && this.facadeModule.info.isEntry) && (this.exportMode = Jo(this, this.outputOptions, this.facadeModule.id, this.inputOptions.onwarn))
    }
    generateFacades() {
        const e = []
          , t = new Set([...this.entryModules, ...this.implicitEntryModules])
          , s = new Set(this.dynamicEntryModules.map((({namespace: e})=>e)));
        for (const e of t)
            if (e.preserveSignature)
                for (const t of e.getExportNamesByVariable().keys())
                    this.chunkByModule.get(t.module) === this && s.add(t);
        for (const i of t) {
            const t = Array.from(new Set(i.chunkNames.filter((({isUserDefined: e})=>e)).map((({name: e})=>e))), (e=>({
                name: e
            })));
            if (0 === t.length && i.isUserDefinedEntryPoint && t.push({}),
            t.push(...Array.from(i.chunkFileNames, (e=>({
                fileName: e
            })))),
            0 === t.length && t.push({}),
            !this.facadeModule) {
                const e = !this.outputOptions.preserveModules && ("strict" === i.preserveSignature || "exports-only" === i.preserveSignature && i.getExportNamesByVariable().size > 0);
                e && !this.canModuleBeFacade(i, s) || (this.facadeModule = i,
                this.facadeChunkByModule.set(i, this),
                i.preserveSignature && (this.strictFacade = e),
                this.assignFacadeName(t.shift(), i, this.outputOptions.preserveModules))
            }
            for (const s of t)
                e.push(pa.generateFacade(this.inputOptions, this.outputOptions, this.unsetOptions, this.pluginDriver, this.modulesById, this.chunkByModule, this.externalChunkByModule, this.facadeChunkByModule, this.includedNamespaces, i, s, this.getPlaceholder, this.bundle, this.inputBase, this.snippets))
        }
        for (const e of this.dynamicEntryModules)
            e.info.syntheticNamedExports || (!this.facadeModule && this.canModuleBeFacade(e, s) ? (this.facadeModule = e,
            this.facadeChunkByModule.set(e, this),
            this.strictFacade = !0,
            this.dynamicName = fa(e)) : this.facadeModule === e && !this.strictFacade && this.canModuleBeFacade(e, s) ? this.strictFacade = !0 : this.facadeChunkByModule.get(e)?.strictFacade || (this.includedNamespaces.add(e),
            this.exports.add(e.namespace)));
        return this.outputOptions.preserveModules || this.addNecessaryImportsForFacades(),
        e
    }
    getChunkName() {
        return this.name ?? (this.name = this.outputOptions.sanitizeFileName(this.getFallbackChunkName()))
    }
    getExportNames() {
        return this.sortedExportNames ?? (this.sortedExportNames = [...this.exportsByName.keys()].sort())
    }
    getFileName() {
        return this.fileName || this.getPreliminaryFileName().fileName
    }
    getImportPath(e) {
        return T(B(e, this.getFileName(), "amd" === this.outputOptions.format && !this.outputOptions.amd.forceJsExtensionForImports, !0))
    }
    getPreliminaryFileName() {
        if (this.preliminaryFileName)
            return this.preliminaryFileName;
        let e, t = null;
        const {chunkFileNames: s, entryFileNames: i, file: n, format: r, preserveModules: o} = this.outputOptions;
        if (n)
            e = I(n);
        else if (null === this.fileName) {
            const [n,a] = o || this.facadeModule?.isUserDefinedEntryPoint ? [i, "output.entryFileNames"] : [s, "output.chunkFileNames"];
            e = ha("function" == typeof n ? n(this.getPreRenderedChunkInfo()) : n, a, {
                format: ()=>r,
                hash: e=>t || (t = this.getPlaceholder(a, e)),
                name: ()=>this.getChunkName()
            }),
            t || (e = ca(e, this.bundle))
        } else
            e = this.fileName;
        return t || (this.bundle[e] = la),
        this.preliminaryFileName = {
            fileName: e,
            hashPlaceholder: t
        }
    }
    getRenderedChunkInfo() {
        return this.renderedChunkInfo ? this.renderedChunkInfo : this.renderedChunkInfo = {
            ...this.getPreRenderedChunkInfo(),
            dynamicImports: this.getDynamicDependencies().map(xa),
            fileName: this.getFileName(),
            implicitlyLoadedBefore: Array.from(this.implicitlyLoadedBefore, xa),
            importedBindings: ga(this.getRenderedDependencies(), xa),
            imports: Array.from(this.dependencies, xa),
            modules: this.renderedModules,
            referencedFiles: this.getReferencedFiles()
        }
    }
    getVariableExportName(e) {
        return this.outputOptions.preserveModules && e instanceof Jr ? "*" : this.exportNamesByVariable.get(e)[0]
    }
    link() {
        this.dependencies = ((e, t, s, i) => {
            const n = []
              , r = new Set;
            for (let o = t.length - 1; o >= 0; o--) {
                const a = t[o];
                if (!r.has(a)) {
                    const t = [];
                    ea(a, t, r, e, s, i),
                    n.unshift(t)
                }
            }
            const o = new Set;
            for (const e of n)
                for (const t of e)
                    o.add(t);
            return o
        })(this, this.orderedModules, this.chunkByModule, this.externalChunkByModule);
        for (const e of this.orderedModules)
            this.addImplicitlyLoadedBeforeFromModule(e),
            this.setUpChunkImportsAndExportsForModule(e)
    }
    async render() {
        const {dependencies: e, exportMode: t, facadeModule: s, inputOptions: {onwarn: i}, outputOptions: n, pluginDriver: r, snippets: o} = this
          , {format: a, hoistTransitiveImports: l, preserveModules: h} = n;
        if (l && !h && null !== s)
            for (const t of e)
                t instanceof pa && this.inlineChunkDependencies(t);
        const c = this.getPreliminaryFileName()
          , {accessedGlobals: u, indent: d, magicString: p, renderedSource: f, usedModules: m, usesTopLevelAwait: g} = this.renderModules(c.fileName)
          , y = [...this.getRenderedDependencies().values()]
          , x = "none" === t ? [] : this.getChunkExportDeclarations(a);
        let b = x.length > 0
          , E = !1;
        for (const e of y) {
            const {reexports: t} = e;
            t?.length && (b = !0,
            !E && t.some((({reexported}) => "default" === reexported)) && (E = !0),
            "es" === a && (e.reexports = t.filter((({reexported: e})=>!x.find((({exported: t})=>t === e))))))
        }
        if (!E)
            for (const {exported: e} of x)
                if ("default" === e) {
                    E = !0;
                    break
                }
        const {intro: v, outro: S, banner: A, footer: k} = await Ho(n, r, this.getRenderedChunkInfo());
        return Go[a](f, {
            accessedGlobals: u,
            dependencies: y,
            exports: x,
            hasDefaultExport: E,
            hasExports: b,
            id: c.fileName,
            indent: d,
            intro: v,
            isEntryFacade: h || null !== s && s.info.isEntry,
            isModuleFacade: null !== s,
            namedExportsMode: "default" !== t,
            onwarn: i,
            outro: S,
            snippets: o,
            usesTopLevelAwait: g
        }, n),
        A && p.prepend(A),
        k && p.append(k),
        {
            chunk: this,
            magicString: p,
            preliminaryFileName: c,
            usedModules: m
        }
    }
    addImplicitlyLoadedBeforeFromModule({implicitlyLoadedBefore}) {
        const {chunkByModule: t, implicitlyLoadedBefore: s} = this;
        for (const i of implicitlyLoadedBefore) {
            const e = t.get(i);
            e && e !== this && s.add(e)
        }
    }
    addNecessaryImportsForFacades() {
        for (const [e,t] of this.includedReexportsByModule)
            if (this.includedNamespaces.has(e))
                for (const e of t)
                    this.imports.add(e)
    }
    assignFacadeName({fileName: e, name: t}, s, i) {
        e ? this.fileName = e : this.name = this.outputOptions.sanitizeFileName(t || (i ? this.getPreserveModulesChunkNameFromModule(s) : fa(s)))
    }
    checkCircularDependencyImport(e, t) {
        const s = e.module;
        if (s instanceof bo) {
            const l = this.chunkByModule.get(s);
            let h;
            do {
                if (h = t.alternativeReexportModules.get(e),
                h) {
                    this.chunkByModule.get(h) !== l && this.inputOptions.onwarn((i = s.getExportNamesByVariable().get(e)?.[0] || "*",
                    n = s.id,
                    r = h.id,
                    o = t.id,
                    a = this.outputOptions.preserveModules,
                    {
                        code: "CYCLIC_CROSS_CHUNK_REEXPORT",
                        exporter: n,
                        id: o,
                        message: `Export "${i}" of module "${D(n)}" was reexported through module "${D(r)}" while both modules are dependencies of each other and will end up in different chunks by current Rollup settings. This scenario is not well supported at the moment as it will produce a circular dependency between chunks and will likely lead to broken execution order.\nEither change the import in "${D(o)}" to point directly to the exporting module or ${a ? 'do not use "output.preserveModules"' : 'reconfigure "output.manualChunks"'} to ensure these modules end up in the same chunk.`,
                        reexporter: r
                    })),
                    t = h
                }
            } while (h)
        }
        var i, n, r, o, a
    }
    ensureReexportsAreAvailableForModule(e) {
        const t = []
          , s = e.getExportNamesByVariable();
        for (const i of s.keys()) {
            const s = i instanceof Zr
              , n = s ? i.getBaseVariable() : i;
            if (this.checkCircularDependencyImport(n, e),
            !(n instanceof Jr && this.outputOptions.preserveModules)) {
                const e = n.module;
                if (e instanceof bo) {
                    const i = this.chunkByModule.get(e);
                    i && i !== this && (i.exports.add(n),
                    t.push(n),
                    s && this.imports.add(n))
                }
            }
        }
        t.length > 0 && this.includedReexportsByModule.set(e, t)
    }
    generateVariableName() {
        if (this.manualChunkAlias)
            return this.manualChunkAlias;
        const e = this.entryModules[0] || this.implicitEntryModules[0] || this.dynamicEntryModules[0] || this.orderedModules[this.orderedModules.length - 1];
        return e ? fa(e) : "chunk"
    }
    getChunkExportDeclarations(e) {
        const t = [];
        for (const s of this.getExportNames()) {
            if ("*" === s[0])
                continue;
            const i = this.exportsByName.get(s);
            if (!(i instanceof Zr)) {
                const t = i.module;
                if (t) {
                    const i = this.chunkByModule.get(t);
                    if (i !== this) {
                        if (!i || "es" !== e)
                            continue;
                        const t = this.renderedDependencies.get(i);
                        if (!t)
                            continue;
                        const {imports: n, reexports: r} = t
                          , o = r?.find((({reexported: e})=>e === s))
                          , a = n?.find((({imported: e})=>e === o?.imported));
                        if (!a)
                            continue
                    }
                }
            }
            let n = null
              , r = !1
              , o = i.getName(this.snippets.getPropertyAccess);
            if (i instanceof ui) {
                for (const e of i.declarations)
                    if (e.parent instanceof zn || e instanceof Fn && e.declaration instanceof zn) {
                        r = !0;
                        break
                    }
            } else
                i instanceof Zr && (n = o,
                "es" === e && (o = i.renderName));
            t.push({
                exported: s,
                expression: n,
                hoisted: r,
                local: o
            })
        }
        return t
    }
    getDependenciesToBeDeconflicted(e, t, s) {
        const i = new Set
          , n = new Set
          , r = new Set;
        for (const t of [...this.exportNamesByVariable.keys(), ...this.imports])
            if (e || t.isNamespace) {
                const o = t.module;
                if (o instanceof jt) {
                    const a = this.externalChunkByModule.get(o);
                    i.add(a),
                    e && ("default" === t.name ? sr[s(o.id)] && n.add(a) : "*" === t.name && nr[s(o.id)] && r.add(a))
                } else {
                    const s = this.chunkByModule.get(o);
                    s !== this && (i.add(s),
                    e && "default" === s.exportMode && t.isNamespace && r.add(s))
                }
            }
        if (t)
            for (const e of this.dependencies)
                i.add(e);
        return {
            deconflictedDefault: n,
            deconflictedNamespace: r,
            dependencies: i
        }
    }
    getDynamicDependencies() {
        return this.getIncludedDynamicImports().map((({facadeChunk, chunk, externalChunk, resolution}) => facadeChunk || chunk || externalChunk || resolution)).filter((e=>e !== this && (e instanceof pa || e instanceof z)));
    }
    getDynamicImportStringAndAssertions(e, t) {
        if (e instanceof jt) {
            const s = this.externalChunkByModule.get(e);
            return [`'${s.getImportPath(t)}'`, s.getImportAssertions(this.snippets)]
        }
        return [e || "", "es" === this.outputOptions.format && this.outputOptions.externalImportAssertions || null]
    }
    getFallbackChunkName() {
        return this.manualChunkAlias ? this.manualChunkAlias : this.dynamicName ? this.dynamicName : this.fileName ? O(this.fileName) : O(this.orderedModules[this.orderedModules.length - 1].id)
    }
    getImportSpecifiers() {
        const {interop: e} = this.outputOptions
          , t = new Map;
        for (const s of this.imports) {
            const i = s.module;
            let n, r;
            if (i instanceof jt) {
                if (n = this.externalChunkByModule.get(i),
                r = s.name,
                "default" !== r && "*" !== r && "defaultOnly" === e(i.id))
                    return ze(Mt(i.id, r, !1))
            } else
                n = this.chunkByModule.get(i),
                r = n.getVariableExportName(s);
            F(t, n, U).push({
                imported: r,
                local: s.getName(this.snippets.getPropertyAccess)
            })
        }
        return t
    }
    getIncludedDynamicImports() {
        if (this.includedDynamicImports)
            return this.includedDynamicImports;
        const e = [];
        for (const t of this.orderedModules)
            for (const {node: s, resolution: i} of t.dynamicImports)
                s.included && e.push(i instanceof bo ? {
                    chunk: this.chunkByModule.get(i),
                    externalChunk: null,
                    facadeChunk: this.facadeChunkByModule.get(i),
                    node: s,
                    resolution: i
                } : i instanceof jt ? {
                    chunk: null,
                    externalChunk: this.externalChunkByModule.get(i),
                    facadeChunk: null,
                    node: s,
                    resolution: i
                } : {
                    chunk: null,
                    externalChunk: null,
                    facadeChunk: null,
                    node: s,
                    resolution: i
                });
        return this.includedDynamicImports = e
    }
    getPreRenderedChunkInfo() {
        if (this.preRenderedChunkInfo)
            return this.preRenderedChunkInfo;
        const {dynamicEntryModules: e, facadeModule: t, implicitEntryModules: s, orderedModules: i} = this;
        return this.preRenderedChunkInfo = {
            exports: this.getExportNames(),
            facadeModuleId: t && t.id,
            isDynamicEntry: e.length > 0,
            isEntry: !!t?.info.isEntry,
            isImplicitEntry: s.length > 0,
            moduleIds: i.map((({id: e})=>e)),
            name: this.getChunkName(),
            type: "chunk"
        }
    }
    getPreserveModulesChunkNameFromModule(e) {
        const t = ma(e);
        if (t)
            return t;
        const {preserveModulesRoot: s, sanitizeFileName: i} = this.outputOptions
          , n = i(w(e.id.split(ya, 1)[0]))
          , r = C(n)
          , o = ua.has(r) ? n.slice(0, -r.length) : n;
        return A(o) ? s && N(o).startsWith(s) ? o.slice(s.length).replace(/^[/\\]/, "") : $(this.inputBase, o) : `_virtual/${I(o)}`
    }
    getReexportSpecifiers() {
        const {externalLiveBindings: e, interop: t} = this.outputOptions
          , s = new Map;
        for (let i of this.getExportNames()) {
            let n, r, o = !1;
            if ("*" === i[0]) {
                const s = i.slice(1);
                "defaultOnly" === t(s) && this.inputOptions.onwarn(Tt(s)),
                o = e,
                n = this.externalChunkByModule.get(this.modulesById.get(s)),
                r = i = "*"
            } else {
                const s = this.exportsByName.get(i);
                if (s instanceof Zr)
                    continue;
                const a = s.module;
                if (a instanceof bo) {
                    if (n = this.chunkByModule.get(a),
                    n === this)
                        continue;
                    r = n.getVariableExportName(s),
                    o = s.isReassigned
                } else {
                    if (n = this.externalChunkByModule.get(a),
                    r = s.name,
                    "default" !== r && "*" !== r && "defaultOnly" === t(a.id))
                        return ze(Mt(a.id, r, !0));
                    o = e && ("default" !== r || ir(t(a.id), !0))
                }
            }
            F(s, n, U).push({
                imported: r,
                needsLiveBinding: o,
                reexported: i
            })
        }
        return s
    }
    getReferencedFiles() {
        const e = new Set;
        for (const t of this.orderedModules)
            for (const s of t.importMetas) {
                const t = s.getReferencedFileName(this.pluginDriver);
                t && e.add(t)
            }
        return [...e]
    }
    getRenderedDependencies() {
        if (this.renderedDependencies)
            return this.renderedDependencies;
        const e = this.getImportSpecifiers()
          , t = this.getReexportSpecifiers()
          , s = new Map
          , i = this.getFileName();
        for (const n of this.dependencies) {
            const r = e.get(n) || null
              , o = t.get(n) || null
              , a = n instanceof z || "default" !== n.exportMode
              , l = n.getImportPath(i);
            s.set(n, {
                assertions: n instanceof z ? n.getImportAssertions(this.snippets) : null,
                defaultVariableName: n.defaultVariableName,
                globalName: n instanceof z && ("umd" === this.outputOptions.format || "iife" === this.outputOptions.format) && da(n, this.outputOptions.globals, null !== (r || o), this.inputOptions.onwarn),
                importPath: l,
                imports: r,
                isChunk: n instanceof pa,
                name: n.variableName,
                namedExportsMode: a,
                namespaceVariableName: n.namespaceVariableName,
                reexports: o
            })
        }
        return this.renderedDependencies = s
    }
    inlineChunkDependencies({dependencies}) {
        for (const t of dependencies)
            this.dependencies.has(t) || (this.dependencies.add(t),
            t instanceof pa && this.inlineChunkDependencies(t))
    }
    renderModules(e) {
        const {accessedGlobalsByScope: t, dependencies: s, exportNamesByVariable: i, includedNamespaces: n, inputOptions: {onwarn: r}, isEmpty: o, orderedModules: a, outputOptions: c, pluginDriver: f, renderedModules: m, snippets: x} = this
          , {compact: b, dynamicImportFunction: E, format: v, freeze: S, namespaceToStringTag: A} = c
          , {_: k, cnst: w, n: I} = x;
        this.setDynamicImportResolutions(e),
        this.setImportMetaResolutions(e),
        this.setIdentifierRenderResolutions();
        const P = new (class e {
            constructor(e={}) {
                this.intro = e.intro || "",
                this.separator = void 0 !== e.separator ? e.separator : "\n",
                this.sources = [],
                this.uniqueSources = [],
                this.uniqueSourceIndexByFilename = {}
            }
            addSource(e) {
                if (e instanceof g)
                    return this.addSource({
                        content: e,
                        filename: e.filename,
                        separator: this.separator
                    });
                if (!u(e) || !e.content)
                    throw new Error("bundle.addSource() takes an object with a `content` property, which should be an instance of MagicString, and an optional `filename`");
                if (["filename", "ignoreList", "indentExclusionRanges", "separator"].forEach((t=>{
                    y.call(e, t) || (e[t] = e.content[t])
                }
                )),
                void 0 === e.separator && (e.separator = this.separator),
                e.filename)
                    if (y.call(this.uniqueSourceIndexByFilename, e.filename)) {
                        const t = this.uniqueSources[this.uniqueSourceIndexByFilename[e.filename]];
                        if (e.content.original !== t.content)
                            throw new Error(`Illegal source: same filename (${e.filename}), different contents`)
                    } else
                        this.uniqueSourceIndexByFilename[e.filename] = this.uniqueSources.length,
                        this.uniqueSources.push({
                            filename: e.filename,
                            content: e.content.original
                        });
                return this.sources.push(e),
                this
            }
            append(e, t) {
                return this.addSource({
                    content: new g(e),
                    separator: t && t.separator || ""
                }),
                this
            }
            clone() {
                const t = new e({
                    intro: this.intro,
                    separator: this.separator
                });
                return this.sources.forEach((({filename, content, separator}) => {
                    t.addSource({
                        filename: filename,
                        content: content.clone(),
                        separator: separator
                    })
                }
                )),
                t;
            }
            generateDecodedMap(e={}) {
                const t = [];
                let s;
                this.sources.forEach((({content}) => {
                    Object.keys(content.storedNames).forEach((e=>{
                        ~t.indexOf(e) || t.push(e)
                    }
                    ))
                }
                ));
                const i = new p(e.hires);
                return this.intro && i.advance(this.intro),
                this.sources.forEach((({filename, content, ignoreList}, n) => {
                    n > 0 && i.advance(this.separator);
                    const r = filename ? this.uniqueSourceIndexByFilename[filename] : -1
                      , o = content
                      , a = d(o.original);
                    o.intro && i.advance(o.intro),
                    o.firstChunk.eachNext((s=>{
                        const n = a(s.start);
                        s.intro.length && i.advance(s.intro),
                        filename ? s.edited ? i.addEdit(r, s.content, n, s.storeName ? t.indexOf(s.original) : -1) : i.addUneditedChunk(r, s, o.original, n, o.sourcemapLocations) : i.advance(s.content),
                        s.outro.length && i.advance(s.outro)
                    }
                    )),
                    o.outro && i.advance(o.outro),
                    ignoreList && -1 !== r && (void 0 === s && (s = []),
                    s.push(r))
                }
                )),
                {
                    file: e.file ? e.file.split(/[/\\]/).pop() : void 0,
                    sources: this.uniqueSources.map((({filename}) => e.file ? h(e.file, filename) : filename)),
                    sourcesContent: this.uniqueSources.map((({content}) => e.includeContent ? content : null)),
                    names: t,
                    mappings: i.raw,
                    x_google_ignoreList: s
                };
            }
            generateMap(e) {
                return new l(this.generateDecodedMap(e))
            }
            getIndentString() {
                const e = {};
                return this.sources.forEach((({content}) => {
                    const s = content._getRawIndentString();
                    null !== s && (e[s] || (e[s] = 0),
                    e[s] += 1)
                }
                )),
                Object.keys(e).sort(((t,s)=>e[t] - e[s]))[0] || "\t";
            }
            indent(e) {
                if (arguments.length || (e = this.getIndentString()),
                "" === e)
                    return this;
                let t = !this.intro || "\n" === this.intro.slice(-1);
                return this.sources.forEach((({separator, content, indentExclusionRanges}, i) => {
                    const n = void 0 !== separator ? separator : this.separator
                      , r = t || i > 0 && /\r?\n$/.test(n);
                    content.indent(e, {
                        exclude: indentExclusionRanges,
                        indentStart: r
                    }),
                    t = "\n" === content.lastChar()
                }
                )),
                this.intro && (this.intro = e + this.intro.replace(/^[^\n]/gm, ((t,s)=>s > 0 ? e + t : t))),
                this;
            }
            prepend(e) {
                return this.intro = e + this.intro,
                this
            }
            toString() {
                const e = this.sources.map((({separator, content}, t) => {
                    const s = void 0 !== separator ? separator : this.separator;
                    return (t > 0 ? s : "") + content.toString();
                }
                )).join("");
                return this.intro + e
            }
            isEmpty() {
                return !(this.intro.length && this.intro.trim() || this.sources.some((({content}) => !content.isEmpty())));
            }
            length() {
                return this.sources.reduce(((e, {content}) => e + content.length()), this.intro.length);
            }
            trimLines() {
                return this.trim("[\\r\\n]")
            }
            trim(e) {
                return this.trimStart(e).trimEnd(e)
            }
            trimStart(e) {
                const t = new RegExp(`^${e || "\\s"}+`);
                if (this.intro = this.intro.replace(t, ""),
                !this.intro) {
                    let t, s = 0;
                    do {
                        if (t = this.sources[s++],
                        !t)
                            break
                    } while (!t.content.trimStartAborted(e))
                }
                return this
            }
            trimEnd(e) {
                const t = new RegExp(`${e || "\\s"}+$`);
                let s, i = this.sources.length - 1;
                do {
                    if (s = this.sources[i--],
                    !s) {
                        this.intro = this.intro.replace(t, "");
                        break
                    }
                } while (!s.content.trimEndAborted(e));
                return this
            }
        })
        ({
            separator: `${I}${I}`
        })
          , C = ((e, {indent}) => {
            if (!0 !== indent)
                return indent;
            for (const t of e) {
                const e = Zo(t.originalCode);
                if (null !== e)
                    return e
            }
            return "\t"
        })(a, c)
          , $ = [];
        let N = "";
        const _ = new Set
          , R = new Map
          , M = {
            dynamicImportFunction: E,
            exportNamesByVariable: i,
            format: v,
            freeze: S,
            indent: C,
            namespaceToStringTag: A,
            pluginDriver: f,
            snippets: x,
            useOriginalName: null
        };
        let T = !1;
        for (const e of a) {
            let s, i = 0;
            if (e.isIncluded() || n.has(e)) {
                const r = e.render(M);
                ({source: s} = r),
                T || (T = r.usesTopLevelAwait),
                i = s.length(),
                i && (b && s.lastLine().includes("//") && s.append("\n"),
                R.set(e, s),
                P.addSource(s),
                $.push(e));
                const o = e.namespace;
                if (n.has(e)) {
                    const e = o.renderBlock(M);
                    o.renderFirst() ? N += I + e : P.addSource(new g(e))
                }
                const a = t.get(e.scope);
                if (a)
                    for (const e of a)
                        _.add(e)
            }
            const {renderedExports: r, removedExports: o} = e.getRenderedExports();
            m[e.id] = {
                get code() {
                    return s?.toString() ?? null
                },
                originalLength: e.originalCode.length,
                removedExports: o,
                renderedExports: r,
                renderedLength: i
            }
        }
        N && P.prepend(N + I + I),
        this.needsExportsShim && P.prepend(`${I}${w} ${Xr}${k}=${k}void 0;${I}${I}`);
        const O = b ? P : P.trim();
        let D;
        return o && 0 === this.getExportNames().length && 0 === s.size && r({
            code: "EMPTY_BUNDLE",
            message: `Generated an empty chunk: "${D = this.getChunkName()}".`,
            names: [D]
        }),
        {
            accessedGlobals: _,
            indent: C,
            magicString: P,
            renderedSource: O,
            usedModules: $,
            usesTopLevelAwait: T
        }
    }
    setDynamicImportResolutions(e) {
        const {accessedGlobalsByScope: t, outputOptions: s, pluginDriver: i, snippets: n} = this;
        for (const r of this.getIncludedDynamicImports())
            if (r.chunk) {
                const {chunk: o, facadeChunk: a, node: l, resolution: h} = r;
                o === this ? l.setInternalResolution(h.namespace) : l.setExternalResolution((a || o).exportMode, h, s, n, i, t, `'${(a || o).getImportPath(e)}'`, !a?.strictFacade && o.exportNamesByVariable.get(h.namespace)[0], null)
            } else {
                const {node: o, resolution: a} = r
                  , [l,h] = this.getDynamicImportStringAndAssertions(a, e);
                o.setExternalResolution("external", a, s, n, i, t, l, !1, h)
            }
    }
    setIdentifierRenderResolutions() {
        const {format: e, interop: t, namespaceToStringTag: s, preserveModules: i, externalLiveBindings: n} = this.outputOptions
          , r = new Set;
        for (const t of this.getExportNames()) {
            const s = this.exportsByName.get(t);
            "es" !== e && "system" !== e && s.isReassigned && !s.isId ? s.setRenderNames("exports", t) : s instanceof Zr ? r.add(s) : s.setRenderNames(null, null)
        }
        for (const e of this.orderedModules)
            if (e.needsExportShim) {
                this.needsExportsShim = !0;
                break
            }
        const o = new Set(["Object", "Promise"]);
        switch (this.needsExportsShim && o.add(Xr),
        s && o.add("Symbol"),
        e) {
        case "system":
            o.add("module").add("exports");
            break;
        case "es":
            break;
        case "cjs":
            o.add("module").add("require").add("__filename").add("__dirname");
        default:
            o.add("exports");
            for (const e of Er)
                o.add(e)
        }
        Yo(this.orderedModules, this.getDependenciesToBeDeconflicted("es" !== e && "system" !== e, "amd" === e || "umd" === e || "iife" === e, t), this.imports, o, e, t, i, n, this.chunkByModule, this.externalChunkByModule, r, this.exportNamesByVariable, this.accessedGlobalsByScope, this.includedNamespaces)
    }
    setImportMetaResolutions(e) {
        const {accessedGlobalsByScope: t, includedNamespaces: s, orderedModules: i, outputOptions: {format: n}} = this;
        for (const r of i) {
            for (const s of r.importMetas)
                s.setResolution(n, t, e);
            s.has(r) && r.namespace.prepare(t)
        }
    }
    setUpChunkImportsAndExportsForModule(e) {
        const t = new Set(e.includedImports);
        if (!this.outputOptions.preserveModules && this.includedNamespaces.has(e)) {
            const s = e.namespace.getMemberVariables();
            for (const e of Object.values(s))
                t.add(e)
        }
        for (let s of t) {
            s instanceof Wr && (s = s.getOriginalVariable()),
            s instanceof Zr && (s = s.getBaseVariable());
            const t = this.chunkByModule.get(s.module);
            t !== this && (this.imports.add(s),
            s.module instanceof bo && (this.checkCircularDependencyImport(s, e),
            s instanceof Jr && this.outputOptions.preserveModules || t.exports.add(s)))
        }
        (this.includedNamespaces.has(e) || e.info.isEntry && !1 !== e.preserveSignature || e.includedDynamicImporters.some((e=>this.chunkByModule.get(e) !== this))) && this.ensureReexportsAreAvailableForModule(e);
        for (const {node: t, resolution: s} of e.dynamicImports)
            t.included && s instanceof bo && this.chunkByModule.get(s) === this && !this.includedNamespaces.has(s) && (this.includedNamespaces.add(s),
            this.ensureReexportsAreAvailableForModule(s))
    }
}
function fa(e) {
    return ma(e) ?? O(e.id)
}
function ma({chunkNames}) {
    return chunkNames.find((({isUserDefined: e})=>e))?.name ?? chunkNames[0]?.name;
}
function ga(e, t) {
    const s = {};
    for (const [i,n] of e) {
        const e = new Set;
        if (n.imports)
            for (const {imported: t} of n.imports)
                e.add(t);
        if (n.reexports)
            for (const {imported: t} of n.reexports)
                e.add(t);
        s[t(i)] = [...e]
    }
    return s
}
const ya = /[#?]/
  , xa = e=>e.getFileName();
function *ba(e) {
    for (const t of e)
        yield*t
}
function Ea(e, t, s) {
    const {chunkDefinitions: i, modulesInManualChunks: n} = (e => {
        const t = []
          , s = new Set(e.keys())
          , i = Object.create(null);
        for (const [t,n] of e)
            va(t, i[n] || (i[n] = []), s);
        for (const [e,s] of Object.entries(i))
            t.push({
                alias: e,
                modules: s
            });
        return {
            chunkDefinitions: t,
            modulesInManualChunks: s
        }
    })(t)
      , {allEntries: r, dependentEntriesByModule: o, dynamicallyDependentEntriesByDynamicEntry: a, dynamicImportsByEntry: l} = (e => {
        const t = new Set
          , s = new Map
          , i = []
          , n = new Set(e);
        let r = 0;
        for (const e of n) {
            const o = new Set;
            i.push(o);
            const a = new Set([e]);
            for (const e of a) {
                F(s, e, j).add(r);
                for (const t of e.getDependenciesToBeIncluded())
                    t instanceof jt || a.add(t);
                for (const {resolution: s} of e.dynamicImports)
                    s instanceof bo && s.includedDynamicImporters.length > 0 && !n.has(s) && (t.add(s),
                    n.add(s),
                    o.add(s));
                for (const s of e.implicitlyLoadedBefore)
                    n.has(s) || (t.add(s),
                    n.add(s))
            }
            r++
        }
        const o = [...n]
          , {dynamicEntries: a, dynamicImportsByEntry: l} = ((e, t, s) => {
            const i = new Map
              , n = new Set;
            for (const [s,r] of e.entries())
                i.set(r, s),
                t.has(r) && n.add(s);
            const r = [];
            for (const e of s) {
                const t = new Set;
                for (const s of e)
                    t.add(i.get(s));
                r.push(t)
            }
            return {
                dynamicEntries: n,
                dynamicImportsByEntry: r
            }
        })(o, t, i);
        return {
            allEntries: o,
            dependentEntriesByModule: s,
            dynamicallyDependentEntriesByDynamicEntry: Sa(s, a, o),
            dynamicImportsByEntry: l
        }
    })(e)
      , h = Aa(function*(e, t) {
        for (const [s,i] of e)
            t.has(s) || (yield{
                dependentEntries: i,
                modules: [s]
            })
    }(o, n));
    return ((e, t, s, i) => {
        const n = i.map((()=>0n))
          , r = i.map(((e,s)=>t.has(s) ? -1n : 0n));
        let o = 1n;
        for (const {dependentEntries: t} of e) {
            for (const e of t)
                n[e] |= o;
            o <<= 1n
        }
        const a = t;
        for (const [e,t] of a) {
            a.delete(e);
            const i = r[e];
            let o = i;
            for (const e of t)
                o &= n[e] | r[e];
            if (o !== i) {
                r[e] = o;
                for (const t of s[e])
                    F(a, t, j).add(e)
            }
        }
        o = 1n;
        for (const {dependentEntries: t} of e) {
            for (const e of t)
                (r[e] & o) === o && t.delete(e);
            o <<= 1n
        }
    })(h, a, l, r), i.push(...((e, t, s) => {
        uo("optimize chunks", 3);
        const i = ((e, t, s) => {
            const i = []
              , n = []
              , r = new Map
              , o = [];
            let a = 0n
              , l = 1n;
            for (const {dependentEntries: t, modules: h} of e) {
                const e = {
                    containedAtoms: l,
                    correlatedAtoms: 0n,
                    dependencies: new Set,
                    dependentChunks: new Set,
                    dependentEntries: t,
                    modules: h,
                    pure: !0,
                    size: 0
                };
                let c = 0
                  , u = !0;
                for (const t of h)
                    r.set(t, e),
                    t.isIncluded() && (u && (u = !t.hasEffects()),
                    c += s > 1 ? t.estimateSize() : 1);
                e.pure = u,
                e.size = c,
                o.push(c),
                u || (a |= l),
                (c < s ? i : n).push(e),
                l <<= 1n
            }
            if (0 === i.length)
                return null;
            return a |= ((e, t, s, i) => {
                const n = new Map;
                let r = 0n;
                const o = [];
                for (let e = 0; e < s; e++)
                    o.push(0n);
                for (const s of e) {
                    s.sort(Ia);
                    for (const e of s) {
                        const {dependencies: s, dependentEntries: a, modules: l} = e;
                        for (const o of l)
                            for (const a of o.getDependenciesToBeIncluded())
                                if (a instanceof jt)
                                    a.info.moduleSideEffects && (e.containedAtoms |= F(n, a, (()=>{
                                        const e = i;
                                        return i <<= 1n,
                                        r |= e,
                                        e
                                    }
                                    )));
                                else {
                                    const i = t.get(a);
                                    i && i !== e && (s.add(i),
                                    i.dependentChunks.add(e))
                                }
                        const {containedAtoms: h} = e;
                        for (const e of a)
                            o[e] |= h
                    }
                }
                for (const t of e)
                    for (const e of t) {
                        const {dependentEntries: t} = e;
                        e.correlatedAtoms = -1n;
                        for (const s of t)
                            e.correlatedAtoms &= o[s]
                    }
                return r
            })([n, i], r, t, l),
            {
                big: new Set(n),
                sideEffectAtoms: a,
                sizeByAtom: o,
                small: new Set(i)
            };
        })(e, t, s);
        if (!i)
            return po("optimize chunks", 3),
            e;
        return s > 1 && console.log("Before eliminating small chunks, there were\n", e.length, "chunks, of which\n", i.small.size, "were below minChunkSize."), ((e, t) => {
            const {small: s} = e;
            for (const i of s) {
                const n = ka(i, e, t <= 1 ? 1 : 1 / 0);
                if (n) {
                    const {containedAtoms: r, correlatedAtoms: o, modules: a, pure: l, size: h} = i;
                    s.delete(i),
                    wa(n, t, e).delete(n),
                    n.modules.push(...a),
                    n.size += h,
                    n.pure && (n.pure = l);
                    const {dependencies: c, dependentChunks: u, dependentEntries: d} = n;
                    n.correlatedAtoms &= o,
                    n.containedAtoms |= r;
                    for (const e of i.dependentEntries)
                        d.add(e);
                    for (const e of i.dependencies)
                        c.add(e),
                        e.dependentChunks.delete(i),
                        e.dependentChunks.add(n);
                    for (const e of i.dependentChunks)
                        u.add(e),
                        e.dependencies.delete(i),
                        e.dependencies.add(n);
                    c.delete(n),
                    u.delete(n),
                    wa(n, t, e).add(n)
                }
            }
        })(i, s), s > 1 && console.log("After merging chunks,\n", i.small.size + i.big.size, "chunks remain, of which\n", i.small.size, "are below minChunkSize."), po("optimize chunks", 3), [...i.small, ...i.big];
    })(Aa(h), r.length, s).map((({modules: e})=>({
        alias: null,
        modules: e
    })))), i;
}
function va(e, t, s) {
    const i = new Set([e]);
    for (const e of i) {
        s.add(e),
        t.push(e);
        for (const t of e.dependencies)
            t instanceof jt || s.has(t) || i.add(t)
    }
}
function Sa(e, t, s) {
    const i = new Map;
    for (const n of t) {
        const t = F(i, n, j)
          , r = s[n];
        for (const s of ba([r.includedDynamicImporters, r.implicitlyLoadedAfter]))
            for (const i of e.get(s))
                t.add(i)
    }
    return i
}
function Aa(e) {
    var t;
    const s = Object.create(null);
    for (const {dependentEntries: i, modules: n} of e) {
        let e = 0n;
        for (const t of i)
            e |= 1n << BigInt(t);
        (s[t = String(e)] || (s[t] = {
            dependentEntries: new Set(i),
            modules: []
        })).modules.push(...n)
    }
    return Object.values(s)
}
function ka(e, {big: t, sideEffectAtoms: s, sizeByAtom: i, small: n}, r) {
    let o = null;
    for (const a of ba([n, t])) {
        if (e === a)
            continue;
        const t = Pa(e, a, r, s, i);
        if (t < r) {
            if (o = a,
            0 === t)
                break;
            r = t
        }
    }
    return o
}
function wa({size}, t, {small, big}) {
    return size < t ? small : big;
}
function Ia({size: e}, {size: t}) {
    return e - t
}
function Pa(e, t, s, i, n) {
    const r = Ca(e, t, s, i, n);
    return r < s ? r + Ca(t, e, s - r, i, n) : 1 / 0
}
function Ca({containedAtoms, dependencies}, t, s, i, n) {
    const {correlatedAtoms: r} = t;
    let o = containedAtoms;
    const a = o & i;
    if ((r & a) !== a)
        return 1 / 0;
    const l = new Set(dependencies);
    for (const {dependencies: e, containedAtoms: s} of l) {
        o |= s;
        const n = s & i;
        if ((r & n) !== n)
            return 1 / 0;
        for (const s of e) {
            if (s === t)
                return 1 / 0;
            l.add(s)
        }
    }
    return ((e, t, s) => {
        let i = 0
          , n = 0
          , r = 1n;
        const {length: o} = s;
        for (; n < o; n++)
            if ((e & r) === r && (i += s[n]),
            r <<= 1n,
            i >= t)
                return 1 / 0;
        return i
    })(o & ~r, s, n);
}
const $a = ({execIndex}, {execIndex}) => execIndex > execIndex ? 1 : -1;
function Na(e, t, s) {
    const i = Symbol(e.id)
      , n = [e.id];
    let r = t;
    for (e.cycles.add(i); r !== e; )
        r.cycles.add(i),
        n.push(r.id),
        r = s.get(r);
    return n.push(n[0]),
    n.reverse(),
    n
}
const _a = (e,t)=>t ? `(${e})` : e
  , Ra = /^(?!\d)[\w$]+$/;
class Ma {
    constructor(e, t) {
        this.isOriginal = !0,
        this.filename = e,
        this.content = t
    }
    traceSegment(e, t, s) {
        return {
            column: t,
            line: e,
            name: s,
            source: this
        }
    }
}
class Ta {
    constructor({names, mappings}, t) {
        this.sources = t,
        this.names = names,
        this.mappings = mappings
    }
    traceMappings() {
        const e = []
          , t = new Map
          , s = []
          , i = []
          , n = new Map
          , r = [];
        for (const o of this.mappings) {
            const a = [];
            for (const r of o) {
                if (1 === r.length)
                    continue;
                const o = this.sources[r[1]];
                if (!o)
                    continue;
                const l = o.traceSegment(r[2], r[3], 5 === r.length ? this.names[r[4]] : "");
                if (l) {
                    const {column: o, line: h, name: c, source: {content: u, filename: d}} = l;
                    let p = t.get(d);
                    if (void 0 === p)
                        p = e.length,
                        e.push(d),
                        t.set(d, p),
                        s[p] = u;
                    else if (null == s[p])
                        s[p] = u;
                    else if (null != u && s[p] !== u)
                        return ze(Rt(d));
                    const f = [r[0], p, h, o];
                    if (c) {
                        let e = n.get(c);
                        void 0 === e && (e = i.length,
                        i.push(c),
                        n.set(c, e)),
                        f[4] = e
                    }
                    a.push(f)
                }
            }
            r.push(a)
        }
        return {
            mappings: r,
            names: i,
            sources: e,
            sourcesContent: s
        }
    }
    traceSegment(e, t, s) {
        const i = this.mappings[e];
        if (!i)
            return null;
        let n = 0
          , r = i.length - 1;
        for (; n <= r; ) {
            const e = n + r >> 1
              , o = i[e];
            if (o[0] === t || n === r) {
                if (1 == o.length)
                    return null;
                const e = this.sources[o[1]];
                return e ? e.traceSegment(o[2], o[3], 5 === o.length ? this.names[o[4]] : s) : null
            }
            o[0] > t ? r = e - 1 : n = e + 1
        }
        return null
    }
}
function Oa(e) {
    return (t, s) => {
        return s.mappings ? new Ta(s,[t]) : (e((i = s.plugin,
        {
            code: ft,
            message: `Sourcemap is likely to be incorrect: a plugin (${i}) was used to transform files, but didn't generate a sourcemap for the transformation. Consult the plugin documentation for help`,
            plugin: i,
            url: ke(Ie)
        })),
        new Ta({
            mappings: [],
            names: []
        },[t]));
        var i
    };
}
function Da(e, t, s, i, n) {
    let r;
    if (s) {
        const t = s.sources
          , i = s.sourcesContent || []
          , n = P(e) || "."
          , o = s.sourceRoot || "."
          , a = t.map(((e,t)=>new Ma(N(n, o, e),i[t])));
        r = new Ta(s,a)
    } else
        r = new Ma(e,t);
    return i.reduce(n, r)
}
const La = {}, Va = Ba;
function Ba(e, t) {
    if (!e)
        throw new Error(t || "Assertion failed")
}
Ba.equal = (e, t, s) => {
    if (e != t)
        throw new Error(s || `Assertion failed: ${e} != ${t}`)
}
;
const za = {
    exports: {}
};
"function" == typeof Object.create ? za.exports = (e, t) => {
    t && (e.super_ = t,
    e.prototype = Object.create(t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }))
}
: za.exports = (e, t) => {
    if (t) {
        e.super_ = t;
        const s = () => {};
        s.prototype = t.prototype,
        e.prototype = new s,
        e.prototype.constructor = e
    }
}
;
const Fa = za.exports, ja = Va, Ua = Fa;
function Ga(e, t) {
    return 55296 == (64512 & e.charCodeAt(t)) && (!(t < 0 || t + 1 >= e.length) && 56320 == (64512 & e.charCodeAt(t + 1)))
}
function Wa(e) {
    return (e >>> 24 | e >>> 8 & 65280 | e << 8 & 16711680 | (255 & e) << 24) >>> 0
}
function qa(e) {
    return 1 === e.length ? `0${e}` : e;
}
function Ha(e) {
    return 7 === e.length ? `0${e}` : 6 === e.length ? `00${e}` : 5 === e.length ? `000${e}` : 4 === e.length ? `0000${e}` : 3 === e.length ? `00000${e}` : 2 === e.length ? `000000${e}` : 1 === e.length ? `0000000${e}` : e;
}
La.inherits = Ua,
La.toArray = (e, t) => {
    if (Array.isArray(e))
        return e.slice();
    if (!e)
        return [];
    const s = [];
    if ("string" == typeof e)
        if (t) {
            if ("hex" === t)
                for ((e = e.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 && (e = `0${e}`),
                n = 0; n < e.length; n += 2)
                    s.push(parseInt(e[n] + e[n + 1], 16))
        } else
            for (var i = 0, n = 0; n < e.length; n++) {
                let r = e.charCodeAt(n);
                r < 128 ? s[i++] = r : r < 2048 ? (s[i++] = r >> 6 | 192,
                s[i++] = 63 & r | 128) : Ga(e, n) ? (r = 65536 + ((1023 & r) << 10) + (1023 & e.charCodeAt(++n)),
                s[i++] = r >> 18 | 240,
                s[i++] = r >> 12 & 63 | 128,
                s[i++] = r >> 6 & 63 | 128,
                s[i++] = 63 & r | 128) : (s[i++] = r >> 12 | 224,
                s[i++] = r >> 6 & 63 | 128,
                s[i++] = 63 & r | 128)
            }
    else
        for (n = 0; n < e.length; n++)
            s[n] = 0 | e[n];
    return s
}
,
La.toHex = e => {
    for (var t = "", s = 0; s < e.length; s++)
        t += qa(e[s].toString(16));
    return t
}
,
La.htonl = Wa,
La.toHex32 = (e, t) => {
    for (var s = "", i = 0; i < e.length; i++) {
        let n = e[i];
        "little" === t && (n = Wa(n)),
        s += Ha(n.toString(16))
    }
    return s
}
,
La.zero2 = qa,
La.zero8 = Ha,
La.join32 = (e, t, s, i) => {
    const n = s - t;
    ja(n % 4 == 0);
    for (var r = new Array(n / 4), o = 0, a = t; o < r.length; o++,
    a += 4) {
        let l;
        l = "big" === i ? e[a] << 24 | e[a + 1] << 16 | e[a + 2] << 8 | e[a + 3] : e[a + 3] << 24 | e[a + 2] << 16 | e[a + 1] << 8 | e[a],
        r[o] = l >>> 0
    }
    return r
}
,
La.split32 = (e, t) => {
    for (var s = new Array(4 * e.length), i = 0, n = 0; i < e.length; i++,
    n += 4) {
        const r = e[i];
        "big" === t ? (s[n] = r >>> 24,
        s[n + 1] = r >>> 16 & 255,
        s[n + 2] = r >>> 8 & 255,
        s[n + 3] = 255 & r) : (s[n + 3] = r >>> 24,
        s[n + 2] = r >>> 16 & 255,
        s[n + 1] = r >>> 8 & 255,
        s[n] = 255 & r)
    }
    return s
}
,
La.rotr32 = (e, t) => e >>> t | e << 32 - t
,
La.rotl32 = (e, t) => e << t | e >>> 32 - t
,
La.sum32 = (e, t) => e + t >>> 0
,
La.sum32_3 = (e, t, s) => e + t + s >>> 0
,
La.sum32_4 = (e, t, s, i) => e + t + s + i >>> 0
,
La.sum32_5 = (e, t, s, i, n) => e + t + s + i + n >>> 0
,
La.sum64 = (e, t, s, i) => {
    const n = e[t], r = i + e[t + 1] >>> 0, o = (r < i ? 1 : 0) + s + n;
    e[t] = o >>> 0,
    e[t + 1] = r
}
,
La.sum64_hi = (e, t, s, i) => (t + i >>> 0 < t ? 1 : 0) + e + s >>> 0
,
La.sum64_lo = (e, t, s, i) => t + i >>> 0
,
La.sum64_4_hi = (e, t, s, i, n, r, o, a) => {
    let l = 0, h = t;
    return l += (h = h + i >>> 0) < t ? 1 : 0,
    l += (h = h + r >>> 0) < r ? 1 : 0,
    e + s + n + o + (l += (h = h + a >>> 0) < a ? 1 : 0) >>> 0
}
,
La.sum64_4_lo = (e, t, s, i, n, r, o, a) => t + i + r + a >>> 0
,
La.sum64_5_hi = (e, t, s, i, n, r, o, a, l, h) => {
    let c = 0, u = t;
    return c += (u = u + i >>> 0) < t ? 1 : 0,
    c += (u = u + r >>> 0) < r ? 1 : 0,
    c += (u = u + a >>> 0) < a ? 1 : 0,
    e + s + n + o + l + (c += (u = u + h >>> 0) < h ? 1 : 0) >>> 0
}
,
La.sum64_5_lo = (e, t, s, i, n, r, o, a, l, h) => t + i + r + a + h >>> 0
,
La.rotr64_hi = (e, t, s) => (t << 32 - s | e >>> s) >>> 0
,
La.rotr64_lo = (e, t, s) => (e << 32 - s | t >>> s) >>> 0
,
La.shr64_hi = (e, t, s) => e >>> s
,
La.shr64_lo = (e, t, s) => (e << 32 - s | t >>> s) >>> 0
;
const Ka = {}, Ya = La, Xa = Va;
function Qa() {
    this.pending = null,
    this.pendingTotal = 0,
    this.blockSize = this.constructor.blockSize,
    this.outSize = this.constructor.outSize,
    this.hmacStrength = this.constructor.hmacStrength,
    this.padLength = this.constructor.padLength / 8,
    this.endian = "big",
    this._delta8 = this.blockSize / 8,
    this._delta32 = this.blockSize / 32
}
Ka.BlockHash = Qa,
Qa.prototype.update = function(e, t) {
    if (e = Ya.toArray(e, t),
    this.pending ? this.pending = this.pending.concat(e) : this.pending = e,
    this.pendingTotal += e.length,
    this.pending.length >= this._delta8) {
        const s = (e = this.pending).length % this._delta8;
        this.pending = e.slice(e.length - s, e.length),
        0 === this.pending.length && (this.pending = null),
        e = Ya.join32(e, 0, e.length - s, this.endian);
        for (let i = 0; i < e.length; i += this._delta32)
            this._update(e, i, i + this._delta32)
    }
    return this
}
,
Qa.prototype.digest = function(e) {
    return this.update(this._pad()),
    Xa(null === this.pending),
    this._digest(e)
}
,
Qa.prototype._pad = function() {
    let e = this.pendingTotal;
    const t = this._delta8;
    const s = t - (e + this.padLength) % t;
    const i = new Array(s + this.padLength);
    i[0] = 128;
    for (var n = 1; n < s; n++)
        i[n] = 0;
    if (e <<= 3,
    "big" === this.endian) {
        for (var r = 8; r < this.padLength; r++)
            i[n++] = 0;
        i[n++] = 0,
        i[n++] = 0,
        i[n++] = 0,
        i[n++] = 0,
        i[n++] = e >>> 24 & 255,
        i[n++] = e >>> 16 & 255,
        i[n++] = e >>> 8 & 255,
        i[n++] = 255 & e
    } else
        for (i[n++] = 255 & e,
        i[n++] = e >>> 8 & 255,
        i[n++] = e >>> 16 & 255,
        i[n++] = e >>> 24 & 255,
        i[n++] = 0,
        i[n++] = 0,
        i[n++] = 0,
        i[n++] = 0,
        r = 8; r < this.padLength; r++)
            i[n++] = 0;
    return i
}
;
const Ja = {}, Za = La.rotr32;
function el(e, t, s) {
    return e & t ^ ~e & s
}
function tl(e, t, s) {
    return e & t ^ e & s ^ t & s
}
function sl(e, t, s) {
    return e ^ t ^ s
}
Ja.ft_1 = (e, t, s, i) => 0 === e ? el(t, s, i) : 1 === e || 3 === e ? sl(t, s, i) : 2 === e ? tl(t, s, i) : void 0
,
Ja.ch32 = el,
Ja.maj32 = tl,
Ja.p32 = sl,
Ja.s0_256 = e => Za(e, 2) ^ Za(e, 13) ^ Za(e, 22)
,
Ja.s1_256 = e => Za(e, 6) ^ Za(e, 11) ^ Za(e, 25)
,
Ja.g0_256 = e => Za(e, 7) ^ Za(e, 18) ^ e >>> 3
,
Ja.g1_256 = e => Za(e, 17) ^ Za(e, 19) ^ e >>> 10
;
const il = La, nl = Ka, rl = Ja, ol = Va, al = il.sum32, ll = il.sum32_4, hl = il.sum32_5, cl = rl.ch32, ul = rl.maj32, dl = rl.s0_256, pl = rl.s1_256, fl = rl.g0_256, ml = rl.g1_256, gl = nl.BlockHash, yl = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
function xl() {
    if (!(this instanceof xl))
        return new xl;
    gl.call(this),
    this.h = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225],
    this.k = yl,
    this.W = new Array(64)
}
il.inherits(xl, gl);
const bl = xl;
xl.blockSize = 512,
xl.outSize = 256,
xl.hmacStrength = 192,
xl.padLength = 64,
xl.prototype._update = function(e, t) {
    for (var s = this.W, i = 0; i < 16; i++)
        s[i] = e[t + i];
    for (; i < s.length; i++)
        s[i] = ll(ml(s[i - 2]), s[i - 7], fl(s[i - 15]), s[i - 16]);
    let n = this.h[0], r = this.h[1], o = this.h[2], a = this.h[3], l = this.h[4], h = this.h[5], c = this.h[6], u = this.h[7];
    for (ol(this.k.length === s.length),
    i = 0; i < s.length; i++) {
        const d = hl(u, pl(l), cl(l, h, c), this.k[i], s[i]), p = al(dl(n), ul(n, r, o));
        u = c,
        c = h,
        h = l,
        l = al(a, d),
        a = o,
        o = r,
        r = n,
        n = al(d, p)
    }
    this.h[0] = al(this.h[0], n),
    this.h[1] = al(this.h[1], r),
    this.h[2] = al(this.h[2], o),
    this.h[3] = al(this.h[3], a),
    this.h[4] = al(this.h[4], l),
    this.h[5] = al(this.h[5], h),
    this.h[6] = al(this.h[6], c),
    this.h[7] = al(this.h[7], u)
}
,
xl.prototype._digest = function(e) {
    return "hex" === e ? il.toHex32(this.h, "big") : il.split32(this.h, "big")
}
;
const El = t(bl);
const vl = ()=>El();
function Sl(e) {
    if (!e)
        return null;
    if ("string" == typeof e && (e = JSON.parse(e)),
    "" === e.mappings)
        return {
            mappings: [],
            names: [],
            sources: [],
            version: 3
        };
    const t = "string" == typeof e.mappings ? i.decode(e.mappings) : e.mappings;
    return {
        ...e,
        mappings: t
    }
}
async function Al(e, t, s, i, n) {
    uo("render chunks", 2), (e => {
        for (const t of e)
            t.facadeModule && t.facadeModule.isUserDefinedEntryPoint && t.getPreliminaryFileName()
    })(e);
    const r = await Promise.all(e.map((e=>e.render())));
    po("render chunks", 2),
    uo("transform chunks", 2);
    const o = (e => Object.fromEntries(e.map((e=>{
        const t = e.getRenderedChunkInfo();
        return [t.fileName, t]
    }
    ))))(e)
      , {nonHashedChunksWithPlaceholders: a, renderedChunksByPlaceholder: l, hashDependenciesByPlaceholder: h} = await (async (e, t, s, i, n) => {
        const r = []
          , o = new Map
          , a = new Map
          , l = new Set;
        for (const {preliminaryFileName: {hashPlaceholder: t}} of e)
            t && l.add(t);
        return await Promise.all(e.map((async({chunk: e, preliminaryFileName: {fileName: h, hashPlaceholder: c}, magicString: u, usedModules: d})=>{
            const p = {
                chunk: e,
                fileName: h,
                ...(await kl(u, h, d, t, s, i, n))
            }
              , {code: f} = p;
            if (c) {
                const {containedPlaceholders: t, transformedCode: s} = oa(f, l)
                  , n = vl().update(s)
                  , r = i.hookReduceValueSync("augmentChunkHash", "", [e.getRenderedChunkInfo()], ((e,t)=>(t && (e += t),
                e)));
                r && n.update(r),
                o.set(c, p),
                a.set(c, {
                    containedPlaceholders: t,
                    contentHash: n.digest("hex")
                })
            } else
                r.push(p)
        }
        ))),
        {
            hashDependenciesByPlaceholder: a,
            nonHashedChunksWithPlaceholders: r,
            renderedChunksByPlaceholder: o
        };
    })(r, o, i, s, n)
      , c = ((e, t, s) => {
        const i = new Map;
        for (const [n,{fileName: r}] of e) {
            let e = vl();
            const o = new Set([n]);
            for (const s of o) {
                const {containedPlaceholders: i, contentHash: n} = t.get(s);
                e.update(n);
                for (const e of i)
                    o.add(e)
            }
            let a, l;
            do {
                l && (e = vl().update(l)),
                l = e.digest("hex").slice(0, n.length),
                a = ra(r, n, l)
            } while (s[aa].has(a.toLowerCase()));
            s[a] = la,
            i.set(n, l)
        }
        return i
    })(l, h, t);
    !((e, t, s, i, n, r) => {
        for (const {chunk: i, code: o, fileName: a, map: l} of e.values()) {
            let e = na(o, t);
            const h = na(a, t);
            l && (l.file = na(l.file, t),
            e += wl(h, l, n, r)),
            s[h] = i.finalizeChunk(e, l, t)
        }
        for (const {chunk: e, code: o, fileName: a, map: l} of i) {
            let i = t.size > 0 ? na(o, t) : o;
            l && (i += wl(a, l, n, r)),
            s[a] = e.finalizeChunk(i, l, t)
        }
    })(l, c, t, a, s, i),
    po("transform chunks", 2)
}
async function kl(e, t, s, i, n, r, o) {
    let a = null;
    const h = [];
    let c = await r.hookReduceArg0("renderChunk", [e.toString(), i[t], n, {
        chunks: i
    }], ((e, t, {name}) => {
        if (null == t)
            return e;
        if ("string" == typeof t && (t = {
            code: t,
            map: void 0
        }),
        null !== t.map) {
            const e = Sl(t.map);
            h.push(e || {
                missing: !0,
                plugin: name
            })
        }
        return t.code
    }
    ));
    const {compact: u, dir: d, file: p, sourcemap: f, sourcemapExcludeSources: m, sourcemapFile: g, sourcemapPathTransform: y, sourcemapIgnoreList: x} = n;
    if (u || "\n" === c[c.length - 1] || (c += "\n"),
    f) {
        let i;
        uo("sourcemaps", 3),
        i = p ? N(g || p) : d ? N(d, t) : N(t);
        a = ((e, t, s, i, n, r) => {
            const o = Oa(r)
              , a = s.filter((({excludeFromSourcemap}) => !excludeFromSourcemap)).map((({id, originalCode, originalSourcemap, sourcemapChain}) => Da(id, originalCode, originalSourcemap, sourcemapChain, o)))
              , h = new Ta(t,a)
              , c = i.reduce(o, h);
            let {sources: u, sourcesContent: d, names: p, mappings: f} = c.traceMappings();
            if (e) {
                const t = P(e);
                u = u.map((e=>$(t, e))),
                e = I(e)
            }
            return d = n ? null : d,
            new l({
                file: e,
                mappings: f,
                names: p,
                sources: u,
                sourcesContent: d
            })
        })(i, e.generateDecodedMap({}), s, h, m, o);
        for (let e = 0; e < a.sources.length; ++e) {
            let t = a.sources[e];
            const s = `${i}.map`
              , n = x(t, s);
            "boolean" != typeof n && ze(Ot("sourcemapIgnoreList function must return a boolean.")),
            n && (void 0 === a.x_google_ignoreList && (a.x_google_ignoreList = []),
            a.x_google_ignoreList.includes(e) || a.x_google_ignoreList.push(e)),
            y && (t = y(t, s),
            "string" != typeof t && ze(Ot("sourcemapPathTransform function must return a string."))),
            a.sources[e] = w(t)
        }
        po("sourcemaps", 3)
    }
    return {
        code: c,
        map: a
    }
}
function wl(e, t, s, {sourcemap: i, sourcemapBaseUrl: n}) {
    let r;
    if ("inline" === i)
        r = t.toUrl();
    else {
        const i = `${I(e)}.map`;
        r = n ? new URL(i,n).toString() : i,
        s.emitFile({
            fileName: `${e}.map`,
            source: t.toString(),
            type: "asset"
        })
    }
    return "hidden" === i ? "" : `//# ${ws}=${r}\n`
}
class Il {
    constructor(e, t, s, i, n) {
        this.outputOptions = e,
        this.unsetOptions = t,
        this.inputOptions = s,
        this.pluginDriver = i,
        this.graph = n,
        this.facadeChunkByModule = new Map,
        this.includedNamespaces = new Set
    }
    async generate(e) {
        uo("GENERATE", 1);
        const t = Object.create(null)
          , s = (e=>{
            const t = new Set;
            return new Proxy(e,{
                deleteProperty: (e,s)=>("string" == typeof s && t.delete(s.toLowerCase()),
                Reflect.deleteProperty(e, s)),
                get: (e,s)=>s === aa ? t : Reflect.get(e, s),
                set: (e,s,i)=>("string" == typeof s && t.add(s.toLowerCase()),
                Reflect.set(e, s, i))
            })
        }
        )(t);
        this.pluginDriver.setOutputBundle(s, this.outputOptions);
        try {
            uo("initialize render", 2),
            await this.pluginDriver.hookParallel("renderStart", [this.outputOptions, this.inputOptions]),
            po("initialize render", 2),
            uo("generate chunks", 2);
            const e = (()=>{
                let e = 0;
                return (t,s=8)=>{
                    if (s > 64)
                        return ze(Ot(`Hashes cannot be longer than 64 characters, received ${s}. Check the "${t}" option.`));
                    const i = `${ta}${bi(++e).padStart(s - 5, "0")}${sa}`;
                    return i.length > s ? ze(Ot(`To generate hashes for this number of chunks (currently ${e}), you need a minimum hash size of ${i.length}, received ${s}. Check the "${t}" option.`)) : i
                }
            }
            )()
              , t = await this.generateChunks(s, e);
            t.length > 1 && (({format, file, sourcemapFile, amd}, t) => {
                if ("umd" === format || "iife" === format)
                    return ze(Ct("output.format", _e, "UMD and IIFE output formats are not supported for code-splitting builds", format));
                if ("string" == typeof file)
                    return ze(Ct("output.file", Ce, 'when building multiple chunks, the "output.dir" option must be used, not "output.file". To inline dynamic imports, set the "inlineDynamicImports" option'));
                if (sourcemapFile)
                    return ze(Ct("output.sourcemapFile", Ve, '"output.sourcemapFile" is only supported for single-file builds'));
                !amd.autoId && amd.id && t(Ct("output.amd.id", Pe, 'this option is only properly supported for single-file builds. Use "output.amd.autoId" and "output.amd.basePath" instead'))
            })(this.outputOptions, this.inputOptions.onwarn),
            this.pluginDriver.setChunkInformation(this.facadeChunkByModule);
            for (const e of t)
                e.generateExports();
            po("generate chunks", 2),
            await Al(t, s, this.pluginDriver, this.outputOptions, this.inputOptions.onwarn)
        } catch (e) {
            throw (await this.pluginDriver.hookParallel("renderError", [e]), e)
        }
        return (e=>{
            const t = new Set
              , s = Object.values(e);
            for (const e of s)
                "asset" === e.type && e.needsCodeReference && t.add(e.fileName);
            for (const e of s)
                if ("chunk" === e.type)
                    for (const s of e.referencedFiles)
                        t.has(s) && t.delete(s);
            for (const s of t)
                delete e[s]
        }
        )(s),
        uo("generate bundle", 2),
        await this.pluginDriver.hookSeq("generateBundle", [this.outputOptions, s, e]),
        this.finaliseAssets(s),
        po("generate bundle", 2),
        po("GENERATE", 1),
        t
    }
    async addManualChunks(e) {
        const t = new Map
          , s = await Promise.all(Object.entries(e).map((async([e,t])=>({
            alias: e,
            entries: await this.graph.moduleLoader.addAdditionalModules(t)
        }))));
        for (const {alias: e, entries: i} of s)
            for (const s of i)
                Pl(e, s, t);
        return t
    }
    assignManualChunks(e) {
        const t = []
          , s = {
            getModuleIds: ()=>this.graph.modulesById.keys(),
            getModuleInfo: this.graph.getModuleInfo
        };
        for (const i of this.graph.modulesById.values())
            if (i instanceof bo) {
                const n = e(i.id, s);
                "string" == typeof n && t.push([n, i])
            }
        t.sort((([e],[t])=>e > t ? 1 : e < t ? -1 : 0));
        const i = new Map;
        for (const [e,s] of t)
            Pl(e, s, i);
        return i
    }
    finaliseAssets(e) {
        if (this.outputOptions.validate)
            for (const t of Object.values(e))
                if ("code"in t)
                    try {
                        this.graph.contextParse(t.code, {
                            ecmaVersion: "latest"
                        })
                    } catch (e) {
                        this.inputOptions.onwarn(St(t, e))
                    }
        this.pluginDriver.finaliseAssets()
    }
    async generateChunks(e, t) {
        const {experimentalMinChunkSize: s, inlineDynamicImports: i, manualChunks: n, preserveModules: r} = this.outputOptions
          , o = "object" == typeof n ? await this.addManualChunks(n) : this.assignManualChunks(n)
          , a = ((
            {compact: e, generatedCode: {arrowFunctions: t, constBindings: s, objectShorthand: i, reservedNamesAsProps: n}}
        ) => {
            const {_: r, n: o, s: a} = e ? {
                _: "",
                n: "",
                s: ""
            } : {
                _: " ",
                n: "\n",
                s: ";"
            }
              , l = s ? "const" : "var"
              , h = (e,{isAsync: t, name: s})=>`${t ? "async " : ""}function ${s ? ` ${s}` : ""}${r}(${e.join(`,${r}`)})${r}`
              , c = t ? (e,{isAsync: t, name: s})=>{
                const i = 1 === e.length;
                return `${s ? `${l} ${s}${r}=${r}` : ""}${t ? `async ${i ? " " : r}` : ""}${i ? e[0] : `(${e.join(`,${r}`)})`}${r}=>${r}`
            }
            : h
              , u = (e,{functionReturn: s, lineBreakIndent: i, name: n})=>[`${c(e, {
                isAsync: !1,
                name: n
            })}${t ? i ? `${o}${i.base}${i.t}` : "" : `{${i ? `${o}${i.base}${i.t}` : r}${s ? "return " : ""}`}`, t ? `${n ? ";" : ""}${i ? `${o}${i.base}` : ""}` : `${a}${i ? `${o}${i.base}` : r}}`]
              , d = n ? e=>Ra.test(e) : e=>!Vt.has(e) && Ra.test(e);
            return {
                _: r,
                cnst: l,
                getDirectReturnFunction: u,
                getDirectReturnIifeLeft: (e,s,{needsArrowReturnParens: i, needsWrappedFunction: n})=>{
                    const [r,o] = u(e, {
                        functionReturn: !0,
                        lineBreakIndent: null,
                        name: null
                    });
                    return `${_a(`${r}${_a(s, t && i)}${o}`, t || n)}(`
                }
                ,
                getFunctionIntro: c,
                getNonArrowFunctionIntro: h,
                getObject(e, {lineBreakIndent: t}) {
                    const s = t ? `${o}${t.base}${t.t}` : r;
                    return `{${e.map((([e,t])=>{
                        if (null === e)
                            return `${s}${t}`;
                        const n = !d(e);
                        return e === t && i && !n ? s + e : `${s}${n ? `'${e}'` : e}:${r}${t}`
                    }
                    )).join(",")}${0 === e.length ? "" : t ? `${o}${t.base}` : r}}`
                },
                getPropertyAccess: e=>d(e) ? `.${e}` : `[${JSON.stringify(e)}]`,
                n: o,
                s: a
            }
        })(this.outputOptions)
          , l = (e => {
            const t = [];
            for (const s of e.values())
                s instanceof bo && (s.isIncluded() || s.info.isEntry || s.includedDynamicImporters.length > 0) && t.push(s);
            return t
        })(this.graph.modulesById)
          , h = (e => {
            if (0 === e.length)
                return "/";
            if (1 === e.length)
                return P(e[0]);
            const t = e.slice(1).reduce(((e,t)=>{
                const s = t.split(/\/+|\\+/);
                let i;
                for (i = 0; e[i] === s[i] && i < Math.min(e.length, s.length); i++)
                    ;
                return e.slice(0, i)
            }
            ), e[0].split(/\/+|\\+/));
            return t.length > 1 ? t.join("/") : "/"
        })(((e, t) => {
            const s = [];
            for (const i of e)
                (i.info.isEntry || t) && A(i.id) && s.push(i.id);
            return s
        })(l, r))
          , c = ((e, t, s) => {
            const i = new Map;
            for (const n of e.values())
                n instanceof jt && i.set(n, new z(n,t,s));
            return i
        })(this.graph.modulesById, this.outputOptions, h)
          , u = []
          , d = new Map;
        for (const {alias: n, modules: p} of i ? [{
            alias: null,
            modules: l
        }] : r ? l.map((e=>({
            alias: null,
            modules: [e]
        }))) : Ea(this.graph.entryModules, o, s)) {
            p.sort($a);
            const s = new pa(p,this.inputOptions,this.outputOptions,this.unsetOptions,this.pluginDriver,this.graph.modulesById,d,c,this.facadeChunkByModule,this.includedNamespaces,n,t,e,h,a);
            u.push(s)
        }
        for (const e of u)
            e.link();
        const p = [];
        for (const e of u)
            p.push(...e.generateFacades());
        return [...u, ...p]
    }
}
function Pl(e, t, s) {
    const i = s.get(t);
    if ("string" == typeof i && i !== e)
        return ze((n = t.id,
        r = e,
        o = i,
        {
            code: Ze,
            message: `Cannot assign "${D(n)}" to the "${r}" chunk as it is already in the "${o}" chunk.`
        }));
    var n, r, o;
    s.set(t, e)
}
const Cl = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 370, 1, 81, 2, 71, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 3, 0, 158, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 10, 1, 2, 0, 49, 6, 4, 4, 14, 9, 5351, 0, 7, 14, 13835, 9, 87, 9, 39, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4706, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 101, 0, 161, 6, 10, 9, 357, 0, 62, 13, 499, 13, 983, 6, 110, 6, 6, 9, 4759, 9, 787719, 239],
      $l = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 68, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 20, 1, 64, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 16, 0, 2, 12, 2, 33, 125, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1071, 18, 5, 4026, 582, 8634, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8936, 3, 2, 6, 2, 1, 2, 290, 16, 0, 30, 2, 3, 0, 15, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 7, 5, 262, 61, 147, 44, 11, 6, 17, 0, 322, 29, 19, 43, 485, 27, 757, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4153, 7, 221, 3, 5761, 15, 7472, 3104, 541, 1507, 4938, 6, 4191],
      Nl = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࡰ-ࢇࢉ-ࢎࢠ-ࣉऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౝౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೝೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜑᜟ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭌᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꟊꟐꟑꟓꟕ-ꟙꟲ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",
      _l = {
          3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
          5: "class enum extends super const export import",
          6: "enum",
          strict: "implements interface let package private protected public static yield",
          strictBind: "eval arguments"
      },
      Rl = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this",
      Ml = {
          5: Rl,
          "5module": `${Rl} export import`,
          6: `${Rl} const class extends export import super`
      },
      Tl = /^in(stanceof)?$/,
      Ol = new RegExp(`[${Nl}]`),
      Dl = new RegExp(`[${Nl}‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࢘-࢟࣊-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄ఼ా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ೳഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-໎໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜕ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠏-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿ-ᫎᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷿‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿]`);
function Ll(e, t) {
    for (let s = 65536, i = 0; i < t.length; i += 2) {
        if ((s += t[i]) > e)
            return !1;
        if ((s += t[i + 1]) >= e)
            return !0
    }
    return !1
}
function Vl(e, t) {
    return e < 65 ? 36 === e : e < 91 || (e < 97 ? 95 === e : e < 123 || (e <= 65535 ? e >= 170 && Ol.test(String.fromCharCode(e)) : !1 !== t && Ll(e, $l)))
}
function Bl(e, t) {
    return e < 48 ? 36 === e : e < 58 || !(e < 65) && (e < 91 || (e < 97 ? 95 === e : e < 123 || (e <= 65535 ? e >= 170 && Dl.test(String.fromCharCode(e)) : !1 !== t && (Ll(e, $l) || Ll(e, Cl)))))
}
const zl = function(e, t) {
    void 0 === t && (t = {}),
    this.label = e,
    this.keyword = t.keyword,
    this.beforeExpr = !!t.beforeExpr,
    this.startsExpr = !!t.startsExpr,
    this.isLoop = !!t.isLoop,
    this.isAssign = !!t.isAssign,
    this.prefix = !!t.prefix,
    this.postfix = !!t.postfix,
    this.binop = t.binop || null,
    this.updateContext = null
};
function Fl(e, t) {
    return new zl(e,{
        beforeExpr: !0,
        binop: t
    })
}
const jl = {
          beforeExpr: !0
      },
      Ul = {
          startsExpr: !0
      },
      Gl = {};
function Wl(e, t) {
    return void 0 === t && (t = {}),
    t.keyword = e,
    Gl[e] = new zl(e,t)
}
const ql = {
          num: new zl("num",Ul),
          regexp: new zl("regexp",Ul),
          string: new zl("string",Ul),
          name: new zl("name",Ul),
          privateId: new zl("privateId",Ul),
          eof: new zl("eof"),
          bracketL: new zl("[",{
              beforeExpr: !0,
              startsExpr: !0
          }),
          bracketR: new zl("]"),
          braceL: new zl("{",{
              beforeExpr: !0,
              startsExpr: !0
          }),
          braceR: new zl("}"),
          parenL: new zl("(",{
              beforeExpr: !0,
              startsExpr: !0
          }),
          parenR: new zl(")"),
          comma: new zl(",",jl),
          semi: new zl(";",jl),
          colon: new zl(":",jl),
          dot: new zl("."),
          question: new zl("?",jl),
          questionDot: new zl("?."),
          arrow: new zl("=>",jl),
          template: new zl("template"),
          invalidTemplate: new zl("invalidTemplate"),
          ellipsis: new zl("...",jl),
          backQuote: new zl("`",Ul),
          dollarBraceL: new zl("${",{
              beforeExpr: !0,
              startsExpr: !0
          }),
          eq: new zl("=",{
              beforeExpr: !0,
              isAssign: !0
          }),
          assign: new zl("_=",{
              beforeExpr: !0,
              isAssign: !0
          }),
          incDec: new zl("++/--",{
              prefix: !0,
              postfix: !0,
              startsExpr: !0
          }),
          prefix: new zl("!/~",{
              beforeExpr: !0,
              prefix: !0,
              startsExpr: !0
          }),
          logicalOR: Fl("||", 1),
          logicalAND: Fl("&&", 2),
          bitwiseOR: Fl("|", 3),
          bitwiseXOR: Fl("^", 4),
          bitwiseAND: Fl("&", 5),
          equality: Fl("==/!=/===/!==", 6),
          relational: Fl("</>/<=/>=", 7),
          bitShift: Fl("<</>>/>>>", 8),
          plusMin: new zl("+/-",{
              beforeExpr: !0,
              binop: 9,
              prefix: !0,
              startsExpr: !0
          }),
          modulo: Fl("%", 10),
          star: Fl("*", 10),
          slash: Fl("/", 10),
          starstar: new zl("**",{
              beforeExpr: !0
          }),
          coalesce: Fl("??", 1),
          _break: Wl("break"),
          _case: Wl("case", jl),
          _catch: Wl("catch"),
          _continue: Wl("continue"),
          _debugger: Wl("debugger"),
          _default: Wl("default", jl),
          _do: Wl("do", {
              isLoop: !0,
              beforeExpr: !0
          }),
          _else: Wl("else", jl),
          _finally: Wl("finally"),
          _for: Wl("for", {
              isLoop: !0
          }),
          _function: Wl("function", Ul),
          _if: Wl("if"),
          _return: Wl("return", jl),
          _switch: Wl("switch"),
          _throw: Wl("throw", jl),
          _try: Wl("try"),
          _var: Wl("var"),
          _const: Wl("const"),
          _while: Wl("while", {
              isLoop: !0
          }),
          _with: Wl("with"),
          _new: Wl("new", {
              beforeExpr: !0,
              startsExpr: !0
          }),
          _this: Wl("this", Ul),
          _super: Wl("super", Ul),
          _class: Wl("class", Ul),
          _extends: Wl("extends", jl),
          _export: Wl("export"),
          _import: Wl("import", Ul),
          _null: Wl("null", Ul),
          _true: Wl("true", Ul),
          _false: Wl("false", Ul),
          _in: Wl("in", {
              beforeExpr: !0,
              binop: 7
          }),
          _instanceof: Wl("instanceof", {
              beforeExpr: !0,
              binop: 7
          }),
          _typeof: Wl("typeof", {
              beforeExpr: !0,
              prefix: !0,
              startsExpr: !0
          }),
          _void: Wl("void", {
              beforeExpr: !0,
              prefix: !0,
              startsExpr: !0
          }),
          _delete: Wl("delete", {
              beforeExpr: !0,
              prefix: !0,
              startsExpr: !0
          })
      },
      Hl = /\r\n?|\n|\u2028|\u2029/,
      Kl = new RegExp(Hl.source,"g");
function Yl(e) {
    return 10 === e || 13 === e || 8232 === e || 8233 === e
}
function Xl(e, t, s) {
    void 0 === s && (s = e.length);
    for (let i = t; i < s; i++) {
        const n = e.charCodeAt(i);
        if (Yl(n))
            return i < s - 1 && 13 === n && 10 === e.charCodeAt(i + 1) ? i + 2 : i + 1
    }
    return -1
}
const Ql = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/, Jl = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g, Zl = Object.prototype, eh = Zl.hasOwnProperty, th = Zl.toString, sh = Object.hasOwn || ((e, t) => eh.call(e, t)), ih = Array.isArray || (e => "[object Array]" === th.call(e));
function nh(e) {
    return new RegExp(`^(?:${e.replace(/ /g, "|")})$`);
}
function rh(e) {
    return e <= 65535 ? String.fromCharCode(e) : (e -= 65536,
    String.fromCharCode(55296 + (e >> 10), 56320 + (1023 & e)))
}
const oh = /(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/,
      ah = function(e, t) {
          this.line = e,
          this.column = t
      };
ah.prototype.offset = function(e) {
    return new ah(this.line,this.column + e)
}
;
const lh = function({sourceFile}, t, s) {
    this.start = t,
    this.end = s,
    null !== sourceFile && (this.source = sourceFile)
};
function hh(e, t) {
    for (let s = 1, i = 0; ; ) {
        const n = Xl(e, i, t);
        if (n < 0)
            return new ah(s,t - i);
        ++s,
        i = n
    }
}

const ch = {
    ecmaVersion: null,
    sourceType: "script",
    onInsertedSemicolon: null,
    onTrailingComma: null,
    allowReserved: null,
    allowReturnOutsideFunction: !1,
    allowImportExportEverywhere: !1,
    allowAwaitOutsideFunction: null,
    allowSuperOutsideMethod: null,
    allowHashBang: !1,
    locations: !1,
    onToken: null,
    onComment: null,
    ranges: !1,
    program: null,
    sourceFile: null,
    directSourceFile: null,
    preserveParens: !1
};

let uh = !1;
function dh(e) {
    const t = {};
    for (const s in ch)
        t[s] = e && sh(e, s) ? e[s] : ch[s];
    if ("latest" === t.ecmaVersion ? t.ecmaVersion = 1e8 : null == t.ecmaVersion ? (!uh && "object" == typeof console && console.warn && (uh = !0,
    console.warn("Since Acorn 8.0.0, options.ecmaVersion is required.\nDefaulting to 2020, but this will stop working in the future.")),
    t.ecmaVersion = 11) : t.ecmaVersion >= 2015 && (t.ecmaVersion -= 2009),
    null == t.allowReserved && (t.allowReserved = t.ecmaVersion < 5),
    e && null != e.allowHashBang || (t.allowHashBang = t.ecmaVersion >= 14),
    ih(t.onToken)) {
        const i = t.onToken;
        t.onToken = e => i.push(e)
    }
    return ih(t.onComment) && (t.onComment = (({locations, ranges}, t) => (function(s, i, n, r, o, a) {
        const l = {
            type: s ? "Block" : "Line",
            value: i,
            start: n,
            end: r
        };
        locations && (l.loc = new lh(this,o,a)),
        ranges && (l.range = [n, r]),
        t.push(l)
    }))(t, t.onComment)),
    t;
}
const ph = 256;
function fh(e, t) {
    return 2 | (e ? 4 : 0) | (t ? 8 : 0)
}
const mh = function(e, t, s) {
          this.options = e = dh(e),
          this.sourceFile = e.sourceFile,
          this.keywords = nh(Ml[e.ecmaVersion >= 6 ? 6 : "module" === e.sourceType ? "5module" : 5]);
          let i = "";
          !0 !== e.allowReserved && (i = _l[e.ecmaVersion >= 6 ? 6 : 5 === e.ecmaVersion ? 5 : 3],
          "module" === e.sourceType && (i += " await")),
          this.reservedWords = nh(i);
          const n = (i ? `${i} ` : "") + _l.strict;
          this.reservedWordsStrict = nh(n),
          this.reservedWordsStrictBind = nh(`${n} ${_l.strictBind}`),
          this.input = String(t),
          this.containsEsc = !1,
          s ? (this.pos = s,
          this.lineStart = this.input.lastIndexOf("\n", s - 1) + 1,
          this.curLine = this.input.slice(0, this.lineStart).split(Hl).length) : (this.pos = this.lineStart = 0,
          this.curLine = 1),
          this.type = ql.eof,
          this.value = null,
          this.start = this.end = this.pos,
          this.startLoc = this.endLoc = this.curPosition(),
          this.lastTokEndLoc = this.lastTokStartLoc = null,
          this.lastTokStart = this.lastTokEnd = this.pos,
          this.context = this.initialContext(),
          this.exprAllowed = !0,
          this.inModule = "module" === e.sourceType,
          this.strict = this.inModule || this.strictDirective(this.pos),
          this.potentialArrowAt = -1,
          this.potentialArrowInForAwait = !1,
          this.yieldPos = this.awaitPos = this.awaitIdentPos = 0,
          this.labels = [],
          this.undefinedExports = Object.create(null),
          0 === this.pos && e.allowHashBang && "#!" === this.input.slice(0, 2) && this.skipLineComment(2),
          this.scopeStack = [],
          this.enterScope(1),
          this.regexpState = null,
          this.privateNameStack = []
      },
      gh = {
          inFunction: {
              configurable: !0
          },
          inGenerator: {
              configurable: !0
          },
          inAsync: {
              configurable: !0
          },
          canAwait: {
              configurable: !0
          },
          allowSuper: {
              configurable: !0
          },
          allowDirectSuper: {
              configurable: !0
          },
          treatFunctionsAsVar: {
              configurable: !0
          },
          allowNewDotTarget: {
              configurable: !0
          },
          inClassStaticBlock: {
              configurable: !0
          }
      };
mh.prototype.parse = function() {
    const e = this.options.program || this.startNode();
    return this.nextToken(),
    this.parseTopLevel(e)
}
,
gh.inFunction.get = function() {
    return (2 & this.currentVarScope().flags) > 0
}
,
gh.inGenerator.get = function() {
    return (8 & this.currentVarScope().flags) > 0 && !this.currentVarScope().inClassFieldInit
}
,
gh.inAsync.get = function() {
    return (4 & this.currentVarScope().flags) > 0 && !this.currentVarScope().inClassFieldInit
}
,
gh.canAwait.get = function() {
    for (let e = this.scopeStack.length - 1; e >= 0; e--) {
        const t = this.scopeStack[e];
        if (t.inClassFieldInit || t.flags & ph)
            return !1;
        if (2 & t.flags)
            return (4 & t.flags) > 0
    }
    return this.inModule && this.options.ecmaVersion >= 13 || this.options.allowAwaitOutsideFunction
}
,
gh.allowSuper.get = function() {
    const e = this.currentThisScope(), t = e.flags, s = e.inClassFieldInit;
    return (64 & t) > 0 || s || this.options.allowSuperOutsideMethod
}
,
gh.allowDirectSuper.get = function() {
    return (128 & this.currentThisScope().flags) > 0
}
,
gh.treatFunctionsAsVar.get = function() {
    return this.treatFunctionsAsVarInScope(this.currentScope())
}
,
gh.allowNewDotTarget.get = function() {
    const e = this.currentThisScope(), t = e.flags, s = e.inClassFieldInit;
    return (258 & t) > 0 || s
}
,
gh.inClassStaticBlock.get = function() {
    return (this.currentVarScope().flags & ph) > 0
}
,
mh.extend = function(...args) {
    for (var e = [], t = args.length; t--; )
        e[t] = args[t];
    for (var s = this, i = 0; i < e.length; i++)
        s = e[i](s);
    return s
}
,
mh.parse = function(e, t) {
    return new this(t,e).parse()
}
,
mh.parseExpressionAt = function(e, t, s) {
    const i = new this(s,e,t);
    return i.nextToken(),
    i.parseExpression()
}
,
mh.tokenizer = function(e, t) {
    return new this(t,e)
}
,
Object.defineProperties(mh.prototype, gh);
const yh = mh.prototype, xh = /^(?:'((?:\\.|[^'\\])*?)'|"((?:\\.|[^"\\])*?)")/;
yh.strictDirective = function(e) {
    if (this.options.ecmaVersion < 5)
        return !1;
    for (; ; ) {
        Jl.lastIndex = e,
        e += Jl.exec(this.input)[0].length;
        const t = xh.exec(this.input.slice(e));
        if (!t)
            return !1;
        if ("use strict" === (t[1] || t[2])) {
            Jl.lastIndex = e + t[0].length;
            const s = Jl.exec(this.input), i = s.index + s[0].length, n = this.input.charAt(i);
            return ";" === n || "}" === n || Hl.test(s[0]) && !(/[(`.[+\-/*%<>=,?^&]/.test(n) || "!" === n && "=" === this.input.charAt(i + 1))
        }
        e += t[0].length,
        Jl.lastIndex = e,
        e += Jl.exec(this.input)[0].length,
        ";" === this.input[e] && e++
    }
}
,
yh.eat = function(e) {
    return this.type === e && (this.next(),
    !0)
}
,
yh.isContextual = function(e) {
    return this.type === ql.name && this.value === e && !this.containsEsc
}
,
yh.eatContextual = function(e) {
    return !!this.isContextual(e) && (this.next(),
    !0)
}
,
yh.expectContextual = function(e) {
    this.eatContextual(e) || this.unexpected()
}
,
yh.canInsertSemicolon = function() {
    return this.type === ql.eof || this.type === ql.braceR || Hl.test(this.input.slice(this.lastTokEnd, this.start))
}
,
yh.insertSemicolon = function() {
    if (this.canInsertSemicolon())
        return this.options.onInsertedSemicolon && this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc),
        !0
}
,
yh.semicolon = function() {
    this.eat(ql.semi) || this.insertSemicolon() || this.unexpected()
}
,
yh.afterTrailingComma = function(e, t) {
    if (this.type === e)
        return this.options.onTrailingComma && this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc),
        t || this.next(),
        !0
}
,
yh.expect = function(e) {
    this.eat(e) || this.unexpected()
}
,
yh.unexpected = function(e) {
    this.raise(null != e ? e : this.start, "Unexpected token")
}
;
const bh = function() {
    this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1
};
yh.checkPatternErrors = function(e, t) {
    if (e) {
        e.trailingComma > -1 && this.raiseRecoverable(e.trailingComma, "Comma is not permitted after the rest element");
        const s = t ? e.parenthesizedAssign : e.parenthesizedBind;
        s > -1 && this.raiseRecoverable(s, t ? "Assigning to rvalue" : "Parenthesized pattern")
    }
}
,
yh.checkExpressionErrors = function(e, t) {
    if (!e)
        return !1;
    const s = e.shorthandAssign, i = e.doubleProto;
    if (!t)
        return s >= 0 || i >= 0;
    s >= 0 && this.raise(s, "Shorthand property assignments are valid only in destructuring patterns"),
    i >= 0 && this.raiseRecoverable(i, "Redefinition of __proto__ property")
}
,
yh.checkYieldAwaitInDefaultParams = function() {
    this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos) && this.raise(this.yieldPos, "Yield expression cannot be a default value"),
    this.awaitPos && this.raise(this.awaitPos, "Await expression cannot be a default value")
}
,
yh.isSimpleAssignTarget = function({type, expression}) {
    return "ParenthesizedExpression" === type ? this.isSimpleAssignTarget(expression) : "Identifier" === type || "MemberExpression" === type;
}
;
const Eh = mh.prototype;
Eh.parseTopLevel = function(e) {
    const t = Object.create(null);
    for (e.body || (e.body = []); this.type !== ql.eof; ) {
        const s = this.parseStatement(null, !0, t);
        e.body.push(s)
    }
    if (this.inModule)
        for (let i = 0, n = Object.keys(this.undefinedExports); i < n.length; i += 1) {
            const r = n[i];
            this.raiseRecoverable(this.undefinedExports[r].start, `Export '${r}' is not defined`)
        }
    return this.adaptDirectivePrologue(e.body),
    this.next(),
    e.sourceType = this.options.sourceType,
    this.finishNode(e, "Program")
}
;
const vh = {
          kind: "loop"
      },
      Sh = {
          kind: "switch"
      };
Eh.isLet = function(e) {
    if (this.options.ecmaVersion < 6 || !this.isContextual("let"))
        return !1;
    Jl.lastIndex = this.pos;
    const t = Jl.exec(this.input);
    const s = this.pos + t[0].length;
    let i = this.input.charCodeAt(s);
    if (91 === i || 92 === i)
        return !0;
    if (e)
        return !1;
    if (123 === i || i > 55295 && i < 56320)
        return !0;
    if (Vl(i, !0)) {
        for (var n = s + 1; Bl(i = this.input.charCodeAt(n), !0); )
            ++n;
        if (92 === i || i > 55295 && i < 56320)
            return !0;
        const r = this.input.slice(s, n);
        if (!Tl.test(r))
            return !0
    }
    return !1
}
,
Eh.isAsyncFunction = function() {
    if (this.options.ecmaVersion < 8 || !this.isContextual("async"))
        return !1;
    Jl.lastIndex = this.pos;
    let e;
    const t = Jl.exec(this.input);
    const s = this.pos + t[0].length;
    return !(Hl.test(this.input.slice(this.pos, s)) || "function" !== this.input.slice(s, s + 8) || s + 8 !== this.input.length && (Bl(e = this.input.charCodeAt(s + 8)) || e > 55295 && e < 56320))
}
,
Eh.parseStatement = function(e, t, s) {
    let i;
    let n = this.type;
    const r = this.startNode();
    switch (this.isLet(e) && (n = ql._var,
    i = "let"),
    n) {
    case ql._break:
    case ql._continue:
        return this.parseBreakContinueStatement(r, n.keyword);
    case ql._debugger:
        return this.parseDebuggerStatement(r);
    case ql._do:
        return this.parseDoStatement(r);
    case ql._for:
        return this.parseForStatement(r);
    case ql._function:
        return e && (this.strict || "if" !== e && "label" !== e) && this.options.ecmaVersion >= 6 && this.unexpected(),
        this.parseFunctionStatement(r, !1, !e);
    case ql._class:
        return e && this.unexpected(),
        this.parseClass(r, !0);
    case ql._if:
        return this.parseIfStatement(r);
    case ql._return:
        return this.parseReturnStatement(r);
    case ql._switch:
        return this.parseSwitchStatement(r);
    case ql._throw:
        return this.parseThrowStatement(r);
    case ql._try:
        return this.parseTryStatement(r);
    case ql._const:
    case ql._var:
        return i = i || this.value,
        e && "var" !== i && this.unexpected(),
        this.parseVarStatement(r, i);
    case ql._while:
        return this.parseWhileStatement(r);
    case ql._with:
        return this.parseWithStatement(r);
    case ql.braceL:
        return this.parseBlock(!0, r);
    case ql.semi:
        return this.parseEmptyStatement(r);
    case ql._export:
    case ql._import:
        if (this.options.ecmaVersion > 10 && n === ql._import) {
            Jl.lastIndex = this.pos;
            const o = Jl.exec(this.input), a = this.pos + o[0].length, l = this.input.charCodeAt(a);
            if (40 === l || 46 === l)
                return this.parseExpressionStatement(r, this.parseExpression())
        }
        return this.options.allowImportExportEverywhere || (t || this.raise(this.start, "'import' and 'export' may only appear at the top level"),
        this.inModule || this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'")),
        n === ql._import ? this.parseImport(r) : this.parseExport(r, s);
    default:
        if (this.isAsyncFunction())
            return e && this.unexpected(),
            this.next(),
            this.parseFunctionStatement(r, !0, !e);
        const h = this.value, c = this.parseExpression();
        return n === ql.name && "Identifier" === c.type && this.eat(ql.colon) ? this.parseLabeledStatement(r, h, c, e) : this.parseExpressionStatement(r, c)
    }
}
,
Eh.parseBreakContinueStatement = function(e, t) {
    const s = "break" === t;
    this.next(),
    this.eat(ql.semi) || this.insertSemicolon() ? e.label = null : this.type !== ql.name ? this.unexpected() : (e.label = this.parseIdent(),
    this.semicolon());
    for (var i = 0; i < this.labels.length; ++i) {
        const n = this.labels[i];
        if (null == e.label || n.name === e.label.name) {
            if (null != n.kind && (s || "loop" === n.kind))
                break;
            if (e.label && s)
                break
        }
    }
    return i === this.labels.length && this.raise(e.start, `Unsyntactic ${t}`),
    this.finishNode(e, s ? "BreakStatement" : "ContinueStatement");
}
,
Eh.parseDebuggerStatement = function(e) {
    return this.next(),
    this.semicolon(),
    this.finishNode(e, "DebuggerStatement")
}
,
Eh.parseDoStatement = function(e) {
    return this.next(),
    this.labels.push(vh),
    e.body = this.parseStatement("do"),
    this.labels.pop(),
    this.expect(ql._while),
    e.test = this.parseParenExpression(),
    this.options.ecmaVersion >= 6 ? this.eat(ql.semi) : this.semicolon(),
    this.finishNode(e, "DoWhileStatement")
}
,
Eh.parseForStatement = function(e) {
    this.next();
    const t = this.options.ecmaVersion >= 9 && this.canAwait && this.eatContextual("await") ? this.lastTokStart : -1;
    if (this.labels.push(vh),
    this.enterScope(0),
    this.expect(ql.parenL),
    this.type === ql.semi)
        return t > -1 && this.unexpected(t),
        this.parseFor(e, null);
    const s = this.isLet();
    if (this.type === ql._var || this.type === ql._const || s) {
        const i = this.startNode(), n = s ? "let" : this.value;
        return this.next(),
        this.parseVar(i, !0, n),
        this.finishNode(i, "VariableDeclaration"),
        (this.type === ql._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) && 1 === i.declarations.length ? (this.options.ecmaVersion >= 9 && (this.type === ql._in ? t > -1 && this.unexpected(t) : e.await = t > -1),
        this.parseForIn(e, i)) : (t > -1 && this.unexpected(t),
        this.parseFor(e, i))
    }
    const r = this.isContextual("let");
    let o = !1;
    const a = new bh;
    const l = this.parseExpression(!(t > -1) || "await", a);
    return this.type === ql._in || (o = this.options.ecmaVersion >= 6 && this.isContextual("of")) ? (this.options.ecmaVersion >= 9 && (this.type === ql._in ? t > -1 && this.unexpected(t) : e.await = t > -1),
    r && o && this.raise(l.start, "The left-hand side of a for-of loop may not start with 'let'."),
    this.toAssignable(l, !1, a),
    this.checkLValPattern(l),
    this.parseForIn(e, l)) : (this.checkExpressionErrors(a, !0),
    t > -1 && this.unexpected(t),
    this.parseFor(e, l))
}
,
Eh.parseFunctionStatement = function(e, t, s) {
    return this.next(),
    this.parseFunction(e, kh | (s ? 0 : wh), !1, t)
}
,
Eh.parseIfStatement = function(e) {
    return this.next(),
    e.test = this.parseParenExpression(),
    e.consequent = this.parseStatement("if"),
    e.alternate = this.eat(ql._else) ? this.parseStatement("if") : null,
    this.finishNode(e, "IfStatement")
}
,
Eh.parseReturnStatement = function(e) {
    return this.inFunction || this.options.allowReturnOutsideFunction || this.raise(this.start, "'return' outside of function"),
    this.next(),
    this.eat(ql.semi) || this.insertSemicolon() ? e.argument = null : (e.argument = this.parseExpression(),
    this.semicolon()),
    this.finishNode(e, "ReturnStatement")
}
,
Eh.parseSwitchStatement = function(e) {
    let t;
    this.next(),
    e.discriminant = this.parseParenExpression(),
    e.cases = [],
    this.expect(ql.braceL),
    this.labels.push(Sh),
    this.enterScope(0);
    for (let s = !1; this.type !== ql.braceR; )
        if (this.type === ql._case || this.type === ql._default) {
            const i = this.type === ql._case;
            t && this.finishNode(t, "SwitchCase"),
            e.cases.push(t = this.startNode()),
            t.consequent = [],
            this.next(),
            i ? t.test = this.parseExpression() : (s && this.raiseRecoverable(this.lastTokStart, "Multiple default clauses"),
            s = !0,
            t.test = null),
            this.expect(ql.colon)
        } else
            t || this.unexpected(),
            t.consequent.push(this.parseStatement(null));
    return this.exitScope(),
    t && this.finishNode(t, "SwitchCase"),
    this.next(),
    this.labels.pop(),
    this.finishNode(e, "SwitchStatement")
}
,
Eh.parseThrowStatement = function(e) {
    return this.next(),
    Hl.test(this.input.slice(this.lastTokEnd, this.start)) && this.raise(this.lastTokEnd, "Illegal newline after throw"),
    e.argument = this.parseExpression(),
    this.semicolon(),
    this.finishNode(e, "ThrowStatement")
}
;
const Ah = [];
Eh.parseTryStatement = function(e) {
    if (this.next(),
    e.block = this.parseBlock(),
    e.handler = null,
    this.type === ql._catch) {
        const t = this.startNode();
        if (this.next(),
        this.eat(ql.parenL)) {
            t.param = this.parseBindingAtom();
            const s = "Identifier" === t.param.type;
            this.enterScope(s ? 32 : 0),
            this.checkLValPattern(t.param, s ? 4 : 2),
            this.expect(ql.parenR)
        } else
            this.options.ecmaVersion < 10 && this.unexpected(),
            t.param = null,
            this.enterScope(0);
        t.body = this.parseBlock(!1),
        this.exitScope(),
        e.handler = this.finishNode(t, "CatchClause")
    }
    return e.finalizer = this.eat(ql._finally) ? this.parseBlock() : null,
    e.handler || e.finalizer || this.raise(e.start, "Missing catch or finally clause"),
    this.finishNode(e, "TryStatement")
}
,
Eh.parseVarStatement = function(e, t) {
    return this.next(),
    this.parseVar(e, !1, t),
    this.semicolon(),
    this.finishNode(e, "VariableDeclaration")
}
,
Eh.parseWhileStatement = function(e) {
    return this.next(),
    e.test = this.parseParenExpression(),
    this.labels.push(vh),
    e.body = this.parseStatement("while"),
    this.labels.pop(),
    this.finishNode(e, "WhileStatement")
}
,
Eh.parseWithStatement = function(e) {
    return this.strict && this.raise(this.start, "'with' in strict mode"),
    this.next(),
    e.object = this.parseParenExpression(),
    e.body = this.parseStatement("with"),
    this.finishNode(e, "WithStatement")
}
,
Eh.parseEmptyStatement = function(e) {
    return this.next(),
    this.finishNode(e, "EmptyStatement")
}
,
Eh.parseLabeledStatement = function(e, t, s, i) {
    for (let n = 0, r = this.labels; n < r.length; n += 1) {
        r[n].name === t && this.raise(s.start, `Label '${t}' is already declared`)
    }
    for (var o = this.type.isLoop ? "loop" : this.type === ql._switch ? "switch" : null, a = this.labels.length - 1; a >= 0; a--) {
        const l = this.labels[a];
        if (l.statementStart !== e.start)
            break;
        l.statementStart = this.start,
        l.kind = o
    }
    return this.labels.push({
        name: t,
        kind: o,
        statementStart: this.start
    }),
    e.body = this.parseStatement(i ? !i.includes("label") ? `${i}label` : i : "label"),
    this.labels.pop(),
    e.label = s,
    this.finishNode(e, "LabeledStatement");
}
,
Eh.parseExpressionStatement = function(e, t) {
    return e.expression = t,
    this.semicolon(),
    this.finishNode(e, "ExpressionStatement")
}
,
Eh.parseBlock = function(e, t, s) {
    for (void 0 === e && (e = !0),
    void 0 === t && (t = this.startNode()),
    t.body = [],
    this.expect(ql.braceL),
    e && this.enterScope(0); this.type !== ql.braceR; ) {
        const i = this.parseStatement(null);
        t.body.push(i)
    }
    return s && (this.strict = !1),
    this.next(),
    e && this.exitScope(),
    this.finishNode(t, "BlockStatement")
}
,
Eh.parseFor = function(e, t) {
    return e.init = t,
    this.expect(ql.semi),
    e.test = this.type === ql.semi ? null : this.parseExpression(),
    this.expect(ql.semi),
    e.update = this.type === ql.parenR ? null : this.parseExpression(),
    this.expect(ql.parenR),
    e.body = this.parseStatement("for"),
    this.exitScope(),
    this.labels.pop(),
    this.finishNode(e, "ForStatement")
}
,
Eh.parseForIn = function(e, t) {
    const s = this.type === ql._in;
    return this.next(),
    "VariableDeclaration" === t.type && null != t.declarations[0].init && (!s || this.options.ecmaVersion < 8 || this.strict || "var" !== t.kind || "Identifier" !== t.declarations[0].id.type) && this.raise(t.start, `${s ? "for-in" : "for-of"} loop variable declaration may not have an initializer`),
    e.left = t,
    e.right = s ? this.parseExpression() : this.parseMaybeAssign(),
    this.expect(ql.parenR),
    e.body = this.parseStatement("for"),
    this.exitScope(),
    this.labels.pop(),
    this.finishNode(e, s ? "ForInStatement" : "ForOfStatement");
}
,
Eh.parseVar = function(e, t, s) {
    for (e.declarations = [],
    e.kind = s; ; ) {
        const i = this.startNode();
        if (this.parseVarId(i, s),
        this.eat(ql.eq) ? i.init = this.parseMaybeAssign(t) : "const" !== s || this.type === ql._in || this.options.ecmaVersion >= 6 && this.isContextual("of") ? "Identifier" === i.id.type || t && (this.type === ql._in || this.isContextual("of")) ? i.init = null : this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value") : this.unexpected(),
        e.declarations.push(this.finishNode(i, "VariableDeclarator")),
        !this.eat(ql.comma))
            break
    }
    return e
}
,
Eh.parseVarId = function(e, t) {
    e.id = this.parseBindingAtom(),
    this.checkLValPattern(e.id, "var" === t ? 1 : 2, !1)
}
;
var kh = 1
  , wh = 2;
function Ih(e, t) {
    const s = t.key.name;
    const i = e[s];
    let n = "true";
    return "MethodDefinition" !== t.type || "get" !== t.kind && "set" !== t.kind || (n = (t.static ? "s" : "i") + t.kind),
    "iget" === i && "iset" === n || "iset" === i && "iget" === n || "sget" === i && "sset" === n || "sset" === i && "sget" === n ? (e[s] = "true",
    !1) : !!i || (e[s] = n,
    !1)
}
function Ph({computed, key}, t) {
    const s = computed, i = key;
    return !s && ("Identifier" === i.type && i.name === t || "Literal" === i.type && i.value === t)
}
Eh.parseFunction = function(e, t, s, i, n) {
    this.initFunction(e),
    (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !i) && (this.type === ql.star && t & wh && this.unexpected(),
    e.generator = this.eat(ql.star)),
    this.options.ecmaVersion >= 8 && (e.async = !!i),
    t & kh && (e.id = 4 & t && this.type !== ql.name ? null : this.parseIdent(),
    !e.id || t & wh || this.checkLValSimple(e.id, this.strict || e.generator || e.async ? this.treatFunctionsAsVar ? 1 : 2 : 3));
    const r = this.yieldPos, o = this.awaitPos, a = this.awaitIdentPos;
    return this.yieldPos = 0,
    this.awaitPos = 0,
    this.awaitIdentPos = 0,
    this.enterScope(fh(e.async, e.generator)),
    t & kh || (e.id = this.type === ql.name ? this.parseIdent() : null),
    this.parseFunctionParams(e),
    this.parseFunctionBody(e, s, !1, n),
    this.yieldPos = r,
    this.awaitPos = o,
    this.awaitIdentPos = a,
    this.finishNode(e, t & kh ? "FunctionDeclaration" : "FunctionExpression")
}
,
Eh.parseFunctionParams = function(e) {
    this.expect(ql.parenL),
    e.params = this.parseBindingList(ql.parenR, !1, this.options.ecmaVersion >= 8),
    this.checkYieldAwaitInDefaultParams()
}
,
Eh.parseClass = function(e, t) {
    this.next();
    const s = this.strict;
    this.strict = !0,
    this.parseClassId(e, t),
    this.parseClassSuper(e);
    const i = this.enterClassBody();
    const n = this.startNode();
    let r = !1;
    for (n.body = [],
    this.expect(ql.braceL); this.type !== ql.braceR; ) {
        const o = this.parseClassElement(null !== e.superClass);
        o && (n.body.push(o),
        "MethodDefinition" === o.type && "constructor" === o.kind ? (r && this.raise(o.start, "Duplicate constructor in the same class"),
        r = !0) : o.key && "PrivateIdentifier" === o.key.type && Ih(i, o) && this.raiseRecoverable(o.key.start, `Identifier '#${o.key.name}' has already been declared`))
    }
    return this.strict = s,
    this.next(),
    e.body = this.finishNode(n, "ClassBody"),
    this.exitClassBody(),
    this.finishNode(e, t ? "ClassDeclaration" : "ClassExpression")
}
,
Eh.parseClassElement = function(e) {
    if (this.eat(ql.semi))
        return null;
    const t = this.options.ecmaVersion;
    const s = this.startNode();
    let i = "";
    let n = !1;
    let r = !1;
    let o = "method";
    let a = !1;
    if (this.eatContextual("static")) {
        if (t >= 13 && this.eat(ql.braceL))
            return this.parseClassStaticBlock(s),
            s;
        this.isClassElementNameStart() || this.type === ql.star ? a = !0 : i = "static"
    }
    if (s.static = a,
    !i && t >= 8 && this.eatContextual("async") && (!this.isClassElementNameStart() && this.type !== ql.star || this.canInsertSemicolon() ? i = "async" : r = !0),
    !i && (t >= 9 || !r) && this.eat(ql.star) && (n = !0),
    !i && !r && !n) {
        const l = this.value;
        (this.eatContextual("get") || this.eatContextual("set")) && (this.isClassElementNameStart() ? o = l : i = l)
    }
    if (i ? (s.computed = !1,
    s.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc),
    s.key.name = i,
    this.finishNode(s.key, "Identifier")) : this.parseClassElementName(s),
    t < 13 || this.type === ql.parenL || "method" !== o || n || r) {
        const h = !s.static && Ph(s, "constructor"), c = h && e;
        h && "method" !== o && this.raise(s.key.start, "Constructor can't have get/set modifier"),
        s.kind = h ? "constructor" : o,
        this.parseClassMethod(s, n, r, c)
    } else
        this.parseClassField(s);
    return s
}
,
Eh.isClassElementNameStart = function() {
    return this.type === ql.name || this.type === ql.privateId || this.type === ql.num || this.type === ql.string || this.type === ql.bracketL || this.type.keyword
}
,
Eh.parseClassElementName = function(e) {
    this.type === ql.privateId ? ("constructor" === this.value && this.raise(this.start, "Classes can't have an element named '#constructor'"),
    e.computed = !1,
    e.key = this.parsePrivateIdent()) : this.parsePropertyName(e)
}
,
Eh.parseClassMethod = function(e, t, s, i) {
    const n = e.key;
    "constructor" === e.kind ? (t && this.raise(n.start, "Constructor can't be a generator"),
    s && this.raise(n.start, "Constructor can't be an async method")) : e.static && Ph(e, "prototype") && this.raise(n.start, "Classes may not have a static property named prototype");
    const r = e.value = this.parseMethod(t, s, i);
    return "get" === e.kind && 0 !== r.params.length && this.raiseRecoverable(r.start, "getter should have no params"),
    "set" === e.kind && 1 !== r.params.length && this.raiseRecoverable(r.start, "setter should have exactly one param"),
    "set" === e.kind && "RestElement" === r.params[0].type && this.raiseRecoverable(r.params[0].start, "Setter cannot use rest params"),
    this.finishNode(e, "MethodDefinition")
}
,
Eh.parseClassField = function(e) {
    if (Ph(e, "constructor") ? this.raise(e.key.start, "Classes can't have a field named 'constructor'") : e.static && Ph(e, "prototype") && this.raise(e.key.start, "Classes can't have a static field named 'prototype'"),
    this.eat(ql.eq)) {
        const t = this.currentThisScope(), s = t.inClassFieldInit;
        t.inClassFieldInit = !0,
        e.value = this.parseMaybeAssign(),
        t.inClassFieldInit = s
    } else
        e.value = null;
    return this.semicolon(),
    this.finishNode(e, "PropertyDefinition")
}
,
Eh.parseClassStaticBlock = function(e) {
    e.body = [];
    const t = this.labels;
    for (this.labels = [],
    this.enterScope(320); this.type !== ql.braceR; ) {
        const s = this.parseStatement(null);
        e.body.push(s)
    }
    return this.next(),
    this.exitScope(),
    this.labels = t,
    this.finishNode(e, "StaticBlock")
}
,
Eh.parseClassId = function(e, t) {
    this.type === ql.name ? (e.id = this.parseIdent(),
    t && this.checkLValSimple(e.id, 2, !1)) : (!0 === t && this.unexpected(),
    e.id = null)
}
,
Eh.parseClassSuper = function(e) {
    e.superClass = this.eat(ql._extends) ? this.parseExprSubscripts(null, !1) : null
}
,
Eh.enterClassBody = function() {
    const e = {
        declared: Object.create(null),
        used: []
    };
    return this.privateNameStack.push(e),
    e.declared
}
,
Eh.exitClassBody = function() {
    for (let e = this.privateNameStack.pop(), t = e.declared, s = e.used, i = this.privateNameStack.length, n = 0 === i ? null : this.privateNameStack[i - 1], r = 0; r < s.length; ++r) {
        const o = s[r];
        sh(t, o.name) || (n ? n.used.push(o) : this.raiseRecoverable(o.start, `Private field '#${o.name}' must be declared in an enclosing class`))
    }
}
,
Eh.parseExport = function(e, t) {
    if (this.next(),
    this.eat(ql.star))
        return this.options.ecmaVersion >= 11 && (this.eatContextual("as") ? (e.exported = this.parseModuleExportName(),
        this.checkExport(t, e.exported, this.lastTokStart)) : e.exported = null),
        this.expectContextual("from"),
        this.type !== ql.string && this.unexpected(),
        e.source = this.parseExprAtom(),
        this.semicolon(),
        this.finishNode(e, "ExportAllDeclaration");
    if (this.eat(ql._default)) {
        let s;
        if (this.checkExport(t, "default", this.lastTokStart),
        this.type === ql._function || (s = this.isAsyncFunction())) {
            const i = this.startNode();
            this.next(),
            s && this.next(),
            e.declaration = this.parseFunction(i, 4 | kh, !1, s)
        } else if (this.type === ql._class) {
            const n = this.startNode();
            e.declaration = this.parseClass(n, "nullableID")
        } else
            e.declaration = this.parseMaybeAssign(),
            this.semicolon();
        return this.finishNode(e, "ExportDefaultDeclaration")
    }
    if (this.shouldParseExportStatement())
        e.declaration = this.parseStatement(null),
        "VariableDeclaration" === e.declaration.type ? this.checkVariableExport(t, e.declaration.declarations) : this.checkExport(t, e.declaration.id, e.declaration.id.start),
        e.specifiers = [],
        e.source = null;
    else {
        if (e.declaration = null,
        e.specifiers = this.parseExportSpecifiers(t),
        this.eatContextual("from"))
            this.type !== ql.string && this.unexpected(),
            e.source = this.parseExprAtom();
        else {
            for (let r = 0, o = e.specifiers; r < o.length; r += 1) {
                const a = o[r];
                this.checkUnreserved(a.local),
                this.checkLocalExport(a.local),
                "Literal" === a.local.type && this.raise(a.local.start, "A string literal cannot be used as an exported binding without `from`.")
            }
            e.source = null
        }
        this.semicolon()
    }
    return this.finishNode(e, "ExportNamedDeclaration")
}
,
Eh.checkExport = function(e, t, s) {
    e && ("string" != typeof t && (t = "Identifier" === t.type ? t.name : t.value),
    sh(e, t) && this.raiseRecoverable(s, `Duplicate export '${t}'`),
    e[t] = !0)
}
,
Eh.checkPatternExport = function(e, t) {
    const s = t.type;
    if ("Identifier" === s)
        this.checkExport(e, t, t.start);
    else if ("ObjectPattern" === s)
        for (let i = 0, n = t.properties; i < n.length; i += 1) {
            const r = n[i];
            this.checkPatternExport(e, r)
        }
    else if ("ArrayPattern" === s)
        for (let o = 0, a = t.elements; o < a.length; o += 1) {
            const l = a[o];
            l && this.checkPatternExport(e, l)
        }
    else
        "Property" === s ? this.checkPatternExport(e, t.value) : "AssignmentPattern" === s ? this.checkPatternExport(e, t.left) : "RestElement" === s ? this.checkPatternExport(e, t.argument) : "ParenthesizedExpression" === s && this.checkPatternExport(e, t.expression)
}
,
Eh.checkVariableExport = function(e, t) {
    if (e)
        for (let s = 0, i = t; s < i.length; s += 1) {
            const n = i[s];
            this.checkPatternExport(e, n.id)
        }
}
,
Eh.shouldParseExportStatement = function() {
    return "var" === this.type.keyword || "const" === this.type.keyword || "class" === this.type.keyword || "function" === this.type.keyword || this.isLet() || this.isAsyncFunction()
}
,
Eh.parseExportSpecifiers = function(e) {
    const t = [];
    let s = !0;
    for (this.expect(ql.braceL); !this.eat(ql.braceR); ) {
        if (s)
            s = !1;
        else if (this.expect(ql.comma),
        this.afterTrailingComma(ql.braceR))
            break;
        const i = this.startNode();
        i.local = this.parseModuleExportName(),
        i.exported = this.eatContextual("as") ? this.parseModuleExportName() : i.local,
        this.checkExport(e, i.exported, i.exported.start),
        t.push(this.finishNode(i, "ExportSpecifier"))
    }
    return t
}
,
Eh.parseImport = function(e) {
    return this.next(),
    this.type === ql.string ? (e.specifiers = Ah,
    e.source = this.parseExprAtom()) : (e.specifiers = this.parseImportSpecifiers(),
    this.expectContextual("from"),
    e.source = this.type === ql.string ? this.parseExprAtom() : this.unexpected()),
    this.semicolon(),
    this.finishNode(e, "ImportDeclaration")
}
,
Eh.parseImportSpecifiers = function() {
    const e = [];
    let t = !0;
    if (this.type === ql.name) {
        const s = this.startNode();
        if (s.local = this.parseIdent(),
        this.checkLValSimple(s.local, 2),
        e.push(this.finishNode(s, "ImportDefaultSpecifier")),
        !this.eat(ql.comma))
            return e
    }
    if (this.type === ql.star) {
        const i = this.startNode();
        return this.next(),
        this.expectContextual("as"),
        i.local = this.parseIdent(),
        this.checkLValSimple(i.local, 2),
        e.push(this.finishNode(i, "ImportNamespaceSpecifier")),
        e
    }
    for (this.expect(ql.braceL); !this.eat(ql.braceR); ) {
        if (t)
            t = !1;
        else if (this.expect(ql.comma),
        this.afterTrailingComma(ql.braceR))
            break;
        const n = this.startNode();
        n.imported = this.parseModuleExportName(),
        this.eatContextual("as") ? n.local = this.parseIdent() : (this.checkUnreserved(n.imported),
        n.local = n.imported),
        this.checkLValSimple(n.local, 2),
        e.push(this.finishNode(n, "ImportSpecifier"))
    }
    return e
}
,
Eh.parseModuleExportName = function() {
    if (this.options.ecmaVersion >= 13 && this.type === ql.string) {
        const e = this.parseLiteral(this.value);
        return oh.test(e.value) && this.raise(e.start, "An export name cannot include a lone surrogate."),
        e
    }
    return this.parseIdent(!0)
}
,
Eh.adaptDirectivePrologue = function(e) {
    for (let t = 0; t < e.length && this.isDirectiveCandidate(e[t]); ++t)
        e[t].directive = e[t].expression.raw.slice(1, -1)
}
,
Eh.isDirectiveCandidate = function({type, expression, start}) {
    return this.options.ecmaVersion >= 5 && "ExpressionStatement" === type && "Literal" === expression.type && "string" == typeof expression.value && ('"' === this.input[start] || "'" === this.input[start]);
}
;
const Ch = mh.prototype;
Ch.toAssignable = function(e, t, s) {
    if (this.options.ecmaVersion >= 6 && e)
        switch (e.type) {
        case "Identifier":
            this.inAsync && "await" === e.name && this.raise(e.start, "Cannot use 'await' as identifier inside an async function");
            break;
        case "ObjectPattern":
        case "ArrayPattern":
        case "AssignmentPattern":
        case "RestElement":
            break;
        case "ObjectExpression":
            e.type = "ObjectPattern",
            s && this.checkPatternErrors(s, !0);
            for (let i = 0, n = e.properties; i < n.length; i += 1) {
                const r = n[i];
                this.toAssignable(r, t),
                "RestElement" !== r.type || "ArrayPattern" !== r.argument.type && "ObjectPattern" !== r.argument.type || this.raise(r.argument.start, "Unexpected token")
            }
            break;
        case "Property":
            "init" !== e.kind && this.raise(e.key.start, "Object pattern can't contain getter or setter"),
            this.toAssignable(e.value, t);
            break;
        case "ArrayExpression":
            e.type = "ArrayPattern",
            s && this.checkPatternErrors(s, !0),
            this.toAssignableList(e.elements, t);
            break;
        case "SpreadElement":
            e.type = "RestElement",
            this.toAssignable(e.argument, t),
            "AssignmentPattern" === e.argument.type && this.raise(e.argument.start, "Rest elements cannot have a default value");
            break;
        case "AssignmentExpression":
            "=" !== e.operator && this.raise(e.left.end, "Only '=' operator can be used for specifying default value."),
            e.type = "AssignmentPattern",
            delete e.operator,
            this.toAssignable(e.left, t);
            break;
        case "ParenthesizedExpression":
            this.toAssignable(e.expression, t, s);
            break;
        case "ChainExpression":
            this.raiseRecoverable(e.start, "Optional chaining cannot appear in left-hand side");
            break;
        case "MemberExpression":
            if (!t)
                break;
        default:
            this.raise(e.start, "Assigning to rvalue")
        }
    else
        s && this.checkPatternErrors(s, !0);
    return e
}
,
Ch.toAssignableList = function(e, t) {
    for (var s = e.length, i = 0; i < s; i++) {
        const n = e[i];
        n && this.toAssignable(n, t)
    }
    if (s) {
        const r = e[s - 1];
        6 === this.options.ecmaVersion && t && r && "RestElement" === r.type && "Identifier" !== r.argument.type && this.unexpected(r.argument.start)
    }
    return e
}
,
Ch.parseSpread = function(e) {
    const t = this.startNode();
    return this.next(),
    t.argument = this.parseMaybeAssign(!1, e),
    this.finishNode(t, "SpreadElement")
}
,
Ch.parseRestBinding = function() {
    const e = this.startNode();
    return this.next(),
    6 === this.options.ecmaVersion && this.type !== ql.name && this.unexpected(),
    e.argument = this.parseBindingAtom(),
    this.finishNode(e, "RestElement")
}
,
Ch.parseBindingAtom = function() {
    if (this.options.ecmaVersion >= 6)
        switch (this.type) {
        case ql.bracketL:
            const e = this.startNode();
            return this.next(),
            e.elements = this.parseBindingList(ql.bracketR, !0, !0),
            this.finishNode(e, "ArrayPattern");
        case ql.braceL:
            return this.parseObj(!0)
        }
    return this.parseIdent()
}
,
Ch.parseBindingList = function(e, t, s) {
    for (var i = [], n = !0; !this.eat(e); )
        if (n ? n = !1 : this.expect(ql.comma),
        t && this.type === ql.comma)
            i.push(null);
        else {
            if (s && this.afterTrailingComma(e))
                break;
            if (this.type === ql.ellipsis) {
                const r = this.parseRestBinding();
                this.parseBindingListItem(r),
                i.push(r),
                this.type === ql.comma && this.raise(this.start, "Comma is not permitted after the rest element"),
                this.expect(e);
                break
            }
            const o = this.parseMaybeDefault(this.start, this.startLoc);
            this.parseBindingListItem(o),
            i.push(o)
        }
    return i
}
,
Ch.parseBindingListItem = e => e
,
Ch.parseMaybeDefault = function(e, t, s) {
    if (s = s || this.parseBindingAtom(),
    this.options.ecmaVersion < 6 || !this.eat(ql.eq))
        return s;
    const i = this.startNodeAt(e, t);
    return i.left = s,
    i.right = this.parseMaybeAssign(),
    this.finishNode(i, "AssignmentPattern")
}
,
Ch.checkLValSimple = function({type, name, start, expression}, t, s) {
    void 0 === t && (t = 0);
    const i = 0 !== t;
    switch (type) {
    case "Identifier":
        this.strict && this.reservedWordsStrictBind.test(name) && this.raiseRecoverable(start, `${(i ? "Binding " : "Assigning to ") + name} in strict mode`),
        i && (2 === t && "let" === name && this.raiseRecoverable(start, "let is disallowed as a lexically bound name"),
        s && (sh(s, name) && this.raiseRecoverable(start, "Argument name clash"),
        s[name] = !0),
        5 !== t && this.declareName(name, t, start));
        break;
    case "ChainExpression":
        this.raiseRecoverable(start, "Optional chaining cannot appear in left-hand side");
        break;
    case "MemberExpression":
        i && this.raiseRecoverable(start, "Binding member expression");
        break;
    case "ParenthesizedExpression":
        return i && this.raiseRecoverable(start, "Binding parenthesized expression"),
        this.checkLValSimple(expression, t, s);
    default:
        this.raise(start, `${i ? "Binding" : "Assigning to"} rvalue`)
    }
}
,
Ch.checkLValPattern = function(e, t, s) {
    switch (void 0 === t && (t = 0),
    e.type) {
    case "ObjectPattern":
        for (let i = 0, n = e.properties; i < n.length; i += 1) {
            const r = n[i];
            this.checkLValInnerPattern(r, t, s)
        }
        break;
    case "ArrayPattern":
        for (let o = 0, a = e.elements; o < a.length; o += 1) {
            const l = a[o];
            l && this.checkLValInnerPattern(l, t, s)
        }
        break;
    default:
        this.checkLValSimple(e, t, s)
    }
}
,
Ch.checkLValInnerPattern = function(e, t, s) {
    switch (void 0 === t && (t = 0),
    e.type) {
    case "Property":
        this.checkLValInnerPattern(e.value, t, s);
        break;
    case "AssignmentPattern":
        this.checkLValPattern(e.left, t, s);
        break;
    case "RestElement":
        this.checkLValPattern(e.argument, t, s);
        break;
    default:
        this.checkLValPattern(e, t, s)
    }
}
;
const $h = function(e, t, s, i, n) {
          this.token = e,
          this.isExpr = !!t,
          this.preserveSpace = !!s,
          this.override = i,
          this.generator = !!n
      },
      Nh = {
          b_stat: new $h("{",!1),
          b_expr: new $h("{",!0),
          b_tmpl: new $h("${",!1),
          p_stat: new $h("(",!1),
          p_expr: new $h("(",!0),
          q_tmpl: new $h("`",!0,!0,(e => e.tryReadTemplateToken()
          )),
          f_stat: new $h("function",!1),
          f_expr: new $h("function",!0),
          f_expr_gen: new $h("function",!0,!1,null,!0),
          f_gen: new $h("function",!1,!1,null,!0)
      },
      _h = mh.prototype;
_h.initialContext = () => [Nh.b_stat]
,
_h.curContext = function() {
    return this.context[this.context.length - 1]
}
,
_h.braceIsBlock = function(e) {
    const t = this.curContext();
    return t === Nh.f_expr || t === Nh.f_stat || (e !== ql.colon || t !== Nh.b_stat && t !== Nh.b_expr ? e === ql._return || e === ql.name && this.exprAllowed ? Hl.test(this.input.slice(this.lastTokEnd, this.start)) : e === ql._else || e === ql.semi || e === ql.eof || e === ql.parenR || e === ql.arrow || (e === ql.braceL ? t === Nh.b_stat : e !== ql._var && e !== ql._const && e !== ql.name && !this.exprAllowed) : !t.isExpr)
}
,
_h.inGeneratorContext = function() {
    for (let e = this.context.length - 1; e >= 1; e--) {
        const t = this.context[e];
        if ("function" === t.token)
            return t.generator
    }
    return !1
}
,
_h.updateContext = function(e) {
    let t;
    const s = this.type;
    s.keyword && e === ql.dot ? this.exprAllowed = !1 : (t = s.updateContext) ? t.call(this, e) : this.exprAllowed = s.beforeExpr
}
,
_h.overrideContext = function(e) {
    this.curContext() !== e && (this.context[this.context.length - 1] = e)
}
,
ql.parenR.updateContext = ql.braceR.updateContext = function() {
    if (1 !== this.context.length) {
        let e = this.context.pop();
        e === Nh.b_stat && "function" === this.curContext().token && (e = this.context.pop()),
        this.exprAllowed = !e.isExpr
    } else
        this.exprAllowed = !0
}
,
ql.braceL.updateContext = function(e) {
    this.context.push(this.braceIsBlock(e) ? Nh.b_stat : Nh.b_expr),
    this.exprAllowed = !0
}
,
ql.dollarBraceL.updateContext = function() {
    this.context.push(Nh.b_tmpl),
    this.exprAllowed = !0
}
,
ql.parenL.updateContext = function(e) {
    const t = e === ql._if || e === ql._for || e === ql._with || e === ql._while;
    this.context.push(t ? Nh.p_stat : Nh.p_expr),
    this.exprAllowed = !0
}
,
ql.incDec.updateContext = () => {}
,
ql._function.updateContext = ql._class.updateContext = function(e) {
    !e.beforeExpr || e === ql._else || e === ql.semi && this.curContext() !== Nh.p_stat || e === ql._return && Hl.test(this.input.slice(this.lastTokEnd, this.start)) || (e === ql.colon || e === ql.braceL) && this.curContext() === Nh.b_stat ? this.context.push(Nh.f_stat) : this.context.push(Nh.f_expr),
    this.exprAllowed = !1
}
,
ql.backQuote.updateContext = function() {
    this.curContext() === Nh.q_tmpl ? this.context.pop() : this.context.push(Nh.q_tmpl),
    this.exprAllowed = !1
}
,
ql.star.updateContext = function(e) {
    if (e === ql._function) {
        const t = this.context.length - 1;
        this.context[t] === Nh.f_expr ? this.context[t] = Nh.f_expr_gen : this.context[t] = Nh.f_gen
    }
    this.exprAllowed = !0
}
,
ql.name.updateContext = function(e) {
    let t = !1;
    this.options.ecmaVersion >= 6 && e !== ql.dot && ("of" === this.value && !this.exprAllowed || "yield" === this.value && this.inGeneratorContext()) && (t = !0),
    this.exprAllowed = t
}
;
const Rh = mh.prototype;
function Mh({type, property, expression}) {
    return "MemberExpression" === type && "PrivateIdentifier" === property.type || "ChainExpression" === type && Mh(expression);
}
Rh.checkPropClash = function(e, t, s) {
    if (!(this.options.ecmaVersion >= 9 && "SpreadElement" === e.type || this.options.ecmaVersion >= 6 && (e.computed || e.method || e.shorthand))) {
        let i;
        const n = e.key;
        switch (n.type) {
        case "Identifier":
            i = n.name;
            break;
        case "Literal":
            i = String(n.value);
            break;
        default:
            return
        }
        const r = e.kind;
        if (this.options.ecmaVersion >= 6)
            "__proto__" === i && "init" === r && (t.proto && (s ? s.doubleProto < 0 && (s.doubleProto = n.start) : this.raiseRecoverable(n.start, "Redefinition of __proto__ property")),
            t.proto = !0);
        else {
            let o = t[i = `$${i}`];
            if (o)
                ("init" === r ? this.strict && o.init || o.get || o.set : o.init || o[r]) && this.raiseRecoverable(n.start, "Redefinition of property");
            else
                o = t[i] = {
                    init: !1,
                    get: !1,
                    set: !1
                };
            o[r] = !0
        }
    }
}
,
Rh.parseExpression = function(e, t) {
    const s = this.start, i = this.startLoc, n = this.parseMaybeAssign(e, t);
    if (this.type === ql.comma) {
        const r = this.startNodeAt(s, i);
        for (r.expressions = [n]; this.eat(ql.comma); )
            r.expressions.push(this.parseMaybeAssign(e, t));
        return this.finishNode(r, "SequenceExpression")
    }
    return n
}
,
Rh.parseMaybeAssign = function(e, t, s) {
    if (this.isContextual("yield")) {
        if (this.inGenerator)
            return this.parseYield(e);
        this.exprAllowed = !1
    }
    let i = !1, n = -1, r = -1, o = -1;
    t ? (n = t.parenthesizedAssign,
    r = t.trailingComma,
    o = t.doubleProto,
    t.parenthesizedAssign = t.trailingComma = -1) : (t = new bh,
    i = !0);
    const a = this.start, l = this.startLoc;
    this.type !== ql.parenL && this.type !== ql.name || (this.potentialArrowAt = this.start,
    this.potentialArrowInForAwait = "await" === e);
    let h = this.parseMaybeConditional(e, t);
    if (s && (h = s.call(this, h, a, l)),
    this.type.isAssign) {
        const c = this.startNodeAt(a, l);
        return c.operator = this.value,
        this.type === ql.eq && (h = this.toAssignable(h, !1, t)),
        i || (t.parenthesizedAssign = t.trailingComma = t.doubleProto = -1),
        t.shorthandAssign >= h.start && (t.shorthandAssign = -1),
        this.type === ql.eq ? this.checkLValPattern(h) : this.checkLValSimple(h),
        c.left = h,
        this.next(),
        c.right = this.parseMaybeAssign(e),
        o > -1 && (t.doubleProto = o),
        this.finishNode(c, "AssignmentExpression")
    }
    return i && this.checkExpressionErrors(t, !0),
    n > -1 && (t.parenthesizedAssign = n),
    r > -1 && (t.trailingComma = r),
    h
}
,
Rh.parseMaybeConditional = function(e, t) {
    const s = this.start, i = this.startLoc, n = this.parseExprOps(e, t);
    if (this.checkExpressionErrors(t))
        return n;
    if (this.eat(ql.question)) {
        const r = this.startNodeAt(s, i);
        return r.test = n,
        r.consequent = this.parseMaybeAssign(),
        this.expect(ql.colon),
        r.alternate = this.parseMaybeAssign(e),
        this.finishNode(r, "ConditionalExpression")
    }
    return n
}
,
Rh.parseExprOps = function(e, t) {
    const s = this.start, i = this.startLoc, n = this.parseMaybeUnary(t, !1, !1, e);
    return this.checkExpressionErrors(t) || n.start === s && "ArrowFunctionExpression" === n.type ? n : this.parseExprOp(n, s, i, -1, e)
}
,
Rh.parseExprOp = function(e, t, s, i, n) {
    let r = this.type.binop;
    if (null != r && (!n || this.type !== ql._in) && r > i) {
        const o = this.type === ql.logicalOR || this.type === ql.logicalAND, a = this.type === ql.coalesce;
        a && (r = ql.logicalAND.binop);
        const l = this.value;
        this.next();
        const h = this.start, c = this.startLoc, u = this.parseExprOp(this.parseMaybeUnary(null, !1, !1, n), h, c, r, n), d = this.buildBinary(t, s, e, u, l, o || a);
        return (o && this.type === ql.coalesce || a && (this.type === ql.logicalOR || this.type === ql.logicalAND)) && this.raiseRecoverable(this.start, "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses"),
        this.parseExprOp(d, t, s, i, n)
    }
    return e
}
,
Rh.buildBinary = function(e, t, s, i, n, r) {
    "PrivateIdentifier" === i.type && this.raise(i.start, "Private identifier can only be left side of binary expression");
    const o = this.startNodeAt(e, t);
    return o.left = s,
    o.operator = n,
    o.right = i,
    this.finishNode(o, r ? "LogicalExpression" : "BinaryExpression")
}
,
Rh.parseMaybeUnary = function(e, t, s, i) {
    let n;
    const r = this.start;
    const o = this.startLoc;
    if (this.isContextual("await") && this.canAwait)
        n = this.parseAwait(i),
        t = !0;
    else if (this.type.prefix) {
        const a = this.startNode(), l = this.type === ql.incDec;
        a.operator = this.value,
        a.prefix = !0,
        this.next(),
        a.argument = this.parseMaybeUnary(null, !0, l, i),
        this.checkExpressionErrors(e, !0),
        l ? this.checkLValSimple(a.argument) : this.strict && "delete" === a.operator && "Identifier" === a.argument.type ? this.raiseRecoverable(a.start, "Deleting local variable in strict mode") : "delete" === a.operator && Mh(a.argument) ? this.raiseRecoverable(a.start, "Private fields can not be deleted") : t = !0,
        n = this.finishNode(a, l ? "UpdateExpression" : "UnaryExpression")
    } else if (t || this.type !== ql.privateId) {
        if (n = this.parseExprSubscripts(e, i),
        this.checkExpressionErrors(e))
            return n;
        for (; this.type.postfix && !this.canInsertSemicolon(); ) {
            const h = this.startNodeAt(r, o);
            h.operator = this.value,
            h.prefix = !1,
            h.argument = n,
            this.checkLValSimple(n),
            this.next(),
            n = this.finishNode(h, "UpdateExpression")
        }
    } else
        (i || 0 === this.privateNameStack.length) && this.unexpected(),
        n = this.parsePrivateIdent(),
        this.type !== ql._in && this.unexpected();
    return s || !this.eat(ql.starstar) ? n : t ? void this.unexpected(this.lastTokStart) : this.buildBinary(r, o, n, this.parseMaybeUnary(null, !1, !1, i), "**", !1)
}
,
Rh.parseExprSubscripts = function(e, t) {
    const s = this.start, i = this.startLoc, n = this.parseExprAtom(e, t);
    if ("ArrowFunctionExpression" === n.type && ")" !== this.input.slice(this.lastTokStart, this.lastTokEnd))
        return n;
    const r = this.parseSubscripts(n, s, i, !1, t);
    return e && "MemberExpression" === r.type && (e.parenthesizedAssign >= r.start && (e.parenthesizedAssign = -1),
    e.parenthesizedBind >= r.start && (e.parenthesizedBind = -1),
    e.trailingComma >= r.start && (e.trailingComma = -1)),
    r
}
,
Rh.parseSubscripts = function(e, t, s, i, n) {
    for (let r = this.options.ecmaVersion >= 8 && "Identifier" === e.type && "async" === e.name && this.lastTokEnd === e.end && !this.canInsertSemicolon() && e.end - e.start == 5 && this.potentialArrowAt === e.start, o = !1; ; ) {
        let a = this.parseSubscript(e, t, s, i, r, o, n);
        if (a.optional && (o = !0),
        a === e || "ArrowFunctionExpression" === a.type) {
            if (o) {
                const l = this.startNodeAt(t, s);
                l.expression = a,
                a = this.finishNode(l, "ChainExpression")
            }
            return a
        }
        e = a
    }
}
,
Rh.parseSubscript = function(e, t, s, i, n, r, o) {
    const a = this.options.ecmaVersion >= 11, l = a && this.eat(ql.questionDot);
    i && l && this.raise(this.lastTokStart, "Optional chaining cannot appear in the callee of new expressions");
    const h = this.eat(ql.bracketL);
    if (h || l && this.type !== ql.parenL && this.type !== ql.backQuote || this.eat(ql.dot)) {
        const c = this.startNodeAt(t, s);
        c.object = e,
        h ? (c.property = this.parseExpression(),
        this.expect(ql.bracketR)) : this.type === ql.privateId && "Super" !== e.type ? c.property = this.parsePrivateIdent() : c.property = this.parseIdent("never" !== this.options.allowReserved),
        c.computed = !!h,
        a && (c.optional = l),
        e = this.finishNode(c, "MemberExpression")
    } else if (!i && this.eat(ql.parenL)) {
        const u = new bh, d = this.yieldPos, p = this.awaitPos, f = this.awaitIdentPos;
        this.yieldPos = 0,
        this.awaitPos = 0,
        this.awaitIdentPos = 0;
        const m = this.parseExprList(ql.parenR, this.options.ecmaVersion >= 8, !1, u);
        if (n && !l && !this.canInsertSemicolon() && this.eat(ql.arrow))
            return this.checkPatternErrors(u, !1),
            this.checkYieldAwaitInDefaultParams(),
            this.awaitIdentPos > 0 && this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function"),
            this.yieldPos = d,
            this.awaitPos = p,
            this.awaitIdentPos = f,
            this.parseArrowExpression(this.startNodeAt(t, s), m, !0, o);
        this.checkExpressionErrors(u, !0),
        this.yieldPos = d || this.yieldPos,
        this.awaitPos = p || this.awaitPos,
        this.awaitIdentPos = f || this.awaitIdentPos;
        const g = this.startNodeAt(t, s);
        g.callee = e,
        g.arguments = m,
        a && (g.optional = l),
        e = this.finishNode(g, "CallExpression")
    } else if (this.type === ql.backQuote) {
        (l || r) && this.raise(this.start, "Optional chaining cannot appear in the tag of tagged template expressions");
        const y = this.startNodeAt(t, s);
        y.tag = e,
        y.quasi = this.parseTemplate({
            isTagged: !0
        }),
        e = this.finishNode(y, "TaggedTemplateExpression")
    }
    return e
}
,
Rh.parseExprAtom = function(e, t) {
    this.type === ql.slash && this.readRegexp();
    let s;
    const i = this.potentialArrowAt === this.start;
    switch (this.type) {
    case ql._super:
        return this.allowSuper || this.raise(this.start, "'super' keyword outside a method"),
        s = this.startNode(),
        this.next(),
        this.type !== ql.parenL || this.allowDirectSuper || this.raise(s.start, "super() call outside constructor of a subclass"),
        this.type !== ql.dot && this.type !== ql.bracketL && this.type !== ql.parenL && this.unexpected(),
        this.finishNode(s, "Super");
    case ql._this:
        return s = this.startNode(),
        this.next(),
        this.finishNode(s, "ThisExpression");
    case ql.name:
        const n = this.start;
        const r = this.startLoc;
        const o = this.containsEsc;
        let a = this.parseIdent(!1);
        if (this.options.ecmaVersion >= 8 && !o && "async" === a.name && !this.canInsertSemicolon() && this.eat(ql._function))
            return this.overrideContext(Nh.f_expr),
            this.parseFunction(this.startNodeAt(n, r), 0, !1, !0, t);
        if (i && !this.canInsertSemicolon()) {
            if (this.eat(ql.arrow))
                return this.parseArrowExpression(this.startNodeAt(n, r), [a], !1, t);
            if (this.options.ecmaVersion >= 8 && "async" === a.name && this.type === ql.name && !o && (!this.potentialArrowInForAwait || "of" !== this.value || this.containsEsc))
                return a = this.parseIdent(!1),
                !this.canInsertSemicolon() && this.eat(ql.arrow) || this.unexpected(),
                this.parseArrowExpression(this.startNodeAt(n, r), [a], !0, t)
        }
        return a;
    case ql.regexp:
        const l = this.value;
        return (s = this.parseLiteral(l.value)).regex = {
            pattern: l.pattern,
            flags: l.flags
        },
        s;
    case ql.num:
    case ql.string:
        return this.parseLiteral(this.value);
    case ql._null:
    case ql._true:
    case ql._false:
        return (s = this.startNode()).value = this.type === ql._null ? null : this.type === ql._true,
        s.raw = this.type.keyword,
        this.next(),
        this.finishNode(s, "Literal");
    case ql.parenL:
        const h = this.start, c = this.parseParenAndDistinguishExpression(i, t);
        return e && (e.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(c) && (e.parenthesizedAssign = h),
        e.parenthesizedBind < 0 && (e.parenthesizedBind = h)),
        c;
    case ql.bracketL:
        return s = this.startNode(),
        this.next(),
        s.elements = this.parseExprList(ql.bracketR, !0, !0, e),
        this.finishNode(s, "ArrayExpression");
    case ql.braceL:
        return this.overrideContext(Nh.b_expr),
        this.parseObj(!1, e);
    case ql._function:
        return s = this.startNode(),
        this.next(),
        this.parseFunction(s, 0);
    case ql._class:
        return this.parseClass(this.startNode(), !1);
    case ql._new:
        return this.parseNew();
    case ql.backQuote:
        return this.parseTemplate();
    case ql._import:
        return this.options.ecmaVersion >= 11 ? this.parseExprImport() : this.unexpected();
    default:
        this.unexpected()
    }
}
,
Rh.parseExprImport = function() {
    const e = this.startNode();
    this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword import");
    const t = this.parseIdent(!0);
    switch (this.type) {
    case ql.parenL:
        return this.parseDynamicImport(e);
    case ql.dot:
        return e.meta = t,
        this.parseImportMeta(e);
    default:
        this.unexpected()
    }
}
,
Rh.parseDynamicImport = function(e) {
    if (this.next(),
    e.source = this.parseMaybeAssign(),
    !this.eat(ql.parenR)) {
        const t = this.start;
        this.eat(ql.comma) && this.eat(ql.parenR) ? this.raiseRecoverable(t, "Trailing comma is not allowed in import()") : this.unexpected(t)
    }
    return this.finishNode(e, "ImportExpression")
}
,
Rh.parseImportMeta = function(e) {
    this.next();
    const t = this.containsEsc;
    return e.property = this.parseIdent(!0),
    "meta" !== e.property.name && this.raiseRecoverable(e.property.start, "The only valid meta property for import is 'import.meta'"),
    t && this.raiseRecoverable(e.start, "'import.meta' must not contain escaped characters"),
    "module" === this.options.sourceType || this.options.allowImportExportEverywhere || this.raiseRecoverable(e.start, "Cannot use 'import.meta' outside a module"),
    this.finishNode(e, "MetaProperty")
}
,
Rh.parseLiteral = function(e) {
    const t = this.startNode();
    return t.value = e,
    t.raw = this.input.slice(this.start, this.end),
    110 === t.raw.charCodeAt(t.raw.length - 1) && (t.bigint = t.raw.slice(0, -1).replace(/_/g, "")),
    this.next(),
    this.finishNode(t, "Literal")
}
,
Rh.parseParenExpression = function() {
    this.expect(ql.parenL);
    const e = this.parseExpression();
    return this.expect(ql.parenR),
    e
}
,
Rh.parseParenAndDistinguishExpression = function(e, t) {
    let s;
    const i = this.start;
    const n = this.startLoc;
    const r = this.options.ecmaVersion >= 8;
    if (this.options.ecmaVersion >= 6) {
        this.next();
        let o;
        const a = this.start;
        const l = this.startLoc;
        const h = [];
        let c = !0;
        let u = !1;
        const d = new bh;
        const p = this.yieldPos;
        const f = this.awaitPos;
        for (this.yieldPos = 0,
        this.awaitPos = 0; this.type !== ql.parenR; ) {
            if (c ? c = !1 : this.expect(ql.comma),
            r && this.afterTrailingComma(ql.parenR, !0)) {
                u = !0;
                break
            }
            if (this.type === ql.ellipsis) {
                o = this.start,
                h.push(this.parseParenItem(this.parseRestBinding())),
                this.type === ql.comma && this.raise(this.start, "Comma is not permitted after the rest element");
                break
            }
            h.push(this.parseMaybeAssign(!1, d, this.parseParenItem))
        }
        const m = this.lastTokEnd, g = this.lastTokEndLoc;
        if (this.expect(ql.parenR),
        e && !this.canInsertSemicolon() && this.eat(ql.arrow))
            return this.checkPatternErrors(d, !1),
            this.checkYieldAwaitInDefaultParams(),
            this.yieldPos = p,
            this.awaitPos = f,
            this.parseParenArrowList(i, n, h, t);
        h.length && !u || this.unexpected(this.lastTokStart),
        o && this.unexpected(o),
        this.checkExpressionErrors(d, !0),
        this.yieldPos = p || this.yieldPos,
        this.awaitPos = f || this.awaitPos,
        h.length > 1 ? ((s = this.startNodeAt(a, l)).expressions = h,
        this.finishNodeAt(s, "SequenceExpression", m, g)) : s = h[0]
    } else
        s = this.parseParenExpression();
    if (this.options.preserveParens) {
        const y = this.startNodeAt(i, n);
        return y.expression = s,
        this.finishNode(y, "ParenthesizedExpression")
    }
    return s
}
,
Rh.parseParenItem = e => e
,
Rh.parseParenArrowList = function(e, t, s, i) {
    return this.parseArrowExpression(this.startNodeAt(e, t), s, !1, i)
}
;
const Th = [];
Rh.parseNew = function() {
    this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword new");
    const e = this.startNode(), t = this.parseIdent(!0);
    if (this.options.ecmaVersion >= 6 && this.eat(ql.dot)) {
        e.meta = t;
        const s = this.containsEsc;
        return e.property = this.parseIdent(!0),
        "target" !== e.property.name && this.raiseRecoverable(e.property.start, "The only valid meta property for new is 'new.target'"),
        s && this.raiseRecoverable(e.start, "'new.target' must not contain escaped characters"),
        this.allowNewDotTarget || this.raiseRecoverable(e.start, "'new.target' can only be used in functions and class static block"),
        this.finishNode(e, "MetaProperty")
    }
    const i = this.start, n = this.startLoc, r = this.type === ql._import;
    return e.callee = this.parseSubscripts(this.parseExprAtom(), i, n, !0, !1),
    r && "ImportExpression" === e.callee.type && this.raise(i, "Cannot use new with import()"),
    this.eat(ql.parenL) ? e.arguments = this.parseExprList(ql.parenR, this.options.ecmaVersion >= 8, !1) : e.arguments = Th,
    this.finishNode(e, "NewExpression")
}
,
Rh.parseTemplateElement = function({isTagged}) {
    const t = isTagged, s = this.startNode();
    return this.type === ql.invalidTemplate ? (t || this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal"),
    s.value = {
        raw: this.value,
        cooked: null
    }) : s.value = {
        raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, "\n"),
        cooked: this.value
    },
    this.next(),
    s.tail = this.type === ql.backQuote,
    this.finishNode(s, "TemplateElement")
}
,
Rh.parseTemplate = function(e) {
    void 0 === e && (e = {});
    let t = e.isTagged;
    void 0 === t && (t = !1);
    const s = this.startNode();
    this.next(),
    s.expressions = [];
    let i = this.parseTemplateElement({
        isTagged: t
    });
    for (s.quasis = [i]; !i.tail; )
        this.type === ql.eof && this.raise(this.pos, "Unterminated template literal"),
        this.expect(ql.dollarBraceL),
        s.expressions.push(this.parseExpression()),
        this.expect(ql.braceR),
        s.quasis.push(i = this.parseTemplateElement({
            isTagged: t
        }));
    return this.next(),
    this.finishNode(s, "TemplateLiteral")
}
,
Rh.isAsyncProp = function({computed, key}) {
    return !computed && "Identifier" === key.type && "async" === key.name && (this.type === ql.name || this.type === ql.num || this.type === ql.string || this.type === ql.bracketL || this.type.keyword || this.options.ecmaVersion >= 9 && this.type === ql.star) && !Hl.test(this.input.slice(this.lastTokEnd, this.start));
}
,
Rh.parseObj = function(e, t) {
    const s = this.startNode();
    let i = !0;
    const n = {};
    for (s.properties = [],
    this.next(); !this.eat(ql.braceR); ) {
        if (i)
            i = !1;
        else if (this.expect(ql.comma),
        this.options.ecmaVersion >= 5 && this.afterTrailingComma(ql.braceR))
            break;
        const r = this.parseProperty(e, t);
        e || this.checkPropClash(r, n, t),
        s.properties.push(r)
    }
    return this.finishNode(s, e ? "ObjectPattern" : "ObjectExpression")
}
,
Rh.parseProperty = function(e, t) {
    let s;
    let i;
    let n;
    let r;
    const o = this.startNode();
    if (this.options.ecmaVersion >= 9 && this.eat(ql.ellipsis))
        return e ? (o.argument = this.parseIdent(!1),
        this.type === ql.comma && this.raise(this.start, "Comma is not permitted after the rest element"),
        this.finishNode(o, "RestElement")) : (o.argument = this.parseMaybeAssign(!1, t),
        this.type === ql.comma && t && t.trailingComma < 0 && (t.trailingComma = this.start),
        this.finishNode(o, "SpreadElement"));
    this.options.ecmaVersion >= 6 && (o.method = !1,
    o.shorthand = !1,
    (e || t) && (n = this.start,
    r = this.startLoc),
    e || (s = this.eat(ql.star)));
    const a = this.containsEsc;
    return this.parsePropertyName(o),
    !e && !a && this.options.ecmaVersion >= 8 && !s && this.isAsyncProp(o) ? (i = !0,
    s = this.options.ecmaVersion >= 9 && this.eat(ql.star),
    this.parsePropertyName(o)) : i = !1,
    this.parsePropertyValue(o, e, s, i, n, r, t, a),
    this.finishNode(o, "Property")
}
,
Rh.parsePropertyValue = function(e, t, s, i, n, r, o, a) {
    if ((s || i) && this.type === ql.colon && this.unexpected(),
    this.eat(ql.colon))
        e.value = t ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(!1, o),
        e.kind = "init";
    else if (this.options.ecmaVersion >= 6 && this.type === ql.parenL)
        t && this.unexpected(),
        e.kind = "init",
        e.method = !0,
        e.value = this.parseMethod(s, i);
    else if (t || a || !(this.options.ecmaVersion >= 5) || e.computed || "Identifier" !== e.key.type || "get" !== e.key.name && "set" !== e.key.name || this.type === ql.comma || this.type === ql.braceR || this.type === ql.eq)
        this.options.ecmaVersion >= 6 && !e.computed && "Identifier" === e.key.type ? ((s || i) && this.unexpected(),
        this.checkUnreserved(e.key),
        "await" !== e.key.name || this.awaitIdentPos || (this.awaitIdentPos = n),
        e.kind = "init",
        t ? e.value = this.parseMaybeDefault(n, r, this.copyNode(e.key)) : this.type === ql.eq && o ? (o.shorthandAssign < 0 && (o.shorthandAssign = this.start),
        e.value = this.parseMaybeDefault(n, r, this.copyNode(e.key))) : e.value = this.copyNode(e.key),
        e.shorthand = !0) : this.unexpected();
    else {
        (s || i) && this.unexpected(),
        e.kind = e.key.name,
        this.parsePropertyName(e),
        e.value = this.parseMethod(!1);
        const l = "get" === e.kind ? 0 : 1;
        if (e.value.params.length !== l) {
            const h = e.value.start;
            "get" === e.kind ? this.raiseRecoverable(h, "getter should have no params") : this.raiseRecoverable(h, "setter should have exactly one param")
        } else
            "set" === e.kind && "RestElement" === e.value.params[0].type && this.raiseRecoverable(e.value.params[0].start, "Setter cannot use rest params")
    }
}
,
Rh.parsePropertyName = function(e) {
    if (this.options.ecmaVersion >= 6) {
        if (this.eat(ql.bracketL))
            return e.computed = !0,
            e.key = this.parseMaybeAssign(),
            this.expect(ql.bracketR),
            e.key;
        e.computed = !1
    }
    return e.key = this.type === ql.num || this.type === ql.string ? this.parseExprAtom() : this.parseIdent("never" !== this.options.allowReserved)
}
,
Rh.initFunction = function(e) {
    e.id = null,
    this.options.ecmaVersion >= 6 && (e.generator = e.expression = !1),
    this.options.ecmaVersion >= 8 && (e.async = !1)
}
,
Rh.parseMethod = function(e, t, s) {
    const i = this.startNode(), n = this.yieldPos, r = this.awaitPos, o = this.awaitIdentPos;
    return this.initFunction(i),
    this.options.ecmaVersion >= 6 && (i.generator = e),
    this.options.ecmaVersion >= 8 && (i.async = !!t),
    this.yieldPos = 0,
    this.awaitPos = 0,
    this.awaitIdentPos = 0,
    this.enterScope(64 | fh(t, i.generator) | (s ? 128 : 0)),
    this.expect(ql.parenL),
    i.params = this.parseBindingList(ql.parenR, !1, this.options.ecmaVersion >= 8),
    this.checkYieldAwaitInDefaultParams(),
    this.parseFunctionBody(i, !1, !0, !1),
    this.yieldPos = n,
    this.awaitPos = r,
    this.awaitIdentPos = o,
    this.finishNode(i, "FunctionExpression")
}
,
Rh.parseArrowExpression = function(e, t, s, i) {
    const n = this.yieldPos, r = this.awaitPos, o = this.awaitIdentPos;
    return this.enterScope(16 | fh(s, !1)),
    this.initFunction(e),
    this.options.ecmaVersion >= 8 && (e.async = !!s),
    this.yieldPos = 0,
    this.awaitPos = 0,
    this.awaitIdentPos = 0,
    e.params = this.toAssignableList(t, !0),
    this.parseFunctionBody(e, !0, !1, i),
    this.yieldPos = n,
    this.awaitPos = r,
    this.awaitIdentPos = o,
    this.finishNode(e, "ArrowFunctionExpression")
}
,
Rh.parseFunctionBody = function(e, t, s, i) {
    const n = t && this.type !== ql.braceL;
    const r = this.strict;
    let o = !1;
    if (n)
        e.body = this.parseMaybeAssign(i),
        e.expression = !0,
        this.checkParams(e, !1);
    else {
        const a = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(e.params);
        r && !a || (o = this.strictDirective(this.end)) && a && this.raiseRecoverable(e.start, "Illegal 'use strict' directive in function with non-simple parameter list");
        const l = this.labels;
        this.labels = [],
        o && (this.strict = !0),
        this.checkParams(e, !r && !o && !t && !s && this.isSimpleParamList(e.params)),
        this.strict && e.id && this.checkLValSimple(e.id, 5),
        e.body = this.parseBlock(!1, void 0, o && !r),
        e.expression = !1,
        this.adaptDirectivePrologue(e.body.body),
        this.labels = l
    }
    this.exitScope()
}
,
Rh.isSimpleParamList = e => {
    for (let t = 0, s = e; t < s.length; t += 1) {
        if ("Identifier" !== s[t].type)
            return !1
    }
    return !0
}
,
Rh.checkParams = function({params}, t) {
    for (let s = Object.create(null), i = 0, n = params; i < n.length; i += 1) {
        const r = n[i];
        this.checkLValInnerPattern(r, 1, t ? null : s)
    }
}
,
Rh.parseExprList = function(e, t, s, i) {
    for (var n = [], r = !0; !this.eat(e); ) {
        if (r)
            r = !1;
        else if (this.expect(ql.comma),
        t && this.afterTrailingComma(e))
            break;
        let o = void 0;
        s && this.type === ql.comma ? o = null : this.type === ql.ellipsis ? (o = this.parseSpread(i),
        i && this.type === ql.comma && i.trailingComma < 0 && (i.trailingComma = this.start)) : o = this.parseMaybeAssign(!1, i),
        n.push(o)
    }
    return n
}
,
Rh.checkUnreserved = function({start, end, name}) {
    const t = start, s = end, i = name;
    (this.inGenerator && "yield" === i && this.raiseRecoverable(t, "Cannot use 'yield' as identifier inside a generator"),
    this.inAsync && "await" === i && this.raiseRecoverable(t, "Cannot use 'await' as identifier inside an async function"),
    this.currentThisScope().inClassFieldInit && "arguments" === i && this.raiseRecoverable(t, "Cannot use 'arguments' in class field initializer"),
    !this.inClassStaticBlock || "arguments" !== i && "await" !== i || this.raise(t, `Cannot use ${i} in class static initialization block`),
    this.keywords.test(i) && this.raise(t, `Unexpected keyword '${i}'`),
    this.options.ecmaVersion < 6 && this.input.slice(t, s).includes("\\")) || (this.strict ? this.reservedWordsStrict : this.reservedWords).test(i) && (this.inAsync || "await" !== i || this.raiseRecoverable(t, "Cannot use keyword 'await' outside an async function"),
    this.raiseRecoverable(t, `The keyword '${i}' is reserved`))
}
,
Rh.parseIdent = function(e) {
    const t = this.startNode();
    return this.type === ql.name ? t.name = this.value : this.type.keyword ? (t.name = this.type.keyword,
    "class" !== t.name && "function" !== t.name || this.lastTokEnd === this.lastTokStart + 1 && 46 === this.input.charCodeAt(this.lastTokStart) || this.context.pop()) : this.unexpected(),
    this.next(!!e),
    this.finishNode(t, "Identifier"),
    e || (this.checkUnreserved(t),
    "await" !== t.name || this.awaitIdentPos || (this.awaitIdentPos = t.start)),
    t
}
,
Rh.parsePrivateIdent = function() {
    const e = this.startNode();
    return this.type === ql.privateId ? e.name = this.value : this.unexpected(),
    this.next(),
    this.finishNode(e, "PrivateIdentifier"),
    0 === this.privateNameStack.length ? this.raise(e.start, `Private field '#${e.name}' must be declared in an enclosing class`) : this.privateNameStack[this.privateNameStack.length - 1].used.push(e),
    e;
}
,
Rh.parseYield = function(e) {
    this.yieldPos || (this.yieldPos = this.start);
    const t = this.startNode();
    return this.next(),
    this.type === ql.semi || this.canInsertSemicolon() || this.type !== ql.star && !this.type.startsExpr ? (t.delegate = !1,
    t.argument = null) : (t.delegate = this.eat(ql.star),
    t.argument = this.parseMaybeAssign(e)),
    this.finishNode(t, "YieldExpression")
}
,
Rh.parseAwait = function(e) {
    this.awaitPos || (this.awaitPos = this.start);
    const t = this.startNode();
    return this.next(),
    t.argument = this.parseMaybeUnary(null, !0, !1, e),
    this.finishNode(t, "AwaitExpression")
}
;
const Oh = mh.prototype;
Oh.raise = function(e, t) {
    const s = hh(this.input, e);
    t += ` (${s.line}:${s.column})`;
    const i = new SyntaxError(t);
    throw (i.pos = e, i.loc = s, i.raisedAt = this.pos, i)
}
,
Oh.raiseRecoverable = Oh.raise,
Oh.curPosition = function() {
    if (this.options.locations)
        return new ah(this.curLine,this.pos - this.lineStart)
}
;
const Dh = mh.prototype,
      Lh = function(e) {
          this.flags = e,
          this.var = [],
          this.lexical = [],
          this.functions = [],
          this.inClassFieldInit = !1
      };
Dh.enterScope = function(e) {
    this.scopeStack.push(new Lh(e))
}
,
Dh.exitScope = function() {
    this.scopeStack.pop()
}
,
Dh.treatFunctionsAsVarInScope = function({flags}) {
    return 2 & flags || !this.inModule && 1 & flags;
}
,
Dh.declareName = function(e, t, s) {
    let i = !1;
    if (2 === t) {
        const n = this.currentScope();
        i = n.lexical.includes(e) || n.functions.includes(e) || n.var.includes(e),
        n.lexical.push(e),
        this.inModule && 1 & n.flags && delete this.undefinedExports[e]
    } else if (4 === t) {
        this.currentScope().lexical.push(e)
    } else if (3 === t) {
        const r = this.currentScope();
        i = this.treatFunctionsAsVar ? r.lexical.includes(e) : r.lexical.includes(e) || r.var.includes(e),
        r.functions.push(e)
    } else
        for (let o = this.scopeStack.length - 1; o >= 0; --o) {
            const a = this.scopeStack[o];
            if (a.lexical.includes(e) && !(32 & a.flags && a.lexical[0] === e) || !this.treatFunctionsAsVarInScope(a) && a.functions.includes(e)) {
                i = !0;
                break
            }
            if (a.var.push(e),
            this.inModule && 1 & a.flags && delete this.undefinedExports[e],
            259 & a.flags)
                break
        }
    i && this.raiseRecoverable(s, `Identifier '${e}' has already been declared`)
}
,
Dh.checkLocalExport = function(e) {
    !this.scopeStack[0].lexical.includes(e.name) && !this.scopeStack[0].var.includes(e.name) && (this.undefinedExports[e.name] = e)
}
,
Dh.currentScope = function() {
    return this.scopeStack[this.scopeStack.length - 1]
}
,
Dh.currentVarScope = function() {
    for (let e = this.scopeStack.length - 1; ; e--) {
        const t = this.scopeStack[e];
        if (259 & t.flags)
            return t
    }
}
,
Dh.currentThisScope = function() {
    for (let e = this.scopeStack.length - 1; ; e--) {
        const t = this.scopeStack[e];
        if (259 & t.flags && !(16 & t.flags))
            return t
    }
}
;
const Vh = function(e, t, s) {
          this.type = "",
          this.start = t,
          this.end = 0,
          e.options.locations && (this.loc = new lh(e,s)),
          e.options.directSourceFile && (this.sourceFile = e.options.directSourceFile),
          e.options.ranges && (this.range = [t, 0])
      },
      Bh = mh.prototype;
function zh(e, t, s, i) {
    return e.type = t,
    e.end = s,
    this.options.locations && (e.loc.end = i),
    this.options.ranges && (e.range[1] = s),
    e
}
Bh.startNode = function() {
    return new Vh(this,this.start,this.startLoc)
}
,
Bh.startNodeAt = function(e, t) {
    return new Vh(this,e,t)
}
,
Bh.finishNode = function(e, t) {
    return zh.call(this, e, t, this.lastTokEnd, this.lastTokEndLoc)
}
,
Bh.finishNodeAt = function(e, t, s, i) {
    return zh.call(this, e, t, s, i)
}
,
Bh.copyNode = function(e) {
    const t = new Vh(this,e.start,this.startLoc);
    for (const s in e)
        t[s] = e[s];
    return t
}
;
const Fh = "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS",
      jh = `${Fh} Extended_Pictographic`,
      Uh = `${jh} EBase EComp EMod EPres ExtPict`,
      Gh = {
          9: Fh,
          10: jh,
          11: jh,
          12: Uh,
          13: Uh,
          14: Uh
      },
      Wh = "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu",
      qh = "Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb",
      Hh = `${qh} Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd`,
      Kh = `${Hh} Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho`,
      Yh = `${Kh} Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi`,
      Xh = `${Yh} Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith`,
      Qh = {
          9: qh,
          10: Hh,
          11: Kh,
          12: Yh,
          13: Xh,
          14: `${Xh} Kawi Nag_Mundari Nagm`
      },
      Jh = {};
function Zh(e) {
    const t = Jh[e] = {
        binary: nh(`${Gh[e]} ${Wh}`),
        nonBinary: {
            General_Category: nh(Wh),
            Script: nh(Qh[e])
        }
    };
    t.nonBinary.Script_Extensions = t.nonBinary.Script,
    t.nonBinary.gc = t.nonBinary.General_Category,
    t.nonBinary.sc = t.nonBinary.Script,
    t.nonBinary.scx = t.nonBinary.Script_Extensions
}
for (let ec = 0, tc = [9, 10, 11, 12, 13, 14]; ec < tc.length; ec += 1) {
    Zh(tc[ec])
}
const sc = mh.prototype,
      ic = function(e) {
          this.parser = e,
          this.validFlags = `gim${e.options.ecmaVersion >= 6 ? "uy" : ""}${e.options.ecmaVersion >= 9 ? "s" : ""}${e.options.ecmaVersion >= 13 ? "d" : ""}`,
          this.unicodeProperties = Jh[e.options.ecmaVersion >= 14 ? 14 : e.options.ecmaVersion],
          this.source = "",
          this.flags = "",
          this.start = 0,
          this.switchU = !1,
          this.switchN = !1,
          this.pos = 0,
          this.lastIntValue = 0,
          this.lastStringValue = "",
          this.lastAssertionIsQuantifiable = !1,
          this.numCapturingParens = 0,
          this.maxBackReference = 0,
          this.groupNames = [],
          this.backReferenceNames = []
      };
function nc(e) {
    return 36 === e || e >= 40 && e <= 43 || 46 === e || 63 === e || e >= 91 && e <= 94 || e >= 123 && e <= 125
}
function rc(e) {
    return e >= 65 && e <= 90 || e >= 97 && e <= 122
}
function oc(e) {
    return rc(e) || 95 === e
}
function ac(e) {
    return oc(e) || lc(e)
}
function lc(e) {
    return e >= 48 && e <= 57
}
function hc(e) {
    return e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102
}
function cc(e) {
    return e >= 65 && e <= 70 ? e - 65 + 10 : e >= 97 && e <= 102 ? e - 97 + 10 : e - 48
}
function uc(e) {
    return e >= 48 && e <= 55
}
ic.prototype.reset = function(e, t, s) {
    const i = s.includes("u");
    this.start = 0 | e,
    this.source = `${t}`,
    this.flags = s,
    this.switchU = i && this.parser.options.ecmaVersion >= 6,
    this.switchN = i && this.parser.options.ecmaVersion >= 9
}
,
ic.prototype.raise = function(e) {
    this.parser.raiseRecoverable(this.start, `Invalid regular expression: /${this.source}/: ${e}`)
}
,
ic.prototype.at = function(e, t) {
    void 0 === t && (t = !1);
    const s = this.source, i = s.length;
    if (e >= i)
        return -1;
    const n = s.charCodeAt(e);
    if (!t && !this.switchU || n <= 55295 || n >= 57344 || e + 1 >= i)
        return n;
    const r = s.charCodeAt(e + 1);
    return r >= 56320 && r <= 57343 ? (n << 10) + r - 56613888 : n
}
,
ic.prototype.nextIndex = function(e, t) {
    void 0 === t && (t = !1);
    const s = this.source, i = s.length;
    if (e >= i)
        return i;
    let n;
    const r = s.charCodeAt(e);
    return !t && !this.switchU || r <= 55295 || r >= 57344 || e + 1 >= i || (n = s.charCodeAt(e + 1)) < 56320 || n > 57343 ? e + 1 : e + 2
}
,
ic.prototype.current = function(e) {
    return void 0 === e && (e = !1),
    this.at(this.pos, e)
}
,
ic.prototype.lookahead = function(e) {
    return void 0 === e && (e = !1),
    this.at(this.nextIndex(this.pos, e), e)
}
,
ic.prototype.advance = function(e) {
    void 0 === e && (e = !1),
    this.pos = this.nextIndex(this.pos, e)
}
,
ic.prototype.eat = function(e, t) {
    return void 0 === t && (t = !1),
    this.current(t) === e && (this.advance(t),
    !0)
}
,
sc.validateRegExpFlags = function({validFlags, flags, start}) {
    for (let t = validFlags, s = flags, i = 0; i < s.length; i++) {
        const n = s.charAt(i);
        !t.includes(n) && this.raise(start, "Invalid regular expression flag"),
        s.indexOf(n, i + 1) > -1 && this.raise(start, "Duplicate regular expression flag")
    }
}
,
sc.validateRegExpPattern = function(e) {
    this.regexp_pattern(e),
    !e.switchN && this.options.ecmaVersion >= 9 && e.groupNames.length > 0 && (e.switchN = !0,
    this.regexp_pattern(e))
}
,
sc.regexp_pattern = function(e) {
    e.pos = 0,
    e.lastIntValue = 0,
    e.lastStringValue = "",
    e.lastAssertionIsQuantifiable = !1,
    e.numCapturingParens = 0,
    e.maxBackReference = 0,
    e.groupNames.length = 0,
    e.backReferenceNames.length = 0,
    this.regexp_disjunction(e),
    e.pos !== e.source.length && (e.eat(41) && e.raise("Unmatched ')'"),
    (e.eat(93) || e.eat(125)) && e.raise("Lone quantifier brackets")),
    e.maxBackReference > e.numCapturingParens && e.raise("Invalid escape");
    for (let t = 0, s = e.backReferenceNames; t < s.length; t += 1) {
        const i = s[t];
        !e.groupNames.includes(i) && e.raise("Invalid named capture referenced")
    }
}
,
sc.regexp_disjunction = function(e) {
    for (this.regexp_alternative(e); e.eat(124); )
        this.regexp_alternative(e);
    this.regexp_eatQuantifier(e, !0) && e.raise("Nothing to repeat"),
    e.eat(123) && e.raise("Lone quantifier brackets")
}
,
sc.regexp_alternative = function(e) {
    for (; e.pos < e.source.length && this.regexp_eatTerm(e); )
        ;
}
,
sc.regexp_eatTerm = function(e) {
    return this.regexp_eatAssertion(e) ? (e.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(e) && e.switchU && e.raise("Invalid quantifier"),
    !0) : !!(e.switchU ? this.regexp_eatAtom(e) : this.regexp_eatExtendedAtom(e)) && (this.regexp_eatQuantifier(e),
    !0)
}
,
sc.regexp_eatAssertion = function(e) {
    const t = e.pos;
    if (e.lastAssertionIsQuantifiable = !1,
    e.eat(94) || e.eat(36))
        return !0;
    if (e.eat(92)) {
        if (e.eat(66) || e.eat(98))
            return !0;
        e.pos = t
    }
    if (e.eat(40) && e.eat(63)) {
        let s = !1;
        if (this.options.ecmaVersion >= 9 && (s = e.eat(60)),
        e.eat(61) || e.eat(33))
            return this.regexp_disjunction(e),
            e.eat(41) || e.raise("Unterminated group"),
            e.lastAssertionIsQuantifiable = !s,
            !0
    }
    return e.pos = t,
    !1
}
,
sc.regexp_eatQuantifier = function(e, t) {
    return void 0 === t && (t = !1),
    !!this.regexp_eatQuantifierPrefix(e, t) && (e.eat(63),
    !0)
}
,
sc.regexp_eatQuantifierPrefix = function(e, t) {
    return e.eat(42) || e.eat(43) || e.eat(63) || this.regexp_eatBracedQuantifier(e, t)
}
,
sc.regexp_eatBracedQuantifier = function(e, t) {
    const s = e.pos;
    if (e.eat(123)) {
        let i = 0, n = -1;
        if (this.regexp_eatDecimalDigits(e) && (i = e.lastIntValue,
        e.eat(44) && this.regexp_eatDecimalDigits(e) && (n = e.lastIntValue),
        e.eat(125)))
            return -1 !== n && n < i && !t && e.raise("numbers out of order in {} quantifier"),
            !0;
        e.switchU && !t && e.raise("Incomplete quantifier"),
        e.pos = s
    }
    return !1
}
,
sc.regexp_eatAtom = function(e) {
    return this.regexp_eatPatternCharacters(e) || e.eat(46) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e)
}
,
sc.regexp_eatReverseSolidusAtomEscape = function(e) {
    const t = e.pos;
    if (e.eat(92)) {
        if (this.regexp_eatAtomEscape(e))
            return !0;
        e.pos = t
    }
    return !1
}
,
sc.regexp_eatUncapturingGroup = function(e) {
    const t = e.pos;
    if (e.eat(40)) {
        if (e.eat(63) && e.eat(58)) {
            if (this.regexp_disjunction(e),
            e.eat(41))
                return !0;
            e.raise("Unterminated group")
        }
        e.pos = t
    }
    return !1
}
,
sc.regexp_eatCapturingGroup = function(e) {
    if (e.eat(40)) {
        if (this.options.ecmaVersion >= 9 ? this.regexp_groupSpecifier(e) : 63 === e.current() && e.raise("Invalid group"),
        this.regexp_disjunction(e),
        e.eat(41))
            return e.numCapturingParens += 1,
            !0;
        e.raise("Unterminated group")
    }
    return !1
}
,
sc.regexp_eatExtendedAtom = function(e) {
    return e.eat(46) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e) || this.regexp_eatInvalidBracedQuantifier(e) || this.regexp_eatExtendedPatternCharacter(e)
}
,
sc.regexp_eatInvalidBracedQuantifier = function(e) {
    return this.regexp_eatBracedQuantifier(e, !0) && e.raise("Nothing to repeat"),
    !1
}
,
sc.regexp_eatSyntaxCharacter = e => {
    const t = e.current();
    return !!nc(t) && (e.lastIntValue = t,
    e.advance(),
    !0)
}
,
sc.regexp_eatPatternCharacters = e => {
    for (var t = e.pos, s = 0; -1 !== (s = e.current()) && !nc(s); )
        e.advance();
    return e.pos !== t
}
,
sc.regexp_eatExtendedPatternCharacter = e => {
    const t = e.current();
    return !(-1 === t || 36 === t || t >= 40 && t <= 43 || 46 === t || 63 === t || 91 === t || 94 === t || 124 === t) && (e.advance(),
    !0)
}
,
sc.regexp_groupSpecifier = function(e) {
    if (e.eat(63)) {
        if (this.regexp_eatGroupName(e))
            return e.groupNames.includes(e.lastStringValue) && e.raise("Duplicate capture group name"),
            void e.groupNames.push(e.lastStringValue);
        e.raise("Invalid group")
    }
}
,
sc.regexp_eatGroupName = function(e) {
    if (e.lastStringValue = "",
    e.eat(60)) {
        if (this.regexp_eatRegExpIdentifierName(e) && e.eat(62))
            return !0;
        e.raise("Invalid capture group name")
    }
    return !1
}
,
sc.regexp_eatRegExpIdentifierName = function(e) {
    if (e.lastStringValue = "",
    this.regexp_eatRegExpIdentifierStart(e)) {
        for (e.lastStringValue += rh(e.lastIntValue); this.regexp_eatRegExpIdentifierPart(e); )
            e.lastStringValue += rh(e.lastIntValue);
        return !0
    }
    return !1
}
,
sc.regexp_eatRegExpIdentifierStart = function(e) {
    const t = e.pos;
    const s = this.options.ecmaVersion >= 11;
    let i = e.current(s);
    return e.advance(s),
    92 === i && this.regexp_eatRegExpUnicodeEscapeSequence(e, s) && (i = e.lastIntValue),
    (e => Vl(e, !0) || 36 === e || 95 === e)(i) ? (e.lastIntValue = i, !0) : (e.pos = t, !1);
}
,
sc.regexp_eatRegExpIdentifierPart = function(e) {
    const t = e.pos;
    const s = this.options.ecmaVersion >= 11;
    let i = e.current(s);
    return e.advance(s),
    92 === i && this.regexp_eatRegExpUnicodeEscapeSequence(e, s) && (i = e.lastIntValue),
    (e => Bl(e, !0) || 36 === e || 95 === e || 8204 === e || 8205 === e)(i) ? (e.lastIntValue = i, !0) : (e.pos = t, !1);
}
,
sc.regexp_eatAtomEscape = function(e) {
    return !!(this.regexp_eatBackReference(e) || this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e) || e.switchN && this.regexp_eatKGroupName(e)) || (e.switchU && (99 === e.current() && e.raise("Invalid unicode escape"),
    e.raise("Invalid escape")),
    !1)
}
,
sc.regexp_eatBackReference = function(e) {
    const t = e.pos;
    if (this.regexp_eatDecimalEscape(e)) {
        const s = e.lastIntValue;
        if (e.switchU)
            return s > e.maxBackReference && (e.maxBackReference = s),
            !0;
        if (s <= e.numCapturingParens)
            return !0;
        e.pos = t
    }
    return !1
}
,
sc.regexp_eatKGroupName = function(e) {
    if (e.eat(107)) {
        if (this.regexp_eatGroupName(e))
            return e.backReferenceNames.push(e.lastStringValue),
            !0;
        e.raise("Invalid named reference")
    }
    return !1
}
,
sc.regexp_eatCharacterEscape = function(e) {
    return this.regexp_eatControlEscape(e) || this.regexp_eatCControlLetter(e) || this.regexp_eatZero(e) || this.regexp_eatHexEscapeSequence(e) || this.regexp_eatRegExpUnicodeEscapeSequence(e, !1) || !e.switchU && this.regexp_eatLegacyOctalEscapeSequence(e) || this.regexp_eatIdentityEscape(e)
}
,
sc.regexp_eatCControlLetter = function(e) {
    const t = e.pos;
    if (e.eat(99)) {
        if (this.regexp_eatControlLetter(e))
            return !0;
        e.pos = t
    }
    return !1
}
,
sc.regexp_eatZero = e => 48 === e.current() && !lc(e.lookahead()) && (e.lastIntValue = 0,
e.advance(),
!0)
,
sc.regexp_eatControlEscape = e => {
    const t = e.current();
    return 116 === t ? (e.lastIntValue = 9,
    e.advance(),
    !0) : 110 === t ? (e.lastIntValue = 10,
    e.advance(),
    !0) : 118 === t ? (e.lastIntValue = 11,
    e.advance(),
    !0) : 102 === t ? (e.lastIntValue = 12,
    e.advance(),
    !0) : 114 === t && (e.lastIntValue = 13,
    e.advance(),
    !0)
}
,
sc.regexp_eatControlLetter = e => {
    const t = e.current();
    return !!rc(t) && (e.lastIntValue = t % 32,
    e.advance(),
    !0)
}
,
sc.regexp_eatRegExpUnicodeEscapeSequence = function(e, t) {
    void 0 === t && (t = !1);
    let s;
    const i = e.pos;
    const n = t || e.switchU;
    if (e.eat(117)) {
        if (this.regexp_eatFixedHexDigits(e, 4)) {
            const r = e.lastIntValue;
            if (n && r >= 55296 && r <= 56319) {
                const o = e.pos;
                if (e.eat(92) && e.eat(117) && this.regexp_eatFixedHexDigits(e, 4)) {
                    const a = e.lastIntValue;
                    if (a >= 56320 && a <= 57343)
                        return e.lastIntValue = 1024 * (r - 55296) + (a - 56320) + 65536,
                        !0
                }
                e.pos = o,
                e.lastIntValue = r
            }
            return !0
        }
        if (n && e.eat(123) && this.regexp_eatHexDigits(e) && e.eat(125) && ((s = e.lastIntValue) >= 0 && s <= 1114111))
            return !0;
        n && e.raise("Invalid unicode escape"),
        e.pos = i
    }
    return !1
}
,
sc.regexp_eatIdentityEscape = function(e) {
    if (e.switchU)
        return !!this.regexp_eatSyntaxCharacter(e) || !!e.eat(47) && (e.lastIntValue = 47,
        !0);
    const t = e.current();
    return !(99 === t || e.switchN && 107 === t) && (e.lastIntValue = t,
    e.advance(),
    !0)
}
,
sc.regexp_eatDecimalEscape = e => {
    e.lastIntValue = 0;
    let t = e.current();
    if (t >= 49 && t <= 57) {
        do {
            e.lastIntValue = 10 * e.lastIntValue + (t - 48),
            e.advance()
        } while ((t = e.current()) >= 48 && t <= 57);
        return !0
    }
    return !1
}
,
sc.regexp_eatCharacterClassEscape = function(e) {
    const t = e.current();
    if ((e => 100 === e || 68 === e || 115 === e || 83 === e || 119 === e || 87 === e)(t)) return e.lastIntValue = -1,
    e.advance(),
    !0;
    if (e.switchU && this.options.ecmaVersion >= 9 && (80 === t || 112 === t)) {
        if (e.lastIntValue = -1,
        e.advance(),
        e.eat(123) && this.regexp_eatUnicodePropertyValueExpression(e) && e.eat(125))
            return !0;
        e.raise("Invalid property name")
    }
    return !1
}
,
sc.regexp_eatUnicodePropertyValueExpression = function(e) {
    const t = e.pos;
    if (this.regexp_eatUnicodePropertyName(e) && e.eat(61)) {
        const s = e.lastStringValue;
        if (this.regexp_eatUnicodePropertyValue(e)) {
            const i = e.lastStringValue;
            return this.regexp_validateUnicodePropertyNameAndValue(e, s, i),
            !0
        }
    }
    if (e.pos = t,
    this.regexp_eatLoneUnicodePropertyNameOrValue(e)) {
        const n = e.lastStringValue;
        return this.regexp_validateUnicodePropertyNameOrValue(e, n),
        !0
    }
    return !1
}
,
sc.regexp_validateUnicodePropertyNameAndValue = (e, t, s) => {
    sh(e.unicodeProperties.nonBinary, t) || e.raise("Invalid property name"),
    e.unicodeProperties.nonBinary[t].test(s) || e.raise("Invalid property value")
}
,
sc.regexp_validateUnicodePropertyNameOrValue = (e, t) => {
    e.unicodeProperties.binary.test(t) || e.raise("Invalid property name")
}
,
sc.regexp_eatUnicodePropertyName = e => {
    let t = 0;
    for (e.lastStringValue = ""; oc(t = e.current()); )
        e.lastStringValue += rh(t),
        e.advance();
    return "" !== e.lastStringValue
}
,
sc.regexp_eatUnicodePropertyValue = e => {
    let t = 0;
    for (e.lastStringValue = ""; ac(t = e.current()); )
        e.lastStringValue += rh(t),
        e.advance();
    return "" !== e.lastStringValue
}
,
sc.regexp_eatLoneUnicodePropertyNameOrValue = function(e) {
    return this.regexp_eatUnicodePropertyValue(e)
}
,
sc.regexp_eatCharacterClass = function(e) {
    if (e.eat(91)) {
        if (e.eat(94),
        this.regexp_classRanges(e),
        e.eat(93))
            return !0;
        e.raise("Unterminated character class")
    }
    return !1
}
,
sc.regexp_classRanges = function(e) {
    for (; this.regexp_eatClassAtom(e); ) {
        const t = e.lastIntValue;
        if (e.eat(45) && this.regexp_eatClassAtom(e)) {
            const s = e.lastIntValue;
            !e.switchU || -1 !== t && -1 !== s || e.raise("Invalid character class"),
            -1 !== t && -1 !== s && t > s && e.raise("Range out of order in character class")
        }
    }
}
,
sc.regexp_eatClassAtom = function(e) {
    const t = e.pos;
    if (e.eat(92)) {
        if (this.regexp_eatClassEscape(e))
            return !0;
        if (e.switchU) {
            const s = e.current();
            (99 === s || uc(s)) && e.raise("Invalid class escape"),
            e.raise("Invalid escape")
        }
        e.pos = t
    }
    const i = e.current();
    return 93 !== i && (e.lastIntValue = i,
    e.advance(),
    !0)
}
,
sc.regexp_eatClassEscape = function(e) {
    const t = e.pos;
    if (e.eat(98))
        return e.lastIntValue = 8,
        !0;
    if (e.switchU && e.eat(45))
        return e.lastIntValue = 45,
        !0;
    if (!e.switchU && e.eat(99)) {
        if (this.regexp_eatClassControlLetter(e))
            return !0;
        e.pos = t
    }
    return this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e)
}
,
sc.regexp_eatClassControlLetter = e => {
    const t = e.current();
    return !(!lc(t) && 95 !== t) && (e.lastIntValue = t % 32,
    e.advance(),
    !0)
}
,
sc.regexp_eatHexEscapeSequence = function(e) {
    const t = e.pos;
    if (e.eat(120)) {
        if (this.regexp_eatFixedHexDigits(e, 2))
            return !0;
        e.switchU && e.raise("Invalid escape"),
        e.pos = t
    }
    return !1
}
,
sc.regexp_eatDecimalDigits = e => {
    const t = e.pos;
    let s = 0;
    for (e.lastIntValue = 0; lc(s = e.current()); )
        e.lastIntValue = 10 * e.lastIntValue + (s - 48),
        e.advance();
    return e.pos !== t
}
,
sc.regexp_eatHexDigits = e => {
    const t = e.pos;
    let s = 0;
    for (e.lastIntValue = 0; hc(s = e.current()); )
        e.lastIntValue = 16 * e.lastIntValue + cc(s),
        e.advance();
    return e.pos !== t
}
,
sc.regexp_eatLegacyOctalEscapeSequence = function(e) {
    if (this.regexp_eatOctalDigit(e)) {
        const t = e.lastIntValue;
        if (this.regexp_eatOctalDigit(e)) {
            const s = e.lastIntValue;
            t <= 3 && this.regexp_eatOctalDigit(e) ? e.lastIntValue = 64 * t + 8 * s + e.lastIntValue : e.lastIntValue = 8 * t + s
        } else
            e.lastIntValue = t;
        return !0
    }
    return !1
}
,
sc.regexp_eatOctalDigit = e => {
    const t = e.current();
    return uc(t) ? (e.lastIntValue = t - 48,
    e.advance(),
    !0) : (e.lastIntValue = 0,
    !1)
}
,
sc.regexp_eatFixedHexDigits = (e, t) => {
    const s = e.pos;
    e.lastIntValue = 0;
    for (let i = 0; i < t; ++i) {
        const n = e.current();
        if (!hc(n))
            return e.pos = s,
            !1;
        e.lastIntValue = 16 * e.lastIntValue + cc(n),
        e.advance()
    }
    return !0
}
;
const dc = function(e) {
          this.type = e.type,
          this.value = e.value,
          this.start = e.start,
          this.end = e.end,
          e.options.locations && (this.loc = new lh(e,e.startLoc,e.endLoc)),
          e.options.ranges && (this.range = [e.start, e.end])
      },
      pc = mh.prototype;
function fc(e) {
    return "function" != typeof BigInt ? null : BigInt(e.replace(/_/g, ""))
}
pc.next = function(e) {
    !e && this.type.keyword && this.containsEsc && this.raiseRecoverable(this.start, `Escape sequence in keyword ${this.type.keyword}`),
    this.options.onToken && this.options.onToken(new dc(this)),
    this.lastTokEnd = this.end,
    this.lastTokStart = this.start,
    this.lastTokEndLoc = this.endLoc,
    this.lastTokStartLoc = this.startLoc,
    this.nextToken()
}
,
pc.getToken = function() {
    return this.next(),
    new dc(this)
}
,
"undefined" != typeof Symbol && (pc[Symbol.iterator] = function() {
    const e = this;
    return {
        next() {
            const t = e.getToken();
            return {
                done: t.type === ql.eof,
                value: t
            }
        }
    };
}
),
pc.nextToken = function() {
    const e = this.curContext();
    return e && e.preserveSpace || this.skipSpace(),
    this.start = this.pos,
    this.options.locations && (this.startLoc = this.curPosition()),
    this.pos >= this.input.length ? this.finishToken(ql.eof) : e.override ? e.override(this) : void this.readToken(this.fullCharCodeAtPos())
}
,
pc.readToken = function(e) {
    return Vl(e, this.options.ecmaVersion >= 6) || 92 === e ? this.readWord() : this.getTokenFromCode(e)
}
,
pc.fullCharCodeAtPos = function() {
    const e = this.input.charCodeAt(this.pos);
    if (e <= 55295 || e >= 56320)
        return e;
    const t = this.input.charCodeAt(this.pos + 1);
    return t <= 56319 || t >= 57344 ? e : (e << 10) + t - 56613888
}
,
pc.skipBlockComment = function() {
    const e = this.options.onComment && this.curPosition(), t = this.pos, s = this.input.indexOf("*/", this.pos += 2);
    if (-1 === s && this.raise(this.pos - 2, "Unterminated comment"),
    this.pos = s + 2,
    this.options.locations)
        for (let i = void 0, n = t; (i = Xl(this.input, n, this.pos)) > -1; )
            ++this.curLine,
            n = this.lineStart = i;
    this.options.onComment && this.options.onComment(!0, this.input.slice(t + 2, s), t, this.pos, e, this.curPosition())
}
,
pc.skipLineComment = function(e) {
    for (var t = this.pos, s = this.options.onComment && this.curPosition(), i = this.input.charCodeAt(this.pos += e); this.pos < this.input.length && !Yl(i); )
        i = this.input.charCodeAt(++this.pos);
    this.options.onComment && this.options.onComment(!1, this.input.slice(t + e, this.pos), t, this.pos, s, this.curPosition())
}
,
pc.skipSpace = function() {
    e: for (; this.pos < this.input.length; ) {
        var e = this.input.charCodeAt(this.pos);
        switch (e) {
        case 32:
        case 160:
            ++this.pos;
            break;
        case 13:
            10 === this.input.charCodeAt(this.pos + 1) && ++this.pos;
        case 10:
        case 8232:
        case 8233:
            ++this.pos,
            this.options.locations && (++this.curLine,
            this.lineStart = this.pos);
            break;
        case 47:
            switch (this.input.charCodeAt(this.pos + 1)) {
            case 42:
                this.skipBlockComment();
                break;
            case 47:
                this.skipLineComment(2);
                break;
            default:
                break e
            }
            break;
        default:
            if (!(e > 8 && e < 14 || e >= 5760 && Ql.test(String.fromCharCode(e))))
                break e;
            ++this.pos
        }
    }
}
,
pc.finishToken = function(e, t) {
    this.end = this.pos,
    this.options.locations && (this.endLoc = this.curPosition());
    const s = this.type;
    this.type = e,
    this.value = t,
    this.updateContext(s)
}
,
pc.readToken_dot = function() {
    const e = this.input.charCodeAt(this.pos + 1);
    if (e >= 48 && e <= 57)
        return this.readNumber(!0);
    const t = this.input.charCodeAt(this.pos + 2);
    return this.options.ecmaVersion >= 6 && 46 === e && 46 === t ? (this.pos += 3,
    this.finishToken(ql.ellipsis)) : (++this.pos,
    this.finishToken(ql.dot))
}
,
pc.readToken_slash = function() {
    const e = this.input.charCodeAt(this.pos + 1);
    return this.exprAllowed ? (++this.pos,
    this.readRegexp()) : 61 === e ? this.finishOp(ql.assign, 2) : this.finishOp(ql.slash, 1)
}
,
pc.readToken_mult_modulo_exp = function(e) {
    let t = this.input.charCodeAt(this.pos + 1), s = 1, i = 42 === e ? ql.star : ql.modulo;
    return this.options.ecmaVersion >= 7 && 42 === e && 42 === t && (++s,
    i = ql.starstar,
    t = this.input.charCodeAt(this.pos + 2)),
    61 === t ? this.finishOp(ql.assign, s + 1) : this.finishOp(i, s)
}
,
pc.readToken_pipe_amp = function(e) {
    const t = this.input.charCodeAt(this.pos + 1);
    if (t === e) {
        if (this.options.ecmaVersion >= 12)
            if (61 === this.input.charCodeAt(this.pos + 2))
                return this.finishOp(ql.assign, 3);
        return this.finishOp(124 === e ? ql.logicalOR : ql.logicalAND, 2)
    }
    return 61 === t ? this.finishOp(ql.assign, 2) : this.finishOp(124 === e ? ql.bitwiseOR : ql.bitwiseAND, 1)
}
,
pc.readToken_caret = function() {
    return 61 === this.input.charCodeAt(this.pos + 1) ? this.finishOp(ql.assign, 2) : this.finishOp(ql.bitwiseXOR, 1)
}
,
pc.readToken_plus_min = function(e) {
    const t = this.input.charCodeAt(this.pos + 1);
    return t === e ? 45 !== t || this.inModule || 62 !== this.input.charCodeAt(this.pos + 2) || 0 !== this.lastTokEnd && !Hl.test(this.input.slice(this.lastTokEnd, this.pos)) ? this.finishOp(ql.incDec, 2) : (this.skipLineComment(3),
    this.skipSpace(),
    this.nextToken()) : 61 === t ? this.finishOp(ql.assign, 2) : this.finishOp(ql.plusMin, 1)
}
,
pc.readToken_lt_gt = function(e) {
    const t = this.input.charCodeAt(this.pos + 1);
    let s = 1;
    return t === e ? (s = 62 === e && 62 === this.input.charCodeAt(this.pos + 2) ? 3 : 2,
    61 === this.input.charCodeAt(this.pos + s) ? this.finishOp(ql.assign, s + 1) : this.finishOp(ql.bitShift, s)) : 33 !== t || 60 !== e || this.inModule || 45 !== this.input.charCodeAt(this.pos + 2) || 45 !== this.input.charCodeAt(this.pos + 3) ? (61 === t && (s = 2),
    this.finishOp(ql.relational, s)) : (this.skipLineComment(4),
    this.skipSpace(),
    this.nextToken())
}
,
pc.readToken_eq_excl = function(e) {
    const t = this.input.charCodeAt(this.pos + 1);
    return 61 === t ? this.finishOp(ql.equality, 61 === this.input.charCodeAt(this.pos + 2) ? 3 : 2) : 61 === e && 62 === t && this.options.ecmaVersion >= 6 ? (this.pos += 2,
    this.finishToken(ql.arrow)) : this.finishOp(61 === e ? ql.eq : ql.prefix, 1)
}
,
pc.readToken_question = function() {
    const e = this.options.ecmaVersion;
    if (e >= 11) {
        const t = this.input.charCodeAt(this.pos + 1);
        if (46 === t) {
            const s = this.input.charCodeAt(this.pos + 2);
            if (s < 48 || s > 57)
                return this.finishOp(ql.questionDot, 2)
        }
        if (63 === t) {
            if (e >= 12)
                if (61 === this.input.charCodeAt(this.pos + 2))
                    return this.finishOp(ql.assign, 3);
            return this.finishOp(ql.coalesce, 2)
        }
    }
    return this.finishOp(ql.question, 1)
}
,
pc.readToken_numberSign = function() {
    let e = 35;
    if (this.options.ecmaVersion >= 13 && (++this.pos,
    Vl(e = this.fullCharCodeAtPos(), !0) || 92 === e))
        return this.finishToken(ql.privateId, this.readWord1());
    this.raise(this.pos, `Unexpected character '${rh(e)}'`)
}
,
pc.getTokenFromCode = function(e) {
    switch (e) {
    case 46:
        return this.readToken_dot();
    case 40:
        return ++this.pos,
        this.finishToken(ql.parenL);
    case 41:
        return ++this.pos,
        this.finishToken(ql.parenR);
    case 59:
        return ++this.pos,
        this.finishToken(ql.semi);
    case 44:
        return ++this.pos,
        this.finishToken(ql.comma);
    case 91:
        return ++this.pos,
        this.finishToken(ql.bracketL);
    case 93:
        return ++this.pos,
        this.finishToken(ql.bracketR);
    case 123:
        return ++this.pos,
        this.finishToken(ql.braceL);
    case 125:
        return ++this.pos,
        this.finishToken(ql.braceR);
    case 58:
        return ++this.pos,
        this.finishToken(ql.colon);
    case 96:
        if (this.options.ecmaVersion < 6)
            break;
        return ++this.pos,
        this.finishToken(ql.backQuote);
    case 48:
        const t = this.input.charCodeAt(this.pos + 1);
        if (120 === t || 88 === t)
            return this.readRadixNumber(16);
        if (this.options.ecmaVersion >= 6) {
            if (111 === t || 79 === t)
                return this.readRadixNumber(8);
            if (98 === t || 66 === t)
                return this.readRadixNumber(2)
        }
    case 49:
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57:
        return this.readNumber(!1);
    case 34:
    case 39:
        return this.readString(e);
    case 47:
        return this.readToken_slash();
    case 37:
    case 42:
        return this.readToken_mult_modulo_exp(e);
    case 124:
    case 38:
        return this.readToken_pipe_amp(e);
    case 94:
        return this.readToken_caret();
    case 43:
    case 45:
        return this.readToken_plus_min(e);
    case 60:
    case 62:
        return this.readToken_lt_gt(e);
    case 61:
    case 33:
        return this.readToken_eq_excl(e);
    case 63:
        return this.readToken_question();
    case 126:
        return this.finishOp(ql.prefix, 1);
    case 35:
        return this.readToken_numberSign()
    }
    this.raise(this.pos, `Unexpected character '${rh(e)}'`)
}
,
pc.finishOp = function(e, t) {
    const s = this.input.slice(this.pos, this.pos + t);
    return this.pos += t,
    this.finishToken(e, s)
}
,
pc.readRegexp = function() {
    for (var e, t, s = this.pos; ; ) {
        this.pos >= this.input.length && this.raise(s, "Unterminated regular expression");
        const i = this.input.charAt(this.pos);
        if (Hl.test(i) && this.raise(s, "Unterminated regular expression"),
        e)
            e = !1;
        else {
            if ("[" === i)
                t = !0;
            else if ("]" === i && t)
                t = !1;
            else if ("/" === i && !t)
                break;
            e = "\\" === i
        }
        ++this.pos
    }
    const n = this.input.slice(s, this.pos);
    ++this.pos;
    const r = this.pos, o = this.readWord1();
    this.containsEsc && this.unexpected(r);
    const a = this.regexpState || (this.regexpState = new ic(this));
    a.reset(s, n, o),
    this.validateRegExpFlags(a),
    this.validateRegExpPattern(a);
    let l = null;
    try {
        l = new RegExp(n,o)
    } catch (e) {}
    return this.finishToken(ql.regexp, {
        pattern: n,
        flags: o,
        value: l
    })
}
,
pc.readInt = function(e, t, s) {
    for (var i = this.options.ecmaVersion >= 12 && void 0 === t, n = s && 48 === this.input.charCodeAt(this.pos), r = this.pos, o = 0, a = 0, l = 0, h = null == t ? 1 / 0 : t; l < h; ++l,
    ++this.pos) {
        const c = this.input.charCodeAt(this.pos);
        let u = void 0;
        if (i && 95 === c)
            n && this.raiseRecoverable(this.pos, "Numeric separator is not allowed in legacy octal numeric literals"),
            95 === a && this.raiseRecoverable(this.pos, "Numeric separator must be exactly one underscore"),
            0 === l && this.raiseRecoverable(this.pos, "Numeric separator is not allowed at the first of digits"),
            a = c;
        else {
            if ((u = c >= 97 ? c - 97 + 10 : c >= 65 ? c - 65 + 10 : c >= 48 && c <= 57 ? c - 48 : 1 / 0) >= e)
                break;
            a = c,
            o = o * e + u
        }
    }
    return i && 95 === a && this.raiseRecoverable(this.pos - 1, "Numeric separator is not allowed at the last of digits"),
    this.pos === r || null != t && this.pos - r !== t ? null : o
}
,
pc.readRadixNumber = function(e) {
    const t = this.pos;
    this.pos += 2;
    let s = this.readInt(e);
    return null == s && this.raise(this.start + 2, `Expected number in radix ${e}`),
    this.options.ecmaVersion >= 11 && 110 === this.input.charCodeAt(this.pos) ? (s = fc(this.input.slice(t, this.pos)),
    ++this.pos) : Vl(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"),
    this.finishToken(ql.num, s);
}
,
pc.readNumber = function(e) {
    const t = this.pos;
    e || null !== this.readInt(10, void 0, !0) || this.raise(t, "Invalid number");
    let s = this.pos - t >= 2 && 48 === this.input.charCodeAt(t);
    s && this.strict && this.raise(t, "Invalid number");
    let i = this.input.charCodeAt(this.pos);
    if (!s && !e && this.options.ecmaVersion >= 11 && 110 === i) {
        const n = fc(this.input.slice(t, this.pos));
        return ++this.pos,
        Vl(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"),
        this.finishToken(ql.num, n)
    }
    s && /[89]/.test(this.input.slice(t, this.pos)) && (s = !1),
    46 !== i || s || (++this.pos,
    this.readInt(10),
    i = this.input.charCodeAt(this.pos)),
    69 !== i && 101 !== i || s || (43 !== (i = this.input.charCodeAt(++this.pos)) && 45 !== i || ++this.pos,
    null === this.readInt(10) && this.raise(t, "Invalid number")),
    Vl(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number");
    let r;

    const o = (r = this.input.slice(t, this.pos),
    s ? parseInt(r, 8) : parseFloat(r.replace(/_/g, "")));

    return this.finishToken(ql.num, o)
}
,
pc.readCodePoint = function() {
    let e;
    if (123 === this.input.charCodeAt(this.pos)) {
        this.options.ecmaVersion < 6 && this.unexpected();
        const t = ++this.pos;
        e = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos),
        ++this.pos,
        e > 1114111 && this.invalidStringToken(t, "Code point out of bounds")
    } else
        e = this.readHexChar(4);
    return e
}
,
pc.readString = function(e) {
    for (var t = "", s = ++this.pos; ; ) {
        this.pos >= this.input.length && this.raise(this.start, "Unterminated string constant");
        const i = this.input.charCodeAt(this.pos);
        if (i === e)
            break;
        92 === i ? (t += this.input.slice(s, this.pos),
        t += this.readEscapedChar(!1),
        s = this.pos) : 8232 === i || 8233 === i ? (this.options.ecmaVersion < 10 && this.raise(this.start, "Unterminated string constant"),
        ++this.pos,
        this.options.locations && (this.curLine++,
        this.lineStart = this.pos)) : (Yl(i) && this.raise(this.start, "Unterminated string constant"),
        ++this.pos)
    }
    return t += this.input.slice(s, this.pos++),
    this.finishToken(ql.string, t)
}
;
const mc = {};
pc.tryReadTemplateToken = function() {
    this.inTemplateElement = !0;
    try {
        this.readTmplToken()
    } catch (e) {
        if (e !== mc)
            throw e;
        this.readInvalidTemplateToken()
    }
    this.inTemplateElement = !1
}
,
pc.invalidStringToken = function(e, t) {
    if (this.inTemplateElement && this.options.ecmaVersion >= 9)
        throw mc;
    this.raise(e, t)
}
,
pc.readTmplToken = function() {
    for (let e = "", t = this.pos; ; ) {
        this.pos >= this.input.length && this.raise(this.start, "Unterminated template");
        const s = this.input.charCodeAt(this.pos);
        if (96 === s || 36 === s && 123 === this.input.charCodeAt(this.pos + 1))
            return this.pos !== this.start || this.type !== ql.template && this.type !== ql.invalidTemplate ? (e += this.input.slice(t, this.pos),
            this.finishToken(ql.template, e)) : 36 === s ? (this.pos += 2,
            this.finishToken(ql.dollarBraceL)) : (++this.pos,
            this.finishToken(ql.backQuote));
        if (92 === s)
            e += this.input.slice(t, this.pos),
            e += this.readEscapedChar(!0),
            t = this.pos;
        else if (Yl(s)) {
            switch (e += this.input.slice(t, this.pos),
            ++this.pos,
            s) {
            case 13:
                10 === this.input.charCodeAt(this.pos) && ++this.pos;
            case 10:
                e += "\n";
                break;
            default:
                e += String.fromCharCode(s)
            }
            this.options.locations && (++this.curLine,
            this.lineStart = this.pos),
            t = this.pos
        } else
            ++this.pos
    }
}
,
pc.readInvalidTemplateToken = function() {
    for (; this.pos < this.input.length; this.pos++)
        switch (this.input[this.pos]) {
        case "\\":
            ++this.pos;
            break;
        case "$":
            if ("{" !== this.input[this.pos + 1])
                break;
        case "`":
            return this.finishToken(ql.invalidTemplate, this.input.slice(this.start, this.pos))
        }
    this.raise(this.start, "Unterminated template")
}
,
pc.readEscapedChar = function(e) {
    let t = this.input.charCodeAt(++this.pos);
    switch (++this.pos,
    t) {
    case 110:
        return "\n";
    case 114:
        return "\r";
    case 120:
        return String.fromCharCode(this.readHexChar(2));
    case 117:
        return rh(this.readCodePoint());
    case 116:
        return "\t";
    case 98:
        return "\b";
    case 118:
        return "\v";
    case 102:
        return "\f";
    case 13:
        10 === this.input.charCodeAt(this.pos) && ++this.pos;
    case 10:
        return this.options.locations && (this.lineStart = this.pos,
        ++this.curLine),
        "";
    case 56:
    case 57:
        if (this.strict && this.invalidStringToken(this.pos - 1, "Invalid escape sequence"),
        e) {
            const s = this.pos - 1;
            this.invalidStringToken(s, "Invalid escape sequence in template string")
        }
    default:
        if (t >= 48 && t <= 55) {
            let i = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0], n = parseInt(i, 8);
            return n > 255 && (i = i.slice(0, -1),
            n = parseInt(i, 8)),
            this.pos += i.length - 1,
            t = this.input.charCodeAt(this.pos),
            "0" === i && 56 !== t && 57 !== t || !this.strict && !e || this.invalidStringToken(this.pos - 1 - i.length, e ? "Octal literal in template string" : "Octal literal in strict mode"),
            String.fromCharCode(n)
        }
        return Yl(t) ? "" : String.fromCharCode(t)
    }
}
,
pc.readHexChar = function(e) {
    const t = this.pos, s = this.readInt(16, e);
    return null === s && this.invalidStringToken(t, "Bad character escape sequence"),
    s
}
,
pc.readWord1 = function() {
    this.containsEsc = !1;
    for (var e = "", t = !0, s = this.pos, i = this.options.ecmaVersion >= 6; this.pos < this.input.length; ) {
        const n = this.fullCharCodeAtPos();
        if (Bl(n, i))
            this.pos += n <= 65535 ? 1 : 2;
        else {
            if (92 !== n)
                break;
            this.containsEsc = !0,
            e += this.input.slice(s, this.pos);
            const r = this.pos;
            117 !== this.input.charCodeAt(++this.pos) && this.invalidStringToken(this.pos, "Expecting Unicode escape sequence \\uXXXX"),
            ++this.pos;
            const o = this.readCodePoint();
            (t ? Vl : Bl)(o, i) || this.invalidStringToken(r, "Invalid Unicode escape"),
            e += rh(o),
            s = this.pos
        }
        t = !1
    }
    return e + this.input.slice(s, this.pos)
}
,
pc.readWord = function() {
    const e = this.readWord1();
    let t = ql.name;
    return this.keywords.test(e) && (t = Gl[e]),
    this.finishToken(t, e)
}
;
const gc = "8.8.2";
mh.acorn = {
    Parser: mh,
    version: gc,
    defaultOptions: ch,
    Position: ah,
    SourceLocation: lh,
    getLineInfo: hh,
    Node: Vh,
    TokenType: zl,
    tokTypes: ql,
    keywordTypes: Gl,
    TokContext: $h,
    tokContexts: Nh,
    isIdentifierChar: Bl,
    isIdentifierStart: Vl,
    Token: dc,
    isNewLine: Yl,
    lineBreak: Hl,
    lineBreakG: Kl,
    nonASCIIwhitespace: Ql
};
const yc = Object.freeze({
    __proto__: null,
    Node: Vh,
    Parser: mh,
    Position: ah,
    SourceLocation: lh,
    TokContext: $h,
    Token: dc,
    TokenType: zl,
    defaultOptions: ch,
    getLineInfo: hh,
    isIdentifierChar: Bl,
    isIdentifierStart: Vl,
    isNewLine: Yl,
    keywordTypes: Gl,
    lineBreak: Hl,
    lineBreakG: Kl,
    nonASCIIwhitespace: Ql,
    parse(e, t) {
        return mh.parse(e, t)
    },
    parseExpressionAt(e, t, s) {
        return mh.parseExpressionAt(e, t, s)
    },
    tokContexts: Nh,
    tokTypes: ql,
    tokenizer(e, t) {
        return mh.tokenizer(e, t)
    },
    version: gc
});
const xc = e=>()=>ze((e => ({
    code: "NO_FS_IN_BROWSER",
    message: `Cannot access the file system (via "${e}") when using the browser build of Rollup. Make sure you supply a plugin with custom resolveId and load hooks to Rollup.`,
    url: ke("plugin-development/#a-simple-example")
}))(e))
  , bc = xc("fs.mkdir")
  , Ec = xc("fs.readFile")
  , vc = xc("fs.writeFile");
async function Sc(e, t, s, i, n, r, o, a, l) {
    const h = await ((e, t, s, i, n, r, o, a) => {
        let l = null
          , h = null;
        if (n) {
            l = new Set;
            for (const s of n)
                e === s.source && t === s.importer && l.add(s.plugin);
            h = (e,t)=>({
                ...e,
                resolve: (e,s,{assertions: r, custom: o, isEntry: a, skipSelf: l}=pe)=>i(e, s, o, a, r || fe, l ? [...n, {
                    importer: s,
                    plugin: t,
                    source: e
                }] : n)
            })
        }
        return s.hookFirstAndGetPlugin("resolveId", [e, t, {
            assertions: a,
            custom: r,
            isEntry: o
        }], h, l)
    })(e, t, i, n, r, o, a, l);
    return null == h ? xc("path.resolve")() : h[0]
}
const Ac = "at position "
  , kc = "at output position ";
const wc = {
    delete: ()=>!1,
    get() {},
    has: ()=>!1,
    set() {}
};
function Ic(e) {
    return e.startsWith(Ac) || e.startsWith(kc) ? ze({
        code: Ge,
        message: "A plugin is trying to use the Rollup cache but is not declaring a plugin name or cacheKey."
    }) : ze({
        code: Xe,
        message: `The plugin name ${e} is being used twice in the same build. Plugin names must be distinct or provide a cacheKey (please post an issue to the plugin if you are a plugin user).`
    })
}
async function Pc({map, code, ast}, t, s, i) {
    const n = t.id
      , r = [];
    let o = null === map ? null : Sl(map);
    const a = code;
    let h = ast;
    const c = []
      , u = [];
    let d = !1;
    const p = ()=>d = !0;
    let f = "";
    const m = code;
    let y;
    try {
        y = await s.hookReduceArg0("transform", [m, n], ((e, s, {name}) => {
            let o, a;
            if ("string" == typeof s)
                o = s;
            else {
                if (!s || "object" != typeof s)
                    return e;
                if (t.updateOptions(s),
                null == s.code)
                    return (s.map || s.ast) && i((e => ({
                        code: dt,
                        message: `The plugin "${e}" returned a "map" or "ast" without returning a "code". This will be ignored.`
                    }))(name)),
                    e;
                ({code: o, map: a, ast: h} = s)
            }
            return null !== a && r.push(Sl("string" == typeof a ? JSON.parse(a) : a) || {
                missing: !0,
                plugin: name
            }),
            o;
        }
        ), ((e, {name}) => {
            return f = name,
            {
                ...e,
                addWatchFile(t) {
                    c.push(t),
                    e.addWatchFile(t)
                },
                cache: d ? e.cache : (h = e.cache,
                y = p,
                {
                    delete: e=>(y(),
                    h.delete(e)),
                    get: e=>(y(),
                    h.get(e)),
                    has: e=>(y(),
                    h.has(e)),
                    set: (e,t)=>(y(),
                    h.set(e, t))
                }),
                emitFile: e=>(u.push(e),
                s.emitFile(e)),
                error: (t,s)=>("string" == typeof t && (t = {
                    message: t
                }),
                s && Fe(t, s, m, n),
                t.id = n,
                t.hook = "transform",
                e.error(t)),
                getCombinedSourcemap() {
                    const e = ((e, t, s, i, n) => 0 === i.length ? s : {
                        version: 3,
                        ...Da(e, t, s, i, Oa(n)).traceMappings()
                    })(n, a, o, r, i);
                    if (!e) {
                        return new g(a).generateMap({
                            hires: !0,
                            includeContent: !0,
                            source: n
                        })
                    }
                    return o !== e && (o = e,
                    r.length = 0),
                    new l({
                        ...e,
                        file: null,
                        sourcesContent: e.sourcesContent
                    })
                },
                setAssetSource() {
                    return this.error({
                        code: nt,
                        message: "setAssetSource cannot be called in transform for caching reasons. Use emitFile with a source, or call setAssetSource in another hook."
                    })
                },
                warn(t, s) {
                    "string" == typeof t && (t = {
                        message: t
                    }),
                    s && Fe(t, s, m, n),
                    t.id = n,
                    t.hook = "transform",
                    e.warn(t)
                }
            };
            var h, y
        }
        ))
    } catch (e) {
        return ze(_t(e, f, {
            hook: "transform",
            id: n
        }))
    }
    return !d && u.length > 0 && (t.transformFiles = u),
    {
        ast: h,
        code: y,
        customTransformCache: d,
        originalCode: a,
        originalSourcemap: o,
        sourcemapChain: r,
        transformDependencies: c
    }
}
const Cc = "resolveDependencies";
class $c {
    constructor(e, t, s, i) {
        this.graph = e,
        this.modulesById = t,
        this.options = s,
        this.pluginDriver = i,
        this.implicitEntryModules = new Set,
        this.indexedEntryModules = [],
        this.latestLoadModulesPromise = Promise.resolve(),
        this.moduleLoadPromises = new Map,
        this.modulesWithLoadedDependencies = new Set,
        this.nextChunkNamePriority = 0,
        this.nextEntryModuleIndex = 0,
        this.resolveId = async(e,t,s,i,n,r=null)=>this.getResolvedIdWithDefaults(this.getNormalizedResolvedIdWithoutDefaults(!this.options.external(e, t, !1) && (await Sc(e, t, this.options.preserveSymlinks, this.pluginDriver, this.resolveId, r, s, "boolean" == typeof i ? i : !t, n)), t, e), n),
        this.hasModuleSideEffects = s.treeshake ? s.treeshake.moduleSideEffects : ()=>!0
    }
    async addAdditionalModules(e) {
        const t = this.extendLoadModulesPromise(Promise.all(e.map((e=>this.loadEntryModule(e, !1, void 0, null)))));
        return await this.awaitLoadModulesPromise(),
        t
    }
    async addEntryModules(e, t) {
        const s = this.nextEntryModuleIndex;
        this.nextEntryModuleIndex += e.length;
        const i = this.nextChunkNamePriority;
        this.nextChunkNamePriority += e.length;
        const n = await this.extendLoadModulesPromise(Promise.all(e.map((({id: e, importer: t})=>this.loadEntryModule(e, !0, t, null)))).then((n=>{
            for (const [r,o] of n.entries()) {
                o.isUserDefinedEntryPoint = o.isUserDefinedEntryPoint || t,
                _c(o, e[r], t, i + r);
                const n = this.indexedEntryModules.find((({module}) => module === o));
                n ? n.index = Math.min(n.index, s + r) : this.indexedEntryModules.push({
                    index: s + r,
                    module: o
                })
            }
            return this.indexedEntryModules.sort((({index: e},{index: t})=>e > t ? 1 : -1)),
            n
        }
        )));
        return await this.awaitLoadModulesPromise(),
        {
            entryModules: this.indexedEntryModules.map((({module: e})=>e)),
            implicitEntryModules: [...this.implicitEntryModules],
            newEntryModules: n
        }
    }
    async emitChunk({fileName: e, id: t, importer: s, name: i, implicitlyLoadedAfterOneOf: n, preserveSignature: r}) {
        const o = {
            fileName: e || null,
            id: t,
            importer: s,
            name: i || null
        }
          , a = n ? await this.addEntryWithImplicitDependants(o, n) : (await this.addEntryModules([o], !1)).newEntryModules[0];
        return null != r && (a.preserveSignature = r),
        a
    }
    async preloadModule(e) {
        return (await this.fetchModule(this.getResolvedIdWithDefaults(e, fe), void 0, !1, !e.resolveDependencies || Cc)).info
    }
    addEntryWithImplicitDependants(e, t) {
        const s = this.nextChunkNamePriority++;
        return this.extendLoadModulesPromise(this.loadEntryModule(e.id, !1, e.importer, null).then((async i=>{
            if (_c(i, e, !1, s),
            !i.info.isEntry) {
                this.implicitEntryModules.add(i);
                const s = await Promise.all(t.map((t=>this.loadEntryModule(t, !1, e.importer, i.id))));
                for (const e of s)
                    i.implicitlyLoadedAfter.add(e);
                for (const e of i.implicitlyLoadedAfter)
                    e.implicitlyLoadedBefore.add(i)
            }
            return i
        }
        )))
    }
    async addModuleSource(e, t, s) {
        let i;
        try {
            i = await this.graph.fileOperationQueue.run((async()=>(await this.pluginDriver.hookFirst("load", [e])) ?? (await Ec(e, "utf8"))))
        } catch (s) {
            let i = `Could not load ${e}`;
            throw (t && (i += ` (imported by ${D(t)})`), i += `: ${s.message}`, s.message = i, s)
        }
        const n = "string" == typeof i ? {
            code: i
        } : null != i && "object" == typeof i && "string" == typeof i.code ? i : ze((e => ({
            code: "BAD_LOADER",
            message: `Error loading "${D(e)}": plugin load hook should return a string, a { code, map } object, or nothing/null.`
        }))(e))
          , r = this.graph.cachedModules.get(e);
        if (!r || r.customTransformCache || r.originalCode !== n.code || (await this.pluginDriver.hookFirst("shouldTransformCachedModule", [{
            ast: r.ast,
            code: r.code,
            id: r.id,
            meta: r.meta,
            moduleSideEffects: r.moduleSideEffects,
            resolvedSources: r.resolvedIds,
            syntheticNamedExports: r.syntheticNamedExports
        }])))
            s.updateOptions(n),
            s.setSource(await Pc(n, s, this.pluginDriver, this.options.onwarn));
        else {
            if (r.transformFiles)
                for (const e of r.transformFiles)
                    this.pluginDriver.emitFile(e);
            s.setSource(r)
        }
    }
    async awaitLoadModulesPromise() {
        let e;
        do {
            e = this.latestLoadModulesPromise,
            await e
        } while (e !== this.latestLoadModulesPromise)
    }
    extendLoadModulesPromise(e) {
        return this.latestLoadModulesPromise = Promise.all([e, this.latestLoadModulesPromise]),
        this.latestLoadModulesPromise.catch((()=>{}
        )),
        e
    }
    async fetchDynamicDependencies({id, dynamicDependencies}, t) {
        const s = await Promise.all(t.map((t=>t.then((async([t,s])=>null === s ? null : "string" == typeof s ? (t.resolution = s,
        null) : t.resolution = await this.fetchResolvedDependency(D(s.id), id, s))))));
        for (const t of s)
            t && (dynamicDependencies.add(t),
            t.dynamicImporters.push(id))
    }
    async fetchModule({assertions: e, id: t, meta: s, moduleSideEffects: i, syntheticNamedExports: n}, r, o, a) {
        const l = this.modulesById.get(t);
        if (l instanceof bo)
            return r && io(e, l.info.assertions) && this.options.onwarn(wt(l.info.assertions, e, t, r)),
            await this.handleExistingModule(l, o, a),
            l;
        const h = new bo(this.graph,t,this.options,o,i,n,s,e);
        this.modulesById.set(t, h),
        this.graph.watchFiles[t] = !0;
        const c = this.addModuleSource(t, r, h).then((()=>[this.getResolveStaticDependencyPromises(h), this.getResolveDynamicImportPromises(h), u]))
          , u = Mc(c).then((()=>this.pluginDriver.hookParallel("moduleParsed", [h.info])));
        u.catch((()=>{}
        )),
        this.moduleLoadPromises.set(h, c);
        const d = await c;
        return a ? a === Cc && (await u) : await this.fetchModuleDependencies(h, ...d),
        h;
    }
    async fetchModuleDependencies(e, t, s, i) {
        this.modulesWithLoadedDependencies.has(e) || (this.modulesWithLoadedDependencies.add(e),
        await Promise.all([this.fetchStaticDependencies(e, t), this.fetchDynamicDependencies(e, s)]),
        e.linkImports(),
        await i)
    }
    fetchResolvedDependency(e, t, s) {
        if (s.external) {
            const {assertions: i, external: n, id: r, moduleSideEffects: o, meta: a} = s;
            let l = this.modulesById.get(r);
            if (l) {
                if (!(l instanceof jt))
                    return ze(((e, t) => ({
                        code: "INVALID_EXTERNAL_ID",
                        message: `"${e}" is imported as an external by "${D(t)}", but is already an existing non-external module id.`
                    }))(e, t));
                io(l.info.assertions, i) && this.options.onwarn(wt(l.info.assertions, i, e, t))
            } else
                l = new jt(this.options,r,o,a,"absolute" !== n && A(r),i),
                this.modulesById.set(r, l);
            return Promise.resolve(l)
        }
        return this.fetchModule(s, t, !1, !1)
    }
    async fetchStaticDependencies({id, dependencies, info}, t) {
        for (const s of await Promise.all(t.map((t=>t.then((([t,s])=>this.fetchResolvedDependency(t, id, s)))))))
            dependencies.add(s),
            s.importers.push(id);
        if (!this.options.treeshake || "no-treeshake" === info.moduleSideEffects)
            for (const t of dependencies)
                t instanceof bo && (t.importedFromNotTreeshaken = !0)
    }
    getNormalizedResolvedIdWithoutDefaults(e, t, s) {
        const {makeAbsoluteExternalsRelative: i} = this.options;
        if (e) {
            if ("object" == typeof e) {
                const n = e.external || this.options.external(e.id, t, !0);
                return {
                    ...e,
                    external: n && ("relative" === n || !A(e.id) || !0 === n && Rc(e.id, s, i) || "absolute")
                }
            }
            const n = this.options.external(e, t, !0);
            return {
                external: n && (Rc(e, s, i) || "absolute"),
                id: n && i ? Nc(e, t) : e
            }
        }
        const n = i ? Nc(s, t) : s;
        return !1 === e || this.options.external(n, t, !0) ? {
            external: Rc(n, s, i) || "absolute",
            id: n
        } : null
    }
    getResolveDynamicImportPromises(e) {
        return e.dynamicImports.map((async t=>{
            const s = await this.resolveDynamicImport(e, "string" == typeof t.argument ? t.argument : t.argument.esTreeNode, e.id, function(e) {
                const t = e.arguments?.[0]?.properties.find((e=>"assert" === so(e)))?.value;
                if (!t)
                    return fe;
                const s = t.properties.map((e=>{
                    const t = so(e);
                    return "string" == typeof t && "string" == typeof e.value.value ? [t, e.value.value] : null
                }
                )).filter((e=>!!e));
                return s.length > 0 ? Object.fromEntries(s) : fe
            }(t.node));
            return s && "object" == typeof s && (t.id = s.id),
            [t, s]
        }
        ))
    }
    getResolveStaticDependencyPromises({sourcesWithAssertions, resolvedIds, id}) {
        return Array.from(sourcesWithAssertions, (async([t,s])=>[t, resolvedIds[t] = resolvedIds[t] || this.handleInvalidResolvedId(await this.resolveId(t, id, fe, !1, s), t, id, s)]));
    }
    getResolvedIdWithDefaults(e, t) {
        if (!e)
            return null;
        const s = e.external || !1;
        return {
            assertions: e.assertions || t,
            external: s,
            id: e.id,
            meta: e.meta || {},
            moduleSideEffects: e.moduleSideEffects ?? this.hasModuleSideEffects(e.id, !!s),
            resolvedBy: e.resolvedBy ?? "rollup",
            syntheticNamedExports: e.syntheticNamedExports ?? !1
        }
    }
    async handleExistingModule(e, t, s) {
        const i = this.moduleLoadPromises.get(e);
        if (s)
            return s === Cc ? Mc(i) : i;
        if (t) {
            e.info.isEntry = !0,
            this.implicitEntryModules.delete(e);
            for (const t of e.implicitlyLoadedAfter)
                t.implicitlyLoadedBefore.delete(e);
            e.implicitlyLoadedAfter.clear()
        }
        return this.fetchModuleDependencies(e, ...(await i));
    }
    handleInvalidResolvedId(e, t, s, i) {
        return null === e ? k(t) ? ze(((e, t) => ({
            code: xt,
            exporter: e,
            id: t,
            message: `Could not resolve "${e}" from "${D(t)}"`
        }))(t, s)) : (this.options.onwarn(((e, t) => ({
            code: xt,
            exporter: e,
            id: t,
            message: `"${e}" is imported by "${D(t)}", but could not be resolved – treating it as an external dependency.`,
            url: ke("troubleshooting/#warning-treating-module-as-external-dependency")
        }))(t, s)),
        {
            assertions: i,
            external: !0,
            id: t,
            meta: {},
            moduleSideEffects: this.hasModuleSideEffects(t, !0),
            resolvedBy: "rollup",
            syntheticNamedExports: !1
        }) : (e.external && e.syntheticNamedExports && this.options.onwarn(((e, t) => ({
            code: "EXTERNAL_SYNTHETIC_EXPORTS",
            exporter: e,
            message: `External "${e}" cannot have "syntheticNamedExports" enabled (imported by "${D(t)}").`
        }))(t, s)),
        e);
    }
    async loadEntryModule(e, t, s, i) {
        const n = await Sc(e, s, this.options.preserveSymlinks, this.pluginDriver, this.resolveId, null, fe, !0, fe);
        return null == n ? ze(null === i ? (e => ({
            code: yt,
            message: `Could not resolve entry module "${D(e)}".`
        }))(e) : ((e, t) => ({
            code: at,
            message: `Module "${D(e)}" that should be implicitly loaded before "${D(t)}" could not be resolved.`
        }))(e, i)) : !1 === n || "object" == typeof n && n.external ? ze(null === i ? (e => ({
            code: yt,
            message: `Entry module "${D(e)}" cannot be external.`
        }))(e) : ((e, t) => ({
            code: at,
            message: `Module "${D(e)}" that should be implicitly loaded before "${D(t)}" cannot be external.`
        }))(e, i)) : this.fetchModule(this.getResolvedIdWithDefaults("object" == typeof n ? n : {
            id: n
        }, fe), void 0, t, !1);
    }
    async resolveDynamicImport({resolvedIds, id}, t, s, i) {
        const n = await this.pluginDriver.hookFirst("resolveDynamicImport", [t, s, {
            assertions: i
        }]);
        if ("string" != typeof t)
            return "string" == typeof n ? n : n ? this.getResolvedIdWithDefaults(n, i) : null;
        if (null == n) {
            const n = resolvedIds[t];
            return n ? (io(n.assertions, i) && this.options.onwarn(wt(n.assertions, i, t, s)),
            n) : resolvedIds[t] = this.handleInvalidResolvedId(await this.resolveId(t, id, fe, !1, i), t, id, i);
        }
        return this.handleInvalidResolvedId(this.getResolvedIdWithDefaults(this.getNormalizedResolvedIdWithoutDefaults(n, s, t), i), t, s, i)
    }
}
function Nc(e, t) {
    return k(e) ? t ? N(t, "..", e) : N(e) : e
}
function _c({chunkFileNames, chunkNames}, {fileName: t, name: s}, i, n) {
    if (null !== t)
        chunkFileNames.add(t);
    else if (null !== s) {
        let t = 0;
        for (; chunkNames[t]?.priority < n; )
            t++;
        chunkNames.splice(t, 0, {
            isUserDefined: i,
            name: s,
            priority: n
        })
    }
}
function Rc(e, t, s) {
    return !0 === s || "ifRelativeSource" === s && k(t) || !A(e)
}
async function Mc(e) {
    const [t,s] = await e;
    return Promise.all([...t, ...s])
}
class Tc extends vi {
    constructor() {
        super(),
        this.parent = null,
        this.variables.set("undefined", new Gr)
    }
    findVariable(e) {
        let t = this.variables.get(e);
        return t || (t = new Ui(e),
        this.variables.set(e, t)),
        t
    }
}
function Oc(e) {
    return vl().update(e).digest("hex")
}
function Dc(e, t, s, i, n) {
    const r = i.sanitizeFileName(e || "asset");
    return ca(ha("function" == typeof i.assetFileNames ? i.assetFileNames({
        name: e,
        source: t,
        type: "asset"
    }) : i.assetFileNames, "output.assetFileNames", {
        ext: ()=>C(r).slice(1),
        extname: ()=>C(r),
        hash: e=>s.slice(0, Math.max(0, e || 8)),
        name: ()=>r.slice(0, Math.max(0, r.length - C(r).length))
    }), n)
}
function Lc(e, {bundle: t}, s) {
    t[aa].has(e.toLowerCase()) ? s((e => ({
        code: Qe,
        message: `The emitted file "${e}" overwrites a previously emitted file of the same name.`
    }))(e)) : t[e] = la
}
const Vc = new Set(["chunk", "asset", "prebuilt-chunk"]);
function Bc(e, {fileName, name}, s) {
    if (!("string" == typeof e || e instanceof Uint8Array)) {
        const e = fileName || name || s;
        return ze(Ot(`Could not set source for ${"string" == typeof e ? `asset "${e}"` : "unnamed asset"}, asset source needs to be a string, Uint8Array or Buffer.`))
    }
    return e
}
function zc({fileName, name}, t) {
    return "string" != typeof fileName ? ze((s = name || t,
    {
        code: We,
        message: `Plugin error - Unable to get file name for asset "${s}". Ensure that the source is set and that generate is called first. If you reference assets via import.meta.ROLLUP_FILE_URL_<referenceId>, you need to either have set their source after "renderStart" or need to provide an explicit "fileName" when emitting them.`
    })) : fileName;
    var s
}
function Fc({fileName, module, name}, t) {
    return fileName ? fileName : t ? t.get(module).getFileName() : ze((s = fileName || name,
    {
        code: He,
        message: `Plugin error - Unable to get file name for emitted chunk "${s}". You can only get file names once chunks have been generated after the "renderStart" hook.`
    }));
    var s
}
class jc {
    constructor(e, t, s) {
        this.graph = e,
        this.options = t,
        this.facadeChunkByModule = null,
        this.nextIdBase = 1,
        this.output = null,
        this.outputFileEmitters = [],
        this.emitFile = e=>(e => Boolean(e && Vc.has(e.type)))(e) ? "prebuilt-chunk" === e.type ? this.emitPrebuiltChunk(e) : (({fileName, name}) => {
            const t = fileName || name;
            return !t || "string" == typeof t && !L(t)
        })(e) ? "chunk" === e.type ? this.emitChunk(e) : this.emitAsset(e) : ze(Ot(`The "fileName" or "name" properties of emitted chunks and assets must be strings that are neither absolute nor relative paths, received "${e.fileName || e.name}".`)) : ze(Ot(`Emitted files must be of type "asset", "chunk" or "prebuilt-chunk", received "${e && e.type}".`)),
        this.finaliseAssets = ()=>{
            for (const [e,t] of this.filesByReferenceId)
                if ("asset" === t.type && "string" != typeof t.fileName)
                    return ze({
                        code: "ASSET_SOURCE_MISSING",
                        message: `Plugin error creating asset "${t.name || e}" - no asset source set.`
                    })
        }
        ,
        this.getFileName = e=>{
            const t = this.filesByReferenceId.get(e);
            return t ? "chunk" === t.type ? Fc(t, this.facadeChunkByModule) : "prebuilt-chunk" === t.type ? t.fileName : zc(t, e) : ze({
                code: "FILE_NOT_FOUND",
                message: `Plugin error - Unable to get file name for unknown file "${e}".`
            })
        }
        ,
        this.setAssetSource = (e,t)=>{
            const s = this.filesByReferenceId.get(e);
            if (!s)
                return ze({
                    code: "ASSET_NOT_FOUND",
                    message: `Plugin error - Unable to set the source for unknown asset "${e}".`
                });
            if ("asset" !== s.type)
                return ze(Ot(`Asset sources can only be set for emitted assets but "${e}" is an emitted chunk.`));
            if (void 0 !== s.source)
                return ze({
                    code: "ASSET_SOURCE_ALREADY_SET",
                    message: `Unable to set the source for asset "${s.name || e}", source already set.`
                });
            const i = Bc(t, s, e);
            if (this.output)
                this.finalizeAdditionalAsset(s, i, this.output);
            else {
                s.source = i;
                for (const e of this.outputFileEmitters)
                    e.finalizeAdditionalAsset(s, i, e.output)
            }
        }
        ,
        this.setChunkInformation = e=>{
            this.facadeChunkByModule = e
        }
        ,
        this.setOutputBundle = (e,t)=>{
            const s = this.output = {
                bundle: e,
                fileNamesBySource: new Map,
                outputOptions: t
            };
            for (const e of this.filesByReferenceId.values())
                e.fileName && Lc(e.fileName, s, this.options.onwarn);
            const i = new Map;
            for (const e of this.filesByReferenceId.values())
                if ("asset" === e.type && void 0 !== e.source)
                    if (e.fileName)
                        this.finalizeAdditionalAsset(e, e.source, s);
                    else {
                        F(i, Oc(e.source), (()=>[])).push(e)
                    }
                else
                    "prebuilt-chunk" === e.type && (this.output.bundle[e.fileName] = this.createPrebuiltChunk(e));
            for (const [e,t] of i)
                this.finalizeAssetsWithSameSource(t, e, s)
        }
        ,
        this.filesByReferenceId = s ? new Map(s.filesByReferenceId) : new Map,
        s?.addOutputFileEmitter(this)
    }
    addOutputFileEmitter(e) {
        this.outputFileEmitters.push(e)
    }
    assignReferenceId(e, t) {
        let s = t;
        do {
            s = vl().update(s).digest("hex").slice(0, 8)
        } while (this.filesByReferenceId.has(s) || this.outputFileEmitters.some((({filesByReferenceId: e})=>e.has(s))));
        e.referenceId = s,
        this.filesByReferenceId.set(s, e);
        for (const {filesByReferenceId: t} of this.outputFileEmitters)
            t.set(s, e);
        return s
    }
    createPrebuiltChunk({code, exports, fileName, map}) {
        return {
            code: code,
            dynamicImports: [],
            exports: exports || [],
            facadeModuleId: null,
            fileName: fileName,
            implicitlyLoadedBefore: [],
            importedBindings: {},
            imports: [],
            isDynamicEntry: !1,
            isEntry: !1,
            isImplicitEntry: !1,
            map: map || null,
            moduleIds: [],
            modules: {},
            name: fileName,
            referencedFiles: [],
            type: "chunk"
        };
    }
    emitAsset(e) {
        const t = void 0 === e.source ? void 0 : Bc(e.source, e, null)
          , s = {
            fileName: e.fileName,
            name: e.name,
            needsCodeReference: !!e.needsCodeReference,
            referenceId: "",
            source: t,
            type: "asset"
        }
          , i = this.assignReferenceId(s, e.fileName || e.name || String(this.nextIdBase++));
        if (this.output)
            this.emitAssetWithReferenceId(s, this.output);
        else
            for (const e of this.outputFileEmitters)
                e.emitAssetWithReferenceId(s, e.output);
        return i
    }
    emitAssetWithReferenceId(e, t) {
        const {fileName: s, source: i} = e;
        s && Lc(s, t, this.options.onwarn),
        void 0 !== i && this.finalizeAdditionalAsset(e, i, t)
    }
    emitChunk(e) {
        if (this.graph.phase > eo.LOAD_AND_PARSE)
            return ze({
                code: it,
                message: "Cannot emit chunks after module loading has finished."
            });
        if ("string" != typeof e.id)
            return ze(Ot(`Emitted chunks need to have a valid string id, received "${e.id}"`));
        const t = {
            fileName: e.fileName,
            module: null,
            name: e.name || e.id,
            referenceId: "",
            type: "chunk"
        };
        return this.graph.moduleLoader.emitChunk(e).then((e=>t.module = e)).catch((()=>{}
        )),
        this.assignReferenceId(t, e.id)
    }
    emitPrebuiltChunk({code, fileName, exports, map}) {
        if ("string" != typeof code)
            return ze(Ot(`Emitted prebuilt chunks need to have a valid string code, received "${code}".`));
        if ("string" != typeof fileName || L(fileName))
            return ze(Ot(`The "fileName" property of emitted prebuilt chunks must be strings that are neither absolute nor relative paths, received "${fileName}".`));
        const t = {
            code: code,
            exports: exports,
            fileName: fileName,
            map: map,
            referenceId: "",
            type: "prebuilt-chunk"
        }
          , s = this.assignReferenceId(t, t.fileName);
        return this.output && (this.output.bundle[t.fileName] = this.createPrebuiltChunk(t)),
        s
    }
    finalizeAdditionalAsset(e, t, {bundle: s, fileNamesBySource: i, outputOptions: n}) {
        let {fileName: r, needsCodeReference: o, referenceId: a} = e;
        if (!r) {
            const o = Oc(t);
            r = i.get(o),
            r || (r = Dc(e.name, t, o, n, s),
            i.set(o, r))
        }
        const l = {
            ...e,
            fileName: r,
            source: t
        };
        this.filesByReferenceId.set(a, l);
        const h = s[r];
        "asset" === h?.type ? h.needsCodeReference && (h.needsCodeReference = o) : s[r] = {
            fileName: r,
            name: e.name,
            needsCodeReference: o,
            source: t,
            type: "asset"
        }
    }
    finalizeAssetsWithSameSource(e, t, {bundle: s, fileNamesBySource: i, outputOptions: n}) {
        let r, o = "", a = !0;
        for (const i of e) {
            a && (a = i.needsCodeReference);
            const e = Dc(i.name, i.source, t, n, s);
            (!o || e.length < o.length || e.length === o.length && e < o) && (o = e,
            r = i)
        }
        i.set(t, o);
        for (const t of e) {
            const e = {
                ...t,
                fileName: o
            };
            this.filesByReferenceId.set(t.referenceId, e)
        }
        s[o] = {
            fileName: o,
            name: r.name,
            needsCodeReference: a,
            source: r.source,
            type: "asset"
        }
    }
}
function Uc(t, s, i, n, r, o) {
    let a, l = !0;
    if ("string" != typeof t.cacheKey && (t.name.startsWith(Ac) || t.name.startsWith(kc) || o.has(t.name) ? l = !1 : o.add(t.name)),
    s)
        if (l) {
            const e = t.cacheKey || t.name;
            c = s[e] || (s[e] = Object.create(null)),
            a = {
                delete: e=>delete c[e],
                get(e) {
                    const t = c[e];
                    if (t)
                        return t[0] = 0,
                        t[1]
                },
                has(e) {
                    const t = c[e];
                    return !!t && (t[0] = 0,
                    !0)
                },
                set(e, t) {
                    c[e] = [0, t]
                }
            }
        } else
            h = t.name,
            a = {
                delete: ()=>Ic(h),
                get: ()=>Ic(h),
                has: ()=>Ic(h),
                set: ()=>Ic(h)
            };
    else
        a = wc;
    var h, c;
    return {
        addWatchFile(e) {
            if (i.phase >= eo.GENERATE)
                return this.error({
                    code: it,
                    message: 'Cannot call "addWatchFile" after the build has finished.'
                });
            i.watchFiles[e] = !0
        },
        cache: a,
        emitFile: r.emitFile.bind(r),
        error: e=>ze(_t(e, t.name)),
        getFileName: r.getFileName,
        getModuleIds: ()=>i.modulesById.keys(),
        getModuleInfo: i.getModuleInfo,
        getWatchFiles: ()=>Object.keys(i.watchFiles),
        load: e=>i.moduleLoader.preloadModule(e),
        meta: {
            rollupVersion: e,
            watchMode: i.watchMode
        },
        get moduleIds() {
            const e = i.modulesById.keys();
            return function*() {
                Dt(`Accessing "this.moduleIds" on the plugin context by plugin ${t.name} is deprecated. The "this.getModuleIds" plugin context function should be used instead.`, "plugin-development/#this-getmoduleids", !0, n, t.name),
                yield*e
            }()
        },
        parse: i.contextParse.bind(i),
        resolve: (e,s,{assertions: n, custom: r, isEntry: o, skipSelf: a}=pe)=>i.moduleLoader.resolveId(e, s, r, o, n || fe, a ? [{
            importer: s,
            plugin: t,
            source: e
        }] : null),
        setAssetSource: r.setAssetSource,
        warn(e) {
            "string" == typeof e && (e = {
                message: e
            }),
            e.code && (e.pluginCode = e.code),
            e.code = "PLUGIN_WARNING",
            e.plugin = t.name,
            n.onwarn(e)
        }
    };
}
const Gc = Object.keys({
    buildEnd: 1,
    buildStart: 1,
    closeBundle: 1,
    closeWatcher: 1,
    load: 1,
    moduleParsed: 1,
    options: 1,
    resolveDynamicImport: 1,
    resolveId: 1,
    shouldTransformCachedModule: 1,
    transform: 1,
    watchChange: 1
});
class Wc {
    constructor(e, t, s, i, n) {
        this.graph = e,
        this.options = t,
        this.pluginCache = i,
        this.sortedPlugins = new Map,
        this.unfulfilledActions = new Set,
        this.fileEmitter = new jc(e,t,n && n.fileEmitter),
        this.emitFile = this.fileEmitter.emitFile.bind(this.fileEmitter),
        this.getFileName = this.fileEmitter.getFileName.bind(this.fileEmitter),
        this.finaliseAssets = this.fileEmitter.finaliseAssets.bind(this.fileEmitter),
        this.setChunkInformation = this.fileEmitter.setChunkInformation.bind(this.fileEmitter),
        this.setOutputBundle = this.fileEmitter.setOutputBundle.bind(this.fileEmitter),
        this.plugins = [...(n ? n.plugins : []), ...s];
        const r = new Set;
        if (this.pluginContexts = new Map(this.plugins.map((s=>[s, Uc(s, i, e, t, this.fileEmitter, r)]))),
        n)
            for (const e of s)
                for (const s of Gc)
                    s in e && t.onwarn((o = e.name,
                    {
                        code: "INPUT_HOOK_IN_OUTPUT_PLUGIN",
                        message: `The "${s}" hook used by the output plugin ${o} is a build time hook and will not be run for that plugin. Either this plugin cannot be used as an output plugin, or it should have an option to configure it as an output plugin.`
                    }));
        var o
    }
    createOutputPluginDriver(e) {
        return new Wc(this.graph,this.options,e,this.pluginCache,this)
    }
    getUnfulfilledHookActions() {
        return this.unfulfilledActions
    }
    hookFirst(e, t, s, i) {
        return this.hookFirstAndGetPlugin(e, t, s, i).then((e=>e && e[0]))
    }
    async hookFirstAndGetPlugin(e, t, s, i) {
        for (const n of this.getSortedPlugins(e)) {
            if (i?.has(n))
                continue;
            const r = await this.runHook(e, t, n, s);
            if (null != r)
                return [r, n]
        }
        return null
    }
    hookFirstSync(e, t, s) {
        for (const i of this.getSortedPlugins(e)) {
            const n = this.runHookSync(e, t, i, s);
            if (null != n)
                return n
        }
        return null
    }
    async hookParallel(e, t, s) {
        const i = [];
        for (const n of this.getSortedPlugins(e))
            n[e].sequential ? (await Promise.all(i),
            i.length = 0,
            await this.runHook(e, t, n, s)) : i.push(this.runHook(e, t, n, s));
        await Promise.all(i)
    }
    hookReduceArg0(e, [t,...s], i, n) {
        let r = Promise.resolve(t);
        for (const t of this.getSortedPlugins(e))
            r = r.then((r=>this.runHook(e, [r, ...s], t, n).then((e=>i.call(this.pluginContexts.get(t), r, e, t)))));
        return r
    }
    hookReduceArg0Sync(e, [t,...s], i, n) {
        for (const r of this.getSortedPlugins(e)) {
            const o = [t, ...s]
              , a = this.runHookSync(e, o, r, n);
            t = i.call(this.pluginContexts.get(r), t, a, r)
        }
        return t
    }
    async hookReduceValue(e, t, s, i) {
        const n = []
          , r = [];
        for (const t of this.getSortedPlugins(e, Kc))
            t[e].sequential ? (n.push(...(await Promise.all(r))),
            r.length = 0,
            n.push(await this.runHook(e, s, t))) : r.push(this.runHook(e, s, t));
        return n.push(...(await Promise.all(r))),
        n.reduce(i, await t);
    }
    hookReduceValueSync(e, t, s, i, n) {
        let r = t;
        for (const t of this.getSortedPlugins(e)) {
            const o = this.runHookSync(e, s, t, n);
            r = i.call(this.pluginContexts.get(t), r, o, t)
        }
        return r
    }
    hookSeq(e, t, s) {
        let i = Promise.resolve();
        for (const n of this.getSortedPlugins(e))
            i = i.then((()=>this.runHook(e, t, n, s)));
        return i.then(Yc)
    }
    getSortedPlugins(e, t) {
        return F(this.sortedPlugins, e, (()=>qc(e, this.plugins, t)))
    }
    runHook(e, t, s, i) {
        const n = s[e]
          , r = "object" == typeof n ? n.handler : n;
        let o = this.pluginContexts.get(s);
        i && (o = i(o, s));
        let a = null;
        return Promise.resolve().then((()=>{
            if ("function" != typeof r)
                return r;
            const i = r.apply(o, t);
            return i?.then ? (a = [s.name, e, t],
            this.unfulfilledActions.add(a),
            Promise.resolve(i).then((e=>(this.unfulfilledActions.delete(a),
            e)))) : i
        }
        )).catch((t=>(null !== a && this.unfulfilledActions.delete(a),
        ze(_t(t, s.name, {
            hook: e
        })))))
    }
    runHookSync(e, t, s, i) {
        const n = s[e]
          , r = "object" == typeof n ? n.handler : n;
        let o = this.pluginContexts.get(s);
        i && (o = i(o, s));
        try {
            return r.apply(o, t)
        } catch (t) {
            return ze(_t(t, s.name, {
                hook: e
            }))
        }
    }
}
function qc(e, t, s=Hc) {
    const i = []
      , n = []
      , r = [];
    for (const o of t) {
        const t = o[e];
        if (t) {
            if ("object" == typeof t) {
                if (s(t.handler, e, o),
                "pre" === t.order) {
                    i.push(o);
                    continue
                }
                if ("post" === t.order) {
                    r.push(o);
                    continue
                }
            } else
                s(t, e, o);
            n.push(o)
        }
    }
    return [...i, ...n, ...r]
}
function Hc(e, t, {name}) {
    "function" != typeof e && ze(((e, t) => ({
        code: st,
        hook: e,
        message: `Error running plugin hook "${e}" for plugin "${t}", expected a function hook or an object with a "handler" function.`,
        plugin: t
    }))(t, name))
}
function Kc(e, t, {name}) {
    if ("string" != typeof e && "function" != typeof e)
        return ze(((e, t) => ({
            code: st,
            hook: e,
            message: `Error running plugin hook "${e}" for plugin "${t}", expected a string, a function hook or an object with a "handler" string or function.`,
            plugin: t
        }))(t, name));
}
function Yc() {}
class Xc {
    constructor(e) {
        this.maxParallel = e,
        this.queue = [],
        this.workerCount = 0
    }
    run(e) {
        return new Promise(((t,s)=>{
            this.queue.push({
                reject: s,
                resolve: t,
                task: e
            }),
            this.work()
        }
        ))
    }
    async work() {
        if (this.workerCount >= this.maxParallel)
            return;
        let e;
        for (this.workerCount++; e = this.queue.shift(); ) {
            const {reject: t, resolve: s, task: i} = e;
            try {
                s(await i())
            } catch (e) {
                t(e)
            }
        }
        this.workerCount--
    }
}
class Qc {
    constructor(e, t) {
        if (this.options = e,
        this.astLru = (e => {
            let t;
            let s;
            let i;
            const n = e || 1;
            function r(e, r) {
                ++t > n && (i = s,
                o(1),
                ++t),
                s[e] = r
            }
            function o(e) {
                t = 0,
                s = Object.create(null),
                e || (i = Object.create(null))
            }
            return o(),
            {
                clear: o,
                has(e) {
                    return void 0 !== s[e] || void 0 !== i[e]
                },
                get(e) {
                    let t = s[e];
                    return void 0 !== t ? t : void 0 !== (t = i[e]) ? (r(e, t),
                    t) : void 0
                },
                set(e, t) {
                    void 0 !== s[e] ? s[e] = t : r(e, t)
                }
            };
        })(5),
        this.cachedModules = new Map,
        this.deoptimizationTracker = new Z,
        this.entryModules = [],
        this.modulesById = new Map,
        this.needsTreeshakingPass = !1,
        this.phase = eo.LOAD_AND_PARSE,
        this.scope = new Tc,
        this.watchFiles = Object.create(null),
        this.watchMode = !1,
        this.externalModules = [],
        this.implicitEntryModules = [],
        this.modules = [],
        this.getModuleInfo = e=>{
            const t = this.modulesById.get(e);
            return t ? t.info : null
        }
        ,
        !1 !== e.cache) {
            if (e.cache?.modules)
                for (const t of e.cache.modules)
                    this.cachedModules.set(t.id, t);
            this.pluginCache = e.cache?.plugins || Object.create(null);
            for (const e in this.pluginCache) {
                const t = this.pluginCache[e];
                for (const e of Object.values(t))
                    e[0]++
            }
        }
        if (t) {
            this.watchMode = !0;
            const e = (...e)=>this.pluginDriver.hookParallel("watchChange", e)
              , s = ()=>this.pluginDriver.hookParallel("closeWatcher", []);
            t.onCurrentRun("change", e),
            t.onCurrentRun("close", s)
        }
        this.pluginDriver = new Wc(this,e,e.plugins,this.pluginCache),
        this.acornParser = mh.extend(...e.acornInjectPlugins),
        this.moduleLoader = new $c(this,this.modulesById,this.options,this.pluginDriver),
        this.fileOperationQueue = new Xc(e.maxParallelFileOps),
        this.pureFunctions = (({treeshake: e})=>{
            const t = Object.create(null);
            for (const s of e ? e.manualPureFunctions : []) {
                let e = t;
                for (const t of s.split("."))
                    e = e[t] || (e[t] = Object.create(null));
                e[Ii] = !0
            }
            return t
        }
        )(e)
    }
    async build() {
        uo("generate module graph", 2),
        await this.generateModuleGraph(),
        po("generate module graph", 2),
        uo("sort and bind modules", 2),
        this.phase = eo.ANALYSE,
        this.sortModules(),
        po("sort and bind modules", 2),
        uo("mark included statements", 2),
        this.includeStatements(),
        po("mark included statements", 2),
        this.phase = eo.GENERATE
    }
    contextParse(e, t={}) {
        const s = t.onComment
          , i = [];
        t.onComment = s && "function" == typeof s ? (e,n,r,o,...a)=>(i.push({
            end: o,
            start: r,
            type: e ? "Block" : "Line",
            value: n
        }),
        s.call(t, e, n, r, o, ...a)) : i;
        const n = this.acornParser.parse(e, {
            ...this.options.acorn,
            ...t
        });
        return "object" == typeof s && s.push(...i), t.onComment = s, ((e, t, s) => {
            const i = []
              , n = [];
            for (const t of e)
                Ts.test(t.value) ? i.push(t) : Is.test(t.value) && n.push(t);
            for (const e of n)
                Os(t, e, !1);
            $s(t, {
                annotationIndex: 0,
                annotations: i,
                code: s
            })
        })(i, n, e), n;
    }
    getCache() {
        for (const e in this.pluginCache) {
            const t = this.pluginCache[e];
            let s = !0;
            for (const [e,i] of Object.entries(t))
                i[0] >= this.options.experimentalCacheExpiry ? delete t[e] : s = !1;
            s && delete this.pluginCache[e]
        }
        return {
            modules: this.modules.map((e=>e.toJSON())),
            plugins: this.pluginCache
        }
    }
    async generateModuleGraph() {
        var e;
        if (({entryModules: this.entryModules, implicitEntryModules: this.implicitEntryModules} = await this.moduleLoader.addEntryModules((e = this.options.input,
        Array.isArray(e) ? e.map((e=>({
            fileName: null,
            id: e,
            implicitlyLoadedAfter: [],
            importer: void 0,
            name: null
        }))) : Object.entries(e).map((([e,t])=>({
            fileName: null,
            id: t,
            implicitlyLoadedAfter: [],
            importer: void 0,
            name: e
        })))), !0)),
        0 === this.entryModules.length)
            throw new Error("You must supply options.input to rollup");
        for (const e of this.modulesById.values())
            e instanceof bo ? this.modules.push(e) : this.externalModules.push(e)
    }
    includeStatements() {
        const e = [...this.entryModules, ...this.implicitEntryModules];
        for (const t of e)
            go(t);
        if (this.options.treeshake) {
            let t = 1;
            do {
                uo(`treeshaking pass ${t}`, 3),
                this.needsTreeshakingPass = !1;
                for (const e of this.modules)
                    e.isExecuted && ("no-treeshake" === e.info.moduleSideEffects ? e.includeAllInBundle() : e.include());
                if (1 === t)
                    for (const t of e)
                        !1 !== t.preserveSignature && (t.includeAllExports(!1),
                        this.needsTreeshakingPass = !0);
                po(`treeshaking pass ${t++}`, 3)
            } while (this.needsTreeshakingPass)
        } else
            for (const e of this.modules)
                e.includeAllInBundle();
        for (const e of this.externalModules)
            e.warnUnusedImports();
        for (const e of this.implicitEntryModules)
            for (const t of e.implicitlyLoadedAfter)
                t.info.isEntry || t.isIncluded() || ze(Nt(t))
    }
    sortModules() {
        const {orderedModules: e, cyclePaths: t} = (e => {
            let t = 0;
            const s = []
              , i = new Set
              , n = new Set
              , r = new Map
              , o = []
              , a = e=>{
                if (e instanceof bo) {
                    for (const t of e.dependencies)
                        r.has(t) ? i.has(t) || s.push(Na(t, e, r)) : (r.set(t, e),
                        a(t));
                    for (const t of e.implicitlyLoadedBefore)
                        n.add(t);
                    for (const {resolution: t} of e.dynamicImports)
                        t instanceof bo && n.add(t);
                    o.push(e)
                }
                e.execIndex = t++,
                i.add(e)
            }
            ;
            for (const t of e)
                r.has(t) || (r.set(t, null),
                a(t));
            for (const e of n)
                r.has(e) || (r.set(e, null),
                a(e));
            return {
                cyclePaths: s,
                orderedModules: o
            }
        })(this.entryModules);
        for (const e of t)
            this.options.onwarn(At(e));
        this.modules = e;
        for (const e of this.modules)
            e.bindReferences();
        this.warnForMissingExports()
    }
    warnForMissingExports() {
        for (const e of this.modules)
            for (const t of e.importDescriptions.values())
                "*" === t.name || t.module.getVariableForExportName(t.name)[0] || e.warn($t(t.name, e.id, t.module.id), t.start)
    }
}
function Jc(e, t) {
    return t()
}
const Zc = "{".charCodeAt(0)
  , eu = " ".charCodeAt(0)
  , tu = "assert";
function su(e) {
    const t = e.acorn || yc
      , {tokTypes: s, TokenType: i} = t;
    return class extends e {
        constructor(...e) {
            super(...e),
            this.assertToken = new i(tu)
        }
        _codeAt(e) {
            return this.input.charCodeAt(e)
        }
        _eat(e) {
            this.type !== e && this.unexpected(),
            this.next()
        }
        readToken(e) {
            let t = 0;
            for (; t < 6; t++)
                if (this._codeAt(this.pos + t) !== tu.charCodeAt(t))
                    return super.readToken(e);
            for (; this._codeAt(this.pos + t) !== Zc; t++)
                if (this._codeAt(this.pos + t) !== eu)
                    return super.readToken(e);
            return "{" === this.type.label ? super.readToken(e) : (this.pos += 6,
            this.finishToken(this.assertToken))
        }
        parseDynamicImport(e) {
            if (this.next(),
            e.source = this.parseMaybeAssign(),
            this.eat(s.comma)) {
                const t = this.parseObj(!1);
                e.arguments = [t]
            }
            return this._eat(s.parenR),
            this.finishNode(e, "ImportExpression")
        }
        parseExport(e, t) {
            if (this.next(),
            this.eat(s.star)) {
                if (this.options.ecmaVersion >= 11 && (this.eatContextual("as") ? (e.exported = this.parseIdent(!0),
                this.checkExport(t, e.exported.name, this.lastTokStart)) : e.exported = null),
                this.expectContextual("from"),
                this.type !== s.string && this.unexpected(),
                e.source = this.parseExprAtom(),
                this.type === this.assertToken || this.type === s._with) {
                    this.next();
                    const t = this.parseImportAssertions();
                    t && (e.assertions = t)
                }
                return this.semicolon(),
                this.finishNode(e, "ExportAllDeclaration")
            }
            if (this.eat(s._default)) {
                let i;
                if (this.checkExport(t, "default", this.lastTokStart),
                this.type === s._function || (i = this.isAsyncFunction())) {
                    const n = this.startNode();
                    this.next(),
                    i && this.next(),
                    e.declaration = this.parseFunction(n, 5, !1, i)
                } else if (this.type === s._class) {
                    const r = this.startNode();
                    e.declaration = this.parseClass(r, "nullableID")
                } else
                    e.declaration = this.parseMaybeAssign(),
                    this.semicolon();
                return this.finishNode(e, "ExportDefaultDeclaration")
            }
            if (this.shouldParseExportStatement())
                e.declaration = this.parseStatement(null),
                "VariableDeclaration" === e.declaration.type ? this.checkVariableExport(t, e.declaration.declarations) : this.checkExport(t, e.declaration.id.name, e.declaration.id.start),
                e.specifiers = [],
                e.source = null;
            else {
                if (e.declaration = null,
                e.specifiers = this.parseExportSpecifiers(t),
                this.eatContextual("from")) {
                    if (this.type !== s.string && this.unexpected(),
                    e.source = this.parseExprAtom(),
                    this.type === this.assertToken || this.type === s._with) {
                        this.next();
                        const t = this.parseImportAssertions();
                        t && (e.assertions = t)
                    }
                } else {
                    for (let o = 0, a = e.specifiers; o < a.length; o += 1) {
                        const l = a[o];
                        this.checkUnreserved(l.local),
                        this.checkLocalExport(l.local)
                    }
                    e.source = null
                }
                this.semicolon()
            }
            return this.finishNode(e, "ExportNamedDeclaration")
        }
        parseImport(e) {
            if (this.next(),
            this.type === s.string ? (e.specifiers = [],
            e.source = this.parseExprAtom()) : (e.specifiers = this.parseImportSpecifiers(),
            this.expectContextual("from"),
            e.source = this.type === s.string ? this.parseExprAtom() : this.unexpected()),
            this.type === this.assertToken || this.type == s._with) {
                this.next();
                const t = this.parseImportAssertions();
                t && (e.assertions = t)
            }
            return this.semicolon(),
            this.finishNode(e, "ImportDeclaration")
        }
        parseImportAssertions() {
            this._eat(s.braceL);
            const e = this.parseAssertEntries();
            return this._eat(s.braceR),
            e
        }
        parseAssertEntries() {
            const e = []
              , t = new Set;
            do {
                if (this.type === s.braceR)
                    break;
                const i = this.startNode();
                let n;
                n = this.type === s.string ? this.parseLiteral(this.value) : this.parseIdent(!0),
                this.next(),
                i.key = n,
                t.has(i.key.name) && this.raise(this.pos, "Duplicated key in assertions"),
                t.add(i.key.name),
                this.type !== s.string && this.raise(this.pos, "Only string is supported as an assertion value"),
                i.value = this.parseLiteral(this.value),
                e.push(this.finishNode(i, "ImportAttribute"))
            } while (this.eat(s.comma));
            return e
        }
    };
}
function iu(e) {
    return Array.isArray(e) ? e.filter(Boolean) : e ? [e] : []
}
const nu = e=>console.warn(e.message || e);
function ru(e, t, s, i, n=/$./) {
    const r = new Set(t)
      , o = Object.keys(e).filter((e=>!(r.has(e) || n.test(e))));
    o.length > 0 && i(((e, t, s) => ({
        code: gt,
        message: `Unknown ${e}: ${t.join(", ")}. Allowed options: ${s.join(", ")}`
    }))(s, o, [...r].sort()))
}
const ou = {
    recommended: {
        annotations: !0,
        correctVarValueBeforeDeclaration: !1,
        manualPureFunctions: me,
        moduleSideEffects: ()=>!0,
        propertyReadSideEffects: !0,
        tryCatchDeoptimization: !0,
        unknownGlobalSideEffects: !1
    },
    safest: {
        annotations: !0,
        correctVarValueBeforeDeclaration: !0,
        manualPureFunctions: me,
        moduleSideEffects: ()=>!0,
        propertyReadSideEffects: !0,
        tryCatchDeoptimization: !0,
        unknownGlobalSideEffects: !0
    },
    smallest: {
        annotations: !0,
        correctVarValueBeforeDeclaration: !1,
        manualPureFunctions: me,
        moduleSideEffects: ()=>!1,
        propertyReadSideEffects: !1,
        tryCatchDeoptimization: !1,
        unknownGlobalSideEffects: !1
    }
}
  , au = {
    es2015: {
        arrowFunctions: !0,
        constBindings: !0,
        objectShorthand: !0,
        reservedNamesAsProps: !0,
        symbols: !0
    },
    es5: {
        arrowFunctions: !1,
        constBindings: !1,
        objectShorthand: !1,
        reservedNamesAsProps: !0,
        symbols: !1
    }
}
  , lu = (e,t,s,i,n)=>{
    const r = e?.preset;
    if (r) {
        const n = t[r];
        if (n)
            return {
                ...n,
                ...e
            };
        ze(Ct(`${s}.preset`, i, `valid values are ${Ae(Object.keys(t))}`, r))
    }
    return ((e,t,s,i)=>n=>{
        if ("string" == typeof n) {
            const r = e[n];
            if (r)
                return r;
            ze(Ct(t, s, `valid values are ${i}${Ae(Object.keys(e))}. You can also supply an object for more fine-grained control`, n))
        }
        return (e=>e && "object" == typeof e ? e : {})(n)
    }
    )(t, s, i, n)(e)
}
  , hu = async e=>(await (async e => {
    do {
        e = (await Promise.all(e)).flat(1 / 0)
    } while (e.some((({then}) => then )));
    return e
})([e])).filter(Boolean);
const cu = e=>{
    const {onwarn: t} = e;
    return t ? e=>{
        e.toString = ()=>{
            let t = "";
            return e.plugin && (t += `(${e.plugin} plugin) `),
            e.loc && (t += `${D(e.loc.file)} (${e.loc.line}:${e.loc.column}) `),
            t += e.message,
            t
        }
        ,
        t(e, nu)
    }
    : nu
}
  , uu = ({acorn}) => ({
    ecmaVersion: "latest",
    sourceType: "module",
    ...acorn
})
  , du = ({acornInjectPlugins}) => [su, ...iu(acornInjectPlugins)]
  , pu = ({cache}) => !0 === cache ? void 0 : cache?.cache || cache
  , fu = e=>{
    if (!0 === e)
        return ()=>!0;
    if ("function" == typeof e)
        return (t,...s)=>!t.startsWith("\0") && e(t, ...s) || !1;
    if (e) {
        const t = new Set
          , s = [];
        for (const i of iu(e))
            i instanceof RegExp ? s.push(i) : t.add(i);
        return (e,...i)=>t.has(e) || s.some((t=>t.test(e)))
    }
    return ()=>!1
}
  , mu = ({inlineDynamicImports}, t, s) => {
    const i = inlineDynamicImports;
    return i && Lt('The "inlineDynamicImports" option is deprecated. Use the "output.inlineDynamicImports" option instead.', Te, !0, t, s),
    i
}
  , gu = ({input}) => {
    const t = input;
    return null == t ? [] : "string" == typeof t ? [t] : t
}
  , yu = ({manualChunks}, t, s) => {
    const i = manualChunks;
    return i && Lt('The "manualChunks" option is deprecated. Use the "output.manualChunks" option instead.', De, !0, t, s),
    i
}
  , xu = ({maxParallelFileReads, maxParallelFileOps}, t, s) => {
    const i = maxParallelFileReads;
    "number" == typeof i && Lt('The "maxParallelFileReads" option is deprecated. Use the "maxParallelFileOps" option instead.', "configuration-options/#maxparallelfileops", !0, t, s);
    const n = maxParallelFileOps ?? i;
    return "number" == typeof n ? n <= 0 ? 1 / 0 : n : 20
}
  , bu = ({moduleContext}, t) => {
    const s = moduleContext;
    if ("function" == typeof s)
        return e=>s(e) ?? t;
    if (s) {
        const e = Object.create(null);
        for (const [t,i] of Object.entries(s))
            e[N(t)] = i;
        return s=>e[s] ?? t
    }
    return ()=>t
}
  , Eu = ({preserveModules}, t, s) => {
    const i = preserveModules;
    return i && Lt('The "preserveModules" option is deprecated. Use the "output.preserveModules" option instead.', "configuration-options/#output-preservemodules", !0, t, s),
    i
}
  , vu = ({treeshake}) => {
    if (!1 === treeshake)
        return !1;
    const t = lu(treeshake, ou, "treeshake", "configuration-options/#treeshake", "false, true, ");
    return {
        annotations: !1 !== t.annotations,
        correctVarValueBeforeDeclaration: !0 === t.correctVarValueBeforeDeclaration,
        manualPureFunctions: t.manualPureFunctions ?? me,
        moduleSideEffects: Su(t.moduleSideEffects),
        propertyReadSideEffects: "always" === t.propertyReadSideEffects ? "always" : !1 !== t.propertyReadSideEffects,
        tryCatchDeoptimization: !1 !== t.tryCatchDeoptimization,
        unknownGlobalSideEffects: !1 !== t.unknownGlobalSideEffects
    }
}
  , Su = e=>{
    if ("boolean" == typeof e)
        return ()=>e;
    if ("no-external" === e)
        return (e,t)=>!t;
    if ("function" == typeof e)
        return (t,s)=>!!t.startsWith("\0") || !1 !== e(t, s);
    if (Array.isArray(e)) {
        const t = new Set(e);
        return e=>t.has(e)
    }
    return e && ze(Ct("treeshake.moduleSideEffects", "configuration-options/#treeshake-modulesideeffects", 'please use one of false, "no-external", a function or an array')),
    ()=>!0
}
  , Au = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g
  , ku = /^[a-z]:/i;
function wu(e) {
    const t = ku.exec(e)
      , s = t ? t[0] : "";
    return s + e.slice(s.length).replace(Au, "_")
}
const Iu = (e, t, {input}) => {
    const {file: i} = e;
    if ("string" == typeof i) {
        if (t)
            return ze(Ct("output.file", Ce, 'you must set "output.dir" instead of "output.file" when using the "output.preserveModules" option'));
        if (!Array.isArray(input))
            return ze(Ct("output.file", Ce, 'you must set "output.dir" instead of "output.file" when providing named inputs'))
    }
    return i
}
  , Pu = ({format}) => {
    const t = format;
    switch (t) {
    case void 0:
    case "es":
    case "esm":
    case "module":
        return "es";
    case "cjs":
    case "commonjs":
        return "cjs";
    case "system":
    case "systemjs":
        return "system";
    case "amd":
    case "iife":
    case "umd":
        return t;
    default:
        return ze(Ct("output.format", _e, 'Valid values are "amd", "cjs", "system", "es", "iife" or "umd"', t))
    }
}
  , Cu = ({inlineDynamicImports}, t) => {
    const s = (inlineDynamicImports ?? t.inlineDynamicImports) || !1
      , {input: i} = t;
    return s && (Array.isArray(i) ? i : Object.keys(i)).length > 1 ? ze(Ct("output.inlineDynamicImports", Te, 'multiple inputs are not supported when "output.inlineDynamicImports" is true')) : s
}
  , $u = ({preserveModules}, t, {preserveModules, preserveEntrySignatures}) => {
    const i = (preserveModules ?? preserveModules) || !1;
    if (i) {
        if (t)
            return ze(Ct("output.inlineDynamicImports", Te, 'this option is not supported for "output.preserveModules"'));
        if (!1 === preserveEntrySignatures)
            return ze(Ct("preserveEntrySignatures", "configuration-options/#preserveentrysignatures", 'setting this option to false is not supported for "output.preserveModules"'))
    }
    return i
}
  , Nu = ({preferConst}, t) => {
    const s = preferConst;
    return null != s && Dt('The "output.preferConst" option is deprecated. Use the "output.generatedCode.constBindings" option instead.', "configuration-options/#output-generatedcode-constbindings", !0, t),
    !!s
}
  , _u = e=>{
    const {preserveModulesRoot: t} = e;
    if (null != t)
        return N(t)
}
  , Ru = ({amd}) => {
    const t = {
        autoId: !1,
        basePath: "",
        define: "define",
        forceJsExtensionForImports: !1,
        ...amd
    };
    return (t.autoId || t.basePath) && t.id ? ze(Ct("output.amd.id", Pe, 'this option cannot be used together with "output.amd.autoId"/"output.amd.basePath"')) : t.basePath && !t.autoId ? ze(Ct("output.amd.basePath", "configuration-options/#output-amd-basepath", 'this option only works with "output.amd.autoId"')) : t.autoId ? {
        autoId: !0,
        basePath: t.basePath,
        define: t.define,
        forceJsExtensionForImports: t.forceJsExtensionForImports
    } : {
        autoId: !1,
        define: t.define,
        forceJsExtensionForImports: t.forceJsExtensionForImports,
        id: t.id
    }
}
  , Mu = (e,t)=>{
    const s = e[t];
    return "function" == typeof s ? s : ()=>s || ""
}
  , Tu = (e,t)=>{
    const {dir: s} = e;
    return "string" == typeof s && "string" == typeof t ? ze(Ct("output.dir", Ce, 'you must set either "output.file" for a single-file build or "output.dir" when generating multiple chunks')) : s
}
  , Ou = ({dynamicImportFunction}, t, s) => {
    const i = dynamicImportFunction;
    return i && (Dt('The "output.dynamicImportFunction" option is deprecated. Use the "renderDynamicImport" plugin hook instead.', "plugin-development/#renderdynamicimport", !0, t),
    "es" !== s && t.onwarn(Ct("output.dynamicImportFunction", "configuration-options/#output-dynamicimportfunction", 'this option is ignored for formats other than "es"'))),
    i
}
  , Du = ({entryFileNames}, t) => {
    const s = entryFileNames;
    return null == s && t.add("entryFileNames"),
    s ?? "[name].js"
}
;
function Lu({experimentalDeepDynamicChunkOptimization}, t) {
    const s = experimentalDeepDynamicChunkOptimization;
    return null != s && Dt('The "output.experimentalDeepDynamicChunkOptimization" option is deprecated as Rollup always runs the full chunking algorithm now. The option should be removed.', Re, !0, t),
    s || !1
}
function Vu({exports}, t) {
    const s = exports;
    if (null == s)
        t.add("exports");
    else if (!["default", "named", "none", "auto"].includes(s))
        return ze({
            code: et,
            message: `"output.exports" must be "default", "named", "none", "auto", or left unspecified (defaults to "auto"), received "${s}".`,
            url: ke($e)
        });
    return s || "auto"
}
const Bu = ({generatedCode}, t) => {
    const s = lu(generatedCode, au, "output.generatedCode", "configuration-options/#output-generatedcode", "");
    return {
        arrowFunctions: !0 === s.arrowFunctions,
        constBindings: !0 === s.constBindings || t,
        objectShorthand: !0 === s.objectShorthand,
        reservedNamesAsProps: !1 !== s.reservedNamesAsProps,
        symbols: !0 === s.symbols
    }
}
  , zu = ({indent}, t) => {
    if (t)
        return "";
    const s = indent;
    return !1 === s ? "" : s ?? !0
}
  , Fu = new Set(["compat", "auto", "esModule", "default", "defaultOnly"])
  , ju = ({interop}) => {
    const t = interop;
    if ("function" == typeof t) {
        const e = Object.create(null);
        let s = null;
        return i=>null === i ? s || Uu(s = t(i)) : i in e ? e[i] : Uu(e[i] = t(i))
    }
    return void 0 === t ? ()=>"default" : ()=>Uu(t)
}
  , Uu = e=>Fu.has(e) ? e : ze(Ct("output.interop", Oe, `use one of ${Array.from(Fu, (e=>JSON.stringify(e))).join(", ")}`, e))
  , Gu = ({manualChunks}, t, s, {manualChunks}) => {
    const n = manualChunks || manualChunks;
    if (n) {
        if (t)
            return ze(Ct("output.manualChunks", De, 'this option is not supported for "output.inlineDynamicImports"'));
        if (s)
            return ze(Ct("output.manualChunks", De, 'this option is not supported for "output.preserveModules"'))
    }
    return n || {}
}
  , Wu = ({minifyInternalExports}, t, s) => minifyInternalExports ?? (s || "es" === t || "system" === t)
  , qu = ({namespaceToStringTag}, {symbols}, s) => {
    const i = namespaceToStringTag;
    return null != i ? (Dt('The "output.namespaceToStringTag" option is deprecated. Use the "output.generatedCode.symbols" option instead.', "configuration-options/#output-generatedcode-symbols", !0, s),
    i) : symbols || !1;
}
  , Hu = e=>{
    const {sourcemapBaseUrl: t} = e;
    if (t)
        return (e => {
            try {
                new URL(e)
            } catch {
                return !1
            }
            return !0
        })(t) ? t : ze(Ct("output.sourcemapBaseUrl", "configuration-options/#output-sourcemapbaseurl", `must be a valid URL, received ${JSON.stringify(t)}`));
}
;
function Ku(t) {
    return (async (t, s) => {
        const {options: i, unsetOptions: n} = await (async (t, s) => {
            if (!t)
                throw new Error("You must supply an options object to rollup");
            const i = qc("options", await hu(t.plugins))
              , {options: n, unsetOptions: r} = await (async e => {
                const t = new Set
                  , s = e.context ?? "undefined"
                  , i = cu(e)
                  , n = e.strictDeprecations || !1
                  , r = xu(e, i, n)
                  , o = {
                    acorn: uu(e),
                    acornInjectPlugins: du(e),
                    cache: pu(e),
                    context: s,
                    experimentalCacheExpiry: e.experimentalCacheExpiry ?? 10,
                    experimentalLogSideEffects: e.experimentalLogSideEffects || !1,
                    external: fu(e.external),
                    inlineDynamicImports: mu(e, i, n),
                    input: gu(e),
                    makeAbsoluteExternalsRelative: e.makeAbsoluteExternalsRelative ?? "ifRelativeSource",
                    manualChunks: yu(e, i, n),
                    maxParallelFileOps: r,
                    maxParallelFileReads: r,
                    moduleContext: bu(e, s),
                    onwarn: i,
                    perf: e.perf || !1,
                    plugins: await hu(e.plugins),
                    preserveEntrySignatures: e.preserveEntrySignatures ?? "exports-only",
                    preserveModules: Eu(e, i, n),
                    preserveSymlinks: e.preserveSymlinks || !1,
                    shimMissingExports: e.shimMissingExports || !1,
                    strictDeprecations: n,
                    treeshake: vu(e)
                };
                return ru(e, [...Object.keys(o), "watch"], "input options", o.onwarn, /^(output)$/),
                {
                    options: o,
                    unsetOptions: t
                }
            })(await i.reduce((t => async (s, {options}) => {
                const n = "handler"in options ? options.handler : options;
                return (await n.call({
                    meta: {
                        rollupVersion: e,
                        watchMode: t
                    }
                }, await s)) || s;
            })(s), Promise.resolve(t)));
            return Yu(n.plugins, Ac),
            {
                options: n,
                unsetOptions: r
            }
        })(t, null !== s);
        !(e => {
            e.perf ? (oo = new Map,
            uo = lo,
            po = ho,
            e.plugins = e.plugins.map(mo)) : (uo = Pi,
            po = Pi)
        })(i);
        const r = new Qc(i,s)
          , o = !1 !== t.cache;
        t.cache && (i.cache = void 0,
        t.cache = void 0);
        uo("BUILD", 1),
        await Jc(r.pluginDriver, (async()=>{
            try {
                uo("initialize", 2),
                await r.pluginDriver.hookParallel("buildStart", [i]),
                po("initialize", 2),
                await r.build()
            } catch (e) {
                const t = Object.keys(r.watchFiles);
                throw (t.length > 0 && (e.watchFiles = t), await r.pluginDriver.hookParallel("buildEnd", [e]), await r.pluginDriver.hookParallel("closeBundle", []), e)
            }
            await r.pluginDriver.hookParallel("buildEnd", [])
        }
        )),
        po("BUILD", 1);
        const a = {
            cache: o ? r.getCache() : void 0,
            async close() {
                a.closed || (a.closed = !0,
                await r.pluginDriver.hookParallel("closeBundle", []))
            },
            closed: !1,
            generate: async e=>a.closed ? ze(Et()) : Xu(!1, i, n, e, r),
            watchFiles: Object.keys(r.watchFiles),
            write: async e=>a.closed ? ze(Et()) : Xu(!0, i, n, e, r)
        };
        i.perf && (a.getTimings = co);
        return a
    })(t, null);
}
function Yu(e, t) {
    for (const [s,i] of e.entries())
        i.name || (i.name = `${t}${s + 1}`)
}
async function Xu(e, t, s, i, n) {
    const {options: r, outputPluginDriver: o, unsetOptions: a} = await (async (e, t, s, i) => {
        if (!e)
            throw new Error("You must supply an options object");
        const n = await hu(e.plugins);
        Yu(n, kc);
        const r = t.createOutputPluginDriver(n);
        return {
            ...(await Qu(s, i, e, r)),
            outputPluginDriver: r
        };
    })(i, n.pluginDriver, t, s);
    return Jc(0, (async()=>{
        const s = new Il(r,a,t,o,n)
          , i = await s.generate(e);
        if (e) {
            if (uo("WRITE", 1),
            !r.dir && !r.file)
                return ze({
                    code: ct,
                    message: 'You must specify "output.file" or "output.dir" for the build.',
                    url: ke(Ce)
                });
            await Promise.all(Object.values(i).map((e=>n.fileOperationQueue.run((() => (async ({fileName, type, source, code}, {dir, file}) => {
                const s = N(dir || P(file), fileName);
                return await bc(P(s), {
                    recursive: !0
                }),
                vc(s, "asset" === type ? source : code);
            })(e, r)))))),
            await o.hookParallel("writeBundle", [r, i]),
            po("WRITE", 1)
        }
        return l = i,
        {
            output: Object.values(l).filter((e=>Object.keys(e).length > 0)).sort(((e,t)=>Zu(e) - Zu(t)))
        };
        var l
    }
    ));
}
function Qu(e, t, s, i) {
    return (async (e, t, s) => {
        const i = new Set(s)
          , n = e.compact || !1
          , r = Pu(e)
          , o = Cu(e, t)
          , a = $u(e, o, t)
          , l = Iu(e, a, t)
          , h = Nu(e, t)
          , c = Bu(e, h)
          , u = {
            amd: Ru(e),
            assetFileNames: e.assetFileNames ?? "assets/[name]-[hash][extname]",
            banner: Mu(e, "banner"),
            chunkFileNames: e.chunkFileNames ?? "[name]-[hash].js",
            compact: n,
            dir: Tu(e, l),
            dynamicImportFunction: Ou(e, t, r),
            dynamicImportInCjs: e.dynamicImportInCjs ?? !0,
            entryFileNames: Du(e, i),
            esModule: e.esModule ?? "if-default-prop",
            experimentalDeepDynamicChunkOptimization: Lu(e, t),
            experimentalMinChunkSize: e.experimentalMinChunkSize ?? 1,
            exports: Vu(e, i),
            extend: e.extend || !1,
            externalImportAssertions: e.externalImportAssertions ?? !0,
            externalLiveBindings: e.externalLiveBindings ?? !0,
            file: l,
            footer: Mu(e, "footer"),
            format: r,
            freeze: e.freeze ?? !0,
            generatedCode: c,
            globals: e.globals || {},
            hoistTransitiveImports: e.hoistTransitiveImports ?? !0,
            indent: zu(e, n),
            inlineDynamicImports: o,
            interop: ju(e),
            intro: Mu(e, "intro"),
            manualChunks: Gu(e, o, a, t),
            minifyInternalExports: Wu(e, r, n),
            name: e.name,
            namespaceToStringTag: qu(e, c, t),
            noConflict: e.noConflict || !1,
            outro: Mu(e, "outro"),
            paths: e.paths || {},
            plugins: await hu(e.plugins),
            preferConst: h,
            preserveModules: a,
            preserveModulesRoot: _u(e),
            sanitizeFileName: "function" == typeof e.sanitizeFileName ? e.sanitizeFileName : !1 === e.sanitizeFileName ? e=>e : wu,
            sourcemap: e.sourcemap || !1,
            sourcemapBaseUrl: Hu(e),
            sourcemapExcludeSources: e.sourcemapExcludeSources || !1,
            sourcemapFile: e.sourcemapFile,
            sourcemapIgnoreList: "function" == typeof e.sourcemapIgnoreList ? e.sourcemapIgnoreList : !1 === e.sourcemapIgnoreList ? ()=>!1 : e=>e.includes("node_modules"),
            sourcemapPathTransform: e.sourcemapPathTransform,
            strict: e.strict ?? !0,
            systemNullSetters: e.systemNullSetters ?? !0,
            validate: e.validate || !1
        };
        return ru(e, Object.keys(u), "output options", t.onwarn),
        {
            options: u,
            unsetOptions: i
        }
    })(i.hookReduceArg0Sync("outputOptions", [s], ((e,t)=>t || e), (e=>{
        const t = ()=>e.error({
            code: qe,
            message: 'Cannot emit files or set asset sources in the "outputOptions" hook, use the "renderStart" hook instead.'
        });
        return {
            ...e,
            emitFile: t,
            setAssetSource: t
        }
    }
    )), e, t);
}
let Ju;
function Zu({type, isEntry}) {
    return "asset" === type ? Ju.ASSET : isEntry ? Ju.ENTRY_CHUNK : Ju.SECONDARY_CHUNK;
}
function ed(e) {
    return e
}
!(e => {
    e[e.ENTRY_CHUNK = 0] = "ENTRY_CHUNK",
    e[e.SECONDARY_CHUNK = 1] = "SECONDARY_CHUNK",
    e[e.ASSET = 2] = "ASSET"
})(Ju || (Ju = {}));
export {e as VERSION, ed as defineConfig, Ku as rollup};
