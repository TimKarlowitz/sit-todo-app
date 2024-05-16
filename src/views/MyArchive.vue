<template>
  <div>
    <h1>Archive</h1>
    <TaskList taskType="archivedTasks"/>
  </div>
</template>

<script>
import TaskList from '../components/TaskList.vue';

export default {
  components: {
    TaskList,
  },
};
</script>

<style scoped>
/* Füge hier deine spezifischen Styles hinzu */
</style>
