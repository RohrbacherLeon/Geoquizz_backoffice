import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Register from './components/Register.vue'
import Login from './components/Login.vue'
import Dashboard from './components/Dashboard.vue'
import Photos from './components/dashboard/Photos.vue'

Vue.config.productionTip = false
Vue.use(VueRouter);

const isLogged = (to, from, next) => {
  if(localStorage.getItem('user')){
    next();
  }else{
    next('/login')
  }
}

const isNotLogged = (to, from, next) => {
  if(!localStorage.getItem('user')){
    next();
  }else{
    next('/')
  }
}

const routes = [
  { 
    path: '/login', 
    component: Login,
    beforeEnter: isNotLogged
  },
  { path: '/signup', component: Register, beforeEnter: isNotLogged },
  { 
    path: '/dashboard', 
    component: Dashboard ,
    beforeEnter: isLogged,
    children: [
      {
        path: 'photos',
        component: Photos
      }],

  }
]

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
