import {ConfigInterface} from './Interfaces';
import {InMemoryQueue} from './InMemoryQueue'
import {AbstractQueue} from './abstract/AbstractQueue';

export default class Config {

	config:ConfigInterface = null;
	constructor(config: ConfigInterface) {
		this.config = config;
	}

	/**
	 * How many links will be processed perMinute 
	 */
	public perMinute():number {
		if (this.config.perMinute*1 <= 0) {
		
			throw new Error(`Requests per minute must be a positive numeric value.`);

		}
		return (this.config.perMinute == 0) ? 1 : this.config.perMinute;
	}

	/**
	 *  This concurrent config is for how many links will be processed in a single amout time
	 */
	public concurrent():number {

		if (this.config.concurrent*1 <= 0) {
			throw new Error(`Requests per minute must be a positive numeric value.`);
		}
		return (this.config.concurrent == 0) ? 1: this.config.concurrent;
	}

	/**
	 *  This is a generalized queue method , it inject the configuration into Queue class, which handles
	 * 	both in memory and redis based priority queue . nad returns the class instance
	 */
	public queue():AbstractQueue {

		if (typeof this.config.storage !== 'function') {
			throw new Error('Storage has to be a Class type');
		}
		return  (!this.config.storage) ? new InMemoryQueue : new this.config.storage;
	}

	public delay():number {
		if (this.config.delay*1 <= 0) {
			throw new Error(`Requests per minute must be a positive numeric value.`);
		}
		return this.config.delay;
	}

}