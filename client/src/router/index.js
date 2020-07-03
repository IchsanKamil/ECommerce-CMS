import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import MainPage from '../views/MainPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/products',
    name: 'MainPage',
    component: MainPage,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
//   if ((to.path === '/cart') && !localStorage.token) {
//     next({ name: 'Login' });
//   } else
//   if ((to.path !== '/login') && !localStorage.token) {
//     next({ name: 'Login' });
//   } else {
//     next();
//   }
// });
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !localStorage.token) next({ name: 'Login' })
  else if (to.name === 'Login' && localStorage.token) next({ name: 'MainPage' }) 
  else next()
})

export default router;
