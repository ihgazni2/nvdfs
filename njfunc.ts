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

import * as cmmn from "./cmmn"
import * as idfunc from "./idfunc"

//creat-json-node

interface Njson {
    _id:string,
    _fstch:null|string,
    _lsib:null|string,
    _rsib:null|string,
    _parent:null|string,
    _depth:number,        
    _tree:undefined|string,
    $visited?:any,
    $ui?:any,
    [k:string]:any
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
        _depth:0,
        _tree:_id,
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
        _lsib:null,
        _rsib:null,
        _parent:null,
        _depth:0,
        _tree:undefined,
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
    //not_fstch and not lstch
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
    return(is_root(nj) || !is_inited(nj))
}

function is_lonely(nj:Njson):boolean {
    let cond0 =  (nj._lsib === null) 
    let cond1 =  (nj._rsib === null)
    return(cond0 && cond1)
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
    /*
     * fstch of leaf_nj will be null
     * fstch of nonleaf_nj will not be null
     */
    let chid = nj._fstch
    let fstch = (chid===null)?null:get_nj_via_id_from_njarr(njarr,chid)
    return(fstch)
}


function get_lstch(njarr:Array<Njson>,nj:Njson):NJ_OR_NULL {
    /*
     * lstch of leaf_nj will be null
     * lstch of nonleaf_nj will be Njson
     *
     */
    let child = get_fstch(njarr,nj)
    let prev = child
    while(child!==null){
        prev = child
        child = get_rsib(njarr,child)
    }
    return(prev)
}



