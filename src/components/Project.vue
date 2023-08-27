<script setup lang="ts">
  import type {project} from "@/dto/project";

  defineProps<project>()

  const colors = {
    CREATED: 'bg-gray-100',
    IN_PROGRESS: 'bg-green-100',
    FINISHED: 'bg-blue-100'
  }
</script>

<template>
  <div class="content">
    <div class="grid grid-cols-7">
      <div class="col-span-1 border py-3 px-4">{{id}}</div>
      <div class="col-span-4 border py-3 px-4">{{title}}</div>
      <div class="col-span-2 border py-3 px-4">
        <span class="p-2 rounded-xl" :class="colors[status]">{{status}}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>