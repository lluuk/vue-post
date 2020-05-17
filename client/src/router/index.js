import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { isLoggedIn } from '@/composables/useAuth'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/profile',
        name: 'Profile',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/post/:id',
        name: 'Post',
        props: true,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "post" */ '../views/Post.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    },
    {
        path: '/signup',
        name: 'Signup',
        component: () =>
            import(/* webpackChunkName: "signup" */ '../views/Signup.vue'),
    },
]

const router = new VueRouter({
    mode: 'history',
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (isLoggedIn.value) {
            next()
            return
        }
        localStorage.removeItem('token')
        next('/login')
    } else {
        if (isLoggedIn.value) {
            next('/')
        }
        next()
    }
})

export default router
