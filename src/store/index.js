import { createStore } from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

// Check if there is any persisted data in local storage
const persistedData = localStorage.getItem("tasks");
const initialTasks = persistedData ? JSON.parse(persistedData) : [];

export default createStore({
  state: {
    tasks: initialTasks,
    filters: [(task) => !task.completed],
    sorters: ["idDescending"],
    taskCount: initialTasks.filter((task) => !task.completed).length,
  },
  mutations: {
    setTasks(state, tasks) {
      // Add priority field to each task if it doesn't exist
      tasks.forEach((task) => {
        if (task.priority === undefined) {
          task.priority = "medium"; // Default priority
        }
      });

      state.tasks = tasks.sort((a, b) => b.id - a.id);
      state.taskCount = tasks.filter((task) => !task.completed).length;
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); // Save to local storage
    },
    addTask(state, task) {
      task.id = state.tasks.length + 1;
      if (task.priority === undefined) {
        task.priority = "medium"; // Default priority
      }
      state.tasks.push(task);
      if (!task.completed) {
        state.taskCount++;
      }
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); // Save to local storage
    },
    toggleTaskCompletion(state, taskId) {
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        task.completed = !task.completed;
        state.taskCount += task.completed ? -1 : 1;
      }
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); // Save to local storage
    },
    deleteTask(state, taskId) {
      const task = state.tasks.find((task) => task.id === taskId);
      if (task && !task.completed) {
        state.taskCount--;
      }
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); // Save to local storage
    },
    updateTaskTitle(state, { taskId, newTitle }) {
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        task.title = newTitle;
      }
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); // Save to local storage
    },
    updateTaskPriority(state, { taskId, newPriority }) {
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        task.priority = newPriority;
      }
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); // Save to local storage
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
      if (!persistedData) {
        // Only fetch if there is no persisted data
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos"
        );
        commit("setTasks", response.data);
      }
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
    updateTaskPriority({ commit }, payload) {
      commit("updateTaskPriority", payload);
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
      state.filters.forEach((filter, index) => {
        if (typeof filter === "function") {
          tasks = tasks.filter(filter);
        } else {
          console.error(`Invalid filter at index ${index}:`, filter);
        }
      });
      // Apply sorters
      state.sorters.forEach((sorter) => {
        if (typeof sorter === "function") {
          tasks = tasks.sort(sorter);
        } else {
          console.error("Invalid sorter found:", sorter);
        }
      });
      return tasks;
    },
    activeTasksCount: (state) => {
      return state.taskCount;
    },
  },
  plugins: [createPersistedState()],
});
