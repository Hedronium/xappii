import {ConfigInterface,PushInterface} from './../Interfaces';

export abstract class AbstractFetcher {
    constructor() {
        
    }

    abstract get(url:string);
    abstract post(url:string);
}
