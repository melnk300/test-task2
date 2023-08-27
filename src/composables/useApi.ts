import {ref} from "vue";
import axios from "axios";



export default function useApi<T, F>() {
  const isLoading = ref(true);
  const error = ref<any>(null);
  const data = ref<T | null>(null);

  async function makeRequest(url: string, filters?: F) {
    return axios
      .get<T>(`https://dev.aicap.tech/api/v1/interview/${url}`, {
        params: filters,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        error.value = err;
      })
      .finally(() => {
        isLoading.value = false;
      });
  }

  async function fetchData(url: string, filters?: F) {
    isLoading.value = true;
    data.value = null;

    data.value = await makeRequest(url, filters);

    return data.value
  }

  async function updateData(url: string, filters?: F) {
    isLoading.value = true;

    makeRequest(url, filters).then((response) => {
      data.value?.results?.push(...response.results);
    })

    return data.value
  }

  return {
    isLoading,
    error,
    data,
    fetchData,
    updateData
  }
}