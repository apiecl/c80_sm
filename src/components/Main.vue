<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { TLEvent, PageContent } from '../types/wptypes';
import Intro from './Intro.vue';
import Section from './Section.vue';
import Timeline from './Timeline.vue';
import Salary from './Salary.vue';
import GraficoQuienes from './GraficoQuienes.vue';
import { register } from 'swiper/element/bundle';
import BigText from './BigText.vue';
import Gastos from './Gastos.vue';
import People from './People.vue';

register();


interface Props {
  events: TLEvent[];
  pages: PageContent[];
}

const content = defineProps<Props>()
const eventsData = ref(content.events);
const pagesData = ref<PageContent[]>(content.pages);
const gastosTotal = ref(0);
const mainSwiperRef = ref<{ swiper: any } | null>(null);
const mainIndex = ref(0);

const defaultPageContent: PageContent = {
  title: '',
  content: '',
  slug: '',
  image: '',
  image_full: '',
  order: 0,
  fields: {}
};

const handleTotal = (total: number) => {
  console.log('Total:', total);
  gastosTotal.value = total;
};

const handleNext = () => {
  if (mainSwiperRef.value) {
    const swiperRef = mainSwiperRef.value.swiper;
    swiperRef.slideNext();
  }
};

const goToSlide = (slide: number) => {
  if (mainSwiperRef.value) {
    const swiperRef = mainSwiperRef.value.swiper;
    swiperRef.slideTo(slide);
  }
}

const pagination = {
  clickable: true,
  el: '.menu-elements',
  renderBullet: (index: any, className: string) => handlePage(index, className)
}

const handleSlideChange = () => {
  if (mainSwiperRef.value) {
    const swiperInstance = mainSwiperRef.value.swiper;
    mainIndex.value = swiperInstance.activeIndex;
  }
};

onMounted(() => {
  if (mainSwiperRef.value) {
    const swiperInstance = mainSwiperRef.value.swiper;
    if (swiperInstance) {
      swiperInstance.on('slideChange', handleSlideChange);
      handleSlideChange(); // Initial check
    }

  }
});


const pages = [1, 3, 6, 8, 11];
const pagesIndexData = [1, 2, 3, 4, 5]

const getIndexPageData = (index: number) => {
  return pagesData.value[pagesIndexData[pages.indexOf(index)]];
}

const handlePage = (index: number, className: string) => {
  if (pages.includes(index)) {
    return `<li class="${className}"><i>${getIndexPageData(index)?.title.slice(0, 16)}...</i><span></span></li>`;
  } else {
    return `<li class="${className} hidden"><i>${index}</i><span></span></li>`;
  }
}

const getPeriodDates = (slug: string) => {
  return pagesData.value.find((page) => page.slug === slug)?.fields['c80sm_years'][0]
}



</script>

