import {ConfigInterface,UserAgentInterface} from './../Interfaces';

export abstract class AbstractProxy {

    abstract header():UserAgentInterface;

}
