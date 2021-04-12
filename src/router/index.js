import Vue from 'vue'
import VueRouter from 'vue-router'
// import Viewboard from '../components/User/Viewboard/Viewboard'
import Register from '../components/Login/Register'
import Login from '../components/Login/Login'
import UserNavbar from '../components/User/Navbar/UserNavbar'
import HistorySc from '../components/User/HistorySC/HistorySC'
import SubmitSc from '../components/User/SubmitSC/SubmitSC'


import AdminNavbar from '../components/Admin/Navbar/AdminNavbar'
// import SubmitSc from '../components/Admin/SubmittedSC/Submittedsc'
// import AdminViewboard from '../components/Admin/Viewboard/AdminViewboard'

import store from '../store'

Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        component: UserNavbar,
        meta : { user : true },
        children: [
            {
                path: '/',
                component: () => import('@/components/User/Viewboard/Viewboard')
            },
            {
                path: '/submitsc',
                component: SubmitSc
            },
            {
                path: '/historysc',
                component: HistorySc
            },

            
        ]
    },

    {
        path:'/admin',
        component: AdminNavbar,
        meta: {user: true},
        children: [
            {
                path: '/admin',
                component: () => import('@/components/Admin/Viewboard/AdminViewboard')
            }
        ]
    },

    {
        path:'/login',
        name: 'login',
        component: Login
    },

    {
        path:'/register',
        name: 'register',
        component: Register
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

const waitForStorageToBeReady = async(to, from, next) => {
    await store.restored
    next()
}
router.beforeEach(waitForStorageToBeReady)

router.beforeEach((to, from, next) => {
	if(to.matched.some(record => record.meta.user)) {
		if (store.state.token) {
			next()
			return
		}
		next('/login') 
    }
    else if(to.matched.some(record => record.meta.admin)){
        if (store.state.token) {
            next()
            return
        }
        next('/login')
    }
	else {
		next() 
	}
})

export default router

