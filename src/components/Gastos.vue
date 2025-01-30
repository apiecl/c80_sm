<script setup lang="ts">
import { computed, ref, defineEmits, watch } from 'vue'
import { formatCurrency } from '../utils/formatCurrency';



const emit = defineEmits(['gastosTotal']);

const arriendo = ref(300000);
const gastosServicios = ref(100000);
const transporte = ref(45000);
const alimentacion = ref(40000);
const salud = ref(35000);
const leyessociales = ref(500000 * 0.1874)


const calcTotal = computed(() => {
    const gastos = [arriendo.value, gastosServicios.value, transporte.value, alimentacion.value, salud.value]
    const total = gastos.reduce((prev, curr) => {
        if (typeof curr === 'number' && typeof prev === 'number') {
            return prev + curr
        } else {
            if (typeof curr === 'number') {
                return prev;
            } else {
                return curr;
            }
        }
    });
    emit('gastosTotal', total);
    return total;
});

watch([arriendo, gastosServicios, transporte, alimentacion, salud], () => {
    emit('gastosTotal', calcTotal.value);
});

</script>

<template>

    <h3>Considera estos gastos básicos</h3>

    <form>
        <div>
            <label>Leyes sociales</label>
            <input step="5000" min="0" max="1000000" type="number" placeholder="Leyes sociales" disabled
                v-model="leyessociales" v-mask="'##.##'" />

        </div>
        <div>
            <label>Arriendo</label>
            <input step="5000" min="0" type="number" placeholder="Arriendo" v-model="arriendo" />
        </div>
        <div>
            <label>Gastos y Servicios</label>
            <input step="5000" min="0" max="1000000" type="number" placeholder="Gastos y Servicios"
                v-model="gastosServicios" />
        </div>
        <div>
            <label>Transporte</label>
            <input step="5000" min="0" max="1000000" type="number" placeholder="Transporte" v-model="transporte" />
        </div>
        <div>
            <label>Alimentación</label>
            <input step="5000" min="0" max="1000000" type="number" placeholder="Alimentación" v-model="alimentacion" />
        </div>
        <div>
            <label>Salud</label>
            <input step="5000" min="0" max="1000000" type="number" placeholder="Salud" v-model="salud" />
        </div>
    </form>

    <div>Gasto total: {{ formatCurrency(calcTotal) }}</div>
</template>

<style scoped>
form {
    >div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 32px;
        margin: 12px 0;
    }

    input {
        display: block;
    }
}
</style>
