import React from 'react';

import {configs} from '../Config';

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
}