function get_children(njarr:Array<Njson>,nj:Njson):Array<Njson> {
    /*
     * fstch->rsib->rsib.....->lstch 
     *
     */
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
    let pid = nj._parent
    if(pid === null) {
        return(null)
    } else {
        return(get_nj_via_id_from_njarr(njarr,pid))
    }
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
    let sibid = nj._lsib
    let lsib = (sibid===null)?null:get_nj_via_id_from_njarr(njarr,sibid)
    return(lsib)
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

function get_fstsib(njarr:Array<Njson>,nj:Njson,including_self:boolean=false):NJ_OR_NULL {
    /*@level-2@*/
    let lstlsib = nj
    let lsib = get_lsib(njarr,nj)
    while(lsib!==null) {
        lstlsib = lsib
        lsib = get_lsib(njarr,lsib)
    }
    if(including_self){
        return(lstlsib)
    } else {
        if(lstlsib._id !== nj._id) {
            return(lstlsib)
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


function get_psibs(njarr:Array<Njson>,nj:Njson):Array<Njson> {
    let psibs:Array<Njson> = []
    let psib = nj
    while(psib._lsib !== null) {
        psib = get_nj_via_id_from_njarr(njarr,psib._lsib)
        psibs.unshift(psib)
    }
    return(psibs)
}


function get_fsibs(njarr:Array<Njson>,nj:Njson):Array<Njson> {
    let fsibs:Array<Njson> = []
    let fsib = nj
    while(fsib._rsib !== null) {
        fsib = get_nj_via_id_from_njarr(njarr,fsib._rsib)
        fsibs.push(fsib)
    }
    return(fsibs)
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
    let seq = cmmn.dtb_get_seq_via_id(sibs,nj._id)
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
        let lsib = get_lsib(njarr,parent)
        if(lsib!==null) {
            return(lsib)
        } else {
            parent = get_parent(njarr,parent)
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

function get_breadth(njarr:Array<Njson>,nj:Njson,is_already_sdfs:boolean=true):number {
    /*
     */
    let sdfs:Array<Njson>;
    if(is_already_sdfs) {
        sdfs = njarr    
    } else {
        sdfs = njarr2sdfs(njarr) 
    }
    let lyr = get_lyr(sdfs,nj,is_already_sdfs)
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
function get_lyr(njarr:Array<Njson>,nj:Njson,is_already_sdfs:boolean=true):Array<Njson> {
    let sdfs:Array<Njson>;
    if(is_already_sdfs) {
        sdfs = njarr
    } else {
        sdfs = njarr2sdfs(njarr)
    }
    let depth = get_depth(sdfs,nj)
    let lyr = sdfs.filter(r=>(get_depth(sdfs,r) === depth))
    return(lyr)
}



function get_fstlyr_des_depth(njarr:Array<Njson>,nj:Njson):number|null {
    let cond = is_leaf(nj)
    if(cond) {
        return(null)
    } else {
        let depth = get_depth(njarr,nj)
        return(depth+1)
    }
}

function get_lstlyr_des_depth(njarr:Array<Njson>,nj:Njson):number|null {
    let cond = is_leaf(nj)
    if(cond) {
        return(null)
    } else {
        let depth = get_depth(njarr,nj)
        let des_depths = njarr.map(r=>get_depth(njarr,r))
        let max = Math.max(...des_depths)
        return(max)
    }
}


function get_which_lyr_des_depth(njarr:Array<Njson>,nj:Njson,which:number):number|null {
    let depth = get_depth(njarr,nj)
    let height = get_height(njarr,nj)
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


function get_sdfs(njarr:Array<Njson>,nj?:NJ_OR_UNDEFINED):Array<Njson> {
    let nnj:NJ_OR_NULL = (nj === undefined)?<Njson>get_root(njarr):nj;
    let nj_depth = get_depth(njarr,nnj)
    let sdfs:Array<Njson> =[]
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

        must already be sdfs
    */
    child = (child === undefined)?creat_nj():child;
    let cond = is_connectable(child);
    if(cond) {
        //update _tree of child  to current-nj._tree
        child._tree = nj._tree
        //child is fstch
        child._lsib = null
        //update parent
        child._parent = nj._id
        //update depth
        child._depth = nj._depth + 1 
        //
        if(is_leaf(nj)) {
            //if parent is leaf, child will be the only-child,so child is also lstch
            child._rsib = null
        } else {
            //get old_fstch
            let old_fstch = get_nj_via_id_from_njarr(sdfs,(nj._fstch as any))
            //update old_fstch._lsib to child._id
            old_fstch._lsib = child._id 
            //update child._rsib to old_fstch._id
            child._rsib = old_fstch._id
        }
        //update nj._fstch
        nj._fstch = child._id
        //update sdfs
        //prepend child 就是在自己后面添加
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

        must already be sdfs
    */
    child = (child === undefined)?creat_nj():child;
    let cond = is_connectable(child);
    if(cond) {
        //update _tree
        child._tree = nj._tree
        //update _rsib
        child._rsib = null
        //update _parent
        child._parent = nj._id
        //update depth
        child._depth = nj._depth + 1
        //
        let old_lstch:any;
        //
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
            old_lstch._rsib = child._id
            child._lsib = old_lstch._id 
            //append child
            //首先要找到当前lstch的drmost descedant
            //然后在此 drmost descedant 之后(drmost-descedant-seq + 1)
            //追加
            let old_lstch_drmost:any = get_drmost_des(sdfs,old_lstch)
            let seq = get_sdfs_seq_via_id(sdfs,old_lstch_drmost._id)
            let chseq = seq + 1
            sdfs.splice(chseq,0,child)
        }
    } else {
        console.log('only root or uninited could be appended');
    }
    return(child)
}


function insert_child_via_index(sdfs:Array<Njson>,nj:Njson,which:number,child?:NJ_OR_UNDEFINED):Njson {
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

function insert_child_before(sdfs:Array<Njson>,nj:Njson,child?:NJ_OR_UNDEFINED):Njson {
    let which =  get_sdfs_seq_via_id(sdfs,nj._id)
    return(insert_child_via_index(sdfs,nj,which,child))
}

function insert_child_after(sdfs:Array<Njson>,nj:Njson,child?:NJ_OR_UNDEFINED):Njson {
    let which =  get_sdfs_seq_via_id(sdfs,nj._id) + 1
    return(insert_child_via_index(sdfs,nj,which,child))
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
            let parent = <Njson>get_parent(sdfs,nj)
            lsib._parent = parent._id
            lsib._depth = parent._depth + 1
            if(cond) {
                lsib._lsib = null
                parent._fstch = lsib._id
            } else {
                let old_lsib = <Njson>get_lsib(sdfs,nj)
                old_lsib._rsib = lsib._id
                lsib._lsib = old_lsib._id
            }
            //
            lsib._rsib = nj._id
            nj._lsib = lsib._id
            //插入sdfs, 找到nj
            //直接在nj之前插入
            let seq = get_sdfs_seq_via_id(sdfs,nj._id)
            let sibseq = seq 
            sdfs.splice(sibseq,0,lsib)
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
            let parent = <Njson>get_parent(sdfs,nj)
            rsib._parent = parent._id
            rsib._depth = parent._depth + 1
            if(cond) {
                rsib._rsib = null
            } else {
                let old_rsib = <Njson>get_rsib(sdfs,nj)
                rsib._rsib = old_rsib._id
                old_rsib._lsib = rsib._id
            }
            //
            nj._rsib = rsib._id
            rsib._lsib = nj._id
            //插入sdfs, 找到nj的drmost 
            let drmost:any = get_drmost_des(sdfs,nj)
            let seq = get_sdfs_seq_via_id(sdfs,drmost._id)
            let sibseq = seq + 1
            sdfs.splice(sibseq,0,rsib)
        }
    } else { 
        console.log('only root or uninited could be add');
    }
    return(rsib)
}

//
function update_tree_via_connto_nj(njarr:Array<Njson>,nj:Njson):Array<Njson> {
    njarr.forEach(
        r=>{
            r._tree = nj._tree
        }
    )
    return(njarr)
}

function update_depth_via_connto_nj(njarr:Array<Njson>,nj:Njson,diff:number):Array<Njson> {
    njarr.forEach(
        r=>{
            r._depth = nj._depth + r._depth + diff
        }
    )
    return(njarr)
}



function prepend_child_tree(
    njarr:Array<Njson>,
    ch_njarr:Array<Njson>,
    nj:Njson,
    is_already_sdfs:boolean=true
):any {
    let sdfs = is_already_sdfs?njarr:<Array<Njson>>get_sdfs(njarr);
    let chsdfs = is_already_sdfs?ch_njarr:<Array<Njson>>get_sdfs(ch_njarr);
    let child = chsdfs[0];
    child = prepend_child(sdfs,nj,child);
    //
    chsdfs = update_tree_via_connto_nj(chsdfs,nj);
    chsdfs = update_depth_via_connto_nj(chsdfs,nj,1);
    //把子树sdfs插入sdfs
    let seq = get_sdfs_seq_via_id(sdfs,child._id)
    let chseq = seq + 1
    sdfs.splice(chseq,0,...chsdfs.slice(1,chsdfs.length))
    //
    return([chsdfs,child])
}


function append_child_tree(
    njarr:Array<Njson>,
    ch_njarr:Array<Njson>,
    nj:Njson,
    is_already_sdfs:boolean=true
):any {
    let sdfs = is_already_sdfs?njarr:<Array<Njson>>get_sdfs(njarr);
    let chsdfs = is_already_sdfs?ch_njarr:<Array<Njson>>get_sdfs(ch_njarr);
    let child = chsdfs[0];
    child = append_child(sdfs,nj,child);
    //
    chsdfs = update_tree_via_connto_nj(chsdfs,nj);
    chsdfs = update_depth_via_connto_nj(chsdfs,nj,1);
    //把子树插入sdfs
    let seq = get_sdfs_seq_via_id(sdfs,child._id)
    let chseq = seq + 1
    sdfs.splice(chseq,0,...chsdfs.slice(1,chsdfs.length))
    //
    return([chsdfs,child])
}


function add_rsib_tree(
    njarr:Array<Njson>,
    rsib_njarr:Array<Njson>,
    nj:Njson,
    is_already_sdfs:boolean=true
):any {
    let sdfs = is_already_sdfs?njarr:<Array<Njson>>get_sdfs(njarr);
    let rsibsdfs = is_already_sdfs?rsib_njarr:<Array<Njson>>get_sdfs(rsib_njarr);
    let rsib = rsibsdfs[0];
    rsib = add_rsib(sdfs,nj,rsib);
    //
    rsibsdfs = update_tree_via_connto_nj(rsibsdfs,nj);
    rsibsdfs = update_depth_via_connto_nj(rsibsdfs,nj,0);
    //把子树插入sdfs
    let seq = get_sdfs_seq_via_id(sdfs,rsib._id)
    let sibseq = seq + 1
    sdfs.splice(sibseq,0,...rsibsdfs.slice(1,rsibsdfs.length))
    return([rsibsdfs,rsib])
}


function add_lsib_tree(
    njarr:Array<Njson>,
    lsib_njarr:Array<Njson>,
    nj:Njson,
    is_already_sdfs:boolean=true
):any {
    let sdfs = is_already_sdfs?njarr:<Array<Njson>>get_sdfs(njarr);
    let lsibsdfs = is_already_sdfs?lsib_njarr:<Array<Njson>>get_sdfs(lsib_njarr);
    let lsib = lsibsdfs[0];
    lsib = add_lsib(sdfs,nj,lsib);
    //
    lsibsdfs = update_tree_via_connto_nj(lsibsdfs,nj);
    lsibsdfs = update_depth_via_connto_nj(lsibsdfs,nj,0);
    //把子树插入sdfs
    let seq = get_sdfs_seq_via_id(sdfs,lsib._id)
    let sibseq = seq + 1
    sdfs.splice(sibseq,0,...lsibsdfs.slice(1,lsibsdfs.length))
    return([lsibsdfs,lsib])
}


function insert_child_tree_via_index(
    njarr:Array<Njson>,
    ch_njarr:Array<Njson>,
    nj:Njson,
    which:number,
    is_already_sdfs:boolean=true
):any {
    let sdfs = is_already_sdfs?njarr:<Array<Njson>>get_sdfs(njarr);
    let chsdfs = is_already_sdfs?ch_njarr:<Array<Njson>>get_sdfs(ch_njarr);
    let child = chsdfs[0]
    child = insert_child_via_index(sdfs,nj,which,child)
    //

    chsdfs = update_tree_via_connto_nj(chsdfs,nj);
    chsdfs = update_depth_via_connto_nj(chsdfs,nj,1);
    //把子树插入sdfs
    let seq = get_sdfs_seq_via_id(sdfs,child._id)
    let chseq = seq + 1
    sdfs.splice(chseq,0,...chsdfs.slice(1,chsdfs.length))
    //
    return([chsdfs,child])
}


function insert_child_tree_before(
    njarr:Array<Njson>,
    ch_njarr:Array<Njson>,
    nj:Njson,
    is_already_sdfs:boolean=true
):any {
    let sdfs = is_already_sdfs?njarr:<Array<Njson>>get_sdfs(njarr);
    let chsdfs = is_already_sdfs?ch_njarr:<Array<Njson>>get_sdfs(ch_njarr);
    let child = chsdfs[0]
    child = insert_child_before(sdfs,nj,child)
    //
    chsdfs = update_tree_via_connto_nj(chsdfs,nj);
    chsdfs = update_depth_via_connto_nj(chsdfs,nj,1);
    //把子树插入sdfs
    let seq = get_sdfs_seq_via_id(sdfs,child._id)
    let chseq = seq + 1
    sdfs.splice(chseq,0,...chsdfs.slice(1,chsdfs.length))
    //
    return([chsdfs,child])
}



function insert_child_tree_after(
    njarr:Array<Njson>,
    ch_njarr:Array<Njson>,
    nj:Njson,
    is_already_sdfs:boolean=true
):any {
    let sdfs = is_already_sdfs?njarr:<Array<Njson>>get_sdfs(njarr);
    let chsdfs = is_already_sdfs?ch_njarr:<Array<Njson>>get_sdfs(ch_njarr);
    let child = chsdfs[0]
    child = insert_child_after(sdfs,nj,child)
    //
    chsdfs = update_tree_via_connto_nj(chsdfs,nj);
    chsdfs = update_depth_via_connto_nj(chsdfs,nj,1);
    //把子树插入sdfs
    let seq = get_sdfs_seq_via_id(sdfs,child._id)
    let chseq = seq + 1
    sdfs.splice(chseq,0,...chsdfs.slice(1,chsdfs.length))
    //
    return([chsdfs,child])
}

//
function update_tree_when_disconnected(sdfs:Array<Njson>) {
    //脱离后的子树
    let rj = sdfs[0]
    sdfs.forEach(
        nj=>{
            nj._tree = rj._tree
        }
    )
    return(sdfs)
}


function update_depth_when_disconnected(sdfs:Array<Njson>) {
    let rj = sdfs[0]
    sdfs.forEach(
        nj=>{
            nj._depth = nj._depth - rj._depth
        }
    )
    return(sdfs)
}


function leafize(nj:Njson) {
    /*
     * 把一个Njson 叶节点化,也就是_fstch =null,
     * 没有fstch
     *
     */
    nj._fstch = null;
    return(nj)
}

function rootize(nj:Njson) {
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
    return(nj)
}

function rootize_tree(
    njarr:Array<Njson>,
    nj:Njson
):any {
    let nsdfs = get_sdfs(njarr,nj)
    nsdfs = update_tree_when_disconnected(nsdfs)
    nsdfs = update_depth_when_disconnected(nsdfs)
    nj = rootize(nj);
    //
    return([nsdfs,nj])
}


function uninitize(nj:Njson) {
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
    return(nj)
}

function njarr2sdfs_with_is_already_sdfs(njarr,is_already_sdfs:boolean=true):Array<Njson> {
    let sdfs:Array<Njson>;
    if(is_already_sdfs) {
        sdfs = njarr
    } else {
        sdfs = njarr2sdfs(njarr)
    }
    return(sdfs)
}


function disconnect(njarr:Array<Njson>,nj:Njson,is_already_sdfs:boolean=true):any {
    //
    let sdfs:Array<Njson>;
    sdfs = njarr2sdfs_with_is_already_sdfs(njarr,is_already_sdfs)
    //
    let cond = is_root(nj)
    if(cond) {
        //如果要脱离树的节点是根节点,什么也不做
        return([sdfs,nj])
    } else if(is_lonely(nj)) {
        //如果是独生节点(没有兄弟)
        ////parent变为leaf节点
        let parent = get_parent(njarr,nj) 
        parent = leafize(<Njson>parent);
        //处理脱离后的子孙节点_depth ,_tree
        return(rootize_tree(njarr,nj));
    } else {
        //父节点多于一个儿子
        if(is_fstch(nj)) {
            //被删除节点是fstch,右邻居的左邻居置null, parent的fstch 变为右邻居
            let rsib = <Njson>get_rsib(njarr,nj)
            //右兄弟变成了fstch, lsib 指向null
            rsib._lsib = null
            //右兄弟变成了fstch,parent要指向rsib
            let parent = <Njson>get_parent(njarr,nj)
            parent._fstch = nj._rsib
        } else if(is_lstch(nj)) {
            //被删除节点是lstch,左邻居的右邻居置null
            ////////////////////////////
            let lsib = <Njson>get_lsib(njarr,nj)
            lsib._rsib = null 
        } else {
            //被删除节点是midch,左右邻居互指
            let lsib = <Njson>get_lsib(njarr,nj)
            lsib._rsib = nj._rsib
            let rsib = <Njson>get_rsib(njarr,nj)
            rsib._lsib = nj._lsib
        }
        //后代节点关系不变，但是tree变为当前节点._id
        //处理脱离后的子孙节点_depth ,_tree
        return(rootize_tree(njarr,nj));
    }
}


function rm_fstch(njarr:Array<Njson>,nj:Njson,is_already_sdfs:boolean=true):any {
    let fstch = get_fstch(njarr,nj)
    if(fstch === null) {
        let sdfs:Array<Njson>;
        sdfs = njarr2sdfs_with_is_already_sdfs(njarr,is_already_sdfs)
        return([sdfs,null])
    } else {
        return(disconnect(njarr,fstch,is_already_sdfs))
    }
}


function rm_lstch(njarr:Array<Njson>,nj:Njson,is_already_sdfs:boolean=true):any {
    let lstch = get_lstch(njarr,nj)
    if(lstch === null) {
        let sdfs:Array<Njson>;
        sdfs = njarr2sdfs_with_is_already_sdfs(njarr,is_already_sdfs)
        return([sdfs,null])
    } else {
        return(disconnect(njarr,lstch,is_already_sdfs))
    }
}

function rm_which_child(njarr:Array<Njson>,nj:Njson,which:number,is_already_sdfs:boolean=true):any {
    let child = get_which_child(njarr,nj,which)
    if(child === null) {
        let sdfs:Array<Njson>;
        sdfs = njarr2sdfs_with_is_already_sdfs(njarr,is_already_sdfs)
        return([sdfs,null])
    } else {
        return(disconnect(njarr,child,is_already_sdfs))
    }
}

function rm_all_children(njarr:Array<Njson>,nj:Njson,is_already_sdfs:boolean=true):any {
    let children = get_children(njarr,nj)
    let arr:Array<any> = children.map(
        child => {
            return(disconnect(njarr,child,is_already_sdfs))
        }
    )
    return(arr)
}

function rm_some_children(
    njarr:Array<Njson>,
    nj:Njson,
    whiches:Array<number>,
    is_already_sdfs:boolean=true
):any {
    let children = get_some_children(njarr,nj,...whiches)
    let arr:Array<any> = children.map(
        child => {
            return(disconnect(njarr,child,is_already_sdfs))
        }
    )
    return(arr)
}



//transform

function njarr2sdfs(njarr:Array<Njson>):Array<Njson> {
    let rj = <Njson>get_root(njarr)
    let sdfs = <Array<Njson>>get_sdfs(njarr,rj)
    return(sdfs)
}


interface Ejson {
    _id:string,
    _depth:number,
    _breadth:number,
    _pbreadth:null|number,
    _children:Array<any> 
}


function nj2ele(njarr:Array<Njson>,nj:Njson):Ejson {
    let ele=<Ejson>{};
    ele._depth = get_depth(njarr,nj)
    ele._breadth = get_breadth(njarr,nj) 
    let p = get_parent(njarr,nj)
    ele._pbreadth = (p===null)? null : get_breadth(njarr,nj) 
    ele._id = nj._id
    return(ele)
}

function _nj2unhandled_ele(nj:Njson):any {
    let o:any = {}
    o.ele =<Ejson>{}
    o.nj = nj
    o.ele._id = nj._id
    o.ele._children = []
    return(o) 
}

function sdfs2mat(njarr:Array<Njson>,sdfs:Array<Njson>|undefined):any {
    if(sdfs === undefined) {sdfs = njarr }
    let m:any = []
    let nj = sdfs[0]
    let unhandled = [_nj2unhandled_ele(nj)]
    unhandled[0].ele._pbreadth = null
    while(unhandled.length>0){
        let next_unhandled = []
        for(let i=0;i<unhandled.length;i++) {
            unhandled[i].ele._breadth = i
            unhandled[i].ele._depth = m.length
            let children:any = get_children(njarr,unhandled[i].nj)
            children = children.map(nj=>_nj2unhandled_ele(nj))
            children.forEach(
                (r,index)=>{
                    r.ele._pbreadth = unhandled[i].ele._breadth
                    unhandled[i].ele._children.push([(m.length+1),next_unhandled.length+index])
                }
            )
            next_unhandled = next_unhandled.concat(children)
        }
        let lyr = unhandled.map(r=>r.ele)
        m.push(lyr)
        unhandled = next_unhandled
    }   
    return(m)  
}


function sdfs2edfs(njarr:Array<Njson>,sdfs:Array<Njson>|undefined):any {
    if(sdfs === undefined) {sdfs = njarr2sdfs(njarr) }
    return(get_edfs(njarr,sdfs[0]))
}

function sdfs2sedfs(
    njarr:Array<Njson>,
    sdfs:Array<Njson>,
    deepcopy:boolean=false,
    clear:boolean=true    
) {
    if(sdfs === undefined) {sdfs = njarr2sdfs(njarr) }
    return(get_sedfs(njarr,sdfs[0],deepcopy,clear))
}

function edfs2sdfs(njarr:Array<Njson>,edfs:Array<Njson>):any {
    let nj = edfs[edfs.length-1]
    return(get_sdfs(njarr,nj))
}

function edfs2mat(njarr:Array<Njson>,edfs:Array<Njson>):any {
    let sdfs = edfs2sdfs(njarr,edfs)
    let m = sdfs2mat(njarr,sdfs)
    return(m)
}

function edfs2sedfs(
    njarr:Array<Njson>,
    edfs:Array<Njson>,
    deepcopy:boolean=false,
    clear:boolean=true
) {
    let sdfs = edfs2sdfs(njarr,edfs)
    return(sdfs2sedfs(njarr,sdfs,deepcopy,clear)) 
}



function sedfs2sdfs(njarr:Array<Njson>,sedfs:Array<Njson>):any {
    let nj = sedfs[0]
    return(get_sdfs(njarr,nj))
}


function sedfs2mat(njarr:Array<Njson>,sedfs:Array<Njson>):any {
    let sdfs = sedfs2sdfs(njarr,sedfs)
    let m = sdfs2mat(njarr,sdfs)
    return(m)
}

function sedfs2edfs(njarr:Array<Njson>,sedfs:Array<Njson>):any {
    let sdfs = sedfs2sdfs(njarr,sedfs)
    let edfs = sdfs2edfs(njarr,sdfs)
    return(edfs)
}



//
function get_nj_via_depth_and_breadth(njarr:Array<Njson>,depth:number,breadth:number):any {
    let nj:any = null;
    for(let each of njarr) {
        let d0 = get_depth(njarr,each)
        let b1 = get_breadth(njarr,each)
        let cond0 = (depth === d0)
        let cond1 = (breadth === b1)
        let cond = (cond0 && cond1)
        if(cond) {
            return(each)
        }
    }
    return(nj)
}
//

export {
    Njson,
    NJ_OR_NULL,
    NJ_OR_UNDEFINED,
    BL_OR_UNDEFINED,
    //
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
    get_psibs,
    get_fsibs,
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
    insert_child_via_index,
    insert_child_after,
    insert_child_before,
    add_rsib,
    add_lsib,
    update_tree_via_connto_nj,
    update_depth_via_connto_nj,
    prepend_child_tree,
    append_child_tree,
    add_rsib_tree,
    add_lsib_tree,
    insert_child_tree_via_index,
    insert_child_tree_before,
    insert_child_tree_after,
    update_tree_when_disconnected,
    update_depth_when_disconnected,
    leafize,
    rootize,
    rootize_tree,
    uninitize,
    //
    disconnect,
    rm_fstch,
    rm_lstch,
    rm_which_child,
    rm_some_children,
    rm_all_children,
    //
    njarr2sdfs,
    Ejson,
    nj2ele,
    sdfs2mat,
    sdfs2edfs,
    sdfs2sedfs,
    edfs2sdfs,
    edfs2mat,
    edfs2sedfs,
    sedfs2sdfs,
    sedfs2mat,
    sedfs2edfs,
    //
    get_nj_via_depth_and_breadth,
}

