(()=>{"use strict";var e={n:o=>{var t=o&&o.__esModule?()=>o.default:()=>o;return e.d(t,{a:t}),t},d:(o,t)=>{for(var n in t)e.o(t,n)&&!e.o(o,n)&&Object.defineProperty(o,n,{enumerable:!0,get:t[n]})},o:(e,o)=>Object.prototype.hasOwnProperty.call(e,o)};const o=require("express");var t=e.n(o),n=t().Router();n.get("",(function(e,o,t){o.send("HELLO, I'm Healthy!")}));const r=require("mysql");var a=e.n(r)().createConnection({host:"quizmydb.cpiwaee4eftz.ap-northeast-2.rds.amazonaws.com",user:"quizmy",password:"eksrufthgkr2024!",database:"QuizmyDB"}),s=t()();a.connect(),a.query("SELECT * from User",(function(e,o,t){if(e)throw e;console.log("TEST")})),s.get("/",(function(e,o){o.send("Hello World")})),s.use("/health",n),s.listen(3e3,(function(){console.log("Example app listening on port ".concat(3e3))}))})();