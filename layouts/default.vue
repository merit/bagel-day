<template>
  <main>
    <div :class="{ background: true, confetti: areAllPeopleChosen }" />
    <nuxt/>
  </main>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator"
  import { Getter } from "vuex-class"

  @Component
  export default class extends Vue {
    @Getter areAllPeopleChosen: boolean;
  }
</script>

<style>
  body {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  .background {
    background: url("/background.jpg");
    background-size: cover;
    opacity: 0.1;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -999;
  }

  main {
    margin: 0 auto;
    max-width: 1200px;
  }

  .confetti {
    background: url('/confetti.gif');
    opacity: 0.5;
  }
</style>
