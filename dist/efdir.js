"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
function rjson(fn) {
    var buf = fs.readFileSync(fn);
    var s = buf.toString();
    var d = JSON.parse(s);
    return (d);
}
exports.rjson = rjson;
function wjson(fn, js) {
    var s = JSON.stringify(js);
    fs.writeFileSync(fn, s);
}
exports.wjson = wjson;
