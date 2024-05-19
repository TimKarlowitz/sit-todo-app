<template>
  <v-container class="py-4">
    <v-row>
      <v-col>
        <v-card class="mx-auto my-4" max-width="600">
          <v-card-title>
            <v-icon class="mr-2">mdi-archive</v-icon>
            Archive
          </v-card-title>
          <v-card-text>
            <TaskList taskType="archivedTasks" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
