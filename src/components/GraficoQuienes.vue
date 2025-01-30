<script setup lang="ts">
import { PageContent } from '../types/wptypes';

interface Props {
    page: PageContent;
}

const props = defineProps<Props>()

</script>
<template>
    <div class="quienes-graph">
        <h3 v-html="props.page.fields['c80sm_grafico_quienes_titulo']"></h3>
        <img src="../assets/people.svg" alt="">
        <div class="footer">
            <p v-html="props.page.fields['c80sm_grafico_quienes_subtitulo_izquierda']"></p>
            <p v-html="props.page.fields['c80sm_grafico_quienes_subtitulo_derecha']"></p>
        </div>
    </div>
</template>
<style lang="scss">
.quienes-graph {
    display: flex;
    flex-direction: column;
    width: 80%;
    align-items: center;
    text-align: left;
}
</style>