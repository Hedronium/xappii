import * as PriorityQueue from 'js-priority-queue';
import {AbstractQueue} from './abstract/AbstractQueue';
import {ConfigInterface,PushInterface} from './Interfaces';
import {Config} from './Config';

export class InMemoryQueue implements AbstractQueue {
    queue:any;

    constructor(config:Config) {
			this.queue = new PriorityQueue({
                    strategy: PriorityQueue.BinaryHeapStrategy,
                    comparator: function(a:any, b:any) {
                        return b.priority - a.priority;
                    }
			});
    }

    // push data into Scrapers queue processor ,this is a generalized method
    public push(data:PushInterface):InMemoryQueue {
        this.queue.queue(data);
        return this;
    }

    // pop data from scrapers queue process, this is also a generalized method
    public pop():Promise<PushInterface> {       
        return new Promise((resolve,reject) => {
            resolve(this.queue.deque());
        });
    }

    // Get the lengh of inactive queue
    public length (): Promise<number> {
        return new Promise((resolve,reject) => {
            resolve(this.queue.length);
        });
    }
}