import {ConfigInterface,PushInterface} from './Interfaces';

abstract class AbstractQueue {
    constructor() {
        
    }

    abstract push():void;
    abstract pop():Promise<PushInterface>;
    abstract length():number;
}

export default AbstractQueue;