<script setup lang="ts">
import { ref, watch, watchEffect } from "vue";
import Main from "./components/Main.vue";
import { config } from "./config";
import { PageContent, TLEvent } from "./types/wptypes";

const eventsData = ref<TLEvent[]>([]);
const pagesData = ref<PageContent[]>([]);

watchEffect(async () => {
  try {
    const res = await fetch(config.endpoint);
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const finalRes = await res.json();
    eventsData.value = finalRes.sm.events;
    pagesData.value = finalRes.sm.pages;
    console.log(finalRes);
  } catch (error) {
    console.error(`Error:`, error);
  }
});
</script>

<template>
  <div v-if="pagesData.length > 0">
    <Main :events="eventsData" :pages="pagesData"></Main>
  </div>
</template>

<style scoped></style>
