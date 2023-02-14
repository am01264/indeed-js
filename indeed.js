"use strict";

export class Indeed {
    
    constructor(publisher) {

        this.publisher = publisher;

        this.defaults = {'v': '2', 'format': 'json', 'publisher': this.publisher};

        this.endpoint = 'http://api.indeed.com/ads/apisearch';
        
        this.required_fields = ['userip', 'useragent', ['q', 'l']];

    }

    search(params){
        this.validate_params(params);

        for(const attr in this.defaults){params[attr] = this.defaults[attr];}
    
        const url = new URL(this.endpoint, 'http://api.indeed.com');

        for (const field in params) {
            url.searchParams.set(field, params[field])
        }

        return fetch(url, {
            method: 'GET',
        })
        
    }


    validate_params(params){
        const num_required = this.required_fields.length;

        for(let i = 0; i < num_required; i++){
            const field = this.required_fields[i];
            if(field instanceof Array){
                const num_one_required = field.length;
                let has_one = false;
                for(let x = 0; x < num_one_required; x++){
                    if(field[x] in params){
                        has_one = true;
                        break;
                    }
                }
                if(!has_one){
                    throw "You must provide one of the following " + field.join();
                }
            }else if(!(field in params)){
                throw "The field "+field+" is required";
            }
        }
    };

};