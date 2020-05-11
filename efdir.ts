import * as fs from 'fs';


function rjson(fn:string):object {
    let buf = fs.readFileSync(fn)
    let s = buf.toString()
    let d = JSON.parse(s)
    return(d)
}


function wjson(fn:string,js:object):void {
    let s =JSON.stringify(js);
    fs.writeFileSync(fn,s)
}


export {
    rjson,
    wjson
}
