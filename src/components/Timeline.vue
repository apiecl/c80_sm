<script setup lang="ts">
import { TLEvent, PageContent } from "../types/wptypes";
import TimelineEvent from "./TimelineEvent.vue";

interface Props {
    events: TLEvent[];
    intro: PageContent;
}

defineProps<Props>();
</script>
<template>
    <div v-if="intro">
        <div class="intro">
            <h1>{{ intro.title }}</h1>
            <div v-html="intro.content"></div>
        </div>
    </div>
    <swiper-container class="timeline" :slides-per-view="1" :navigation="true" :pagination="true">
        <swiper-slide v-for="event in events">
            <TimelineEvent :event="event" />
        </swiper-slide>
    </swiper-container>
</template>
<style></style>
