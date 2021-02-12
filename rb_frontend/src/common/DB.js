import React from 'react';

import {configs} from '../Config';

export class DBEndpoint{
    constructor(apiUrl){
        
        this.authHeaders = { 
            'Content-Type':'application/json',
            'Authorization': 'token ' + window.localStorage.getItem('rb_access_token')
        };

        this.apiUrl = configs.apiHostUrl + apiUrl;
    }
    async createOne(dbObj){
        let resp = await fetch(this.apiUrl, { headers: this.authHeaders, method:"POST", body:JSON.stringify(dbObj) });
        let data = await resp.json();
        return data;
    }
    async readAll(){
        // Return list of objs from db
        let resp = await fetch(this.apiUrl,{ headers: this.authHeaders,method:"GET"});
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

