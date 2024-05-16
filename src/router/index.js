import { createRouter, createWebHistory } from "vue-router";
import MyTasks from "../views/MyTasks.vue";
import Archive from "../views/MyArchive.vue";

const routes = [
  { path: "/", component: MyTasks },
  { path: "/archive", component: Archive },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