<template>
  <div v-if="pagesData.length > 1">
    <div>
      <nav class="menu">
        <ul class="menu-elements"></ul>
      </nav>
      <div class="main" :id="pagesData[0].slug">
        <swiper-container ref="mainSwiperRef" class="main" :slides-per-view="1" :direction="'vertical'"
          :pagination="pagination" :mousewheel="true">
          <swiper-slide>
            <section class="big-slide intro">
              <Intro :page="pagesData[0]" />
              <div class="next-wrapper" @click="handleNext">
                <span>Comenzar</span>
              </div>
            </section>
          </swiper-slide>
          <swiper-slide>
            <section class="big-slide blue-85">
              <Section :page="pagesData[1]" :id="pagesData[1].slug">
                <Salary :color="'white'" :gastosTotal="Number(pagesData[0].fields['c80sm_sueldominimo'])"
                  :fields="pagesData[1].fields" :salary="Number(pagesData[0].fields['c80sm_sueldominimo'])"
                  :sources="pagesData[1].fields['c80sm_fuente']" />
              </Section>
            </section>
          </swiper-slide>
          <swiper-slide>
            <BigText v-if="pagesData[1].fields['c80sm_bigtext']" :text="pagesData[1].fields['c80sm_bigtext'][0]"
              :showNext="true" :color="'azul'" @next="handleNext" />
          </swiper-slide>
          <swiper-slide>
            <BigText v-if="pagesData[2].fields['c80sm_bigtext']" :text="pagesData[2].fields['c80sm_bigtext'][0]"
              :showNext="true" :color="'verde'" @next="handleNext" />
          </swiper-slide>
          <swiper-slide>
            <section class="big-slide green-85">
              <Section :page="pagesData[2]" :id="pagesData[2].slug" />
              <GraficoQuienes :page="pagesData[2]" />

            </section>
          </swiper-slide>
          <swiper-slide>
            <section class="big-slide white">
              <People :pageData="pagesData[2]" />
            </section>
          </swiper-slide>
          <swiper-slide>
            <BigText v-if="pagesData[3].fields['c80sm_bigtext']" :text="pagesData[3].fields['c80sm_bigtext'][0]"
              :showNext="true" :color="'verde'" @next="handleNext" />
          </swiper-slide>
          <swiper-slide>
            <section class="big-slide white">
              <div class="content-wrapper columns">
                <div>
                  <Section :page="pagesData[3]" :id="pagesData[3].slug" />
                  <Gastos @gastosTotal="handleTotal" />
                </div>

                <Salary :color="'blue'" :gastosTotal="gastosTotal" :fields="pagesData[1].fields"
                  :salary="Number(pagesData[0].fields['c80sm_sueldominimo'])"
                  :sources="pagesData[1].fields['c80sm_fuente']" />
              </div>
            </section>
          </swiper-slide>
          <swiper-slide>
            <BigText v-if="pagesData[4].fields['c80sm_bigtext']" :text="pagesData[4].fields['c80sm_bigtext'][0]"
              :showNext="true" :color="'azul'" @next="handleNext" />
          </swiper-slide>
          <swiper-slide>
            <section class="big-slide white">
              <div class="content-wrapper columns">
                <div>
                  <Section :page="pagesData[4]" :id="pagesData[4].slug" />
                </div>
                <div>
                  <swiper-container class="houses" :slides-per-view="'auto'" :free-mode="true" :scrollbar="true"
                    :mousewheel="true" :direction="'horizontal'">
                    <swiper-slide>
                      <div>
                        <img src="../assets/casas_hi.png" alt="Casas">
                      </div>
                    </swiper-slide>
                  </swiper-container>
                </div>
              </div>
            </section>
          </swiper-slide>
          <swiper-slide>
            <BigText v-if="pagesData[4].fields['c80sm_bigtext']" :text="pagesData[4].fields['c80sm_bigtext'][1]"
              :showNext="true" :color="'verde'" @next="handleNext" />
          </swiper-slide>
          <swiper-slide>
            <section class="big-slide purple">
              <div class="content-wrapper columns">
                <Section :page="pagesData[5]" :id="pagesData[5].slug" />
              </div>
            </section>
          </swiper-slide>
          <swiper-slide>
            <section class="big-slide" id="lt-primer-periodo">
              <Timeline key="primer-periodo"
                :intro="pagesData.find((page) => page.slug === 'primer-periodo') || defaultPageContent"
                :events="eventsData.filter((event) => event.evclass === 'primer-periodo')" />
            </section>
          </swiper-slide>
          <swiper-slide>
            <section class="big-slide" id="lt-segundo-periodo">
              <Timeline key="segundo-periodo"
                :intro="pagesData.find((page) => page.slug === 'segundo-periodo') || defaultPageContent"
                :events="eventsData.filter((event) => event.evclass === 'segundo-periodo')" />
            </section>
          </swiper-slide>
          <swiper-slide>
            <section class="big-slide" id="lt-sueldo-minimo">
              <Timeline key="tercer-periodo"
                :intro="pagesData.find((page) => page.slug === 'sueldo-minimo-en-democracia') || defaultPageContent"
                :events="eventsData.filter((event) => event.evclass === 'sueldo-minimo')" />
            </section>
          </swiper-slide>
          <swiper-slide>
            <section class="big-slide" id="lt-proyecciones">
              <Timeline key="cuarto-periodo"
                :intro="pagesData.find((page) => page.slug === 'proyecciones-del-sueldo-minimo') || defaultPageContent"
                :events="eventsData.filter((event) => event.evclass === 'proyecciones')" />
            </section>
          </swiper-slide>
          <swiper-slide>
            <footer>
              <div class="footer-container">
                <div>
                  <img src="../assets/c80logo.svg" alt="C80">
                </div>
                <div>
                  <h2>Agradecimientos</h2>
                  <p>Agradecemos Karina Narbona y Benjamín Sáez por su apoyo en el desarrollo de los contenidos de este
                    sitio.</p>
                  <p>En memoria de Valentina Doniez Sciolla.</p>
                </div>
                <div>
                  <h2>Equipo</h2>
                  <p>
                    <strong>Diseño e investigación</strong>
                    Sergio Ramírez
                    Javiera Infante
                    Florencia Vildósola
                  </p>
                  <p>
                    <strong>Desarrollo y producción </strong>
                    Equipo C80, 2023-2024
                  </p>
                </div>
                <div>
                  <img class="fondart" src="../assets/fondart.png" alt="Fondart">
                </div>
              </div>
            </footer>
          </swiper-slide>
        </swiper-container>
        <div class="timelinepager" v-if="mainIndex >= 12 && mainIndex < 16">
          <div @click="goToSlide(12)" :class="mainIndex === 12 && 'current'">Periodo {{ getPeriodDates('primer-periodo')
            }}</div>
          <div @click="goToSlide(13)" :class="mainIndex === 13 && 'current'">Periodo {{
            getPeriodDates('segundo-periodo')
          }}</div>
          <div @click="goToSlide(14)" :class="mainIndex === 14 && 'current'">Periodo {{
            getPeriodDates('sueldo-minimo-en-democracia')
          }}</div>
          <div @click="goToSlide(15)" :class="mainIndex === 15 && 'current'">Periodo {{
            getPeriodDates('proyecciones-del-sueldo-minimo')
          }}</div>
        </div>
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

