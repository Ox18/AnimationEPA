var TIME_SECOND = 1E3
          , TIME_MINUTE = 60 * TIME_SECOND
          , TIME_HOUR = 60 * TIME_MINUTE
          , TIME_DAY = 24 * TIME_HOUR
          , TIME_WEEK = 7 * TIME_DAY
          , TIME_MONTH = 30 * TIME_DAY
          , TIME_YEAR = 365 * TIME_DAY
          , get_time = Date.now
          , Now = Date.now
          , max = Math.max
          , min = Math.min
          , abs = Math.abs
          , round = Math.round
          , floor = Math.floor
          , ceil = Math.ceil
          , PI = Math.PI
          , log = console.log.bind(console)
          , info = console.info.bind(console)
          , warn = console.warn.bind(console)
          , error = console.error.bind(console);
function DragonClock() {
    this.registered = {};
    this.registered_last = void 0;
    this.length = this.next_id = 0
}
DragonClock.prototype.Add = function(a, b) {
    b ? this.registered_last = a : this.registered[this.next_id] = a;
    return this.next_id++
}
;
DragonClock.prototype.Remove = function(a) {
    delete this.registered[a]
}
;
DragonClock.prototype.StartLoop = function() {
    function a() {
        if (b.stop)
            b.looping = !1;
        else {
            requestAnimationFrame(a);
            var d = get_time()
              , e = d - c;
            c = d;
            var d = 0, f;
            for (f in b.registered)
                d++,
                b.registered[f](e);
            b.registered_last && b.registered_last();
            b.length = d
        }
    }
    this.stop = !1;
    if (!this.looping) {
        var b = this
          , c = get_time();
        this.looping = !0;
        a()
    }
}
;
DragonClock.prototype.StopLoop = function() {
    this.stop = !0
}
;
DragonClock.Add = function(a, b, c) {
    if (a.Update)
        a._dragonclock_id = g_dragonClock.Add(a[b || "Update"].bind(a), c);
    else
        throw Error("DragonClock - registered class does not have Update function");
}
;
DragonClock.Remove = function(a) {
    void 0 != a._dragonclock_id ? g_dragonClock.Remove(a._dragonclock_id) : warn("[DragonClock] Trying to remove an object that was not added:", a)
}
;
var g_dragonClock = new DragonClock;
var $jscomp = {
    scope: {}
};
$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
    if (c.get || c.set)
        throw new TypeError("ES3 does not support getters and setters.");
    a != Array.prototype && a != Object.prototype && (a[b] = c.value)
}
;
$jscomp.getGlobal = function(a) {
    return "undefined" != typeof window && window === a ? a : "undefined" != typeof global ? global : a
}
;
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
    $jscomp.initSymbol = function() {}
    ;
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
}
;
$jscomp.symbolCounter_ = 0;
$jscomp.Symbol = function(a) {
    return $jscomp.SYMBOL_PREFIX + (a || "") + $jscomp.symbolCounter_++
}
;
$jscomp.initSymbolIterator = function() {
    $jscomp.initSymbol();
    var a = $jscomp.global.Symbol.iterator;
    a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
    "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {
        configurable: !0,
        writable: !0,
        value: function() {
            return $jscomp.arrayIterator(this)
        }
    });
    $jscomp.initSymbolIterator = function() {}
}
;
$jscomp.arrayIterator = function(a) {
    var b = 0;
    return $jscomp.iteratorPrototype(function() {
        return b < a.length ? {
            done: !1,
            value: a[b++]
        } : {
            done: !0
        }
    })
}
;
$jscomp.iteratorPrototype = function(a) {
    $jscomp.initSymbolIterator();
    a = {
        next: a
    };
    a[$jscomp.global.Symbol.iterator] = function() {
        return this
    }
    ;
    return a
}
;
$jscomp.makeIterator = function(a) {
    $jscomp.initSymbolIterator();
    var b = a[Symbol.iterator];
    return b ? b.call(a) : $jscomp.arrayIterator(a)
}
;
$jscomp.arrayFromIterator = function(a) {
    for (var b, c = []; !(b = a.next()).done; )
        c.push(b.value);
    return c
}
;
$jscomp.arrayFromIterable = function(a) {
    return a instanceof Array ? a : $jscomp.arrayFromIterator($jscomp.makeIterator(a))
}
;
$jscomp.findInternal = function(a, b, c) {
    a instanceof String && (a = String(a));
    for (var d = a.length, e = 0; e < d; e++) {
        var f = a[e];
        if (b.call(c, f, e, a))
            return {
                i: e,
                v: f
            }
    }
    return {
        i: -1,
        v: void 0
    }
}
;
$jscomp.polyfill = function(a, b, c, d) {
    if (b) {
        c = $jscomp.global;
        a = a.split(".");
        for (d = 0; d < a.length - 1; d++) {
            var e = a[d];
            e in c || (c[e] = {});
            c = c[e]
        }
        a = a[a.length - 1];
        d = c[a];
        b = b(d);
        b != d && null != b && $jscomp.defineProperty(c, a, {
            configurable: !0,
            writable: !0,
            value: b
        })
    }
}
;
$jscomp.polyfill("Array.prototype.find", function(a) {
    return a ? a : function(a, c) {
        return $jscomp.findInternal(this, a, c).v
    }
}, "es6-impl", "es3");
$jscomp.polyfill("Math.hypot", function(a) {
    return a ? a : function(a, c, d) {
        a = Number(a);
        c = Number(c);
        var b, f, h, k = Math.max(Math.abs(a), Math.abs(c));
        for (b = 2; b < arguments.length; b++)
            k = Math.max(k, Math.abs(arguments[b]));
        if (1E100 < k || 1E-100 > k) {
            a /= k;
            c /= k;
            h = a * a + c * c;
            for (b = 2; b < arguments.length; b++)
                f = Number(arguments[b]) / k,
                h += f * f;
            return Math.sqrt(h) * k
        }
        h = a * a + c * c;
        for (b = 2; b < arguments.length; b++)
            f = Number(arguments[b]),
            h += f * f;
        return Math.sqrt(h)
    }
}, "es6-impl", "es3");
$jscomp.checkStringArgs = function(a, b, c) {
    if (null == a)
        throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
    if (b instanceof RegExp)
        throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
    return a + ""
}
;
$jscomp.polyfill("String.prototype.includes", function(a) {
    return a ? a : function(a, c) {
        return -1 !== $jscomp.checkStringArgs(this, a, "includes").indexOf(a, c || 0)
    }
}, "es6-impl", "es3");
$jscomp.owns = function(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b)
}
;
$jscomp.polyfill("Object.assign", function(a) {
    return a ? a : function(a, c) {
        for (var b = 1; b < arguments.length; b++) {
            var e = arguments[b];
            if (e)
                for (var f in e)
                    $jscomp.owns(e, f) && (a[f] = e[f])
        }
        return a
    }
}, "es6-impl", "es3");
$jscomp.polyfill("String.prototype.endsWith", function(a) {
    return a ? a : function(a, c) {
        var b = $jscomp.checkStringArgs(this, a, "endsWith");
        a += "";
        void 0 === c && (c = b.length);
        for (var e = Math.max(0, Math.min(c | 0, b.length)), f = a.length; 0 < f && 0 < e; )
            if (b[--e] != a[--f])
                return !1;
        return 0 >= f
    }
}, "es6-impl", "es3");
$jscomp.polyfill("String.prototype.startsWith", function(a) {
    return a ? a : function(a, c) {
        var b = $jscomp.checkStringArgs(this, a, "startsWith");
        a += "";
        for (var e = b.length, f = a.length, h = Math.max(0, Math.min(c | 0, b.length)), k = 0; k < f && h < e; )
            if (b[h++] != a[k++])
                return !1;
        return k >= f
    }
}, "es6-impl", "es3");
$jscomp.polyfill("Array.prototype.fill", function(a) {
    return a ? a : function(a, c, d) {
        var b = this.length || 0;
        0 > c && (c = Math.max(0, b + c));
        if (null == d || d > b)
            d = b;
        d = Number(d);
        0 > d && (d = Math.max(0, b + d));
        for (c = Number(c || 0); c < d; c++)
            this[c] = a;
        return this
    }
}, "es6-impl", "es3");
$jscomp.array = $jscomp.array || {};
$jscomp.iteratorFromArray = function(a, b) {
    $jscomp.initSymbolIterator();
    a instanceof String && (a += "");
    var c = 0
      , d = {
        next: function() {
            if (c < a.length) {
                var e = c++;
                return {
                    value: b(e, a[e]),
                    done: !1
                }
            }
            d.next = function() {
                return {
                    done: !0,
                    value: void 0
                }
            }
            ;
            return d.next()
        }
    };
    d[Symbol.iterator] = function() {
        return d
    }
    ;
    return d
}
;
$jscomp.polyfill("Array.prototype.keys", function(a) {
    return a ? a : function() {
        return $jscomp.iteratorFromArray(this, function(a) {
            return a
        })
    }
}, "es6-impl", "es3");
function DecompressGraphics(a) {
            for (var b = [], c, d = 0; d < a.length; d++) {
                var e = a[d];
                if ("number" == typeof e)
                    for (; 0 < e; )
                        b.push(c),
                        e--;
                else
                    b.push(c = e)
            }
            return b
        }
