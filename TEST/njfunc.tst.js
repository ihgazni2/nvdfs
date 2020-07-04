import * as njfunc from "./njfunc";
import * as assert from "assert";
import * as njterm from "./njterm";

var rj     = njfunc.creat_rj();
/*
    > rj
    {
      _id: 'f214e986-9bec-4057-9a31-fc52707f6397@1593619780915',
      _fstch: null,
      _lsib: null,
      _rsib: null,
      _parent: null,                                                //_parent is null
      _depth: 0,                                                    //_depth  is 0
      _tree: 'f214e986-9bec-4057-9a31-fc52707f6397@1593619780915'   //_tree  === _id
    }
    >
*/


var nj     = njfunc.creat_nj();
/*
    > nj
    {
      _id: '2db110a5-7984-4be5-9866-7ef261c28e05@1593619970280',
      _fstch: null,
      _lsib: null,
      _rsib: null,
      _parent: null,
      _depth: 0,
      _tree: undefined                                              //uninited
    }
    >
    
*/
var sdfs   = njfunc.creat_sdfs();
/*
    > sdfs
    [
      {
        _id: 'f2245a75-828e-417f-bec1-84b9f8179fd4@1593620016488',
        _fstch: null,
        _lsib: null,
        _rsib: null,
        _parent: null,
        _depth: 0,
        _tree: 'f2245a75-828e-417f-bec1-84b9f8179fd4@1593620016488'
      }
    ]
    >
*/

assert.strictEqual(njfunc.is_inited(rj),true)
assert.strictEqual(njfunc.is_inited(nj),false)
assert.strictEqual(njfunc.is_root(rj),true)
assert.strictEqual(njfunc.is_root(nj),false)

/////

var nj0 = sdfs[0]
var nj1 = njfunc.append_child(sdfs,nj0)
assert.strictEqual(nj0._tree,nj0._id)
assert.strictEqual(nj0._fstch,nj1._id)
assert.strictEqual(nj1._tree,nj0._id)
assert.strictEqual(nj1._parent,nj0._id)


/*
    > nj0
    {
      _id: 'f2245a75-828e-417f-bec1-84b9f8179fd4@1593620016488',
      _fstch: '43002009-9e80-4f55-8476-2b566f31cd8c@1593620692908',      // nj0._fstch === nj1._id
      _lsib: null,
      _rsib: null,
      _parent: null,  
      _depth: 0,                                                        //_depth :0 
      _tree: 'f2245a75-828e-417f-bec1-84b9f8179fd4@1593620016488'       // nj0._tree === nj0._id
    }
    >
    > nj1
    {
      _id: '43002009-9e80-4f55-8476-2b566f31cd8c@1593620692908',
      _fstch: null,
      _lsib: null,
      _rsib: null,
      _parent: 'f2245a75-828e-417f-bec1-84b9f8179fd4@1593620016488',  // nj1._parent === nj0._id
      _depth: 1,                                                      // _depth :1
      _tree: 'f2245a75-828e-417f-bec1-84b9f8179fd4@1593620016488'    // nj1._tree === nj0._id
    }
    >
    > njterm.show_sdfs_with_id(sdfs)
    [0] : f2245a75-828e-417f-bec1-84b9f8179fd4@1593620016488
    └── [1] : 43002009-9e80-4f55-8476-2b566f31cd8c@1593620692908
    undefined
    >


*/

var nj2 = njfunc.append_child(sdfs,nj0)
var nj3 = njfunc.append_child(sdfs,nj0)
var nj4 = njfunc.append_child(sdfs,nj0)
/*
    > njterm.show_sdfs_with_id(sdfs)
    [0] : f2245a75-828e-417f-bec1-84b9f8179fd4@1593620016488
    ├── [1] : 43002009-9e80-4f55-8476-2b566f31cd8c@1593620692908
    ├── [2] : 451f7c96-ac67-40d5-926a-309c968b21b6@1593621228445
    ├── [3] : 410e09d6-972e-4a6a-a7b1-b2c7e2cf7432@1593621228527
    └── [4] : e22012e2-6b14-4ce9-bc8d-aaf782463f73@1593621229656
    undefined
    >
*/

