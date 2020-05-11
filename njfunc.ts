/*
 * this version is guid version
 *
 * nj                json-node
 * sdfs              array-of-nj-in-depth-first-traverse
 * rj                json-root-node
 * chnj              child-node
 *
 * fstch             first-child
 * lstch             last-child
 * midch             middle-child
 * 
 * connectable       could-be-connected-to-other-node;
 *                   which means root or uninited;
 *                   other-node must be disconn-from-curr-tree first
 *                   before conn-to-other-node
 * 
 * lonely            have-no-sibling
 *
 * exp               explict-relation,which is not undefined
 * mandatory-exp     _id,_fstch,_rsib,
 * imp               implicit-relation,which is undefined
 *                   _lsib is implicit when node is not fstch
 *                   _parent is implicit when node is not lstch
 *                   _tree is implicit only-when node is uninited
 *
 *                   
 *
 */

import * as cmmn from "./cmmn"
import * as idfunc from "./idfunc"

//creat-json-node

interface Njson {
    _id:string,
    _fstch:null|string,
    _lsib:null|undefined|string,
    _rsib:null|string,
    _parent:null|undefined|string,
    _tree:undefined|string
}


function creat_rj():Njson {
    ////    
    //// creat_rj()
    ////    
    let _id = idfunc.gen_id({});
    let rj:Njson = {
        _id:_id,
        _fstch:null,
        _lsib:null,
        _rsib:null,
        _parent:null,
        _tree:_id
    }
    return(rj)
}


function creat_nj():Njson {
    ////
    //// creat_nj()  not-inited
    ////
    let _id = idfunc.gen_id({})
    let nj:Njson = {
        _id:_id,
        _fstch:null,
        _lsib:undefined,
        _rsib:null,
        _parent:undefined,
        _tree:undefined
    }
    return(nj)
}


function creat_sdfs():Array<Njson> {
    let rj:Njson = creat_rj()
    let sdfs = [rj]
    return(sdfs)
}


//is

function is_inited(nj:Njson):boolean {
    ////attached-to-a-tree
    let cond = (nj._tree !== undefined)
    return(cond)
}

function is_root(nj:Njson):boolean {
    //_tree is self._id
    let cond0 = (nj._tree!== undefined)
    let cond1 = (nj._tree === nj._id)
    return(cond0 && cond1)
}

function is_fstch(nj:Njson):boolean {
    //self._lsib is null
    let cond = (nj._lsib === null)
    return(cond)
}


function is_lstch(nj:Njson):boolean {
    //self._rsib is null
    let cond = (nj._rsib === null)
    return(cond)
}


function is_midch(nj:Njson):boolean {
    let cond0 = !is_fstch(nj)
    let cond1 = !is_lstch(nj)
    return(cond0 && cond1)
}

function is_leaf(nj:Njson):boolean {
    //have-no-children
    let cond = (nj._fstch === null)
    return(cond)
}


function is_connectable(nj:Njson):boolean {
    return(is_root(nj) || !is_inited(nj))
}

function is_lonely(sdfs:Array<Njson>,nj:Njson):boolean {
    let cond = is_root(nj)
    if(cond) {
        return(true)
    } else {
        let parent = get_parent(sdfs,nj)
        let children = get_children(sdfs,parent)
        return(children.length === 1)
    }
}


//read tree
function get_nj_via_id_from_sdfs(sdfs:Array<Njson>,_id:string):Njson {
    let nj = cmmn.dtb_get_tr_via_id(sdfs,_id)
    return(nj)
}

function get_sdfs_seq_via_id(sdfs:Array<Njson>,_id:string):number {
    let seq = sdfs.findIndex(
        nj=>(nj._id === _id)
    )
    return(seq)
}

//// child
function get_fstch(sdfs:Array<Njson>,nj:Njson):any {
    let chid = nj._fstch
    let fstch = (chid===null)?null:get_nj_via_id_from_sdfs(sdfs,chid)
    return(fstch)
}

