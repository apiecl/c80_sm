<script setup lang="ts">
import { PageContent } from '../types/wptypes';

interface Props {
    page: PageContent;
}

const props = defineProps<Props>()

const bgImg = {
    backgroundImage: `url(${props.page.image})`
}

</script>
<template>
    <div class="intro-sm" :style="bgImg">
        <div class="inner-content">
            <h1 v-if="page">{{ page.title }}</h1>
            <h2 v-if="page.fields.c80sm_subtitulo
            ">{{ page.fields.c80sm_subtitulo[0] }}</h2>
            <div v-html="page.content"></div>
        </div>
    </div>
</template>
<style>
.intro-sm {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-size: cover;
}

.inner-content {
    max-width: 660px;
    text-align: center;
}

h1,
h2 {
    font-family: var(--font-serif);
    margin: 0;
}

h1 {
    font-size: 48px;
}

h2 {
    font-weight: normal;
}
</style>