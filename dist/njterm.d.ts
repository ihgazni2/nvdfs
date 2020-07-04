import { Njson, NJ_OR_UNDEFINED } from "./njfunc";
declare const dflt_sdfs_show_connd: {
    t: string;
    v: string;
    l: string;
    ws: string;
};
declare function dflt_sdfs_calc_conns(njarr: Array<Njson>, nj: Njson): Njson;
declare function get_sdfs_repr_arr(njarr: Array<Njson>, nj: Njson, k?: string, cb?: any): Array<string>;
declare function show_sdfs0(njarr: Array<Njson>, k: string | undefined, nj: NJ_OR_UNDEFINED, cb?: any): void;
declare function show_sdfs1(njarr: Array<Njson>, nj: NJ_OR_UNDEFINED, k?: string, cb?: any): void;
declare function show_sdfs_with_tag(njarr: Array<Njson>, nj?: NJ_OR_UNDEFINED): void;
declare function show_sdfs_with_id(njarr: Array<Njson>, nj?: NJ_OR_UNDEFINED): void;
declare const dflt_sedfs_show_connd: {
    indent: string;
    stag_prefix: string;
    stag_suffix: string;
    etag_prefix: string;
    etag_suffix: string;
};
declare function show_sedfs(njarr: Array<Njson>, nj?: NJ_OR_UNDEFINED, k?: string, show_connd?: any): void;
export { dflt_sdfs_show_connd, dflt_sdfs_calc_conns, get_sdfs_repr_arr, show_sdfs0, show_sdfs1, show_sdfs_with_id, show_sdfs_with_tag, dflt_sedfs_show_connd, show_sedfs };
