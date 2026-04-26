<template>
  <div class="lamp h-full">
      <div class="lava">
        <Blob v-for="n in randint(0,10)" :diameter="randint(50,400)" :h_position="randint(10,90)" :v_position="randint(10,90)" :translation="randint(300,800)"/>
        <div class="blob top"></div>
        <div class="blob bottom"></div>
        <RouterView />
      </div>
  </div>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    <defs>
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
        <feBlend in="SourceGraphic" in2="goo" />
      </filter>
    </defs>
  </svg>
</template>

<script>
import Blob from './Blob.vue';

export default {
  components: {
    Blob,
  },
  methods: {
      randint(min, max) {
          return Math.floor(Math.random()*(max-min) + min)
      }
  }
};
</script>