function get_lstch(sdfs:Array<Njson>,nj:Njson):any {
    let child = get_fstch(sdfs,nj)
    let prev = child
    while(child!==null){
        prev = child
        child = get_rsib(sdfs,child)
    }
    return(prev)
}

function get_children(sdfs:Array<Njson>,nj:Njson):any {
    let children:Array<any> = []
    let child = get_fstch(sdfs,nj)
    while(child!==null){
        children.push(child)
        child = get_rsib(sdfs,nj)
    }
    return(children)
}


function get_which_child(sdfs:Array<Njson>,nj:Njson,which:number):any {
    let cond = (which <0)
    if(cond){
        return(null)
    } else {
        let child = get_fstch(sdfs,nj)
        let c = 0
        while(child!==null){
            if(c === which) {
                return(child)
            } else {
                child = get_rsib(sdfs,child)
                c = c + 1
            }
        }
        return(null)
    }
}

function get_some_children(sdfs:Array<Njson>,nj:Njson,...whiches:Array<number>):any {
    let children = get_children(sdfs,nj)
    let some:Array<any> = []
    if(children.length ===0) {

    } else {
        for(let i=0;i<whiches.length;i++) {
            let which = whiches[i]
            let cond = (which>children.length-1) || (which <0)
            if(cond) {

            } else {
                some.push(children[which])
            }
        }
    }
    return(some)
}

////parent
function get_parent(sdfs:Array<Njson>,nj:Njson):any {
    let parent:any;
    if(is_root(nj)) {
        parent = null
    } else {
        let lstrsib:any = get_lstsib(sdfs,nj,true)
        let pid:any = lstrsib._parent
        parent = (pid===null)?null:get_nj_via_id_from_sdfs(sdfs,pid)
    }
    return(parent)
}


function get_root(sdfs:Array<Njson>):any {
    return(sdfs[0])
}

function get_ances(sdfs:Array<Njson>,nj:Njson,including_self:boolean=false):Array<Njson> {
    let ances:Array<any> = []
    let parent:any = get_parent(sdfs,nj)
    while(parent !== null) {
        ances.push(parent)
        parent = get_parent(sdfs,parent)
    }
    if(including_self){
        ances.unshift(nj)
    } else {

    }
    return(ances)
}

function get_which_ance(sdfs:Array<Njson>,nj:Njson,which:number):any {
    let ances = get_ances(sdfs,nj,true)
    let lngth = ances.length
    let cond = (which<lngth) && (which>=0)
    if(cond) {
        return(ances[which])
    } else {
        return(null)
    }
}

function get_some_ances(sdfs:Array<Njson>,nj:Njson,...whiches:Array<number>):Array<Njson> {
    let ances = get_ances(sdfs,nj,true)
    let some:Array<Njson> = []
    if(ances.length ===0) {

    } else {
        for(let i=0;i<whiches.length;i++) {
            let which = whiches[i]
            let cond = (which>ances.length-1) || (which <0)
            if(cond) {

            } else {
                some.push(ances[which])
            }
        }
    }
    return(some)
}


//// sib
function get_rsib(sdfs:Array<Njson>,nj:Njson):any {
    let sibid = nj._rsib
    let rsib = (sibid===null)?null:get_nj_via_id_from_sdfs(sdfs,sibid)
    return(rsib)
}

function get_lstsib(sdfs:Array<Njson>,nj:Njson,including_self:boolean=false) {
    let lstrsib = nj 
    let rsib = get_rsib(sdfs,nj)
    while(rsib!==null) {
        lstrsib = rsib
        rsib = get_rsib(sdfs,rsib)
    }
    if(including_self){
        return(lstrsib)
    } else {
        if(lstrsib._id !== nj._id) {
            return(lstrsib)
        } else {
            return(null)
        }
    }
}



