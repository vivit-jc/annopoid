<template>
  <div>
    <q-btn @click="clickBtn(tree)">{{ tree.name }}:{{ tree.count }}</q-btn>
    <q-btn @click="clickBtn(iron)">{{ iron.name }}:{{ iron.count }}</q-btn>
    <q-btn @click="clickBtn(wheat)">{{ wheat.name }}:{{ wheat.count }}</q-btn>
    <q-btn @click="clickBtn(wool)">{{ wool.name }}:{{ wool.count }}</q-btn>
    <q-btn @click="clickbuildBtn(house,tree)">{{ house.name }}を建てる　</q-btn>
    <div>{{house.name}}:{{house.count}}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tree = ref({ name: '木', count: 0 });
const iron = ref({ name: '鉄', count: 0 });
const wheat = ref({ name: '麦', count: 0 });
const wool = ref({ name: '羊毛', count: 0 });
const house = ref({name: '家',count: 0 })

function clickBtn(ref: any) {
  ref.count += 1;
  return true;
}
function clickbuildBtn(building: any, resourse: any) {
  if (resourse.count >= 10 ){
   building.count += 1;
   resourse.count -= 10;
   return true;
   }
}
</script>
