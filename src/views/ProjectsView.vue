<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";

import type {projectFilters, projectResponse, projectStatus} from "@/dto/project";
import useApi from "@/composables/useApi";

import Project from "@/components/Project.vue";
import Pagination from "@/components/Pagination.vue";
import Tooltip from "@/components/Tooltip.vue";

const pagesCount = ref()
const activePage = ref(1)

const {isLoading, data, fetchData, updateData} = useApi<projectResponse, projectFilters>()


const statuses = reactive<(projectStatus | "all")[]>([
  'CREATED',
  'IN_PROGRESS',
  'FINISHED',
  'all',
])

const filters = reactive<projectFilters>({
  page: activePage.value,
  status: null,
  title: null
})

onMounted(async () => {
  const response = await fetchData('projects')
  pagesCount.value = response.count / 10
})

const changePage = (page: number) => {
  activePage.value = page
  filters.page = activePage.value
  fetchData('projects', filters)
}

const decreasePage = () => {
  if (activePage.value > 1) {
    activePage.value--
    filters.page = activePage.value
    fetchData('projects', filters)
  }
}

const increasePage = () => {
  if (activePage.value < pagesCount.value) {
    activePage.value++
    filters.page = activePage.value
    fetchData('projects', filters)
  }
}

const updateProjects = () => {
  filters.page = filters.page + 1
  updateData('projects', filters)
}

const applyFilters = () => {
  filters.status = filters.status === 'all' ? null : filters.status

  fetchData('projects', filters).then((res) => {
    pagesCount.value = Math.ceil(res.count / 10)
  })
}
</script>

<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-7">
      <div class="col-span-1 border py-3 px-4">ID</div>
      <Tooltip class="col-span-4 border py-3 px-4">
        <template v-slot:title>
          <div>Title</div>
        </template>
        <template v-slot:tooltip>
          <input v-model="filters.title" type="text" placeholder="filter" class="px-2 w-max">
          <button class="pl-4" v-on:click="filters.title = null">x</button>
          <button class="bg-blue-400 text-gray-50 py-1 w-full mt-2 text-center" v-on:click="applyFilters">apply</button>
        </template>
      </Tooltip>
      <Tooltip class="col-span-2 border py-3 px-4">
        <template v-slot:title>
          <div>Status</div>
        </template>
        <template v-slot:tooltip>
          <label v-for="statusName in statuses" :for="statusName" class="block" :key="statuses.indexOf(statusName)">
            <input type="radio" :id="statusName" name="status" v-model="filters.status" :value="statusName">
            {{ statusName }}
          </label>
          <button class="bg-blue-400 text-gray-50 py-1 w-full mt-2 text-center" v-on:click="applyFilters">apply</button>
        </template>
      </Tooltip>
    </div>
    <div v-for="project in data?.results" :key="project.id">
      <Project :id="project.id" :title="project.title" :status="project.status"/>
    </div>
    <div class="flex justify-center items-center" v-if="isLoading">
      <div class="loader"></div>
    </div>
    <div class="flex justify-center border">
      <button class="py-2" v-on:click="updateProjects">Load more</button>
    </div>
    <Pagination class="my-4" :pages-count="pagesCount" :active-page="activePage"
                @change-page="(page: number) => changePage(page)"
                @decrease-page="decreasePage" @increase-page="increasePage"
    />
  </div>
</template>

<style scoped>
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #FFF;
  border-bottom-color: #FF3D00;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>