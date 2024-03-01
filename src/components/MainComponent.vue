<template>
  <div>
    <q-btn @click="clickBtn(tree)">{{ tree.name }}:{{ tree.count }}</q-btn>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tree = ref({ name: '木', count: 0 });

function clickBtn(ref: any) {
  ref.count += 1;
  return true;
}
</script>
