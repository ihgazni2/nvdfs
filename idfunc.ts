import * as cmmn from "./cmmn"



function calc_next_id(sdfs:Array<any>):number {
    let ids = sdfs.map(nj=>nj._id)
    return(Math.max(...ids)+1)
}

function is_id(n:any):boolean {
    let cond = ((n !== null) && (n !== undefined))
    return(cond) 
}

function update_one_njid(nj:object,idplus:number) {
    (nj as any)._id = (nj as any)._id + idplus;
    (nj as any)._tree = (nj as any)._tree + idplus;
    if(is_id((nj as any)._fstch)) {
         (nj as any)._fstch = (nj as any)._fstch + idplus
    }
    if(is_id((nj as any)._lsib)) {
         (nj as any)._lsib = (nj as any)._lsib + idplus
    }
    if(is_id((nj as any)._rsib)) {
         (nj as any)._rsib = (nj as any)._rsib + idplus
    }
    if(is_id((nj as any)._parent)) {
         (nj as any)._parent = (nj as any)._parent + idplus
    }
    return(nj)
}

function update_nj_ids(sdfs0:Array<any>,sdfs1:Array<any>) {
    let next_id = calc_next_id(sdfs0)
    for(let i=0;i<sdfs1.length;i++) {
        sdfs1[i] = update_one_njid(sdfs1[i],next_id)
    }
    return(sdfs1)
}

function gen_id(d:object):any {
    if((d as any).mode === 'numid') {
        if((d as any)._id === undefined) {
            return(0)
        } else {
            return((d as any)._id)
        }
    } else {
        return(cmmn.gen_guid())
    }
}


export {
    calc_next_id,
    is_id,
    update_one_njid,
    update_nj_ids,
    gen_id,
}
