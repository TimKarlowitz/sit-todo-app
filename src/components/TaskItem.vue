<template>
  <v-card class="mx-auto my-4" style="background-color:darkslategray;">
    <v-card-title style="color: white;">{{ task.title }}</v-card-title>
    <v-card-subtitle style="color: white; ;">Task ID: {{ task.id }}</v-card-subtitle>

    <v-card-actions style="background-color: black;">
      <v-btn @click="toggleTask" :color="task.completed ? 'secondary' : 'green'" class="mr-2" style="border-width: 1px; border-color: white;" >
        {{ task.completed ? 'Undo' : 'Complete' }}
      </v-btn>
      <v-btn @click="handleDeleteTask" color="error" class="mr-2" style="border-width: 1px; border-color: white;">
        Delete
      </v-btn>
      <v-btn @click="handleEditRequest" color="info" class="mr-2" style="border-width: 1px; border-color: white;">
        Edit
      </v-btn>
    </v-card-actions>

    <v-card-text v-if="titleEditField">
      <v-text-field v-model="newTitle" label="Enter New Title" class="mb-2"></v-text-field>
      <v-btn @click="handleEditTask" color="success">
        Update Task Title
      </v-btn>
    </v-card-text>
  </v-card>
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
