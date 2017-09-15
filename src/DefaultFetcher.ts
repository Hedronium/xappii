import {AbstractFetcher} from './abstract/AbstractFetcher';
import {ConfigInterface,PushInterface} from './Interfaces';
import * as Request from 'request-promise';

export class DefaultFetcher implements AbstractFetcher {

    public get(data:PushInterface) :any {
        //let req = Request();
    }

    public post(data:PushInterface) : any {

    }

}
