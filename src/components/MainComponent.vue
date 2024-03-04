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
        <q-btn @click="clickbuildBtn(factorys, resources)"
          >{{ factorys.name }}を建てる　</q-btn
        >
      </div>
      　建物<br />
      <div v-for="factory in factorys" :key="factory.name">
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
      <q-input v-model="name" label="名前" />
      <q-input v-model="text" label="内容" />
      <q-btn label="送信" color="primary" @click="submit()" />
      <table border="1">
        <tr>
          <th>名前</th>
          <th>内容</th>
          <th>時刻</th>
        </tr>
        <tr v-for="p in posts" :key="p.timestamp">
          <td>{{ p.name }}</td>
          <td>{{ p.text }}</td>
          <td>{{ strDate(p.timestamp) }}</td>
        </tr>
      </table>
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
import { ref, onMounted, watch } from 'vue';
import { addPost } from '../utils/firebase/write';
import { getPosts } from '../utils/firebase/read';
import { useRoute } from 'vue-router';
import { Notify } from 'quasar';
import { Post, Resource, Demand, Factory, Worker} from './models';

let name = ref();
let text = ref();
let posts = ref([] as Post[]);
const route = useRoute();



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

const factorys = ref<Factory[]>([
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

watch(route, (n, p) => {
  location.reload();
});

onMounted(() => {
  getPosts((data: any) => {
    Object.keys(data).forEach((e) => {
      posts.value.push(data[e]);
    });
    posts.value.sort((a, b) => b.timestamp - a.timestamp);
  });
});

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

function submit() {
  addPost(makePostData());
  Notify.create('送信しました');
  return false;
}

function makePostData() {
  let post = {
    name: name.value,
    text: text.value,
  };
  return post;
}
function strDate(ts: number) {
  const date = new Date(ts);
  return (
    date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
  );
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
