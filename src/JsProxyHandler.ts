import {AbstractSelector} from './abstract/AbstractSelector';

export default (selector_plugins: Array<AbstractSelector>, document: Node) => ({
    get: (target:AbstractSelector, name:string) => {
        if (name in selector_plugins) {
            return selector_plugins[name](document);
        } else {
            throw new Error(`Selector "${name}" Engine not found.`);
        }
    }
});
