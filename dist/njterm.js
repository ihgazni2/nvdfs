"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dflt_sdfs_show_connd = {
    't': '├── ',
    'v': '│   ',
    'l': '└── ',
    'ws': '    '
};
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
function clear_ui(njarr) {
    njarr.forEach(function (nj) {
        delete nj.$ui;
    });
    return (njarr);
}
//dflt_sdfs_calc_conns
