import {ConfigInterface,PushInterface} from './Interfaces';
import {AbstractFetcher} from './abstract/AbstractFetcher';
import {Config} from './Config';
import {Request} from 'request';


export class DefaultFetcher implements AbstractFetcher {

    request:any;
    options:any;
    config: Config;

    constructor(config: Config) {
         this.options = {
            headers: config.proxy().header()
        };
        
    }
    
    public get(data:PushInterface) :Promise<any> {
        //let req = Request();
        this.options.url = data.url;
        return new Promise((resolve,reject) => {
            return new Request(this.options,(error:any,response:any,body:any) => {
                    if (!error) {
                        reject(error);
                    } else {
                        resolve(body);
                    }
            });
        });    
    }

    public post(data:PushInterface) : Promise<any> {
        this.options.url = data.url;
        return new Promise((resolve,reject) => {
            return new Request(this.options,(error:any,response:any,body:any) => {
                    if (!error) {
                        reject(error);
                    } else {
                        resolve(body);
                    }
            });
        });
    }
}
