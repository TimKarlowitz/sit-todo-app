<template>
  <div>
    <h2>Filter Options</h2>
    <label>
      <input type="checkbox" v-model="filters.completed" @change="updateFilters" />
      Show Completed
    </label>
    <label>
      <input type="checkbox" v-model="filters.notCompleted" @change="updateFilters" />
      Show Not Completed
    </label>
    <h2>Sort Options</h2>
    <label>
      <input type="radio" name="sort" value="idDescending" v-model="sorter" @change="updateSorters" />
      ID Descending
    </label>
    <label>
      <input type="radio" name="sort" value="idAscending" v-model="sorter" @change="updateSorters" />
      ID Ascending
    </label>
    <label>
      <input type="radio" name="sort" value="titleAlphabetically" v-model="sorter" @change="updateSorters" />
      Title Alphabetically
    </label>
  </div>
</template>

<script>
export default {
  data() {
    
    return {
      filters: {
        completed: false,
        notCompleted: false,
      },
      sorter: "idDescending",
    };
  },
  mounted() {
  this.updateFilters();
  this.updateSorters();
},
  methods: {
    updateFilters() {
      const filterFunctions = [];
      if (this.filters.completed) {
        filterFunctions.push((task) => task.completed);
      }
      if (this.filters.notCompleted) {
        filterFunctions.push((task) => !task.completed);
      }
      this.$store.dispatch("setFilters", filterFunctions);
      console.log("filterFunctions set to:", filterFunctions);
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
  console.log("sortFunctions set to:", sortFunctions);
  this.$store.dispatch("setSorters", sortFunctions);
},
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
