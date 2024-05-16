import { createStore } from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    tasks: [],
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
  },
  actions: {
    async fetchTasks({ commit }) {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
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
  },
  getters: {
    activeTasks: (state) =>
      state.tasks.filter((task) => !task.completed).sort((a, b) => b.id - a.id),
    completedTasks: (state) =>
      state.tasks.filter((task) => task.completed).sort((a, b) => b.id - a.id),
  },
  plugins: [createPersistedState()], // Plugin hinzufügen
});
