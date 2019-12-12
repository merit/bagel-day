<template>
  <div v-if="people.length">
    <h2>{{ heading }}</h2>
    <ul>
      <li v-for="person in people" :key="person.name">
        <img :src="person.image" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "nuxt-property-decorator"
  import { Person } from "../store"

  @Component({})
  export default class OtherPeople extends Vue {
    @Prop() heading: string
    @Prop() people: Person[]
  }
</script>

<style scoped>
  h2 { margin: 0 0 10px; }
  ul { padding: 0; }

  li {
    list-style: none;
    margin-right: 10px;
    width: 90px;
    display: inline-block;
  }

  img {
    border-radius: 50%;
    margin-bottom: 10px;
    max-width: 100%;
  }
</style>

