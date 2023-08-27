<script setup lang="ts">
import {ArrowSmallLeftIcon, ArrowSmallRightIcon} from "@heroicons/vue/20/solid";

type PaginationProps = {
    pagesCount: number;
    activePage: number;
  }

  defineProps<PaginationProps>()
</script>

<template>
  <div class="flex justify-center">
    <button v-on:click="$emit('decrease-page')"><ArrowSmallLeftIcon class="h-6 w-6" /></button>
    <button v-on:click="$emit('change-page', page)" v-for="page in pagesCount" class="rounded-full mx-3 h-6 w-6" :key="page" :class="activePage == page ? 'bg-amber-100' : 'bg-gray-100'">{{page}}</button>
    <button v-on:click="$emit('increase-page')"><ArrowSmallRightIcon class="h-6 w-6" /></button>
  </div>
</template>

<style scoped>

</style>