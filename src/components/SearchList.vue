<template>
    <div>
      <TaskItem v-for="task in tasks" :key="task.id" :task="task" />
      <!-- Display a message if no tasks are present -->
    <div v-if="isTaskListEmpty">
      <p>No tasks match your search.</p>
    </div>
    </div>
  </template>
  
  <script>
  import { computed, toRefs } from 'vue';
  import { useStore } from 'vuex';
  import TaskItem from './TaskItem.vue';
  
  export default {
    components: {
      TaskItem,
    },
    props: {
      searchVal: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const { searchVal } = toRefs(props);
      const store = useStore();
        
      const tasks = computed(() => {
        return store.getters.activeTasks.filter((task) => task.title?.includes(searchVal.value));
      });
      const isTaskListEmpty = computed(() => {
  return tasks.value.length === 0;
    });
  
      // Debugging
      console.log('Search Value:', searchVal.value);
      console.log('Tasks:', tasks.value);
  
      return { tasks, isTaskListEmpty };
    },
  };
  </script>
  
  <style scoped>
  /* Add your specific styles here */
  </style>
  