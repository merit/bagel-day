<template>
  <div>
    <h2>Who is the next Bagler??</h2>
    <p>Click the bagel to find out :)</p>

    <div>
      <img class="bagel" @click="startChoosing" src="/bagel-sesame.png">
    </div>

    <ul>
      <li v-for="person in randomPeople" :key="person.name">
        <img class="mugShot" :src="person.image" :class="{ chosen: person.status === 'CHOSEN' }">
      </li>
    </ul>

    <OtherPeople heading="Not this week..." :people="notChosenPeople" />
  </div>
</template>

<script lang="ts">
  import shuffle from "lodash.shuffle"
  import { Component, Prop, Vue } from "nuxt-property-decorator"
  import { Getter } from "vuex-class"
  import { Person } from "../store"
  import OtherPeople from "../components/OtherPeople.vue"

  @Component({
    components: {
      OtherPeople,
    }
  })
  export default class BagelChooser extends Vue {
    @Prop() people: Person[]
    choosing: boolean = false
    currentPeople: Person[] = []
    randomPeople: Person[] = []
    randomizeTimeout: number
    removePersonTimeout: number
    removePersonInterval: number

    @Getter notChosenPeople: Person[]

    constructor() {
      super();

      this.currentPeople = [...this.people];

      // Always remove all the people over a set waiting period
      this.removePersonInterval = 10000 / this.currentPeople.length;
    }

    // Lifecycle hooks
    beforeDestory() {
      window.clearTimeout(this.randomizeTimeout);
      window.clearInterval(this.removePersonTimeout);
    }

    populateRandomPeople() {
      const possibleIndices = Array
        .from({ length: this.currentPeople.length })
        .map((e, i) => i)

      this.randomPeople = shuffle(possibleIndices)
        .slice(0, 5)
        .map(i => this.currentPeople[i])

      if (this.randomPeople.length > 1) {
        // Come back again soon!
        const randomTimeout = Math.random() * (200 - 30) + 30;
        this.randomizeTimeout = window.setTimeout(this.populateRandomPeople, randomTimeout)
      }
    }

    removeRandomPerson() {
      const possibleIndices = Array
        .from({ length: this.currentPeople.length })
        .map((e, i) => i)

      const index = shuffle(possibleIndices)[0];
      const notChosenPerson = this.currentPeople.splice(index, 1);
      this.$store.dispatch("setNotChosen", notChosenPerson[0]);

      if (this.currentPeople.length === 1) {
        // The chosen one!
        this.$store.dispatch("setChosen", this.currentPeople[0]);
      } else {
        // Remove the next person
        this.removePersonTimeout = window.setTimeout(this.removeRandomPerson, this.removePersonInterval);
      }
    }

    startChoosing() {
      if (!this.choosing) {
        this.choosing = true;
        this.populateRandomPeople();
        this.removeRandomPerson();
      }
    }
  }
</script>

<style scoped>
  .bagel { width: 200px; }

  ul {
    align-items: center;
    display: flex;
    justify-content: center;
    padding: 0;
  }

  li {
    list-style: none;
    margin-left: 10px;
  }

  .mugShot {
    border-radius: 50%;
    height: 160px;
    width: 160px;
  }

  .mugShot.chosen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    transition: all 3s ease-in-out;
    transform: rotateX(360deg) rotateZ(360deg);
  }
</style>

