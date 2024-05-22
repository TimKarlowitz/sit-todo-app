import { createStore } from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

// Check if there is any persisted data in local storage
const persistedData = localStorage.getItem("tasks");
const initialTasks = persistedData ? JSON.parse(persistedData) : [];

const getDefaultState = () => {
  return {
    tasks: initialTasks,
    filters: {
      showActive: true,
      showPriorityHigh: false,
    },
    sorters: ["idDescending"],
    taskCount: initialTasks.filter((task) => !task.completed).length,
  };
};

const store = createStore({
  state: getDefaultState(),
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
    setFilterActive(state, showActive) {
      state.filters.showActive = showActive;
    },
    setFilterPriorityHigh(state, showPriorityHigh) {
      state.filters.showPriorityHigh = showPriorityHigh;
    },
    setSorters(state, sorters) {
      state.sorters = sorters;
    },
    resetState(state) {
      Object.assign(state, getDefaultState());
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
    setFilterActive({ commit }, showActive) {
      commit("setFilterActive", showActive);
    },
    setFilterPriorityHigh({ commit }, showPriorityHigh) {
      commit("setFilterPriorityHigh", showPriorityHigh);
    },
    setSorters({ commit }, sorters) {
      commit("setSorters", sorters);
    },
    resetState({ commit }) {
      commit("resetState");
    },
  },
  getters: {
    filteredAndSortedTasks: (state) => {
      let tasks = [...state.tasks];

      // Apply active/archived filter
      tasks = tasks.filter((task) =>
        state.filters.showActive ? !task.completed : task.completed
      );

      // Apply priority filter if needed
      if (state.filters.showPriorityHigh) {
        tasks = tasks.filter((task) => task.priority === "high");
      }

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

export default store;
