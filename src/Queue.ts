import * as PriorityQueue from 'js-priority-queue';
import * as Kue from 'kue';
import {ConfigInterface,PushInterface} from './Interfaces';
import {AbstractQueue} from './AbstractQueue';

class Queue {

    config:ConfigInterface;
    queue:AbstractQueue;

    // Queue constructor choose which queue to work with depends on the user config
    constructor(config: ConfigInterface) {
        this.config = config;    
		if (this.config.queueType !== 'redis') {

			this.queue = new PriorityQueue({
							strategy: PriorityQueue.BinaryHeapStrategy,
							comparator: function(a:any, b:any) {
								return b.priority - a.priority;
							}
					});
		} else {

		this.queue = Kue.createQueue({
					prefix: this.config.redis.prefix,
					redis: {
						port: this.config.redis.port,
						host: this.config.redis.host,
						auth: this.config.redis.auth,
						db: this.config.redis.db, // if provided select a non-default redis db 
						options: {
						
						}
					}
			});

		}
    }


    public instance():Queue {
        return this;
    }

    // push data into Scrapers queue processor ,this is a generalized method
    public push(data:PushInterface):Queue {
        this.queue.push(data);
        return this;
    }

    // pop data from scrapers queue process, this is also a generalized method
    public pop(callback:Function):Promise<PushInterface> {
        return this.queuePop(callback);
    }

    // push data into js-priority-queue 
    public queuePush(data:PushInterface):void {
        this.queue.queue(data);
    }

    public queuePop(callback:Function):Promise<PushInterface> {
        return this.queue.dequeue();
    }
}


export default Queue;