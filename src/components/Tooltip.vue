<script setup lang="ts">
  import {ref} from "vue";
  import { onClickOutside} from "@vueuse/core";

  import {FunnelIcon} from "@heroicons/vue/24/outline";

  const isShowed = ref<boolean>(false)
  const element = ref<HTMLElement | null>(null)

  onClickOutside(element, () => isShowed.value = false)
</script>

<template>
  <div class="container" ref="element">
    <div class="flex justify-between relative">
      <slot name="title"></slot>
      <div class="relative">
        <FunnelIcon class="h-6 w-6 cursor-pointer" v-on:click="isShowed = !isShowed"/>
        <div class="absolute top-7 bg-gray-100 p-4 w-max rounded right-0" v-if="isShowed">
          <slot name="tooltip"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>