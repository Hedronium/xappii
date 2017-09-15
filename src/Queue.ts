import {ConfigInterface,PushInterface} from './Interfaces';
import * as PriorityQueue from 'js-priority-queue';
import * as Kue from 'kue';

class Queue {

    config:ConfigInterface;
    queue:any;

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


    public instance() {
        return this;
    }

    // push data into Scrapers queue processor ,this is a generalized method
    public push(data:PushInterface):void {

        if (this.config.queueType !== 'redis') {
                return this.inMemoryPush(data);
            } else {
                return this.redisPush(data);
        }

    }

    // pop data from scrapers queue process, this is also a generalized method
    public pop():any {

        if (this.config.queueType !== 'redis') {
                return this.inMemoryPop();
            } else {
                return this.redisPop();
        }
    }

    // push data into js-priority-queue 
    public inMemoryPush(data:PushInterface):void {
        this.queue.queue(data);
    }

    // pop data from js-priority-queue
    public inMemoryPop():any {
        return this.queue.dequeue();
    }

    // redis push data , with simple modification while inserting
    public redisPush(data: PushInterface):void {
        let priority = (data.priority == 0) ? 'low' : 'high';
        this.queue.create('xappii',data).priority(priority).save((err:any) => {
            throw new Error(err);
        });
    }

    // redis pop data
    public redisPop():any {
        return this.queue.process('xappii',(job:any,done:any) => {
            done();
            return job.data;
        }).then((err:any) => {
            throw new Error(err);
        });   
    }

    // This returns the length of the remaing queue items
    public length():number {

        if (this.config.queueType == 'redis') {
            return this.queue.inactiveCount( function( err:any, total:number ) { 
                return total;
            });
            
            } else {
            
            return this.queue.length;
        }


    }
}

export default Queue;