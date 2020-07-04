.. contents:: Table of Contents
   :depth: 5


nvdfs
-----
- depth-first-tree in list/array

install
-------
- npm install nvdfs

usage
-----

ndcls
=====

njfunc
======

    ::
       
        /*
            import {njfunc,njterm} from "nvdfs"
            import * as assert from "assert";
        */    
        var njfunc = require('nvdfs').njfunc
        var njterm = require('nvdfs').njterm
        var assert = require('assert')
        
        var sdfs   = njfunc.creat_sdfs();
        var nj0 = sdfs[0]
        var nj1 = njfunc.append_child(sdfs,nj0)
        var nj2 = njfunc.append_child(sdfs,nj1)
        var nj3 = njfunc.append_child(sdfs,nj1)
        var nj4 = njfunc.append_child(sdfs,nj3)
        var nj5 = njfunc.add_rsib(sdfs,nj4)
        var nj17 = njfunc.append_child(sdfs,nj0)
        var nj18 = njfunc.append_child(sdfs,nj17)
        var nj19 = njfunc.append_child(sdfs,nj17)
        
        
        var sub_sdfs = njfunc.creat_sdfs();
        var nj6 = sub_sdfs[0]
        var nj7 = njfunc.append_child(sub_sdfs,nj6)
        var nj8 = njfunc.append_child(sub_sdfs,nj6)
        var nj9 = njfunc.append_child(sub_sdfs,nj6)
        var nj10 = njfunc.append_child(sub_sdfs,nj9)
        var nj11 = njfunc.append_child(sub_sdfs,nj9)
        var nj12 = njfunc.append_child(sub_sdfs,nj9)
        var nj13 = njfunc.append_child(sub_sdfs,nj9)
        var nj14 = njfunc.append_child(sub_sdfs,nj9)
        var nj15 = njfunc.append_child(sub_sdfs,nj9)
        var nj16 = njfunc.append_child(sub_sdfs,nj15)
        
        var [chsdfs,chroot] = njfunc.add_lsib_tree(sdfs,sub_sdfs,nj17)
        
        
        /*
        > njterm.show_sdfs_with_id(sdfs)
        [0] : b95e3539-be36-4025-a3d8-df2bdf350fc9@1593867843304
        ├── [1] : 1a282060-0cdc-4f22-b811-50cd1751d2c2@1593867843430
        │   ├── [2] : 1146d14d-073b-4506-8f59-b70cd45e39c6@1593867843483
        │   └── [3] : d633da1f-1702-4530-a316-0489ef0a93c0@1593867843543
        │       ├── [4] : 3c6c25f3-49b6-4553-a049-a55c80105661@1593867843613
        │       └── [5] : 379a2b6d-4573-41d0-a5ab-f77039f07387@1593867843681
        ├── [6] : 51c06ac5-9909-4c35-ae0a-2cd93d270a00@1593867844103
        │   ├── [7] : c037a284-12e6-477c-b1b4-2e321e80cc0b@1593867844415
        │   ├── [8] : c6b1de87-b204-4104-927b-a6a65fce5bdf@1593867844475
        │   └── [9] : d14e7ffa-8c64-48a4-b61f-a84348ff2515@1593867844600
        │       ├── [10] : c4481211-3fa2-4e87-bedc-69deff08bd20@1593867844718
        │       ├── [11] : 8530b35c-c07b-48db-83e3-3520e3629f5c@1593867844822
        │       ├── [12] : 276e0d50-672f-492a-b210-aba1c551481c@1593867844874
        │       ├── [13] : db9dad82-d15d-4ced-849e-f1c8c1a8fb2a@1593867844975
        │       ├── [14] : 13d0e582-52b5-483b-ab70-191cc378b028@1593867845062
        │       └── [15] : bf3aa269-a5dc-4479-b1c0-748a08fac21e@1593867845133
        │           └── [16] : 7b306bab-9dc0-4a59-b8fc-4715339f9fc1@1593867845193
        └── [17] : ce4582e8-6b4b-4c9e-9b2d-ff4a4d3536c3@1593867843738
            ├── [18] : 9c26d6e9-137b-40bd-b976-3ba3882b8dd0@1593867843785
            └── [19] : c30dbe05-1b7a-4f8b-8e75-b5402b9056fd@1593867843844
        undefined
        >
        */


apis
----

ndcls
=====

njfunc
======

