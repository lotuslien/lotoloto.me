function $Vendor(n, t) {
    var i = n[t],
        r;
    if (i) return i;
    for (r in {
            ms: 0,
            moz: 0,
            webkit: 0,
            o: 0
        })
        if (i = n[r + t.charAt(0).toUpperCase() + t.slice(1)], i !== undefined) return i;
    return undefined
}

function $GetFullscreen() {
    return $Vendor(document, "isFullScreen")
}

function $SetFullscreen(n) {
    n ? $Vendor(document.body, "requestFullscreen").call(document.body) : $Vendor(document, "cancelFullScreen").call(document)
}

function $CreateRef(n, t, i, r) {
    return r = {
            G: n,
            S: t,
            $: i
        },
        function(n) {
            return n !== undefined ? r.S(n) : r.G()
        }
}

function $CopyStruct(n) {
    var t = {};
    t.prototype = n.prototype;
    for (p in n) t[p] = n[p] && n[p].$struct ? $CopyStruct(n[p]) : n[p];
    return t
}

function $CreateBox(n, t) {
    return n ? n.constructor == Number || n.constructor == Boolean ? {
        c: function(n) {
            return this.$.c(n)
        },
        b: function() {
            return this.$.b()
        },
        d: function() {
            return this.$.d(this.id)
        },
        GetType: function() {
            return this.id
        },
        $box: !0,
        $: n,
        id: t
    } : n.$struct ? $CopyStruct(n) : n : null
}

function $CreateDelegate(n, t, i) {
    return {
        $: n,
        F: t,
        P: null,
        GetType: function() {
            return i
        },
        c: function(n) {
            return n && this.GetType() == n.GetType() && this.$ == n.$ && this.F == n.F
        },
        Invoke: function() {
            var n = this,
                t = n.P,
                i = arguments;
            return t && t.Invoke.apply(t, i), n.F.apply(n.$, i)
        }
    }
}

function $EqOp(n, t) {
    if (n == t) return !0;
    if (n && n.$box) return $EqOp(n.$, t);
    if (t && t.$box) return $EqOp(n, t.$);
    if (n && t && n.$struct && t.$struct) {
        for (p in n)
            if (!$EqOp(n[p], t[p])) return !1;
        return !0
    }
    return !1
}

function $IsOp(n, t, i) {
    if (n) {
        var u = [0, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 4, 4, 31, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 43, 54, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 97, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 97, 4, 4, 4, 4, 43, 4, 4, 4, 4, 66, 118, 4, 4, 4, 2, 4, 4, 4, 0, 2, 66, 4, 2, 4, 4, 4, 2, 2, 4, 4, 4, 4, 4, 4, 4, 2, 2, 43, 4, 4, 4, 71, 4, 2, 4, 2, 2, 118, 0, 4, 4, 4, 0, 4, 4, 0, 0, 4, 0, 4, 4, 4, 4, 4, 97, 118, 2, 118, 4, 2, 0, 4, 4, 0, 4, 76, 236, 143, 236, 143, 2, 0, 2, 2, 2, 95, 0, 116, 122, 175, 2, 118, 4, 2, 4, 95, 4, 4, 4, 95, 2, 2, 0, 4, 175, 2, 4, 2, 2, 4, 122, 143, 4, 2, 0, 2, 0, 95, 76, 2, 4, 0, 76, 117, 2, 127, 4, 4, 2, 4, 4, 152, 4, 95, 95, 0, 4, 2, 4, 0, 2, 0, 226, 0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 0, 76, 2, 76, 0, 4, 2, 0, 0, 2, 0, 76, 0, 76, 4, 0, 95, 76, 4, 0, 0, 4, 0, 0, 2, 0, 122, 2, 2, 0, 0, 2, 4, 4, 0, 0, 0, 95, 95, 0, 0, 2, 4],
            r = i || n.GetType();
        if (t & 32768) return n.$II(t ^ 32768);
        do {
            if (r == t) return !0;
            r = r < u.length ? u[r] : 4
        } while (r)
    }
    return !1
}

function $AsOp(n, t, i) {
    return $IsOp(n, t, i) ? n : null
}

function $DownCast(n, t) {
    if (!n) return n;
    if ($IsOp(n, t)) return n.$box ? n.$ : n;
    throw $fo();
}

function $Initialize(n) {
    function t() {
        if (!i) {
            if ($AsyncCount > 0) {
                window.requestAnimationFrame(t);
                return
            }
            i = !0;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            n();
            addEvent(canvas, "mousedown", function(n) {
                var t = getMouseButton(n);
                $PressedButtons[t] = !0;
                $cV(canvas, n.clientX, n.clientY, t)
            });
            addEvent(canvas, "mousemove", function(n) {
                $cX(canvas, n.clientX, n.clientY)
            });
            addEvent(canvas, "mouseup", function(n) {
                var t = getMouseButton(n);
                $PressedButtons[t] = !1;
                $cW(canvas, n.clientX, n.clientY, t)
            });
            addEvent(canvas, "mousewheel", function(n) {
                var t = n.wheelDelta ? n.wheelDelta : n.detail ? -n.detail * 40 : 0;
                $cZ(canvas, 0, t)
            });
            addEvent(canvas, "keydown", function(n) {
                $PressedKeys[n.keyCode] = !0;
                n.keyCode == 8 && $cU(canvas, String.fromCharCode(8));
                $cS(canvas, n.keyCode)
            });
            addEvent(canvas, "keyup", function(n) {
                $PressedKeys[n.keyCode] = !1;
                $cT(canvas, n.keyCode)
            });
            addEvent(canvas, "keypress", function(n) {
                $cU(canvas, String.fromCharCode(n.keyCode || n.charCode))
            });
            addEvent(window, "beforeunload", function(n) {
                var i = $c1(canvas),
                    t;
                if (i) return t = "Are you sure you want to leave this page? Data you have entered may not be saved.", (n || window.event).returnValue = t, t
            });
            addEvent(window, "unload", function() {
                $c2(canvas)
            });
            addEvent(window, "resize", function() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                $c0(canvas)
            });
            $cN()
        }
        $cO();
        $cR();
        window.requestAnimationFrame(t)
    }
    window.cancelAnimationFrame || (window.cancelAnimationFrame = $Vendor(window, "cancelAnimationFrame"));
    window.requestAnimationFrame || (window.requestAnimationFrame = $Vendor(window, "requestAnimationFrame"));
    window.requestAnimationFrame || (window.requestAnimationFrame = function(n) {
        var i = (new Date).getTime(),
            t = Math.max(0, 16 - (i - lastTime)),
            r = window.setTimeout(function() {
                n(t)
            }, t);
        return lastTime = i + t, r
    });
    window.oncontextmenu = function() {
        return !1
    };
    getMouseButton = function(n) {
        return n.which == 1 ? 1 : n.which == 2 ? 2 : n.which == 3 ? 3 : 0
    };
    addEvent = window.addEventListener ? function(n, t, i) {
        n.addEventListener(t, i, !1)
    } : function(n, t, i) {
        n.attachEvent("on" + t, i)
    };
    var i = !1;
    $ds = function(n) {
        for (var i = [], t = 0, r = n.length; t < r; t++) i.push(String.fromCharCode(n[t]));
        return i.join("")
    };
    t()
}
$AsyncCount = 0;
$PressedKeys = [];
$PressedButtons = [];
String.FromArray = function(n) {
    for (var i = [], t = 0, r = n.length; t < r; t++) i.push(String.fromCharCode(n[t]));
    return i.join("")
};
String.ToArray = function(n) {
    for (var i = new Array(n.length), t = 0, r = i.length; t < r; t++) i[t] = n.charCodeAt(t);
    return i
};
Number.prototype.ByteToSByte = function() {
    return this > 127 ? 127 - this : this
};
Number.prototype.SByteToByte = function() {
    return this < 0 ? 127 - this : this
};
$ConvertNativeException = function(n) {
    return n instanceof TypeError ? $fi() : (n instanceof $U) ? n : $cy(n)
};
$SetupWebGL = function(n) {
        var t = !0;
        return n.appendChild(function() {
            var n, i;
            return (canvas = document.createElement("canvas"), canvas.style.position = "absolute", canvas.style.outline = "none", canvas.setAttribute("tabindex", "0"), n = document.createElement("div"), n.style.padding = "10px", !window.WebGLRenderingContext) ? (t = !1, n.innerHTML = "Hum, your browser does not support WebGL.<br /><a href='http://get.webgl.org'>Get a new one<\/a>, it's easy!", n) : (i = {
                alpha: !1
            }, gl = canvas.getContext("webgl", i) || canvas.getContext("experimental-webgl", i), !gl) ? (t = !1, n.innerHTML = "Could not initialize WebGL.<br />Don't worry, <a href='http://get.webgl.org/troubleshooting'>help is on the way<\/a>!", n) : canvas
        }()), t
    },
    function() {
        var n = [],
            t = [];
        $CreateClass = function(i, r) {
            return n.push(i), t.push(r), i
        };
        $PopulateClasses = function() {
            for (i = 0; i < n.length; i++) t[i](n[i])
        }
    }();
