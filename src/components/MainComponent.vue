<template>
  <div>
    資源
    <q-btn
      v-for="resource in resources"
      :key="resource.name"
      @click="clickBtn(resource)"
    >
      {{ resource.name }}:{{ resource.count }}
    </q-btn>
    <div>
      　建築
      <q-btn @click="clickbuildBtn(buildings, resources)"
        >{{ buildings.name }}を建てる　</q-btn
      >
    </div>
    　
    <div v-for="building in buildings" :key="building.name">
      建物 {{ building.name }}:{{ building.count }}
    </div>
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
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { addPost } from '../utils/firebase/write';
import { getPosts } from '../utils/firebase/read';
import { useRoute } from 'vue-router';
import { Notify } from 'quasar';

let name = ref();
let text = ref();
let posts = ref([] as Post[]);
const route = useRoute();

interface Resource {
  name: string;
  count: number;
}

interface Post {
  name: string;
  text: string;
  timestamp: number;
}

const resources = ref<Resource[]>([
  { name: '木', count: 0 },
  { name: '鉄', count: 0 },
  { name: '麦', count: 0 },
  { name: '羊毛', count: 0 },
]);

const buildings = ref<Resource[]>([{ name: '家', count: 0 }]);

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

function clickbuildBtn(building: any, resource: any) {
  if (resource.count >= 10) {
    building.count += 1;
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
</script>
