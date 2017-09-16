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
        this.request = new Request(this.options);        
    }
    
    public get(data:PushInterface) :any {
        //let req = Request();
    }

    public post(data:PushInterface) : any {

    }
}
