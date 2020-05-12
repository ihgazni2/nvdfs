interface Njson {
    _id: string;
    _fstch: null | string;
    _lsib: null | undefined | string;
    _rsib: null | string;
    _parent: null | undefined | string;
    _tree: undefined | string;
    $visited: undefined | boolean;
}
declare type NJ_OR_NULL = Njson | null;
declare type NJ_OR_UNDEFINED = Njson | undefined;
declare type BL_OR_UNDEFINED = boolean | undefined;
declare function creat_rj(): Njson;
declare function creat_nj(): Njson;
declare function creat_sdfs(): Array<Njson>;
declare function is_inited(nj: Njson): boolean;
declare function is_root(nj: Njson): boolean;
declare function is_fstch(nj: Njson): boolean;
declare function is_lstch(nj: Njson): boolean;
declare function is_midch(nj: Njson): boolean;
declare function is_leaf(nj: Njson): boolean;
declare function is_connectable(nj: Njson): boolean;
declare function is_lonely(njarr: Array<Njson>, nj: Njson): boolean;
declare function get_nj_via_id_from_njarr(njarr: Array<Njson>, _id: string): Njson;
declare function get_sdfs_seq_via_id(sdfs: Array<Njson>, _id: string): number;
declare function get_fstch(njarr: Array<Njson>, nj: Njson): NJ_OR_NULL;
declare function get_lstch(njarr: Array<Njson>, nj: Njson): NJ_OR_NULL;
declare function get_children(njarr: Array<Njson>, nj: Njson): Array<Njson>;
declare function get_which_child(njarr: Array<Njson>, nj: Njson, which: number): NJ_OR_NULL;
declare function get_some_children(njarr: Array<Njson>, nj: Njson, ...whiches: Array<number>): Array<Njson>;
declare function get_parent(njarr: Array<Njson>, nj: Njson): NJ_OR_NULL;
declare function get_root(njarr: Array<Njson>): NJ_OR_NULL;
declare function get_ances(njarr: Array<Njson>, nj: Njson, including_self?: boolean): Array<Njson>;
declare function get_which_ance(njarr: Array<Njson>, nj: Njson, which: number): NJ_OR_NULL;
declare function get_some_ances(njarr: Array<Njson>, nj: Njson, ...whiches: Array<number>): Array<Njson>;
declare function get_rsib(njarr: Array<Njson>, nj: Njson): NJ_OR_NULL;
declare function get_lsib(njarr: Array<Njson>, nj: Njson): NJ_OR_NULL;
declare function get_lstsib(njarr: Array<Njson>, nj: Njson, including_self?: boolean): NJ_OR_NULL;
declare function get_sibs(njarr: Array<Njson>, nj: Njson, including_self?: boolean): Array<Njson>;
declare function get_preceding_sibs(njarr: Array<Njson>, nj: Njson): Array<Njson>;
declare function get_following_sibs(njarr: Array<Njson>, nj: Njson): Array<Njson>;
declare function get_fstsib(njarr: Array<Njson>, nj: Njson, including_self?: boolean): NJ_OR_NULL;
declare function get_which_sib(njarr: Array<Njson>, nj: Njson, which: number): NJ_OR_NULL;
declare function get_some_sibs(njarr: Array<Njson>, nj: Njson, ...whiches: Array<number>): Array<Njson>;
declare function get_sibseq(njarr: Array<Njson>, nj: Njson): number;
declare function get_rsib_of_fst_ance_having_rsib(njarr: Array<Njson>, nj: Njson): NJ_OR_NULL;
declare function get_lsib_of_fst_ance_having_lsib(njarr: Array<Njson>, nj: Njson): NJ_OR_NULL;
declare function get_deses(njarr: Array<Njson>, nj: Njson, including_self?: boolean): Array<Njson>;
declare function get_drmost_des(njarr: Array<Njson>, nj: Njson): Njson;
declare function get_dlmost_des(njarr: Array<Njson>, nj: Njson): Njson;
declare function get_fstlyr_deses(njarr: Array<Njson>, nj: Njson): Array<Njson>;
declare function get_lstlyr_deses(njarr: Array<Njson>, nj: Njson): Array<Njson>;
declare function get_which_lyr_deses(njarr: Array<Njson>, nj: Njson, which: number): Array<Njson>;
declare function get_some_lyrs_deses(njarr: Array<Njson>, nj: Njson, ...whiches: Array<number>): Array<Njson>;
declare function get_depth(njarr: Array<Njson>, nj: Njson): number;
declare function get_breadth(sdfs: Array<Njson>, nj: Njson): number;
declare function get_count(njarr: Array<Njson>): number;
declare function get_height(njarr: Array<Njson>, nj: Njson): number;
declare function get_lyr(sdfs: Array<Njson>, nj: Njson): Array<Njson>;
declare function get_fstlyr_des_depth(sdfs: Array<Njson>, nj: Njson): number | null;
declare function get_lstlyr_des_depth(sdfs: Array<Njson>, nj: Njson): number | null;
declare function get_which_lyr_des_depth(sdfs: Array<Njson>, nj: Njson, which: number): number | null;
declare function get_sdfs_next(njarr: Array<Njson>, nj: Njson): NJ_OR_NULL;
declare function get_sdfs_prev(njarr: Array<Njson>, nj: Njson): NJ_OR_NULL;
declare function get_sdfs(njarr: Array<Njson>, nj: Njson): Array<NJ_OR_NULL>;
declare function get_edfs_next(njarr: Array<Njson>, nj: Njson): NJ_OR_NULL;
declare function get_edfs_prev(njarr: Array<Njson>, nj: Njson): NJ_OR_NULL;
declare function get_edfs(njarr: Array<Njson>, nj: Njson): Array<NJ_OR_NULL>;
declare function clear_$visited(njarr: Array<Njson>): Array<Njson>;
declare function get_sedfs_next(njarr: Array<Njson>, nj: Njson): NJ_OR_NULL;
declare function get_sedfs_prev(njarr: Array<Njson>, nj: Njson, visited: BL_OR_UNDEFINED): NJ_OR_NULL;
declare function is_sedfs_traverse_finished(nj: Njson, start_id: string): boolean;
declare function get_sedfs(njarr: Array<Njson>, nj: Njson, deepcopy?: boolean, clear?: boolean): Array<Njson>;
declare function prepend_child(sdfs: Array<Njson>, nj: Njson, child?: any): Njson;
declare function append_child(sdfs: Array<Njson>, nj: Njson, child?: any): Njson;
declare function insert_child(sdfs: Array<Njson>, nj: Njson, which: number, child?: NJ_OR_UNDEFINED): Njson;
declare function add_lsib(sdfs: Array<Njson>, nj: Njson, lsib?: NJ_OR_UNDEFINED): Njson;
declare function add_rsib(sdfs: Array<Njson>, nj: Njson, rsib?: NJ_OR_UNDEFINED): Njson;
declare function njarr2sdfs(njarr: Array<Njson>): Array<Njson>;
export { creat_rj, creat_nj, creat_sdfs, is_inited, is_root, is_fstch, is_lstch, is_midch, is_leaf, is_connectable, is_lonely, get_nj_via_id_from_njarr, get_sdfs_seq_via_id, get_fstch, get_lstch, get_children, get_which_child, get_some_children, get_rsib, get_lstsib, get_lsib, get_sibs, get_preceding_sibs, get_following_sibs, get_fstsib, get_sibseq, get_which_sib, get_some_sibs, get_rsib_of_fst_ance_having_rsib, get_lsib_of_fst_ance_having_lsib, get_parent, get_root, get_ances, get_which_ance, get_some_ances, get_drmost_des, get_dlmost_des, get_deses, get_fstlyr_deses, get_lstlyr_deses, get_which_lyr_deses, get_some_lyrs_deses, get_lyr, get_fstlyr_des_depth, get_lstlyr_des_depth, get_which_lyr_des_depth, get_depth, get_breadth, get_count, get_height, get_sdfs_next, get_sdfs_prev, get_sdfs, get_edfs_next, get_edfs_prev, get_edfs, clear_$visited, get_sedfs_next, get_sedfs_prev, is_sedfs_traverse_finished, get_sedfs, prepend_child, append_child, insert_child, add_rsib, add_lsib, njarr2sdfs, };