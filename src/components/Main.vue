<script setup lang="ts">
import { ref } from 'vue';
import { TLEvent, PageContent } from '../types/wptypes';
import Intro from './Intro.vue';
import Section from './Section.vue';
import Timeline from './Timeline.vue';
import { register } from 'swiper/element/bundle';

register();


interface Props {
  events: TLEvent[];
  pages: PageContent[];
}

const content = defineProps<Props>()
const eventsData = ref(content.events);
const pagesData = ref(content.pages);

function onSlideChange() {
  console.log('slide changed');
}

</script>

<template>
  <div v-if="pagesData.length > 1">
    <div>
      <div class="menu">
        <nav>
          <ul>
            <li v-for="page in pagesData">
              <a :href="'#' + page.slug">{{ page.title }}</a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="main" :id="pagesData[0].slug">
        <section class="big-slide intro">
          <Intro :page="pagesData[0]" />
        </section>
        <section class="big-slide">
          <Section :page="pagesData[1]" :id="pagesData[1].slug" />
        </section>
        <section class="big-slide">
          <Section :page="pagesData[2]" :id="pagesData[2].slug" />
        </section>
        <section class="big-slide">
          <Section :page="pagesData[3]" :id="pagesData[3].slug" />
        </section>
        <section class="big-slide">
          <Section :page="pagesData[4]" :id="pagesData[4].slug" />
        </section>
        <section class="big-slide">
          <Section :page="pagesData[5]" :id="pagesData[5].slug" />
        </section>
        <section class="big-slide" id="lt-primer-periodo">
          <Timeline :events="eventsData.filter((event) => event.evclass === 'primer-periodo')" />
        </section>
        <section class="big-slide" id="lt-segundo-periodo">
          <Timeline :events="eventsData.filter((event) => event.evclass === 'segundo-periodo')" />
        </section>
        <section class="big-slide" id="lt-sueldo-minimo">
          <Timeline :events="eventsData.filter((event) => event.evclass === 'sueldo-minimo')" />
        </section>
      </div>
    </div>
  </div>
  <div v-else>
    <div>Cargando ...</div>
  </div>
</template>
<style>
section.big-slide {
  height: 100vh;
  width: 100%;
  position: relative;
}


.menu {
  position: fixed;
  left: 0;
  top: calc(40vh - 100px);
  background-color: #333;
  border-radius: 0 15px 15px 0;
  padding: 0 12px 0 0;
  z-index: 10;
}

.menu ul li {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu ul li a {
  color: #fff;
  text-decoration: none;
}
</style>