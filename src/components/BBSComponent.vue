<template>
 <div>
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
import { useRoute } from 'vue-router';
import { Notify } from 'quasar';
import { getPosts } from '../utils/firebase/read';
import { Post } from './models';

let name = ref();
let text = ref();
let posts = ref([] as Post[]);
const route = useRoute();


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