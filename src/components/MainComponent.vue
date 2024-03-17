<template>
  <div class="row">
    <div class="col-3">
      資源<br />
      <ul>
        <li v-for="resource in resources" :key="resource.name">
          <q-btn @click="clickBtn(resource)">
            {{ resource.name }}:{{ resource.count }}
          </q-btn>
        </li>
      </ul>
      <div>
        　建築<br />
        <q-btn @click="clickbuildBtn(factories, resources)"
          >{{ factories.name }}を建てる　</q-btn
        >
      </div>
      　建物<br />
      <div v-for="factory in factories" :key="factory.name">
        {{ factory.name }}:{{ factory.count }}
        消費 {{ factory.consume_resources_name}}:{{ factory.consume_resources_count}}
        ワーカータイプ:{{ factory.consume_worker_name}}
        生産 {{ factory.produce_resources_name}}:{{ factory.produce_resources_count}}
      </div>
      ワーカー<br />
      <div v-for="worker in workers" :key="worker.name">
        {{ worker.name }}:{{ worker.current_count }}/{{worker.total_count}}
      </div>
    </div>
    <div class="col-6">
    <BBSComponent></BBSComponent>
    </div>
    <div class="col-3">
      要求<br />
      <ul>
        <li v-for="(demand, index) in demands" :key="index" class="people">
          <div>
            {{ demand.type }}<br />
            <span v-for="d in demand.demand" :key="d.name">
              {{ d.name }}:{{ d.count }}<br />
            </span>
          </div>
          <q-btn color="black">要求を満たす</q-btn>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Resource, Demand, Factory, Worker} from './models';
import BBSComponent from 'components/BBSComponent.vue';

const resources = ref<Resource[]>([
  { name: '木', count: 0 },
  { name: '鉄', count: 0 },
  { name: '麦', count: 0 },
  { name: '羊毛', count: 0 },
  { name: 'パン', count: 0 },

]);

const demand_data: Demand[] = [
  {
    type: '農民',
    demand: [
      { name: '羊毛', count: rand(3) + 1 },
      { name: '麦', count: rand(3) + 1 },
    ],
  },
  { type: '農民', demand: [{ name: '鉄', count: rand(3) + 1 }] },
  { type: '労働者', demand: [{ name: '木', count: rand(3) + 1 }] },
];

let demands = ref<Demand[]>(demand_data);

const factories = ref<Factory[]>([
  {name: 'パン工場',
    count: 0,
    cost: 10,
    consume_resources_name: '麦',
    consume_resources_count: 2,
    consume_worker_name: '労働者',
    produce_resources_name: 'パン',
    produce_resources_count: 1
  }]);

const workers = ref<Worker[]>([
  { name: '労働者', 
    total_count: 0,
    current_count: 0,
    return_time: 600,
    get_demand: '未定'
  }]);


function clickBtn(resource: any) {
  resource.count += 1;
  return true;
}

function clickbuildBtn(factory: any, resource: any) {
  if (resource.count >= 10) {
    factory.count += 1;
    resource.count -= 10;
    return true;
  }
}

function rand(n: number) {
  return Math.floor(Math.random() * n);
}
</script>

<style scoped>
li {
  list-style: none;
}
.people {
  background-color: aqua;
  margin-bottom: 5px;
}
</style>
