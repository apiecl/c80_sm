<script setup lang="ts">
import { TLEvent } from '../types/wptypes';

interface Props {
    event: TLEvent;
}

const props = defineProps<Props>()

console.log(props.event);

</script>
<template>
    <div class="timeline-event" v-if="event">
        <img v-if="event.media" :src="event.media.url" :alt="event.media.caption" />
        <div class="timeline-event-content">
            <span class="date">{{ event.start_date.year }} {{ event?.end_date?.year && `- ${event.end_date?.year}`
                }}</span>
            <h1>{{ event.text.headline }}</h1>

            <div v-html="event.text.text"></div>
        </div>
    </div>
</template>
<style lang="scss">
.timeline-event {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    gap: 16px;
    padding: 16px;
    border: 1px solid var(--color-primary);
    border-radius: 8px;
    margin: 16px 0;

    .timeline-event-content {
        margin-left: 10vw;
        text-align: left;
        max-width: 60vw;
    }
}
</style>