assert.strictEqual(njfunc.is_fstch(nj1),true)
assert.strictEqual(njfunc.is_fstch(nj2),false)
assert.strictEqual(njfunc.is_midch(nj2),true)
assert.strictEqual(njfunc.is_midch(nj3),true)
assert.strictEqual(njfunc.is_lstch(nj4),true)
assert.strictEqual(njfunc.is_leaf(nj4),true)
assert.strictEqual(njfunc.is_leaf(nj0),false)
/*
    > nj1._tree
    'f2245a75-828e-417f-bec1-84b9f8179fd4@1593620016488'
    > nj2._tree
    'f2245a75-828e-417f-bec1-84b9f8179fd4@1593620016488'
    > nj3._tree
    'f2245a75-828e-417f-bec1-84b9f8179fd4@1593620016488'
    > nj4._tree
    'f2245a75-828e-417f-bec1-84b9f8179fd4@1593620016488'
    > nj0._id
    'f2245a75-828e-417f-bec1-84b9f8179fd4@1593620016488'
    > nj0._tree
    'f2245a75-828e-417f-bec1-84b9f8179fd4@1593620016488'
    >

*/
var sdfs   = njfunc.creat_sdfs();
var nj0 = sdfs[0]
var nj1 = njfunc.append_child(sdfs,nj0)
var nj2 = njfunc.append_child(sdfs,nj1)
var nj3 = njfunc.append_child(sdfs,nj1)
var nj4 = njfunc.append_child(sdfs,nj3)
var nj5 = njfunc.add_rsib(sdfs,nj4)
var nj6 = njfunc.add_rsib(sdfs,nj1)
var nj7 = njfunc.append_child(sdfs,nj6)
var nj8 = njfunc.append_child(sdfs,nj6)
var nj9 = njfunc.append_child(sdfs,nj6)
var nj10 = njfunc.append_child(sdfs,nj9)
var nj11 = njfunc.append_child(sdfs,nj9)
var nj12 = njfunc.append_child(sdfs,nj9)
var nj13 = njfunc.append_child(sdfs,nj9)
var nj14 = njfunc.append_child(sdfs,nj9)
var nj15 = njfunc.append_child(sdfs,nj9)
var nj16 = njfunc.append_child(sdfs,nj15)

/*
> sdfs.map(r=>console.log(r._id))


*/

/*
> njterm.show_sdfs_with_id(sdfs)
[0] : 95488937-5054-4003-94e1-7b2eedf5c5a6@1593750169315
├── [1] : 036abe8b-7d80-4e6c-ba3d-1333d6ee67b7@1593750169408
│   ├── [2] : b8f821e7-1ef9-4736-90c4-99e6ffb43cd8@1593750169457
│   └── [3] : 88e7447a-ad7e-4e2e-aed6-17fcd9474f23@1593750169505
│       ├── [4] : e4fe1e10-17c7-48f3-b271-2e726315b168@1593750169571
│       └── [5] : 33e3e5de-13e5-43d6-b92a-5fb0309e2025@1593750169643
└── [6] : 9da36d11-4285-4280-b894-9c1917692bfc@1593750169690
    ├── [7] : 590d5064-3746-4939-bc01-fae608a6ff3a@1593750169782
    ├── [8] : 5a6ff4c9-12ae-4817-bd50-7c495f5960a4@1593750169835
    └── [9] : 5d0cebfe-cbf0-4fa5-9dc8-4dfb063e5351@1593750169921
        ├── [10] : 019042e4-55e9-4ec9-ac10-ce3bc6559711@1593750170102
        ├── [11] : aa3628dc-7547-4e6a-97f6-c87219cd0dac@1593750170222
        ├── [12] : 4bf7f019-57cc-4b95-a230-d0fd40fa62ba@1593750170279
        ├── [13] : e478cf70-06f4-4738-bbfc-e2d48481f723@1593750170345
        ├── [14] : 231427cf-4254-4747-b8db-0bdaf0e482ed@1593750170473
        └── [15] : 238c379d-edd2-4fa5-924a-eea43d52bafe@1593750170607
            └── [16] : 4a4d2d04-af42-469f-b8c1-1b232a219a57@1593750171992

*/

assert.strictEqual(njfunc.is_lonely(nj16),true)
assert.strictEqual(njfunc.is_lonely(nj13),false)



//////
var nj = njfunc.get_nj_via_id_from_njarr(sdfs,nj13._id)
assert.strictEqual(nj,nj13)

var fstch = <njfunc.Njson>njfunc.get_fstch(sdfs,sdfs[0])
assert.strictEqual(fstch,nj1)
fstch = <njfunc.Njson>njfunc.get_fstch(sdfs,sdfs[6])
assert.strictEqual(fstch,nj7)

var lstch = <njfunc.Njson>njfunc.get_lstch(sdfs,sdfs[6])
assert.strictEqual(lstch,nj9)


fstch = <njfunc.Njson>njfunc.get_fstch(sdfs,sdfs[15])
assert.strictEqual(fstch,nj16)
lstch = <njfunc.Njson>njfunc.get_lstch(sdfs,sdfs[15])
assert.strictEqual(lstch,nj16)

