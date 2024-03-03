<template>
  <div> 資源
    <q-btn v-for="resource in resources" :key="resource.name" @click="clickBtn(resource)">
      {{ resource.name }}:{{ resource.count }}
    </q-btn>
    <div>　建築
      <q-btn @click="clickbuildBtn(buildings,resources)">{{ buildings.name }}を建てる　</q-btn>
    </div>　
      <div v-for="building in buildings" :key="building.name">
       建物 {{ building.name }}:{{ building.count }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Resource {
  name: string;
  count: number;
}

const resources = ref<Resource[]>([
  { name: '木', count: 101 },
  { name: '鉄', count: 10 },
  { name: '麦', count: 0 },
  { name: '羊毛', count: 0 }
]);

const buildings = ref<Resource[]>([
  { name: '家', count: 0 }
]);

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
</script>
