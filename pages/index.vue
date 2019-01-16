<template>
  <div>
    <header>
      <h1>Bagel Wednesday</h1>
      <p>Today's bagels by</p>
      <img class="currentPersonImage" :src="currentPerson.image" />
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
    @Getter currentPerson: Person
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
    height: 200px;
    width: 200px;
  }
</style>