footer {
  background-color: #231F20;
  color: white;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 32px;
    gap: 16px;
    padding: 36px 0;

    img.fondart {
      max-width: 200px;
    }
  }
}

section.big-slide.blue {
  background-color: var(--azul);
}

section.big-slide.green {
  background-color: var(--verde);
}

section.big-slide.white {
  background-color: #F4F4F4;
  color: #555;
}

section.big-slide.purple {
  background-color: $morado;
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

section.big-slide {
  &.scrollable {
    overflow-x: scroll;
  }
}

.scrollable-image {
  max-width: 50vw;
  max-height: 90vh;

  cursor: grab;

  &::-webkit-scrollbar {
    display: none;
  }

  img {
    max-height: 600px;

  }
}

.menu {
  position: fixed;
  left: 0;
  top: calc(40vh - 100px);
  background-color: #231F20;
  z-index: 10;
  left: -160px;
  height: auto;
  padding: 12px 0;
  border-radius: 0 15px 15px 0;
  transition: all ease-in-out 0.4s;

  &:hover {
    left: 0;

    span {
      opacity: 0;
    }

    .swiper-pagination-bullet {
      i {
        display: block;
      }
    }
  }

  .menu-elements {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    gap: 6px;
    margin-right: 12px;

    li.swiper-pagination-bullet {
      position: relative;
      height: 24px;
      display: flex;
      gap: 12px;
      align-items: center;
      justify-content: flex-end;
      font-family: var(--font-serif);

      &.hidden {
        display: none;
      }

      span {
        display: block;
        align-items: center;
        justify-content: center;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #fff;
        transition: all ease-in-out 0.4s;
      }

      &-active {
        i {
          border-bottom: 2px solid #2D7ABD;
        }

        span {
          background-color: #2D7ABD;
          width: 12px;
          height: 12px;
          margin-right: -3px;
        }
      }

      i {
        font-style: normal;
        border-bottom: 2px solid transparent;
      }

      &:hover {
        i {
          border-bottom: 2px solid #2D7ABD;
        }

        cursor: pointer;
      }
    }
  }

}

.menu:hover {
  left: 0;

  ul li a:after {
    opacity: 0;
  }
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

swiper-container.main {
  height: 100vh;

  swiper-slide {
    height: 100vh;
  }
}

swiper-container.houses {
  height: 90vh;
  width: 50vw;
  overflow: hidden;
  cursor: grab;

  swiper-slide {
    box-sizing: border-box;
    height: auto;
    -webkit-box-sizing: border-box;
    width: 4821px;

    img {
      max-height: 600px;
    }
  }
}

div.timelinepager {
  position: absolute;
  width: 100%;
  bottom: 0;
  z-index: 10;
  height: 60px;
  background-color: #ccc;
  color: #333;
  text-align: center;
  text-transform: uppercase;
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  >div {
    display: flex;
    align-items: center;
    justify-content: center;
    border-style: solid;
    border-color: white;
    border-width: 0 1px 1px 1px;
    cursor: pointer;
    transition: all ease-in 0.2s;

    &.current,
    &:hover {
      background-color: rgba(35, 31, 32, 0.7);
      color: white;
    }
  }
}
</style>