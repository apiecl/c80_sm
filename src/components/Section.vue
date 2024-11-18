<script setup lang="ts">
import { PageContent } from '../types/wptypes';

interface Props {
    page: PageContent;
}

defineProps<Props>()

</script>
<template>
    <div id="section-sm">
        <h2>{{ page.order }}. {{ page.title }}</h2>
        <div v-html="page.content"></div>
    </div>
</template>
<style></style>