import {ConfigInterface,PushInterface} from './../Interfaces';

export abstract class AbstractQueue {
    constructor() {
        
    }

    abstract push(data:PushInterface):void;
    abstract pop(callback:Function):Promise<PushInterface>;
    abstract length():Promise<number>;
}
