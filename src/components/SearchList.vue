<template>
  <div>
    <TaskItem v-for="task in tasks" :key="task.id" :task="task" />
    <!-- Display a message if no tasks are present -->
    <div v-if="isTaskListEmpty">
      <p>No tasks match your search.</p>
    </div>
  </div>
</template>

<script setup>
import { computed, toRefs } from 'vue';
import { useStore } from 'vuex';
import TaskItem from './TaskItem.vue';

const props = defineProps({
  searchVal: {
    type: String,
    required: true,
  },
});

const store = useStore();
const { searchVal } = toRefs(props);

const filteredAndSortedTasks = computed(() => store.getters.filteredAndSortedTasks);

const tasks = computed(() => {
  return filteredAndSortedTasks.value.filter((task) =>
    task.title?.toLowerCase().includes(searchVal.value.toLowerCase())
  );
});

const isTaskListEmpty = computed(() => tasks.value.length === 0);

// Debugging
console.log('Search Value:', searchVal.value);
console.log('Tasks:', tasks.value);
</script>

<style scoped>
/* Add your specific styles here */
</style>
