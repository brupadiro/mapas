import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '@/pages/index';
import Complete from '@/pages/complete';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/complete',
    name: 'Complete',
    component: Complete
  }


];

const router = new VueRouter({
  routes
});

export default router;
