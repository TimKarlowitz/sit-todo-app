<template>
  <div>
    <TaskItem v-for="task in tasks" :key="task.id" :task="task" />
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
    taskType: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { taskType } = toRefs(props);
    const store = useStore();
    
    const tasks = computed(() => {
      return taskType.value === 'archivedTasks'
        ? store.getters.completedTasks
        : store.getters.activeTasks;
    });

    return { tasks };
  },
};
</script>

<style scoped>
/* Füge hier deine spezifischen Styles hinzu */
</style>
