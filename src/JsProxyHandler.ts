import {AbstractSelector} from './abstract/AbstractSelector';

export default {
    get: (target:AbstractSelector, name:string) => {
        return name in target ? target[name] : 37;
    }
};