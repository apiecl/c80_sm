<script setup lang="ts">
import { ref } from 'vue';
import { TLEvent, PageContent } from '../types/wptypes';
import Intro from './Intro.vue';
import Section from './Section.vue';
import Timeline from './Timeline.vue';
import Salary from './Salary.vue';
import GraficoQuienes from './GraficoQuienes.vue';
import { register } from 'swiper/element/bundle';
import BigText from './BigText.vue';
import Gastos from './Gastos.vue';

register();


interface Props {
  events: TLEvent[];
  pages: PageContent[];
}

const content = defineProps<Props>()
const eventsData = ref(content.events);
const pagesData = ref(content.pages);

const defaultPageContent: PageContent = {
  title: '',
  content: '',
  slug: '',
  image: '',
  order: 0,
  fields: {}
};

</script>

<template>
  <div v-if="pagesData.length > 1">
    <div>
      <div class="menu">
        <nav>
          <ul>
            <li v-for="page in pagesData.filter((page) => !page.fields['c80sm_years'])">
              <a :href="'#' + page.slug">{{ page.title }}</a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="main" :id="pagesData[0].slug">
        <section class="big-slide intro">
          <Intro :page="pagesData[0]" />
        </section>
        <section class="big-slide blue-85">
          <Section :page="pagesData[1]" :id="pagesData[1].slug">
            <Salary :fields="pagesData[1].fields" :salary="Number(pagesData[0].fields['c80sm_sueldominimo'])"
              :sources="pagesData[1].fields['c80sm_fuente']" />
          </Section>
        </section>
        <BigText v-if="pagesData[1].fields['c80sm_bigtext']" :text="pagesData[1].fields['c80sm_bigtext'][0]"
          :showNext="true" :color="'azul'" />
        <BigText v-if="pagesData[2].fields['c80sm_bigtext']" :text="pagesData[2].fields['c80sm_bigtext'][0]"
          :showNext="true" :color="'verde'" />
        <section class="big-slide green-85">
          <Section :page="pagesData[2]" :id="pagesData[2].slug" />
          <GraficoQuienes :page="pagesData[2]" />
        </section>
        <BigText v-if="pagesData[3].fields['c80sm_bigtext']" :text="pagesData[3].fields['c80sm_bigtext'][0]"
          :showNext="true" :color="'verde'" />
        <section class="big-slide">
          <Section :page="pagesData[3]" :id="pagesData[3].slug" />
          <Gastos />
        </section>

        <section class="big-slide">
          <Section :page="pagesData[4]" :id="pagesData[4].slug" />
        </section>
        <section class="big-slide">
          <Section :page="pagesData[5]" :id="pagesData[5].slug" />
        </section>
        <section class="big-slide" id="lt-primer-periodo">
          <Timeline :intro="pagesData.find((page) => page.slug === 'primer-periodo') || defaultPageContent"
            :events="eventsData.filter((event) => event.evclass === 'primer-periodo')" />
        </section>
        <section class="big-slide" id="lt-segundo-periodo">
          <Timeline :intro="pagesData.find((page) => page.slug === 'segundo-periodo') || defaultPageContent"
            :events="eventsData.filter((event) => event.evclass === 'segundo-periodo')" />
        </section>
        <section class="big-slide" id="lt-sueldo-minimo">
          <Timeline :intro="pagesData.find((page) => page.slug === 'sueldo-minimo-en-democracia') || defaultPageContent"
            :events="eventsData.filter((event) => event.evclass === 'sueldo-minimo')" />
        </section>
        <section class="big-slide" id="lt-proyecciones">
          <Timeline
            :intro="pagesData.find((page) => page.slug === 'proyecciones-del-sueldo-minimo') || defaultPageContent"
            :events="eventsData.filter((event) => event.evclass === 'proyecciones')" />
        </section>
      </div>
    </div>
  </div>
  <div v-else>
    <div>Cargando ...</div>
  </div>
</template>
<style lang="scss">
$verde: #00857C;
$azul: #2D7ABD;
$morado: #804180;

.main {
  font-family: var(--font-sans);
}

section.big-slide {
  height: 100vh;
  width: 100%;
  position: relative;

  &.flex {
    display: flex;
  }
}

section.big-slide.blue {
  background-color: var(--azul);
}

section.big-slide.green {
  background-color: var(--verde);
}

section.big-slide {
  background-color: #555;
}

section.big-slide.blue-85 {
  background-color: transparentize($azul, 0.15);
}

section.big-slide.green-85 {
  background-color: transparentize($verde, 0.15);
}


.menu {
  position: fixed;
  left: -100px;
  left: 0;
  width: 134px;
  top: calc(40vh - 100px);
  background-color: #333;
  border-radius: 0 15px 15px 0;
  padding: 12px 12px 12px 0;
  z-index: 10;
  transition: all ease-in-out 0.2s;
  overflow: hidden;
  ;
}

.menu:hover {
  left: 0;
}

.menu ul {
  margin: 0;
  padding: 0;
}

.menu ul li {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu ul li a {
  color: #fff;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  white-space: nowrap;
  padding: 6px 16px;
}
</style>