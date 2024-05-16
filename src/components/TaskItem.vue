<template>
    <div>
      <p>{{ localTask.title }}</p>
      <button @click="toggleTask">{{ localTask.completed ? 'undo' : 'complete and archive' }}</button>
      <p>{{ localTask.id }}</p>
    </div>
  </template>
  
  <script>
  import { reactive } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    props: {
      task: {
        type: Object,
        required: true,
      },
    },
    setup(props) {
        const store = useStore();

      const localTask = reactive({ ...props.task });
        console.log(localTask);
      const toggleTask = () => {
        store.dispatch('toggleTaskCompletion', localTask.id);
        console.log(localTask);
      };
  
      return { localTask, toggleTask };
    },
  };
  </script>
  
  <style scoped>
  /* Füge hier deine spezifischen Styles hinzu */
  </style>
  