/*
njterm.show_sdfs_with_id(sdfs,sdfs[6])
> njterm.show_sdfs_with_id(sdfs)
[0] : 95488937-5054-4003-94e1-7b2eedf5c5a6@1593750169315
├── [1] : 036abe8b-7d80-4e6c-ba3d-1333d6ee67b7@1593750169408
│   ├── [2] : b8f821e7-1ef9-4736-90c4-99e6ffb43cd8@1593750169457
│   └── [3] : 88e7447a-ad7e-4e2e-aed6-17fcd9474f23@1593750169505
│       ├── [4] : e4fe1e10-17c7-48f3-b271-2e726315b168@1593750169571
│       └── [5] : 33e3e5de-13e5-43d6-b92a-5fb0309e2025@1593750169643
└── [6] : 9da36d11-4285-4280-b894-9c1917692bfc@1593750169690              
    ├── [7] : 590d5064-3746-4939-bc01-fae608a6ff3a@1593750169782
    ├── [8] : 5a6ff4c9-12ae-4817-bd50-7c495f5960a4@1593750169835
    └── [9] : 5d0cebfe-cbf0-4fa5-9dc8-4dfb063e5351@1593750169921         //--------------------------nj9 descedants
        ├── [10] : 019042e4-55e9-4ec9-ac10-ce3bc6559711@1593750170102
        ├── [11] : aa3628dc-7547-4e6a-97f6-c87219cd0dac@1593750170222
        ├── [12] : 4bf7f019-57cc-4b95-a230-d0fd40fa62ba@1593750170279
        ├── [13] : e478cf70-06f4-4738-bbfc-e2d48481f723@1593750170345
        ├── [14] : 231427cf-4254-4747-b8db-0bdaf0e482ed@1593750170473
        └── [15] : 238c379d-edd2-4fa5-924a-eea43d52bafe@1593750170607
            └── [16] : 4a4d2d04-af42-469f-b8c1-1b232a219a57@1593750171992 //--------------------------nj9 descedants


> njterm.show_sdfs_with_id(sdfs,sdfs[9])
[0] : 5d0cebfe-cbf0-4fa5-9dc8-4dfb063e5351@1593750169921
├── [1] : 019042e4-55e9-4ec9-ac10-ce3bc6559711@1593750170102          //nj9 children
├── [2] : aa3628dc-7547-4e6a-97f6-c87219cd0dac@1593750170222
├── [3] : 4bf7f019-57cc-4b95-a230-d0fd40fa62ba@1593750170279
├── [4] : e478cf70-06f4-4738-bbfc-e2d48481f723@1593750170345
├── [5] : 231427cf-4254-4747-b8db-0bdaf0e482ed@1593750170473
└── [6] : 238c379d-edd2-4fa5-924a-eea43d52bafe@1593750170607
    └── [7] : 4a4d2d04-af42-469f-b8c1-1b232a219a57@1593750171992       //nj9 children


*/

var children = njfunc.get_children(sdfs,sdfs[9])
/*
> children.map(r=>r._id)
[
  '019042e4-55e9-4ec9-ac10-ce3bc6559711@1593750170102',
  'aa3628dc-7547-4e6a-97f6-c87219cd0dac@1593750170222',
  '4bf7f019-57cc-4b95-a230-d0fd40fa62ba@1593750170279',
  'e478cf70-06f4-4738-bbfc-e2d48481f723@1593750170345',
  '231427cf-4254-4747-b8db-0bdaf0e482ed@1593750170473',
  '238c379d-edd2-4fa5-924a-eea43d52bafe@1593750170607'
]

*/

var sec_child = <njfunc.Njson>njfunc.get_which_child(sdfs,sdfs[9],2)
assert.strictEqual(sec_child,nj12)

var some_children = njfunc.get_some_children(sdfs,sdfs[9],2,4)
assert.deepStrictEqual(some_children,[nj12,nj14])



var rj = njfunc.get_root(sdfs)
assert.strictEqual(rj,nj0)

var parent = njfunc.get_parent(sdfs,nj9)
assert.strictEqual(parent,nj6)

var ances = njfunc.get_ances(sdfs,nj16)
assert.deepStrictEqual(ances,[nj15,nj9,nj6,nj0])

ances = njfunc.get_ances(sdfs,nj16,true)
assert.deepStrictEqual(ances,[nj16,nj15,nj9,nj6,nj0])

var some_ances = njfunc.get_some_ances(sdfs,nj16,0,2)
assert.deepStrictEqual(some_ances,[nj16,nj9])

var ance = njfunc.get_which_ance(sdfs,nj16,2)
assert.strictEqual(ance,nj9)



