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
      // Add priority field to each task if it doesn't exist (wont exist in fetched data)
      tasks.forEach((task) => {
        if (task.priority === undefined) {
          task.priority = "medium"; // Default priority
        }
      });
      // Sort tasks by id in descending order
      state.tasks = tasks.sort((a, b) => b.id - a.id);
      // Update active tasks count
      state.taskCount = tasks.filter((task) => !task.completed).length;
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); // Save to local storage
    },

    // Add a new task with default priority (task Object is passed as payload and created in MyTasks.vue)
    addTask(state, task) {
      if (task.priority === undefined) {
        task.priority = "medium"; // Default priority
      }
      state.tasks.push(task);
      if (!task.completed) {
        state.taskCount++;
      }
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); // Save to local storage
    },

    // Toggle task completion status from completed to active and vice versa
    toggleTaskCompletion(state, taskId) {
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        task.completed = !task.completed;
        state.taskCount += task.completed ? -1 : 1;
      }
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); // Save to local storage
    },

    // Delete a task from the tasks array based on taskId passed as payload
    deleteTask(state, taskId) {
      const task = state.tasks.find((task) => task.id === taskId);
      if (task && !task.completed) {
        state.taskCount--;
      }
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); // Save to local storage
    },

    // Update task title based on taskId and newTitle passed as payload
    updateTaskTitle(state, { taskId, newTitle }) {
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        task.title = newTitle;
      }
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); // Save to local storage
    },

    // Update task priority based on taskId and newPriority passed as payload
    updateTaskPriority(state, { taskId, newPriority }) {
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        task.priority = newPriority;
      }
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); // Save to local storage
    },

    // Set active/archived filter based on showActive passed as payload (happens when user switches between active and archived task Screens)
    setFilterActive(state, showActive) {
      state.filters.showActive = showActive;
    },

    // Set priority filter based on showPriorityHigh passed as payload (happens when user switches priority filter in FilterAndSort.vue)
    setFilterPriorityHigh(state, showPriorityHigh) {
      state.filters.showPriorityHigh = showPriorityHigh;
    },

    // Set sorters based on sorters passed as payload (happens when user changes sorting in FilterAndSort.vue)
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
    setFilterActive({ commit }, showActive) {
      commit("setFilterActive", showActive);
    },
    setFilterPriorityHigh({ commit }, showPriorityHigh) {
      commit("setFilterPriorityHigh", showPriorityHigh);
    },
    setSorters({ commit }, sorters) {
      commit("setSorters", sorters);
    },
  },
  getters: {
    filteredAndSortedTasks: (state) => {
      let tasks = [...state.tasks];

      // Apply active/archived filter based on showActive
      tasks = tasks.filter((task) =>
        state.filters.showActive ? !task.completed : task.completed
      );

      // Apply priority filter based on showPriorityHigh
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
      //return the filtered and sorted tasks for the components to use
      return tasks;
    },
    //just returns the active task count
    activeTasksCount: (state) => {
      return state.taskCount;
    },
  },
  plugins: [createPersistedState()],
});

export default store;
