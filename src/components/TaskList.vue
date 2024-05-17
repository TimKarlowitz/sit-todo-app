<template>
  <div>
    <FilterAndSorter />
    <TaskItem v-for="task in filteredAndSortedTasks" :key="task.id" :task="task" />
  </div>
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
  },
};
</script>

<style scoped>
/* Füge hier deine spezifischen Styles hinzu */
</style>
