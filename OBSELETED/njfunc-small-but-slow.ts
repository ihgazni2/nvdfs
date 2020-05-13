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
    _tree:undefined|string,
    $visited:undefined|boolean,
    $ui:any,
}

type NJ_OR_NULL = Njson | null
type NJ_OR_UNDEFINED = Njson | undefined
type BL_OR_UNDEFINED = boolean | undefined


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
        _tree:_id,
        $visited:undefined
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
        _tree:undefined,
        $visited:undefined,
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

function is_lonely(njarr:Array<Njson>,nj:Njson):boolean {
    let cond = is_root(nj)
    if(cond) {
        return(true)
    } else {
        let parent:any = get_parent(njarr,nj)
        let children = get_children(njarr,parent)
        return(children.length === 1)
    }
}

//read tree
function get_nj_via_id_from_njarr(njarr:Array<Njson>,_id:string):Njson {
    /*@level-0@*/
    let nj = cmmn.dtb_get_tr_via_id(njarr,_id)
    return(nj)
}

function get_sdfs_seq_via_id(sdfs:Array<Njson>,_id:string):number {
    let seq = sdfs.findIndex(
        nj=>(nj._id === _id)
    )
    return(seq)
}

//// child
function get_fstch(njarr:Array<Njson>,nj:Njson):NJ_OR_NULL {
    let chid = nj._fstch
    let fstch = (chid===null)?null:get_nj_via_id_from_njarr(njarr,chid)
    return(fstch)
}

function get_lstch(njarr:Array<Njson>,nj:Njson):NJ_OR_NULL {
    let child = get_fstch(njarr,nj)
    let prev = child
    while(child!==null){
        prev = child
        child = get_rsib(njarr,child)
    }
    return(prev)
}

function get_children(njarr:Array<Njson>,nj:Njson):Array<Njson> {
    let children:Array<Njson> = []
    let child = get_fstch(njarr,nj)
    while(child!==null){
        children.push(child)
        child = get_rsib(njarr,child)
    }
    return(children)
}


function get_which_child(njarr:Array<Njson>,nj:Njson,which:number):NJ_OR_NULL {
    let cond = (which <0)
    if(cond){
        return(null)
    } else {
        let child = get_fstch(njarr,nj)
        let c = 0
        while(child!==null){
            if(c === which) {
                return(child)
            } else {
                child = get_rsib(njarr,child)
                c = c + 1
            }
        }
        return(null)
    }
}



