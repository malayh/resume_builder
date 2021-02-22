import {configs} from '../Config';

Object.unflatten = function(data) {
    "use strict";
    if (Object(data) !== data || Array.isArray(data))
        return data;
    var regex = /\.?([^.\[\]]+)|\[(\d+)\]/g,
        resultholder = {};
    for (var p in data) {
        var cur = resultholder,
            prop = "",
            m;
        while (m = regex.exec(p)) {
            cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}));
            prop = m[2] || m[1];
        }
        cur[prop] = data[p];
    }
    return resultholder[""] || resultholder;
};
Object.flatten = function(data) {
    var result = {};
    function recurse (cur, prop) {
        if (Object(cur) !== cur) {
            result[prop] = cur;
        } else if (Array.isArray(cur)) {
             for(var i=0, l=cur.length; i<l; i++)
                 recurse(cur[i], prop + "[" + i + "]");
            if (l == 0)
                result[prop] = [];
        } else {
            var isEmpty = true;
            for (var p in cur) {
                isEmpty = false;
                recurse(cur[p], prop ? prop+"."+p : p);
            }
            if (isEmpty && prop)
                result[prop] = {};
        }
    }
    recurse(data, "");
    return result;
}

class GlobalCache{
    constructor(){
        this.storage = {};

        this.insert = this.insert.bind(this);
        this.get = this.get.bind(this);
        this.remove = this.remove.bind(this);
        this.clear = this.clear.bind(this);
    }
    insert(key,obj){
        this.storage[key] = Object.flatten(obj);
    }
    get(key){
        if(! key in this.storage){
            return null;
        }
        
        return Object.unflatten(this.storage[key]);
    }
    remove(key){
        if(key in this.storage)
            delete this.storage[key];
    }   
    clear(){
        for(var key in Object.keys(this.storage)){
            delete this.storage[key];
        }
    }
    isPresent(key){
        return key in this.storage;
    }
    
}

export var globalCache = new GlobalCache();


export class DBEndpoint{
    constructor(apiUrl){
        
        this.authHeaders = { 
            'Content-Type':'application/json',
            'Authorization': 'token ' + window.localStorage.getItem('rb_access_token')
        };

        this.apiUrl = configs.apiHostUrl + apiUrl;

        this.filter = null;
    }
    addFilter(filter){
        this.filter = {};
        // filter is a dict with key value pairs, that will be converted into param
        for(var key of Object.keys(filter)){
            this.filter[key] = filter[key]
        }
        return this;
    }
    
    reactOnStatus(status){
        if(status === 401 ){
            window.localStorage.clear();
        }
    }
    
    async createOne(dbObj){
        
        let resp = await fetch(this.apiUrl, { headers: this.authHeaders, method:"POST", body:JSON.stringify(dbObj) });
        let data = await resp.json();
        return data;
    }
    async readAll(){
        // Return list of objs from db
        
        var url = new URL(this.apiUrl);
        if(this.filter !== null){
            for(var key of Object.keys(this.filter)){
                url.searchParams.set(key,this.filter[key]);
            }
        }
        let resp = await fetch(url,{ headers: this.authHeaders,method:"GET"});
        
        this.reactOnStatus(resp.status);
        
        
        this.filter = null;
        let data = await resp.json();
        return data;
    }
    async readOne(id){
        let resp = await fetch(this.apiUrl + id + '/',{ headers: this.authHeaders,method:"GET"});
        let data = await resp.json();
        return data;
    }
    async updateOne(id,dbObj){
        let resp = await fetch(this.apiUrl + id + '/', { headers: this.authHeaders, method:"PUT", body:JSON.stringify(dbObj) });
        return await resp.json();
    }
    async deleteOne(id){
        let resp = await fetch(this.apiUrl + id + '/', { headers: this.authHeaders, method:"DELETE" });
        return await resp.json();
    }
    async downloadPdf(id){
        let headers = Object.assign({},this.authHeaders);
        headers['Content-Type'] = "application/pdf";
        let resp = await fetch(this.apiUrl + id + '/',{ headers: this.authHeaders,method:"GET"});       
        
        let data = await resp.blob();
        return data;
    }
}

