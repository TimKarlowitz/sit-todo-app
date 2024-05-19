<template>
  <v-card class="mx-auto my-4" max-width="400">
    <v-card-title>
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        offset-y
        activator="parent"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-icon v-bind="attrs" v-on="on">mdi-sort</v-icon>
        </template>
        <v-list>
          <v-list-item
            v-for="option in sortOptions"
            :key="option.value"
            @click="selectSorter(option.value)"
          >
            <v-list-item-title>{{ option.label }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      {{ sortOptions.find((option) => option.value === sorter).label}}
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      menu: false,
      sorter: "idDescending",
      sortOptions: [
        { label: "ID Descending", value: "idDescending" },
        { label: "ID Ascending", value: "idAscending" },
        { label: "Title Alphabetically", value: "titleAlphabetically" },
      ],
    };
  },
  mounted() {
    this.updateSorters();
  },
  methods: {
    selectSorter(sortOption) {
      this.sorter = sortOption;
      this.updateSorters();
      this.menu = false;
    },
    updateSorters() {
      const sortFunctions = [];
      if (this.sorter === "idDescending") {
        sortFunctions.push((a, b) => b.id - a.id);
      } else if (this.sorter === "idAscending") {
        sortFunctions.push((a, b) => a.id - b.id);
      } else if (this.sorter === "titleAlphabetically") {
        sortFunctions.push((a, b) => a.title.localeCompare(b.title));
      }
      console.log("The sort functions are", sortFunctions);
      this.$store.dispatch("setSorters", sortFunctions);
    },
  },
};
</script>