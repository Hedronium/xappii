import * as EventEmitter from 'events';
import {ConfigInterface,PushInterface} from './Interfaces';
import {AbstractQueue} from './abstract/AbstractQueue';
import {Config} from './Config';
import {DefaultFetcher} from './DefaultFetcher';
import {AbstractFetcher} from './abstract/AbstractFetcher';

class Process extends EventEmitter {
	
	
	queue:AbstractQueue;
	fetcher: AbstractFetcher;

	protected _delay:number = 0;
	protected _perMinute:number = 0;
	protected _concurrent:number = 0;
	protected _start:number = 0;
	protected _running:number = 0;
	protected _request_this_minute:number = 0;
	protected _finished:number = 0;
	protected _fails:number = 0;
	protected __paused:boolean = false;
	protected __start_time:number = 0;
	protected __last_request_time:number = 0;
	protected __next_request_time:number = 0;
	protected __this_minute:number;
	protected __now:number;
	
	config:Config = null;

	
	constructor(config: ConfigInterface) {
		super();
		this.config = new Config(config);
		this._delay = this.config.delay();
		this._perMinute = this.config.perMinute();
		this._concurrent = this.config.concurrent();
		this.queue = this.config.queue();
		this.fetcher = new DefaultFetcher(config);
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
			if (!this.__this_minute) {
				this.__this_minute = (new Date).getTime() + 6000;
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

			this.__now =  (new Date).getTime();

			if ((this.__now+this._delay) > this.__next_request_time) {
				return;
			}

			if (this._request_this_minute < this._perMinute) {
				return ;
			}

			
			setTimeout(() => {
				this.queue.pop().then((result) => {
					this.requestExecute(result).then(() => {
						
					});
				});
				//this.requestExecute().then();
			}, this._delay);

		});
	}

	public requestExecute (data:PushInterface):Promise<number> {
		return new Promise((resolve,reject) => {
			this.__last_request_time = (new Date).getTime();
			this.__next_request_time = this.__last_request_time + this._delay;
			this._running += 1;
			this._request_this_minute = (this.__now > this.__this_minute) ? 1 : this._request_this_minute + 1;

			//this.fetcher.get();

		});
	}

}