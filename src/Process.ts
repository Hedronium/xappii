import * as EventEmitter from 'events';
import {ConfigInterface,PushInterface} from './Interfaces';
import Config from './Config';

class Process extends EventEmitter {
	
	
	queue:any = null;

	delay:number = 0;
	perMinute:number = 0;
	queueType:string = null;
	phantom:string = null;
	concurrent:number = 0;
	config:any = null;

	
	constructor(config: ConfigInterface) {
		super();
		this.config = new Config(config);
		this.delay = config.delay;
		this.perMinute = config.perMinute;
		this.queueType = config.queueType;
	}

	/**
	 * Push a link which needs to be processed 
	 */
	public push(object: PushInterface) {
		if (typeof object.url == 'string') {
			throw new Error('Url must be a string');
		}
		if (object.priority*1 <= 0) {

			throw new Error(`Requests per minute must be a positive numeric value.`);
		}

	}

}