<script setup lang="ts">
import { ref } from 'vue'

interface Props {
    isOpen: boolean
    setIsModalOpen: () => void
}

defineProps<Props>()

</script>

<template>
    <div class="modal">
        <div class="modal-content">
            <span v-on:click="setIsModalOpen()">Cerrar</span>
            <slot />
        </div>
    </div>
</template>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    width: 100%;
    color: #555;
}

.modal-content span {
    cursor: pointer;
    color: blue;
    text-decoration: underline;
}

.modal-content ul {
    list-style-type: none;
    padding: 0;
}

.modal-content li {
    margin-bottom: 10px;
}
</style>