function DecompressGraphicsEPA(a) {
    if (a.g2)
        return a.g2;
    for (var b = [], c = a.x || 0, d = a.y || 0, e = $jscomp.makeIterator(DecompressGraphics(a.g)), f = e.next(); !f.done; f = e.next())
        f = f.value,
        7 > f.length && (f = [f[0], f[1], f[2], f[3], f[4], f[5], c, d],
        c += f[0] + 1),
        b.push(f);
    delete a.g;
    delete a.x;
    delete a.y;
    return a.g2 = b
}
var STATIC_DIR = "/static/"
          , STATIC_DIR2 = STATIC_DIR
          , LOCATION_TYPE_UNKNOWN = 0
          , LOCATION_TYPE_CHANNEL = 1
          , LOCATION_TYPE_ROOM = 2
          , ROOM_TYPE_CHANNEL = 0
          , ROOM_TYPE_GAME = 1
          , ROOM_STATUS_WAITING = 0
          , ROOM_STATUS_FULL = 1
          , ROOM_STATUS_PLAYING = 2
          , GUI_LOCATION_CHANNEL = 1
          , GUI_LOCATION_ROOM = 2
          , GUI_LOCATION_GAME = 3
          , GUI_LOCATION_SHOP = 4
          , ITEM_NONE = -1
          , ITEM_DUAL = 0
          , ITEM_TELEPORT = 1
          , ITEM_DUAL_PLUS = 2
          , ITEM_CLASS = ["itemDual", "itemTeleport", "itemDualP"]
          , ITEM_NAME = ["Dual", "Teleport", "Dual+"]
          , ITEM_SIZE = [2, 2, 2]
          , DIR_LEFT = 0
          , DIR_RIGHT = 1
          , PLAYER_LOOK_LEFT = DIR_LEFT
          , PLAYER_LOOK_RIGHT = DIR_RIGHT
          , SHOT1 = 0
          , SHOT2 = 1
          , SHOTSS = 2
          , SHOT_TYPE = {
            S1: SHOT1,
            S2: SHOT2,
            SS: SHOTSS,
            ITEM: 3,
            PASS: 4
        }
          , AVATAR_TYPE_HEAD = "h"
          , AVATAR_TYPE_BODY = "b"
          , AVATAR_TYPE_EYES = "g"
          , AVATAR_TYPE_FLAG = "f"
          , AVATAR_TYPE_BACKGROUND = "1"
          , AVATAR_TYPE_FOREGROUND = "2"
          , AVATAR_TYPE_EXITEM = "x"
          , AVATAR_TYPE_TO_NUMBER = {
            h: 0,
            b: 1,
            g: 2,
            f: 3,
            1: 4,
            2: 5,
            x: 6
        }
          , AVATAR_TYPE_FROM_NUMBER = "hbgf12x".split("")
          , AVATAR_TYPE_TO_STRING = {
            h: "Head",
            b: "Body",
            g: "Glass",
            f: "Flag",
            1: "Background",
            2: "Foreground",
            x: "ExItem"
        }
          , AVATAR_NAKED_HEAD_MALE = 1
          , AVATAR_NAKED_BODY_MALE = 2
          , AVATAR_NAKED_HEAD_FEMALE = 3
          , AVATAR_NAKED_BODY_FEMALE = 4
          , AVATAR_INDEX_N = 0
          , AVATAR_INDEX_TYPE = 1
          , AVATAR_INDEX_GENDER = 2
          , AVATAR_INDEX_NAME = 3
          , AVATAR_INDEX_SHOP = 4
          , AVATAR_INDEX_NOTE = 5
          , AVATAR_INDEX_GOLD_WEEK = 6
          , AVATAR_INDEX_GOLD_MONTH = 7
          , AVATAR_INDEX_GOLD_PERM = 8
          , AVATAR_INDEX_CASH_WEEK = 9
          , AVATAR_INDEX_CASH_MONTH = 10
          , AVATAR_INDEX_CASH_PERM = 11
          , AVATAR_INDEX_STAT_POP = 12
          , AVATAR_INDEX_STAT_TIME = 13
          , AVATAR_INDEX_STAT_ATK = 14
          , AVATAR_INDEX_STAT_DEF = 15
          , AVATAR_INDEX_STAT_LIFE = 16
          , AVATAR_INDEX_STAT_ITEM = 17
          , AVATAR_INDEX_STAT_DIG = 18
          , AVATAR_INDEX_STAT_SHLD = 19
          , AVATAR_INDEX_GRAPHICS = 20
          , AVATAR_INDEX_GLOW = 21
          , AVATAR_INDEX_URL = 22
          , GAME_MODE_NORMAL = 0
          , GAME_MODE_BOSS = 1
          , GAME_MODE_SAME = 2
          , GAME_MODE_SCORE = 3
          , GAME_MODE_NAMES = ["NORMAL", "BOSS", "SAME", "SCORE"]
          , GAME_MODE_NAMES_LOWER = ["Normal", "Boss", "Same", "Score"]
          , GAME_MODES = GAME_MODE_NAMES.length
          , CHAT_TYPE_NORMAL = 0
          , CHAT_TYPE_DEAD = 2
          , CHAT_TYPE_GOLD = 3
          , CHAT_TYPE_POWER_USER = 4
          , CHAT_TYPE_GM = 5
          , CHAT_TYPE_SYSTEM = 6
          , CHAT_TYPE_BUGLE = 7
          , CHAT_TYPE_LOSE_LIFE = 8
          , CHAT_TYPE_GM_BUGLE = 9
          , CHAT_TYPE_NORMAL_TEAM = 10
          , CHAT_TYPE_POWER_USER_TEAM = 11
          , CHAT_TYPE_LOVE = 12
          , CHAT_TYPE_BREAK_UP = 13
          , CHAT_TYPE_AUDIO = 14
          , CHAT_TYPE_AUDIO_PU = 15
          , CHAT_TYPE_AUDIO_GM = 16
          , CHAT_TYPE_BOT = 17
          , CHAT_LENGTH_LIMIT = 150
          , GENDER_MALE = "m"
          , GENDER_FEMALE = "f"
          , GENDER_ALL = "a"
          , GENDER_FROM_NUMBER = ["m", "f", "a"]
          , GENDER_TO_STRING = {
            m: "Male",
            f: "Female",
            a: "All"
        }
          , TEAM_A = 0
          , TEAM_B = 1
          , TIE = 2
          , MS_IN_1_HOUR = 36E5
          , MS_IN_1_DAY = 24 * MS_IN_1_HOUR
          , RANK_GM = 26
          , RANK_MOD = 27
          , RANK_BRONE_CUP = 28
          , RANK_SILVER_CUP = 29
          , RANK_GOLD_CUP = 30
          , RANK_VIP = 31
          , MAX_RANK = RANK_VIP
          , WEATHER_THOR = 0
          , WEATHER_WIND_CHANGE = 1
          , WEATHER_NOITEMS = 2
          , WEATHER_SUN = 3
          , WEATHER_LIGHTNING = 4
          , WEATHER_BLACK = 5
          , WEATHER_RANDOM = 6
          , WEATHER_MIRROR = 7
          , WEATHER_TORNADO = 8
          , WEATHER_NONE = 9
          , WEATHER_MOON = 10
          , WEATHER_LAND = 11
          , WEATHER_NAME = [];
        WEATHER_NAME[WEATHER_LIGHTNING] = "Lightning";
        WEATHER_NAME[WEATHER_SUN] = "Force";
        WEATHER_NAME[WEATHER_BLACK] = "Black";
        WEATHER_NAME[WEATHER_TORNADO] = "Tornado";
        WEATHER_NAME[WEATHER_RANDOM] = "Random";
        WEATHER_NAME[WEATHER_MIRROR] = "Mirror";
        var SUDDEN_DEATH_DOUBLE = 1
          , SUDDEN_DEATH_BIGBOMB = 2
          , SUDDEN_DEATH_SS = 3
          , MOBILE = {
            ARMOR: 0,
            ICE: 1,
            ADUKA: 2,
            LIGHTNING: 3,
            BIGFOOT: 4,
            JD: 5,
            ASATE: 6,
            RANDOM: 7,
            KNIGHT: 8,
            FOX: 9,
            DRAGON: 10,
            NAK: 11,
            TRICO: 12,
            MAGE: 13,
            TURTLE: 14,
            BOOMER: 15,
            ELECTRICO: 16,
            GRUB: 17,
            DRAGON2: 18,
            RAON: 19,
            RANDOMIZER: 20,
            FROG: 21,
            KALSIDDON: 22
        };
