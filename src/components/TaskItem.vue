<template>
  <v-card class="task-item mx-auto my-4">
    <v-card-title class="task-title">
      <div class="task-title-text">
        {{ task.title }}
      </div>
      <v-card-actions class="task-actions">
        <v-btn @click="toggleTask" class="complete-btn" outlined>
          Complete
        </v-btn>
        <v-btn @click="handleDeleteTask" class="delete-btn" outlined>
          Delete
        </v-btn>
      </v-card-actions>
      <v-icon @click="handleEditRequest" small class="edit-icon">mdi-pencil</v-icon>
    </v-card-title>

    <v-card-text v-if="titleEditField">
      <v-text-field v-model="newTitle" label="Enter New Title" class="mb-2"></v-text-field>
      <v-btn @click="handleEditTask" color="success">
        Update Task Title
      </v-btn>
    </v-card-text>

    <!-- Star icon for priority -->
    <v-icon @click="togglePriority" class="priority-icon">
      {{ task.priority === 'high' ? 'mdi-star' : 'mdi-star-outline' }}
    </v-icon>
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

    const togglePriority = () => {
      const newPriority = props.task.priority === 'medium' ? 'high' : 'medium';
      store.dispatch('updateTaskPriority', { taskId: props.task.id, newPriority });
    };

    return { toggleTask, handleDeleteTask, handleEditTask, handleEditRequest, togglePriority, titleEditField, newTitle };
  },
};
</script>

<style scoped>
.task-item {
  background-color: #2c2c2c;
  color: white;
  border: 1px solid #6d28d9;
  border-radius: 8px;
  padding: 16px;
  position: relative; /* To position the edit icon */
}

.task-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
}

.task-title-text {
  flex-grow: 1;
  word-wrap: break-word; /* Ensure long words break to avoid overflow */
  white-space: pre-wrap; /* Preserve whitespace and wrap as needed */
}

.edit-icon {
  position: absolute;
  top: 8px;
  left: 8px;
  cursor: pointer;
  background-color: gray;
  color: white;
  border-radius: 50%;
  padding: 20px;
  font-size: 16px; /* Smaller size for the icon */
}

.task-actions {
  display: flex;
  flex-direction: column; /* Ensure the buttons are in a column */
  align-items: flex-end;
  gap: 8px;
}

.complete-btn {
  color: green;
  border-color: green;
  border-width: 1px;
  border-radius: 10px;
}

.delete-btn {
  color: red;
  border-color: red;
  border-width: 1px;
  border-radius: 10px;
}

.priority-icon {
  position: absolute;
  bottom: 8px;
  left: 8px;
  cursor: pointer;
  color: gold; /* Color for the star icon */
}
</style>

