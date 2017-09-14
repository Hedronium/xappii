import {ConfigInterface,PushInterface} from './Interfaces';
import * as PriorityQueue from 'js-priority-queue';
import * as Kue from 'kue';

class Queue {

    config:ConfigInterface;
    queue:any;

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

    public push(data:PushInterface):void {

        if (this.config.queueType !== 'redis') {
            
            } else {

        }

    }

    public pop():any {

    }

    public inMemoryPush(data:PushInterface):void {

    }

    public inMemoryPop():any {

    }

    public redisPush(data: PushInterface):void {

    }

    public redisPop():any {

    }
}

export default Queue;