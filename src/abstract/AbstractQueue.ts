import {ConfigInterface,PushInterface} from './../Interfaces';

export abstract class AbstractQueue {

    abstract push(data:PushInterface):void;
    abstract pop():Promise<PushInterface>;
    abstract length():Promise<number>;
}
