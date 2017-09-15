import {ConfigInterface,PushInterface} from './Interfaces';

abstract class AbstractQueue {
    constructor() {
        
    }

    abstract push(data:PushInterface):void;
    abstract pop():Promise<PushInterface>;
    abstract length():number;
}

export default AbstractQueue;