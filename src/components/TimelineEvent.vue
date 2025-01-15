<script setup lang="ts">
import { TLEvent } from '../types/wptypes';

interface Props {
    event: TLEvent;
}

defineProps<Props>()

</script>
<template>
    <div class="timeline-event" v-if="event">
        <h1>{{ event.text.headline }}</h1>
        <img v-if="event.media" :src="event.media.url" :alt="event.media.caption" />
        <div v-html="event.text.text"></div>
    </div>
</template>
<style></style>