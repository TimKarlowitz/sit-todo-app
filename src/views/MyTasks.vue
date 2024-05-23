<template> <!--Main Screen and first Screen user sees when mounting -->
  <v-container fluid class="py-4 custom-padding">
    <v-row class="mb-4" align="start" justify="space-between">
      
      <!--Search Bar -->
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

      <!--Filter and Sorter Component-->
      <v-col cols="12" md="6">
        <FilterAndSorter />
      </v-col>
    </v-row>

    <!--Active Task Count Display -->
    <v-row>
      <v-col>
        <p class="task-count">You currently have {{ taskCount }} active Tasks</p>
      </v-col>
    </v-row>

    <!--Task List and Search List Components (Search List is only visible when the searchValue is not empty)-->
    <v-row>
      <v-col>
        <TaskList v-if="searchVal === ''" />
        <SearchList v-if="searchVal !== ''" :searchVal="searchVal" />
      </v-col>
    </v-row>

    <!--Floating Action Button Bottom Right Corner to Add a New Task -->
    <v-btn
      fab
      @click="openAddTaskDialog"
      class="fab"
    >
      <v-icon style="color: white;" large>mdi-plus</v-icon>
    </v-btn>

    <!--Dialog to Add a New Task is only shown when FAB is pressed -->
    <v-dialog v-model="addTaskDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Add a New Task</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newTaskTitle"
            label="Enter new task title"
            outlined
            clearable
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="addTask">Add</v-btn>
          <v-btn color="grey darken-1" text @click="addTaskDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import 'vue-search-input/dist/styles.css';
import SearchList from '../components/SearchList.vue';
import TaskList from '../components/TaskList.vue';
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import FilterAndSorter from '../components/FilterAndSorter.vue';

const newTaskTitle = ref('');
const searchVal = ref('');
const addTaskDialog = ref(false);
const store = useStore();
const taskCount = computed(() => store.getters.activeTasksCount);

const clearSearch = () => {
  searchVal.value = '';
};

const openAddTaskDialog = () => {
  newTaskTitle.value = ''; // Clear the input field
  addTaskDialog.value = true;
};

const addTask = () => {
  const newTaskObject = {
    userId: 1, // Hardcoded user ID, could be dynamic in a real application
    id: Date.now(), // Use a timestamp as a unique ID (not recommended for production use, use UUIDS instead) WARN!
    title: newTaskTitle.value,
    completed: false, // New tasks are not completed
  };
  store.dispatch('addTask', newTaskObject);
  newTaskTitle.value = ''; // Clear the input field after adding the task
  addTaskDialog.value = false; // Close the dialog after adding the task
};

const activateCompletedFilter = () => {
  // Set the filter to show archived (completed) tasks
  store.dispatch('setFilterActive', true);
};

// Activate the completed filter when the component is mounted so that the user can see the completed tasks only on the MyTasks view
onMounted(() => {
  activateCompletedFilter();
});
</script>

<style scoped>
.search-input {
  color: white;
}
.fab {
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 1000;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  background-color: #6d28d9;
  border-color: white;
  border-width: 1px;
}
.fab v-icon {
  font-size: 50px;
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
.task-count {
  color: white;
  font-size: 20px;
}
</style>
