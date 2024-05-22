<template>
  <v-container fluid class="py-4 custom-padding">
    <v-row class="mb-4" align="start" justify="space-between">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="searchVal"
          clearable
          label="Search"
          variant="outlined"
          class="search-input"
          @click:clear="clearSearch"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <FilterAndSorter />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <TaskList taskType="archivedTasks" v-if="searchVal === ''" />
        <SearchList v-if="searchVal !== ''" :searchVal="searchVal" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import 'vue-search-input/dist/styles.css';
import SearchList from '../components/SearchList.vue';
import TaskList from '../components/TaskList.vue';
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import FilterAndSorter from '../components/FilterAndSorter.vue';

const searchVal = ref('');
const store = useStore();

const clearSearch = () => {
  searchVal.value = '';
};

const activateCompletedFilter = () => {
  // Set the filter to show archived (completed) tasks
  store.dispatch('setFilterActive', false);
};

onMounted(() => {
  activateCompletedFilter();
});
</script>

<style scoped>
.search-input {
  color: white;
}
.custom-padding {
  padding-left: 0;
  padding-right: 0;
}
@media (min-width: 992px) {
  .custom-padding {
    padding-left: 100px;
    padding-right: 100px;
  }
}
</style>
