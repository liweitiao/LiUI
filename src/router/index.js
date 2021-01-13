import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../components/Home.vue'
const Home = () => import(/* webpackChunkName: "home_tenant" */ '../components/Home.vue')

// import Contract from '../components/Contract.vue'
const Contract = () => import(/* webpackChunkName: "contract" */ '../components/Contract.vue')

// import Tenant from '../components/Tenant.vue'
const Tenant = () => import(/* webpackChunkName: "home_tenant" */ '../components/Tenant.vue')

// import Member from '../components/Member.vue'
const Member = () => import(/* webpackChunkName: "member" */ '../components/Member.vue')

// import Social from '../components/Social.vue'
const Social = () => import(/* webpackChunkName: "social" */ '../components/Social.vue')

// import Manage from '../components/Manage.vue'
const Manage = () => import(/* webpackChunkName: "manage" */ '../components/Manage.vue')

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
      redirect: '/tenant',
      children: [
        { path: '/tenant', component: Tenant },
        { path: '/contract', component: Contract },
        { path: '/member', component: Member },
        { path: '/manage', component: Manage },
        { path: '/social', component: Social }
      ]
    }
  ]
})

export default router