Array.CreateId = function(n) {
    return n + 65536
};
Array.Init = function(n, t) {
    return t == 47 && (n = new Uint8Array(n)), n.GetType = function() {
        return Array.CreateId(t)
    }, n
};
Array.Sized = function(n, t) {
    return Array.Init(new Array(n), t)
};
Array.Fill = function(n, t, i) {
    for (var u = new Array(n), r = 0; r < n; r++) u[r] = t();
    return Array.Init(u, i)
};
Array.Structs = function(n, t, i, r) {
    return Array.Fill(n, function() {
        return new t(r)
    }, i)
};
Array.Zeros = function(n, t) {
    return Array.Fill(n, function() {
        return 0
    }, t)
};
I = Object.prototype;
I.a = function() {
    return 4
};
I.$II = function() {
    return !1
};
$es = function() {
    return {}
};
I.b = function() {
    return this instanceof Number ? this | 0 : 0
};
I.c = function(n) {
    return $EqOp(this, n)
};
$b4 = function(n, t) {
    return n === t ? !0 : n === undefined || n === null || t === undefined || t === null ? !1 : n.c(t)
};
I.d = function(n) {
    return n == 56 ? String.fromCharCode(this) : this instanceof Boolean ? this == !0 ? "True" : "False" : this.toString()
};
$CreateClass(function() {}, function() {
    $et = function() {
        return gl.getError()
    };
    $eB = function(n) {
        return gl.checkFramebufferStatus(n)
    };
    $e_ = function(n) {
        gl.clear(n)
    };
    $d0 = function(n, t, i, r) {
        gl.clearColor(n, t, i, r)
    };
    $dg = function(n) {
        gl.clearDepth(n)
    };
    $b7 = function(n, t, i, r) {
        gl.colorMask(n, t, i, r)
    };
    $bC = function(n) {
        gl.depthMask(n)
    };
    $dC = function() {
        return gl.createTexture()
    };
    $ir = function(n) {
        gl.deleteTexture(n)
    };
    $a2 = function(n) {
        gl.activeTexture(n)
    };
    $aP = function(n, t) {
        gl.bindTexture(n, t)
    };
    $a_ = function(n, t, i) {
        gl.texParameteri(n, t, i)
    };
    $a3 = function(n, t, i, r, u, f, e, o, s) {
        gl.texImage2D(n, t, i, r, u, f, e, o, $bn(s))
    };
    $dd = function() {
        return gl.createRenderbuffer()
    };
    $xm = function(n) {
        gl.deleteRenderbuffer(n)
    };
    $cj = function(n, t) {
        gl.bindRenderbuffer(n, t)
    };
    $d1 = function(n, t, i, r) {
        gl.renderbufferStorage(n, t, i, r)
    };
    $ed = function() {
        return gl.createFramebuffer()
    };
    $BT = function(n) {
        gl.deleteFramebuffer(n)
    };
    $bG = function(n, t) {
        gl.bindFramebuffer(n, t)
    };
    $dR = function(n, t, i, r, u) {
        gl.framebufferTexture2D(n, t, i, r, u)
    };
    $dS = function(n, t, i, r) {
        gl.framebufferRenderbuffer(n, t, i, r)
    };
    $bU = function(n) {
        gl.useProgram(n)
    };
    $ct = function(n, t) {
        return gl.getAttribLocation(n, t)
    };
    $cH = function(n, t) {
        return gl.getUniformLocation(n, t)
    };
    $b9 = function(n, t) {
        gl.uniform1i(n, t)
    };
    $cA = function(n, t) {
        gl.uniform1f(n, t)
    };
    $cC = function(n, t) {
        gl.uniform2f(n, t.e, t.f)
    };
    $q8 = function(n, t) {
        gl.uniform3f(n, t.e, t.f, t.g)
    };
    $cY = function(n, t) {
        gl.uniform4f(n, t.e, t.f, t.g, t.h)
    };
    $rb = function(n, t, i) {
        gl.uniformMatrix4fv(n, t, $z4(i))
    };
    $tJ = function(n, t, i) {
        gl.uniformMatrix4fv(n, t, $Al(i))
    };
    $eq = function(n) {
        gl.enableVertexAttribArray(n)
    };
    $df = function(n) {
        gl.disableVertexAttribArray(n)
    };
    $ef = function(n, t, i, r, u, f) {
        gl.vertexAttribPointer(n, t, i, r, u, f)
    };
    $eP = function(n, t, i) {
        gl.drawArrays(n, t, i)
    };
    $eN = function(n, t, i, r) {
        gl.drawElements(n, t, i, r)
    };
    $bF = function() {
        return gl.createBuffer()
    };
    $tS = function(n) {
        gl.deleteBuffer(n)
    };
    $aQ = function(n, t) {
        gl.bindBuffer(n, t)
    };
    $tR = function(n, t, i) {
        gl.bufferData(n, t, i)
    };
    $ci = function(n, t, i) {
        gl.bufferData(n, $bn(t), i)
    };
    $eO = function(n, t, i) {
        gl.bufferSubData(n, t, $bn(i))
    };
    $bv = function(n) {
        gl.enable(n)
    };
    $by = function(n) {
        gl.disable(n)
    };
    $eR = function(n, t, i, r) {
        gl.blendFuncSeparate(n, t, i, r)
    };
    $eM = function(n) {
        gl.cullFace(n)
    };
    $eQ = function(n) {
        gl.frontFace(n)
    };
    $eJ = function(n) {
        gl.depthFunc(n)
    };
    $bA = function(n, t, i, r) {
        gl.scissor(n, t, i, r)
    };
    $bD = function(n, t, i, r) {
        gl.viewport(n, t, i, r)
    };
    $ck = function(n) {
        gl.lineWidth(n)
    };
    $eu = function(n) {
        return gl.createShader(n)
    };
    $tL = function(n) {
        gl.deleteShader(n)
    };
    $ei = function(n, t) {
        gl.shaderSource(n, t)
    };
    $ej = function(n) {
        gl.compileShader(n)
    };
    $eK = function(n, t) {
        return gl.getShaderParameter(n, t)
    };
    $el = function(n) {
        return gl.getShaderInfoLog(n)
    };
    $em = function() {
        return gl.createProgram()
    };
    $tK = function(n) {
        gl.deleteProgram(n)
    };
    $bW = function(n, t) {
        gl.attachShader(n, t)
    };
    $tT = function(n, t) {
        gl.detachShader(n, t)
    };
    $en = function(n) {
        gl.linkProgram(n)
    };
    $eo = function(n, t) {
        return gl.getProgramParameter(n, t)
    };
    $ep = function(n) {
        return gl.getProgramInfoLog(n)
    }
});
$e = $CreateClass(function() {}, function() {
    var n = Object.prototype;
    n.GetType = function() {
        return 4
    };
    $b4 = function(n, t) {
        return n == t ? !0 : n == null || t == null ? !1 : n.c(t)
    };
    $aV = function(n, t) {
        return n == t
    };
    $es = function() {
        return new $e
    }
});
$o = $CreateClass(function(n) {
    this.$typeArgIds1 = n;
    this.e = 0;
    this.f = 0;
    this.g = null;
    this.h = 0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 19
    };
    t.$II = function(n) {
        return [25, 16, 22].indexOf(n) != -1
    };
    t.i = function() {
        return $ek(this, this.$typeArgIds1)
    };
    t.j = function() {
        return $uf(this, this.$typeArgIds1)
    };
    t.l = function(n, t) {
        var i;
        if (t !== undefined)
            for (i = $bE(n.b()) & this.g.length - 1;;) {
                if (this.g[i].g == 1) {
                    if ($bK(this.g[i].e, n, this.$typeArgIds1[0])) {
                        this.g[i].f = t;
                        this.h++;
                        return
                    }
                } else if (this.g[i].g == 0) {
                    this.q(n, t);
                    return
                }
                i++;
                i >= this.g.length && (i = 0)
            } else
                for (i = $bE(n.b()) & this.g.length - 1;;) {
                    if (this.g[i].g == 1) {
                        if ($bK(this.g[i].e, n, this.$typeArgIds1[0])) return this.g[i].f
                    } else if (this.g[i].g == 0) throw $cy("Dictionary did not contain the given key");
                    i++;
                    i >= this.g.length && (i = 0)
                }
    };
    t.$ew = function() {
        return $eI(this, this.$typeArgIds1)
    };
    t.n = function() {
        return $eI(this, this.$typeArgIds1)
    };
    t.o = function() {
        var t = this.g,
            n;
        for (this.g = Array.Structs(t.length * 2, $A, 34, this.$typeArgIds1), this.e = 0, this.f = 0, n = 0; n < t.length; n++) t[n].g == 1 && this.q(t[n].e, t[n].f)
    };
    t.p = function() {
        for (var n = 0; n < this.g.length; n++) this.g[n].g = 0;
        this.e = 0;
        this.f = 0;
        this.h++
    };
    t.q = function(n, t) {
        this.e + this.f > (this.g.length / 2 | 0) && this.o();
        for (var i = $bE(n.b()) & this.g.length - 1;;) {
            if (this.g[i].g == 0) {
                this.g[i].g = 1;
                this.g[i].f = t;
                this.g[i].e = n;
                this.e++;
                this.h++;
                return
            }
            if (this.g[i].g == 2) {
                this.g[i].g = 1;
                this.g[i].f = t;
                this.g[i].e = n;
                this.e++;
                this.f--;
                this.h++;
                return
            }
            if (this.g[i].g == 1 && $bK(this.g[i].e, n, this.$typeArgIds1[0])) throw $cy("Dictionary already contains the given key");
            i++;
            i >= this.g.length && (i = 0)
        }
    };
    t.r = function(n, t) {
        for (var i = $bE(n.b()) & this.g.length - 1;;) {
            if (this.g[i].g == 1) {
                if ($bK(this.g[i].e, n, this.$typeArgIds1[0])) return t(this.g[i].f), !0
            } else if (this.g[i].g == 0) return t(null), !1;
            i++;
            i >= this.g.length && (i = 0)
        }
    };
    t.s = function(n) {
        for (var t = $bE(n.b()) & this.g.length - 1;;) {
            if (this.g[t].g == 1) {
                if ($bK(this.g[t].e, n, this.$typeArgIds1[0])) return this.g[t].g = 2, this.e--, this.f++, this.h++, !0
            } else if (this.g[t].g == 0) return !1;
            t++;
            t >= this.g.length && (t = 0)
        }
    };
    t.t = function(n) {
        for (var t = $bE(n.b()) & this.g.length - 1;;) {
            if (this.g[t].g == 1) {
                if ($bK(this.g[t].e, n, this.$typeArgIds1[0])) return !0
            } else if (this.g[t].g == 0) return !1;
            t++;
            t >= this.g.length && (t = 0)
        }
    };
    t.u = function() {
        this.g = Array.Structs(8, $A, 34, this.$typeArgIds1);
        this.e = 0;
        this.f = 0
    };
    $bh = function(n) {
        var t = new $o(n);
        return t.u(), t
    };
    t.$a4 = t.n;
    t.$a0 = t.q;
    t.$aZ = t.r;
    t.$aY = t.s;
    t.$aX = t.t;
    t.$tB = t.i;
    t.$tA = t.j;
    t.$tz = t.l;
    t.$S = t.n
});
$4 = $CreateClass(function(n) {
    this.$typeArgId1 = n;
    this.e = null
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 108
    };
    t.$II = function(n) {
        return [16, 22].indexOf(n) != -1
    };
    t.g = function(n) {
        this.e.l(n, !0)
    };
    t.$ew = function() {
        return this.e.i().$S()
    };
    t.l = function() {
        return this.e.i().$S()
    };
    t.m = function() {
        this.e = $bh([this.$typeArgId1, 3])
    };
    $b5 = function(n) {
        var t = new $4(n);
        return t.m(), t
    };
    t.$S = t.l
});
$7 = $CreateClass(function(n) {
    this.$struct = !0;
    this.$typeArgIds1 = n;
    this.e = null;
    this.f = null
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 21
    };
    t.g = function() {
        return this.e
    };
    t.h = function() {
        return this.f
    };
    t.j = function(n, t) {
        this.e = n;
        this.f = t
    };
    $tI = function(n, t, i) {
        var r = new $7(i);
        return r.j(n, t), r
    }
});
$k = $CreateClass(function(n) {
    this.$typeArgId1 = n;
    this.e = null;
    this.f = 0;
    this.g = 0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 11
    };
    t.$II = function(n) {
        return [23, 16, 22].indexOf(n) != -1
    };
    t.h = function() {
        return this.f
    };
    t.i = function(n) {
        return this.n(n), this.e[n]
    };
    t.j = function() {
        return this.n(this.f - 1), this.e[this.f - 1]
    };
    t.$ew = function() {
        return $bT(this, this.$typeArgId1)
    };
    t.l = function() {
        return $bT(this, this.$typeArgId1)
    };
    t.m = function() {
        for (var t = Array.Sized(this.f, this.$typeArgId1), n = 0; n < this.f; n++) t[n] = this.e[n];
        return t
    };
    t.n = function(n) {
        if (n < 0 || n >= this.h()) throw $d6();
    };
    t.o = function() {
        var t, n;
        if (this.e == null) this.e = Array.Sized(2, this.$typeArgId1);
        else if (this.f + 1 == this.e.length) {
            for (t = Array.Sized(this.e.length * 2, this.$typeArgId1), n = 0; n < this.f; n++) t[n] = this.e[n];
            this.e = t
        }
    };
    t.p = function(n) {
        this.o();
        this.e[this.f++] = n;
        this.g++
    };
    t.r = function(n) {
        for (var t = 0; t < this.f; t++)
            if ($bK(this.e[t], n, this.$typeArgId1)) return t;
        return -1
    };
    t.s = function(n) {
        for (var t = 0; t < this.f; t++)
            if ($bK(this.e[t], n, this.$typeArgId1)) return this.u(t), !0;
        return !1
    };
    t.u = function(n) {
        var i, t;
        for (this.n(n), i = this.e[n], t = n; t < this.f - 1; t++) this.e[t] = this.e[t + 1];
        this.f = this.f - 1;
        this.g++
    };
    t.v = function() {
        this.f = 0;
        this.g++
    };
    t.y = function() {
        this.e = null;
        this.f = 0
    };
    $as = function(n) {
        var t = new $k(n);
        return t.y(), t
    };
    t.$ao = t.v;
    t.$ap = t.p;
    t.$aq = t.s;
    t.$ar = t.u;
    t.$tD = t.h;
    t.$tC = t.i;
    t.$S = t.l
});
$tV = $CreateClass(function(n) {
    this.$typeArgIds1 = n;
    this.e = null;
    this.f = null;
    this.g = 0;
    this.h = 0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 36
    };
    t.$II = function(n) {
        return [12, 18, 28].indexOf(n) != -1
    };
    t.$tF = function() {
        return $CreateBox(this.f, this.$typeArgIds1[1])
    };
    t.$tE = function() {
        return this.f
    };
    t.k = function() {};
    t.l = function() {
        this.g = -1;
        this.h = this.e.h;
        this.f = null
    };
    t.m = function() {
        if (this.h != this.e.h) throw $bf("Collection was modified");
        do
            if (this.g++, this.g >= this.e.g.length) return !1;
        while (this.e.g[this.g].g != 1);
        var n = this.e.g[this.g];
        return this.f = n.f, !0
    };
    t.n = function(n) {
        this.e = n;
        this.h = n.h;
        this.g = -1
    };
    $tW = function(n, t) {
        var i = new $tV(t);
        return i.n(n), i
    };
    t.$ez = t.l;
    t.$eA = t.m;
    t.$d9 = t.k
});
$ug = $CreateClass(function(n) {
    this.$typeArgIds1 = n;
    this.e = null
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 79
    };
    t.$II = function(n) {
        return [16, 22].indexOf(n) != -1
    };
    t.$ew = function() {
        return $tW(this.e, this.$typeArgIds1)
    };
    t.g = function() {
        return $tW(this.e, this.$typeArgIds1)
    };
    t.h = function(n) {
        this.e = n
    };
    $uf = function(n, t) {
        var i = new $ug(t);
        return i.h(n), i
    };
    t.$S = t.g
});
$0 = $CreateClass(function(n) {
    this.$typeArgIds1 = n;
    this.e = null;
    this.f = null;
    this.g = 0;
    this.h = 0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 37
    };
    t.$II = function(n) {
        return [12, 18, 28].indexOf(n) != -1
    };
    t.$tF = function() {
        return $CreateBox(this.f, this.$typeArgIds1[0])
    };
    t.$tE = function() {
        return this.f
    };
    t.k = function() {};
    t.l = function() {
        this.g = -1;
        this.h = this.e.h;
        this.f = null
    };
    t.m = function() {
        if (this.h != this.e.h) throw $bf("Collection was modified");
        do
            if (this.g++, this.g >= this.e.g.length) return !1;
        while (this.e.g[this.g].g != 1);
        var n = this.e.g[this.g];
        return this.f = n.e, !0
    };
    t.n = function(n) {
        this.e = n;
        this.h = n.h;
        this.g = -1
    };
    $eH = function(n, t) {
        var i = new $0(t);
        return i.n(n), i
    };
    t.$ez = t.l;
    t.$eA = t.m;
    t.$d9 = t.k
});
$ai = $CreateClass(function(n) {
    this.$typeArgIds1 = n;
    this.e = null
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 80
    };
    t.$II = function(n) {
        return [16, 22].indexOf(n) != -1
    };
    t.$ew = function() {
        return $eH(this.e, this.$typeArgIds1)
    };
    t.g = function() {
        return $eH(this.e, this.$typeArgIds1)
    };
    t.h = function(n) {
        this.e = n
    };
    $ek = function(n, t) {
        var i = new $ai(t);
        return i.h(n), i
    };
    t.$S = t.g
});
$Z = $CreateClass(function(n) {
    this.$typeArgIds1 = n;
    this.e = null;
    this.f = new $7([0, 0]);
    this.g = 0;
    this.h = 0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 38
    };
    t.$II = function(n) {
        return [12, 18, 28].indexOf(n) != -1
    };
    t.$tF = function() {
        return $CopyStruct(this.f)
    };
    t.$tE = function() {
        return this.f
    };
    t.k = function() {};
    t.l = function() {
        this.g = -1;
        this.h = this.e.h;
        this.f = new $7(this.$typeArgIds1)
    };
    t.m = function() {
        if (this.h != this.e.h) throw $bf("Collection was modified");
        do
            if (this.g++, this.g >= this.e.g.length) return !1;
        while (this.e.g[this.g].g != 1);
        var n = this.e.g[this.g];
        return this.f = $tI(n.e, n.f, this.$typeArgIds1), !0
    };
    t.n = function(n) {
        this.e = n;
        this.h = n.h;
        this.g = -1
    };
    $eI = function(n, t) {
        var i = new $Z(t);
        return i.n(n), i
    };
    t.$ez = t.l;
    t.$eA = t.m;
    t.$d9 = t.k
});
$A = $CreateClass(function(n) {
    this.$struct = !0;
    this.$typeArgIds1 = n;
    this.e = null;
    this.f = null;
    this.g = 0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 34
    }
});
$X = $CreateClass(function(n) {
    this.$typeArgId1 = n;
    this.e = null;
    this.f = 0;
    this.g = 0;
    this.h = null
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 30
    };
    t.$II = function(n) {
        return [12, 18, 28].indexOf(n) != -1
    };
    t.$tF = function() {
        return $CreateBox(this.h, this.$typeArgId1)
    };
    t.$tE = function() {
        return this.h
    };
    t.k = function() {};
    t.l = function() {
        this.g = -1;
        this.h = null;
        this.f = this.e.g
    };
    t.m = function() {
        if (this.e.g != this.f) throw $bf("Collection was modified");
        return (this.g++, this.g < this.e.f) ? (this.h = this.e.e[this.g], !0) : !1
    };
    t.n = function(n) {
        this.e = n;
        this.f = n.g;
        this.g = -1
    };
    $bT = function(n, t) {
        var i = new $X(t);
        return i.n(n), i
    };
    t.$ez = t.l;
    t.$eA = t.m;
    t.$d9 = t.k
});
$tt = $CreateClass(function() {
    this.$struct = !0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 151
    }
});
$vp = $CreateClass(function() {
    this.$struct = !0;
    this.e = 0;
    this.f = 0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 129
    };
    t.b = function() {
        var n = 27;
        return n = n * 13 + this.e, n * 13 + this.f
    }
});
$vn = $CreateClass(function() {
    this.$struct = !0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 158
    }
});
$vk = $CreateClass(function() {
    this.e = null;
    this.f = 0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 72
    };
    t.g = function() {
        return this.f
    };
    t.h = function() {
        return this.e
    };
    t.i = function() {
        return this.e.j() / $q5(this.f) | 0
    };
    t.j = function(n) {
        switch (this.f) {
            case 1:
                return this.e.u(n);
            case 2:
                return this.e.G(n * 2, !0);
            case 4:
                return this.e.U(n * 4, !0);
            default:
                return 0
        }
    };
    t.k = function(n, t) {
        this.e = t;
        this.f = n
    };
    t.n = function(n) {
        this.k(4, $p8(n))
    };
    $vq = function(n) {
        var t = new $vk;
        return t.n(n), t
    }
});
$vc = $CreateClass(function() {}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 184
    }
});
$v_ = $CreateClass(function() {}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 182
    }
});
$u8 = $CreateClass(function() {}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 185
    }
});
$vr = $CreateClass(function() {
    this.e = null
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 152
    };
    t.g = function() {
        return this.e
    }
});
$vf = $CreateClass(function() {
    $vr.call(this)
}, function(n) {
    var t = n.prototype = new $vr;
    t.GetType = function() {
        return 186
    }
});
$vO = $CreateClass(function() {}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 181
    }
});
$vG = $CreateClass(function() {
    this.e = null;
    this.f = 0;
    this.g = null;
    this.h = null
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 45
    };
    t.i = function() {
        return this.e
    };
    t.j = function() {
        return this.f
    };
    t.k = function() {
        return this.g
    };
    t.l = function() {
        return this.h
    };
    t.m = function() {
        return this.k() != null ? this.k().i() : 0
    };
    t.n = function() {
        for (var t, n = this.l().$S(); n.$eA();) return t = n.$tE(), t.h().i();
        return 0
    };
    t.q = function() {
        return this.w("Position")
    };
    t.w = function(n) {
        var t;
        return this.h.r(n, $CreateRef(function() {
            return t
        }, function(n) {
            t = n
        }, this)), t
    };
    t.x = function(n, t, i, r) {
        this.e = n;
        this.f = t;
        this.h = i;
        this.g = r
    };
    $vF = function(n, t, i, r) {
        var u = new $vG;
        return u.x(n, t, i, r), u
    }
});
$vE = $CreateClass(function() {}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 116
    };
    t.g = function() {
        return !1
    };
    t.h = function() {
        return 0
    };
    t.i = function() {
        return 0
    };
    t.j = function() {
        return 0
    };
    t.k = function() {
        return 0
    };
    t.l = function() {};
    t.m = function() {
        throw $d6();
    }
});
$vD = $CreateClass(function(n) {
    $vE.call(this, n);
    this.$typeArgId2 = n;
    this.p = 0
}, function(n) {
    var t = n.prototype = new $vE;
    t.GetType = function() {
        return 142
    };
    t.e = function() {
        return 0
    };
    t.f = function() {
        return this.p
    }
});
$vx = $CreateClass(function() {}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 252
    }
});
$uC = $CreateClass(function() {
    this.e = null;
    this.f = 0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 24
    };
    t.g = function() {
        return this.f
    };
    t.h = function() {
        return this.e
    };
    t.i = function() {
        return this.e.j() / $q6(this.f) | 0
    };
    t.j = function(n) {
        if (this.f == 20) return this.e.y(n * 4);
        var t = $jp(this.l(n), 255);
        return $f3(t.e | 0, t.f | 0, t.g | 0, t.h | 0)
    };
    t.k = function(n) {
        var t = new $g;
        return this.f == 19 ? this.e.y(n * 4) : (t.j(this.l(n)), $f3(t.e | 0, t.f | 0, t.g | 0, t.h | 0))
    };
    t.l = function(n) {
        var t;
        switch (this.f) {
            case 1:
                return t = this.e.aa(n * 4, !0), $a9(t, 0, 0, 0);
            case 2:
                return t = this.e.ac(n * 8, !0), $dh(t, 0, 0);
            case 3:
                return t = this.e.ae(n * 12, !0), $jr(t, 0);
            case 4:
                return this.e.ag(n * 16, !0);
            case 5:
                return t = this.e.A(n * 2, !0), $a9(t, 0, 0, 0);
            case 6:
                return t = this.e.A(n * 2, !0), $jw($a9(t, 0, 0, 0), $jF(3051851e-11));
            case 7:
                return t = this.e.C(n * 4, !0), $a9(t.e, t.f, 0, 0);
            case 8:
                return t = this.e.C(n * 4, !0), $jw($a9(t.e, t.f, 0, 0), $jF(3051851e-11));
            case 9:
                return t = this.e.E(n * 8, !0), $a9(t.e, t.f, t.g, t.h);
            case 10:
                return t = this.e.E(n * 8, !0), $jw($a9(t.e, t.f, t.g, t.h), $jF(3051851e-11));
            case 11:
                return t = this.e.G(n * 2, !0), $a9(t, 0, 0, 0);
            case 12:
                return t = this.e.G(n * 2, !0), $jw($a9(t, 0, 0, 0), $jF(152590219e-13));
            case 13:
                return t = this.e.I(n * 4, !0), $a9(t.e, t.f, 0, 0);
            case 14:
                return t = this.e.I(n * 4, !0), $jw($a9(t.e, t.f, 0, 0), $jF(152590219e-13));
            case 15:
                return t = this.e.K(n * 8, !0), $a9(t.e, t.f, t.g, t.h);
            case 16:
                return t = this.e.K(n * 8, !0), $jw($a9(t.e, t.f, t.g, t.h), $jF(152590219e-13));
            case 17:
                return t = this.e.s(n * 4), $a9(t.e, t.f, t.g, t.h);
            case 18:
                return t = this.e.s(n * 4), $jw($a9(t.e, t.f, t.g, t.h), $jF(.007874016));
            case 19:
                return t = this.e.y(n * 4), $a9(t.e, t.f, t.g, t.h);
            case 20:
                return t = this.e.y(n * 4), $jw($a9(t.e, t.f, t.g, t.h), $jF(.003921569));
            default:
                return $jF(0)
        }
    }
});
$ul = $CreateClass(function(n) {
    this.$typeArgId1 = n
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 117
    };
    t.g = function() {
        return this.j(this.e())
    };
    t.h = function() {
        return this.j(this.f())
    };
    t.j = function(n) {
        var t;
        return this.i(n, $CreateRef(function() {
            return t
        }, function(n) {
            t = n
        }, this)), t
    }
});
$uS = $CreateClass(function(n) {
    $ul.call(this, n);
    this.$typeArgIds2 = n;
    this.l = null
}, function(n) {
    var t = n.prototype = new $ul;
    t.GetType = function() {
        return 178
    };
    t.e = function() {
        return this.l.i(0).e
    };
    t.f = function() {
        return this.l.i(this.l.h() - 1).e
    }
});
$uN = $CreateClass(function(n) {
    this.$struct = !0;
    this.$typeArgIds1 = n;
    this.e = 0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 63
    }
});
$q = $CreateClass(function() {
    this.e = new $i;
    this.f = 0;
    this.g = 0;
    this.h = null;
    this.i = !1
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 39
    };
    t.$II = function(n) {
        return [28].indexOf(n) != -1
    };
    t.j = function(n) {
        if (n !== undefined) this.e.i(n);
        else return this.e
    };
    t.k = function(n) {
        if (n !== undefined) this.f = n;
        else return this.f
    };
    t.l = function(n) {
        if (n !== undefined) this.g = n;
        else return this.g
    };
    t.m = function(n) {
        if (n !== undefined) this.h = n;
        else return this.h
    };
    t.n = function(n) {
        if (n !== undefined) this.i = n;
        else return this.i
    };
    t.p = function() {
        return this.k() > 1 && this.j().e == this.j().f && $cJ(this.j().e)
    };
    t.q = function() {
        if (this.n()) throw $eh("Texture2D");
        else $ir(this.m());
        this.n(!0)
    };
    t.r = function(n) {
        if (this.l() == 0) throw $bf("Texture is immutable and cannot be updated");
        else $a2(33984), $aP(3553, this.m()), $a_(3553, 10240, 9729), $a_(3553, 10241, 9729), $a_(3553, 10242, 33071), $a_(3553, 10243, 33071), $cm(3553, this.j().e, this.j().f, 0, this.l(), n), $aP(3553, null)
    };
    t.s = function(n, t) {
        var r, u, i;
        if (this.l() == 0) throw $bf("Texture is immutable and cannot be updated");
        else {
            for ($a2(33984), $aP(3553, this.m()), $a_(3553, 10240, 9729), $a_(3553, 10241, 9729), $a_(3553, 10242, 33071), $a_(3553, 10243, 33071), r = this.j().e, u = this.j().f, i = 0; i < this.k(); i++)
                if (i >= n && $cm(3553, r, u, i, this.l(), t[i]), r = r >> 1, u = u >> 1, r < 1 && (r = 1), u < 1 && (u = 1), i >= t.length - n) break;
            $aP(3553, null)
        }
    };
    t.v = function(n, t, i) {
        this.m($dC());
        this.j(n);
        this.l(t);
        this.k(i ? $cE(n) : 1);
        this.r(null)
    };
    $bZ = function(n, t, i) {
        var r = new $q;
        return r.v(n, t, i), r
    };
    t.$d9 = t.q
});
$qP = $CreateClass(function() {
    this.h = null;
    this.i = !1
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 164
    };
    t.$II = function(n) {
        return [28].indexOf(n) != -1
    };
    t.m = function() {
        return this.h
    };
    t.n = function(n) {
        if (n !== undefined) this.i = n;
        else return this.i
    };
    t.q = function() {
        if (this.n()) throw $eh("TextureCube");
        else $ir(this.m());
        this.n(!0)
    };
    t.$d9 = t.q
});
$z = $CreateClass(function() {
    this.$struct = !0;
    this.e = 0;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.i = 0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 67
    };
    t.j = function() {
        switch (this.e) {
            case 9984:
            case 9985:
                return 9728;
            case 9986:
            case 9987:
                return 9729;
            default:
                return this.e
        }
    };
    $eL = function() {
        return $d2(9728, 9728, 33071)
    };
    t.k = function(n) {
        this.e = n.e;
        this.f = n.f;
        this.g = n.g;
        this.h = n.h;
        this.i = n.i
    };
    t.l = function(n, t, i) {
        this.e = n;
        this.f = t;
        this.g = i;
        this.h = i;
        this.i = i
    };
    $d2 = function(n, t, i) {
        var r = new $z;
        return r.l(n, t, i), r
    }
});
$F = $CreateClass(function() {
    this.e = 0;
    this.f = 0;
    this.g = 0;
    this.h = null;
    this.i = !1
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 66
    };
    t.$II = function(n) {
        return [28].indexOf(n) != -1
    };
    t.j = function(n) {
        if (n !== undefined) this.e = n;
        else return this.e
    };
    t.k = function(n) {
        if (n !== undefined) this.f = n;
        else return this.f
    };
    t.l = function(n) {
        if (n !== undefined) this.g = n;
        else return this.g
    };
    t.m = function(n) {
        if (n !== undefined) this.h = n;
        else return this.h
    };
    t.n = function(n) {
        if (n !== undefined) this.i = n;
        else return this.i
    };
    t.o = function(n) {
        this.l(n);
        this.m($bF())
    };
    t.p = function(n, t) {
        this.l(n);
        this.m($bF());
        this.j(t);
        $aQ(this.l(), this.m());
        $tR(this.l(), t, $bX(this.k()));
        $aQ(this.l(), null)
    };
    t.q = function(n, t) {
        this.l(n);
        this.m($bF());
        this.j(t.j());
        $aQ(this.l(), this.m());
        $ci(this.l(), t, $bX(this.k()));
        $aQ(this.l(), null)
    };
    t.r = function() {
        if (this.n()) throw $eh("DeviceBuffer");
        else $tS(this.m());
        this.n(!0)
    };
    t.s = function(n) {
        if (this.n()) throw $eh("DeviceBuffer");
        else $aQ(this.l(), this.m()), n.j() <= this.j() ? $eO(this.l(), 0, n) : ($ci(this.l(), n, $bX(this.k())), this.j(n.j())), $aQ(this.l(), null)
    };
    t.t = function(n) {
        this.k(n)
    };
    t.$d9 = t.r
});
$H = $CreateClass(function() {
    $F.call(this)
}, function(n) {
    var t = n.prototype = new $F;
    t.GetType = function() {
        return 64
    };
    t.u = function(n) {
        $F.prototype.t.call(this, n);
        this.o(34962)
    };
    $bq = function(n) {
        var t = new $H;
        return t.u(n), t
    };
    t.v = function(n, t) {
        $F.prototype.t.call(this, t);
        this.p(34962, n)
    };
    $ra = function(n, t) {
        var i = new $H;
        return i.v(n, t), i
    };
    t.w = function(n, t) {
        $F.prototype.t.call(this, t);
        this.q(34962, n)
    };
    $aU = function(n, t) {
        var i = new $H;
        return i.w(n, t), i
    }
});
$J = $CreateClass(function() {
    $F.call(this)
}, function(n) {
    var t = n.prototype = new $F;
    t.GetType = function() {
        return 75
    };
    t.u = function(n) {
        $F.prototype.t.call(this, n);
        this.o(34963)
    };
    $c3 = function(n) {
        var t = new $J;
        return t.u(n), t
    };
    t.v = function(n, t) {
        $F.prototype.t.call(this, t);
        this.p(34963, n)
    };
    $q9 = function(n, t) {
        var i = new $J;
        return i.v(n, t), i
    };
    t.w = function(n, t) {
        $F.prototype.t.call(this, t);
        this.q(34963, n)
    };
    $aR = function(n, t) {
        var i = new $J;
        return i.w(n, t), i
    }
});
$m = $CreateClass(function() {
    this.e = null;
    this.f = null
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 35
    };
    t.$II = function(n) {
        return [28].indexOf(n) != -1
    };
    t.g = function(n) {
        if (n !== undefined) this.e = n;
        else return this.e
    };
    t.h = function(n) {
        if (n !== undefined) this.f = n;
        else return this.f
    };
    t.i = function() {
        return this.h().l()
    };
    t.m = function() {
        this.g().q();
        this.h().s()
    };
    t.o = function(n, t, i) {
        this.g($bZ(n, t, (i & 2) == 2));
        this.h($cB(this.g(), 0, (i & 1) == 1))
    };
    $ag = function(n, t, i) {
        var r = new $m;
        return r.o(n, t, i), r
    };
    t.$d9 = t.m
});
$u = $CreateClass(function() {
    this.e = null;
    this.f = new $l;
    this.g = null;
    this.h = null
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 61
    };
    t.i = function() {
        return this.g
    };
    t.j = function(n) {
        if (n !== undefined) {
            if (n == null) throw $dD("value");
            this.h = n;
            $bG(36160, this.h.n());
            this.k($cl(0, 0, this.h.l().e, this.h.l().f))
        } else return this.h
    };
    t.k = function(n) {
        if (n !== undefined)
            if (this.f.q(n), this.h == this.g) {
                var u = $dJ(this.e),
                    t = $dI(this.e),
                    r = $dH(this.e),
                    i = $er($ea(this.f.k(), u), this.f.l());
                $bD(i.e, r - i.h, $aW(0, i.l().e), $aW(0, i.l().f));
                $bA(t.e, r - t.h, $aW(0, t.l().e), $aW(0, t.l().f))
            } else $bD(this.f.e, this.h.l().f - this.f.h, $aW(0, this.f.l().e), $aW(0, this.f.l().f)), $bA(0, 0, this.h.l().e, this.h.l().f);
        else return this.f
    };
    t.l = function() {
        this.g.n($dL(this.e));
        this.g.l($dK(this.e));
        this.g.m(!0)
    };
    t.m = function(n, t) {
        var i = new $g;
        i.j(n);
        $dg(t);
        $d0(i.e, i.f, i.g, i.h);
        $e_(17664)
    };
    t.n = function() {
        this.e = $dM();
        this.h = this.g = $b3();
        this.l()
    };
    $cM = function() {
        var n = new $u;
        return n.n(), n
    }
});
$CreateClass(function() {}, function() {
    $q6 = function(n) {
        switch (n) {
            case 1:
                return 4;
            case 2:
                return 8;
            case 3:
                return 12;
            case 4:
                return 16;
            case 5:
            case 6:
            case 11:
            case 12:
                return 2;
            case 7:
            case 8:
            case 13:
            case 14:
                return 4;
            case 9:
            case 10:
            case 15:
            case 16:
                return 8;
            case 17:
            case 18:
            case 19:
            case 20:
                return 4;
            default:
                throw $d8($N($bH("Invalid VertexAttributeType <", $CreateBox(n, 40)), ">"));
        }
    }
});
$CreateClass(function() {}, function() {
    $q5 = function(n) {
        switch (n) {
            case 1:
            case 2:
            case 4:
                return n;
            default:
                throw $d8($N($bH("Invalid IndexType <", $CreateBox(n, 77)), ">"));
        }
    }
});
$CreateClass(function() {}, function() {
    $cK = function(n, t) {
        var i = new $i;
        return i.i(n.j()), t > 0 && (i.e = i.e >> t, i.f = i.f >> t, i.e < 0 && (i.e = 1), i.f < 0 && (i.f = 1)), i
    };
    $cE = function(n) {
        var t = new $i,
            i;
        t.i(n);
        i = 0;
        do i++, t.e = t.e >> 1, t.f = t.f >> 1; while (t.e > 0 && t.f > 0);
        return i
    }
});
$p = $CreateClass(function() {
    this.e = new $i;
    this.f = !1;
    this.g = null;
    this.h = null;
    this.i = !1;
    this.j = !1;
    this.k = !1
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 41
    };
    t.$II = function(n) {
        return [28].indexOf(n) != -1
    };
    t.l = function(n) {
        if (n !== undefined) this.e.i(n);
        else return this.e
    };
    t.m = function(n) {
        n !== undefined && (this.f = n)
    };
    t.n = function(n) {
        if (n !== undefined) this.g = n;
        else return this.g
    };
    t.o = function(n) {
        if (n !== undefined) this.h = n;
        else return this.h
    };
    t.p = function(n) {
        if (n !== undefined) this.i = n;
        else return this.i
    };
    t.q = function(n) {
        if (n !== undefined) this.j = n;
        else return this.j
    };
    t.r = function(n) {
        if (n !== undefined) this.k = n;
        else return this.k
    };
    $cB = function(n, t, i) {
        return $cv(3553, n.m(), t, $cK(n, t), i)
    };
    t.s = function() {
        if (this.r()) throw $eh("RenderTarget");
        else this.q() && this.o() != null && $xm(this.o()), this.p() && this.n() != null && $BT(this.n());
        this.r(!0)
    };
    t.t = function() {};
    $b3 = function() {
        var n = new $p;
        return n.t(), n
    };
    t.$d9 = t.s
});
$qQ = $CreateClass(function() {
    this.e = null
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 224
    };
    t.$II = function(n) {
        return [28].indexOf(n) != -1
    };
    t.j = function() {
        this.e.q()
    };
    t.$d9 = t.j
});
$p3 = $CreateClass(function() {}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 147
    };
    t.$II = function(n) {
        return [28].indexOf(n) != -1
    };
    t.e = function() {
        return !1
    };
    t.f = function() {
        return !1
    };
    t.g = function() {
        return !1
    };
    t.h = function() {
        return !1
    };
    t.i = function(n) {
        if (n !== undefined) throw $lQ();
        else throw $lQ();
    };
    t.j = function(n) {
        if (n !== undefined) throw $lQ();
        else throw $lQ();
    };
    t.k = function() {
        throw $lQ();
    };
    t.l = function(n) {
        if (n !== undefined) throw $lQ();
        else throw $lQ();
    };
    t.m = function() {
        throw $lQ();
    };
    t.n = function() {
        throw $lQ();
    };
    t.o = function() {
        throw $lQ();
    };
    t.p = function() {};
    t.q = function() {};
    t.$d9 = function() {
        this.q.apply(this, arguments)
    }
});
$Y = $CreateClass(function() {}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 118
    };
    $b6 = function() {
        return $cD()
    };
    t.e = function() {};
    $cD = function() {
        var n = new $Y;
        return n.e(), n
    }
});
$af = $CreateClass(function() {
    $Y.call(this);
    this.f = !1
}, function(n) {
    var t = n.prototype = new $Y;
    t.GetType = function() {
        return 146
    };
    t.g = function() {
        return this.f
    };
    t.h = function() {
        $Y.prototype.e.call(this)
    };
    $cF = function() {
        var n = new $af;
        return n.h(), n
    }
});
$P = $CreateClass(function() {
    $Y.call(this);
    this.f = !1;
    this.g = 0;
    this.h = 0
}, function(n) {
    var t = n.prototype = new $Y;
    t.GetType = function() {
        return 102
    };
    t.i = function() {
        return this.f
    };
    t.j = function(n) {
        n !== undefined && (this.g = n)
    };
    t.k = function(n) {
        n !== undefined && (this.h = n)
    };
    t.p = function(n, t) {
        $Y.prototype.e.call(this);
        this.j(n);
        this.k(t)
    };
    $bS = function(n, t) {
        var i = new $P;
        return i.p(n, t), i
    }
});
$2 = $CreateClass(function() {
    $Y.call(this);
    this.f = !1;
    this.g = null;
    this.h = 0
}, function(n) {
    var t = n.prototype = new $Y;
    t.GetType = function() {
        return 120
    };
    t.i = function() {
        return this.f
    };
    t.j = function(n) {
        n !== undefined && (this.g = n)
    };
    t.k = function(n) {
        n !== undefined && (this.h = n)
    };
    t.p = function(n, t) {
        $Y.prototype.e.call(this);
        this.j(n);
        this.k(t)
    };
    $cG = function(n, t) {
        var i = new $2;
        return i.p(n, t), i
    }
});
$x = $CreateClass(function() {
    $Y.call(this);
    this.f = !1;
    this.g = 0;
    this.h = !1;
    this.i = new $f;
    this.j = 0;
    this.k = 0;
    this.l = new $i;
    this.m = 0
}, function(n) {
    var t = n.prototype = new $Y;
    t.GetType = function() {
        return 65
    };
    t.n = function() {
        return this.f
    };
    t.o = function(n) {
        n !== undefined && (this.g = n)
    };
    t.p = function(n) {
        n !== undefined && (this.h = n)
    };
    t.q = function(n) {
        if (n !== undefined) this.i.i(n);
        else return this.i
    };
    t.r = function(n) {
        n !== undefined && (this.j = n)
    };
    t.s = function(n) {
        n !== undefined && (this.k = n)
    };
    t.t = function(n) {
        n !== undefined && this.l.i(n)
    };
    t.u = function(n) {
        n !== undefined && (this.m = n)
    };
    t.C = function(n, t, i, r, u, f, e) {
        $Y.prototype.e.call(this);
        this.o(n);
        this.u(t);
        this.p(i);
        this.q(r);
        this.r(u);
        this.s(f);
        this.t(e)
    };
    $a6 = function(n, t, i, r, u, f, e) {
        var o = new $x;
        return o.C(n, t, i, r, u, f, e), o
    }
});
$t = $CreateClass(function() {
    this.e = null;
    this.f = null;
    this.g = null;
    this.h = null;
    this.i = null;
    this.j = null;
    this.k = null;
    this.l = null;
    this.m = null;
    this.n = null;
    this.o = null
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 52
    };
    t.r = function() {
        return $dY(this.e)
    };
    t.x = function(n) {
        $aw(this.f, null) && this.f.Invoke(this, n)
    };
    t.y = function(n) {
        $aw(this.g, null) && this.g.Invoke(this, n)
    };
    t.z = function(n) {
        $aw(this.h, null) && this.h.Invoke(this, n)
    };
    t.A = function(n) {
        $aw(this.i, null) && this.i.Invoke(this, n)
    };
    t.B = function(n) {
        $aw(this.j, null) && this.j.Invoke(this, n)
    };
    t.C = function(n) {
        $aw(this.k, null) && this.k.Invoke(this, n)
    };
    t.D = function(n) {
        $aw(this.l, null) && this.l.Invoke(this, n)
    };
    t.E = function(n) {
        $aw(this.m, null) && this.m.Invoke(this, n)
    };
    t.F = function(n) {
        $aw(this.n, null) && this.n.Invoke(this, n)
    };
    t.G = function(n) {
        $aw(this.o, null) && this.o.Invoke(this, n)
    };
    t.H = function() {
        this.e = $dW()
    };
    $cI = function() {
        var n = new $t;
        return n.H(), n
    };
    t.I = function(n) {
        this.f = $DownCast($bl(this.f, n), 130)
    };
    t.M = function(n) {
        this.h = $DownCast($bl(this.h, n), 130)
    };
    t.W = function(n) {
        this.m = $DownCast($bl(this.m, n), 173)
    }
});
$p7 = $CreateClass(function(n) {
    this.$typeArgId1 = n;
    this.e = null;
    this.f = 0;
    this.g = null
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 94
    };
    t.$II = function(n) {
        return [12, 18, 28].indexOf(n) != -1
    };
    t.$tF = function() {
        return $CreateBox(this.g, this.$typeArgId1)
    };
    t.$tE = function() {
        return this.g
    };
    t.j = function() {};
    t.k = function() {
        this.f = -1;
        this.g = null
    };
    t.l = function() {
        return (this.f++, this.f < this.e.length) ? (this.g = this.e[this.f], !0) : !1
    };
    t.m = function(n) {
        this.e = n;
        this.f = -1
    };
    $qq = function(n, t) {
        var i = new $p7(t);
        return i.m(n), i
    };
    t.$ez = t.k;
    t.$eA = t.l;
    t.$d9 = t.j
});
$qp = $CreateClass(function(n) {
    this.$typeArgId1 = n;
    this.e = null
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 193
    };
    t.$II = function(n) {
        return [16, 22].indexOf(n) != -1
    };
    t.$ew = function() {
        return $qq(this.e, this.$typeArgId1)
    };
    t.g = function() {
        return $qq(this.e, this.$typeArgId1)
    };
    t.$S = t.g
});
$CreateClass(function() {}, function() {
    $co = 0;
    $cn = 0;
    $cL = 0;
    $ca = 0;
    $bw = 0;
    $aS = function(n) {
        return ($ba(n, 17) ? 2 : 0) | ($ba(n, 16) ? 4 : 0) | ($ba(n, 18) ? 8 : 0) | ($ba(n, 203) ? 1 : 0) | ($br(n, 1) ? 16 : 0) | ($br(n, 2) ? 32 : 0) | ($br(n, 3) ? 64 : 0)
    };
    $b_ = function() {
        var n = new $i,
            t = new $i;
        return $C(1, 1)
    };
    $cN = function() {
        var t, n;
        $cL = -1;
        t = $K();
        t.u();
        n = $bP();
        $ca = n;
        $bw = n
    };
    $cO = function() {
        var n = $bP(),
            t = n - $ca,
            i = n - $bw;
        $bw = n;
        $cQ(t);
        $cP(t, i)
    };
    $cP = function(n, t) {
        var i = $K();
        i.r(t);
        i.q(n);
        i.v()
    };
    $cQ = function(n) {
        for (var t = $K(); t.s() <= n;) t.w(), t.s(t.s() + t.t())
    };
    $cR = function() {
        var n = $K(),
            t = n.n();
        t.j(t.i());
        t.m(n.o(), n.p());
        n.x()
    };
    $cS = function(n, t) {
        var i = $K(),
            r = $bS(t, $aS(n));
        return i != null && i.m().B(r), r.i()
    };
    $cT = function(n, t) {
        var i = $K(),
            r = $bS(t, $aS(n));
        return i != null && i.m().C(r), r.i()
    };
    $cU = function(n, t) {
        var i = $K(),
            r = $cG(t, $aS(n));
        return i != null && i.m().D(r), r.i()
    };
    $cV = function(n, t, i, r) {
        var u = $K(),
            f = $a6(1, $aS(n), r == 1, $6($C(t, i), $b_()), 0, r, $ax(0, 0));
        return u != null && u.m().x(f), f.n()
    };
    $cW = function(n, t, i, r) {
        var u = $K(),
            f = $a6(1, $aS(n), r == 1, $6($C(t, i), $b_()), 0, r, $ax(0, 0));
        return u != null && u.m().y(f), f.n()
    };
    $cX = function(n, t, i) {
        var r = $K(),
            u = $aS(n),
            f = $a6(1, u, (u & 16) == 16, $6($C(t, i), $b_()), 0, 0, $ax(0, 0));
        return $co = t, $cn = i, r != null && r.m().z(f), f.n()
    };
    $cZ = function(n, t, i) {
        var r = $K(),
            u = $a6(1, $aS(n), !1, $6($C($co, $cn), $b_()), 0, 0, $ax(t, i));
        return r != null && r.m().A(u), u.n()
    };
    $c0 = function() {
        var n = $K();
        n != null && (n.n().l(), n.m().E($b6()))
    };
    $c1 = function() {
        var n = $K(),
            t = $cF();
        return n != null && n.m().F(t), t.g()
    };
    $c2 = function() {
        var n = $K();
        n != null && n.m().G($b6())
    }
});
$CreateClass(function() {}, function() {
    $aA = function(n) {
        for (var i = $a7(n.length * 8), t = 0; t < n.length; t++) i.ad(t * 8, n[t], !0);
        return i
    };
    $cz = function(n) {
        for (var i = $a7(n.length * 16), t = 0; t < n.length; t++) i.ah(t * 16, n[t], !0);
        return i
    };
    $aG = function(n) {
        for (var i = $a7(n.length * 2), t = 0; t < n.length; t++) i.H(t * 2, n[t], !0);
        return i
    };
    $p8 = function(n) {
        for (var i = $a7(n.length * 4), t = 0; t < n.length; t++) i.V(t * 4, n[t], !0);
        return i
    }
});
$CreateClass(function() {}, function() {
    $bu = null;
    $bM = function(n) {
        $bu = Array.Sized(n, 4)
    };
    $Q = function(n, t) {
        $bu[n] = t
    };
    $aE = function(n) {
        return $bu[n]
    }
});
$sx = $CreateClass(function() {
    this.e = null;
    this.f = 0;
    this.g = 0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 115
    };
    t.$II = function(n) {
        return [12, 18, 28].indexOf(n) != -1
    };
    t.$tF = function() {
        return $CreateBox(this.g, 56)
    };
    t.$tE = function() {
        return this.g
    };
    t.j = function() {};
    t.k = function() {
        this.f = -1;
        this.g = 0
    };
    t.l = function() {
        return (this.f++, this.f < this.e.length) ? (this.g = this.e.charCodeAt(this.f), !0) : !1
    };
    t.m = function(n) {
        this.e = n;
        this.f = -1
    };
    $sw = function(n) {
        var t = new $sx;
        return t.m(n), t
    };
    t.$ez = t.k;
    t.$eA = t.l;
    t.$d9 = t.j
});
$sv = $CreateClass(function() {
    this.e = null
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 215
    };
    t.$II = function(n) {
        return [16, 22].indexOf(n) != -1
    };
    t.$ew = function() {
        return $sw(this.e)
    };
    t.g = function() {
        return $sw(this.e)
    };
    t.$S = t.g
});
$rz = $CreateClass(function() {
    this.$struct = !0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 153
    }
});
$rv = $CreateClass(function() {
    this.$struct = !0;
    this.e = 0;
    this.f = 0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 88
    };
    t.c = function(n) {
        var t = new $rv,
            i = $IsOp(n, 88);
        return i ? !1 : (t.g($DownCast(n, 88)), this.e == t.e && this.f == t.f)
    };
    t.b = function() {
        return this.e * 1337 ^ this.f
    };
    t.g = function(n) {
        this.e = n.e;
        this.f = n.f
    }
});
$d = $CreateClass(function() {
    this.$struct = !0;
    this.e = null;
    this.f = !1;
    this.g = null;
    this.h = 0;
    this.i = 0;
    this.j = 0;
    this.k = 0;
    this.l = 0;
    this.m = 0;
    this.n = 0;
    this.o = 0;
    this.p = 0;
    this.q = 0;
    this.r = null;
    this.s = !1;
    this.t = !1;
    this.u = !1;
    this.v = !1;
    this.w = !1;
    this.x = !1;
    this.y = !1;
    this.z = 0;
    this.A = 0
}, function(n) {
    var t = n.prototype;
    $a1 = null;
    $aL = 0;
    t.GetType = function() {
        return 9
    };
    t.B = function(n) {
        if (n !== undefined) this.r = n;
        else return this.r
    };
    t.C = function(n) {
        if (n !== undefined) this.s = n;
        else return this.s
    };
    t.D = function(n) {
        n !== undefined && (this.h = $b8(n))
    };
    t.E = function(n) {
        n !== undefined && (this.i = $b8(n))
    };
    t.F = function(n) {
        n !== undefined && (this.j = $a8(n))
    };
    t.G = function(n) {
        n !== undefined && (this.k = $a8(n))
    };
    t.H = function(n) {
        n !== undefined && (this.l = $a8(n))
    };
    t.I = function(n) {
        n !== undefined && (this.m = $a8(n))
    };
    t.J = function(n) {
        if (n !== undefined) this.t = n;
        else return this.t
    };
    t.K = function(n) {
        n !== undefined && (this.n = $c4(n))
    };
    t.L = function(n) {
        n !== undefined && (this.p = $cu(n))
    };
    t.M = function(n) {
        n !== undefined && (this.q = $cr(n))
    };
    t.N = function(n) {
        n !== undefined && (this.o = $dX(n))
    };
    t.O = function(n) {
        if (n !== undefined) this.u = n;
        else return this.u
    };
    t.P = function(n) {
        if (n !== undefined) this.v = n;
        else return this.v
    };
    t.Q = function(n) {
        if (n !== undefined) this.w = n;
        else return this.w
    };
    t.R = function(n) {
        if (n !== undefined) this.x = n;
        else return this.x
    };
    t.S = function(n) {
        if (n !== undefined) this.y = n;
        else return this.y
    };
    t.T = function(n) {
        if (n !== undefined) this.z = n;
        else return this.z
    };
    t.U = function(n) {
        if (n !== undefined) this.A = n;
        else return this.A
    };
    t.V = function(n, t) {
        this.e != null && $iG(this.e[n], t) && (this.e[n] = t, this.f = !0)
    };
    t.W = function(n, t) {
        this.V(n, t ? "true" : "false")
    };
    t.Y = function() {
        if (this.B() == null) throw $bf("Draw statements may not be used from the constructor of the containing class.");
        (this.f || this.g == null) && (this.g = this.B().n(this.e), this.f = !1);
        $bU(this.g.i())
    };
    t.Z = function(n, t, i, r, u, f, e) {
        if (u != null) {
            var o = this.g.k(n);
            o != -1 && ($eq(o), $aQ(34962, u.m()), $ef(o, t, i, r, f, e), $aQ(34962, null), $a1.p(o))
        }
    };
    t.aa = function(n, t, i, r, u) {
        var f, e, o;
        $dU(t, $CreateRef(function() {
            return f
        }, function(n) {
            f = n
        }, this), $CreateRef(function() {
            return e
        }, function(n) {
            e = n
        }, this), $CreateRef(function() {
            return o
        }, function(n) {
            o = n
        }, this));
        this.Z(n, f, e, o, i, r, u)
    };
    t.ab = function(n, t, i, r) {
        var u = this.g.k(n);
        $a2(33984 + $aL);
        $aP(t, i);
        $a_(t, 10240, 9729);
        r ? ($a_(t, 10241, 9987), $a_(t, 10242, 10497), $a_(t, 10243, 10497)) : ($a_(t, 10241, 9729), $a_(t, 10242, 33071), $a_(t, 10243, 33071));
        $b9(u, $aL++)
    };
    t.ac = function(n, t, i, r, u) {
        var f = new $z,
            e;
        f.k(r);
        e = this.g.k(n);
        $a2(33984 + $aL);
        $aP(t, i);
        $a_(t, 10240, f.f);
        u ? $a_(t, 10241, f.e) : $a_(t, 10241, f.j());
        $a_(t, 10242, f.g);
        $a_(t, 10243, f.h);
        $b9(e, $aL++)
    };
    t.ad = function(n, t) {
        $a2(33984 + $aL);
        $aP(t, null);
        $aL++
    };
    t.ae = function(n, t) {
        t != null ? this.ab(n, 3553, t.m(), t.p()) : this.ad(n, 3553)
    };
    t.af = function(n, t, i) {
        t != null ? this.ac(n, 3553, t.m(), i, t.p()) : this.ad(n, 3553)
    };
    t.aq = function(n, t) {
        $cA(this.g.k(n), t)
    };
    t.ar = function(n, t) {
        $cC(this.g.k(n), t)
    };
    t.at = function(n, t) {
        $q8(this.g.k(n), t)
    };
    t.au = function(n, t) {
        $cY(this.g.k(n), t)
    };
    t.aw = function(n, t) {
        $rb(this.g.k(n), !1, t)
    };
    t.aC = function(n, t) {
        $tJ(this.g.k(n), !1, t)
    };
    t.aD = function() {
        this.C() ? ($bv(3042), $eR(this.j, this.l, this.k, this.m)) : $by(3042);
        this.U() != 1 && $ck(this.U());
        this.J() ? ($bv(2929), $eJ(this.n)) : $by(2929);
        this.p != 0 ? ($bv(2884), $eM(this.p), $eQ(this.q)) : $by(2884);
        $bC(this.S());
        $b7(this.O(), this.P(), this.Q(), this.R())
    };
    t.aE = function() {
        for (var n = 0; n < $a1.h(); n++) $df($a1.i(n));
        for (n = 0; n < $aL; n++) $a2(33984 + n), $aP(3553, null);
        this.U() != 1 && $ck(1);
        $bC(!0);
        $b7(!0, !0, !0, !0);
        $a1.v();
        $aL = 0
    };
    t.aF = function(n) {
        this.aD();
        $eP(this.o, this.T(), n);
        this.aE()
    };
    t.aG = function(n, t, i) {
        this.aD();
        $aQ(34963, i.m());
        $eN(this.o, n, t, this.T());
        $aQ(34963, null);
        this.aE()
    };
    t.aH = function(n, t, i) {
        t == 0 ? this.aF(n) : this.aG(n, $dV(t), i)
    };
    t.aI = function(n) {
        this.e = n.e;
        this.f = n.f;
        this.g = n.g;
        this.h = n.h;
        this.i = n.i;
        this.j = n.j;
        this.k = n.k;
        this.l = n.l;
        this.m = n.m;
        this.n = n.n;
        this.o = n.o;
        this.p = n.p;
        this.q = n.q;
        this.r = n.r;
        this.s = n.s;
        this.t = n.t;
        this.u = n.u;
        this.v = n.v;
        this.w = n.w;
        this.x = n.x;
        this.y = n.y;
        this.z = n.z;
        this.A = n.A
    };
    t.aJ = function(n) {
        var r, u, f, e, o, s, h, t, i, c;
        this.aI(new $d);
        $a1 == null && ($a1 = $as(2));
        this.e = Array.Sized(n.l(), 7);
        this.B(n);
        this.C(!1);
        this.D((this.E(0), 0));
        this.F((r = (u = (this.I(1), 1), this.H((this.I(1), 1)), u), this.G((f = (this.I(1), 1), this.H((this.I(1), 1)), f)), r));
        this.O((e = (o = (s = (h = (this.J(!0), !0), this.S((this.J(!0), !0)), h), this.R((t = (this.J(!0), !0), this.S((this.J(!0), !0)), t)), s), this.Q((i = (t = (this.J(!0), !0), this.S((this.J(!0), !0)), t), this.R((t = (this.J(!0), !0), this.S((this.J(!0), !0)), t)), i)), o), this.P((c = (i = (t = (this.J(!0), !0), this.S((this.J(!0), !0)), t), this.R((t = (this.J(!0), !0), this.S((this.J(!0), !0)), t)), i), this.Q((i = (t = (this.J(!0), !0), this.S((this.J(!0), !0)), t), this.R((t = (this.J(!0), !0), this.S((this.J(!0), !0)), t)), i)), c)), e));
        this.U(1);
        this.K(2);
        this.L(2);
        this.M(1);
        this.N(1);
        this.T(0)
    };
    $aC = function(n) {
        var t = new $d;
        return t.aJ(n), t
    }
});
$U = $CreateClass(function() {
    this.e = null
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 95
    };
    t.f = function() {
        return this.e
    };
    t.d = function() {
        return this.e
    };
    t.g = function(n) {
        this.e = n
    };
    $cy = function(n) {
        var t = new $U;
        return t.g(n), t
    }
});
$9 = $CreateClass(function() {
    $U.call(this)
}, function(n) {
    var t = n.prototype = new $U;
    t.GetType = function() {
        return 140
    };
    t.i = function(n) {
        $U.prototype.g.call(this, n)
    };
    $au = function(n) {
        var t = new $9;
        return t.i(n), t
    }
});
$CreateClass(function() {}, function() {
    $bm = function() {
        var n = $et();
        if (n != 0) throw $au($N($bH("GLError (", $CreateBox(n, 208)), ")"));
    };
    $cw = function() {
        var n = $eB(36160);
        if (n != 36053) throw $au("Incomplete GLFramebuffer");
    };
    $cm = function(n, t, i, r, u, f) {
        switch (u) {
            case 1:
                $a3(n, r, 6409, t, i, 0, 6409, 5121, f);
                break;
            case 2:
                $a3(n, r, 6410, t, i, 0, 6410, 5121, f);
                break;
            case 3:
                $a3(n, r, 6408, t, i, 0, 6408, 5121, f);
                break;
            case 4:
                $a3(n, r, 6408, t, i, 0, 6408, 32819, f);
                break;
            case 5:
                $a3(n, r, 6408, t, i, 0, 6408, 32820, f);
                break;
            case 6:
                $a3(n, r, 650, t, i, 0, 6407, 33635, f);
                break;
            default:
                throw $d8("Unsupported texture format");
        }
    };
    $cv = function(n, t, i, r, u) {
        return $cx(n, t, i, r, u ? $cq(r) : null, !0)
    };
    $cx = function(n, t, i, r, u, f) {
        var o = new $l,
            e = $b3(),
            s = $ed(),
            h;
        return e.n(s), e.p(!0), e.l(r), $bG(36160, s), $dR(36160, 36064, n, t, i), u != null && ($dS(36160, 36096, 36161, u), e.o(u), e.q(f), e.m(!0)), $cw(), $bm(), h = $K().n().j(), o.q($K().n().k()), $K().n().j(e), $K().n().j(h), $K().n().k(o), e
    };
    $cq = function(n) {
        var t = new $i,
            i;
        return t.i(n), i = $dd(), $cj(36161, i), $d1(36161, 33189, t.e, t.f), $cj(36161, null), i
    };
    $c_ = function(n, t) {
        var i = $eu(n),
            r;
        if (t = $N("precision highp float;\n", t), $ei(i, t), $ej(i), $eK(i, 35713) != 1) {
            r = $el(i);
            throw $au($N($N($N($N($bH("Error compiling shader (", $CreateBox(n, 209)), "):\n\n"), r), "\n\nSource:\n\n"), t));
        }
        return $bm(), i
    };
    $cs = function(n, t) {
        var i = $em(),
            r;
        if ($bW(i, n), $bW(i, t), $en(i), $eo(i, 35714) != 1) {
            r = $ep(i);
            throw $au($N("Error linking shader program:\n\n", r));
        }
        return $bU(i), $bm(), i
    }
});
$CreateClass(function() {}, function() {
    $cr = function(n) {
        switch (n) {
            case 0:
                return 2304;
            case 1:
                return 2305;
            default:
                throw $au("Unsupported polygon winding");
        }
    };
    $cu = function(n) {
        switch (n) {
            case 0:
                return 0;
            case 1:
                return 1028;
            case 2:
                return 1029;
            case 3:
                return 1032;
            default:
                throw $au("Unsupported polygon face");
        }
    };
    $c4 = function(n) {
        switch (n) {
            case 0:
                return 519;
            case 1:
                return 513;
            case 2:
                return 200;
            case 3:
                return 514;
            case 4:
                return 200;
            case 5:
                return 518;
            case 6:
                return 200;
            case 7:
                return 512;
            default:
                throw $au("Unsupported compare func");
        }
    };
    $dX = function(n) {
        switch (n) {
            case 1:
                return 4;
            case 2:
                return 1;
            case 3:
                return 0;
            case 4:
                return 5;
            case 5:
                return 3;
            default:
                throw $au("Unsupported primitive type");
        }
    };
    $a8 = function(n) {
        switch (n) {
            case 0:
                return 0;
            case 1:
                return 1;
            case 2:
                return 770;
            case 3:
                return 771;
            case 4:
                return 768;
            case 5:
                return 769;
            case 6:
                return 772;
            case 7:
                return 773;
            case 8:
                return 774;
            case 9:
                return 775;
            default:
                throw $au("Unsupported blend operand");
        }
    };
    $b8 = function(n) {
        switch (n) {
            case 0:
                return 32774;
            case 1:
                return 32778;
            case 2:
                return 32779;
            default:
                throw $au("Unsupported blend equation");
        }
    };
    $bX = function(n) {
        switch (n) {
            case 0:
                return 35044;
            case 1:
                return 35048;
            default:
                throw $au("Unsupported buffer usage");
        }
    };
    $dV = function(n) {
        switch (n) {
            case 1:
                return 5121;
            case 2:
                return 5123;
            default:
                throw $au("Unsupported index type");
        }
    };
    $dU = function(n, t, i, r) {
        switch (n) {
            case 1:
                i(5126);
                t(1);
                r(!1);
                break;
            case 2:
                i(5126);
                t(2);
                r(!1);
                break;
            case 3:
                i(5126);
                t(3);
                r(!1);
                break;
            case 4:
                i(5126);
                t(4);
                r(!1);
                break;
            case 5:
                i(5122);
                t(1);
                r(!1);
                break;
            case 6:
                i(5122);
                t(1);
                r(!0);
                break;
            case 7:
                i(5122);
                t(2);
                r(!1);
                break;
            case 8:
                i(5122);
                t(2);
                r(!0);
                break;
            case 9:
                i(5122);
                t(4);
                r(!1);
                break;
            case 10:
                i(5122);
                t(4);
                r(!0);
                break;
            case 11:
                i(5123);
                t(1);
                r(!1);
                break;
            case 12:
                i(5123);
                t(1);
                r(!0);
                break;
            case 13:
                i(5123);
                t(2);
                r(!1);
                break;
            case 14:
                i(5123);
                t(2);
                r(!0);
                break;
            case 15:
                i(5123);
                t(4);
                r(!1);
                break;
            case 16:
                i(5123);
                t(4);
                r(!0);
                break;
            case 17:
                i(5120);
                t(4);
                r(!1);
                break;
            case 18:
                i(5120);
                t(4);
                r(!0);
                break;
            case 19:
                i(5121);
                t(4);
                r(!1);
                break;
            case 20:
                i(5121);
                t(4);
                r(!0);
                break;
            default:
                throw $au("Unsupported vertex attribute type");
        }
    }
});
$B = $CreateClass(function() {
    this.e = null;
    this.f = null;
    this.g = null;
    this.h = null
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 60
    };
    t.$II = function(n) {
        return [28].indexOf(n) != -1
    };
    t.i = function(n) {
        if (n !== undefined) this.h = n;
        else return this.h
    };
    t.k = function(n) {
        return this.g[n]
    };
    t.l = function() {
        $bU(null);
        $tT(this.i(), this.e);
        $tT(this.i(), this.f);
        $tK(this.i());
        $tL(this.e);
        $tL(this.f)
    };
    t.m = function(n, t, i, r, u) {
        var f;
        for (this.e = $c_(35633, n), this.f = $c_(35632, t), this.i($cs(this.e, this.f)), this.g = Array.Zeros(u.length, 2), f = 0; f < i; f++) this.g[f] = -1;
        for (f = i; f < i + r; f++) this.g[f] = $ct(this.i(), u[f]);
        for (f = i + r; f < u.length; f++) this.g[f] = $cH(this.i(), u[f])
    };
    $dT = function(n, t, i, r, u) {
        var f = new $B;
        return f.m(n, t, i, r, u), f
    };
    t.$d9 = t.l
});
$s = $CreateClass(function() {
    this.e = null;
    this.f = null;
    this.g = null;
    this.h = null;
    this.i = null;
    this.j = 0;
    this.k = 0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 49
    };
    t.l = function() {
        return this.j
    };
    $R = function(n, t, i, r, u) {
        return $dQ(n, t, i, r, u)
    };
    t.m = function(n) {
        for (var t = "", i = 0; i < n.length; i++) t = $N(t, $N($N($N($N("#define ", this.i[i]), " "), n[i]), "\n"));
        return $dT($N(t, this.g), $N(t, this.h), this.j, this.k, this.i)
    };
    t.n = function(n) {
        var i, t;
        return n.length == 0 ? (this.f == null && (this.f = this.m(n)), this.f) : (i = $dr(":", n), this.e == null && (this.e = $bh([7, 60])), this.e.r(i, $CreateRef(function() {
            return t
        }, function(n) {
            t = n
        }, this)) || (t = this.m(n), this.e.q(i, t)), t)
    };
    t.o = function(n, t, i, r, u) {
        this.g = n;
        this.h = t;
        this.j = i;
        this.k = r;
        this.i = u
    };
    $dQ = function(n, t, i, r, u) {
        var f = new $s;
        return f.o(n, t, i, r, u), f
    }
});
$CreateClass(function() {}, function() {
    $rN = function(n, t, i) {
        return new DataView(n.buffer).getInt16(t, i)
    };
    $rX = function(n, t, i) {
        return new DataView(n.buffer).getUint16(t, i)
    };
    $dP = function(n, t, i, r) {
        new DataView(n.buffer).setUint16(t, i, r)
    };
    $rU = function(n, t, i) {
        return new DataView(n.buffer).getUint32(t, i)
    };
    $rT = function(n, t, i, r) {
        new DataView(n.buffer).setUint32(t, i, r)
    };
    $rY = function(n, t, i) {
        return new DataView(n.buffer).getFloat32(t, i)
    };
    $dO = function(n, t, i, r) {
        new DataView(n.buffer).setFloat32(t, i, r)
    }
});
$CreateClass(function() {}, function() {
    $bP = function() {
        return (new Date).getTime() / 1e3
    }
});
$CreateClass(function() {}, function() {
    $dN = function(n, t) {
        return $EqOp(n, t)
    }
});
$CreateClass(function() {}, function() {
    $dM = function() {
        return {}
    };
    $dL = function() {
        return null
    };
    $dK = function() {
        return $ax(canvas.width, canvas.height)
    };
    $dJ = function() {
        return $ax(0, 0)
    };
    $dI = function() {
        return $cl(0, 0, canvas.width, canvas.height)
    };
    $dH = function() {
        return canvas.height
    }
});
$CreateClass(function() {}, function() {
    $dW = function() {
        return canvas
    };
    $dY = function(n) {
        return $ax(n.width, n.height)
    };
    $br = function(n, t) {
        return $PressedButtons[t]
    };
    $ba = function(n, t) {
        return $PressedKeys[t]
    }
});
$CreateClass(function() {}, function() {
    $bn = function(n) {
        return n ? new Uint8Array(n.h.buffer, n.e, n.f) : null
    };
    $z4 = function(n) {
        return new Float32Array([n.e, n.f, n.g, n.h, n.i, n.j, n.k, n.l, n.m, n.n, n.o, n.p, n.q, n.r, n.s, n.t])
    };
    $Al = function(n) {
        for (var r = 0, u = n.length, i = new Float32Array(u * 16), t = 0; t < u; t++) i[r++] = n[t].e, i[r++] = n[t].f, i[r++] = n[t].g, i[r++] = n[t].h, i[r++] = n[t].i, i[r++] = n[t].j, i[r++] = n[t].k, i[r++] = n[t].l, i[r++] = n[t].m, i[r++] = n[t].n, i[r++] = n[t].o, i[r++] = n[t].p, i[r++] = n[t].q, i[r++] = n[t].r, i[r++] = n[t].s, i[r++] = n[t].t;
        return i
    }
});
$CreateClass(function() {}, function() {
    $z6 = function(n, t, i) {
        var o = new $Bv,
            r = new $Bi,
            h, c, u, l, f, e;
        o.h(n);
        r.k(t);
        var a = $hR(r.f, r.e),
            v = $hR(r.g, r.e),
            y = $jx(o.f, v),
            s;
        return (s = $js(a, y), s > -1e-5 && s < 1e-5) ? (i(0), !1) : (h = 1 / s, c = $hR(o.e, r.e), u = $js(c, y), u = u * h, u < 0 || u > 1) ? (i(0), !1) : (l = $jx(c, a), f = $js(o.f, l), f = f * h, f < 0 || u + f > 1) ? (i(0), !1) : (e = $js(v, l), e = e * h, e < 0) ? (i(0), !1) : (i(e), !0)
    };
    $zG = function(n, t, i) {
        var r = new $Bv,
            u = new $zB,
            o, h;
        if (r.h(n), u.h(t), i(0), o = 3402823e32, $bb(r.f.e) < 1e-5) {
            if (r.e.e < u.e.e || r.e.e > u.f.e) return i(0), !1
        } else {
            var s = 1 / r.f.e,
                f = (u.e.e - r.e.e) * s,
                e = (u.f.e - r.e.e) * s;
            if (f > e && (h = f, f = e, e = h), i($c6(f, i())), o = $mS(e, o), i() > o) return i(0), !1
        }
        if ($bb(r.f.f) < 1e-5) {
            if (r.e.f < u.e.f || r.e.f > u.f.f) return i(0), !1
        } else {
            var s = 1 / r.f.f,
                f = (u.e.f - r.e.f) * s,
                e = (u.f.f - r.e.f) * s;
            if (f > e && (h = f, f = e, e = h), i($c6(f, i())), o = $mS(e, o), i() > o) return i(0), !1
        }
        if ($bb(r.f.g) < 1e-5) {
            if (r.e.g < u.e.g || r.e.g > u.f.g) return i(0), !1
        } else {
            var s = 1 / r.f.g,
                f = (u.e.g - r.e.g) * s,
                e = (u.f.g - r.e.g) * s;
            if (f > e && (h = f, f = e, e = h), i($c6(f, i())), o = $mS(e, o), i() > o) return i(0), !1
        }
        return !0
    }
});
$zB = $CreateClass(function() {
    this.$struct = !0;
    this.e = new $hY;
    this.f = new $hY
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 78
    };
    t.h = function(n) {
        this.e.i(n.e);
        this.f.i(n.f)
    };
    t.i = function(n, t) {
        this.e.i(n);
        this.f.i(t)
    };
    $zz = function(n, t) {
        var i = new $zB;
        return i.i(n, t), i
    }
});
$Bv = $CreateClass(function() {
    this.$struct = !0;
    this.e = new $hY;
    this.f = new $hY
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 44
    };
    t.h = function(n) {
        this.e.i(n.e);
        this.f.i(n.f)
    };
    t.i = function(n, t) {
        this.e.i(n);
        this.f.i(t)
    };
    $Bs = function(n, t) {
        var i = new $Bv;
        return i.i(n, t), i
    }
});
$Bi = $CreateClass(function() {
    this.$struct = !0;
    this.e = new $hY;
    this.f = new $hY;
    this.g = new $hY
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 83
    };
    t.k = function(n) {
        this.e.i(n.e);
        this.f.i(n.f);
        this.g.i(n.g)
    };
    t.l = function(n, t, i) {
        this.e.i(n);
        this.f.i(t);
        this.g.i(i)
    };
    $Bh = function(n, t, i) {
        var r = new $Bi;
        return r.l(n, t, i), r
    }
});
$bj = $CreateClass(function() {}, function(n) {
    var t = n.prototype;
    $bN = null;
    t.GetType = function() {
        return 228
    };
    $dZ = function() {
        $bN = $es()
    }
});
$O = $CreateClass(function() {
    this.f = !1;
    this.i = null
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 97
    };
    t.j = function() {
        return null
    };
    t.l = function() {
        this.f = !1
    };
    t.m = function(n, t) {
        $aw(this.i, null) && this.i.Invoke(n, t)
    };
    t.n = function(n) {
        this.j() != null && this.j().m(this, n)
    };
    t.r = function() {
        return $bN
    };
    t.s = function(n, t) {
        return t
    };
    t.y = function() {}
});
$BO = $CreateClass(function(n) {
    this.$typeArgIds1 = n;
    this.f = 0;
    this.h = 0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 123
    };
    t.$II = function(n) {
        return [191].indexOf(n) != -1
    };
    t.j = function() {
        return this.h
    };
    t.b = function() {
        return this.f
    };
    t.d = function() {
        return this.f.d()
    };
    t.$BP = t.j
});
$CreateClass(function() {}, function() {
    $ec = null;
    $eb = function() {
        $ec = $bh([7, 4])
    }
});
$CreateClass(function() {}, function() {
    $d4 = null;
    $d3 = null;
    $c5 = function() {
        $d4 = Array.Sized(0, 4);
        $d3 = Array.Sized(0, 4)
    }
});
$wL = $CreateClass(function() {}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 231
    };
    $wK = function(n, t) {
        var i = new $l,
            r = new $l;
        return n.ap().aG(t, $C((i.q($yF()), i).l().e, (r.q($yF()), r).l().f))
    };
    $wJ = function(n, t, i) {
        var r = new $Bv;
        return i == null ? $wK(n, t) : (r.h($wK(n, t)), r.e = $hy(r.e, i.aC()), r.f = $hI(r.f, i.aC()), r)
    }
});
$wH = $CreateClass(function() {
    this.e = 0;
    this.f = 0;
    this.g = !1;
    this.h = null;
    this.i = null;
    this.j = null;
    this.k = null;
    this.l = null;
    this.m = null;
    this.n = null;
    this.o = null;
    this.p = null;
    this.q = null;
    this.r = null;
    this.s = null;
    this.t = null;
    this.u = null;
    this.v = null;
    this.w = null;
    this.F = !1;
    this.G = 0;
    this.H = null
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 17
    };
    t.I = function(n) {
        if (n !== undefined) this.h = n;
        else {
            var t = this.h;
            return t != null ? t : this.h = $xj(3, this.e, this.g)
        }
    };
    t.J = function(n) {
        if (n !== undefined) this.i = n;
        else {
            var t = this.i;
            return t != null ? t : this.i = $xj(2, this.e, this.g)
        }
    };
    t.K = function(n) {
        if (n !== undefined) this.j = n;
        else {
            var t = this.j;
            return t != null ? t : this.j = $xj(2, this.e, this.g)
        }
    };
    t.L = function(n) {
        if (n !== undefined) this.k = n;
        else {
            var t = this.k;
            return t != null ? t : this.k = $xj(2, this.e, this.g)
        }
    };
    t.M = function(n) {
        if (n !== undefined) this.l = n;
        else {
            var t = this.l;
            return t != null ? t : this.l = $xj(2, this.e, this.g)
        }
    };
    t.N = function(n) {
        if (n !== undefined) this.m = n;
        else {
            var t = this.m;
            return t != null ? t : this.m = $xj(2, this.e, this.g)
        }
    };
    t.O = function(n) {
        if (n !== undefined) this.n = n;
        else {
            var t = this.n;
            return t != null ? t : this.n = $xj(2, this.e, this.g)
        }
    };
    t.P = function(n) {
        if (n !== undefined) this.o = n;
        else {
            var t = this.o;
            return t != null ? t : this.o = $xj(2, this.e, this.g)
        }
    };
    t.Q = function(n) {
        if (n !== undefined) this.p = n;
        else {
            var t = this.p;
            return t != null ? t : this.p = $xj(2, this.e, this.g)
        }
    };
    t.R = function(n) {
        if (n !== undefined) this.q = n;
        else {
            var t = this.q;
            return t != null ? t : this.q = $xj(3, this.e, this.g)
        }
    };
    t.S = function(n) {
        if (n !== undefined) this.r = n;
        else {
            var t = this.r;
            return t != null ? t : this.r = $xj(3, this.e, this.g)
        }
    };
    t.T = function(n) {
        if (n !== undefined) this.s = n;
        else {
            var t = this.s;
            return t != null ? t : this.s = $xj(4, this.e, this.g)
        }
    };
    t.U = function(n) {
        if (n !== undefined) this.t = n;
        else {
            var t = this.t;
            return t != null ? t : this.t = $xj(4, this.e, this.g)
        }
    };
    t.V = function(n) {
        if (n !== undefined) this.u = n;
        else {
            var t = this.u;
            return t != null ? t : this.u = $xj(11, this.e, this.g)
        }
    };
    t.W = function(n) {
        if (n !== undefined) this.v = n;
        else {
            var t = this.v;
            return t != null ? t : this.v = $xj(19, this.e, this.g)
        }
    };
    t.X = function(n) {
        if (n !== undefined) this.w = n;
        else {
            var t = this.w;
            return t != null ? t : this.w = $xj(20, this.e, this.g)
        }
    };
    t.ag = function() {
        return this.F ? this.G : this.f
    };
    t.ah = function(n) {
        if (n !== undefined) this.H = n;
        else {
            var t = this.H;
            return t != null ? t : this.H = $xa(2, this.f, this.g)
        }
    };
    t.ai = function(n, t, i) {
        this.e = n;
        this.f = t;
        this.g = i
    };
    $wG = function(n, t, i) {
        var r = new $wH;
        return r.ai(n, t, i), r
    }
});
$CreateClass(function() {}, function() {
    $wF = function(n) {
        var i, r, u, t;
        if (n.k() != null) i = $wG(n.n(), n.m(), !0), i.ah($wN(n.k()));
        else
            for (i = $wG(n.n(), n.n(), !0), r = 0; r < n.n(); r++) i.ah().r(r);
        for (u = n.l().$S(); u.$eA();) t = u.$tE(), $in(t.g(), "Position") ? i.I($wE(t.h())) : $in(t.g(), "TexCoord") ? i.J($wE(t.h())) : $in(t.g(), "TexCoord1") ? i.K($wE(t.h())) : $in(t.g(), "TexCoord2") ? i.L($wE(t.h())) : $in(t.g(), "TexCoord3") ? i.M($wE(t.h())) : $in(t.g(), "TexCoord4") ? i.N($wE(t.h())) : $in(t.g(), "TexCoord5") ? i.O($wE(t.h())) : $in(t.g(), "TexCoord6") ? i.P($wE(t.h())) : $in(t.g(), "TexCoord7") ? i.Q($wE(t.h())) : $in(t.g(), "Normal") ? i.R($wE(t.h())) : $in(t.g(), "Tangent") ? i.T($wE(t.h())) : $in(t.g(), "Binormal") ? i.S($wE(t.h())) : $in(t.g(), "Color") ? i.U($wE(t.h())) : $in(t.g(), "TransformIndex") ? i.V($wE(t.h())) : $in(t.g(), "BoneWeights") ? i.X($wE(t.h())) : $in(t.g(), "BoneIndices") && i.W($wE(t.h()));
        return i
    };
    $wE = function(n) {
        switch (n.g()) {
            case 1:
                return $xi(n.g(), n.h());
            case 2:
                return $xi(n.g(), n.h());
            case 3:
                return $xi(n.g(), n.h());
            case 4:
                return $xi(n.g(), n.h());
            case 17:
            case 18:
                return $xi(n.g(), n.h());
            case 19:
            case 20:
                return $xi(n.g(), n.h());
            default:
                throw $cy("Unsupported vertex attribute type");
        }
    };
    $wN = function(n) {
        switch (n.g()) {
            case 1:
                return $w1(n.g(), n.h());
            case 2:
                return $w1(n.g(), n.h());
            case 4:
                return $w1(n.g(), n.h());
            default:
                throw $cy("Unsupported index type");
        }
    }
});
$w0 = $CreateClass(function() {
    this.e = 0;
    this.f = 0;
    this.g = 0;
    this.h = null;
    this.i = 0;
    this.j = null;
    this.k = !1
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 57
    };
    t.l = function(n) {
        if (n !== undefined) {
            if (this.h != null) throw $cy("Index type cannot be changed after buffer is written to");
            this.e = n
        } else return this.e
    };
    t.m = function() {
        return $q5(this.l())
    };
    t.n = function() {
        return this.h == null && (this.h = $a7(this.f * this.m())), this.h
    };
    t.p = function() {
        return this.h == null ? null : (this.j == null && (this.j = $q9(this.n().j(), this.g)), this.s(), this.j)
    };
    t.r = function(n) {
        this.n().H(this.i, n, !0);
        this.i = this.i + 2
    };
    t.s = function() {
        this.h != null && this.k && (this.j.s(this.h), this.k = !1)
    };
    t.u = function(n, t, i) {
        this.k = !0;
        this.e = n;
        this.f = t;
        this.g = i ? 0 : 1
    };
    $xa = function(n, t, i) {
        var r = new $w0;
        return r.u(n, t, i), r
    };
    t.v = function(n, t) {
        this.k = !0;
        this.l(n);
        this.g = 0;
        this.h = $a7(t.j());
        for (var i = 0; i < this.h.j(); i++) this.h.m(i, t.m(i))
    };
    $w1 = function(n, t) {
        var i = new $w0;
        return i.v(n, t), i
    }
});
$xk = $CreateClass(function() {
    this.e = 0;
    this.f = 0;
    this.g = 0;
    this.h = null;
    this.i = null;
    this.j = 0;
    this.k = !1
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 14
    };
    t.l = function(n) {
        if (n !== undefined) {
            if (this.h != null) throw $cy("Vertex attribute type cannot be changed after Bufferfer is written to");
            this.e = n
        } else return this.e
    };
    t.m = function() {
        return $q6(this.l())
    };
    t.n = function() {
        return this.h == null && (this.h = $a7(this.f * this.m())), this.h
    };
    t.o = function() {
        return this.n() == null ? null : (this.i == null && (this.i = $ra(this.n().j(), this.g)), this.K(), this.i)
    };
    t.q = function(n) {
        this.n().ad(this.j, n, !0);
        this.j = this.j + 8
    };
    t.r = function(n) {
        this.n().af(this.j, n, !0);
        this.j = this.j + 12
    };
    t.s = function(n) {
        this.n().ah(this.j, n, !0);
        this.j = this.j + 16
    };
    t.v = function(n) {
        this.n().z(this.j, n);
        this.j = this.j + 4
    };
    t.z = function(n) {
        this.n().H(this.j, n, !0);
        this.j = this.j + 2
    };
    t.K = function() {
        this.h != null && this.k && (this.i.s(this.h), this.k = !1)
    };
    t.M = function(n, t, i) {
        this.k = !0;
        this.l(n);
        this.f = t;
        this.g = i ? 0 : 1
    };
    $xj = function(n, t, i) {
        var r = new $xk;
        return r.M(n, t, i), r
    };
    t.N = function(n, t) {
        this.k = !0;
        this.l(n);
        this.g = 0;
        this.h = $a7(t.j());
        for (var i = 0; i < this.h.j(); i++) this.h.m(i, t.m(i))
    };
    $xi = function(n, t) {
        var i = new $xk;
        return i.N(n, t), i
    }
});
$xh = $CreateClass(function() {
    this.e = null;
    this.f = null
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 53
    };
    t.g = function() {
        return this.e.h()
    };
    t.h = function() {
        return this.o(), this.f
    };
    t.i = function(n) {
        return this.e.p(n), n.f
    };
    t.j = function() {
        for (var t = Array.Sized(this.e.h(), 45), n = 0; n < t.length; n++) t[n] = this.e.i(n).e;
        return t
    };
    t.k = function(n) {
        return this.i($w8(n, this.e.h()))
    };
    t.l = function(n) {
        return this.i($w8(n.l(), this.e.h()))
    };
    t.o = function() {
        var e, ft, et, ot, st, ht, ct, lt, at, o, s, u, r, kt, n, ut, i, dt, f;
        if (this.f == null) {
            var h, c, l, a, v, y, p, w, b, k, d, g, nt, tt, it, gt = $as(17),
                t = null,
                vt = 0,
                yt = $bh([2, 2]),
                rt = 0,
                pt = 0,
                wt = 0,
                bt = 0;
            for (u = 0; u < this.e.h(); u++) {
                for (r = this.e.i(u).e, h = c = l = a = v = y = p = w = b = k = d = g = nt = tt = it = null, kt = r.l().$S(); kt.$eA();) n = kt.$tE(), $in(n.g(), "Position") ? h = n.h() : $in(n.g(), "TexCoord") ? c = n.h() : $in(n.g(), "TexCoord1") ? l = n.h() : $in(n.g(), "TexCoord2") ? a = n.h() : $in(n.g(), "TexCoord3") ? v = n.h() : $in(n.g(), "TexCoord4") ? y = n.h() : $in(n.g(), "TexCoord5") ? p = n.h() : $in(n.g(), "TexCoord6") ? w = n.h() : $in(n.g(), "TexCoord7") ? b = n.h() : $in(n.g(), "Normal") ? k = n.h() : $in(n.g(), "Tangent") ? d = n.h() : $in(n.g(), "Binormal") ? g = n.h() : $in(n.g(), "Color") ? nt = n.h() : $in(n.g(), "BoneWeights") ? tt = n.h() : $in(n.g(), "BoneIndices") && (it = n.h());
                for (r.k() == null && (r = $xg(r)), ut = 0; ut < r.m(); ut++)(rt >= wt || pt >= bt) && (wt = 65535, bt = 1e5, t = $wG(wt, bt, !0), gt.p(t), yt = $bh([2, 2]), rt = 0, pt = 0), i = r.k().j(ut), dt = vt + i, yt.r(dt, $CreateRef(function() {
                    return f
                }, function(n) {
                    f = n
                }, this)) || (f = rt, yt.q(dt, f), h != null && t.I().r((e = h.l(i), $hW(e.e, e.f, e.g))), c != null && t.J().q((ft = c.l(i), $C(ft.e, ft.f))), l != null && t.K().q((et = l.l(i), $C(et.e, et.f))), a != null && t.L().q((ot = a.l(i), $C(ot.e, ot.f))), v != null && t.M().q((st = v.l(i), $C(st.e, st.f))), y != null && t.N().q((ht = y.l(i), $C(ht.e, ht.f))), p != null && t.O().q((ct = p.l(i), $C(ct.e, ct.f))), w != null && t.P().q((lt = w.l(i), $C(lt.e, lt.f))), b != null && t.Q().q((at = b.l(i), $C(at.e, at.f))), k != null && t.R().r((o = k.l(i), $hW(o.e, o.f, o.g))), d != null && t.T().s(d.l(i)), g != null && t.S().r((s = g.l(i), $hW(s.e, s.f, s.g))), nt != null && t.U().s(nt.l(i)), tt != null && t.X().v(tt.j(i)), it != null && t.W().v(it.k(i)), t.V().z(this.e.i(u).f), rt++), t.ah().r(f), pt++;
                vt = vt + r.n()
            }
            this.f = gt.m()
        }
    };
    $xg = function(n) {
        for (var r, u, f, i = Array.Zeros(n.n(), 114), t = 0; t < i.length; t++) i[t] = t;
        for (r = $bh([7, 24]), u = n.l().$S(); u.$eA();) f = u.$tE(), r.l(f.g(), f.h());
        return $vF(n.i(), n.j(), r, $vq(i))
    };
    t.p = function() {
        this.e = $as(112)
    };
    $xf = function() {
        var n = new $xh;
        return n.p(), n
    }
});
$xe = $CreateClass(function() {
    this.$struct = !0;
    this.e = null;
    this.f = new $f8;
    this.g = new $f8
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 86
    };
    t.i = function(n, t, i) {
        this.e = n;
        this.f.v(t);
        this.g.v(i)
    };
    $xd = function(n, t, i) {
        var r = new $xe;
        return r.i(n, t, i), r
    }
});
$xc = $CreateClass(function() {
    this.e = null;
    this.f = null;
    this.g = null;
    this.h = null;
    this.i = new $d;
    this.j = new $d
}, function(n) {
    var t = n.prototype;
    $xl = null;
    t.GetType = function() {
        return 42
    };
    t.$II = function(n) {
        return [126].indexOf(n) != -1
    };
    $xb = function() {
        return $xl == null && ($xl = $x_()), $xl
    };
    t.k = function(n, t, i) {
        i.e() || this.l();
        var r;
        this.e.r(i, $CreateRef(function() {
            return r
        }, function(n) {
            r = n
        }, this)) || (r = $as(86), this.e.q(i, r));
        r.p($xd(n, t != null ? t.aB() : $g3(), t != null ? t.aC() : $g3()));
        $yA(this)
    };
    t.l = function() {
        for (var t, n = this.e.n(); n.$eA();) t = n.$tE(), this.m(t.g(), t.h());
        this.e.p()
    };
    t.m = function(n, t) {
        var u, i, f, r, e;
        if (t.h() > 2) {
            for (u = $bh([46, 11]), i = 0; i < t.h(); i++) u.t(t.i(i).e) || u.q(t.i(i).e, $as(86)), u.l(t.i(i).e).p(t.i(i));
            for (f = u.n(); f.$eA();) r = f.$tE(), r.g().l().n() > 2e4 || r.h().h() < 3 ? this.r(n, r.h()) : (e = this.o(r.g()), this.q(n, e, r.h()))
        } else this.r(n, t)
    };
    t.n = function(n) {
        return n.l().m() != -1 ? n.l().m() : n.l().n()
    };
    t.o = function(n) {
        var t, r, i;
        if (!this.f.r(n, $CreateRef(function() {
                return t
            }, function(n) {
                t = n
            }, this))) {
            for (t = $xf(), this.f.l(n, t), r = $kX(16, 65535 / this.n(n) | 0), i = 0; i < r; i++) t.l(n);
            t.o()
        }
        return t
    };
    t.q = function(n, t, i) {
        for (var u, f, e, o = t.j(), r = 0; r < 16; r++) this.g[r] = $g2(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        for (u = 0, f = 0; f < i.h(); f++)
            if (this.g[u].v(i.i(f).f), this.h[u].v(i.i(f).g), u++, u >= t.g() - 1 || f == i.h() - 1)
                for (t.h().length > 0 && (e = u * this.n(i.i(0).e), $IsOp(n, 96) && $IsOp($yI(), 180) && (this.i.W(0, $AsOp(n, 96).v() != null), this.i.W(1, $AsOp(n, 96).w() != null), this.i.W(2, $AsOp(n, 96).x() != null), this.i.Y(), this.i.aa(3, t.h()[0].I().l(), t.h()[0].I().o(), t.h()[0].I().m(), 0), this.i.aa(4, t.h()[0].V().l(), t.h()[0].V().o(), t.h()[0].V().m(), 0), this.i.aa(5, t.h()[0].J().l(), t.h()[0].J().o(), t.h()[0].J().m(), 0), this.i.aa(6, t.h()[0].T().l(), t.h()[0].T().o(), t.h()[0].T().m(), 0), this.i.aa(7, t.h()[0].R().l(), t.h()[0].R().o(), t.h()[0].R().m(), 0), this.i.aC(8, Array.Init([this.g[0], this.g[1], this.g[2], this.g[3], this.g[4], this.g[5], this.g[6], this.g[7], this.g[8], this.g[9], this.g[10], this.g[11], this.g[12], this.g[13], this.g[14], this.g[15]], 5)), this.i.aw(9, $yJ().ap().aB()), this.i.at(10, $AsOp(n, 96).q()), this.i.aC(11, Array.Init([this.h[0], this.h[1], this.h[2], this.h[3], this.h[4], this.h[5], this.h[6], this.h[7], this.h[8], this.h[9], this.h[10], this.h[11], this.h[12], this.h[13], this.h[14], this.h[15]], 5)), this.i.at(12, $AsOp(n, 96).r()), this.i.at(13, $yJ().aq().aF()), this.i.aq(14, $AsOp(n, 96).s()), this.i.ae(15, $AsOp(n, 96).v()), this.i.ae(16, $AsOp(n, 96).w()), this.i.ae(17, $AsOp(n, 96).x()), this.i.aH(e, t.h()[0].ah().l(), t.h()[0].ah().p()))), u = 0, r = 0; r < 16; r++) this.g[r] = $g2(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
    };
    t.r = function(n, t) {
        for (var i, r = t.l(); r.$eA();) i = r.$tE(), this.s(n, i.e, i.f, i.g)
    };
    t.s = function(n, t, i, r) {
        var f, u, e, o;
        for (f = t.n(), u = 0, e = f.length; u < e; ++u) o = f[u], this.t(n, o, i, r)
    };
    t.t = function(n, t, i, r) {
        $IsOp(n, 96) && $IsOp($yI(), 180) && (this.j.W(0, $AsOp(n, 96).v() != null), this.j.W(1, $AsOp(n, 96).w() != null), this.j.W(2, $AsOp(n, 96).x() != null), this.j.Y(), this.j.aa(3, t.I().l(), t.I().o(), t.I().m(), 0), this.j.aa(4, t.J().l(), t.J().o(), t.J().m(), 0), this.j.aa(5, t.T().l(), t.T().o(), t.T().m(), 0), this.j.aa(6, t.R().l(), t.R().o(), t.R().m(), 0), this.j.at(7, $AsOp(n, 96).q()), this.j.at(8, $AsOp(n, 96).r()), this.j.aw(9, i), this.j.at(10, $yJ().aq().aF()), this.j.aq(11, $AsOp(n, 96).s()), this.j.aw(12, $lu(i, $yJ().ap().aB())), this.j.aw(13, $lH(r)), this.j.ae(14, $AsOp(n, 96).v()), this.j.ae(15, $AsOp(n, 96).w()), this.j.ae(16, $AsOp(n, 96).x()), this.j.aH(t.ag(), t.ah().l(), t.ah().p()))
    };
    t.u = function() {
        this.i = $aC($DownCast($aE(2), 49));
        this.j = $aC($DownCast($aE(3), 49))
    };
    t.v = function() {
        this.e = $bh([71, 11]);
        this.f = $bh([46, 53]);
        this.g = Array.Structs(16, $f8, 5);
        this.h = Array.Structs(16, $f8, 5);
        this.u()
    };
    $x_ = function() {
        var n = new $xc;
        return n.v(), n
    };
    t.$db = t.l
});
$w9 = $CreateClass(function() {
    this.e = null;
    this.f = 0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 112
    };
    t.g = function(n, t) {
        this.e = n;
        this.f = t
    };
    $w8 = function(n, t) {
        var i = new $w9;
        return i.g(n, t), i
    }
});
$CreateClass(function() {}, function() {
    $w2 = function(n) {
        for (var t = new $hY, u, e = n.q(), i = $hW(3402823e32, 3402823e32, 3402823e32), r = $hW(-3402823e32, -3402823e32, -3402823e32), f = 0; f < n.n(); f++) t.i((u = e.l(f), $hW(u.e, u.f, u.g))), i = $hW($mS(i.e, t.e), $mS(i.f, t.f), $mS(i.g, t.g)), r = $hW($c6(r.e, t.e), $c6(r.f, t.f), $c6(r.g, t.g));
        return $zz(i, r)
    }
});
$wD = $CreateClass(function() {}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 242
    };
    $wZ = function(n, t, i) {
        if (t == null) throw $cy("modelMesh can not be null");
        var r = t.m() > 0;
        return r ? $ig(t.q(), t.k(), t.m()).f(n, i) : $ii(t.q(), t.n()).f(n, i)
    }
});
$E = $CreateClass(function() {
    $O.call(this);
    this.B = null
}, function(n) {
    var t = n.prototype = new $O;
    t.GetType = function() {
        return 43
    };
    t.C = function(n) {
        if (n !== undefined) this.B = n;
        else return this.B
    };
    t.D = function() {
        return this.C() != null ? this.C().au() : null
    };
    t.G = function() {
        this.H()
    };
    t.H = function() {};
    t.I = function() {
        this.J()
    };
    t.J = function() {};
    t.K = function(n) {
        this.C(n);
        this.L(n)
    };
    t.L = function() {};
    t.M = function(n) {
        this.N(n);
        this.C(null)
    };
    t.N = function() {};
    t.O = function() {
        this.P()
    };
    t.P = function() {};
    t.Q = function(n) {
        this.R(n)
    };
    t.R = function() {};
    t.S = function() {
        this.T()
    };
    t.T = function() {};
    t.U = function(n) {
        this.V(n)
    };
    t.V = function() {};
    t.W = function(n) {
        this.X(n)
    };
    t.X = function() {};
    t.Y = function(n) {
        this.Z(n)
    };
    t.Z = function() {};
    t.aa = function(n) {
        this.ab(n)
    };
    t.ab = function() {};
    t.ac = function(n) {
        this.ad(n)
    };
    t.ad = function() {};
    t.ae = function(n) {
        this.af(n)
    };
    t.af = function() {};
    t.ag = function() {
        $O.prototype.y.call(this)
    }
});
$BK = $CreateClass(function() {
    $E.call(this);
    this.ah = null;
    this.ai = null;
    this.aj = !1
}, function(n) {
    var t = n.prototype = new $E;
    t.GetType = function() {
        return 92
    };
    t.al = function() {
        return this.ah
    };
    t.am = function() {
        if (this.ai != null) return this.ai;
        for (var n = this.C(); n != null;)
            if (n = n.an(), n != null && n.ar() != null) return n.ar().am();
        return null
    };
    t.an = function() {
        return this.aj
    };
    t.ap = function(n, t) {
        return this.al() == null ? (t(0), !1) : $zG(n, this.al().m(), t) ? $wZ(n, this.al().l(), t) ? !0 : !1 : !1
    };
    t.R = function(n) {
        var t = new $Bv,
            r = new $hY,
            i, u;
        this.al() != null && (!1 || this.an()) && $yJ() != null && (t.h($wJ($yJ(), n.i(), this.D())), this.ap(t, $CreateRef(function() {
            return i
        }, function(n) {
            i = n
        }, this))) && (r.i($hA($hT(t.e, $hS(t.f, i)), this.D().aB())), u = $jN($hR(r, $yJ().aq().aF())), n.n(this.C(), u))
    };
    t.P = function() {
        this.al() != null && this.am() != null && (this.am().f(this) || $xb().k(this.al(), this.D(), this.am()))
    }
});
$v9 = $CreateClass(function() {
    this.e = 0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 175
    };
    t.f = function(n, t) {
        for (var i, r = 3402823e32, f = !1, u = 0; u < this.e; u++) $z6(n, this.g(u), $CreateRef(function() {
            return i
        }, function(n) {
            i = n
        }, this)) && (f = !0, i < r && (r = i));
        return t(r), f
    };
    t.h = function(n) {
        this.e = n
    }
});
$CreateClass(function() {}, function() {
    $dG = null;
    $dF = function() {
        $dG = $dE()
    }
});
$ah = $CreateClass(function() {
    this.f = null;
    this.g = null;
    this.h = null;
    this.i = null
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 149
    };
    t.u = function() {
        this.f = $as(35);
        this.g = $bh([35, 2]);
        this.h = $b5(35);
        this.i = $as(187)
    };
    $dE = function() {
        var n = new $ah;
        return n.u(), n
    }
});
$aK = $CreateClass(function(n) {
    this.$typeArgId1 = n
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 187
    }
});
$ac = $CreateClass(function() {
    $Y.call(this);
    this.f = !1
}, function(n) {
    var t = n.prototype = new $Y;
    t.GetType = function() {
        return 122
    };
    t.h = function() {
        return this.f
    }
});
$bt = $CreateClass(function() {
    $ac.call(this)
}, function(n) {
    var t = n.prototype = new $ac;
    t.GetType = function() {
        return 143
    }
});
$an = $CreateClass(function() {
    $bt.call(this)
}, function(n) {
    var t = n.prototype = new $bt;
    t.GetType = function() {
        return 132
    }
});
$aM = $CreateClass(function() {
    $bt.call(this)
}, function(n) {
    var t = n.prototype = new $bt;
    t.GetType = function() {
        return 166
    }
});
$al = $CreateClass(function() {
    $bt.call(this)
}, function(n) {
    var t = n.prototype = new $bt;
    t.GetType = function() {
        return 134
    }
});
$bz = $CreateClass(function() {
    $ac.call(this)
}, function(n) {
    var t = n.prototype = new $ac;
    t.GetType = function() {
        return 236
    }
});
$am = $CreateClass(function() {
    $bz.call(this)
}, function(n) {
    var t = n.prototype = new $bz;
    t.GetType = function() {
        return 131
    }
});
$aj = $CreateClass(function() {
    $bz.call(this)
}, function(n) {
    var t = n.prototype = new $bz;
    t.GetType = function() {
        return 133
    }
});
$aI = $CreateClass(function() {
    $ac.call(this)
}, function(n) {
    var t = n.prototype = new $ac;
    t.GetType = function() {
        return 165
    }
});
$ws = $CreateClass(function() {
    $O.call(this);
    this.B = 0;
    this.C = 0;
    this.D = null
}, function(n) {
    var t = n.prototype = new $O;
    t.GetType = function() {
        return 119
    };
    t.$II = function(n) {
        return [50].indexOf(n) != -1
    };
    t.E = function() {
        return this.D
    };
    t.F = function() {};
    t.G = function() {};
    t.H = function() {};
    t.I = function(n) {
        return $aw(n, null) && n.Invoke(this)
    };
    t.J = function(n) {
        return n
    };
    t.K = function(n) {
        return n
    };
    t.L = function() {
        this.B != $yC() && (this.B = $yC(), this.M())
    };
    t.M = function() {};
    t.N = function() {
        this.C != $yB() && (this.C = $yB(), this.O())
    };
    t.O = function() {};
    t.P = function(n) {
        this.D = n
    };
    t.Q = function(n) {
        this.D == n && (this.D = null)
    };
    t.R = function() {};
    t.$bR = t.J;
    t.$cb = t.K;
    t.$cc = t.L;
    t.$cd = t.N;
    t.$ce = function() {
        this.F.apply(this, arguments)
    };
    t.$cf = function() {
        this.G.apply(this, arguments)
    };
    t.$cg = function() {
        this.H.apply(this, arguments)
    };
    t.$ch = function() {
        return this.I.apply(this, arguments)
    };
    t.$dj = function() {
        this.P.apply(this, arguments)
    };
    t.$di = function() {
        this.Q.apply(this, arguments)
    };
    t.$bQ = function() {
        this.R.apply(this, arguments)
    };
    t.$wt = t.E
});
$M = $CreateClass(function() {
    this.e = null;
    this.f = null
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 70
    };
    t.$II = function(n) {
        return [23, 16, 22].indexOf(n) != -1
    };
    t.g = function() {
        return this.f != null ? this.f.h() : 0
    };
    t.h = function(n) {
        return this.f.i(n)
    };
    t.l = function() {
        this.f = null
    };
    t.m = function(n) {
        this.f == null && (this.f = $as(43));
        this.f.p(n);
        this.e != null && (n.K(this.e), this.e.aw(n))
    };
    t.n = function(n) {
        this.o(this.f.i(n))
    };
    t.o = function(n) {
        if (this.f != null) {
            var t = this.f.s(n);
            return t && this.e != null && (n.M(this.e), this.e.ax(n)), t
        }
        return !1
    };
    t.$ew = function() {
        return this.f.l()
    };
    t.q = function() {
        return this.f.l()
    };
    t.r = function(n) {
        this.e = n
    };
    $wr = function(n) {
        var t = new $M;
        return t.r(n), t
    };
    t.$ao = t.l;
    t.$ap = t.m;
    t.$aq = t.o;
    t.$ar = t.n;
    t.$tD = t.g;
    t.$tC = t.h;
    t.$S = t.q
});
$L = $CreateClass(function(n) {
    this.$typeArgId1 = n;
    this.e = null;
    this.f = null
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 62
    };
    t.$II = function(n) {
        return [23, 16, 22].indexOf(n) != -1
    };
    t.i = function() {
        return this.e == null ? 0 : this.e.h()
    };
    t.j = function(n) {
        return this.e.i(n)
    };
    t.k = function() {
        var t, n;
        if (this.e != null)
            for (t = this.e, this.e = null, n = 0; n < t.h(); n++) $DownCast($CreateBox(t.i(n), this.$typeArgId1), 32818).$di(this.f)
    };
    t.l = function(n) {
        this.e == null && (this.e = $as(this.$typeArgId1));
        this.e.p(n);
        $DownCast($CreateBox(n, this.$typeArgId1), 32818).$dj(this.f)
    };
    t.m = function(n) {
        var t = $DownCast($CreateBox(this.e.i(n), this.$typeArgId1), 32818);
        this.e.u(n);
        t.$di(this.f)
    };
    t.p = function(n) {
        var t = this.e.r(n);
        return this.e.s(n), $DownCast($CreateBox(n, this.$typeArgId1), 32818).$di(this.f), !0
    };
    t.$ew = function() {
        return this.e == null && (this.e = $as(this.$typeArgId1)), this.e.l()
    };
    t.r = function() {
        return this.e == null && (this.e = $as(this.$typeArgId1)), this.e.l()
    };
    t.s = function(n) {
        this.f = n
    };
    $wq = function(n, t) {
        var i = new $L(t);
        return i.s(n), i
    };
    t.$ao = t.k;
    t.$ap = t.l;
    t.$aq = t.p;
    t.$ar = t.m;
    t.$tD = t.i;
    t.$tC = t.j;
    t.$S = t.r
});
$wm = $CreateClass(function() {
    $E.call(this);
    this.ah = 0;
    this.ai = 0;
    this.aj = 0;
    this.ak = 0;
    this.al = new $f8;
    this.an = new $f8;
    this.ao = new $f8;
    this.ap = !1
}, function(n) {
    var t = n.prototype = new $E;
    t.GetType = function() {
        return 59
    };
    t.aq = function(n) {
        if (n !== undefined) this.ah = n;
        else return this.ah
    };
    t.at = function(n) {
        if (n !== undefined) this.ap = n;
        else return this.ap
    };
    t.au = function(n) {
        if (n !== undefined) this.ai = n;
        else return this.at() ? $yH() : this.ai
    };
    t.av = function(n) {
        n !== undefined && (this.aj = n)
    };
    t.aw = function(n) {
        n !== undefined && (this.ak = n)
    };
    t.ax = function() {
        return this.D().aC()
    };
    t.az = function() {
        return this.al = $mB(this.aq(), this.au(), this.aj, this.ak), this.al
    };
    t.aB = function() {
        return this.an = $lu(this.ax(), this.az()), this.an
    };
    t.aC = function() {
        return this.ao = $l7(this.aB()), this.ao
    };
    t.aG = function(n, t) {
        var r = new $f,
            i = new $f,
            u, f, e, o;
        return r.i(n), i.i(t), u = $C(r.e / i.e * 2 - 1, r.f / i.f * -2 + 1), f = this.ai, this.ai = i.e / i.f, e = this.at(), this.at(!1), o = this.aH(u), this.at(e), this.ai = f, o
    };
    t.aH = function(n) {
        var t = new $f8,
            i = new $hY,
            r = new $hY;
        return t.v(this.aC()), i.i($hA($hV(n, -1), t)), r.i($hA($hV(n, 1), t)), $Bs(i, $jT($hR(r, i)))
    };
    t.aK = function() {
        $E.prototype.ag.call(this);
        this.aq(.7853982);
        this.au(1.77777779);
        this.av(1);
        this.aw(1e3);
        this.at(!0)
    };
    $wk = function() {
        var n = new $wm;
        return n.aK(), n
    }
});
$wg = $CreateClass(function() {}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 71
    };
    t.e = function() {
        return !0
    };
    t.f = function() {
        return !1
    }
});
$wh = $CreateClass(function() {
    $wg.call(this);
    this.h = new $hY;
    this.i = new $hY;
    this.j = 0;
    this.m = null;
    this.n = null;
    this.o = null
}, function(n) {
    var t = n.prototype = new $wg;
    t.GetType = function() {
        return 96
    };
    t.q = function() {
        return this.h
    };
    t.r = function() {
        return this.i
    };
    t.s = function() {
        return this.j
    };
    t.v = function() {
        return this.m
    };
    t.w = function() {
        return this.n
    };
    t.x = function() {
        return this.o
    }
});
$D = $CreateClass(function() {
    $O.call(this);
    this.B = null;
    this.C = null;
    this.D = 0;
    this.E = 0
}, function(n) {
    var t = n.prototype = new $O;
    t.GetType = function() {
        return 54
    };
    t.$II = function(n) {
        return [50].indexOf(n) != -1
    };
    t.F = function() {
        return this.B
    };
    t.j = function() {
        return $AsOp(this.F(), 97)
    };
    t.G = function() {
        return this.C
    };
    t.H = function(n) {
        this.B = n
    };
    t.I = function(n) {
        this.B = n
    };
    t.l = function() {
        var n, t;
        for ($O.prototype.l.call(this), n = 0; n < this.G().i(); n++) t = $AsOp(this.G().j(n), 97), t != null && t.l()
    };
    t.J = function(n) {
        return this.F() != null ? this.F().$bR(n) : n
    };
    t.K = function(n) {
        return this.F() != null ? this.F().$cb(n) : n
    };
    t.L = function() {
        this.D != $yC() && (this.D = $yC(), this.N())
    };
    t.M = function() {
        this.E != $yB() && (this.E = $yB(), this.O())
    };
    t.N = function() {
        for (var n = 0; n < this.G().i(); n++) this.G().j(n).$cc()
    };
    t.O = function() {
        for (var n = 0; n < this.G().i(); n++) this.G().j(n).$cd()
    };
    t.P = function() {
        this.Q()
    };
    t.Q = function() {
        for (var n = 0; n < this.G().i(); n++) this.G().j(n).$cf()
    };
    t.R = function() {
        this.S()
    };
    t.S = function() {
        for (var n = 0; n < this.G().i(); n++) this.G().j(n).$ce()
    };
    t.T = function(n) {
        this.U(n)
    };
    t.U = function(n) {
        for (var t = this.G().i(); t-- > 0;) this.G().j(t).$cg(n)
    };
    t.V = function(n) {
        var e = $AsOp(n, 166),
            t, i, r, u, f;
        if (e != null) {
            this.Z(e);
            return
        }
        if (t = $AsOp(n, 132), t != null) {
            this.Y(t);
            return
        }
        if (i = $AsOp(n, 134), i != null) {
            this.aa(i);
            return
        }
        if (r = $AsOp(n, 131), r != null) {
            this.ab(r);
            return
        }
        if (u = $AsOp(n, 133), u != null) {
            this.ac(u);
            return
        }
        if (f = $AsOp(n, 165), f != null) {
            this.ad(f);
            return
        }
        this.X(n)
    };
    t.W = function(n) {
        this.F() == null || n.h() || this.F().$bQ(n)
    };
    t.X = function(n) {
        this.W(n)
    };
    t.Y = function(n) {
        this.W(n)
    };
    t.Z = function(n) {
        this.W(n)
    };
    t.aa = function(n) {
        this.W(n)
    };
    t.ab = function(n) {
        this.W(n)
    };
    t.ac = function(n) {
        this.W(n)
    };
    t.ad = function(n) {
        this.W(n)
    };
    t.ae = function(n) {
        if ($aw(n, null) && n.Invoke(this)) return !0;
        for (var t = 0; t < this.C.i(); t++)
            if (this.C.j(t).$ch(n)) return !0;
        return !1
    };
    t.ah = function() {
        $O.prototype.y.call(this);
        this.C = $wq(this, 32818)
    };
    t.$bR = function() {
        return this.J.apply(this, arguments)
    };
    t.$cb = function() {
        return this.K.apply(this, arguments)
    };
    t.$cc = t.L;
    t.$cd = t.M;
    t.$ce = t.R;
    t.$cf = t.P;
    t.$cg = t.T;
    t.$ch = function() {
        return this.ae.apply(this, arguments)
    };
    t.$dj = function() {
        this.H.apply(this, arguments)
    };
    t.$di = function() {
        this.I.apply(this, arguments)
    };
    t.$bQ = t.V;
    t.$wt = t.F
});
$I = $CreateClass(function() {
    $D.call(this);
    this.ai = null;
    this.aj = null;
    this.ak = null;
    this.al = null;
    this.am = null
}, function(n) {
    var t = n.prototype = new $D;
    t.GetType = function() {
        return 27
    };
    t.an = function() {
        return $AsOp(this.F(), 27)
    };
    t.ao = function() {
        return this.ai
    };
    t.ap = function(n) {
        if (n !== undefined) this.al = n;
        else return this.al
    };
    t.aq = function(n) {
        if (n !== undefined) this.aj = n;
        else return this.aj
    };
    t.ar = function(n) {
        if (n !== undefined) this.am = n;
        else return this.am
    };
    t.l = function() {
        $D.prototype.l.call(this);
        for (var n = 0; n < this.ao().g(); n++) this.ao().h(n).l()
    };
    t.N = function() {
        for (var n = 0; n < this.ao().g(); n++) this.ao().h(n).G();
        $D.prototype.N.call(this)
    };
    t.O = function() {
        for (var n = 0; n < this.ao().g(); n++) this.ao().h(n).I();
        $D.prototype.O.call(this)
    };
    t.au = function() {
        var n;
        return this.aq() != null ? this.aq() : this.F() != null ? this.an().au() : (n = this.ak, n != null ? n : this.ak = $il())
    };
    t.av = function() {
        var t, n;
        for (this.aq(null), this.ap(null), this.ar(null), t = 0; t < this.ao().g(); t++) n = this.ao().h(t), $IsOp(n, 59) && this.ap($AsOp(n, 59)), $IsOp(n, 26) && this.aq($AsOp(n, 26)), $IsOp(n, 92) && this.ar($AsOp(n, 92))
    };
    t.aw = function(n) {
        this.av();
        this.ay(n)
    };
    t.ax = function(n) {
        this.av();
        this.az(n)
    };
    t.ay = function() {};
    t.az = function() {};
    t.Q = function() {
        for (var n = 0; n < this.ao().g(); n++) this.ao().h(n).S();
        $D.prototype.Q.call(this)
    };
    t.S = function() {
        $D.prototype.S.call(this);
        for (var n = 0; n < this.ai.g(); n++) this.ai.h(n).O()
    };
    t.U = function(n) {
        for (var t = 0; t < this.ai.g(); t++) this.ai.h(t).Q(n);
        $D.prototype.U.call(this, n)
    };
    t.Y = function(n) {
        for (var t = this.ai.g(); t-- > 0;)
            if (this.ai.h(t).U(n), n.h()) return
    };
    t.Z = function(n) {
        for (var t = this.ai.g(); t-- > 0;)
            if (this.ai.h(t).W(n), n.h()) return
    };
    t.aa = function(n) {
        for (var t = this.ai.g(); t-- > 0;)
            if (this.ai.h(t).Y(n), n.h()) return
    };
    t.ab = function(n) {
        for (var t = this.ai.g(); t-- > 0;)
            if (this.ai.h(t).aa(n), n.h()) return
    };
    t.ac = function(n) {
        for (var t = this.ai.g(); t-- > 0;)
            if (this.ai.h(t).ac(n), n.h()) return
    };
    t.ad = function(n) {
        for (var t = this.ai.g(); t-- > 0;)
            if (this.ai.h(t).ae(n), n.h()) return
    };
    t.aB = function(n) {
        if ($D.prototype.ah.call(this), this.ai = $wr(this), n != null)
            for (var t = 0; t < n.length; t++) this.ao().m(n[t]);
        this.av()
    };
    $xo = function(n) {
        var t = new $I;
        return t.aB(n), t
    }
});
$yd = $CreateClass(function() {
    this.e = null;
    this.f = !1;
    this.g = new $zB;
    this.h = !1;
    this.i = null;
    this.j = null
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 46
    };
    t.l = function() {
        return this.e.g()
    };
    t.m = function() {
        return this.f && (this.g = $w2(this.l()), this.f = !1), this.g
    };
    t.n = function() {
        this.h && this.q();
        var n = this.i;
        return n != null ? n : this.j.h()
    };
    t.q = function() {
        this.h && (this.l() != null && this.l().k() != null && this.l().k().g() == 4 ? (this.j = $xf(), this.j.k(this.l()), this.j.o(), this.i = null) : (this.j = null, this.i = Array.Init([$wF(this.l())], 17)), this.h = !1)
    }
});
$ab = $CreateClass(function() {}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 127
    };
    t.e = function() {}
});
$aH = $CreateClass(function() {
    $ab.call(this)
}, function(n) {
    var t = n.prototype = new $ab;
    t.GetType = function() {
        return 180
    };
    t.f = function() {
        $ab.prototype.e.call(this)
    };
    $de = function() {
        var n = new $aH;
        return n.f(), n
    }
});
$CreateClass(function() {}, function() {
    $da = null;
    $d_ = null;
    $yO = null;
    $c8 = null;
    $c7 = null;
    $bx = null;
    $dc = null;
    $dl = 0;
    $yN = 0;
    $yM = 0;
    $yL = function() {
        return $yO == null && ($yO = $xo(Array.Init([$il(), $wk()], 43)), $yO.aq().av($hW(100, 100, 100)), $yO.aq().aU($hW(0, 0, 0), $hW(0, 0, 1))), $yO
    };
    $yJ = function() {
        return $d_.h() == 0 ? $yL() : $d_.j()
    };
    $yI = function() {
        return $c7
    };
    $dm = function() {
        return $bx == null && ($bx = $de()), $bx
    };
    $yH = function() {
        var n = new $i;
        return $dc.h() > 0 ? $dc.j().f : (n.i($yG().l()), n).h()
    };
    $yG = function() {
        return $K().n().j()
    };
    $yF = function() {
        return $K().n().k()
    };
    $yC = function() {
        return $yN
    };
    $yB = function() {
        return $yM
    };
    $yA = function(n) {
        $da.g(n)
    };
    $dB = function() {
        $da = $b5(32894);
        $d_ = $as(27);
        $c8 = $as(127);
        $c7 = $dm();
        $dc = $as(161);
        $dl = 1
    }
});
$xB = $CreateClass(function() {
    this.e = new $l;
    this.f = null;
    this.g = !1;
    this.h = 0;
    this.i = null
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 89
    };
    t.j = function(n) {
        n !== undefined && this.e.q(n)
    };
    t.k = function(n) {
        n !== undefined && (this.f = n)
    };
    t.l = function(n) {
        n !== undefined && (this.g = n)
    };
    t.m = function(n) {
        n !== undefined && (this.h = n)
    };
    t.n = function(n) {
        n !== undefined && (this.i = n)
    };
    t.o = function() {};
    $xA = function() {
        var n = new $xB;
        return n.o(), n
    }
});
$aB = $CreateClass(function() {
    this.e = null;
    this.f = null;
    this.g = new $f;
    this.h = null
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 99
    };
    t.i = function() {
        return this.g
    };
    t.j = function() {
        return this.h
    };
    t.k = function() {
        return this.e.h() > 0 ? this.e.j() : $yF()
    };
    t.l = function() {
        return this.f.h() > 0 ? this.f.j() : $yJ()
    };
    t.n = function(n, t) {
        var r, u, i;
        $aw(this.j(), null) && this.j().Invoke((i = $xA(), r = this.k(), i.j(this.k()), r, u = this.l(), i.k(this.l()), u, i.n(n), n, i.l(!0), i.m(t), t, i))
    }
});
$CreateClass(function() {}, function() {
    $dA = null;
    $dz = null;
    $dy = null;
    $dx = null;
    $dw = null;
    $dv = null;
    $du = null;
    $dt = null;
    $eg = function() {
        $dA = $as(32818);
        $dz = $as(32818);
        $dy = $as(132);
        $dx = $as(132);
        $dw = $as(134);
        $dv = $as(131);
        $du = $as(131);
        $dt = $as(133)
    }
});
$vQ = $CreateClass(function() {
    $E.call(this);
    this.ah = new $hY;
    this.ai = new $g;
    this.aj = new $hY;
    this.ak = new $hY;
    this.al = new $f8;
    this.am = !1;
    this.an = !1;
    this.ao = new $f8;
    this.ap = new $f8;
    this.aq = !1;
    this.ar = null;
    this.at = !1;
    this.au = new $f8
}, function(n) {
    var t = n.prototype = new $E;
    t.GetType = function() {
        return 26
    };
    t.av = function(n) {
        if (n !== undefined) $h4(this.ah, n) && (this.ah.i(n), this.am = !0, this.aN());
        else return this.ah
    };
    t.aw = function(n) {
        if (n !== undefined) this.ai.j(n), this.aj.i($mx(n)), this.aN();
        else return this.ai
    };
    t.ay = function() {
        return this.ak
    };
    t.az = function() {
        return this.am && (this.al = $lu($lu($mA(this.ay()), $lJ(this.aw())), $lG(this.av())), this.am = !1, this.aO()), this.al
    };
    t.aA = function() {
        return this.an && (this.ao = $lu($lu($lG($hQ(this.av())), $lJ($mM(this.aw()))), $mA($hW(1 / this.ay().e, 1 / this.ay().f, 1 / this.ay().g))), this.an = !1), this.ao
    };
    t.aB = function() {
        var n = this.aE();
        return n != null ? ((this.aq || this.ar != n) && (this.ap = $lu(this.az(), n.aB()), this.ar = n, this.aq = !1, this.aQ()), this.ap) : this.az()
    };
    t.aC = function() {
        var n = this.aE();
        return n != null ? ((this.at || this.ar != n) && (this.au = $lu(n.aC(), this.aA()), this.at = !1), this.au) : this.aA()
    };
    t.aE = function() {
        for (var n = this.C(); n != null;) {
            if (n = n.an(), n == null) break;
            if (n.aq() != null) return n.aq()
        }
        return null
    };
    t.aF = function() {
        return $hA(this.av(), this.aH())
    };
    t.aG = function(n) {
        var t;
        if (n !== undefined) t = this.aE(), t == null ? this.aw(n) : this.aw($lS(n, $mM(t.aG())));
        else return t = this.aE(), t == null ? this.aw() : $lS(this.aw(), t.aG())
    };
    t.aH = function() {
        var n = this.aE();
        return n != null ? n.aB() : $g3()
    };
    t.aN = function() {
        this.am = !0;
        this.aO()
    };
    t.aO = function() {
        this.aP();
        this.an = !0
    };
    t.aP = function() {
        this.aq = !0;
        this.aQ()
    };
    t.aQ = function() {
        this.at = !0;
        this.aR()
    };
    t.aR = function() {
        if (this.C() != null)
            for (var n = 0; n < this.C().G().i(); n++) $o0($AsOp(this.C().G().j(n), 27))
    };
    $o0 = function(n) {
        if (n != null)
            if (n.aq() != null) n.aq().aS();
            else
                for (var t = 0; t < n.G().i(); t++) $o0($AsOp(n.G().j(t), 27))
    };
    t.aS = function() {
        this.aP()
    };
    t.aU = function(n, t) {
        var r = new $f8;
        r.v($mD(this.aF(), n, t));
        var u = new $hY,
            f = new $hY,
            i = new $g;
        $lX(r, $CreateRef(function() {
            return f
        }, function(n) {
            f = n
        }, this), $CreateRef(function() {
            return i
        }, function(n) {
            i = n
        }, this), $CreateRef(function() {
            return u
        }, function(n) {
            u = n
        }, this));
        this.aG($mM(i))
    };
    t.aV = function() {
        $E.prototype.ag.call(this);
        this.am = !0;
        this.an = !0;
        this.aq = !0;
        this.at = !0;
        this.ah = $hW(0, 0, 0);
        this.ai = $a9(0, 0, 0, 1);
        this.ak = $hW(1, 1, 1)
    };
    $il = function() {
        var n = new $vQ;
        return n.aV(), n
    }
});
$ij = $CreateClass(function() {
    $v9.call(this);
    this.i = null
}, function(n) {
    var t = n.prototype = new $v9;
    t.GetType = function() {
        return 159
    };
    t.g = function(n) {
        var t, i, r, u = n * 3;
        return $Bh((t = this.i.l(u), $hW(t.e, t.f, t.g)), (i = this.i.l(u + 1), $hW(i.e, i.f, i.g)), (r = this.i.l(u + 2), $hW(r.e, r.f, r.g)))
    };
    t.j = function(n, t) {
        if ($v9.prototype.h.call(this, t / 3 | 0), n == null) throw $cy("positions can not be null");
        this.i = n
    };
    $ii = function(n, t) {
        var i = new $ij;
        return i.j(n, t), i
    }
});
$ih = $CreateClass(function() {
    $v9.call(this);
    this.i = null;
    this.j = null
}, function(n) {
    var t = n.prototype = new $v9;
    t.GetType = function() {
        return 144
    };
    t.g = function(n) {
        var t, i, r, u = n * 3;
        return $Bh((t = this.i.l(this.j.j(u)), $hW(t.e, t.f, t.g)), (i = this.i.l(this.j.j(u + 1)), $hW(i.e, i.f, i.g)), (r = this.i.l(this.j.j(u + 2)), $hW(r.e, r.f, r.g)))
    };
    t.k = function(n, t, i) {
        if ($v9.prototype.h.call(this, i / 3 | 0), n == null) throw $cy("positions can not be null");
        if (t == null) throw $cy("indices can not be null");
        this.i = n;
        this.j = t
    };
    $ig = function(n, t, i) {
        var r = new $ih;
        return r.k(n, t, i), r
    }
});
$aO = $CreateClass(function() {
    this.f = 0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 161
    }
});
$do = $CreateClass(function() {}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 243
    }
});
$c = $CreateClass(function() {}, function() {
    var n = String.prototype;
    n.GetType = function() {
        return 7
    };
    n.b = function() {
        for (var n = 5381, t = 0; t < this.length; t++) n = (n << 5) + n ^ this.charCodeAt(t);
        return n
    };
    n.d = function() {
        return this
    };
    n.c = function(n) {
        return $dp(this, $AsOp(n, 7))
    };
    $dp = function(n, t) {
        if ($aV(n, t)) return !0;
        if ($aV(n, null) || $aV(t, null) || n.length != t.length) return !1;
        for (var i = 0; i < n.length; i++)
            if (n.charCodeAt(i) != t.charCodeAt(i)) return !1;
        return !0
    };
    $bI = function(n, t) {
        var r, i;
        if ($aV(n, null) && $aV(t, null)) return "";
        if ($aV(n, null)) return t;
        if ($aV(t, null)) return n;
        for (r = Array.Zeros(n.length + t.length, 56), i = 0; i < n.length; i++) r[i] = n.charCodeAt(i);
        for (i = 0; i < t.length; i++) r[n.length + i] = t.charCodeAt(i);
        return $ds(r)
    };
    $dq = function(n, t) {
        return $bI(n == null ? null : n.d(), t == null ? null : t.d())
    };
    $dr = function(n, t) {
        for (var i = "", r = 0; r < t.length; r++) r > 0 && (i = $N(i, n)), i = $N(i, t[r]);
        return i
    };
    $N = function(n, t) {
        return $bI(n, t)
    };
    $in = function(n, t) {
        return $dp(n, t)
    };
    $bH = function(n, t) {
        return $dq(n, t)
    };
    $iG = function(n, t) {
        return !$dp(n, t)
    }
});
$G = $CreateClass(function() {}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 76
    };
    $bl = function(n, t) {
        if (n)
            for (var i = t; i; i = i.P)
                if (!i.P) {
                    i.P = n;
                    break
                }
        return t
    };
    $bO = function(n, t) {
        return $b4(n, t)
    };
    t.c = function(n) {
        return $IsOp(n, 76) && $bO(this, $AsOp(n, 76))
    };
    $aw = function(n, t) {
        return !$bO(n, t)
    }
});
$j = $CreateClass(function() {
    this.e = null;
    this.f = null;
    this.g = new $g;
    this.h = 0;
    this.i = 0;
    this.j = 0;
    this.k = 0;
    this.l = 0
}, function(n) {
    var t = n.prototype;
    $cp = null;
    t.GetType = function() {
        return 31
    };
    $K = function(n) {
        if (n !== undefined) $cp = n;
        else return $cp
    };
    t.m = function(n) {
        if (n !== undefined) this.e = n;
        else return this.e
    };
    t.n = function(n) {
        if (n !== undefined) this.f = n;
        else return this.f
    };
    t.o = function(n) {
        if (n !== undefined) this.g.j(n);
        else return this.g
    };
    t.p = function(n) {
        if (n !== undefined) this.h = n;
        else return this.h
    };
    t.q = function(n) {
        if (n !== undefined) this.i = n;
        else return this.i
    };
    t.r = function(n) {
        if (n !== undefined) this.j = n;
        else return this.j
    };
    t.s = function(n) {
        if (n !== undefined) this.k = n;
        else return this.k
    };
    t.t = function(n) {
        if (n !== undefined) this.l = n;
        else return this.l
    };
    t.u = function() {};
    t.v = function() {};
    t.w = function() {};
    t.x = function() {};
    t.y = function() {
        $K() == null && $K(this);
        this.m($cI());
        this.n($cM());
        this.o($a9(0, 0, 0, 1));
        this.p(1);
        this.t(.016666666666666666)
    }
});
$b = $CreateClass(function() {
    this.$struct = !0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 3
    }
});
$aa = $CreateClass(function() {
    this.$struct = !0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 56
    }
});
$ad = $CreateClass(function() {
    this.$struct = !0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 47
    }
});
$iz = $CreateClass(function() {
    this.$struct = !0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 93
    }
});
$iy = $CreateClass(function() {
    this.$struct = !0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 68
    }
});
$v = $CreateClass(function() {
    this.$struct = !0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 33
    }
});
$_ = $CreateClass(function() {
    this.$struct = !0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 2
    }
});
$iu = $CreateClass(function() {
    this.$struct = !0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 114
    }
});
$y = $CreateClass(function() {
    this.$struct = !0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 51
    }
});
$a = $CreateClass(function() {
    this.$struct = !0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 1
    }
});
$f = $CreateClass(function() {
    this.$struct = !0;
    this.e = 0;
    this.f = 0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 10
    };
    t.d = function() {
        return $N($N(this.e.d(), ", "), this.f.d())
    };
    t.i = function(n) {
        this.e = n.e;
        this.f = n.f
    };
    t.j = function(n) {
        this.e = this.f = n
    };
    $av = function(n) {
        var t = new $f;
        return t.j(n), t
    };
    t.k = function(n, t) {
        this.e = n;
        this.f = t
    };
    $C = function(n, t) {
        var i = new $f;
        return i.k(n, t), i
    };
    $dn = function(n) {
        var t = new $i;
        return t.i(n), $C(t.e, t.f)
    };
    $bo = function(n, t) {
        var i = new $f,
            r = new $f;
        return i.i(n), r.i(t), $C(i.e - r.e, i.f - r.f)
    };
    $6 = function(n, t) {
        var i = new $f,
            r = new $f;
        return i.i(n), r.i(t), $C(i.e * r.e, i.f * r.f)
    };
    $be = function(n, t) {
        var i = new $f,
            r = new $f;
        return i.i(n), r.i(t), $C(i.e + r.e, i.f + r.f)
    };
    $bp = function(n, t) {
        var i = new $f;
        return i.i(n), $C(i.e * t, i.f * t)
    };
    $bd = function(n, t) {
        var i = new $f,
            r = new $f;
        return i.i(n), r.i(t), $C(i.e / r.e, i.f / r.f)
    };
    $a5 = function(n, t) {
        var i = new $f;
        return i.i(n), $C(i.e / t, i.f / t)
    };
    $bV = function(n, t) {
        var i = new $f;
        return i.i(n), $C(i.e - t, i.f - t)
    };
    $c9 = function(n, t) {
        var i = new $f;
        return i.i(t), $C(n + i.e, n + i.f)
    };
    $dk = function(n, t) {
        var i = new $f;
        return i.i(t), $C(n / i.e, n / i.f)
    }
});
$hY = $CreateClass(function() {
    this.$struct = !0;
    this.e = 0;
    this.f = 0;
    this.g = 0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 8
    };
    t.d = function() {
        return $N($N($N($N(this.e.d(), ", "), this.f.d()), ", "), this.g.d())
    };
    t.i = function(n) {
        this.e = n.e;
        this.f = n.f;
        this.g = n.g
    };
    t.k = function(n, t, i) {
        this.e = n;
        this.f = t;
        this.g = i
    };
    $hW = function(n, t, i) {
        var r = new $hY;
        return r.k(n, t, i), r
    };
    t.l = function(n, t) {
        var i = new $f;
        i.i(n);
        this.e = i.e;
        this.f = i.f;
        this.g = t
    };
    $hV = function(n, t) {
        var i = new $hY;
        return i.l(n, t), i
    };
    $hT = function(n, t) {
        var i = new $hY,
            r = new $hY;
        return i.i(n), r.i(t), $hW(i.e + r.e, i.f + r.f, i.g + r.g)
    };
    $hS = function(n, t) {
        var i = new $hY;
        return i.i(n), $hW(i.e * t, i.f * t, i.g * t)
    };
    $hR = function(n, t) {
        var i = new $hY,
            r = new $hY;
        return i.i(n), r.i(t), $hW(i.e - r.e, i.f - r.f, i.g - r.g)
    };
    $hQ = function(n) {
        return $hS(n, -1)
    };
    $hP = function(n, t) {
        var i = new $hY;
        return i.i(n), $hW(i.e / t, i.f / t, i.g / t)
    };
    $h4 = function(n, t) {
        return !$bK(n, t, 8)
    }
});
$g = $CreateClass(function() {
    this.$struct = !0;
    this.e = 0;
    this.f = 0;
    this.g = 0;
    this.h = 0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 6
    };
    $jy = function() {
        return $a9(0, 0, 0, 1)
    };
    t.d = function() {
        return $N($N($N($N($N($N(this.e.d(), ", "), this.f.d()), ", "), this.g.d()), ", "), this.h.d())
    };
    t.j = function(n) {
        this.e = n.e;
        this.f = n.f;
        this.g = n.g;
        this.h = n.h
    };
    t.k = function(n) {
        this.e = this.f = this.g = this.h = n
    };
    $jF = function(n) {
        var t = new $g;
        return t.k(n), t
    };
    t.l = function(n, t, i, r) {
        this.e = n;
        this.f = t;
        this.g = i;
        this.h = r
    };
    $a9 = function(n, t, i, r) {
        var u = new $g;
        return u.l(n, t, i, r), u
    };
    t.m = function(n, t, i) {
        var r = new $f;
        r.i(n);
        this.e = r.e;
        this.f = r.f;
        this.g = t;
        this.h = i
    };
    $dh = function(n, t, i) {
        var r = new $g;
        return r.m(n, t, i), r
    };
    t.p = function(n, t) {
        var i = new $f,
            r = new $f;
        i.i(n);
        r.i(t);
        this.e = i.e;
        this.f = i.f;
        this.g = r.e;
        this.h = r.f
    };
    $bi = function(n, t) {
        var i = new $g;
        return i.p(n, t), i
    };
    t.q = function(n, t) {
        var i = new $hY;
        i.i(n);
        this.e = i.e;
        this.f = i.f;
        this.g = i.g;
        this.h = t
    };
    $jr = function(n, t) {
        var i = new $g;
        return i.q(n, t), i
    };
    $jp = function(n, t) {
        var i = new $g;
        return i.j(n), $a9(i.e * t, i.f * t, i.g * t, i.h * t)
    };
    $jw = function(n, t) {
        var i = new $g,
            r = new $g;
        return i.j(n), r.j(t), $a9(i.e * r.e, i.f * r.f, i.g * r.g, i.h * r.h)
    }
});
$bk = $CreateClass(function() {
    $U.call(this)
}, function(n) {
    var t = n.prototype = new $U;
    t.GetType = function() {
        return 226
    };
    t.i = function(n, t) {
        $U.prototype.g.call(this, $N($N(t, ": "), n))
    }
});
$aF = $CreateClass(function() {
    $bk.call(this)
}, function(n) {
    var t = n.prototype = new $bk;
    t.GetType = function() {
        return 197
    };
    t.j = function(n) {
        $bk.prototype.i.call(this, "value was null", n)
    };
    $dD = function(n) {
        var t = new $aF;
        return t.j(n), t
    }
});
$n = $CreateClass(function() {
    this.e = 0;
    this.f = 0;
    this.g = !1;
    this.h = null
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 20
    };
    t.j = function() {
        return this.f
    };
    t.k = function() {
        return this.h
    };
    t.l = function() {
        if (this.g) throw $bf("Buffer is read only");
        return this.h
    };
    t.m = function(n, t) {
        if (t !== undefined) this.v(n, t);
        else return this.u(n)
    };
    t.o = function(n) {
        return this.k()[this.e + n].ByteToSByte()
    };
    t.s = function(n) {
        return $j6(this.o(n), this.o(n + 1), this.o(n + 2), this.o(n + 3))
    };
    t.u = function(n) {
        return this.k()[this.e + n]
    };
    t.v = function(n, t) {
        this.l()[this.e + n] = t
    };
    t.y = function(n) {
        return $f3(this.u(n), this.u(n + 1), this.u(n + 2), this.u(n + 3))
    };
    t.z = function(n, t) {
        var i = new $f4;
        i.j(t);
        this.v(n, i.e);
        this.v(n + 1, i.f);
        this.v(n + 2, i.g);
        this.v(n + 3, i.h)
    };
    t.A = function(n, t) {
        return $rN(this.k(), this.e + n, t)
    };
    t.C = function(n, t) {
        return $ol(this.A(n, t), this.A(n + 2, t))
    };
    t.E = function(n, t) {
        return $o9(this.A(n, t), this.A(n + 2, t), this.A(n + 4, t), this.A(n + 6, t))
    };
    t.G = function(n, t) {
        return $rX(this.k(), this.e + n, t)
    };
    t.H = function(n, t, i) {
        $dP(this.l(), this.e + n, t, i)
    };
    t.I = function(n, t) {
        return $gJ(this.G(n, t), this.G(n + 2, t))
    };
    t.K = function(n, t) {
        return $fR(this.G(n, t), this.G(n + 2, t), this.G(n + 4, t), this.G(n + 6, t))
    };
    t.U = function(n, t) {
        return $rU(this.k(), this.e + n, t)
    };
    t.V = function(n, t, i) {
        $rT(this.l(), this.e + n, t, i)
    };
    t.aa = function(n, t) {
        return $rY(this.k(), this.e + n, t)
    };
    t.ab = function(n, t, i) {
        $dO(this.l(), this.e + n, t, i)
    };
    t.ac = function(n, t) {
        return $C(this.aa(n, t), this.aa(n + 4, t))
    };
    t.ad = function(n, t, i) {
        var r = new $f;
        r.i(t);
        this.ab(n, r.e, i);
        this.ab(n + 4, r.f, i)
    };
    t.ae = function(n, t) {
        return $hW(this.aa(n, t), this.aa(n + 4, t), this.aa(n + 8, t))
    };
    t.af = function(n, t, i) {
        var r = new $hY;
        r.i(t);
        this.ab(n, r.e, i);
        this.ab(n + 4, r.f, i);
        this.ab(n + 8, r.g, i)
    };
    t.ag = function(n, t) {
        return $a9(this.aa(n, t), this.aa(n + 4, t), this.aa(n + 8, t), this.aa(n + 12, t))
    };
    t.ah = function(n, t, i) {
        var r = new $g;
        r.j(t);
        this.ab(n, r.e, i);
        this.ab(n + 4, r.f, i);
        this.ab(n + 8, r.g, i);
        this.ab(n + 12, r.h, i)
    };
    t.ao = function(n, t, i, r) {
        this.h = n;
        this.e = t;
        this.f = i;
        this.g = r
    };
    t.aq = function(n) {
        this.ao(Array.Zeros(n, 47), 0, n, !1)
    };
    $a7 = function(n) {
        var t = new $n;
        return t.aq(n), t
    }
});
$f4 = $CreateClass(function() {
    this.$struct = !0;
    this.e = 0;
    this.f = 0;
    this.g = 0;
    this.h = 0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 55
    };
    t.d = function() {
        return $N($N($N($N($N($N(this.e.d(), ", "), this.f.d()), ", "), this.g.d()), ", "), this.h.d())
    };
    t.j = function(n) {
        this.e = n.e;
        this.f = n.f;
        this.g = n.g;
        this.h = n.h
    };
    t.k = function(n, t, i, r) {
        this.e = n;
        this.f = t;
        this.g = i;
        this.h = r
    };
    $f3 = function(n, t, i, r) {
        var u = new $f4;
        return u.k(n, t, i, r), u
    }
});
$d5 = $CreateClass(function() {
    $U.call(this)
}, function(n) {
    var t = n.prototype = new $U;
    t.GetType = function() {
        return 247
    };
    t.i = function() {
        $U.prototype.g.call(this, "Object reference was null")
    };
    $fi = function() {
        var n = new $d5;
        return n.i(), n
    }
});
$az = $CreateClass(function() {
    $U.call(this)
}, function(n) {
    var t = n.prototype = new $U;
    t.GetType = function() {
        return 188
    };
    t.i = function() {
        $U.prototype.g.call(this, "Index out of range")
    };
    $d6 = function() {
        var n = new $az;
        return n.i(), n
    }
});
$d7 = $CreateClass(function() {
    $U.call(this)
}, function(n) {
    var t = n.prototype = new $U;
    t.GetType = function() {
        return 248
    };
    t.i = function() {
        $U.prototype.g.call(this, "Invalid cast")
    };
    $fo = function() {
        var n = new $d7;
        return n.i(), n
    }
});
$aJ = $CreateClass(function() {
    $U.call(this)
}, function(n) {
    var t = n.prototype = new $U;
    t.GetType = function() {
        return 189
    };
    t.i = function(n) {
        $U.prototype.g.call(this, n)
    };
    $d8 = function(n) {
        var t = new $aJ;
        return t.i(n), t
    }
});
$eY = $CreateClass(function() {
    this.$struct = !0;
    this.e = 0;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.i = 0;
    this.j = 0;
    this.k = 0;
    this.l = 0;
    this.m = 0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 32
    };
    t.o = function(n) {
        this.e = n.e;
        this.f = n.f;
        this.g = n.g;
        this.h = n.h;
        this.i = n.i;
        this.j = n.j;
        this.k = n.k;
        this.l = n.l;
        this.m = n.m
    };
    t.p = function(n, t, i, r, u, f, e, o, s) {
        this.e = n;
        this.f = t;
        this.g = i;
        this.h = r;
        this.i = u;
        this.j = f;
        this.k = e;
        this.l = o;
        this.m = s
    };
    $eZ = function(n, t, i, r, u, f, e, o, s) {
        var h = new $eY;
        return h.p(n, t, i, r, u, f, e, o, s), h
    }
});
$f8 = $CreateClass(function() {
    this.$struct = !0;
    this.e = 0;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.i = 0;
    this.j = 0;
    this.k = 0;
    this.l = 0;
    this.m = 0;
    this.n = 0;
    this.o = 0;
    this.p = 0;
    this.q = 0;
    this.r = 0;
    this.s = 0;
    this.t = 0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 5
    };
    $g3 = function() {
        return $g2(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
    };
    t.v = function(n) {
        this.e = n.e;
        this.f = n.f;
        this.g = n.g;
        this.h = n.h;
        this.i = n.i;
        this.j = n.j;
        this.k = n.k;
        this.l = n.l;
        this.m = n.m;
        this.n = n.n;
        this.o = n.o;
        this.p = n.p;
        this.q = n.q;
        this.r = n.r;
        this.s = n.s;
        this.t = n.t
    };
    t.w = function(n, t, i, r, u, f, e, o, s, h, c, l, a, v, y, p) {
        this.e = n;
        this.f = t;
        this.g = i;
        this.h = r;
        this.i = u;
        this.j = f;
        this.k = e;
        this.l = o;
        this.m = s;
        this.n = h;
        this.o = c;
        this.p = l;
        this.q = a;
        this.r = v;
        this.s = y;
        this.t = p
    };
    $g2 = function(n, t, i, r, u, f, e, o, s, h, c, l, a, v, y, p) {
        var w = new $f8;
        return w.w(n, t, i, r, u, f, e, o, s, h, c, l, a, v, y, p), w
    };
    t.x = function(n, t, i, r) {
        var u = new $g,
            f = new $g,
            e = new $g,
            o = new $g;
        u.j(n);
        f.j(t);
        e.j(i);
        o.j(r);
        this.e = u.e;
        this.f = u.f;
        this.g = u.g;
        this.h = u.h;
        this.i = f.e;
        this.j = f.f;
        this.k = f.g;
        this.l = f.h;
        this.m = e.e;
        this.n = e.f;
        this.o = e.g;
        this.p = e.h;
        this.q = o.e;
        this.r = o.f;
        this.s = o.g;
        this.t = o.h
    };
    $g1 = function(n, t, i, r) {
        var u = new $f8;
        return u.x(n, t, i, r), u
    }
});
$CreateClass(function() {}, function() {
    $bK = function(n, t, i) {
        return $dN(n, t, i)
    }
});
$i = $CreateClass(function() {
    this.$struct = !0;
    this.e = 0;
    this.f = 0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 15
    };
    t.h = function() {
        return this.e / this.f
    };
    t.d = function() {
        return $N($N(this.e.d(), ", "), this.f.d())
    };
    t.i = function(n) {
        this.e = n.e;
        this.f = n.f
    };
    t.k = function(n, t) {
        this.e = n;
        this.f = t
    };
    $ax = function(n, t) {
        var i = new $i;
        return i.k(n, t), i
    };
    $ea = function(n, t) {
        var i = new $i,
            r = new $i;
        return i.i(n), r.i(t), $ax(i.e + r.e, i.f + r.f)
    };
    $aT = function(n, t) {
        var i = new $i;
        return i.i(n), $ax(i.e / t | 0, i.f / t | 0)
    }
});
$ay = $CreateClass(function() {
    $U.call(this)
}, function(n) {
    var t = n.prototype = new $U;
    t.GetType = function() {
        return 154
    };
    t.j = function(n) {
        $U.prototype.g.call(this, n)
    };
    $bf = function(n) {
        var t = new $ay;
        return t.j(n), t
    }
});
$CreateClass(function() {}, function() {
    $nR = function(n) {
        return n * 57.2957764
    };
    $aD = function(n) {
        return Math.sin(n)
    };
    $bc = function(n) {
        return Math.cos(n)
    };
    $nC = function(n) {
        return Math.tan(n)
    };
    $nW = function(n) {
        return Math.asin(n)
    };
    $n1 = function(n, t) {
        return Math.atan2(n, t)
    };
    $bL = function(n) {
        return Math.sqrt(n)
    };
    $bb = function(n) {
        return n >= 0 ? n : -n
    };
    $bE = function(n) {
        return n >= 0 ? n : -n
    };
    $c6 = function(n, t) {
        return n > t ? n : t
    };
    $aW = function(n, t) {
        return n > t ? n : t
    };
    $mS = function(n, t) {
        return n < t ? n : t
    };
    $kX = function(n, t) {
        return n < t ? n : t
    };
    $cJ = function(n) {
        return n == (n & -n)
    }
});
$CreateClass(function() {}, function() {
    $mD = function(n, t, i) {
        var r = $hR(n, t),
            u = $jx(i, r),
            f = $jx(r, u);
        return $mC(n, u, f, r)
    };
    $mC = function(n, t, i, r) {
        var f = new $hY,
            e = new $hY,
            o = new $hY,
            u;
        return f.i(t), e.i(i), o.i(r), o.i($jT(o)), f.i($jT(f)), e.i($jT(e)), u = $g3(), u.e = f.e, u.i = f.f, u.m = f.g, u.f = e.e, u.j = e.f, u.n = e.g, u.g = o.e, u.k = o.f, u.o = o.g, u.q = -$js(f, n), u.r = -$js(e, n), u.s = -$js(o, n), u
    };
    $mB = function(n, t, i, r) {
        var e = .5 / $nC(n * .5),
            s = e / t,
            h = i / s,
            c = i / e,
            o = r - i,
            f = 2 * i,
            u = new $f8;
        return u.e = f / h, u.j = f / c, u.o = (-r - i) / o, u.s = -f * r / o, u.p = -1, u
    };
    $mA = function(n) {
        var i = new $hY,
            t;
        return i.i(n), t = $g3(), t.e = i.e, t.j = i.f, t.o = i.g, t
    };
    $lJ = function(n) {
        var t = new $g;
        t.j(n);
        var r = t.e * t.e,
            u = t.f * t.f,
            f = t.g * t.g,
            e = t.e * t.f,
            o = t.g * t.h,
            s = t.g * t.e,
            h = t.f * t.h,
            c = t.f * t.g,
            l = t.e * t.h,
            i = $g3();
        return i.e = 1 - 2 * (u + f), i.f = 2 * (e + o), i.g = 2 * (s - h), i.i = 2 * (e - o), i.j = 1 - 2 * (f + r), i.k = 2 * (c + l), i.m = 2 * (s + h), i.n = 2 * (c - l), i.o = 1 - 2 * (u + r), i
    };
    $lH = function(n) {
        var t = new $f8;
        return t.v(n), $g1($a9(t.e, t.i, t.m, t.q), $a9(t.f, t.j, t.n, t.r), $a9(t.g, t.k, t.o, t.s), $a9(t.h, t.l, t.p, t.t))
    };
    $lG = function(n) {
        var i = new $hY,
            t;
        return i.i(n), t = $g3(), t.q = i.e, t.r = i.f, t.s = i.g, t
    };
    $lu = function(n, t) {
        var i = new $f8,
            r = new $f8,
            u;
        return i.v(n), r.v(t), u = new $f8, u.e = i.e * r.e + i.f * r.i + i.g * r.m + i.h * r.q, u.f = i.e * r.f + i.f * r.j + i.g * r.n + i.h * r.r, u.g = i.e * r.g + i.f * r.k + i.g * r.o + i.h * r.s, u.h = i.e * r.h + i.f * r.l + i.g * r.p + i.h * r.t, u.i = i.i * r.e + i.j * r.i + i.k * r.m + i.l * r.q, u.j = i.i * r.f + i.j * r.j + i.k * r.n + i.l * r.r, u.k = i.i * r.g + i.j * r.k + i.k * r.o + i.l * r.s, u.l = i.i * r.h + i.j * r.l + i.k * r.p + i.l * r.t, u.m = i.m * r.e + i.n * r.i + i.o * r.m + i.p * r.q, u.n = i.m * r.f + i.n * r.j + i.o * r.n + i.p * r.r, u.o = i.m * r.g + i.n * r.k + i.o * r.o + i.p * r.s, u.p = i.m * r.h + i.n * r.l + i.o * r.p + i.p * r.t, u.q = i.q * r.e + i.r * r.i + i.s * r.m + i.t * r.q, u.r = i.q * r.f + i.r * r.j + i.s * r.n + i.t * r.r, u.s = i.q * r.g + i.r * r.k + i.s * r.o + i.t * r.s, u.t = i.q * r.h + i.r * r.l + i.s * r.p + i.t * r.t, u
    };
    $lO = function(n, t) {
        var i = new $f8;
        i.v(n);
        var u = i.m * i.r - i.n * i.q,
            f = i.m * i.s - i.o * i.q,
            e = i.p * i.q - i.m * i.t,
            o = i.n * i.s - i.o * i.r,
            s = i.p * i.r - i.n * i.t,
            h = i.o * i.t - i.p * i.s,
            w = i.j * h + i.k * s + i.l * o,
            b = i.i * h + i.k * e + i.l * f,
            k = i.i * -s + i.j * e + i.l * u,
            d = i.i * o + i.j * -f + i.k * u,
            r = i.e * w - i.f * b + i.g * k - i.h * d;
        if ($bb(r) <= 1e-5) return t($g3()), !1;
        r = 1 / r;
        var c = i.e * i.j - i.f * i.i,
            l = i.e * i.k - i.g * i.i,
            a = i.h * i.i - i.e * i.l,
            v = i.f * i.k - i.g * i.j,
            y = i.h * i.j - i.f * i.l,
            p = i.g * i.l - i.h * i.k,
            g = i.f * h + i.g * s + i.h * o,
            nt = i.e * h + i.g * e + i.h * f,
            tt = i.e * -s + i.f * e + i.h * u,
            it = i.e * o + i.f * -f + i.g * u,
            rt = i.r * p + i.s * y + i.t * v,
            ut = i.q * p + i.s * a + i.t * l,
            ft = i.q * -y + i.r * a + i.t * c,
            et = i.q * v + i.r * -l + i.s * c,
            ot = i.n * p + i.o * y + i.p * v,
            st = i.m * p + i.o * a + i.p * l,
            ht = i.m * -y + i.n * a + i.p * c,
            ct = i.m * v + i.n * -l + i.o * c;
        return t().e = w * r, t().f = -g * r, t().g = rt * r, t().h = -ot * r, t().i = -b * r, t().j = nt * r, t().k = -ut * r, t().l = st * r, t().m = k * r, t().n = -tt * r, t().o = ft * r, t().p = -ht * r, t().q = -d * r, t().r = it * r, t().s = -et * r, t().t = ct * r, !0
    };
    $l7 = function(n) {
        var t = new $f8;
        return $lO(n, $CreateRef(function() {
            return t
        }, function(n) {
            t = n
        }, this)), t
    };
    $lX = function(n, t, i, r) {
        var u = new $f8,
            f;
        return (u.v(n), r().e = u.q, r().f = u.r, r().g = u.s, t().e = $bL(u.e * u.e + u.f * u.f + u.g * u.g), t().f = $bL(u.i * u.i + u.j * u.j + u.k * u.k), t().g = $bL(u.m * u.m + u.n * u.n + u.o * u.o), $bb(t().e) < 1e-5 || $bb(t().f) < 1e-5 || $bb(t().g) < 1e-5) ? (i($jy()), !1) : (f = $eZ(u.e / t().e, u.f / t().e, u.g / t().e, u.i / t().f, u.j / t().f, u.k / t().f, u.m / t().g, u.n / t().g, u.o / t().g), $mF(f, i), !0)
    }
});
$lR = $CreateClass(function() {
    $U.call(this)
}, function(n) {
    var t = n.prototype = new $U;
    t.GetType = function() {
        return 150
    };
    t.i = function() {
        $U.prototype.g.call(this, "Method not supported")
    };
    $lQ = function() {
        var n = new $lR;
        return n.i(), n
    }
});
$aN = $CreateClass(function() {
    $U.call(this)
}, function(n) {
    var t = n.prototype = new $U;
    t.GetType = function() {
        return 172
    };
    t.i = function(n) {
        $U.prototype.g.call(this, $N("Attempt to access disposed object: ", n))
    };
    $eh = function(n) {
        var t = new $aN;
        return t.i(n), t
    }
});
$CreateClass(function() {}, function() {
    $lS = function(n, t) {
        var i = new $g,
            r = new $g;
        i.j(n);
        r.j(t);
        var u = i.e,
            f = i.f,
            e = i.g,
            o = i.h,
            s = r.e,
            h = r.f,
            c = r.g,
            l = r.h;
        return $a9(s * o + u * l + h * e - c * f, h * o + f * l + c * u - s * e, c * o + e * l + s * f - h * u, l * o - (s * u + h * f + c * e))
    };
    $lA = function(n) {
        var t = new $g,
            i;
        t.j(n);
        var e = t.h * t.h,
            o = t.e * t.e,
            s = t.f * t.f,
            h = t.g * t.g,
            u = o + s + h + e,
            f = t.e * t.h - t.f * t.g,
            r = new $hY;
        return f > .4995 * u ? (r.f = 2 * $n1(t.f, t.e), r.e = 1.57079637, r.g = 0, r) : f < -.4995 * u ? (r.f = -2 * $n1(t.f, t.e), r.e = -1.57079637, r.g = 0, r) : (i = $a9(t.h, t.g, t.e, t.f), r.f = $n1(2 * i.e * i.h + 2 * i.f * i.g, 1 - 2 * (i.g * i.g + i.h * i.h)), r.e = $nW(2 * (i.e * i.g - i.h * i.f)), r.g = $n1(2 * i.e * i.f + 2 * i.g * i.h, 1 - 2 * (i.f * i.f + i.g * i.g)), r)
    };
    $mx = function(n) {
        var t = $lA(n);
        return $my($hW($nR(t.e), $nR(t.f), $nR(t.g)))
    };
    $my = function(n) {
        var t = new $hY;
        return t.i(n), t.e = $mE(t.e), t.f = $mE(t.f), t.g = $mE(t.g), t
    };
    $mE = function(n) {
        while (n > 360) n = n - 360;
        while (n < 0) n = n + 360;
        return n
    };
    $mF = function(n, t) {
        var i = new $eY,
            r, u, f;
        i.o(n);
        f = i.e + i.i + i.m;
        f > 0 ? (r = $bL(f + 1), t().h = r * .5, r = .5 / r, t().e = (i.j - i.l) * r, t().f = (i.k - i.g) * r, t().g = (i.f - i.h) * r) : i.e >= i.i && i.e >= i.m ? (r = $bL(1 + i.e - i.i - i.m), u = .5 / r, t().e = .5 * r, t().f = (i.f + i.h) * u, t().g = (i.g + i.k) * u, t().h = (i.j - i.l) * u) : i.i > i.m ? (r = $bL(1 + i.i - i.e - i.m), u = .5 / r, t().e = (i.h + i.f) * u, t().f = .5 * r, t().g = (i.l + i.j) * u, t().h = (i.k - i.g) * u) : (r = $bL(1 + i.m - i.e - i.i), u = .5 / r, t().e = (i.k + i.g) * u, t().f = (i.l + i.j) * u, t().g = .5 * r, t().h = (i.f - i.h) * u)
    };
    $mL = function(n, t) {
        var r = new $g,
            i;
        if (r.j(n), i = $jM(r), i < 1e-5) {
            t($jF(0));
            return
        }
        i = 1 / i;
        t().e = -r.e * i;
        t().f = -r.f * i;
        t().g = -r.g * i;
        t().h = r.h * i
    };
    $mM = function(n) {
        var t = new $g;
        return $mL(n, $CreateRef(function() {
            return t
        }, function(n) {
            t = n
        }, this)), t
    }
});
$T = $CreateClass(function() {
    this.e = 0;
    this.f = 0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 104
    };
    t.g = function(n) {
        this.e = n;
        this.f = n + 1
    };
    t.h = function() {
        return this.e = 36969 * (this.e & 65535) + (this.e >> 16) & 134217727, this.f = 18e3 * (this.f & 65535) + (this.f >> 16) & 134217727, (this.e << 16) + this.f & 134217727
    };
    t.j = function(n, t) {
        return this.h() % (t - n) + n
    };
    t.k = function() {
        return this.h() / 134217728
    };
    t.m = function() {
        return $C(this.k(), this.k())
    };
    t.p = function(n) {
        this.g(n)
    };
    $eC = function(n) {
        var t = new $T;
        return t.p(n), t
    }
});
$l = $CreateClass(function() {
    this.$struct = !0;
    this.e = 0;
    this.f = 0;
    this.g = 0;
    this.h = 0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 29
    };
    t.i = function() {
        return $ax(this.e, this.f)
    };
    t.k = function() {
        return this.i()
    };
    t.l = function() {
        return $ax(this.g - this.e, this.h - this.f)
    };
    t.d = function() {
        return $N($N($N($N($N($N(this.e.d(), ", "), this.f.d()), ", "), this.g.d()), ", "), this.h.d())
    };
    t.q = function(n) {
        this.e = n.e;
        this.f = n.f;
        this.g = n.g;
        this.h = n.h
    };
    t.r = function(n, t, i, r) {
        this.e = n;
        this.f = t;
        this.g = i;
        this.h = r
    };
    $cl = function(n, t, i, r) {
        var u = new $l;
        return u.r(n, t, i, r), u
    };
    t.s = function(n, t) {
        var i = new $i,
            r = new $i;
        i.i(n);
        r.i(t);
        this.e = i.e;
        this.f = i.f;
        this.g = this.e + r.e;
        this.h = this.f + r.f
    };
    $er = function(n, t) {
        var i = new $l;
        return i.s(n, t), i
    }
});
$kD = $CreateClass(function() {
    this.$struct = !0;
    this.e = 0;
    this.f = 0;
    this.g = 0;
    this.h = 0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 84
    };
    t.d = function() {
        return $N($N($N($N($N($N(this.e.d(), ", "), this.f.d()), ", "), this.g.d()), ", "), this.h.d())
    };
    t.l = function(n, t, i, r) {
        this.e = n;
        this.f = t;
        this.g = i;
        this.h = r
    };
    $j6 = function(n, t, i, r) {
        var u = new $kD;
        return u.l(n, t, i, r), u
    }
});
$oC = $CreateClass(function() {
    this.$struct = !0;
    this.e = 0;
    this.f = 0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 105
    };
    t.d = function() {
        return $N($N(this.e.d(), ", "), this.f.d())
    };
    t.j = function(n, t) {
        this.e = n;
        this.f = t
    };
    $ol = function(n, t) {
        var i = new $oC;
        return i.j(n, t), i
    }
});
$o7 = $CreateClass(function() {
    this.$struct = !0;
    this.e = 0;
    this.f = 0;
    this.g = 0;
    this.h = 0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 87
    };
    t.d = function() {
        return $N($N($N($N($N($N(this.e.d(), ", "), this.f.d()), ", "), this.g.d()), ", "), this.h.d())
    };
    t.l = function(n, t, i, r) {
        this.e = n;
        this.f = t;
        this.g = i;
        this.h = r
    };
    $o9 = function(n, t, i, r) {
        var u = new $o7;
        return u.l(n, t, i, r), u
    }
});
$gm = $CreateClass(function() {
    this.$struct = !0;
    this.e = 0;
    this.f = 0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 106
    };
    t.d = function() {
        return $N($N(this.e.d(), ", "), this.f.d())
    };
    t.j = function(n, t) {
        this.e = n;
        this.f = t
    };
    $gJ = function(n, t) {
        var i = new $gm;
        return i.j(n, t), i
    }
});
$eT = $CreateClass(function() {
    this.$struct = !0;
    this.e = 0;
    this.f = 0;
    this.g = 0;
    this.h = 0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 85
    };
    t.d = function() {
        return $N($N($N($N($N($N(this.e.d(), ", "), this.f.d()), ", "), this.g.d()), ", "), this.h.d())
    };
    t.l = function(n, t, i, r) {
        this.e = n;
        this.f = t;
        this.g = i;
        this.h = r
    };
    $fR = function(n, t, i, r) {
        var u = new $eT;
        return u.l(n, t, i, r), u
    }
});
$CreateClass(function() {}, function() {
    $ex = function(n) {
        var t = new $f;
        return t.i(n), t.e * t.e + t.f * t.f
    };
    $jL = function(n) {
        var t = new $hY;
        return t.i(n), t.e * t.e + t.f * t.f + t.g * t.g
    };
    $jM = function(n) {
        var t = new $g;
        return t.j(n), t.e * t.e + t.f * t.f + t.g * t.g + t.h * t.h
    };
    $ev = function(n) {
        return $bL($ex(n))
    };
    $jN = function(n) {
        return $bL($jL(n))
    };
    $jT = function(n) {
        return $hP(n, $jN(n))
    };
    $js = function(n, t) {
        var i = new $hY,
            r = new $hY;
        return i.i(n), r.i(t), i.e * r.e + i.f * r.f + i.g * r.g
    };
    $jx = function(n, t) {
        var i = new $hY,
            r = new $hY;
        return i.i(n), r.i(t), $hW(i.f * r.g - i.g * r.f, i.g * r.e - i.e * r.g, i.e * r.f - i.f * r.e)
    };
    $hx = function(n, t) {
        var r = new $hY,
            i = new $f8;
        return r.i(n), i.v(t), $a9(r.e * i.e + r.f * i.i + r.g * i.m + i.q, r.e * i.f + r.f * i.j + r.g * i.n + i.r, r.e * i.g + r.f * i.k + r.g * i.o + i.s, r.e * i.h + r.f * i.l + r.g * i.p + i.t)
    };
    $hy = function(n, t) {
        var r = new $hY,
            i = new $f8;
        return r.i(n), i.v(t), $hW(r.e * i.e + r.f * i.i + r.g * i.m + i.q, r.e * i.f + r.f * i.j + r.g * i.n + i.r, r.e * i.g + r.f * i.k + r.g * i.o + i.s)
    };
    $hA = function(n, t) {
        var i = $hx(n, t);
        return $hP($hW(i.e, i.f, i.g), i.h)
    };
    $hI = function(n, t) {
        var i = new $hY,
            r = new $f8;
        return i.i(n), r.v(t), $hW(i.e * r.e + i.f * r.i + i.g * r.m, i.e * r.f + i.f * r.j + i.g * r.n, i.e * r.g + i.f * r.k + i.g * r.o)
    }
});
$V = $CreateClass(function() {
    this.e = new $f;
    this.f = new $f;
    this.g = new $g;
    this.h = 0;
    this.i = 0
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 109
    };
    t.j = function(n, t) {
        var r = $bo(n, t),
            u = $ev(r),
            f, i;
        u > 0 && (f = $a5($6($C(r.f, r.e), $C(-1, 1)), u), this.e = $bo(n, $a5($bp(f, this.h), 2)), this.f = $be(n, $a5($bp(f, this.h), 2)));
        i = u / this.h * 2;
        this.g.e = $bc(i);
        this.g.f = $aD(i);
        this.g.g = $bc(-i);
        this.g.h = $aD(-i)
    };
    t.k = function() {
        this.h = .066;
        this.i = 7.5
    };
    $eG = function() {
        var n = new $V;
        return n.k(), n
    }
});
$w = $CreateClass(function() {
    this.e = new $f;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.k = new $g;
    this.l = new $g;
    this.m = new $f;
    this.n = null;
    this.o = null;
    this.p = null
}, function(n) {
    var t = n.prototype;
    t.GetType = function() {
        return 58
    };
    t.$II = function(n) {
        return [167].indexOf(n) != -1
    };
    t.q = function() {
        this.r();
        this.s();
        this.t()
    };
    t.r = function() {
        var n;
        for ((this.n == null || this.n.length < this.f + 1) && (this.n = Array.Structs(this.f + 1, $f, 10)), n = 1; n < this.f + 1; n++) {
            var t = this.h + 6.28318548 * (n - 1) / this.f,
                i = $aD(t) * this.g,
                r = $bc(t) * this.g;
            this.n[n] = $C(i, r)
        }
    };
    t.s = function() {
        (this.o == null || this.o.length != this.f * 3) && (this.o = Array.Zeros(this.f * 3, 33));
        for (var n = 0; n < this.f; n++) this.o[n * 3] = 0, this.o[n * 3 + 1] = n + 2, this.o[n * 3 + 2] = n + 1;
        this.o[this.f * 3 - 2] = 1
    };
    t.t = function() {
        (this.p == null || this.p.length < this.f + 1) && (this.p = Array.Structs(this.f + 1, $g, 6));
        this.p[0].j(this.k);
        for (var n = 1; n < this.f + 1; n++) this.p[n].j(this.l)
    };
    t.u = function(n) {
        return $6($bV($bp($be(n, this.e), 2), 1), this.m)
    };
    t.v = function() {
        return this.n
    };
    t.w = function() {
        return this.o
    };
    t.x = function() {
        return this.p
    };
    t.y = function() {
        return this.e
    };
    t.z = function() {
        return this.m
    };
    t.A = function() {
        this.e = $av(.5);
        this.f = 32;
        this.g = .1;
        this.k = $a9(1, 1, 1, 1);
        this.l = $a9(0, 0, 0, 1);
        this.m = $av(1);
        this.q()
    };
    $eE = function() {
        var n = new $w;
        return n.A(), n
    };
    t.$bY = t.v;
    t.$bs = t.w;
    t.$b0 = t.x;
    t.$eF = t.u;
    t.$b1 = t.z;
    t.$b2 = t.y
});
$r = $CreateClass(function() {
    this.e = new $g;
    this.f = new $g;
    this.g = new $g;
    this.h = new $g;
    this.i = null;
    this.j = 0;
    this.k = 0;
    this.l = 0;
    this.m = 0;
    this.n = new $f
}, function(n) {
    var t = n.prototype;
    $bg = 0;
    t.GetType = function() {
        return 48
    };
    t.o = function() {
        return this.i
    };
    t.p = function(n, t) {
        n().g = n().g + (t().e - n().e) * this.l;
        n().h = n().h + (t().f - n().f) * this.l;
        t().g = t().g + (n().e - t().e) * this.l;
        t().h = t().h + (n().f - t().f) * this.l
    };
    t.q = function(n) {
        n($bi($C(n().e, n().f), $bp($C(n().g, n().h), $c6(0, 1 - (n().g * n().g + n().h * n().h) * this.k))));
        var t = $a5($bV($dk(1, this.n), 1), 2);
        n().f > 1 + t.f && (n().f = -$bb(n().f) * (1 - this.m), n().f = 1 + t.f);
        n().f < -t.f && (n().f = $bb(n().f) * (1 - this.m), n().f = -t.f);
        n().e < -t.e && (n().g = $bb(n().g) * (1 - this.m), n().e = -t.e);
        n().e > 1 + t.e && (n().g = -$bb(n().g) * (1 - this.m), n().e = 1 + t.e)
    };
    t.r = function() {
        var n, t, i, r, u, f, e, o, s;
        this.p($CreateRef(function() {
            return this.$.e
        }, function(n) {
            this.$.e = n
        }, this), $CreateRef(function() {
            return this.$.f
        }, function(n) {
            this.$.f = n
        }, this));
        this.p($CreateRef(function() {
            return this.$.f
        }, function(n) {
            this.$.f = n
        }, this), $CreateRef(function() {
            return this.$.g
        }, function(n) {
            this.$.g = n
        }, this));
        this.p($CreateRef(function() {
            return this.$.g
        }, function(n) {
            this.$.g = n
        }, this), $CreateRef(function() {
            return this.$.h
        }, function(n) {
            this.$.h = n
        }, this));
        this.q($CreateRef(function() {
            return this.$.f
        }, function(n) {
            this.$.f = n
        }, this));
        this.q($CreateRef(function() {
            return this.$.g
        }, function(n) {
            this.$.g = n
        }, this));
        this.q($CreateRef(function() {
            return this.$.h
        }, function(n) {
            this.$.h = n
        }, this));
        this.f.f = this.f.f - this.j;
        this.g.f = this.g.f - this.j;
        this.h.f = this.h.f - this.j;
        this.f = $bi($be((n = this.f, $C(n.e, n.f)), (t = this.f, $C(t.g, t.h))), (i = this.f, $C(i.g, i.h)));
        this.g = $bi($be((r = this.g, $C(r.e, r.f)), (u = this.g, $C(u.g, u.h))), (f = this.g, $C(f.g, f.h)));
        this.h = $bi($be((e = this.h, $C(e.e, e.f)), (o = this.h, $C(o.g, o.h))), (s = this.h, $C(s.g, s.h)))
    };
    t.s = function() {
        for (var r = this.e.e, u = this.e.f, f = 0; f < $bg; f++) {
            var n = f / ($bg - 1),
                o = 1 - n,
                t = this.t(n, this.e.e, this.f.e, this.g.e, this.h.e),
                i = this.t(n, this.e.f, this.f.f, this.g.f, this.h.f),
                e = n * o * $aD(n * 200) / $bL((t - r) * (t - r) + (i - u) * (i - u)) * .1;
            this.i[f] = $C(t + (i - u) * e, i - (t - r) * e);
            r = t;
            u = i
        }
    };
    t.t = function(n, t, i, r, u) {
        var f = 1 - n;
        return n * n * n * n * n * t + 5 * n * n * n * n * f * t + 10 * n * n * n * f * f * i + 10 * n * n * f * f * f * r + 5 * f * f * f * f * n * u + f * f * f * f * f * u
    };
    $eD = function() {
        $bg = 512
    };
    t.u = function() {
        this.i = Array.Structs($bg, $f, 10);
        this.j = .05;
        this.k = 2.5;
        this.l = .009;
        this.m = .025;
        this.n = $av(1)
    };
    $ey = function() {
        var n = new $r;
        return n.u(), n
    }
});
$h = $CreateClass(function() {
    $j.call(this);
    this.z = !1;
    this.A = !1;
    this.B = !1;
    this.C = null;
    this.D = null;
    this.E = 0;
    this.F = null;
    this.G = null;
    this.H = null;
    this.I = null;
    this.J = null;
    this.K = null;
    this.L = null;
    this.M = null;
    this.N = null;
    this.O = null;
    this.P = null;
    this.Q = null;
    this.R = null;
    this.S = null;
    this.T = null;
    this.U = null;
    this.V = null;
    this.W = null;
    this.X = null;
    this.Y = new $f;
    this.Z = new $f;
    this.aa = new $f;
    this.ab = null;
    this.ac = null;
    this.ad = new $f;
    this.ae = new $f;
    this.af = new $f;
    this.ag = new $f;
    this.ah = null;
    this.ai = null;
    this.aj = null;
    this.ak = null;
    this.al = null;
    this.am = null;
    this.an = null;
    this.ao = null;
    this.ap = null;
    this.aq = null;
    this.ar = null;
    this.at = null;
    this.au = null;
    this.av = null;
    this.aw = null;
    this.ax = null;
    this.ay = null;
    this.az = null;
    this.aA = null;
    this.aB = new $d;
    this.aC = new $d;
    this.aD = new $d;
    this.aE = new $d;
    this.aF = new $d;
    this.aG = new $d;
    this.aH = new $d;
    this.aI = new $d
}, function(n) {
    var t = n.prototype = new $j;
    t.GetType = function() {
        return 13
    };
    t.aJ = function() {
        return this.E < 0 ? this.C : this.D
    };
    t.aK = function() {
        return this.E > 0 ? this.C : this.D
    };
    t.aL = function() {
        var n, i, r, t;
        for (this.Y = $C($K().m().r().e, $K().m().r().f), n = $ax($K().m().r().e, $K().m().r().f), this.aa = $bd($av(1), this.Y), this.Z = $C(this.Y.f / this.Y.e, 1), this.C = $ag(n, 3, 0), this.D = $ag(n, 3, 0), this.aM(this.C), this.aM(this.D), i = n.e * n.f * 4, this.ac = $bZ(n, 3, !1), r = $a7(i), t = 0; t < i; t++) r.v(t, this.ab.j(0, 255));
        this.ac.s(0, Array.Init([r], 20));
        this.F = $ag(n, 3, 0);
        this.G = $ag(n, 3, 0);
        this.aM(this.F);
        this.aM(this.G);
        n = $aT(n, 2);
        this.H = $ag(n, 3, 0);
        this.I = $ag(n, 3, 0);
        this.aM(this.H);
        this.aM(this.I);
        n = $aT(n, 2);
        this.J = $ag(n, 3, 0);
        this.K = $ag(n, 3, 0);
        this.aM(this.J);
        this.aM(this.K);
        n = $aT(n, 2);
        this.L = $ag(n, 3, 0);
        this.M = $ag(n, 3, 0);
        this.aM(this.L);
        this.aM(this.M);
        n = $aT(n, 2);
        this.N = $ag(n, 3, 0);
        this.O = $ag(n, 3, 0);
        this.aM(this.N);
        this.aM(this.O);
        n = $aT(n, 2);
        this.P = $ag(n, 3, 0);
        this.Q = $ag(n, 3, 0);
        this.aM(this.P);
        this.aM(this.Q);
        n = $aT(n, 2);
        this.R = $ag(n, 3, 0);
        this.S = $ag(n, 3, 0);
        this.aM(this.R);
        this.aM(this.S);
        n = $aT(n, 2);
        this.T = $ag(n, 3, 0);
        this.U = $ag(n, 3, 0);
        this.aM(this.T);
        this.aM(this.U);
        this.W.f = 8;
        this.W.g = .04;
        this.W.m.i(this.Z);
        this.W.q();
        this.V.n.i(this.Z);
        this.z = !0;
        this.A = !0;
        this.B = !0
    };
    t.aM = function(n) {
        var t = $K().n().j();
        $K().n().j(n.h());
        this.aB.Y();
        this.aB.aa(0, 2, this.ai, 8, 0);
        this.aB.aH(6, 2, this.ah);
        $K().n().j(t)
    };
    t.aN = function() {
        this.z = !1
    };
    t.aO = function() {
        this.B = !this.A;
        this.A = this.B
    };
    t.aP = function(n, t) {
        this.ad = $bd(t.q(), this.Y);
        this.ad.f = 1 - this.ad.f;
        this.ad = $c9(.5, $bd($bV(this.ad, .5), this.Z));
        this.W.r()
    };
    t.v = function() {
        var n, t, i;
        this.V.e = $dh(this.ad, 0, 0);
        this.V.r($K().r());
        this.X.j((n = this.V.h, $C(n.e, n.f)), this.af);
        this.W.e.i((t = this.V.h, $C(t.e, t.f)));
        this.ag = $bo(this.ad, this.ae);
        this.ae.i(this.ad);
        this.af.i((i = this.V.h, $C(i.e, i.f)))
    };
    t.x = function() {
        var i;
        this.V.s();
        this.z || this.aL();
        var r = $K().n().j(),
            u = this.aJ().g(),
            s = this.F.g(),
            h = this.H.g(),
            c = this.J.g(),
            l = this.L.g(),
            a = this.N.g(),
            v = this.P.g(),
            y = this.R.g(),
            p = this.T.g(),
            n = .01,
            w = $C($bc(n), $aD(n));
        if (this.A || (i = this.ab.m(), $K().n().j(this.aK().h()), this.aC.Y(), this.aC.aa(0, 2, this.ak, 8, 0), this.aC.ar(1, i), this.aC.ar(2, this.aa), this.aC.ae(3, u), this.aC.af(4, this.ac, $eL()), this.aC.aH(6, 2, this.aj), this.al.s($aG(this.W.$bs())), this.am.s($aA(this.W.$bY())), this.an.s($cz(this.W.$b0())), this.aD.Y(), this.aD.aa(0, 2, this.am, 8, 0), this.aD.aa(1, 4, this.an, 16, 0), this.aD.ar(2, this.W.$b2()), this.aD.ar(3, this.W.$b1()), this.aD.aH(this.W.$bs().length, 2, this.al), this.E = this.E * -1), this.B) {
            $K().n().j(this.aK().h());
            this.aE.Y();
            this.aE.aa(0, 2, this.ap, 8, 0);
            this.aE.ar(1, this.X.e);
            this.aE.ar(2, this.X.f);
            this.aE.aq(3, this.X.h);
            this.aE.aq(4, this.X.i);
            this.aE.au(5, this.X.g);
            this.aE.ar(6, this.Z);
            this.aE.ae(7, this.aJ().g());
            this.aE.aH(6, 2, this.ao);
            n = 2.09439516;
            var t = $K().q(),
                f = .5 + .5 * $aD(t),
                e = .5 + .5 * $aD(t + n),
                o = .5 + .5 * $aD(t - n);
            this.aF.Y();
            this.aF.aa(0, 2, this.ar, 8, 0);
            this.aF.au(1, $a9(f, e, o, 1));
            this.aF.aH(this.at.length, 2, this.aq);
            this.E = this.E * -1
        }
        $K().n().j(r);
        this.aG.Y();
        this.aG.aa(0, 2, this.av, 8, 0);
        this.aG.ae(1, this.aJ().g());
        this.aG.aH(6, 2, this.au);
        this.aw.s($aA(this.V.o()));
        this.aH.N(5);
        this.aH.Y();
        this.aH.aa(0, 2, this.aw, 8, 0);
        this.aH.ar(1, this.Z);
        this.aH.aF(this.V.o().length)
    };
    t.aQ = function(n, t, i) {
        var u = $K().n().j(),
            r;
        return $K().n().j(t.h()), r = $bd($av(1), $dn(n.i())), this.aI.Y(), this.aI.aa(0, 2, this.ay, 8, 0), this.aI.ar(1, $6($C(-4, 0), r)), this.aI.ar(2, $6($C(-3, 0), r)), this.aI.ar(3, $6($C(-2, 0), r)), this.aI.ar(4, $6($C(-1, 0), r)), this.aI.ar(5, $6($C(0, 0), r)), this.aI.ar(6, $6($C(1, 0), r)), this.aI.ar(7, $6($C(2, 0), r)), this.aI.ar(8, $6($C(3, 0), r)), this.aI.ar(9, $6($C(4, 0), r)), this.aI.ae(10, i), this.aI.aH(6, 2, this.ax), $K().n().j(n.h()), this.aI.Y(), this.aI.aa(0, 2, this.aA, 8, 0), this.aI.ar(1, $6($C(0, -4), r)), this.aI.ar(2, $6($C(0, -3), r)), this.aI.ar(3, $6($C(0, -2), r)), this.aI.ar(4, $6($C(0, -1), r)), this.aI.ar(5, $6($C(0, 0), r)), this.aI.ar(6, $6($C(0, 1), r)), this.aI.ar(7, $6($C(0, 2), r)), this.aI.ar(8, $6($C(0, 3), r)), this.aI.ar(9, $6($C(0, 4), r)), this.aI.ae(10, t.g()), this.aI.aH(6, 2, this.az), $K().n().j(u), n.g()
    };
    t.aR = function() {
        var n = Array.Init([$C(0, 0), $C(1, 0), $C(1, 1), $C(0, 1)], 10),
            t = Array.Init([0, 1, 2, 2, 3, 0], 33),
            i;
        this.ah = $aR($aG(t), 0);
        this.ai = $aU($aA(n), 0);
        this.aj = $aR($aG(t), 0);
        this.ak = $aU($aA(n), 0);
        this.al = $c3(1);
        this.am = $bq(1);
        this.an = $bq(1);
        this.ao = $aR($aG(t), 0);
        this.ap = $aU($aA(n), 0);
        i = Array.Init([0, 5, 4, 0, 1, 5, 1, 6, 5, 1, 2, 6, 2, 7, 6, 2, 3, 7, 3, 4, 7, 3, 0, 4], 33);
        this.aq = $aR($aG(i), 0);
        this.ar = $aU($aA(Array.Init([$C(-1, -1), $C(1, -1), $C(1, 1), $C(-1, 1), $C(-.975, -.975), $C(.975, -.975), $C(.975, .975), $C(-.975, .975)], 10)), 0);
        this.at = i;
        this.au = $aR($aG(t), 0);
        this.av = $aU($aA(n), 0);
        this.aw = $bq(1);
        this.ax = $aR($aG(t), 0);
        this.ay = $aU($aA(n), 0);
        this.az = $aR($aG(t), 0);
        this.aA = $aU($aA(n), 0);
        this.aB = $aC($DownCast($aE(9), 49));
        this.aC = $aC($DownCast($aE(10), 49));
        this.aD = $aC($DownCast($aE(11), 49));
        this.aE = $aC($DownCast($aE(12), 49));
        this.aF = $aC($DownCast($aE(13), 49));
        this.aG = $aC($DownCast($aE(14), 49));
        this.aH = $aC($DownCast($aE(15), 49));
        this.aI = $aC($DownCast($aE(16), 49))
    };
    $bJ = function() {
        $dZ();
        $eb();
        $c5();
        $dF();
        $dB();
        $eg();
        $eD()
    };
    t.aS = function() {
        $j.prototype.y.call(this);
        $bJ();
        this.A = !0;
        this.E = 1;
        this.V = $ey();
        this.W = $eE();
        this.X = $eG();
        this.Y = $av(0);
        this.Z = $av(1);
        this.aa = $av(0);
        this.ab = $eC(23);
        this.ad = $av(.5);
        this.ae = $av(.5);
        this.af = $av(.5);
        this.ag = $av(0);
        this.m().I($CreateDelegate(this, $h.prototype.aO, 130));
        this.m().M($CreateDelegate(this, $h.prototype.aP, 130));
        this.m().W($CreateDelegate(this, $h.prototype.aN, 173));
        this.aR()
    };
    $bB = function() {
        var n = new $h;
        return n.aS(), n
    }
});
try {
    $SetupWebGL(document.body) && ($PopulateClasses(), $bM(17), $Initialize(function() {
        $Q(0, $R("uniform mat4 d;attribute vec2 a,b;attribute vec4 c;varying vec2 g;varying vec4 h;void main(){vec4 j=d*vec4(a,.0,1.);g=b;h=c;gl_Position=j;}", "uniform float e,f;uniform sampler2D i;varying vec2 g;varying vec4 h;void main(){float j=smoothstep(e,f,texture2D(i,g).x);bool k=j<.15;vec4 l=h*vec4(1.,1.,1.,j);if (k) discard;gl_FragColor=l;}", 0, 3, Array.Init(["a", "b", "c", "d", "e", "f", "i"], 7)));
        $Q(1, $R("uniform mat4 d;attribute vec2 a,c;attribute vec4 b;varying vec2 e;varying vec4 f;void main(){vec4 h=d*vec4(a,.0,1.);e=c;f=b;gl_Position=h;}", "uniform sampler2D g;varying vec2 e;varying vec4 f;void main(){vec4 h=f*vec4(1.,1.,1.,texture2D(g,e).x);gl_FragColor=h;}", 0, 3, Array.Init(["a", "b", "c", "d", "g"], 7)));
        $Q(2, $R("uniform mat4 i[16],j,l[16];attribute vec3 a,e;attribute float b;attribute vec2 c;attribute vec4 d;varying vec2 p;varying vec3 q,r,s,t;mat3 x(mat3 y){return mat3(vec3(y[0].x,y[1].x,y[2].x),vec3(y[0].y,y[1].y,y[2].y),vec3(y[0].z,y[1].z,y[2].z));}void main(){vec4 y=(j*i[int(b)])*vec4(a,1.);mat3 z=x(mat3(l[int(b)][0].xyz,l[int(b)][1].xyz,l[int(b)][2].xyz));p=c;q=z*d.xyz;r=z*(cross(d.xyz,e)*d.w);s=z*e;t=(i[int(b)]*vec4(a,1.)).xyz;gl_Position=y;}", "uniform vec3 k,m,n;uniform float o;uniform sampler2D u,v,w;varying vec2 p;varying vec3 q,r,s,t;void main(){vec3 y=k*(f?texture2D(u,p):vec4(1.)).xyz;vec3 z=mat3(normalize(q),normalize(r),normalize(s))*(g?normalize((texture2D(v,p).xyz*2.)-1.):vec3(.0,.0,1.));vec3 A=normalize(vec3(100.,.0,100.));vec4 B=vec4(((y*vec3(.5))+((y*max(.0,dot(normalize(z),A)))*vec3(1.)))+(((m*(h?texture2D(w,p):vec4(1.)).xyz)*pow(max(.0,dot(normalize(reflect(t-n,z)),A)),o))*vec3(1.)),1.);gl_FragColor=B;}", 3, 5, Array.Init(["f", "g", "h", "a", "b", "c", "d", "e", "i", "j", "k", "l", "m", "n", "o", "u", "v", "w"], 7)));
        $Q(3, $R("uniform mat4 j,m,n;attribute vec3 a,d;attribute vec2 b;attribute vec4 c;varying vec2 o;varying vec3 p,q,r,s;void main(){vec4 w=m*vec4(a,1.);o=b;p=mat3(n[0].xyz,n[1].xyz,n[2].xyz)*c.xyz;q=mat3(n[0].xyz,n[1].xyz,n[2].xyz)*(cross(c.xyz,d)*c.w);r=mat3(n[0].xyz,n[1].xyz,n[2].xyz)*d;s=(j*vec4(a,1.)).xyz;gl_Position=w;}", "uniform vec3 h,i,k;uniform float l;uniform sampler2D t,u,v;varying vec2 o;varying vec3 p,q,r,s;void main(){vec3 w=h*(e?texture2D(t,o):vec4(1.)).xyz;vec3 x=mat3(normalize(p),normalize(q),normalize(r))*(f?normalize((texture2D(u,o).xyz*2.)-1.):vec3(.0,.0,1.));vec3 y=normalize(vec3(100.,.0,100.));vec4 z=vec4(((w*vec3(.5))+((w*max(.0,dot(normalize(x),y)))*vec3(1.)))+(((i*(g?texture2D(v,o):vec4(1.)).xyz)*pow(max(.0,dot(normalize(reflect(s-k,x)),y)),l))*vec3(1.)),1.);gl_FragColor=z;}", 3, 4, Array.Init(["e", "f", "g", "a", "b", "c", "d", "h", "i", "j", "k", "l", "m", "n", "t", "u", "v"], 7)));
        $Q(4, $R("uniform vec2 b,c;attribute vec2 a;varying vec2 d,e,f,g;void main(){vec3 i=vec3((a.xy*vec2(2.,2.))+vec3(-1.,-1.,.0).xy,.0);vec2 j=(i.xy*.5)+.5;d=j+b;e=j-b;f=j+c;g=j-c;gl_Position=vec4(i,1.);}", "uniform sampler2D h;varying vec2 d,e,f,g;void main(){vec4 i=(((texture2D(h,d)+texture2D(h,e))+texture2D(h,f))+texture2D(h,g))/4.;gl_FragColor=i;}", 0, 1, Array.Init(["a", "b", "c", "h"], 7)));
        $Q(5, $R("attribute vec2 a;varying vec2 b;void main(){vec3 d=vec3((a.xy*vec2(2.,2.))+vec3(-1.,-1.,.0).xy,.0);b=(d.xy*.5)+.5;gl_Position=vec4(d,1.);}", "uniform sampler2D c;varying vec2 b;void main(){vec4 d=texture2D(c,b);gl_FragColor=d;}", 0, 1, Array.Init(["a", "c"], 7)));
        $Q(6, $R("uniform vec2 b,c,d,e;attribute vec2 a;varying vec2 i,j,k,l,m;void main(){vec3 o=vec3((a.xy*vec2(2.,2.))+vec3(-1.,-1.,.0).xy,.0);vec2 p=vec2(a.x,1.-a.y);vec2 q=vec2(p.x,1.-p.y);i=q+b;j=q+c;k=q+d;l=q+e;m=q;gl_Position=vec4(o,1.);}", "uniform float f;uniform vec4 g,h;uniform sampler2D n;varying vec2 i,j,k,l,m;void main(){vec3 o=texture2D(n,m).xyz;float p=min(1.,(((length(texture2D(n,i).xyz-o)+length(texture2D(n,j).xyz-o))+length(texture2D(n,k).xyz-o))+length(texture2D(n,l).xyz-o))*f);vec4 q=(g*(1.-p))+(h*p);gl_FragColor=q;}", 0, 1, Array.Init(["a", "b", "c", "d", "e", "f", "g", "h", "n"], 7)));
        $Q(7, $R("uniform mat4 c;attribute vec3 a;void main(){vec4 d=c*vec4(a,1.);gl_Position=d;}", "uniform vec4 b;void main(){gl_FragColor=b;}", 0, 1, Array.Init(["a", "b", "c"], 7)));
        $Q(8, $R("attribute vec2 a;varying vec2 b;void main(){vec3 d=vec3((a.xy*vec2(2.,2.))+vec3(-1.,-1.,.0).xy,.0);b=(d.xy*vec2(.5,-0.5))+.5;gl_Position=vec4(d,1.);}", "uniform sampler2D c;varying vec2 b;void main(){vec4 d=texture2D(c,b);gl_FragColor=d;}", 0, 1, Array.Init(["a", "c"], 7)));
        $Q(9, $R("attribute vec2 a;void main(){vec3 b=vec3((a.xy*vec2(2.,2.))+vec3(-1.,-1.,.0).xy,.0);gl_Position=vec4(b,1.);}", "void main(){gl_FragColor=vec4(.0,.0,.0,1.);}", 0, 1, Array.Init(["a"], 7)));
        $Q(10, $R("attribute vec2 a;varying vec2 d;void main(){vec3 h=vec3((a.xy*vec2(2.,2.))+vec3(-1.,-1.,.0).xy,.0);vec2 i=vec2(a.x,1.-a.y);d=vec2(i.x,1.-i.y);gl_Position=vec4(h,1.);}", "uniform vec2 b,c;uniform sampler2D e,f;varying vec2 d;vec2 g(vec2 h){return h-vec2(floor(h.x),floor(h.y));}void main(){vec3 h=texture2D(f,g(d+b)).xyz-vec3(.5);vec3 i=(texture2D(e,d+(h.xy*c)).xyz-(h*vec3(.125)))-vec3(.000366210938);gl_FragColor=vec4(i,1.);}", 0, 1, Array.Init(["a", "b", "c", "e", "f"], 7)));
        $Q(11, $R("uniform vec2 c,d;attribute vec2 a;attribute vec4 b;varying vec4 e;vec2 f(vec2 g,vec2 h,vec2 i){return (((g+h)*2.)-1.)*i;}void main(){vec4 g=vec4(f(a,c,d),.0,1.);e=b;gl_Position=g;}", "varying vec4 e;void main(){gl_FragColor=e;}", 0, 2, Array.Init(["a", "b", "c", "d"], 7)));
        $Q(12, $R("attribute vec2 a;varying vec2 h;void main(){vec3 p=vec3((a.xy*vec2(2.,2.))+vec3(-1.,-1.,.0).xy,.0);vec2 q=vec2(a.x,1.-a.y);h=vec2(q.x,1.-q.y);gl_Position=vec4(p,1.);}", "uniform vec2 b,c,g;uniform float d,e;uniform vec4 f;uniform sampler2D i;varying vec2 h;vec2 j(vec2 p,vec2 q){return vec2((p.x*q.x)-(p.y*q.y),(p.x*q.y)+(p.y*q.x));}float k(float p){return (2./(1.+pow(2.,-p)))-1.;}float l(vec2 p,vec2 q,float r,vec2 s,float t){return max(t,1.-length(((p-q)/s)/r));}float m(vec2 p,vec2 q,float r,vec2 s,float t){return .5+(k(l(p,q,r,s,-16.)*t)*.5);}vec2 n(vec2 p,vec2 q,float r,float s,vec2 t,vec2 u){float v=t.x;float w=t.y;vec2 x=.5+((q-.5)*u);vec2 y=x+(j((p-x)*u.yx,t)/u.yx);float z=m(p,x,r,u,s);return mix(p,y,z);}vec2 o(vec2 p,vec2 q,vec2 r,float s,float t,vec4 u,vec2 v){vec2 w=n(p,q,s,t,u.xy,v);vec2 x=n(p,r,s,t,u.zw,v);return (w+x)/2.;}void main(){vec4 p=texture2D(i,o(h,b,c,d,e,f,g));gl_FragColor=p;}", 0, 1, Array.Init(["a", "b", "c", "d", "e", "f", "g", "i"], 7)));
        $Q(13, $R("attribute vec2 a;void main(){gl_Position=vec4(a,.0,1.);}", "uniform vec4 b;void main(){gl_FragColor=b;}", 0, 1, Array.Init(["a", "b"], 7)));
        $Q(14, $R("attribute vec2 a;varying vec2 b;void main(){vec3 d=vec3((a.xy*vec2(2.,2.))+vec3(-1.,-1.,.0).xy,.0);vec2 e=vec2(a.x,1.-a.y);b=vec2(e.x,1.-e.y);gl_Position=vec4(d,1.);}", "uniform sampler2D c;varying vec2 b;void main(){vec4 d=texture2D(c,b);gl_FragColor=d;}", 0, 1, Array.Init(["a", "c"], 7)));
        $Q(15, $R("uniform vec2 b;attribute vec2 a;vec2 c(vec2 d,vec2 e,vec2 f){return (((d+e)*2.)-1.)*f;}void main(){vec4 d=vec4(c(a,vec2(.0),b),.0,1.);gl_Position=d;}", "void main(){gl_FragColor=vec4(1.);}", 0, 1, Array.Init(["a", "b"], 7)));
        $Q(16, $R("attribute vec2 a;varying vec2 k;void main(){vec3 n=vec3((a.xy*vec2(2.,2.))+vec3(-1.,-1.,.0).xy,.0);vec2 o=vec2(a.x,1.-a.y);k=vec2(o.x,1.-o.y);gl_Position=vec4(n,1.);}", "uniform vec2 b,c,d,e,f,g,h,i,j;uniform sampler2D l;varying vec2 k;vec2 m(vec2 n){return n-vec2(floor(n.x),floor(n.y));}void main(){vec3 n=(((((((((vec3(.0)+(texture2D(l,m(k+b)).xyz*.05))+(texture2D(l,m(k+c)).xyz*.09))+(texture2D(l,m(k+d)).xyz*.12))+(texture2D(l,m(k+e)).xyz*.15))+(texture2D(l,m(k+f)).xyz*.16))+(texture2D(l,m(k+g)).xyz*.15))+(texture2D(l,m(k+h)).xyz*.12))+(texture2D(l,m(k+i)).xyz*.09))+(texture2D(l,m(k+j)).xyz*.05))/.98;gl_FragColor=vec4(n,1.);}", 0, 1, Array.Init(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "l"], 7)));
        $bB()
    }))
} catch (e) {
    alert("There was an error on this page.\n\nError: " + e.message + "\n\n")
}