////des
function get_drmost_des(sdfs:Array<Njson>,nj:Njson):any{
    /*
       down-most  and right-most of subtree
       including_self
    */
    let old_lstch = nj
    let lstch = get_lstch(sdfs,nj)
    while(lstch !== null) {
        old_lstch = lstch
        lstch = get_lstch(sdfs,lstch)
    }
    return(old_lstch)
}



//write tree
function prepend_child(sdfs:Array<Njson>,nj:Njson,child?:any):Njson {
    /*
        signal = {
            action:prepend_child,
            treeid:sdfs[0]._id,
            njid:nj._id,
            child:child
        }
    */
    child = (child === undefined)?creat_nj():child;
    let cond = is_connectable(child);
    if(cond) {
        //update _tree of child  to current-nj._tree
        child._tree = nj._tree
        //child is fstch
        child._lsib = null
        if(is_leaf(nj)) {
            //if parent is leaf, child will be the only-child,so child is also lstch
            child._rsib = null
            //lstch have explicit _parent
            child._parent = nj._id
        } else {
            //get old_fstch
            let old_fstch = get_nj_via_id_from_sdfs(sdfs,(nj._fstch as any))
            //old_fstch will  not be fstch, set old_fstch._lsib to implicit
            old_fstch._lsib = undefined
            //update child._rsib to old_fstch._id
            child._rsib = old_fstch._id
            //child will not be lstch, set child._parent to implicit
            child._parent = undefined
        }
        //update nj._fstch
        nj._fstch = child._id
        //update sdfs
        let _id = nj._id
        let seq = get_sdfs_seq_via_id(sdfs,_id)
        let chseq = seq + 1
        sdfs.splice(chseq,0,child)
        //
    } else {
        console.log('only root or uninited could be prepend');
    }
    return(child)
}


function append_child(sdfs:Array<Njson>,nj:Njson,child?:any):Njson {
    /*
        signal = {
            action:append_child,
            treeid:sdfs[0]._id,
            njid:nj._id,
            child:child
        }
    */
    child = (child === undefined)?creat_nj():child;
    let cond = is_connectable(child);
    if(cond) {
        child._tree = nj._tree
        child._rsib = null
        let old_lstch:Njson;
        if(is_leaf(nj)){
            //child 也是lstch
            nj._fstch = child._id
            child._lsib = null
            //
            let _id = nj._id
            let seq = get_sdfs_seq_via_id(sdfs,_id)
            let chseq = seq + 1
            sdfs.splice(chseq,0,child)
        } else {
            old_lstch = get_lstch(sdfs,nj)
            //old_lstch will not be lstch any more. set old_lstch._parent to implicit
            old_lstch._parent = undefined
            //update old_lstch._rsib to child
            old_lstch._rsib = child._id
            //child will not be fstch , set child._lsib to implicit
            child._lsib = undefined
            //
            let old_lstch_drmost:Njson = get_drmost_des(sdfs,old_lstch)
            let seq = get_sdfs_seq_via_id(sdfs,old_lstch_drmost._id)
            let chseq = seq + 1
            sdfs.splice(chseq,0,child)
        }
        //child is lstch,update parent 
        child._parent = nj._id
        //
    } else {
        console.log('only root or uninited could be appended');
    }
    return(child)
}


export {
    creat_rj,
    creat_nj,
    creat_sdfs,
    //
    is_inited,
    is_root,
    is_fstch,
    is_lstch,
    is_midch,
    is_leaf,
    is_connectable,
    is_lonely,
    //
    get_nj_via_id_from_sdfs,
    get_sdfs_seq_via_id,
    //
    get_fstch,
    get_lstch,
    get_children,
    get_which_child,
    get_some_children,
    //
    get_rsib,
    get_lstsib,
    //
    get_parent,
    get_root,
    //
    get_drmost_des,
    //
    prepend_child,
    append_child,
}
