<template>
  <v-card class="sort-menu" max-width="400">
    <v-card-title class="card-title">
      <!--Sort Menu-->
      <v-menu
        class="v-menu"
        v-model="menu"
        :close-on-content-click="false"
        offset-y
        activator="parent"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-icon v-bind="attrs" v-on="on">mdi-sort</v-icon>
        </template>
        <v-list class="white-text">
          <v-list-item
            v-for="option in sortOptions"
            :key="option.value"
            @click="selectSorter(option.value)"
            class="white-text"
          >
            <v-list-item-title class="white-text">{{ option.label }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      {{ sortOptions.find((option) => option.value === sorter).label }}
    </v-card-title>

    <!-- Priority Filter -->
  </v-card>
  <v-card-title class="card-title">
      <v-checkbox
        v-model="priorityFilter"
        label="Show only high priority"
        @change="updatePriorityFilter"
      ></v-checkbox>
    </v-card-title>
</template>

<script>
import store from '../store';

export default {
  data() {
    return {
      //sets the default state of the menu to false
      //sets the default sorter to idDescending
      //defines the sort options
      //sets the default state of the priority filter to false
      menu: false,
      sorter: "idDescending",
      sortOptions: [
        { label: "ID Descending", value: "idDescending" },
        { label: "ID Ascending", value: "idAscending" },
        { label: "Title Alphabetically", value: "titleAlphabetically" },
      ],
      priorityFilter: false,
    };
  },
  mounted() {
    //updates the sorters when the component is mounted
    this.updateSorters();
  },
  methods: {
    selectSorter(sortOption) {
      this.sorter = sortOption;
      this.updateSorters();
      this.menu = false;
    },
    //updates the sorters in the store based on the selected sorter (onMount and when the sorter is changed)
    updateSorters() {
      const sortFunctions = [];
      if (this.sorter === "idDescending") {
        sortFunctions.push((a, b) => b.id - a.id);
      } else if (this.sorter === "idAscending") {
        sortFunctions.push((a, b) => a.id - b.id);
      } else if (this.sorter === "titleAlphabetically") {
        sortFunctions.push((a, b) => a.title.localeCompare(b.title));
      }
      this.$store.dispatch("setSorters", sortFunctions);
    },
    updatePriorityFilter() {
      this.$store.dispatch("setFilterPriorityHigh", this.priorityFilter);
    },
  },
};
</script>

<style scoped>
.sort-menu {
  margin-bottom: 20px;
  margin-right: 20px;
  margin-left: 20px;
  border-color: white;
  background-color: #2c2c2c;
  border-width: 1px;
}
.white-text {
  background-color: #2c2c2c;
  color: white;
}
.card-title {
  
  color: white;
}
.v-menu {
  color: #2c2c2c;
}
</style>