////
var rsib = njfunc.get_rsib(sdfs,nj12)
assert.strictEqual(rsib,nj13)
rsib = njfunc.get_rsib(sdfs,nj15)
assert.strictEqual(rsib,null)

var lsib = njfunc.get_lsib(sdfs,nj12)
assert.strictEqual(lsib,nj11)
lsib = njfunc.get_lsib(sdfs,nj10)
assert.strictEqual(lsib,null)


var lstsib = njfunc.get_lstsib(sdfs,nj12)
assert.strictEqual(lstsib,nj15)
lstsib = njfunc.get_lstsib(sdfs,nj15)
assert.strictEqual(lstsib,null)
lstsib = njfunc.get_lstsib(sdfs,nj15,true)
assert.strictEqual(lstsib,nj15)


var fstsib = njfunc.get_fstsib(sdfs,nj12)
assert.strictEqual(fstsib,nj10)
fstsib = njfunc.get_fstsib(sdfs,nj10)
assert.strictEqual(fstsib,null)
fstsib = njfunc.get_fstsib(sdfs,nj10,true)
assert.strictEqual(fstsib,nj10)



var sibs = njfunc.get_sibs(sdfs,nj12)
assert.deepStrictEqual(sibs,[nj10,nj11,nj13,nj14,nj15])
sibs = njfunc.get_sibs(sdfs,nj12,true)
assert.deepStrictEqual(sibs,[nj10,nj11,nj12,nj13,nj14,nj15])


//////////////

var sdfs   = njfunc.creat_sdfs();
var nj0 = sdfs[0]
var nj1 = njfunc.append_child(sdfs,nj0)
var nj2 = njfunc.append_child(sdfs,nj1)
var nj3 = njfunc.append_child(sdfs,nj1)
var nj4 = njfunc.append_child(sdfs,nj3)
var nj5 = njfunc.add_rsib(sdfs,nj4)
var nj6 = njfunc.add_rsib(sdfs,nj1)
var nj7 = njfunc.append_child(sdfs,nj6)
var nj8 = njfunc.append_child(sdfs,nj6)
var nj9 = njfunc.append_child(sdfs,nj6)
var nj10 = njfunc.append_child(sdfs,nj9)
var nj11 = njfunc.append_child(sdfs,nj9)
var nj12 = njfunc.append_child(sdfs,nj9)
var nj13 = njfunc.append_child(sdfs,nj9)
var nj14 = njfunc.append_child(sdfs,nj9)
var nj15 = njfunc.append_child(sdfs,nj9)
var nj16 = njfunc.append_child(sdfs,nj15)

/*
njterm.show_sdfs_with_id(sdfs)

*/


var psibs = njfunc.get_psibs(sdfs,nj12)
assert.deepStrictEqual(psibs,[nj10,nj11])
var fsibs = njfunc.get_fsibs(sdfs,nj12)
assert.deepStrictEqual(fsibs,[nj13,nj14,nj15])

var sib = njfunc.get_which_sib(sdfs,nj12,1)
assert.strictEqual(sib,nj11)

var some_sibs = njfunc.get_some_sibs(sdfs,nj12,1,3,5)
assert.deepStrictEqual(some_sibs,[nj11,nj13,nj15])

assert.strictEqual(njfunc.get_sibseq(sdfs,nj12),2)


var fst_ance_rsib = njfunc.get_rsib_of_fst_ance_having_rsib(sdfs,nj16)
assert.strictEqual(fst_ance_rsib,null)

fst_ance_rsib = njfunc.get_rsib_of_fst_ance_having_rsib(sdfs,nj14)
assert.strictEqual(fst_ance_rsib,null)

fst_ance_rsib = njfunc.get_rsib_of_fst_ance_having_rsib(sdfs,nj4)
assert.strictEqual(fst_ance_rsib,nj6)


var fst_ance_lsib = njfunc.get_lsib_of_fst_ance_having_lsib(sdfs,nj16)
assert.strictEqual(fst_ance_lsib,nj14)

fst_ance_lsib = njfunc.get_lsib_of_fst_ance_having_lsib(sdfs,nj14)
assert.strictEqual(fst_ance_lsib,nj8)

fst_ance_lsib = njfunc.get_lsib_of_fst_ance_having_lsib(sdfs,nj3)
assert.strictEqual(fst_ance_lsib,null)


var deses = njfunc.get_deses(sdfs,nj6)
assert.deepStrictEqual(deses,[nj7,nj8,nj9,nj10,nj11,nj12,nj13,nj14,nj15,nj16])
deses = njfunc.get_deses(sdfs,nj6,true)
assert.deepStrictEqual(deses,[nj6,nj7,nj8,nj9,nj10,nj11,nj12,nj13,nj14,nj15,nj16])



