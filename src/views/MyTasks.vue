<template>
  <v-container class="py-4">
    <v-card-title>
            <v-icon class="mr-2">mdi-format-list-checks</v-icon>
            My Active Tasks
          </v-card-title>
    <v-row>
      <v-col>
        <v-card class="mx-auto my-4" max-width="600">
          <v-card-title>
            <v-icon class="mr-2">mdi-plus</v-icon>
            Add a New Task
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="newTaskTitle"
              label="Enter new task title"
              outlined
              clearable
              class="mb-4"
            ></v-text-field>
            <v-btn @click="addTask" color="primary">Add Task</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card class="mx-auto my-4" max-width="600">
          <v-card-title>
            <v-icon class="mr-2">mdi-progress-check</v-icon>
            Your Active Tasks
          </v-card-title>
          <v-card-subtitle>You currently have {{ taskCount }} active tasks</v-card-subtitle>
          <v-card-text>
            <v-text-field
              v-model="searchVal"
              label="Search for a Task"
              outlined
              clearable
              class="mb-4"
              type="search"
              @click:clear="clearSearch"
            ></v-text-field>
            
            <TaskList v-if="searchVal === ''" />
            <SearchList v-if="searchVal !== ''" :searchVal="searchVal" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

  
<script setup>

import 'vue-search-input/dist/styles.css';
import SearchList from '../components/SearchList.vue';
import TaskList from '../components/TaskList.vue';
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const newTaskTitle = ref('');
const searchVal = ref('');
const store = useStore();
const taskCount = computed(() => store.getters.activeTasksCount);

const clearSearch = () => {
  searchVal.value = '';
};

const addTask = () => {
  const newTaskObject = {
    userId: 1,
    id: 1,
    title: newTaskTitle.value,
    completed: false,
  };
  store.dispatch('addTask', newTaskObject);
  newTaskTitle.value = '';
};

const activateCompletedFilter = () => {
  const filterFunctions = [(task) => !task.completed];
  console.log('The filter functions are', filterFunctions);
  store.dispatch('setFilters', filterFunctions);
};

onMounted(() => {
  activateCompletedFilter();
});
</script>

  
<style scoped>

</style>
  