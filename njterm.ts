import * as cmmn from "./cmmn"
import * as njfunc from "./njfunc"
import {Njson} from "./njfunc"


const dflt_sdfs_show_connd = {
    't':'├── ',
    'v':'│   ',
    'l':'└── ',
    'ws':'    '
}


function dflt_calc_conn_map_func(conn:string):string {
    let rslt;
    if(conn==='t') {
        rslt = 'v'
    } else if(conn === 'v') {
        rslt = 'v'
    } else {
        rslt = 'ws'
    }
    return(rslt)
}

function conns2repr(
    conns:Array<string>,
    show_connd:any=dflt_sdfs_show_connd
):string {
    conns = conns.map(conn=>show_connd[conn])
    return(conns.join(''))
}

function clear_ui(njarr:Array<Njson>):Array<Njson> {
    njarr.forEach(
        nj=>{
            delete nj.$ui
        }
    )
    return(njarr)
}

//dflt_sdfs_calc_conns
