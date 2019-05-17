import Vue from 'vue'
import Router from 'vue-router'
import withDeconstruction from './views/demo1.vue'
// import withOutDeconstruction from './views/demo2.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'with',
      component: withDeconstruction
    },
    {
      path: '/without',
      name: 'without',
      component: () => import('./views/demo2.vue')
    }
  ]
})
