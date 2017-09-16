import {AbstractProxy} from './abstract/AbstractProxy';
import {Config} from './Config';
import {ConfigInterface,UserAgentInterface} from './Interfaces';

export class DefaultProxy implements AbstractProxy {

    constructor (config:Config) {

    }

    public header():UserAgentInterface {
        return {
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'accept-language': 'en-US,en;q=0.8',
                'cache-control': 'max-age=0'
			};
    }

}