- creat_rj():Njson                                                                         创建 一个 叶子根节点
- creat_nj():Njson                                                                         创建 一个 未初始化的叶子根节点
- creat_sdfs():Array<Njson>                                                                创建 只有一个根节点的 sdfs-array
- is_inited(nj:Njson):boolean                                                              是否已经初始化  _tree !== undefined
- is_root(nj:Njson):boolean                                                                是否是根        _tree === _id
- is_fstch(nj:Njson):boolean                                                               是否是父节点第一个儿子(有可能同时是最后一个)
- is_lstch(nj:Njson):boolean                                                               是否是父节点最后一个儿子(有可能同时是第一个)
- is_midch(nj:Njson):boolean                                                               是否是父节点中间儿子,不是第一个,也不是最后一个
- is_leaf(nj:Njson):boolean                                                                是否是叶子节点
- is_connectable(nj:Njson):boolean                                                         是否可以直接添加到其他节点上(root节点或者未初始化节点,其他节点必需先从原先所在的sdfs disconnect)
- is_lonely(nj:Njson):boolean                                                              是否是独子(没有兄弟)
- get_nj_via_id_from_njarr(njarr:Array<Njson>,_id:string):Njson                            通过id获取 nj 节点
- get_sdfs_seq_via_id(sdfs:Array<Njson>,_id:string):number                                 获取在sdfs-array中的index
- get_fstch(njarr:Array<Njson>,nj:Njson):NJ_OR_NULL                                        获取first-child,叶子节点first-child为null
- get_lstch(njarr:Array<Njson>,nj:Njson):NJ_OR_NULL                                        获取last-child,叶子节点first-child为null
- get_children(njarr:Array<Njson>,nj:Njson):Array<Njson>                                   获取所有子节点(按照顺序)
- get_which_child(njarr:Array<Njson>,nj:Njson,which:number):NJ_OR_NULL                     获取某个child
- get_some_children(njarr:Array<Njson>,nj:Njson,...whiches:Array<number>):Array<Njson>     获取一些child
- get_parent(njarr:Array<Njson>,nj:Njson):NJ_OR_NULL                                       获取parent
- get_root(njarr:Array<Njson>):NJ_OR_NULL                                                  获取root
- get_ances(njarr:Array<Njson>,nj:Njson,including_self:boolean=false):Array<Njson>         获取先祖链
- get_which_ance(njarr:Array<Njson>,nj:Njson,which:number):NJ_OR_NULL                      获取某个先祖(包括自己)
- get_some_ances(njarr:Array<Njson>,nj:Njson,...whiches:Array<number>):Array<Njson>        获取一些先祖(包括自己)
- get_rsib(njarr:Array<Njson>,nj:Njson):NJ_OR_NULL                                         获取右兄弟
- get_lsib(njarr:Array<Njson>,nj:Njson):NJ_OR_NULL                                         获取左兄弟
- get_lstsib(njarr:Array<Njson>,nj:Njson,including_self:boolean=false):NJ_OR_NULL          获取最后一个兄弟节点(默认不包括自己)
- get_fstsib(njarr:Array<Njson>,nj:Njson,including_self:boolean=false):NJ_OR_NULL          获取第一个兄弟节点(默认不包括自己)
- get_sibs(njarr:Array<Njson>,nj:Njson,including_self:boolean=false):Array<Njson>          获取所有兄弟节点(默认不包括自己)
- get_psibs(njarr:Array<Njson>,nj:Njson):Array<Njson>                                      获取preceding 兄弟节点
- get_fsibs(njarr:Array<Njson>,nj:Njson):Array<Njson>                                      获取following 兄弟节点
- get_which_sib(njarr:Array<Njson>,nj:Njson,which:number):NJ_OR_NULL                       获取某个兄弟节点(包括自己)
- get_some_sibs(njarr:Array<Njson>,nj:Njson,...whiches:Array<number>):Array<Njson>         获取一些兄弟节点(包括自己)
- get_sibseq(njarr:Array<Njson>,nj:Njson):number                                           获取在兄弟节点中序号
- get_rsib_of_fst_ance_having_rsib(njarr:Array<Njson>,nj:Njson):NJ_OR_NULL                 沿着先祖链条(不包括自己)查找第一个拥有右兄弟的节点,返回这个节点的右兄弟
- get_lsib_of_fst_ance_having_lsib(njarr:Array<Njson>,nj:Njson):NJ_OR_NULL                 沿着先祖链条(不包括自己)查找第一个拥有左兄弟的节点,返回这个节点的左兄弟
- get_deses(njarr:Array<Njson>,nj:Njson,including_self:boolean=false):Array<Njson>         所有后代的sdfs-list
- get_drmost_des(njarr:Array<Njson>,nj:Njson):Njson                                        最下最右的后代
- get_dlmost_des(njarr:Array<Njson>,nj:Njson):Njson                                        最下最左的后代
- get_fstlyr_deses(njarr:Array<Njson>,nj:Njson):Array<Njson>                               第一层后代(children)
- get_lstlyr_deses(njarr:Array<Njson>,nj:Njson):Array<Njson>                               最后一层后代
- get_which_lyr_deses(njarr:Array<Njson>,nj:Njson,which:number):Array<Njson>               某一层后代
- get_some_lyrs_deses(njarr:Array<Njson>,nj:Njson,...whiches:Array<number>):Array<Njson>   某几层后代
- get_depth(njarr:Array<Njson>,nj:Njson):number                                            深度(从上向下)
- get_breadth(njarr:Array<Njson>,nj:Njson,is_already_sdfs:boolean=true):number             在当前层的广度序号
- get_count(njarr:Array<Njson>):number                                                     整个sdfs中元素个数
- get_height(njarr:Array<Njson>,nj:Njson):number                                           高度(从下向上)
- get_lyr(njarr:Array<Njson>,nj:Njson,is_already_sdfs:boolean=true):Array<Njson>           当前层
- get_fstlyr_des_depth(njarr:Array<Njson>,nj:Njson):number|null                            第一层后代深度
- get_lstlyr_des_depth(njarr:Array<Njson>,nj:Njson):number|null                            最后一层后代深度
- get_which_lyr_des_depth(njarr:Array<Njson>,nj:Njson,which:number):number|null            某一层后代深度
- get_sdfs_next(njarr:Array<Njson>,nj:Njson):NJ_OR_NULL                                    sdfs(only traverse open-tag) 下一个
- get_sdfs_prev(njarr:Array<Njson>,nj:Njson):NJ_OR_NULL                                    sdfs(only traverse open-tag) 前一个
- get_sdfs(njarr:Array<Njson>,nj?:NJ_OR_UNDEFINED):Array<Njson>                            sdfs(only traverse open-tag)
- get_edfs_next(njarr:Array<Njson>,nj:Njson):NJ_OR_NULL                                    edfs(only traverse close-tag) 下一个
- get_edfs_prev(njarr:Array<Njson>,nj:Njson):NJ_OR_NULL                                    edfs(only traverse close-tag) 前一个
- get_edfs(njarr:Array<Njson>,nj:Njson):Array<NJ_OR_NULL>                                  edfs(only traverse close-tag) 
- clear_$visited(njarr:Array<Njson>):Array<Njson>                                          sedfs(traverse both open-tag and close-tag) traverse 内部使用
- get_sedfs_next(njarr:Array<Njson>,nj:Njson):NJ_OR_NULL                                   sedfs(traverse both open-tag and close-tag) 下一个
- get_sedfs_prev(njarr:Array<Njson>,nj:Njson,visited:BL_OR_UNDEFINED):NJ_OR_NULL           sedfs(traverse both open-tag and close-tag) 前一个
- is_sedfs_traverse_finished(nj:Njson,start_id:string):boolean 
- get_sedfs(njarr:Array<Njson>,nj:Njson,deepcopy:boolean=false,clear:boolean=true):Array<Njson>    sedfs
- prepend_child(sdfs:Array<Njson>,nj:Njson,child?:any):Njson                                       前插子节点
- append_child(sdfs:Array<Njson>,nj:Njson,child?:any):Njson                                        追加子节点
- insert_child_via_index(sdfs:Array<Njson>,nj:Njson,which:number,child?:NJ_OR_UNDEFINED):Njson     插入子节点
- insert_child_before(sdfs:Array<Njson>,nj:Njson,child?:NJ_OR_UNDEFINED):Njson 
- insert_child_after(sdfs:Array<Njson>,nj:Njson,child?:NJ_OR_UNDEFINED):Njson 
- add_lsib(sdfs:Array<Njson>,nj:Njson,lsib?:NJ_OR_UNDEFINED):Njson                                 添加左邻居
- add_rsib(sdfs:Array<Njson>,nj:Njson,rsib?:NJ_OR_UNDEFINED):Njson                                 添加右邻居
- update_tree_via_connto_nj(njarr:Array<Njson>,nj:Njson):Array<Njson> 
- update_depth_via_connto_nj(njarr:Array<Njson>,nj:Njson,diff:number):Array<Njson> 
- prepend_child_tree(njarr:Array<Njson>,ch_njarr:Array<Njson>,nj:Njson,is_already_sdfs:boolean=true)                           前插子树
- append_child_tree(njarr:Array<Njson>,ch_njarr:Array<Njson>,nj:Njson,is_already_sdfs:boolean=true)                            后插子树
- add_rsib_tree(njarr:Array<Njson>,ch_njarr:Array<Njson>,nj:Njson,is_already_sdfs:boolean=true)                                添加左邻居树
- add_lsib_tree(njarr:Array<Njson>,ch_njarr:Array<Njson>,nj:Njson,is_already_sdfs:boolean=true)                                添加右邻居树
- insert_child_tree_via_index(njarr:Array<Njson>,ch_njarr:Array<Njson>,nj:Njson,which:number,is_already_sdfs:boolean=true)     插入子树
- insert_child_tree_before(njarr:Array<Njson>,ch_njarr:Array<Njson>,nj:Njson,is_already_sdfs:boolean=true)
- insert_child_tree_after(njarr:Array<Njson>,ch_njarr:Array<Njson>,nj:Njson,is_already_sdfs:boolean=true)
- update_tree_when_disconnected(sdfs:Array<Njson>) 
- update_depth_when_disconnected(sdfs:Array<Njson>) 
- leafize(nj:Njson) 
- rootize(nj:Njson) 
- rootize_tree(
- uninitize(nj:Njson) 
- njarr2sdfs_with_is_already_sdfs(njarr,is_already_sdfs:boolean=true):Array<Njson> 
- disconnect(njarr:Array<Njson>,nj:Njson,is_already_sdfs:boolean=true):any                                     从当前tree-sdfs 脱离
- rm_fstch(njarr:Array<Njson>,nj:Njson,is_already_sdfs:boolean=true):any                                       移除第一个child
- rm_lstch(njarr:Array<Njson>,nj:Njson,is_already_sdfs:boolean=true):any                                       移除最后一个child
- rm_which_child(njarr:Array<Njson>,nj:Njson,which:number,is_already_sdfs:boolean=true):any                    移除某一个child
- rm_all_children(njarr:Array<Njson>,nj:Njson,is_already_sdfs:boolean=true):any                                移除所有children
- rm_some_children(njarr:Array<Njson>,nj:Njson,whiches:Array<number>,is_already_sdfs:boolean=true)             移除一些children
- njarr2sdfs(njarr:Array<Njson>):Array<Njson>                                                                  把乱序的节点变成sdfs顺序
- nj2ele(njarr:Array<Njson>,nj:Njson):Ejson 
- _nj2unhandled_ele(nj:Njson):any 
- sdfs2mat(njarr:Array<Njson>,sdfs:Array<Njson>|undefined):any                                                 sdfs 变成一个二维数组
- sdfs2edfs(njarr:Array<Njson>,sdfs:Array<Njson>|undefined):any                                                sdfs 变成edfs
- sdfs2sedfs(njarr:Array<Njson>,sdfs:Array<Njson>,deepcopy:boolean=false,clear:boolean=true)                   sdfs 变成sedfs
- edfs2sdfs(njarr:Array<Njson>,edfs:Array<Njson>):any                                                          edfs 变成sdfs
- edfs2mat(njarr:Array<Njson>,edfs:Array<Njson>):any                                                           edfs 变成一个二维数组
- edfs2sedfs(njarr:Array<Njson>,edfs:Array<Njson>,deepcopy:boolean=false,clear:boolean=true)                   edfs 变成sedfs
- sedfs2sdfs(njarr:Array<Njson>,sedfs:Array<Njson>):any                                                        sedfs 变成sdfs
- sedfs2mat(njarr:Array<Njson>,sedfs:Array<Njson>):any                                                         sedfs 变成一个二维数组
- sedfs2edfs(njarr:Array<Njson>,sedfs:Array<Njson>):any                                                        sedfs 变成edfs




