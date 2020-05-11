//copy
function dcp(o) {
    return(JSON.parse(JSON.stringify(o)))
}



//string

function is_int_str(s:string):boolean {
    let n = parseInt(s)
    let ns = n.toString()
    return(ns === s)
}


//array
function range(si:number,ei:number):Array<number> {
    return(Array.from({ length: ei-si }).map((v, i) => i + si))
}

function slct_via_seqs(arr:Array<any>,...seqs:Array<number>):Array<any> {
    return(arr.filter((r,i)=>(seqs.includes(i))))
}

function array_lst(arr:Array<any>):any {
    let lsti = arr.length - 1
    return(arr[lsti])
}

function array_max(arr:Array<any>):any {
    return(Math.max(...arr))
}

function array_min(arr:Array<any>):any {
    return(Math.min(...arr))
}

//mat

function mat_mapxyv(m,map_func) {
    for(let i=0;i<m.length;i++) {
        let lyr = m[i]
        for(let j=0;j<lyr.length;j++) {
            m[i][j] = map_func(i,j,m[i][j])
        }
    }
    return(m)
}


function mat_mapv(m,map_func) {
    for(let i=0;i<m.length;i++) {
        let lyr = m[i]
        for(let j=0;j<lyr.length;j++) {
            m[i][j] = map_func(m[i][j])
        }
    }
    return(m)
}



//dict

function dict_length(d:object):number {
    return(Object.entries(d).length)
}

function is_empty_dict(d:object):boolean {
    return(Object.entries(d).length === 0)
}


function dict_keys(d:object):Array<any> {
    let entries = Object.entries(d)
    let keys = entries.map(r=>r[0])
    return(keys)
}


function dict_values(d:object):Array<any> {
    let entries = Object.entries(d)
    let values = entries.map(r=>r[1])
    return(values)
}

function dict_foreach(d,f) {
    for(let k in d) {
        f(k,d[k])
    }
    return(d)
}

function dict_mapv(d,f) {
    for(let k in d) {
        d[k] = f(k,d[k])
    }
    return(d)
}

function dict_mapk(d,f) {
    let nd = {}
    for(let k in d) {
        let nk  = f(k,d[k])
        nd[nk] = d[k]
    }
    return(nd)
}

function dict_update_force(d0:object,d1:object):object {
    //unique k ,no common k
    for(let k in d1) {
        d0[k] =d1[k]
    }
    return(d0)    
}

function dict_update(d0:object,d1:object):object {
    //unique k ,no common k
    for(let k in d1) {
        let cond = !(k in d0)
        if(cond) {
            d0[k] =d1[k]
        }    
    }
    return(d0)
}

//dtb
function dtb_get_tr_via_kv(dtb:Array<any>,k:any,v:any):Array<any> {
    let l = dtb.filter(tr=>tr[k]===v)
    return(l)
}

function dtb_get_fst_tr_via_kv(dtb:Array<any>,k:any,v:any):any {
    let l = dtb_get_tr_via_kv(dtb,k,v)
    if(l.length>0) {
        return(l[0])
    } else {
        return(undefined)
    }
}

function dtb_get_tr_via_id(dtb:Array<any>,_id:any):any {
    return(dtb_get_fst_tr_via_kv(dtb,'_id',_id))
}


function dtb_get_val_via_id_and_key(dtb:Array<any>,_id:any,k:any):any {
    let tr = dtb_get_tr_via_id(dtb,_id)
    return(tr[k])
}


function dtb_rm_via_kv(dtb:Array<any>,k:any,v:any):Array<any> {
    dtb = dtb.filter(r=>(r[k]!==v))
    return(dtb)
}

function dtb_rm_via_id(dtb:Array<any>,_id:any):Array<any> {
    dtb = dtb_rm_via_kv(dtb,'_id',_id) 
    return(dtb)
}


function dtb_get_seq_via_kv(dtb:Array<any>,k:any,v:any):number {
    let seq = dtb.findIndex(r=>r[k]===v)
    return(seq)
}

function dtb_get_seq_via_id(dtb:Array<any>,_id:any):number {
    let seq = dtb.findIndex(r=>r['_id']===_id)
    return(seq)
}

//
function gen_guid() {
    let s = 
        'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
            /[xy]/g,
            function(c:string):string {
                let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8)
                return(v.toString(16))
            }
         )
    s = s + '@' + (new Date()).getTime()
    return(s)
}




export {
    //
    dcp,
    //
    is_int_str,
    //
    range,
    slct_via_seqs,
    array_lst,
    array_max,
    array_min,
    //
    mat_mapv,
    mat_mapxyv,
    //
    dict_length,
    is_empty_dict,
    dict_keys,
    dict_values,
    dict_foreach,
    dict_mapk,
    dict_mapv,
    dict_update_force,
    dict_update,
    //
    dtb_get_tr_via_kv,
    dtb_get_fst_tr_via_kv,
    dtb_get_tr_via_id,
    dtb_get_val_via_id_and_key,
    dtb_rm_via_kv,
    dtb_rm_via_id,
    dtb_get_seq_via_kv,
    dtb_get_seq_via_id,
    //
    gen_guid,
}
