import {AbstractSelector} from './abstract/AbstractSelector';
import {ConfigInterface,PushInterface} from './Interfaces';
import {DOMParser} from 'xmldom';
import {Config} from './Config';

export class DefaultSelector implements AbstractSelector {

    dom: DOMParser;

    constructor(config:Config) {
        this.dom = new DOMParser();
    }
    
    public css (DomObject: DOMParser):DOMParser {
        return this.dom;
    }

}