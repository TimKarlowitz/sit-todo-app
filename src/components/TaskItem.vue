<template>
  <div>
    <p>{{ task.title }}</p>
    <button @click="toggleTask">{{ task.completed ? 'undo' : 'complete and archive' }}</button>
    <p>{{ task.id }}</p>
    <button @click="handleDeleteTask">Delete</button>
    <button @click="handleEditRequest">Edit</button>
    <input type="text" v-if="titleEditField" v-model="newTitle" placeholder="Enter New Title"/>
    <button v-if="titleEditField" @click="handleEditTask">Update Task Title</button>
  </div>
</template>

<script>
import { ref } from 'vue';
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
    const titleEditField = ref(false);
    const newTitle = ref('');

    const toggleTask = () => {
      store.dispatch('toggleTaskCompletion', props.task.id);
    };

    const handleDeleteTask = () => {
      store.dispatch('deleteTask', props.task.id);
    };

    const handleEditRequest = () => {
      newTitle.value = props.task.title;
      titleEditField.value = true;
    };

    const handleEditTask = () => {
      store.dispatch('updateTaskTitle', { taskId: props.task.id, newTitle: newTitle.value });
      titleEditField.value = false;
      newTitle.value = '';
    };

    return { toggleTask, handleDeleteTask, handleEditTask, handleEditRequest, titleEditField, newTitle };
  },
};
</script>

<style scoped>
/* Add your specific styles here */
</style>
