import { createStore } from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    tasks: [],
    filters: [],
    sorters: [],
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks.sort((a, b) => b.id - a.id);
    },
    addTask(state, task) {
      task.id = state.tasks.length + 1;
      state.tasks.push(task);
    },
    toggleTaskCompletion(state, taskId) {
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask(state, taskId) {
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },
    updateTaskTitle(state, { taskId, newTitle }) {
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        task.title = newTitle;
      }
    },
    setFilters(state, filters) {
      state.filters = filters;
    },
    setSorters(state, sorters) {
      state.sorters = sorters;
    },
  },
  actions: {
    async fetchTasks({ commit }) {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      console.log(response.data);
      commit("setTasks", response.data);
    },
    addTask({ commit }, task) {
      commit("addTask", task);
    },
    toggleTaskCompletion({ commit }, taskId) {
      commit("toggleTaskCompletion", taskId);
    },
    deleteTask({ commit }, taskId) {
      commit("deleteTask", taskId);
    },
    updateTaskTitle({ commit }, payload) {
      commit("updateTaskTitle", payload);
    },
    setFilters({ commit }, filters) {
      commit("setFilters", filters);
    },
    setSorters({ commit }, sorters) {
      commit("setSorters", sorters);
    },
  },
  getters: {
    filteredAndSortedTasks: (state) => {
      let tasks = [...state.tasks];

      // Apply filters
      state.filters.forEach((filter) => {
        tasks = tasks.filter(filter);
      });

      // Apply sorters
      state.sorters.forEach((sorter) => {
        if (typeof sorter === "function") {
          tasks = tasks.sort(sorter);
        } else {
          console.error("Invalid sorter found:", sorter);
          // Optionally, continue without applying the invalid sorter
        }
      });
      return tasks;
    },
    activeTasks: (state) => {
      return state.tasks.filter((task) => !task.completed);
    },
    completedTasks: (state) => {
      return state.tasks.filter((task) => task.completed);
    },
  },
  plugins: [createPersistedState()],
});
