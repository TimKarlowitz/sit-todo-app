<template>
  <router-view />
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',
  // Fetch tasks when the app is created to ensure that the tasks are loaded (no loading animation is shown)
  created() {
    this.fetchTasks();
  },
  methods: {
    ...mapActions(['fetchTasks'])
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
