<template> <!--This Component is basically a TaskList but is only shown when the user is searching for a task. It has some extras, like a Hint if no tasks match the search query -->
  <div>
    <TaskItem v-for="task in tasks" :key="task.id" :task="task" />
    <div v-if="tasks.length === 0">
      <p style="color: white;">No tasks match your search.</p>
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

//Seach logic to search for tasks that match the search query
const tasks = computed(() => {
  return filteredAndSortedTasks.value.filter((task) =>
    task.title?.toLowerCase().includes(searchVal.value.toLowerCase())
  );
});


// Debugging
console.log('Search Value:', searchVal.value);
console.log('Tasks:', tasks.value);
</script>

<style scoped>
/* Add your specific styles here */
</style>
