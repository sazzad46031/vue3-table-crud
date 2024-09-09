import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/Pages/Home.vue';

import EditCourse from './EditCourse.vue'




const routes = [
  {
    path: '/',
    name: Home,
    component: Home
  },
  
  {
    path: '/edit/:id',
    name: 'editCourse',
    component: EditCourse, 
    props: true, 
  }
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
