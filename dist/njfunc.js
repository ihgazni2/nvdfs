"use strict";
/*
 * this version is guid version
 *
 * nj                json-node
 * njarr             tree-array-not-in-xdfs-order
 * sdfs              whole-tree-array-of-nj-in-depth-first-traverse
 * edfs
 * sedfs             open-tag-close-tag-order
 * subsdfs           subtree-array-of-nj-in-depth-first-traverse
 * rj                json-root-node
 * chnj              child-node
 *
 * fstch             first-child
 * lstch             last-child
 * midch             middle-child
 *
 * sibs              siblings-including_self
 * psibs             preceding-siblings
 * fsibs             following-siblings
 * fstsib            first-sibling
 * lstsib            last-sibling
 * lsib              left-sibling
 * rsib              right-sibling
 * sibseq            index-in-siblings-including_self
 *
 * connectable       could-be-connected-to-other-node;
 *                   which means root or uninited;
 *                   other-node must be disconn-from-curr-tree first
 *                   before conn-to-other-node
 *
 * des               descedant
 * fstlyr_deses      first-layer-descedants
 * fstlyr_deses      last-layer-descedants
 * deses             descedants
 * drmost            down-most-and-right-most-descedant
 * dlmost            down-most-and-left-most-descedant
 *
 *
 * lyr               layer-of-descedants
 * fstlyr            first-layer-of-descedants
 * lstlyr            last-layer-of-descedants
 *
 * lonely            have-no-sibling
 *
 * $visited          used-by-sedfs(open-close-tag)-traverse
 *                   temp property, should be deleted after using
 *
 * $ui               used-by-sedfs(open-close-tag)-term-show
 *                   temp property, should be deleted after using
 *
 *
 */
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_nj_via_depth_and_breadth = exports.sedfs2edfs = exports.sedfs2mat = exports.sedfs2sdfs = exports.edfs2sedfs = exports.edfs2mat = exports.edfs2sdfs = exports.sdfs2sedfs = exports.sdfs2edfs = exports.sdfs2mat = exports.nj2ele = exports.njarr2sdfs = exports.rm_all_children = exports.rm_some_children = exports.rm_which_child = exports.rm_lstch = exports.rm_fstch = exports.disconnect = exports.uninitize = exports.rootize_tree = exports.rootize = exports.leafize = exports.update_depth_when_disconnected = exports.update_tree_when_disconnected = exports.insert_child_tree_after = exports.insert_child_tree_before = exports.insert_child_tree_via_index = exports.add_lsib_tree = exports.add_rsib_tree = exports.append_child_tree = exports.prepend_child_tree = exports.update_depth_via_connto_nj = exports.update_tree_via_connto_nj = exports.add_lsib = exports.add_rsib = exports.insert_child_before = exports.insert_child_after = exports.insert_child_via_index = exports.append_child = exports.prepend_child = exports.get_sedfs = exports.is_sedfs_traverse_finished = exports.get_sedfs_prev = exports.get_sedfs_next = exports.clear_$visited = exports.get_edfs = exports.get_edfs_prev = exports.get_edfs_next = exports.get_sdfs = exports.get_sdfs_prev = exports.get_sdfs_next = exports.get_height = exports.get_count = exports.get_breadth = exports.get_depth = exports.get_which_lyr_des_depth = exports.get_lstlyr_des_depth = exports.get_fstlyr_des_depth = exports.get_lyr = exports.get_some_lyrs_deses = exports.get_which_lyr_deses = exports.get_lstlyr_deses = exports.get_fstlyr_deses = exports.get_deses = exports.get_dlmost_des = exports.get_drmost_des = exports.get_some_ances = exports.get_which_ance = exports.get_ances = exports.get_root = exports.get_parent = exports.get_lsib_of_fst_ance_having_lsib = exports.get_rsib_of_fst_ance_having_rsib = exports.get_some_sibs = exports.get_which_sib = exports.get_sibseq = exports.get_fstsib = exports.get_fsibs = exports.get_psibs = exports.get_sibs = exports.get_lsib = exports.get_lstsib = exports.get_rsib = exports.get_some_children = exports.get_which_child = exports.get_children = exports.get_lstch = exports.get_fstch = exports.get_sdfs_seq_via_id = exports.get_nj_via_id_from_njarr = exports.is_lonely = exports.is_connectable = exports.is_leaf = exports.is_midch = exports.is_lstch = exports.is_fstch = exports.is_root = exports.is_inited = exports.creat_sdfs = exports.creat_nj = exports.creat_rj = void 0;
var cmmn = __importStar(require("./cmmn"));
var idfunc = __importStar(require("./idfunc"));
function creat_rj() {
    ////    
    //// creat_rj()
    ////    
    var _id = idfunc.gen_id({});
    var rj = {
        _id: _id,
        _fstch: null,
        _lsib: null,
        _rsib: null,
        _parent: null,
        _depth: 0,
        _tree: _id,
    };
    return (rj);
}
exports.creat_rj = creat_rj;
function creat_nj() {
    ////
    //// creat_nj()  not-inited
    ////
    var _id = idfunc.gen_id({});
    var nj = {
        _id: _id,
        _fstch: null,
        _lsib: null,
        _rsib: null,
        _parent: null,
        _depth: 0,
        _tree: undefined,
    };
    return (nj);
}
exports.creat_nj = creat_nj;
function creat_sdfs() {
    var rj = creat_rj();
    var sdfs = [rj];
    return (sdfs);
}
exports.creat_sdfs = creat_sdfs;
//is
function is_inited(nj) {
    ////attached-to-a-tree
    var cond = (nj._tree !== undefined);
    return (cond);
}
exports.is_inited = is_inited;
function is_root(nj) {
    //_tree is self._id
    var cond0 = (nj._tree !== undefined);
    var cond1 = (nj._tree === nj._id);
    return (cond0 && cond1);
}
exports.is_root = is_root;
function is_fstch(nj) {
    //self._lsib is null
    var cond = (nj._lsib === null);
    return (cond);
}
exports.is_fstch = is_fstch;
function is_lstch(nj) {
    //self._rsib is null
    var cond = (nj._rsib === null);
    return (cond);
}
exports.is_lstch = is_lstch;
function is_midch(nj) {
    //not_fstch and not lstch
    var cond0 = !is_fstch(nj);
    var cond1 = !is_lstch(nj);
    return (cond0 && cond1);
}
exports.is_midch = is_midch;
function is_leaf(nj) {
    //have-no-children
    var cond = (nj._fstch === null);
    return (cond);
}
exports.is_leaf = is_leaf;
function is_connectable(nj) {
    /*
     * root 节点,uninited 节点(不在任何树上的) 亦可
     * 可以被直接
     * prepend as child,
     * append  as child,
     * insert  as child
     * add     as lsib
     * add     as rsib
     * 操作
     *
     * 已经在某棵树上的节点,必须先disconn
     * 然后才可进行上述操作
     */
    return (is_root(nj) || !is_inited(nj));
}
exports.is_connectable = is_connectable;
function is_lonely(nj) {
    var cond0 = (nj._lsib === null);
    var cond1 = (nj._rsib === null);
    return (cond0 && cond1);
}
exports.is_lonely = is_lonely;
//read tree
function get_nj_via_id_from_njarr(njarr, _id) {
    /*@level-0@*/
    var nj = cmmn.dtb_get_tr_via_id(njarr, _id);
    return (nj);
}
exports.get_nj_via_id_from_njarr = get_nj_via_id_from_njarr;
function get_sdfs_seq_via_id(sdfs, _id) {
    var seq = sdfs.findIndex(function (nj) { return (nj._id === _id); });
    return (seq);
}
exports.get_sdfs_seq_via_id = get_sdfs_seq_via_id;
//// child
function get_fstch(njarr, nj) {
    /*
     * fstch of leaf_nj will be null
     * fstch of nonleaf_nj will not be null
     */
    var chid = nj._fstch;
    var fstch = (chid === null) ? null : get_nj_via_id_from_njarr(njarr, chid);
    return (fstch);
}
exports.get_fstch = get_fstch;
function get_lstch(njarr, nj) {
    /*
     * lstch of leaf_nj will be null
     * lstch of nonleaf_nj will be Njson
     *
     */
    var child = get_fstch(njarr, nj);
    var prev = child;
    while (child !== null) {
        prev = child;
        child = get_rsib(njarr, child);
    }
    return (prev);
}
exports.get_lstch = get_lstch;
function get_children(njarr, nj) {
    /*
     * fstch->rsib->rsib.....->lstch
     *
     */
    var children = [];
    var child = get_fstch(njarr, nj);
    while (child !== null) {
        children.push(child);
        child = get_rsib(njarr, child);
    }
    return (children);
}
exports.get_children = get_children;
function get_which_child(njarr, nj, which) {
    var cond = (which < 0);
    if (cond) {
        return (null);
    }
    else {
        var child = get_fstch(njarr, nj);
        var c = 0;
        while (child !== null) {
            if (c === which) {
                return (child);
            }
            else {
                child = get_rsib(njarr, child);
                c = c + 1;
            }
        }
        return (null);
    }
}
exports.get_which_child = get_which_child;
function get_some_children(njarr, nj) {
    var whiches = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        whiches[_i - 2] = arguments[_i];
    }
    var children = get_children(njarr, nj);
    var some = [];
    if (children.length === 0) {
    }
    else {
        for (var i = 0; i < whiches.length; i++) {
            var which = whiches[i];
            var cond = (which > children.length - 1) || (which < 0);
            if (cond) {
            }
            else {
                some.push(children[which]);
            }
        }
    }
    return (some);
}
exports.get_some_children = get_some_children;
////parent
function get_parent(njarr, nj) {
    var pid = nj._parent;
    if (pid === null) {
        return (null);
    }
    else {
        return (get_nj_via_id_from_njarr(njarr, pid));
    }
}
exports.get_parent = get_parent;
function get_root(njarr) {
    /*@level-4@*/
    var nj = njarr[0];
    var lst_parent = nj;
    var parent = get_parent(njarr, nj);
    while (parent !== null) {
        lst_parent = parent;
        parent = get_parent(njarr, parent);
    }
    return (lst_parent);
}
exports.get_root = get_root;
function get_ances(njarr, nj, including_self) {
    if (including_self === void 0) { including_self = false; }
    /*level-4*/
    var ances = [];
    var parent = get_parent(njarr, nj);
    while (parent !== null) {
        ances.push(parent);
        parent = get_parent(njarr, parent);
    }
    if (including_self) {
        ances.unshift(nj);
    }
    else {
    }
    return (ances);
}
exports.get_ances = get_ances;
function get_which_ance(njarr, nj, which) {
    var ances = get_ances(njarr, nj, true);
    var lngth = ances.length;
    var cond = (which < lngth) && (which >= 0);
    if (cond) {
        return (ances[which]);
    }
    else {
        return (null);
    }
}
exports.get_which_ance = get_which_ance;
function get_some_ances(njarr, nj) {
    var whiches = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        whiches[_i - 2] = arguments[_i];
    }
    var ances = get_ances(njarr, nj, true);
    var some = [];
    if (ances.length === 0) {
    }
    else {
        for (var i = 0; i < whiches.length; i++) {
            var which = whiches[i];
            var cond = (which > ances.length - 1) || (which < 0);
            if (cond) {
            }
            else {
                some.push(ances[which]);
            }
        }
    }
    return (some);
}
exports.get_some_ances = get_some_ances;
//// sib
function get_rsib(njarr, nj) {
    /*@level-1@*/
    var sibid = nj._rsib;
    var rsib = (sibid === null) ? null : get_nj_via_id_from_njarr(njarr, sibid);
    return (rsib);
}
exports.get_rsib = get_rsib;
function get_lsib(njarr, nj) {
    var sibid = nj._lsib;
    var lsib = (sibid === null) ? null : get_nj_via_id_from_njarr(njarr, sibid);
    return (lsib);
}
exports.get_lsib = get_lsib;
function get_lstsib(njarr, nj, including_self) {
    if (including_self === void 0) { including_self = false; }
    /*@level-2@*/
    var lstrsib = nj;
    var rsib = get_rsib(njarr, nj);
    while (rsib !== null) {
        lstrsib = rsib;
        rsib = get_rsib(njarr, rsib);
    }
    if (including_self) {
        return (lstrsib);
    }
    else {
        if (lstrsib._id !== nj._id) {
            return (lstrsib);
        }
        else {
            return (null);
        }
    }
}
exports.get_lstsib = get_lstsib;
function get_fstsib(njarr, nj, including_self) {
    if (including_self === void 0) { including_self = false; }
    /*@level-2@*/
    var lstlsib = nj;
    var lsib = get_lsib(njarr, nj);
    while (lsib !== null) {
        lstlsib = lsib;
        lsib = get_lsib(njarr, lsib);
    }
    if (including_self) {
        return (lstlsib);
    }
    else {
        if (lstlsib._id !== nj._id) {
            return (lstlsib);
        }
        else {
            return (null);
        }
    }
}
exports.get_fstsib = get_fstsib;
function get_sibs(njarr, nj, including_self) {
    if (including_self === void 0) { including_self = false; }
    var parent = get_parent(njarr, nj);
    var sibs;
    if (parent !== null) {
        sibs = get_children(njarr, parent);
    }
    else {
        sibs = [nj];
    }
    if (including_self) {
        return (sibs);
    }
    else {
        sibs = cmmn.dtb_rm_via_id(sibs, nj._id);
    }
    return (sibs);
}
exports.get_sibs = get_sibs;
function get_psibs(njarr, nj) {
    var psibs = [];
    var psib = nj;
    while (psib._lsib !== null) {
        psib = get_nj_via_id_from_njarr(njarr, psib._lsib);
        psibs.unshift(psib);
    }
    return (psibs);
}
exports.get_psibs = get_psibs;
function get_fsibs(njarr, nj) {
    var fsibs = [];
    var fsib = nj;
    while (fsib._rsib !== null) {
        fsib = get_nj_via_id_from_njarr(njarr, fsib._rsib);
        fsibs.push(fsib);
    }
    return (fsibs);
}
exports.get_fsibs = get_fsibs;
function get_which_sib(njarr, nj, which) {
    var sibs = get_sibs(njarr, nj, true);
    var lngth = sibs.length;
    var cond = (which <= lngth - 1) && (which >= 0);
    if (cond) {
        return (sibs[which]);
    }
    else {
        return (null);
    }
}
exports.get_which_sib = get_which_sib;
function get_some_sibs(njarr, nj) {
    var whiches = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        whiches[_i - 2] = arguments[_i];
    }
    var sibs = get_sibs(njarr, nj, true);
    var some = [];
    if (sibs.length === 0) {
    }
    else {
        for (var i = 0; i < whiches.length; i++) {
            var which = whiches[i];
            var cond = (which > sibs.length - 1) || (which < 0);
            if (cond) {
            }
            else {
                some.push(sibs[which]);
            }
        }
    }
    return (some);
}
exports.get_some_sibs = get_some_sibs;
function get_sibseq(njarr, nj) {
    var sibs = get_sibs(njarr, nj, true);
    var seq = cmmn.dtb_get_seq_via_id(sibs, nj._id);
    return (seq);
}
exports.get_sibseq = get_sibseq;
function get_rsib_of_fst_ance_having_rsib(njarr, nj) {
    /*
        along the parent chain until root,not_including_self
        if the parent have rsib,return the rsib-of-parent
        ---------
    */
    var parent = get_parent(njarr, nj);
    while (parent !== null) {
        var rsib = get_rsib(njarr, parent);
        if (rsib !== null) {
            return (rsib);
        }
        else {
            parent = get_parent(njarr, parent);
        }
    }
    return (null);
}
exports.get_rsib_of_fst_ance_having_rsib = get_rsib_of_fst_ance_having_rsib;
function get_lsib_of_fst_ance_having_lsib(njarr, nj) {
    /*
        along the parent chain until root,not_including_self
        if the parent have lsib,return the lsib-of-parent
        ---------
    */
    var parent = get_parent(njarr, nj);
    while (parent !== null) {
        var lsib = get_lsib(njarr, parent);
        if (lsib !== null) {
            return (lsib);
        }
        else {
            parent = get_parent(njarr, parent);
        }
    }
    return (null);
}
exports.get_lsib_of_fst_ance_having_lsib = get_lsib_of_fst_ance_having_lsib;
////des
function get_deses(njarr, nj, including_self) {
    if (including_self === void 0) { including_self = false; }
    var deses = get_sdfs(njarr, nj);
    if (including_self) {
    }
    else {
        deses.splice(0, 1);
    }
    return deses;
}
exports.get_deses = get_deses;
function get_drmost_des(njarr, nj) {
    /*
       down-most  and right-most of subtree
       including_self
    */
    var old_lstch = nj;
    var lstch = get_lstch(njarr, nj);
    while (lstch !== null) {
        old_lstch = lstch;
        lstch = get_lstch(njarr, lstch);
    }
    return (old_lstch);
}
exports.get_drmost_des = get_drmost_des;
function get_dlmost_des(njarr, nj) {
    /*
     *  down-most  and left-most of subtree
        including_self
    */
    var old_fstch = nj;
    var fstch = get_fstch(njarr, nj);
    while (fstch !== null) {
        old_fstch = fstch;
        fstch = get_fstch(njarr, fstch);
    }
    return (old_fstch);
}
exports.get_dlmost_des = get_dlmost_des;
function get_fstlyr_deses(njarr, nj) {
    return (get_children(njarr, nj));
}
exports.get_fstlyr_deses = get_fstlyr_deses;
function get_lstlyr_deses(njarr, nj) {
    var deses = get_deses(njarr, nj, false);
    var des_depths = njarr.map(function (r) { return get_depth(njarr, r); });
    var max = Math.max.apply(Math, des_depths);
    deses = deses.filter(function (r) { return (get_depth(njarr, r) === max); });
    return (deses);
}
exports.get_lstlyr_deses = get_lstlyr_deses;
function get_which_lyr_deses(njarr, nj, which) {
    var depth = get_depth(njarr, nj);
    var deses = get_deses(njarr, nj, false);
    var des_depths = njarr.map(function (r) { return get_depth(njarr, r); });
    deses = deses.filter(function (r) { return (get_depth(njarr, r) === (depth + which)); });
    return (deses);
}
exports.get_which_lyr_deses = get_which_lyr_deses;
function get_some_lyrs_deses(njarr, nj) {
    var _a;
    var whiches = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        whiches[_i - 2] = arguments[_i];
    }
    var deses = whiches.map(function (which) { return get_which_lyr_deses(njarr, nj, which); });
    deses = (_a = Array.prototype).concat.apply(_a, deses);
    return (deses);
}
exports.get_some_lyrs_deses = get_some_lyrs_deses;
//mat
function get_depth(njarr, nj) {
    var ances = get_ances(njarr, nj, false);
    return (ances.length);
}
exports.get_depth = get_depth;
function get_breadth(njarr, nj, is_already_sdfs) {
    if (is_already_sdfs === void 0) { is_already_sdfs = true; }
    /*
     */
    var sdfs;
    if (is_already_sdfs) {
        sdfs = njarr;
    }
    else {
        sdfs = njarr2sdfs(njarr);
    }
    var lyr = get_lyr(sdfs, nj, is_already_sdfs);
    var breadth = cmmn.dtb_get_seq_via_id(lyr, nj._id);
    return (breadth);
}
exports.get_breadth = get_breadth;
function get_count(njarr) {
    return (njarr.length);
}
exports.get_count = get_count;
function get_height(njarr, nj) {
    var depth = get_depth(njarr, nj);
    var des_depths = njarr.map(function (r) { return get_depth(njarr, r); });
    var max = Math.max.apply(Math, des_depths);
    return (max - depth + 1);
}
exports.get_height = get_height;
////lyr
function get_lyr(njarr, nj, is_already_sdfs) {
    if (is_already_sdfs === void 0) { is_already_sdfs = true; }
    var sdfs;
    if (is_already_sdfs) {
        sdfs = njarr;
    }
    else {
        sdfs = njarr2sdfs(njarr);
    }
    var depth = get_depth(sdfs, nj);
    var lyr = sdfs.filter(function (r) { return (get_depth(sdfs, r) === depth); });
    return (lyr);
}
exports.get_lyr = get_lyr;
function get_fstlyr_des_depth(njarr, nj) {
    var cond = is_leaf(nj);
    if (cond) {
        return (null);
    }
    else {
        var depth = get_depth(njarr, nj);
        return (depth + 1);
    }
}
exports.get_fstlyr_des_depth = get_fstlyr_des_depth;
function get_lstlyr_des_depth(njarr, nj) {
    var cond = is_leaf(nj);
    if (cond) {
        return (null);
    }
    else {
        var depth = get_depth(njarr, nj);
        var des_depths = njarr.map(function (r) { return get_depth(njarr, r); });
        var max = Math.max.apply(Math, des_depths);
        return (max);
    }
}
exports.get_lstlyr_des_depth = get_lstlyr_des_depth;
function get_which_lyr_des_depth(njarr, nj, which) {
    var depth = get_depth(njarr, nj);
    var height = get_height(njarr, nj);
    if (height <= which) {
        return (null);
    }
    else {
        return (depth + which);
    }
}
exports.get_which_lyr_des_depth = get_which_lyr_des_depth;
//SDFS
function get_sdfs_next(njarr, nj) {
    /*
        having_child?
            fstch:
            having_rsib?
                rsib:
                rsib_of_fst_@ance_having_rsib)
    */
    var fstch = get_fstch(njarr, nj);
    if (fstch !== null) {
        return (fstch);
    }
    else {
        var rsib = get_rsib(njarr, nj);
        if (rsib !== null) {
            return (rsib);
        }
        else {
            return (get_rsib_of_fst_ance_having_rsib(njarr, nj));
        }
    }
}
exports.get_sdfs_next = get_sdfs_next;
function get_sdfs_prev(njarr, nj) {
    /*
        is_root?
            -Y:null
            -N:is_leaf?
                   -Y:having_lsib?
                          -Y:lsib
                          -N:parent
                   -N:having_lsib?
                          -Y:lsib_is_leaf?
                                 -Y:lsib
                                 -N:drmost-of-lsib
                          -N:parent
    */
    if (is_root(nj)) {
        return (null);
    }
    var cond = is_leaf(nj);
    if (cond) {
        var lsib = get_lsib(njarr, nj);
        if (lsib !== null) {
            return (lsib);
        }
        else {
            var parent_1 = get_parent(njarr, nj);
            return (parent_1);
        }
    }
    else {
        var lsib = get_lsib(njarr, nj);
        if (lsib !== null) {
            var cond_1 = is_leaf(lsib);
            if (cond_1) {
                return (lsib);
            }
            else {
                return (get_drmost_des(njarr, lsib));
            }
        }
        else {
            var parent_2 = get_parent(njarr, nj);
            return (parent_2);
        }
    }
}
exports.get_sdfs_prev = get_sdfs_prev;
function get_sdfs(njarr, nj) {
    var nnj = (nj === undefined) ? get_root(njarr) : nj;
    var nj_depth = get_depth(njarr, nnj);
    var sdfs = [];
    while (nnj !== null) {
        sdfs.push(nnj);
        nnj = get_sdfs_next(njarr, nnj);
        if (nnj !== null) {
            var depth = get_depth(njarr, nnj);
            if (depth <= nj_depth) {
                break;
            }
        }
    }
    return (sdfs);
}
exports.get_sdfs = get_sdfs;
//EDFS
function get_edfs_next(njarr, nj) {
    var rsib = get_rsib(njarr, nj);
    if (rsib === null) {
        //如果没有右兄弟，说明节点是lstch,此时应该返回父节点
        var p = get_parent(njarr, nj);
        return (p);
    }
    else {
        //如果有右兄弟，返回down-left-most-of-rsib
        return (get_dlmost_des(njarr, rsib));
    }
}
exports.get_edfs_next = get_edfs_next;
function get_edfs_prev(njarr, nj) {
    var cond = is_leaf(nj);
    if (!cond) {
        return (get_lstch(njarr, nj));
    }
    else {
        var lsib = get_lsib(njarr, nj);
        if (lsib === null) {
            return (get_lsib_of_fst_ance_having_lsib(njarr, nj));
        }
        else {
            return (lsib);
        }
    }
}
exports.get_edfs_prev = get_edfs_prev;
function get_edfs(njarr, nj) {
    var edfs = [];
    var nxt = get_dlmost_des(njarr, nj);
    while (nxt !== null) {
        edfs.push(nxt);
        if (nxt._id === nj._id) {
            break;
        }
        else {
            nxt = get_edfs_next(njarr, nxt);
        }
    }
    return (edfs);
}
exports.get_edfs = get_edfs;
//SEDFS
function clear_$visited(njarr) {
    njarr.forEach(function (nj) {
        nj.$visited = false;
    });
    return (njarr);
}
exports.clear_$visited = clear_$visited;
function get_sedfs_next(njarr, nj) {
    var visited = nj.$visited;
    var conj = is_leaf(nj);
    if (conj) {
        if (visited) {
            var rsib = get_rsib(njarr, nj);
            if (rsib === null) {
                return (get_parent(njarr, nj));
            }
            else {
                return (rsib);
            }
        }
        else {
            nj.$visited = true;
            return (nj);
        }
    }
    else {
        if (visited) {
            var rsib = get_rsib(njarr, nj);
            if (rsib === null) {
                return (get_parent(njarr, nj));
            }
            else {
                return (rsib);
            }
        }
        else {
            nj.$visited = true;
            return (get_fstch(njarr, nj));
        }
    }
}
exports.get_sedfs_next = get_sedfs_next;
function get_sedfs_prev(njarr, nj, visited) {
    var cond = is_leaf(nj);
    if (cond) {
        if (visited) {
            return (nj);
        }
        else {
            var lsib = get_lsib(njarr, nj);
            if (lsib === null) {
                return (get_parent(njarr, nj));
            }
            else {
                return (lsib);
            }
        }
    }
    else {
        if (visited) {
            return (get_lstch(njarr, nj));
        }
        else {
            var lsib = get_lsib(njarr, nj);
            if (lsib === null) {
                return (get_parent(njarr, nj));
            }
            else {
                return (lsib);
            }
        }
    }
}
exports.get_sedfs_prev = get_sedfs_prev;
function is_sedfs_traverse_finished(nj, start_id) {
    var cond = (nj.$visited) && (start_id === nj._id);
    return cond;
}
exports.is_sedfs_traverse_finished = is_sedfs_traverse_finished;
function get_sedfs(njarr, nj, deepcopy, clear) {
    if (deepcopy === void 0) { deepcopy = false; }
    if (clear === void 0) { clear = true; }
    var sedfs = [];
    clear_$visited(njarr);
    var start_id = nj._id;
    while (!is_sedfs_traverse_finished(nj, start_id)) {
        deepcopy ? sedfs.push(cmmn.dcp(nj)) : sedfs.push(nj);
        nj = get_sedfs_next(njarr, nj);
    }
    deepcopy ? sedfs.push(cmmn.dcp(nj)) : sedfs.push(nj);
    if (clear) {
        clear_$visited(njarr);
    }
    return (sedfs);
}
exports.get_sedfs = get_sedfs;
//write tree
function prepend_child(sdfs, nj, child) {
    /*
        signal = {
            action:prepend_child,
            treeid:sdfs[0]._id,
            njid:nj._id,
            child:child
        }

        must already be sdfs
    */
    child = (child === undefined) ? creat_nj() : child;
    var cond = is_connectable(child);
    if (cond) {
        //update _tree of child  to current-nj._tree
        child._tree = nj._tree;
        //child is fstch
        child._lsib = null;
        //update parent
        child._parent = nj._id;
        //update depth
        child._depth = nj._depth + 1;
        //
        if (is_leaf(nj)) {
            //if parent is leaf, child will be the only-child,so child is also lstch
            child._rsib = null;
        }
        else {
            //get old_fstch
            var old_fstch = get_nj_via_id_from_njarr(sdfs, nj._fstch);
            //update old_fstch._lsib to child._id
            old_fstch._lsib = child._id;
            //update child._rsib to old_fstch._id
            child._rsib = old_fstch._id;
        }
        //update nj._fstch
        nj._fstch = child._id;
        //update sdfs
        //prepend child 就是在自己后面添加
        var _id = nj._id;
        var seq = get_sdfs_seq_via_id(sdfs, _id);
        var chseq = seq + 1;
        sdfs.splice(chseq, 0, child);
        //
    }
    else {
        console.log('only root or uninited could be prepend');
    }
    return (child);
}
exports.prepend_child = prepend_child;
function append_child(sdfs, nj, child) {
    /*
        signal = {
            action:append_child,
            treeid:sdfs[0]._id,
            njid:nj._id,
            child:child
        }

        must already be sdfs
    */
    child = (child === undefined) ? creat_nj() : child;
    var cond = is_connectable(child);
    if (cond) {
        //update _tree
        child._tree = nj._tree;
        //update _rsib
        child._rsib = null;
        //update _parent
        child._parent = nj._id;
        //update depth
        child._depth = nj._depth + 1;
        //
        var old_lstch = void 0;
        //
        if (is_leaf(nj)) {
            //child 也是lstch
            nj._fstch = child._id;
            child._lsib = null;
            //
            var _id = nj._id;
            var seq = get_sdfs_seq_via_id(sdfs, _id);
            var chseq = seq + 1;
            sdfs.splice(chseq, 0, child);
        }
        else {
            old_lstch = get_lstch(sdfs, nj);
            old_lstch._rsib = child._id;
            child._lsib = old_lstch._id;
            //append child
            //首先要找到当前lstch的drmost descedant
            //然后在此 drmost descedant 之后(drmost-descedant-seq + 1)
            //追加
            var old_lstch_drmost = get_drmost_des(sdfs, old_lstch);
            var seq = get_sdfs_seq_via_id(sdfs, old_lstch_drmost._id);
            var chseq = seq + 1;
            sdfs.splice(chseq, 0, child);
        }
    }
    else {
        console.log('only root or uninited could be appended');
    }
    return (child);
}
exports.append_child = append_child;
function insert_child_via_index(sdfs, nj, which, child) {
    /*
        signal = {
            action:insert_child,
            treeid:sdfs[0]._id,
            njid:nj._id,
            index:which,
            child:child
        }
    */
    child = (child === undefined) ? creat_nj() : child;
    var cond = is_connectable(child);
    if (cond) {
        var children = get_children(sdfs, nj);
        var lngth = children.length;
        if (lngth === 0) {
            return (prepend_child(sdfs, nj, child));
        }
        else {
            var cond_2 = (which <= lngth) && (which >= 0);
            if (!cond_2) {
                console.log("not in range!!");
                return (child);
            }
            else {
                if (which === 0) {
                    return (prepend_child(sdfs, nj, child));
                }
                else if (which === lngth) {
                    return (append_child(sdfs, nj, child));
                }
                else {
                    var lnj = children[which - 1];
                    return (add_rsib(sdfs, lnj, child));
                }
            }
        }
    }
    else {
        console.log('only root or uninited could be inserted');
    }
    return (child);
}
exports.insert_child_via_index = insert_child_via_index;
function insert_child_before(sdfs, nj, child) {
    var which = get_sdfs_seq_via_id(sdfs, nj._id);
    return (insert_child_via_index(sdfs, nj, which, child));
}
exports.insert_child_before = insert_child_before;
function insert_child_after(sdfs, nj, child) {
    var which = get_sdfs_seq_via_id(sdfs, nj._id) + 1;
    return (insert_child_via_index(sdfs, nj, which, child));
}
exports.insert_child_after = insert_child_after;
function add_lsib(sdfs, nj, lsib) {
    /*
        signal = {
            action:add_lsib,
            treeid:sdfs[0]._id,
            njid:nj._id,
            lsib:lsib
        }
    */
    lsib = (lsib === undefined) ? creat_nj() : lsib;
    var cond = is_connectable(lsib);
    if (cond) {
        //root 不可操作
        if (is_root(nj)) {
            console.log("cant addlsib to root");
        }
        else {
            //
            var cond_3 = is_fstch(nj);
            lsib._tree = nj._tree;
            var parent_3 = get_parent(sdfs, nj);
            lsib._parent = parent_3._id;
            lsib._depth = parent_3._depth + 1;
            if (cond_3) {
                lsib._lsib = null;
                parent_3._fstch = lsib._id;
            }
            else {
                var old_lsib = get_lsib(sdfs, nj);
                old_lsib._rsib = lsib._id;
                lsib._lsib = old_lsib._id;
            }
            //
            lsib._rsib = nj._id;
            nj._lsib = lsib._id;
            //插入sdfs, 找到nj
            //直接在nj之前插入
            var seq = get_sdfs_seq_via_id(sdfs, nj._id);
            var sibseq = seq;
            sdfs.splice(sibseq, 0, lsib);
        }
    }
    else {
        console.log('only root or uninited could be add');
    }
    return (lsib);
}
exports.add_lsib = add_lsib;
function add_rsib(sdfs, nj, rsib) {
    /*
        signal = {
            action:add_lsib,
            treeid:sdfs[0]._id,
            njid:nj._id,
            rsib:rsib
        }
    */
    rsib = (rsib === undefined) ? creat_nj() : rsib;
    var cond = is_connectable(rsib);
    if (cond) {
        //root 不可操作
        if (is_root(nj)) {
            console.log("cant addrsib to root");
        }
        else {
            //
            var cond_4 = is_lstch(nj);
            rsib._tree = nj._tree;
            var parent_4 = get_parent(sdfs, nj);
            rsib._parent = parent_4._id;
            rsib._depth = parent_4._depth + 1;
            if (cond_4) {
                rsib._rsib = null;
            }
            else {
                var old_rsib = get_rsib(sdfs, nj);
                rsib._rsib = old_rsib._id;
                old_rsib._lsib = rsib._id;
            }
            //
            nj._rsib = rsib._id;
            rsib._lsib = nj._id;
            //插入sdfs, 找到nj的drmost 
            var drmost = get_drmost_des(sdfs, nj);
            var seq = get_sdfs_seq_via_id(sdfs, drmost._id);
            var sibseq = seq + 1;
            sdfs.splice(sibseq, 0, rsib);
        }
    }
    else {
        console.log('only root or uninited could be add');
    }
    return (rsib);
}
exports.add_rsib = add_rsib;
//
function update_tree_via_connto_nj(njarr, nj) {
    njarr.forEach(function (r) {
        r._tree = nj._tree;
    });
    return (njarr);
}
exports.update_tree_via_connto_nj = update_tree_via_connto_nj;
function update_depth_via_connto_nj(njarr, nj, diff) {
    njarr.forEach(function (r) {
        r._depth = nj._depth + r._depth + diff;
    });
    return (njarr);
}
exports.update_depth_via_connto_nj = update_depth_via_connto_nj;
function prepend_child_tree(njarr, ch_njarr, nj, is_already_sdfs) {
    if (is_already_sdfs === void 0) { is_already_sdfs = true; }
    var sdfs = is_already_sdfs ? njarr : get_sdfs(njarr);
    var chsdfs = is_already_sdfs ? ch_njarr : get_sdfs(ch_njarr);
    var child = chsdfs[0];
    child = prepend_child(sdfs, nj, child);
    //
    chsdfs = update_tree_via_connto_nj(chsdfs, nj);
    chsdfs = update_depth_via_connto_nj(chsdfs, nj, 1);
    //把子树sdfs插入sdfs
    var seq = get_sdfs_seq_via_id(sdfs, child._id);
    var chseq = seq + 1;
    sdfs.splice.apply(sdfs, __spreadArrays([chseq, 0], chsdfs.slice(1, chsdfs.length)));
    //
    return ([chsdfs, child]);
}
exports.prepend_child_tree = prepend_child_tree;
function append_child_tree(njarr, ch_njarr, nj, is_already_sdfs) {
    if (is_already_sdfs === void 0) { is_already_sdfs = true; }
    var sdfs = is_already_sdfs ? njarr : get_sdfs(njarr);
    var chsdfs = is_already_sdfs ? ch_njarr : get_sdfs(ch_njarr);
    var child = chsdfs[0];
    child = append_child(sdfs, nj, child);
    //
    chsdfs = update_tree_via_connto_nj(chsdfs, nj);
    chsdfs = update_depth_via_connto_nj(chsdfs, nj, 1);
    //把子树插入sdfs
    var seq = get_sdfs_seq_via_id(sdfs, child._id);
    var chseq = seq + 1;
    sdfs.splice.apply(sdfs, __spreadArrays([chseq, 0], chsdfs.slice(1, chsdfs.length)));
    //
    return ([chsdfs, child]);
}
exports.append_child_tree = append_child_tree;
function add_rsib_tree(njarr, rsib_njarr, nj, is_already_sdfs) {
    if (is_already_sdfs === void 0) { is_already_sdfs = true; }
    var sdfs = is_already_sdfs ? njarr : get_sdfs(njarr);
    var rsibsdfs = is_already_sdfs ? rsib_njarr : get_sdfs(rsib_njarr);
    var rsib = rsibsdfs[0];
    rsib = add_rsib(sdfs, nj, rsib);
    //
    rsibsdfs = update_tree_via_connto_nj(rsibsdfs, nj);
    rsibsdfs = update_depth_via_connto_nj(rsibsdfs, nj, 0);
    //把子树插入sdfs
    var seq = get_sdfs_seq_via_id(sdfs, rsib._id);
    var sibseq = seq + 1;
    sdfs.splice.apply(sdfs, __spreadArrays([sibseq, 0], rsibsdfs.slice(1, rsibsdfs.length)));
    return ([rsibsdfs, rsib]);
}
exports.add_rsib_tree = add_rsib_tree;
function add_lsib_tree(njarr, lsib_njarr, nj, is_already_sdfs) {
    if (is_already_sdfs === void 0) { is_already_sdfs = true; }
    var sdfs = is_already_sdfs ? njarr : get_sdfs(njarr);
    var lsibsdfs = is_already_sdfs ? lsib_njarr : get_sdfs(lsib_njarr);
    var lsib = lsibsdfs[0];
    lsib = add_lsib(sdfs, nj, lsib);
    //
    lsibsdfs = update_tree_via_connto_nj(lsibsdfs, nj);
    lsibsdfs = update_depth_via_connto_nj(lsibsdfs, nj, 0);
    //把子树插入sdfs
    var seq = get_sdfs_seq_via_id(sdfs, lsib._id);
    var sibseq = seq + 1;
    sdfs.splice.apply(sdfs, __spreadArrays([sibseq, 0], lsibsdfs.slice(1, lsibsdfs.length)));
    return ([lsibsdfs, lsib]);
}
exports.add_lsib_tree = add_lsib_tree;
function insert_child_tree_via_index(njarr, ch_njarr, nj, which, is_already_sdfs) {
    if (is_already_sdfs === void 0) { is_already_sdfs = true; }
    var sdfs = is_already_sdfs ? njarr : get_sdfs(njarr);
    var chsdfs = is_already_sdfs ? ch_njarr : get_sdfs(ch_njarr);
    var child = chsdfs[0];
    child = insert_child_via_index(sdfs, nj, which, child);
    //
    chsdfs = update_tree_via_connto_nj(chsdfs, nj);
    chsdfs = update_depth_via_connto_nj(chsdfs, nj, 1);
    //把子树插入sdfs
    var seq = get_sdfs_seq_via_id(sdfs, child._id);
    var chseq = seq + 1;
    sdfs.splice.apply(sdfs, __spreadArrays([chseq, 0], chsdfs.slice(1, chsdfs.length)));
    //
    return ([chsdfs, child]);
}
exports.insert_child_tree_via_index = insert_child_tree_via_index;
function insert_child_tree_before(njarr, ch_njarr, nj, is_already_sdfs) {
    if (is_already_sdfs === void 0) { is_already_sdfs = true; }
    var sdfs = is_already_sdfs ? njarr : get_sdfs(njarr);
    var chsdfs = is_already_sdfs ? ch_njarr : get_sdfs(ch_njarr);
    var child = chsdfs[0];
    child = insert_child_before(sdfs, nj, child);
    //
    chsdfs = update_tree_via_connto_nj(chsdfs, nj);
    chsdfs = update_depth_via_connto_nj(chsdfs, nj, 1);
    //把子树插入sdfs
    var seq = get_sdfs_seq_via_id(sdfs, child._id);
    var chseq = seq + 1;
    sdfs.splice.apply(sdfs, __spreadArrays([chseq, 0], chsdfs.slice(1, chsdfs.length)));
    //
    return ([chsdfs, child]);
}
exports.insert_child_tree_before = insert_child_tree_before;
function insert_child_tree_after(njarr, ch_njarr, nj, is_already_sdfs) {
    if (is_already_sdfs === void 0) { is_already_sdfs = true; }
    var sdfs = is_already_sdfs ? njarr : get_sdfs(njarr);
    var chsdfs = is_already_sdfs ? ch_njarr : get_sdfs(ch_njarr);
    var child = chsdfs[0];
    child = insert_child_after(sdfs, nj, child);
    //
    chsdfs = update_tree_via_connto_nj(chsdfs, nj);
    chsdfs = update_depth_via_connto_nj(chsdfs, nj, 1);
    //把子树插入sdfs
    var seq = get_sdfs_seq_via_id(sdfs, child._id);
    var chseq = seq + 1;
    sdfs.splice.apply(sdfs, __spreadArrays([chseq, 0], chsdfs.slice(1, chsdfs.length)));
    //
    return ([chsdfs, child]);
}
exports.insert_child_tree_after = insert_child_tree_after;
//
function update_tree_when_disconnected(sdfs) {
    //脱离后的子树
    var rj = sdfs[0];
    sdfs.forEach(function (nj) {
        nj._tree = rj._tree;
    });
    return (sdfs);
}
exports.update_tree_when_disconnected = update_tree_when_disconnected;
function update_depth_when_disconnected(sdfs) {
    var rj = sdfs[0];
    sdfs.forEach(function (nj) {
        nj._depth = nj._depth - rj._depth;
    });
    return (sdfs);
}
exports.update_depth_when_disconnected = update_depth_when_disconnected;
function leafize(nj) {
    /*
     * 把一个Njson 叶节点化,也就是_fstch =null,
     * 没有fstch
     *
     */
    nj._fstch = null;
    return (nj);
}
exports.leafize = leafize;
function rootize(nj) {
    /*
     * 把一个单独的节点根节点化
     * 如果此节点有子孙
     * 要使用rootize_tree
     *
     */
    nj._lsib = null;
    nj._rsib = null;
    nj._parent = null;
    nj._depth = 0;
    nj._tree = nj._id;
    return (nj);
}
exports.rootize = rootize;
function rootize_tree(njarr, nj) {
    var nsdfs = get_sdfs(njarr, nj);
    nsdfs = update_tree_when_disconnected(nsdfs);
    nsdfs = update_depth_when_disconnected(nsdfs);
    nj = rootize(nj);
    //
    return ([nsdfs, nj]);
}
exports.rootize_tree = rootize_tree;
function uninitize(nj) {
    /*
     * 把一个节点未初始化
     * _tree 置为undefined,其他与rootize相同
     */
    nj._fstch = null;
    nj._lsib = null;
    nj._rsib = null;
    nj._parent = null;
    nj._depth = 0;
    nj._tree = undefined;
    return (nj);
}
exports.uninitize = uninitize;
function njarr2sdfs_with_is_already_sdfs(njarr, is_already_sdfs) {
    if (is_already_sdfs === void 0) { is_already_sdfs = true; }
    var sdfs;
    if (is_already_sdfs) {
        sdfs = njarr;
    }
    else {
        sdfs = njarr2sdfs(njarr);
    }
    return (sdfs);
}
function disconnect(njarr, nj, is_already_sdfs) {
    if (is_already_sdfs === void 0) { is_already_sdfs = true; }
    //
    var sdfs;
    sdfs = njarr2sdfs_with_is_already_sdfs(njarr, is_already_sdfs);
    //
    var cond = is_root(nj);
    if (cond) {
        //如果要脱离树的节点是根节点,什么也不做
        return ([sdfs, nj]);
    }
    else if (is_lonely(nj)) {
        //如果是独生节点(没有兄弟)
        ////parent变为leaf节点
        var parent_5 = get_parent(njarr, nj);
        parent_5 = leafize(parent_5);
        //处理脱离后的子孙节点_depth ,_tree
        return (rootize_tree(njarr, nj));
    }
    else {
        //父节点多于一个儿子
        if (is_fstch(nj)) {
            //被删除节点是fstch,右邻居的左邻居置null, parent的fstch 变为右邻居
            var rsib = get_rsib(njarr, nj);
            //右兄弟变成了fstch, lsib 指向null
            rsib._lsib = null;
            //右兄弟变成了fstch,parent要指向rsib
            var parent_6 = get_parent(njarr, nj);
            parent_6._fstch = nj._rsib;
        }
        else if (is_lstch(nj)) {
            //被删除节点是lstch,左邻居的右邻居置null
            ////////////////////////////
            var lsib = get_lsib(njarr, nj);
            lsib._rsib = null;
        }
        else {
            //被删除节点是midch,左右邻居互指
            var lsib = get_lsib(njarr, nj);
            lsib._rsib = nj._rsib;
            var rsib = get_rsib(njarr, nj);
            rsib._lsib = nj._lsib;
        }
        //后代节点关系不变，但是tree变为当前节点._id
        //处理脱离后的子孙节点_depth ,_tree
        return (rootize_tree(njarr, nj));
    }
}
exports.disconnect = disconnect;
function rm_fstch(njarr, nj, is_already_sdfs) {
    if (is_already_sdfs === void 0) { is_already_sdfs = true; }
    var fstch = get_fstch(njarr, nj);
    if (fstch === null) {
        var sdfs = void 0;
        sdfs = njarr2sdfs_with_is_already_sdfs(njarr, is_already_sdfs);
        return ([sdfs, null]);
    }
    else {
        return (disconnect(njarr, fstch, is_already_sdfs));
    }
}
exports.rm_fstch = rm_fstch;
function rm_lstch(njarr, nj, is_already_sdfs) {
    if (is_already_sdfs === void 0) { is_already_sdfs = true; }
    var lstch = get_lstch(njarr, nj);
    if (lstch === null) {
        var sdfs = void 0;
        sdfs = njarr2sdfs_with_is_already_sdfs(njarr, is_already_sdfs);
        return ([sdfs, null]);
    }
    else {
        return (disconnect(njarr, lstch, is_already_sdfs));
    }
}
exports.rm_lstch = rm_lstch;
function rm_which_child(njarr, nj, which, is_already_sdfs) {
    if (is_already_sdfs === void 0) { is_already_sdfs = true; }
    var child = get_which_child(njarr, nj, which);
    if (child === null) {
        var sdfs = void 0;
        sdfs = njarr2sdfs_with_is_already_sdfs(njarr, is_already_sdfs);
        return ([sdfs, null]);
    }
    else {
        return (disconnect(njarr, child, is_already_sdfs));
    }
}
exports.rm_which_child = rm_which_child;
function rm_all_children(njarr, nj, is_already_sdfs) {
    if (is_already_sdfs === void 0) { is_already_sdfs = true; }
    var children = get_children(njarr, nj);
    var arr = children.map(function (child) {
        return (disconnect(njarr, child, is_already_sdfs));
    });
    return (arr);
}
exports.rm_all_children = rm_all_children;
function rm_some_children(njarr, nj, whiches, is_already_sdfs) {
    if (is_already_sdfs === void 0) { is_already_sdfs = true; }
    var children = get_some_children.apply(void 0, __spreadArrays([njarr, nj], whiches));
    var arr = children.map(function (child) {
        return (disconnect(njarr, child, is_already_sdfs));
    });
    return (arr);
}
exports.rm_some_children = rm_some_children;
//transform
function njarr2sdfs(njarr) {
    var rj = get_root(njarr);
    var sdfs = get_sdfs(njarr, rj);
    return (sdfs);
}
exports.njarr2sdfs = njarr2sdfs;
function nj2ele(njarr, nj) {
    var ele = {};
    ele._depth = get_depth(njarr, nj);
    ele._breadth = get_breadth(njarr, nj);
    var p = get_parent(njarr, nj);
    ele._pbreadth = (p === null) ? null : get_breadth(njarr, nj);
    ele._id = nj._id;
    return (ele);
}
exports.nj2ele = nj2ele;
function _nj2unhandled_ele(nj) {
    var o = {};
    o.ele = {};
    o.nj = nj;
    o.ele._id = nj._id;
    o.ele._children = [];
    return (o);
}
function sdfs2mat(njarr, sdfs) {
    if (sdfs === undefined) {
        sdfs = njarr;
    }
    var m = [];
    var nj = sdfs[0];
    var unhandled = [_nj2unhandled_ele(nj)];
    unhandled[0].ele._pbreadth = null;
    var _loop_1 = function () {
        var next_unhandled = [];
        var _loop_2 = function (i) {
            unhandled[i].ele._breadth = i;
            unhandled[i].ele._depth = m.length;
            var children = get_children(njarr, unhandled[i].nj);
            children = children.map(function (nj) { return _nj2unhandled_ele(nj); });
            children.forEach(function (r, index) {
                r.ele._pbreadth = unhandled[i].ele._breadth;
                unhandled[i].ele._children.push([(m.length + 1), next_unhandled.length + index]);
            });
            next_unhandled = next_unhandled.concat(children);
        };
        for (var i = 0; i < unhandled.length; i++) {
            _loop_2(i);
        }
        var lyr = unhandled.map(function (r) { return r.ele; });
        m.push(lyr);
        unhandled = next_unhandled;
    };
    while (unhandled.length > 0) {
        _loop_1();
    }
    return (m);
}
exports.sdfs2mat = sdfs2mat;
function sdfs2edfs(njarr, sdfs) {
    if (sdfs === undefined) {
        sdfs = njarr2sdfs(njarr);
    }
    return (get_edfs(njarr, sdfs[0]));
}
exports.sdfs2edfs = sdfs2edfs;
function sdfs2sedfs(njarr, sdfs, deepcopy, clear) {
    if (deepcopy === void 0) { deepcopy = false; }
    if (clear === void 0) { clear = true; }
    if (sdfs === undefined) {
        sdfs = njarr2sdfs(njarr);
    }
    return (get_sedfs(njarr, sdfs[0], deepcopy, clear));
}
exports.sdfs2sedfs = sdfs2sedfs;
function edfs2sdfs(njarr, edfs) {
    var nj = edfs[edfs.length - 1];
    return (get_sdfs(njarr, nj));
}
exports.edfs2sdfs = edfs2sdfs;
function edfs2mat(njarr, edfs) {
    var sdfs = edfs2sdfs(njarr, edfs);
    var m = sdfs2mat(njarr, sdfs);
    return (m);
}
exports.edfs2mat = edfs2mat;
function edfs2sedfs(njarr, edfs, deepcopy, clear) {
    if (deepcopy === void 0) { deepcopy = false; }
    if (clear === void 0) { clear = true; }
    var sdfs = edfs2sdfs(njarr, edfs);
    return (sdfs2sedfs(njarr, sdfs, deepcopy, clear));
}
exports.edfs2sedfs = edfs2sedfs;
function sedfs2sdfs(njarr, sedfs) {
    var nj = sedfs[0];
    return (get_sdfs(njarr, nj));
}
exports.sedfs2sdfs = sedfs2sdfs;
function sedfs2mat(njarr, sedfs) {
    var sdfs = sedfs2sdfs(njarr, sedfs);
    var m = sdfs2mat(njarr, sdfs);
    return (m);
}
exports.sedfs2mat = sedfs2mat;
function sedfs2edfs(njarr, sedfs) {
    var sdfs = sedfs2sdfs(njarr, sedfs);
    var edfs = sdfs2edfs(njarr, sdfs);
    return (edfs);
}
exports.sedfs2edfs = sedfs2edfs;
//
function get_nj_via_depth_and_breadth(njarr, depth, breadth) {
    var nj = null;
    for (var _i = 0, njarr_1 = njarr; _i < njarr_1.length; _i++) {
        var each = njarr_1[_i];
        var d0 = get_depth(njarr, each);
        var b1 = get_breadth(njarr, each);
        var cond0 = (depth === d0);
        var cond1 = (breadth === b1);
        var cond = (cond0 && cond1);
        if (cond) {
            return (each);
        }
    }
    return (nj);
}
exports.get_nj_via_depth_and_breadth = get_nj_via_depth_and_breadth;