///


var drmost = njfunc.get_drmost_des(sdfs,nj6)
assert.strictEqual(drmost,nj16)
var dlmost = njfunc.get_dlmost_des(sdfs,nj6)
assert.strictEqual(dlmost,nj7)


///

var lstlyr_deses = njfunc.get_lstlyr_deses(sdfs,nj6)
assert.deepStrictEqual(lstlyr_deses,[nj16])

var lyr_deses = njfunc.get_which_lyr_deses(sdfs,nj6,1)
assert.deepStrictEqual(lyr_deses,[nj7,nj8,nj9])

var some_lyrs_deses = njfunc.get_some_lyrs_deses(sdfs,nj6,1,2)
assert.deepStrictEqual(some_lyrs_deses,[nj7,nj8,nj9,nj10,nj11,nj12,nj13,nj14,nj15])


///
assert.strictEqual(njfunc.get_depth(sdfs,nj0),0)
assert.strictEqual(njfunc.get_depth(sdfs,nj6),1)
assert.strictEqual(njfunc.get_depth(sdfs,nj9),2)
assert.strictEqual(njfunc.get_depth(sdfs,nj15),3)
assert.strictEqual(njfunc.get_depth(sdfs,nj16),4)


assert.strictEqual(njfunc.get_breadth(sdfs,nj2),0)
assert.strictEqual(njfunc.get_breadth(sdfs,nj3),1)
assert.strictEqual(njfunc.get_breadth(sdfs,nj7),2)


assert.strictEqual(njfunc.get_count(sdfs),17)

assert.strictEqual(njfunc.get_height(sdfs,nj0),5)
assert.strictEqual(njfunc.get_height(sdfs,nj6),4)
assert.strictEqual(njfunc.get_height(sdfs,nj9),3)
assert.strictEqual(njfunc.get_height(sdfs,nj15),2)
assert.strictEqual(njfunc.get_height(sdfs,nj16),1)

////

var lyr = njfunc.get_lyr(sdfs,nj7)
assert.deepStrictEqual(lyr,[nj2,nj3,nj7,nj8,nj9])

assert.strictEqual(njfunc.get_fstlyr_des_depth(sdfs,nj6),2)
assert.strictEqual(njfunc.get_lstlyr_des_depth(sdfs,nj6),4)
assert.strictEqual(njfunc.get_which_lyr_des_depth(sdfs,nj6,2),3)


////
var sdfs_next = njfunc.get_sdfs_next(sdfs,nj0)
assert.strictEqual(sdfs_next,nj1)
sdfs_next = njfunc.get_sdfs_next(sdfs,nj5)
assert.strictEqual(sdfs_next,nj6)
sdfs_next = njfunc.get_sdfs_next(sdfs,nj16)
assert.strictEqual(sdfs_next,null)

var sdfs_prev = njfunc.get_sdfs_prev(sdfs,nj0)
assert.strictEqual(sdfs_prev,null)
sdfs_prev = njfunc.get_sdfs_prev(sdfs,nj6)
assert.strictEqual(sdfs_prev,nj5)
sdfs_prev = njfunc.get_sdfs_prev(sdfs,nj15)
assert.strictEqual(sdfs_prev,nj14)


var sub_sdfs = njfunc.get_sdfs(sdfs,nj6)
assert.deepStrictEqual(sub_sdfs,[nj6,nj7,nj8,nj9,nj10,nj11,nj12,nj13,nj14,nj15,nj16])

////

var edfs_next = njfunc.get_edfs_next(sdfs,nj0)
assert.strictEqual(edfs_next,null)
edfs_next = njfunc.get_edfs_next(sdfs,nj6)
assert.strictEqual(edfs_next,nj0)
edfs_next = njfunc.get_edfs_next(sdfs,nj2)
assert.strictEqual(edfs_next,nj4)

var edfs_prev = njfunc.get_edfs_prev(sdfs,nj0)
assert.strictEqual(edfs_prev,nj6)
edfs_prev = njfunc.get_edfs_prev(sdfs,nj9)
assert.strictEqual(edfs_prev,nj15)
edfs_prev = njfunc.get_edfs_prev(sdfs,nj4)
assert.strictEqual(edfs_prev,nj2)
edfs_prev = njfunc.get_edfs_prev(sdfs,nj2)
assert.strictEqual(edfs_prev,null)

var edfs = njfunc.get_edfs(sdfs,nj0)
assert.deepStrictEqual(edfs,[nj2,nj4,nj5,nj3,nj1,nj7,nj8,nj10,nj11,nj12,nj13,nj14,nj16,nj15,nj9,nj6,nj0])


////

