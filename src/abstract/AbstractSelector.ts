import {DOMParser} from 'xmldom';

export abstract class AbstractSelector {
    abstract css(DomObject: DOMParser):DOMParser;
    abstract xpath(DomObject: DOMParser):Error;
}