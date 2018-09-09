<template>
  <main>
    <div class="background" />
    <nuxt/>
  </main>
</template>

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
</style>
