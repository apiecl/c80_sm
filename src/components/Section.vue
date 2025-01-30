<script setup lang="ts">
import { PageContent } from '../types/wptypes';

interface Props {
    page: PageContent;
}

defineProps<Props>()

</script>
<template>
    <div class="content-wrapper" :id="`section-${page.slug}`">
        <div class="content">
            <h2>{{ page.order }}. {{ page.title }}</h2>
            <div v-html="page.content"></div>
        </div>
        <slot />
    </div>
</template>
<style>
#que-es-y-como-funciona {
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: space-between;

    .content {
        width: 700px;
    }
}

#quienes-lo-reciben {
    display: flex;
}

.content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px 0;
    display: flex;

    &.columns {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 24px;
        align-items: center;
    }
}
</style>