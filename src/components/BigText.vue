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
    <div v-if="showNext" class="next-wrapper" @click="$emit('next')">
      <span>Siguiente sección</span>
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
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1.4px;
  transition: all ease-in-out 0.2s;

  span {
    margin-top: 32px;
    transition: all ease-in-out 0.2s;
  }

  &::after {
    display: block;
    content: '';
    background-image: url('data:image/svg+xml,%3Csvg%20width%3D%2236%22%20height%3D%2219%22%20viewBox%3D%220%200%2036%2019%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M33%203L18%2017L3%203%22%20stroke%3D%22white%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22square%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E');
    background-repeat: no-repeat;
    position: absolute;
    bottom: 12px;
    width: 36px;
    height: 32px;
    transition: all ease-in-out 0.2s;
  }

  &:hover {

    background-color: rgba(255, 255, 255, 0.35);

    &::after {
      bottom: 2px;
    }
  }

}
</style>