function get_some_children(njarr:Array<Njson>,nj:Njson,...whiches:Array<number>):Array<Njson> {
    let children = get_children(njarr,nj)
    let some:Array<Njson> = []
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
function get_parent(njarr:Array<Njson>,nj:Njson):NJ_OR_NULL {
    /*@level-3@*/
    let parent:NJ_OR_NULL;
    if(is_root(nj)) {
        parent = null
    } else {
        let lstrsib:any = get_lstsib(njarr,nj,true)
        let pid:any = lstrsib._parent
        parent = (pid===null)?null:get_nj_via_id_from_njarr(njarr,pid)
    }
    return(parent)
}


function get_root(njarr:Array<Njson>):NJ_OR_NULL {
    /*@level-4@*/
    let nj = njarr[0]
    let lst_parent = nj
    let parent = get_parent(njarr,nj)
    while(parent !== null) {
        lst_parent = parent
        parent = get_parent(njarr,parent)
    }
    return(lst_parent)
}

function get_ances(njarr:Array<Njson>,nj:Njson,including_self:boolean=false):Array<Njson> {
    /*level-4*/
    let ances:Array<Njson> = []
    let parent:any = get_parent(njarr,nj)
    while(parent !== null) {
        ances.push(parent)
        parent = get_parent(njarr,parent)
    }
    if(including_self){
        ances.unshift(nj)
    } else {

    }
    return(ances)
}

function get_which_ance(njarr:Array<Njson>,nj:Njson,which:number):NJ_OR_NULL {
    let ances = get_ances(njarr,nj,true)
    let lngth = ances.length
    let cond = (which<lngth) && (which>=0)
    if(cond) {
        return(ances[which])
    } else {
        return(null)
    }
}


function get_some_ances(njarr:Array<Njson>,nj:Njson,...whiches:Array<number>):Array<Njson> {
    let ances = get_ances(njarr,nj,true)
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
function get_rsib(njarr:Array<Njson>,nj:Njson):NJ_OR_NULL {
    /*@level-1@*/
    let sibid = nj._rsib
    let rsib = (sibid===null)?null:get_nj_via_id_from_njarr(njarr,sibid)
    return(rsib)
}

function get_lsib(njarr:Array<Njson>,nj:Njson):NJ_OR_NULL {
    let sibs = get_sibs(njarr,nj,true)
    let seq = cmmn.dtb_get_seq_via_id(sibs,nj._id)
    if(seq === 0) {
        return(null)
    } else {
        return(sibs[seq-1])
    }
}


function get_lstsib(njarr:Array<Njson>,nj:Njson,including_self:boolean=false):NJ_OR_NULL {
    /*@level-2@*/
    let lstrsib = nj 
    let rsib = get_rsib(njarr,nj)
    while(rsib!==null) {
        lstrsib = rsib
        rsib = get_rsib(njarr,rsib)
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

function get_sibs(njarr:Array<Njson>,nj:Njson,including_self:boolean=false):Array<Njson> {
    let parent = get_parent(njarr,nj)
    let sibs;
    if(parent !== null) {
        sibs = get_children(njarr,parent)
    } else {
        sibs =[nj]
    }
    if(including_self) {
        return(sibs)
    } else {
        sibs = cmmn.dtb_rm_via_id(sibs,nj._id)
    }
    return(sibs)
}




function get_preceding_sibs(njarr:Array<Njson>,nj:Njson):Array<Njson> {
    let sibs = get_sibs(njarr,nj,true)
    let seq = cmmn.dtb_get_seq_via_id(sibs,nj._id)
    let psibs:Array<Njson> = []
    if(sibs.length ===0) {

    } else {
        for(let i=0;i<sibs.length;i++) {
            let cond = i<seq
            if(cond) {
                psibs.push(sibs[i])
            }
        }
    }
    return(psibs)
}


function get_following_sibs(njarr:Array<Njson>,nj:Njson):Array<Njson> {
    let sibs = get_sibs(njarr,nj,true)
    let seq = cmmn.dtb_get_seq_via_id(sibs,nj._id)
    let fsibs:Array<Njson> = []
    if(sibs.length ===0) {

    } else {
        for(let i=0;i<sibs.length;i++) {
            let cond = i>seq
            if(cond) {
                fsibs.push(sibs[i])
            }
        }
    }
    return(fsibs)
}


function get_fstsib(njarr:Array<Njson>,nj:Njson,including_self:boolean=false):NJ_OR_NULL {
    let sibs:Array<Njson> = get_sibs(njarr,nj,true)
    if(including_self) {
        return(sibs[0])
    } else {
        if(sibs[0]._id === nj._id) {
            return(null)
        } else {
            return(sibs[0])
        }
    }
}

function get_which_sib(njarr:Array<Njson>,nj:Njson,which:number):NJ_OR_NULL {
    let sibs = get_sibs(njarr,nj,true)
    let lngth = sibs.length
    let cond = (which<=lngth-1) && (which >=0)
    if(cond) {
        return(sibs[which])
    } else {
        return(null)
    }
}


function get_some_sibs(njarr:Array<Njson>,nj:Njson,...whiches:Array<number>):Array<Njson> {
    let sibs = get_sibs(njarr,nj,true)
    let some:Array<Njson> = []
    if(sibs.length ===0) {

    } else {
        for(let i=0;i<whiches.length;i++) {
            let which = whiches[i]
            let cond = (which>sibs.length-1) || (which <0)
            if(cond) {

            } else {
                some.push(sibs[which])
            }
        }
    }
    return(some)
}


function get_sibseq(njarr:Array<Njson>,nj:Njson):number {
    let sibs = get_sibs(njarr,nj,true)
    let seq = cmmn.dtb_get_seq_via_id(njarr,nj._id)
    return(seq)
}

function get_rsib_of_fst_ance_having_rsib(njarr:Array<Njson>,nj:Njson):NJ_OR_NULL {
    /*
        along the parent chain until root,not_including_self
        if the parent have rsib,return the rsib-of-parent
        ---------
    */
    let parent = get_parent(njarr,nj)
    while(parent!==null) {
        let rsib = get_rsib(njarr,parent)
        if(rsib!==null) {
            return(rsib)
        } else {
            parent = get_parent(njarr,parent)
        }
    }
    return(null)
}


function get_lsib_of_fst_ance_having_lsib(njarr:Array<Njson>,nj:Njson):NJ_OR_NULL {
    /*
        along the parent chain until root,not_including_self
        if the parent have lsib,return the lsib-of-parent
        ---------
    */
    let parent = get_parent(njarr,nj)
    while(parent!==null) {
        let lsib = get_lsib(njarr,nj)
        if(lsib!==null) {
            return(lsib)
        } else {
            parent = get_parent(njarr,nj)
        }
    }
    return(null)
}


////des

function get_deses(njarr:Array<Njson>,nj:Njson,including_self:boolean=false):Array<Njson> {
    let deses = get_sdfs(njarr,nj)
    if(including_self) {
    } else {
        deses.splice(0,1)
    }
    return(<Array<Njson>>deses)
}



function get_drmost_des(njarr:Array<Njson>,nj:Njson):Njson{
    /*
       down-most  and right-most of subtree
       including_self
    */
    let old_lstch = nj
    let lstch = get_lstch(njarr,nj)
    while(lstch !== null) {
        old_lstch = lstch
        lstch = get_lstch(njarr,lstch)
    }
    return(old_lstch)
}


function get_dlmost_des(njarr:Array<Njson>,nj:Njson):Njson {
    /*
     *  down-most  and left-most of subtree
        including_self
    */
    let old_fstch = nj 
    let fstch = get_fstch(njarr,nj)
    while(fstch !== null) {
        old_fstch = fstch
        fstch = get_fstch(njarr,fstch)
    }
    return(old_fstch)
}

function get_fstlyr_deses(njarr:Array<Njson>,nj:Njson):Array<Njson> {
    return(get_children(njarr,nj))
}

function get_lstlyr_deses(njarr:Array<Njson>,nj:Njson):Array<Njson> {
    let deses = get_deses(njarr,nj,false)
    let des_depths = njarr.map(r=>get_depth(njarr,r))
    let max = Math.max(...des_depths)
    deses = deses.filter(r=>(get_depth(njarr,r)===max))
    return(deses)
}

function get_which_lyr_deses(njarr:Array<Njson>,nj:Njson,which:number):Array<Njson> {
    let depth = get_depth(njarr,nj)
    let deses = get_deses(njarr,nj,false)
    let des_depths = njarr.map(r=>get_depth(njarr,r))
    deses = deses.filter(r=>(get_depth(njarr,r)===(depth+which)))
    return(deses)
}

function get_some_lyrs_deses(njarr:Array<Njson>,nj:Njson,...whiches:Array<number>):Array<Njson> {
    let deses:any = whiches.map(which => get_which_lyr_deses(njarr,nj,which))
    deses = Array.prototype.concat(...deses)
    return(deses)
}


//mat
function get_depth(njarr:Array<Njson>,nj:Njson):number {
    let ances = get_ances(njarr,nj,false)
    return(ances.length)
}

function get_breadth(sdfs:Array<Njson>,nj:Njson):number {
    let lyr = get_lyr(sdfs,nj)
    let breadth = cmmn.dtb_get_seq_via_id(lyr,nj._id)
    return(breadth)
}

function get_count(njarr:Array<Njson>):number {
    return(njarr.length)
}

function get_height(njarr:Array<Njson>,nj:Njson):number {
    let depth = get_depth(njarr,nj)
    let des_depths = njarr.map(r=>get_depth(njarr,r))
    let max = Math.max(...des_depths)
    return(max-depth+1)
}



////lyr
function get_lyr(sdfs:Array<Njson>,nj:Njson):Array<Njson> {
    let depth = get_depth(sdfs,nj)
    let lyr = sdfs.filter(r=>(get_depth(sdfs,r) === depth))
    return(lyr)
}

function get_fstlyr_des_depth(sdfs:Array<Njson>,nj:Njson):number|null {
    let cond = is_leaf(nj)
    if(cond) {
        return(null)
    } else {
        let depth = get_depth(sdfs,nj)
        return(depth+1)
    }
}

function get_lstlyr_des_depth(sdfs:Array<Njson>,nj:Njson):number|null {
    let cond = is_leaf(nj)
    if(cond) {
        return(null)
    } else {
        let depth = get_depth(sdfs,nj)
        let des_depths = sdfs.map(r=>get_depth(sdfs,r))
        let max = Math.max(...des_depths)
        return(max)
    }
}

function get_which_lyr_des_depth(sdfs:Array<Njson>,nj:Njson,which:number):number|null {
    let depth = get_depth(sdfs,nj)
    let height = get_height(sdfs,nj)
    if(height<=which){
        return(null)
    } else {
        return(depth+which)
    }
}

//SDFS

function get_sdfs_next(njarr:Array<Njson>,nj:Njson):NJ_OR_NULL {
    /*
        having_child?
            fstch:
            having_rsib?
                rsib:
                rsib_of_fst_@ance_having_rsib)
    */
    let fstch = get_fstch(njarr,nj)
    if(fstch !== null) {
        return(fstch)
    } else {
        let rsib = get_rsib(njarr,nj)
        if(rsib !== null) {
            return(rsib)
        } else {
            return(get_rsib_of_fst_ance_having_rsib(njarr,nj))
        }
    }
}


function get_sdfs_prev(njarr:Array<Njson>,nj:Njson):NJ_OR_NULL {
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
    if(is_root(nj)) {
        return(null)
    }
    let cond = is_leaf(nj)
    if(cond) {
        let lsib = get_lsib(njarr,nj)
        if(lsib !== null) {
            return(lsib)
        } else {
            let parent = get_parent(njarr,nj)
            return(parent)
        }
    } else {
        let lsib = get_lsib(njarr,nj)
        if(lsib !== null) {
            let cond = is_leaf(lsib)
            if(cond) {
                return(lsib)
            } else {
                return(get_drmost_des(njarr,lsib))
            }
        } else {
            let parent = get_parent(njarr,nj)
            return(parent)
        }
    }
}


function get_sdfs(njarr:Array<Njson>,nj:Njson):Array<NJ_OR_NULL> {
    let nnj:NJ_OR_NULL = nj;
    let nj_depth = get_depth(njarr,nnj)
    let sdfs:Array<NJ_OR_NULL> =[]
    while(nnj!==null) {
        sdfs.push(nnj)
        nnj = get_sdfs_next(njarr,nnj)
        if(nnj!==null) {
            let depth = get_depth(njarr,nnj)
            if(depth<=nj_depth) {
                break
            }
        }
    }
    return(sdfs)
}


//EDFS
function get_edfs_next(njarr:Array<Njson>,nj:Njson):NJ_OR_NULL {
    let rsib = get_rsib(njarr,nj)
    if(rsib === null) {
        //如果没有右兄弟，说明节点是lstch,此时应该返回父节点
        let p = get_parent(njarr,nj)
        return(p)
    } else {
       //如果有右兄弟，返回down-left-most-of-rsib
       return(get_dlmost_des(njarr,rsib))
    }
}

function get_edfs_prev(njarr:Array<Njson>,nj:Njson):NJ_OR_NULL {
    let cond = is_leaf(nj)
    if(!cond) {
        return(get_lstch(njarr,nj))
    } else {
       let lsib = get_lsib(njarr,nj)
       if(lsib === null) {
           return(get_lsib_of_fst_ance_having_lsib(njarr,nj))
       } else {
           return(lsib)
       }
    }
}

function get_edfs(njarr:Array<Njson>,nj:Njson):Array<NJ_OR_NULL> {
    let edfs:Array<Njson> = []
    let nxt = get_dlmost_des(njarr,nj)
    while(nxt !== null ) {
        edfs.push(nxt)
        if(nxt._id === nj._id) {
            break;
        } else {
            nxt = <Njson>get_edfs_next(njarr,nxt)
        }
    }
    return(edfs)
}

//SEDFS
function clear_$visited(njarr:Array<Njson>):Array<Njson> {
    njarr.forEach(
        nj=>{
            nj.$visited = false
        }
    )
    return(njarr)
}

function get_sedfs_next(njarr:Array<Njson>,nj:Njson):NJ_OR_NULL {
    let visited = nj.$visited
    let conj = is_leaf(nj)
    if(conj) {
        if(visited) {
            let rsib = get_rsib(njarr,nj)
            if(rsib === null) {
                return(get_parent(njarr,nj))
            } else {
                return(rsib)
            }
        } else {
            nj.$visited = true
            return(nj)
        }
    } else {
        if(visited) {
            let rsib = get_rsib(njarr,nj)
            if(rsib === null) {
                return(get_parent(njarr,nj))
            } else {
                return(rsib)
            }
        } else {
            nj.$visited = true
            return(get_fstch(njarr,nj))
        }
    }
}


function get_sedfs_prev(njarr:Array<Njson>,nj:Njson,visited:BL_OR_UNDEFINED):NJ_OR_NULL {
    let cond = is_leaf(nj)
    if(cond) {
        if(visited) {
            return(nj)
        } else {
            let lsib = get_lsib(njarr,nj)
            if(lsib === null) {
                return(get_parent(njarr,nj))
            } else {
                return(lsib)
            }
        }
    } else {
        if(visited) {
            return(get_lstch(njarr,nj))
        } else {
            let lsib = get_lsib(njarr,nj)
            if(lsib === null) {
                return(get_parent(njarr,nj))
            } else {
                return(lsib)
            }
        }
    }
}

function is_sedfs_traverse_finished(nj:Njson,start_id:string):boolean {
    let cond = (nj.$visited) && (start_id === nj._id)
    return(<boolean>cond)
}

function get_sedfs(
    njarr:Array<Njson>,
    nj:Njson,
    deepcopy:boolean=false,
    clear:boolean=true
):Array<Njson> {
    let sedfs:Array<Njson> = []
    clear_$visited(njarr)
    let start_id = nj._id
    while(!is_sedfs_traverse_finished(nj,start_id)) {
        deepcopy? sedfs.push(cmmn.dcp(nj)):sedfs.push(nj)
        nj = <Njson>get_sedfs_next(njarr,nj)
    }
    deepcopy?sedfs.push(cmmn.dcp(nj)):sedfs.push(nj)
    if(clear){
        clear_$visited(njarr)
    }
    return(sedfs)
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
            let old_fstch = get_nj_via_id_from_njarr(sdfs,(nj._fstch as any))
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
        let old_lstch:any;
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
            let old_lstch_drmost:any = get_drmost_des(sdfs,old_lstch)
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

function insert_child(sdfs:Array<Njson>,nj:Njson,which:number,child?:NJ_OR_UNDEFINED):Njson {
    /*
        signal = {
            action:insert_child,
            treeid:sdfs[0]._id,
            njid:nj._id,
            index:which,
            child:child
        }
    */
    child = (child === undefined)?creat_nj():child;
    let cond = is_connectable(child);
    if(cond) {
        let children = get_children(sdfs,nj)
        let lngth = children.length
        if(lngth ===0) {
            return(prepend_child(sdfs,nj,child))
        } else {
            let cond = (which<=lngth) && (which >=0)
            if(!cond) {
                console.log("not in range!!")
                return(child)
            } else {
                if(which === 0) {
                    return(prepend_child(sdfs,nj,child))
                } else if(which === lngth) {
                    return(append_child(sdfs,nj,child))
                } else {
                    let lnj = children[which-1]
                    return(add_rsib(sdfs,lnj,child))
                }
            }
        }
    } else {
        console.log('only root or uninited could be inserted');
    }
    return(child)
}

function add_lsib(sdfs:Array<Njson>,nj:Njson,lsib?:NJ_OR_UNDEFINED):Njson {
    /*
        signal = {
            action:add_lsib,
            treeid:sdfs[0]._id,
            njid:nj._id,
            lsib:lsib
        }
    */
    lsib = (lsib === undefined)?creat_nj():lsib;
    let cond = is_connectable(lsib);
    if(cond) {
        //root 不可操作
        if(is_root(nj)) {
            console.log("cant addlsib to root")
        } else {
            //
            let cond = is_fstch(nj)
            lsib._tree = nj._tree
            if(cond) {
                let parent = <Njson>get_parent(sdfs,nj)
                nj._lsib = undefined
                lsib._lsib = null
                parent._fstch = lsib._id
            } else {
                let old_lsib = <Njson>get_lsib(sdfs,nj)
                old_lsib._rsib = lsib._id
                //
                lsib._lsib = undefined
            }
            lsib._rsib = nj._id
            //lsib 一定不是lstch
            lsib._parent = undefined
            //插入sdfs,lsib在当前nj位置,当前nj后移
            let _id = nj._id
            let seq = get_sdfs_seq_via_id(sdfs,_id)
            sdfs.splice(seq,0,lsib)
        }
    } else { 
        console.log('only root or uninited could be add')
    }
    return(lsib)
}

function add_rsib(sdfs:Array<Njson>,nj:Njson,rsib?:NJ_OR_UNDEFINED):Njson {
    /*
        signal = {
            action:add_lsib,
            treeid:sdfs[0]._id,
            njid:nj._id,
            rsib:rsib
        }
    */
    rsib = (rsib === undefined)?creat_nj():rsib;
    let cond = is_connectable(rsib);
    if(cond) {
        //root 不可操作
        if(is_root(nj)) {
            console.log("cant addrsib to root")
        } else {
            //
            let cond = is_lstch(nj)
            rsib._tree = nj._tree
            if(cond) {
                rsib._parent = nj._parent
                nj._parent = undefined
                rsib._rsib = null
            } else {
                rsib._rsib = nj._rsib
                rsib._parent = undefined
            }
            nj._rsib = rsib._id
            //rsib 一定不是fstch
            rsib._lsib = undefined
            //插入sdfs,lsib在当前nj位置+1,当前nj不动
            let _id = nj._id
            let seq = get_sdfs_seq_via_id(sdfs,_id)
            let rsib_seq = seq + 1
            sdfs.splice(rsib_seq,0,rsib)
        }
    } else { 
        console.log('only root or uninited could be add');
    }
    return(rsib)
}


//transform

function njarr2sdfs(njarr:Array<Njson>):Array<Njson> {
    let rj = <Njson>get_root(njarr)
    let sdfs = <Array<Njson>>get_sdfs(njarr,rj)
    return(sdfs)
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
    get_nj_via_id_from_njarr,
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
    get_lsib,
    get_sibs,
    get_preceding_sibs,
    get_following_sibs,
    get_fstsib,
    get_sibseq,
    get_which_sib,
    get_some_sibs,
    get_rsib_of_fst_ance_having_rsib,
    get_lsib_of_fst_ance_having_lsib,
    //
    get_parent,
    get_root,
    get_ances,
    get_which_ance,
    get_some_ances,
    //
    get_drmost_des,
    get_dlmost_des,
    get_deses,
    get_fstlyr_deses,
    get_lstlyr_deses,
    get_which_lyr_deses,
    get_some_lyrs_deses,
    //
    get_lyr,
    get_fstlyr_des_depth,
    get_lstlyr_des_depth,
    get_which_lyr_des_depth,
    get_depth,
    get_breadth,
    get_count,
    get_height,
    //
    get_sdfs_next,
    get_sdfs_prev,
    get_sdfs,
    //
    get_edfs_next,
    get_edfs_prev,
    get_edfs,    
    //
    clear_$visited,
    get_sedfs_next,
    get_sedfs_prev,
    is_sedfs_traverse_finished,
    get_sedfs,
    //
    prepend_child,
    append_child,
    insert_child,
    add_rsib,
    add_lsib,
    //
    njarr2sdfs,
}
