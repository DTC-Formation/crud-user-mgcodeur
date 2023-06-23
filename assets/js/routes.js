import { createWebHistory, createRouter } from "vue-router";
import { user } from "./routes/user";

const routes = [...user];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;