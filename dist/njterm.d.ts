import { Njson, NJ_OR_UNDEFINED } from "./njfunc";
declare function get_sdfs_repr_arr(njarr: Array<Njson>, nj: Njson, k?: string, cb?: any): Array<string>;
declare function show_sdfs0(njarr: Array<Njson>, k: string | undefined, nj: NJ_OR_UNDEFINED, cb?: any): void;
declare function show_sdfs1(njarr: Array<Njson>, nj: NJ_OR_UNDEFINED, k?: string, cb?: any): void;
declare function show_sdfs_with_tag(njarr: Array<Njson>, nj?: NJ_OR_UNDEFINED): void;
declare function show_sdfs_with_id(njarr: Array<Njson>, nj?: NJ_OR_UNDEFINED): void;
export { get_sdfs_repr_arr, show_sdfs0, show_sdfs1, show_sdfs_with_id, show_sdfs_with_tag, };
