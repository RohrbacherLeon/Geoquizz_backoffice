import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Register from './components/Register.vue'
import Login from './components/Login.vue'
import Dashboard from './components/Dashboard.vue'

Vue.config.productionTip = false
Vue.use(VueRouter);

const routes = [
  { path: '/login', component: Login },
  { path: '/signup', component: Register },
  { 
    path: '/dashboard', 
    component: Dashboard ,
    beforeEnter: (to, from, next) => {
      if(localStorage.getItem('token')){
        next();
      }else{
        next('/login')
      }
    }

  },
]

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
