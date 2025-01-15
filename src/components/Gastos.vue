<script setup lang="ts">
import { computed, ref } from 'vue'



const arriendo = ref(300000);
const gastosServicios = ref(100000);
const transporte = ref(45000);
const alimentacion = ref(40000);
const salud = ref(35000);



const calcTotal = computed(() => {
    const gastos = [arriendo.value, gastosServicios.value, transporte.value, alimentacion.value, salud.value]
    return gastos.reduce((prev, curr) => {
        if(typeof curr === 'number' && typeof prev === 'number') {
            return prev + curr
        } else {
            if(typeof curr === 'number') {
                return prev;
            } else {
                return curr;
            }
        }
    });
})

</script>

<template>

<h1>{{ calcTotal }}</h1>

<form>
  <input min="0" max="1000000" type="number" placeholder="Arriendo" v-model="arriendo" />
  <input min="0" max="1000000" type="number" placeholder="Gastos y Servicios" v-model="gastosServicios" />
  <input min="0" max="1000000" type="number" placeholder="Transporte" v-model="transporte" />
  <input min="0" max="1000000" type="number" placeholder="Alimentación" v-model="alimentacion" />
  <input min="0" max="1000000" type="number" placeholder="Salud" v-model="salud" />
</form>

</template>

<style scoped>
    form {
        input {
            display: block;
        }
    }
</style>
