import * as EventEmitter from 'events';
import {ConfigInterface,PushInterface} from './Interfaces';
import {AbstractQueue} from './abstract/AbstractQueue';
import Config from './Config';

class Process extends EventEmitter {
	
	
	queue:AbstractQueue;

	protected _delay:number = 0;
	protected _perMinute:number = 0;
	protected _concurrent:number = 0;
	protected _start:number = 0;
	protected _running:number = 0;
	protected _request_this_minute = 0;
	protected _finished = 0;
	protected _fails = 0;
	protected __paused = false;
	protected __start_time = 0;
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

	public start():void {
		
		this.queue.length().then((length) => {
			if (length == 0) {
				return ;
			}
			if (!this.__start_time) {
				this.__start_time = (new Date).getTime();
			}
			this.processing();
		})
	}

	public processing():void {
		this.queue.length().then((length) => {

			if (!this.queue.length || this.__paused) {
				return;
			}

			if (this._running >= this._concurrent) {
				return;
			}

			let now = (new Date).getTime();
			let milis = now - this.__start_time;

		});
	}

}