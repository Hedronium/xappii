import {AbstractQueue} from './abstract/AbstractQueue';

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
    scraper?: Function,
    storage?: { new(): AbstractQueue }
}

export interface PushInterface {
    url: string,
    priority?: number,
    data?: any,
    tag: string
}
