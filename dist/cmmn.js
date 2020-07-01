"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gen_guid = exports.dtb_get_seq_via_id = exports.dtb_get_seq_via_kv = exports.dtb_rm_via_id = exports.dtb_rm_via_kv = exports.dtb_get_val_via_id_and_key = exports.dtb_get_tr_via_id = exports.dtb_get_fst_tr_via_kv = exports.dtb_get_tr_via_kv = exports.dict_update = exports.dict_update_force = exports.dict_mapv = exports.dict_mapk = exports.dict_foreach = exports.dict_values = exports.dict_keys = exports.is_empty_dict = exports.dict_length = exports.mat_mapxyv = exports.mat_mapv = exports.array_min = exports.array_max = exports.array_lst = exports.slct_via_seqs = exports.range = exports.is_int_str = exports.dcp = void 0;
//copy
function dcp(o) {
    return (JSON.parse(JSON.stringify(o)));
}
exports.dcp = dcp;
//string
function is_int_str(s) {
    var n = parseInt(s);
    var ns = n.toString();
    return (ns === s);
}
exports.is_int_str = is_int_str;
//array
function range(si, ei) {
    return (Array.from({ length: ei - si }).map(function (v, i) { return i + si; }));
}
exports.range = range;
function slct_via_seqs(arr) {
    var seqs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        seqs[_i - 1] = arguments[_i];
    }
    return (arr.filter(function (r, i) { return (seqs.includes(i)); }));
}
exports.slct_via_seqs = slct_via_seqs;
function array_lst(arr) {
    var lsti = arr.length - 1;
    return (arr[lsti]);
}
exports.array_lst = array_lst;
function array_max(arr) {
    return (Math.max.apply(Math, arr));
}
exports.array_max = array_max;
function array_min(arr) {
    return (Math.min.apply(Math, arr));
}
exports.array_min = array_min;
//mat
function mat_mapxyv(m, map_func) {
    for (var i = 0; i < m.length; i++) {
        var lyr = m[i];
        for (var j = 0; j < lyr.length; j++) {
            m[i][j] = map_func(i, j, m[i][j]);
        }
    }
    return (m);
}
exports.mat_mapxyv = mat_mapxyv;
function mat_mapv(m, map_func) {
    for (var i = 0; i < m.length; i++) {
        var lyr = m[i];
        for (var j = 0; j < lyr.length; j++) {
            m[i][j] = map_func(m[i][j]);
        }
    }
    return (m);
}
exports.mat_mapv = mat_mapv;
//dict
function dict_length(d) {
    return (Object.entries(d).length);
}
exports.dict_length = dict_length;
function is_empty_dict(d) {
    return (Object.entries(d).length === 0);
}
exports.is_empty_dict = is_empty_dict;
function dict_keys(d) {
    var entries = Object.entries(d);
    var keys = entries.map(function (r) { return r[0]; });
    return (keys);
}
exports.dict_keys = dict_keys;
function dict_values(d) {
    var entries = Object.entries(d);
    var values = entries.map(function (r) { return r[1]; });
    return (values);
}
exports.dict_values = dict_values;
function dict_foreach(d, f) {
    for (var k in d) {
        f(k, d[k]);
    }
    return (d);
}
exports.dict_foreach = dict_foreach;
function dict_mapv(d, f) {
    for (var k in d) {
        d[k] = f(k, d[k]);
    }
    return (d);
}
exports.dict_mapv = dict_mapv;
function dict_mapk(d, f) {
    var nd = {};
    for (var k in d) {
        var nk = f(k, d[k]);
        nd[nk] = d[k];
    }
    return (nd);
}
exports.dict_mapk = dict_mapk;
function dict_update_force(d0, d1) {
    //unique k ,no common k
    for (var k in d1) {
        d0[k] = d1[k];
    }
    return (d0);
}
exports.dict_update_force = dict_update_force;
function dict_update(d0, d1) {
    //unique k ,no common k
    for (var k in d1) {
        var cond = !(k in d0);
        if (cond) {
            d0[k] = d1[k];
        }
    }
    return (d0);
}
exports.dict_update = dict_update;
//dtb
function dtb_get_tr_via_kv(dtb, k, v) {
    var l = dtb.filter(function (tr) { return tr[k] === v; });
    return (l);
}
exports.dtb_get_tr_via_kv = dtb_get_tr_via_kv;
function dtb_get_fst_tr_via_kv(dtb, k, v) {
    var l = dtb_get_tr_via_kv(dtb, k, v);
    if (l.length > 0) {
        return (l[0]);
    }
    else {
        return (undefined);
    }
}
exports.dtb_get_fst_tr_via_kv = dtb_get_fst_tr_via_kv;
function dtb_get_tr_via_id(dtb, _id) {
    return (dtb_get_fst_tr_via_kv(dtb, '_id', _id));
}
exports.dtb_get_tr_via_id = dtb_get_tr_via_id;
function dtb_get_val_via_id_and_key(dtb, _id, k) {
    var tr = dtb_get_tr_via_id(dtb, _id);
    return (tr[k]);
}
exports.dtb_get_val_via_id_and_key = dtb_get_val_via_id_and_key;
function dtb_rm_via_kv(dtb, k, v) {
    dtb = dtb.filter(function (r) { return (r[k] !== v); });
    return (dtb);
}
exports.dtb_rm_via_kv = dtb_rm_via_kv;
function dtb_rm_via_id(dtb, _id) {
    dtb = dtb_rm_via_kv(dtb, '_id', _id);
    return (dtb);
}
exports.dtb_rm_via_id = dtb_rm_via_id;
function dtb_get_seq_via_kv(dtb, k, v) {
    var seq = dtb.findIndex(function (r) { return r[k] === v; });
    return (seq);
}
exports.dtb_get_seq_via_kv = dtb_get_seq_via_kv;
function dtb_get_seq_via_id(dtb, _id) {
    var seq = dtb.findIndex(function (r) { return r['_id'] === _id; });
    return (seq);
}
exports.dtb_get_seq_via_id = dtb_get_seq_via_id;
//
function gen_guid() {
    var s = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return (v.toString(16));
    });
    s = s + '@' + (new Date()).getTime();
    return (s);
}
exports.gen_guid = gen_guid;
