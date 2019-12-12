<template>
  <div>
    <header>
      <h1>Bagel Wednesday</h1>
      <p>Today's bagels by</p>

      <img
        v-for="currentPerson in currentPeople"
        class="currentPersonImage"
        :key="currentPerson.name"
        :src="currentPerson.image"
      />
    </header>

    <div class="sections">
      <section class="thankYou">
        <OtherPeople heading="WELCOME" :people="newPeople" />
        <OtherPeople heading="Thank you!" :people="donePeople" />
      </section>

      <section class="bagelChooser">
        <BagelChooser :people="notDonePeople" />
      </section>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator"
  import { Getter } from "vuex-class"

  import BagelChooser from "../components/BagelChooser.vue"
  import OtherPeople from "../components/OtherPeople.vue"
  import { Person } from "../store"

  @Component({
    components: {
      BagelChooser,
      OtherPeople
    }
  })
  export default class extends Vue {
    @Getter currentPeople: Person[]
    @Getter donePeople: Person[]
    @Getter notDonePeople: Person[]
    @Getter newPeople: Person[]
  }
</script>

<style scoped>
  header {
    margin-bottom: 30px;
    text-align: center;
  }

  h1 { font-size: 40px; }
  img { border-radius: 50%; }
  .sections { display: flex; }
  section { text-align: center; }
  .thankYou { flex: 1 }
  .bagelChooser { flex: 3 }

  .currentPersonImage {
    height: 150px;
    width: 150px;
    margin-right: 20px;
  }
  .currentPersonImage:last-child { margin-right: 0; }
</style>