var ANIMATIONS_FPS = 10
, MOBILE_FPS = 20;

var GRAPHICS_INDEX_WIDTH = 0
          , GRAPHICS_INDEX_HEIGHT = 1
          , GRAPHICS_INDEX_CENTER_X = 2
          , GRAPHICS_INDEX_CENTER_Y = 3
          , GRAPHICS_INDEX_OFFSET_X = 4
          , GRAPHICS_INDEX_OFFSET_Y = 5
          , LOOP_ONCE = 0
          , LOOP_NORMAL = 1
          , LOOP_NORMAL_AND_REVERSE = 2
          , LOOP_SINGLE_FRAME = 3
          , LOOP_AVATAR = 4
          , LOOP_AVATAR_NO_REVERSE = 5
          , LOOP_AVATAR_SPECIAL_44 = 6
          , LOOP_ONCE_AND_STOP_AT_LAST_FRAME = 7
          , RANDOM_FACE_TURN_CHANCE = 6;
        function CAnimatedObject2(a, b, c, d, e, f, h, k, m, n, p, q, r, t, u, x) {
            var v = this;
            u || Array.isArray(b) || (u = b);
            this.loop_type = m;
            this.is_flip = k;
            this.frame_time = 1E3 / h;
            this.is_special = !1;
            this.z_index = p;
            this.change_z_when_special = r;
            this.is_animate = q && this.loop_type != LOOP_SINGLE_FRAME;
            this.epa = u || {
                normal: {
                    g: b
                }
            };
            -1 == a.indexOf(":") && (a = STATIC_DIR + "images/" + a);
            this.filename = a;
            this.ChangeEpaAnim(x || "normal");
            this.total_time = 0;
            this.div = $("<div/>").addClass("AniObject" + (this.is_flip ? " FlipH" : "")).css({
                position: "absolute",
                left: c,
                top: d,
                zoom: 1,
                opacity: f,
                "z-index": p,
                "background-image": "url(" + a + ")",
                "background-repeat": "no-repeat",
                "background-color": "transparent"
            }).appendTo(e);
            void 0 !== t && (this.black_at = t,
            GetBlackImage(a, function(a) {
                v.blackUrl = a;
                0 === t && (v.black_at = void 0,
                v.div.css({
                    "background-image": "url(" + v.blackUrl + ")"
                }))
            }));
            this.set_frame(0);
            this.is_animate && (DragonClock.Add(this),
            g_dragonClock.StartLoop())
        }
        CAnimatedObject2.prototype.Update = function(a) {
            this.total_time += a;
            a = Math.floor(this.total_time / this.frame_time);
            void 0 != this.black_at && this.total_time > this.black_at && this.blackUrl && (this.black_at = void 0,
            this.div.css({
                "background-image": "url(" + this.blackUrl + ")"
            }));
            this.set_frame(a)
        }
        ;
        CAnimatedObject2.prototype.ChangeEpaAnim = function(a, b) {
            if (this.curAnim != a) {
                var c = this.epa[a];
                if (!c)
                    return console.log("Missing epa anim", a);
                c.d && (a = c.d,
                c = this.epa[a]);
                this.curAnim = a;
                this.graphics = DecompressGraphicsEPA(c);
                this.frames = this.graphics.length;
                this.nextAnim = b;
                this.minusFrames = this.curFrame || 0
            }
        }
        ;
        CAnimatedObject2.prototype.SetFlip = function(a) {
            this.is_flip = a = !!a;
            this.div.toggleClass("FlipH", a)
        }
        ;
        CAnimatedObject2.prototype.set_frame = function(a, b) {
            this.curFrame = a;
            a -= this.minusFrames;
            a = this.GetFrameNumber(a, b);
            if (null === a)
                return this.remove();
            if (void 0 == this.graphics[a])
                return console.log(this.filename, "MISSING FRAME Frame " + a, ":", "frames:", this.frames, "loop_type:", this.loop_type, "graphics:", this.graphics, "this:", this);
            var c = $jscomp.makeIterator(this.graphics[a])
              , d = c.next().value
              , e = c.next().value
              , f = c.next().value
              , h = c.next().value
              , k = c.next().value
              , m = c.next().value
              , n = c.next().value
              , c = c.next().value
              , d = {
                "background-position": -n + "px " + -c + "px",
                width: d,
                height: e,
                "margin-left": this.is_flip ? f - d : -f,
                "margin-top": -h
            };
            this.change_z_when_special && (d["z-index"] = this.is_special ? this.z_index + this.change_z_when_special : this.z_index);
            this.div.css(d);
            this.holdSpotX = k;
            this.holdSpotY = m;
            this.centerX = f;
            this.centerY = h
        }
        ;
        CAnimatedObject2.prototype.remove = function() {
            this.interval && (this.interval = clearInterval(this.interval));
            this.div.remove();
            this.is_animate && DragonClock.Remove(this)
        }
        ;
        CAnimatedObject2.prototype.change_pos = function(a, b) {
            this.div.css({
                left: a,
                top: b
            })
        }
        ;
        CAnimatedObject2.prototype.GetFrameNumber = function(a, b) {
            if (1 >= this.frames)
                a = 0;
            else if (this.loop_type == LOOP_ONCE) {
                if (a >= this.frames)
                    return null
            } else if (this.loop_type == LOOP_ONCE_AND_STOP_AT_LAST_FRAME)
                a >= this.frames && (a = this.frames - 1);
            else if (this.loop_type == LOOP_NORMAL)
                this.nextAnim && a >= this.frames ? (this.ChangeEpaAnim(this.nextAnim),
                a = 0) : a %= this.frames;
            else if (this.loop_type == LOOP_NORMAL_AND_REVERSE) {
                var c = 2 * this.frames - 2;
                a %= c;
                a >= this.frames && (a = c - a)
            } else if (this.loop_type == LOOP_AVATAR) {
                if (void 0 == b) {
                    c = Math.floor(a / (this.frames - 2));
                    if (void 0 == this.turn_cycle || c > this.turn_cycle)
                        this.turn_cycle = random(c, c + RANDOM_FACE_TURN_CHANCE);
                    this.is_special = c == this.turn_cycle
                } else
                    this.is_special = b;
                var c = this.frames / 2
                  , d = 2 * c - 2;
                this.is_special ? (a %= d,
                a >= c && (a = d - a)) : (a %= d,
                a >= c && (a = d - a),
                a += c)
            } else if (this.loop_type == LOOP_AVATAR_NO_REVERSE) {
                if (void 0 == b) {
                    c = Math.floor(a / this.frames);
                    if (void 0 == this.turn_cycle || c > this.turn_cycle)
                        this.turn_cycle = random(c, c + RANDOM_FACE_TURN_CHANCE);
                    this.is_special = c == this.turn_cycle
                } else
                    this.is_special = b;
                c = this.frames / 2;
                a = this.is_special ? a % c : a % c + c
            } else if (this.loop_type == LOOP_AVATAR_SPECIAL_44) {
                if (void 0 == b) {
                    c = Math.floor(a / 20);
                    if (void 0 == this.turn_cycle || c > this.turn_cycle)
                        this.turn_cycle = random(c, c + RANDOM_FACE_TURN_CHANCE);
                    this.is_special = c == this.turn_cycle
                } else
                    this.is_special = b;
                this.is_special ? a = a % 20 + 1 : (a %= 20,
                11 <= a && (a = 20 - a),
                a += 33)
            }
            return a
        }
        ;

