import {ConfigInterface,PushInterface} from './../Interfaces';

export abstract class AbstractFetcher {

    abstract get(data:PushInterface):any;
    abstract post(data:PushInterface):any;
}