/*
njterm.show_sdfs_with_id(sdfs)
> njterm.show_sdfs_with_id(sdfs)
[0] : 17bcbda0-262a-4cc9-9628-b7e89e78f619@1593768325659
├── [1] : 678bec5c-bd09-4b45-b5f8-ef0fc30a2412@1593768325753
│   ├── [2] : b0adca29-1335-47fd-80e4-529a68a49278@1593768325805
│   └── [3] : 6016df5e-da33-4058-95c7-895a8e487f7f@1593768325857
│       ├── [4] : e25b4d90-22d3-4c58-9d76-813de9092eef@1593768325970
│       └── [5] : b7f8e14b-11a3-4248-bd8b-b0893b735b72@1593768326031
└── [6] : 034975c5-d030-482d-aa0b-a05da4b976b0@1593768326094
    ├── [7] : 2894c45b-1fc8-4165-87b6-a59b36515cf4@1593768326150
    ├── [8] : f5c21c3d-10f7-4cad-b8e5-9ab3d92f14bd@1593768326207
    └── [9] : 45cf7ed7-199a-47be-8f8b-2f22a4b97b72@1593768326248
        ├── [10] : 135bc3b0-89c4-44f5-ab3a-dfb85a8a1575@1593768326302
        ├── [11] : b51b2543-5599-4701-bb1e-e406469b2d50@1593768326388
        ├── [12] : fef78249-a69c-48b8-9f3d-8da52c74b541@1593768326439
        ├── [13] : b2d96712-32ed-4e2b-8d9d-f1a9c26ad97c@1593768326483
        ├── [14] : 74de24eb-b21a-4f50-9046-133fa9667a3e@1593768326595
        └── [15] : 75ac3261-9dff-48c7-90a3-50a475a386ea@1593768326754
            └── [16] : 8e658a64-638a-4250-81de-cddde4942106@1593768328178
undefined
> njterm.show_sedfs(sdfs,sdfs[0])
<17bcbda0-262a-4cc9-9628-b7e89e78f619@1593768325659>
    <678bec5c-bd09-4b45-b5f8-ef0fc30a2412@1593768325753>
        <b0adca29-1335-47fd-80e4-529a68a49278@1593768325805>
        </b0adca29-1335-47fd-80e4-529a68a49278@1593768325805>
        <6016df5e-da33-4058-95c7-895a8e487f7f@1593768325857>
            <e25b4d90-22d3-4c58-9d76-813de9092eef@1593768325970>
            </e25b4d90-22d3-4c58-9d76-813de9092eef@1593768325970>
            <b7f8e14b-11a3-4248-bd8b-b0893b735b72@1593768326031>
            </b7f8e14b-11a3-4248-bd8b-b0893b735b72@1593768326031>
        </6016df5e-da33-4058-95c7-895a8e487f7f@1593768325857>
    </678bec5c-bd09-4b45-b5f8-ef0fc30a2412@1593768325753>
    <034975c5-d030-482d-aa0b-a05da4b976b0@1593768326094>
        <2894c45b-1fc8-4165-87b6-a59b36515cf4@1593768326150>
        </2894c45b-1fc8-4165-87b6-a59b36515cf4@1593768326150>
        <f5c21c3d-10f7-4cad-b8e5-9ab3d92f14bd@1593768326207>
        </f5c21c3d-10f7-4cad-b8e5-9ab3d92f14bd@1593768326207>
        <45cf7ed7-199a-47be-8f8b-2f22a4b97b72@1593768326248>
            <135bc3b0-89c4-44f5-ab3a-dfb85a8a1575@1593768326302>
            </135bc3b0-89c4-44f5-ab3a-dfb85a8a1575@1593768326302>
            <b51b2543-5599-4701-bb1e-e406469b2d50@1593768326388>
            </b51b2543-5599-4701-bb1e-e406469b2d50@1593768326388>
            <fef78249-a69c-48b8-9f3d-8da52c74b541@1593768326439>
            </fef78249-a69c-48b8-9f3d-8da52c74b541@1593768326439>
            <b2d96712-32ed-4e2b-8d9d-f1a9c26ad97c@1593768326483>
            </b2d96712-32ed-4e2b-8d9d-f1a9c26ad97c@1593768326483>
            <74de24eb-b21a-4f50-9046-133fa9667a3e@1593768326595>
            </74de24eb-b21a-4f50-9046-133fa9667a3e@1593768326595>
            <75ac3261-9dff-48c7-90a3-50a475a386ea@1593768326754>
                <8e658a64-638a-4250-81de-cddde4942106@1593768328178>
                </8e658a64-638a-4250-81de-cddde4942106@1593768328178>
            </75ac3261-9dff-48c7-90a3-50a475a386ea@1593768326754>
        </45cf7ed7-199a-47be-8f8b-2f22a4b97b72@1593768326248>
    </034975c5-d030-482d-aa0b-a05da4b976b0@1593768326094>
</17bcbda0-262a-4cc9-9628-b7e89e78f619@1593768325659>
undefined
>

*/


