<script setup lang="ts">
import { ref, onMounted, defineProps } from "vue";
import { TLEvent, PageContent } from "../types/wptypes";
import TimelineEvent from "./TimelineEvent.vue";

interface Props {
    events: TLEvent[];
    intro: PageContent;
}

const props = defineProps<Props>();

const navigation = {
    nextEl: `#tlnavigation-${props.intro.slug} .swiper-button-next`,
    prevEl: `#tlnavigation-${props.intro.slug} .swiper-button-prev`
}

const swiperRef = ref<{ swiper: any } | null>(null);
const currentIndex = ref(0);

const handleSlideChange = () => {
    if (swiperRef.value) {
        const swiperInstance = swiperRef.value.swiper;
        currentIndex.value = swiperInstance.activeIndex;
    }
};

onMounted(() => {
    if (swiperRef.value) {
        const swiperInstance = swiperRef.value.swiper;
        if (swiperInstance) {
            swiperInstance.on('slideChange', handleSlideChange);
            handleSlideChange(); // Initial check
        }

    }
});



</script>
<template>
    <swiper-container class="timeline-swiper" :key="`timeline-${props.intro.slug}`" :id="`timeline-${props.intro.slug}`"
        ref="swiperRef" :class="`timeline-${props.intro.slug}`" :slides-per-view="1" :navigation="navigation">
        <swiper-slide v-if="props.intro" class="intro-slide"
            :style="'background-image: url(' + props.intro.image_full + ')'">
            <div class="intro">
                <div class="content">
                    <span>{{ props.intro.fields['c80sm_years'][0] }}</span>
                    <h1>{{ props.intro.title }}<br /> <span>{{ Array.isArray(props.intro.fields['c80sm_subtitulo']) ?
                        props.intro.fields['c80sm_subtitulo'][0] : props.intro.fields['c80sm_subtitulo'] }}</span>
                    </h1>
                    <div v-html="props.intro.content"></div>
                </div>
            </div>
        </swiper-slide>
        <swiper-slide v-for="event in events">
            <TimelineEvent :event="event" />
        </swiper-slide>
    </swiper-container>
    <div :id="`tlnavigation-${props.intro.slug}`" class="tlnavigation">
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next" :class="currentIndex === 0 ? 'first-slide' : ''">
            {{ currentIndex === 0 ? 'Ver hitos' : '' }}
        </div>
    </div>
</template>
<style lang="scss">
swiper-container.timeline-swiper {
    background-color: #f0f0f0;
    color: #231F20;
}

.intro-slide {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    background-repeat: no-repeat;
    background-size: cover;
    color: white;

    .intro {
        max-width: 80vw;
        margin-left: 10vw;
        margin-top: 10vh;
        display: flex;

        .content {
            max-width: 50vw;
        }
    }

    h1 {
        span {
            font-weight: normal;
        }
    }


}

.tlnavigation {

    .swiper-button-prev,
    .swiper-button-next:not(.first-slide) {
        position: absolute;
        cursor: pointer;
        z-index: 10;
        top: 50%;
        background-position: center;
        background-repeat: no-repeat;
        width: 30px;
        height: 30px;
        transition: all ease-in-out 0.2s;

        &:hover {
            opacity: 0.5
        }

    }

    .swiper-button-prev {
        left: 4vw;
        background-image: url('data:image/svg+xml,%3Csvg%20width%3D%2229%22%20height%3D%2229%22%20viewBox%3D%220%200%2029%2029%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%2214.5%22%20cy%3D%2214.5%22%20r%3D%2214.5%22%20fill%3D%22%23231F20%22%2F%3E%3Cpath%20d%3D%22M12%208L18%2014.5L12%2021%22%20stroke%3D%22white%22%20stroke-width%3D%222%22%2F%3E%3C%2Fsvg%3E');
        transform: rotate(180deg);
    }

    .swiper-button-next {
        position: absolute;
        right: 4vw;
        background-image: url('data:image/svg+xml,%3Csvg%20width%3D%2229%22%20height%3D%2229%22%20viewBox%3D%220%200%2029%2029%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%2214.5%22%20cy%3D%2214.5%22%20r%3D%2214.5%22%20fill%3D%22%23231F20%22%2F%3E%3Cpath%20d%3D%22M12%208L18%2014.5L12%2021%22%20stroke%3D%22white%22%20stroke-width%3D%222%22%2F%3E%3C%2Fsvg%3E');

    }

    .swiper-button-disabled:not(.first-slide) {
        opacity: 0;
    }

    .swiper-button-next.first-slide {
        position: absolute;
        cursor: pointer;
        z-index: 10;
        background-image: url('data:image/svg+xml,%3Csvg%20width%3D%2253%22%20height%3D%2281%22%20viewBox%3D%220%200%2053%2081%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%205L48%2040.5L5%2076%22%20stroke%3D%22white%22%20stroke-width%3D%2210%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E');
        background-repeat: no-repeat;
        background-position: 50% 40%;
        height: 100%;
        top: 0;
        right: 0;
        width: 200px;
        background-color: rgba(255, 255, 255, 0.3);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        text-transform: uppercase;
    }

}
</style>