function AnimatedSprite(a, b, c, d, e, f, h, k, m, n, p, q, r, t) {
            var u = this;
            this.loop_type = h;
            this.is_flip = f;
            this.frame_time = 1E3 / e;
            this.is_special = !1;
            this.pos_x = c;
            this.pos_y = d;
            this.z = this.z_index = k;
            this.change_z_when_special = p;
            this.anchor_x = this.anchor_y = this.total_elapsed_time = this.current_frame = 0;
            this.is_self_clock = m;
            this.is_half_size = n;
            this.epa = r || {
                normal: {
                    g: b
                }
            };
            -1 == a.indexOf(":") && (a = STATIC_DIR + "images/" + a);
            this.filename = a;
            this.textures = {};
            // this.mainTexture = GetTexture(a);
            this.ChangeEpaAnim(t || "normal");
            void 0 !== q && (this.black_at = q,
            GetBlackTexture(a, function(a) {
                u.mainTextureblack = a;
                0 === q && u.Update(0)
            }));
            //PIXI.Sprite.call(this, this.mainTexture);
            this.set_frame(0);
            m && DragonClock.Add(this)
        }
        AnimatedSprite.constructor = AnimatedSprite;
        //AnimatedSprite.prototype = Object.create(PIXI.Sprite.prototype);
        AnimatedSprite.prototype.ChangeEpaAnim = CAnimatedObject2.prototype.ChangeEpaAnim;
        AnimatedSprite.prototype.SetTextureForFrame = function(a) {
            if (!this.textures[this.curAnim]) {
                this.textures[this.curAnim] = [];
                for (var b = $jscomp.makeIterator(this.graphics), c = b.next(); !c.done; c = b.next()) {
                    var d = $jscomp.makeIterator(c.value)
                      , c = d.next().value
                      , e = d.next().value;
                    d.next();
                    d.next();
                    d.next();
                    d.next();
                    var f = d.next().value
                      , d = d.next().value;
                    this.is_half_size && (e /= 2,
                    c /= 2,
                    f /= 2);
                    // this.textures[this.curAnim].push(new PIXI.Texture(this.mainTexture,new PIXI.Rectangle(f,d,c,e)))
                }
            }
            this.textures[this.curAnim][a] ? this.setTexture(this.textures[this.curAnim][a]) : console.log("Missing texture for frame", a, this.curAnim)
        }
        ;
        AnimatedSprite.prototype.Update = function(a, b) {
            if (void 0 != this.move_speed) {
                var c = a * this.move_speed / 1E3, d;
                void 0 != this.target_pos_x && this.pos_x != this.target_pos_x && (this.pos_x = GetCloserToTargetValue(this.pos_x, c, this.target_pos_x),
                d = !0);
                void 0 != this.target_pos_y && this.pos_y != this.target_pos_y && (this.pos_y = GetCloserToTargetValue(this.pos_y, c, this.target_pos_y),
                d = !0);
                d && this._UpdatedPos()
            }
            void 0 != this.rotate_speed && (c = a * this.rotate_speed / 1E3,
            void 0 != this.target_rotate && this.rotation != this.target_rotate && (this.rotation = GetCloserToTargetValue(this.rotation, c, this.target_rotate)));
            this.total_elapsed_time += a;
            void 0 != this.black_at && this.total_elapsed_time >= this.black_at && this.mainTextureblack && (this.black_at = void 0,
            this.mainTexture = this.mainTextureblack,
            this.textures = {},
            1 == this.frames && this.SetTextureForFrame(0));
            if (!(1 >= this.frames) && (c = floor(this.total_elapsed_time / this.frame_time),
            c != this.current_frame))
                return this.current_frame = c,
                this.set_frame(c, b)
        }
        ;
        AnimatedSprite.prototype.GetFrameNumber = CAnimatedObject2.prototype.GetFrameNumber;
        AnimatedSprite.prototype.set_frame = function(a, b) {
            this.curFrame = a;
            a -= this.minusFrames;
            a = this.GetFrameNumber(a, b);
            if (null === a)
                return this.Remove();
            if (void 0 == this.graphics[a])
                return console.log(this.filename, "MISSING FRAME Frame " + a, ":", "frames:", this.frames, "loop_type:", this.loop_type, "graphics:", this.graphics, "this:", this);
            var c = $jscomp.makeIterator(this.graphics[a]);
            c.next();
            c.next();
            var d = c.next().value
              , e = c.next().value
              , f = c.next().value
              , h = c.next().value;
            c.next();
            c.next();
            this.centerX = this.is_flip ? -d : d;
            this.centerY = e;
            this.SetTextureForFrame(a);
            this.position.x = this.pos_x - d;
            this.position.y = this.pos_y - e;
            this.scale.x = this.is_flip ? -1 : 1;
            this.is_half_size && (this.scale.x *= 2,
            this.scale.y = 2);
            this.holdSpotX = f;
            this.holdSpotY = h;
            if (this.change_z_when_special && (c = this.is_special ? this.z_index + this.change_z_when_special : this.z_index,
            this.z != c))
                return this.z = c,
                9
        }
        ;
        AnimatedSprite.prototype._UpdatedPos = function() {
            var a = this.pos_x - this.centerX
              , b = this.pos_y - this.centerY;
            if (a != this.position.x || b != this.position.y)
                if (this.position.x = a,
                this.position.y = b,
                this.onChangePositionCallback)
                    this.onChangePositionCallback(a, b)
        }
        ;
        AnimatedSprite.prototype.change_pos = function(a, b) {
            this.pos_x = a + this.anchor_x;
            this.pos_y = b + this.anchor_y;
            this._UpdatedPos()
        }
        ;
        AnimatedSprite.prototype.Remove = function() {
            this.is_self_clock && DragonClock.Remove(this);
            this.parent && this.parent.removeChild(this)
        }
        ;
        AnimatedSprite.prototype.SetSpeed = function(a, b) {
            this.move_speed = a;
            this.rotate_speed = AngleToRad(b)
        }
        ;
        AnimatedSprite.prototype.MoveTo = function(a, b, c, d) {
            this.target_pos_x = a + this.anchor_x;
            this.target_pos_y = b + this.anchor_y;
            this.target_rotate = AngleToRad(c);
            d ? this.rotation = this.target_rotate : (a = RadToAngle(this.rotation),
            a < c - 180 ? this.rotation += 2 * Math.PI : a > c + 180 && (this.rotation -= 2 * Math.PI))
        }
        ;
        AnimatedSprite.prototype.SetAnchor = function(a, b) {
            this.anchor_x = a;
            this.anchor_y = b;
            this.anchor.x = a / this.graphics[0][GRAPHICS_INDEX_WIDTH];
            this.anchor.y = b / this.graphics[0][GRAPHICS_INDEX_HEIGHT]
        }
        ;
        AnimatedSprite.prototype.OnChangePosition = function(a) {
            this.onChangePositionCallback = a
        }
        ;


// test