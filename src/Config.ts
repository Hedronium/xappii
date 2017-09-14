import {ConfigInterface} from './Interfaces';
import Queue from './Queue'

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

		} else if (this.config.perMinute > 1) {
		
			throw new Error(`Requests per minute must be a positive numeric value.`);
		
		} else {
			
			return this.config.perMinute;
		}
	}

	/**
	 *  This concurrent config is for how many links will be processed in a single amout time
	 */
	public concurrent():number {

		if (this.config.concurrent*1 <= 0) {
			throw new Error(`Requests per minute must be a positive numeric value.`);
		} else if (!this.config.concurrent) {
			return 1;
		} else {
			return this.config.concurrent;
		}
	}

	public queue():any {

	}

	public delay():number {

		if (this.config.delay*1 <= 0) {
			throw new Error(`Requests per minute must be a positive numeric value.`);
		} else {
			return this.config.delay;
		}

	}

	public phantom():any {
		
	}
}