njfunc.clear_$visited(sdfs)
assert.strictEqual(nj0.$visited,false)
var sedfs_next = njfunc.get_sedfs_next(sdfs,nj0)
assert.strictEqual(sedfs_next,nj1)
assert.strictEqual(nj0.$visited,true)
sedfs_next = njfunc.get_sedfs_next(sdfs,nj1)
assert.strictEqual(sedfs_next,nj2)
assert.strictEqual(nj1.$visited,true)
sedfs_next = njfunc.get_sedfs_next(sdfs,nj2)
assert.strictEqual(sedfs_next,nj2)
assert.strictEqual(nj2.$visited,true)
sedfs_next = njfunc.get_sedfs_next(sdfs,nj2)
assert.strictEqual(sedfs_next,nj3)
assert.strictEqual(nj2.$visited,true)

/*
    nj0(open)->
        nj1(open)->
            nj2(open)->
            nj2(close)->
            nj3(open)->
                nj4(open)->
                nj4(close)->
                nj5(open)->
                nj5(close)->
            nj3(close)->
            ....
*/



var sdfs   = njfunc.creat_sdfs();
var nj0 = sdfs[0]
var nj1 = njfunc.append_child(sdfs,nj0)
var nj2 = njfunc.append_child(sdfs,nj1)
var nj3 = njfunc.append_child(sdfs,nj1)
var nj4 = njfunc.append_child(sdfs,nj3)
var nj5 = njfunc.add_rsib(sdfs,nj4)
var nj6 = njfunc.add_rsib(sdfs,nj1)
var nj8 = njfunc.append_child(sdfs,nj6)
var nj9 = njfunc.append_child(sdfs,nj6)
var nj7 = njfunc.prepend_child(sdfs,nj6)
assert.strictEqual(nj7,sdfs[7])


var nj11 = njfunc.append_child(sdfs,nj9)
var nj10 = njfunc.add_lsib(sdfs,nj11)
assert.strictEqual(nj10,sdfs[10])
var nj12 = njfunc.add_rsib(sdfs,nj11)
assert.strictEqual(nj12,sdfs[12])

var nj15 = njfunc.append_child(sdfs,nj9)
var nj13 = njfunc.insert_child_via_index(sdfs,nj9,3)
var nj14 = njfunc.insert_child_via_index(sdfs,nj9,4)
var nj16 = njfunc.append_child(sdfs,nj15)
assert.strictEqual(nj13,sdfs[13])
assert.strictEqual(nj14,sdfs[14])


//////////

var sdfs   = njfunc.creat_sdfs();
var nj0 = sdfs[0]
var nj1 = njfunc.append_child(sdfs,nj0)
var nj2 = njfunc.append_child(sdfs,nj1)
var nj3 = njfunc.append_child(sdfs,nj1)
var nj4 = njfunc.append_child(sdfs,nj3)
var nj5 = njfunc.add_rsib(sdfs,nj4)

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

var [chsdfs,chroot] = njfunc.append_child_tree(sdfs,sub_sdfs,nj0)

/*
njterm.show_sdfs_with_id(sdfs)
njterm.show_sdfs_with_id(sub_sdfs)
*/

assert.deepStrictEqual(sdfs,[nj0,nj1,nj2,nj3,nj4,nj5,nj6,nj7,nj8,nj9,nj10,nj11,nj12,nj13,nj14,nj15,nj16])


/*
njterm.show_sdfs_with_id(sdfs)
*/
var sdfs = njfunc.creat_sdfs();
var nj0 = sdfs[0]
var nj6 = njfunc.append_child(sdfs,nj0)
var nj7 = njfunc.append_child(sdfs,nj6)
var nj8 = njfunc.append_child(sdfs,nj6)
var nj9 = njfunc.append_child(sdfs,nj6)
var nj10 = njfunc.append_child(sdfs,nj9)
var nj11 = njfunc.append_child(sdfs,nj9)
var nj12 = njfunc.append_child(sdfs,nj9)
var nj13 = njfunc.append_child(sdfs,nj9)
var nj14 = njfunc.append_child(sdfs,nj9)
var nj15 = njfunc.append_child(sdfs,nj9)
var nj16 = njfunc.append_child(sdfs,nj15)


