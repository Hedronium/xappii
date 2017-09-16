import {AbstractQueue} from './abstract/AbstractQueue';
import {AbstractFetcher} from './abstract/AbstractFetcher';
import {AbstractProxy} from './abstract/AbstractProxy';
import {AbstractSelector} from './abstract/AbstractSelector';
import {Config} from './Config';

export  interface redisConfigInterface {
    host: string,
    port: number,
    auth: string,
    db: number,
    prefix: string
}

export interface ConfigInterface {
	concurrent?: number,
	delay?: number,
	perMinute?: number,
	queueType?: string,
    scraper?: { new(Config:Config): AbstractFetcher },
    storage?: { new(Config:Config): AbstractQueue },
    proxy?: { new(Config:Config): AbstractProxy }
}

export interface PushInterface {
    url: string,
    priority?: number,
    data?: any,
    tag: string
}

export interface UserAgentInterface {

    'User-Agent'?: string,
    'accept'?: string,
    'accept-language'?: string,
    'cache-control'?: string

}