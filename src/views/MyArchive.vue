<template>
  <div>
    <h1>Archive</h1>
    <TaskList taskType="archivedTasks"/>
  </div>
</template>

<script setup>
import TaskList from '../components/TaskList.vue';
import { onMounted } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const activateCompletedFilter = () => {
    const filterFunctions = [(task) => task.completed];
    store.dispatch('setFilters', filterFunctions);
  };
  onMounted(() => {
    activateCompletedFilter();
  });
</script>

<style scoped>
/* Füge hier deine spezifischen Styles hinzu */
</style>
