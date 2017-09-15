import * as EventEmitter from 'events';
import {ConfigInterface,PushInterface} from './Interfaces';
import Config from './Config';

class Process extends EventEmitter {
	
	
	queue:any = null;

	protected _delay:number = 0;
	protected _perMinute:number = 0;
	protected _concurrent:number = 0;
	protected _start:number = 0;
	protected _running:number = 0;
	protected _request_this_minute = 0;
	protected _finished = 0;
	protected _fails = 0;
	config:any = null;

	
	constructor(config: ConfigInterface) {
		super();
		this.config = new Config(config);
		this._delay = this.config.delay();
		this._perMinute = this.config.perMinute();
		this._concurrent = this.config.concurrent();
		this.queue = this.config.queue();
		
	}

	/**
	 * Push a link which needs to be processed 
	 */
	public push(object: PushInterface) {
		this.queue.push(object);	
	}

	private start() {

		this.queue.pop();

	}

}