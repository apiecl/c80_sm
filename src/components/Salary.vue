<script setup lang="ts">
import { ref } from 'vue';
import Modal from './Modal.vue';
import { formatCurrency } from '../utils/formatCurrency';
import Billetes from './Billetes.vue';

interface Props {
    salary: number,
    sources: string | string[],
    fields: Record<string, any>
    gastosTotal: number
    color: 'blue' | 'white'
}

interface Source {
    label: string,
    url: string
}

const isModalOpen = ref(false);

const props = defineProps<Props>();

const setIsModalOpen = () => {
    isModalOpen.value = !isModalOpen.value;
}

const decodeSource = (source: string | string[]): Source[] => {
    console.log('source:', source);
    if (typeof source === 'string') {
        try {
            return JSON.parse(source) as Source[];
        } catch (error) {
            console.error('Failed to parse source:', error);
            return [];
        }
    } else if (Array.isArray(source)) {
        return source.map((src) => {
            try {
                return JSON.parse(src) as Source;
            } catch (error) {
                console.error('Failed to parse source:', error);
                return { label: src, url: '' };
            }
        });
    }
    return [];
}

const sources = decodeSource(props.sources);

</script>

<template>
    <div v-if="salary" class="salary">
        <div class="salary-header">
            <span>{{ fields['c80sm_headercaption'][0] }}</span>
            <span>{{ formatCurrency(salary - props.gastosTotal) }}</span>
        </div>
        <div class="salary-header">
            <span>Cada ícono representa {{ formatCurrency(1000) }} pesos chilenos.</span>
            <span v-on:click="setIsModalOpen()">Fuentes</span>
        </div>
        <Billetes :color="props.color" :active="props.gastosTotal ? props.gastosTotal : 0" />
    </div>
    <div v-if="isModalOpen">
        <Modal :isOpen="isModalOpen" :setIsModalOpen="setIsModalOpen">
            <ul v-if="sources">
                <li v-for="source in sources" :key="source.label"><a :href="source.url" target="_blank">{{ source.label
                        }}</a></li>
            </ul>
        </Modal>
    </div>
</template>

<style scoped></style>
