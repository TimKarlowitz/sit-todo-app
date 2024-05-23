import { createRouter, createWebHistory } from "vue-router";
import MyTasks from "../views/MyTasks.vue";
import Archive from "../views/MyArchive.vue";
import MainLayout from "@/views/MainLayout.vue";

const routes = [
  //redirects to MainLayout where the MyTasks/Archive Screens are displayed
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        component: MyTasks,
      },
      {
        path: "archive",
        component: Archive,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
