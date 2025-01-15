<script setup lang="ts">

interface Props {
  text: string,
  showNext: boolean
  color: string,
}

defineProps<Props>()

function getColor(color: string) {
  return 'var(--' + color + ')';
}

</script>

<template>
  <div class="big-text-wrapper" :style="{ backgroundColor: getColor(color) }">
    <div class="big-text" v-html="text">
    </div>
    <div class="next-wrapper">
      <button v-if="showNext" @click="$emit('next')">Siguiente sección</button>
    </div>
  </div>
</template>

<style lang="scss">
.big-text-wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;

  .big-text {
    font-size: 32px;
    max-width: 1200px;
    text-align: center;
    font-family: var(--font-serif);
  }
}

.next-wrapper {
  position: absolute;
  bottom: 0;
  height: 122px;
  background-color: rgba(255, 255, 255, 0.3);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    border: 0;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-size: 18px;
  }
}
</style>