var sub_sdfs   = njfunc.creat_sdfs();
var nj1 = sub_sdfs[0]
var nj2 = njfunc.append_child(sub_sdfs,nj1)
var nj3 = njfunc.append_child(sub_sdfs,nj1)
var nj4 = njfunc.append_child(sub_sdfs,nj3)
var nj5 = njfunc.add_rsib(sub_sdfs,nj4)

/*
> njterm.show_sdfs_with_id(sdfs)
>
> njterm.show_sdfs_with_id(sub_sdfs)
*/
var [chsdfs,chroot] = njfunc.prepend_child_tree(sdfs,sub_sdfs,nj0)

assert.deepStrictEqual(sdfs,[nj0,nj1,nj2,nj3,nj4,nj5,nj6,nj7,nj8,nj9,nj10,nj11,nj12,nj13,nj14,nj15,nj16])

/*
njterm.show_sdfs_with_id(sdfs)
*/

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

/*
> njterm.show_sdfs_with_id(sdfs)
> njterm.show_sdfs_with_id(sub_sdfs)
*/

var [chsdfs,chroot] = njfunc.insert_child_tree_via_index(sdfs,sub_sdfs,nj0,1)

assert.deepStrictEqual(sdfs,[nj0,nj1,nj2,nj3,nj4,nj5,nj6,nj7,nj8,nj9,nj10,nj11,nj12,nj13,nj14,nj15,nj16,nj17,nj18,nj19])
/*
njterm.show_sdfs_with_id(sdfs)
*/


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

var [chsdfs,chroot] = njfunc.add_rsib_tree(sdfs,sub_sdfs,nj1)
assert.deepStrictEqual(sdfs,[nj0,nj1,nj2,nj3,nj4,nj5,nj6,nj7,nj8,nj9,nj10,nj11,nj12,nj13,nj14,nj15,nj16,nj17,nj18,nj19])



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

/*
> njterm.show_sdfs_with_id(sdfs)
> njterm.show_sdfs_with_id(sub_sdfs)

*/

var [chsdfs,chroot] = njfunc.add_lsib_tree(sdfs,sub_sdfs,nj17)
assert.deepStrictEqual(sdfs,[nj0,nj1,nj2,nj3,nj4,nj5,nj6,nj7,nj8,nj9,nj10,nj11,nj12,nj13,nj14,nj15,nj16,nj17,nj18,nj19])



var [chsdfs,chroot] = njfunc.disconnect(sdfs,nj6)

assert.strictEqual(nj6,chroot)
assert.deepStrictEqual(chsdfs,[nj6,nj7,nj8,nj9,nj10,nj11,nj12,nj13,nj14,nj15,nj16])



////
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

var [chsdfs,chroot] = njfunc.rm_fstch(sdfs,nj0)
assert.strictEqual(nj1,chroot)
assert.deepStrictEqual(chsdfs,[nj1,nj2,nj3,nj4,nj5])


/////

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

var [chsdfs,chroot] = njfunc.rm_lstch(sdfs,nj0)
assert.strictEqual(nj17,chroot)
assert.deepStrictEqual(chsdfs,[nj17,nj18,nj19])

////

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

var [chsdfs,chroot] = njfunc.rm_which_child(sdfs,nj0,1)
assert.strictEqual(nj6,chroot)
assert.deepStrictEqual(chsdfs,[nj6,nj7,nj8,nj9,nj10,nj11,nj12,nj13,nj14,nj15,nj16])

////

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

var tmp = njfunc.rm_all_children(sdfs,nj0)
var [chsdfs,chroot] = tmp[0]
assert.strictEqual(nj1,chroot)
assert.deepStrictEqual(chsdfs,[nj1,nj2,nj3,nj4,nj5])
var [chsdfs,chroot] = tmp[1]
assert.strictEqual(nj6,chroot)
assert.deepStrictEqual(chsdfs,[nj6,nj7,nj8,nj9,nj10,nj11,nj12,nj13,nj14,nj15,nj16])
var [chsdfs,chroot] = tmp[2]
assert.strictEqual(nj17,chroot)
assert.deepStrictEqual(chsdfs,[nj17,nj18,nj19])


////
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

var tmp = njfunc.rm_some_children(sdfs,nj0,[0,2])
var [chsdfs,chroot] = tmp[0]
assert.strictEqual(nj1,chroot)
assert.deepStrictEqual(chsdfs,[nj1,nj2,nj3,nj4,nj5])
var [chsdfs,chroot] = tmp[1]
assert.strictEqual(nj17,chroot)
assert.deepStrictEqual(chsdfs,[nj17,nj18,nj19])
////

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



//

var mat = njfunc.sdfs2mat(sdfs,undefined)
assert.strictEqual(mat[0][0]._id,nj0._id)


