<template>
  <div>
    <h1>My Tasks</h1>
    <div>
      <h2>Add a new Task</h2>
      <input type="text" v-model="newTaskTitle" placeholder="New Task Name"/>
      <button @click="addTask">Add Task</button>
    </div>
    <h2>Your Active Tasks</h2>
    <h3>You currently have {{ taskCount }} active tasks</h3>
    
    <SearchInput v-model="searchVal" :clearIcon="false"/>

    <TaskList v-if="searchVal===''"/>
    <SearchList v-if="searchVal!=''" :searchVal="searchVal" />
    <User :size="32" :stroke-width="2.25" />
  </div>
</template>
  
<script setup>
  import { User } from 'lucide-vue-next';
  import SearchInput from 'vue-search-input'
  import 'vue-search-input/dist/styles.css'
  import SearchList from '../components/SearchList.vue';
  import TaskList from '../components/TaskList.vue';
  import { ref, computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  const newTaskTitle = ref('');
  const searchVal = ref('');
  const store = useStore();
  const taskCount = computed(() => store.getters.activeTasks.length);
  const addTask = () => {
    const newTaskObject = {
      userId: 1,
      id: 1,
      title: newTaskTitle.value,
      completed: false,
    };
    store.dispatch('addTask', newTaskObject);
    newTaskTitle.value = '';
  };

  const activateCompletedFilter = () => {
    const filterFunctions = [(task) => !task.completed];
    console.log('The filter functions are', filterFunctions);
    store.dispatch('setFilters', filterFunctions);
  };
  onMounted(() => {
    activateCompletedFilter();
  });
</script>
  
<style scoped>

</style>
  