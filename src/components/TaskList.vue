<template>
  <v-container fluid>
    
    <div>
      <v-row>
        <v-col
          v-for="task in filteredAndSortedTasks"
          :key="task.id"
          cols="12" sm="12" md="6" lg="6"
        >
          <TaskItem :task="task" />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>



<script>
import {  mapGetters } from 'vuex';
import TaskItem from './TaskItem.vue';
import FilterAndSorter from './FilterAndSorter.vue';

export default {
  components: {
    TaskItem,
    FilterAndSorter,
  },
  computed: {
    ...mapGetters(["filteredAndSortedTasks"]),
    filteredTasks() {
      return this.filteredAndSortedTasks;
    },
    ...mapGetters(["taskCount"]),
    taskCount() {
      return this.taskCount;
    },
  },
};
</script>

<style scoped>
/* Füge hier deine spezifischen Styles hinzu */
</style>
