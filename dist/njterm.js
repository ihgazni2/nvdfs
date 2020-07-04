"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.show_sedfs = exports.dflt_sedfs_show_connd = exports.show_sdfs_with_tag = exports.show_sdfs_with_id = exports.show_sdfs1 = exports.show_sdfs0 = exports.get_sdfs_repr_arr = exports.dflt_sdfs_calc_conns = exports.dflt_sdfs_show_connd = void 0;
var njfunc = __importStar(require("./njfunc"));
var dflt_sdfs_show_connd = {
    't': '├── ',
    'v': '│   ',
    'l': '└── ',
    'ws': '    '
};
exports.dflt_sdfs_show_connd = dflt_sdfs_show_connd;
function dflt_calc_conn_map_func(conn) {
    var rslt;
    if (conn === 't') {
        rslt = 'v';
    }
    else if (conn === 'v') {
        rslt = 'v';
    }
    else {
        rslt = 'ws';
    }
    return (rslt);
}
function conns2repr(conns, show_connd) {
    if (show_connd === void 0) { show_connd = dflt_sdfs_show_connd; }
    conns = conns.map(function (conn) { return show_connd[conn]; });
    return (conns.join(''));
}
function clear$ui(njarr) {
    njarr.forEach(function (nj) {
        delete nj.$ui;
    });
    return (njarr);
}
function dflt_sdfs_calc_conns(njarr, nj) {
    nj.$ui = {};
    if (njfunc.is_root(nj)) {
        //跟节点没有前导ui 符号
        nj.$ui.conns = [];
        nj.$ui.display = true;
    }
    else {
        var parent_1 = njfunc.get_parent(njarr, nj);
        //获取父节点的前导ui 符号序列数组
        var pconns = void 0;
        pconns = parent_1.$ui.conns;
        var conns = pconns.map(function (conn) { return dflt_calc_conn_map_func(conn); });
        var conj = njfunc.is_lstch(nj);
        if (conj) {
            conns.push('l');
        }
        else {
            conns.push('t');
        }
        nj.$ui.conns = conns;
        nj.$ui.display = true;
    }
    return (nj);
}
exports.dflt_sdfs_calc_conns = dflt_sdfs_calc_conns;
function dflt_sdfs_show_callback(sdfs, conns, i, k) {
    var s = (conns + '[' + i + ']' + ' : ' + sdfs[i][k]);
    return (s);
}
function get_sdfs_repr_arr(njarr, nj, k, cb) {
    if (k === void 0) { k = '_id'; }
    if (cb === void 0) { cb = dflt_sdfs_show_callback; }
    var depth = njfunc.get_depth(njarr, nj);
    var sdfs = njfunc.get_deses(njarr, nj, true);
    sdfs = sdfs.map(function (nj) { return dflt_sdfs_calc_conns(njarr, nj); });
    var conns_array = sdfs.map(function (nj) { return nj.$ui.conns; });
    conns_array = conns_array.map(function (conns) { return conns.slice(depth); });
    conns_array = conns_array.map(function (conns) { return conns2repr(conns, dflt_sdfs_show_connd); });
    var arr = conns_array.map(function (conns, i) { return cb(sdfs, conns, i, k); });
    arr = arr.filter(function (r, i) { return (sdfs[i].$ui.display === true); });
    return (arr);
}
exports.get_sdfs_repr_arr = get_sdfs_repr_arr;
function show_sdfs0(njarr, k, nj, cb) {
    if (k === void 0) { k = '_id'; }
    if (cb === void 0) { cb = dflt_sdfs_show_callback; }
    if (nj === undefined) {
        nj = njfunc.get_root(njarr);
    }
    else {
    }
    var sdfs = njfunc.get_sdfs(njarr, nj);
    var sharr = get_sdfs_repr_arr(njarr, nj, k, cb);
    sharr.forEach(function (r) { return console.log(r); });
}
exports.show_sdfs0 = show_sdfs0;
function show_sdfs1(njarr, nj, k, cb) {
    if (k === void 0) { k = '_id'; }
    if (cb === void 0) { cb = dflt_sdfs_show_callback; }
    if (nj === undefined) {
        nj = njfunc.get_root(njarr);
    }
    else {
    }
    var sdfs = njfunc.get_sdfs(njarr, nj);
    var sharr = get_sdfs_repr_arr(njarr, nj, k, cb);
    sharr.forEach(function (r) { return console.log(r); });
}
exports.show_sdfs1 = show_sdfs1;
function show_sdfs_with_tag(njarr, nj) {
    if (nj === void 0) { nj = undefined; }
    show_sdfs1(njarr, nj, 'tag', dflt_sdfs_show_callback);
}
exports.show_sdfs_with_tag = show_sdfs_with_tag;
function show_sdfs_with_id(njarr, nj) {
    if (nj === void 0) { nj = undefined; }
    show_sdfs1(njarr, nj, '_id', dflt_sdfs_show_callback);
}
exports.show_sdfs_with_id = show_sdfs_with_id;
////
function get_edfs_repr_arr(njarr, nj, k, cb) {
    if (k === void 0) { k = '_id'; }
    if (cb === void 0) { cb = dflt_sdfs_show_callback; }
    var depth = njfunc.get_depth(njarr, nj);
    var edfs = njfunc.get_edfs(njarr, nj);
    edfs.reverse();
    edfs = edfs.map(function (nj) { return dflt_sdfs_calc_conns(njarr, nj); });
    edfs.reverse();
    var conns_array = edfs.map(function (nj) { return nj.$ui.conns; });
    conns_array = conns_array.map(function (conns) { return conns.slice(depth); });
    conns_array = conns_array.map(function (conns) { return conns2repr(conns, dflt_sdfs_show_connd); });
    var arr = conns_array.map(function (conns, i) { return cb(edfs, conns, i, k); });
    arr = arr.filter(function (r, i) { return (edfs[i].$ui.display === true); });
    return (arr);
}
////
var dflt_sedfs_show_connd = {
    indent: '    ',
    stag_prefix: '<',
    stag_suffix: '>',
    etag_prefix: '</',
    etag_suffix: '>',
};
exports.dflt_sedfs_show_connd = dflt_sedfs_show_connd;
function gen_tag(tag, prefix, suffix) {
    return (prefix + tag + suffix);
}
function show_sedfs(njarr, nj, k, show_connd) {
    if (nj === void 0) { nj = undefined; }
    if (k === void 0) { k = '_id'; }
    if (show_connd === void 0) { show_connd = dflt_sedfs_show_connd; }
    if (nj === undefined) {
        nj = njfunc.get_root(njarr);
    }
    else {
    }
    var sedfs = njfunc.get_sedfs(njarr, nj);
    var depths = sedfs.map(function (nj) { return njfunc.get_depth(njarr, nj); });
    var depth = njfunc.get_depth(njarr, nj);
    var indents = depths.map(function (r) { return show_connd.indent.repeat(r - depth); });
    var tags = sedfs.map(function (nj) {
        if (nj.$visited === false) {
            nj.$visited = true;
            return (gen_tag(nj[k], show_connd.stag_prefix, show_connd.stag_suffix));
        }
        else {
            return (gen_tag(nj[k], show_connd.etag_prefix, show_connd.etag_suffix));
        }
    });
    var lines = tags.map(function (tag, i) { return (indents[i] + tag); });
    var repr = lines.join('\n');
    console.log(repr);
}
exports.show_sedfs = show_sedfs;
