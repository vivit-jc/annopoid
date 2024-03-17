export interface Post {
    name: string;
    text: string;
    timestamp: number;
  }

export interface Resource {
    name: string;
    count: number;
  } 
 
export interface Demand {
    type: string;
    demand: Resource[];
  }

export interface Factory {
    name: string;
    count: number;
    cost: number;
    consume_resources_name: string;
    consume_resources_count: number;
    consume_worker_name: string;
    produce_resources_name: string;
    produce_resources_count: number;
  }


export interface Worker {
    name: string;
    total_count: number;
    current_count: number;
    return_time: number;
    get_demand: string;
}