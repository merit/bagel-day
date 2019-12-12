import { BagelStatus } from "../enums/bagel-status";

// TODO: split types to separate files
export type Person = {
  name: string,
  status: BagelStatus,
  image: string
}

// TODO: split pieces to separate files
type State = {
  people: Person[]
}

export const state = () => ({
  people: []
})

type Getters = {
  currentPeople: (state: State) => Person[],
  donePeople: (state: State) => Person[],
  notChosenPeople: (state: State) => Person[],
  notDonePeople: (state: State) => Person[],
  newPeople: (state: State) => Person[],
  chosenPeople: (state: State) => Person[],
  areAllPeopleChosen: (state: State, getters: Getters) => boolean,
}

export const NUMBER_OF_BAGLERS_TO_CHOOSE = 2;

export const getters: Getters = {
  currentPeople: (state: State) => state.people.filter(person => person.status === BagelStatus.Current),
  donePeople: (state: State) => state.people.filter(person => person.status === BagelStatus.Done),
  notChosenPeople: (state: State) => state.people.filter(person => person.status === BagelStatus.NotChosen),
  notDonePeople: (state: State) => state.people.filter(person => person.status === BagelStatus.NotDone),
  newPeople: (state: State) => state.people.filter(person => person.status === BagelStatus.New),
  chosenPeople: (state: State) => state.people.filter(person => person.status === BagelStatus.Chosen),
  areAllPeopleChosen: (state: State, getters: Getters) => getters.chosenPeople.length === NUMBER_OF_BAGLERS_TO_CHOOSE,
}

export const mutations = {
  setPeople(state: State, people: Person[]) {
    // Never allow GONE people to appear in any way
    state.people = people.filter(person => person.status !== BagelStatus.Gone);
  },

  setNotChosen(state: State, person: Person) {
    person.status = BagelStatus.NotChosen
  },

  setChosen(state: State, person: Person) {
    person.status = BagelStatus.Chosen
  }
}

export const actions = {
  async nuxtServerInit({ commit }, { app }) {
    const people = await app.$axios.$get(
      "./people.json"
    )
    commit("setPeople", people)
  },

  setNotChosen({ commit }, person: Person) {
    commit("setNotChosen", person)
  },

  setChosen({ commit }, person: Person) {
    commit("setChosen", person)
  }
}
