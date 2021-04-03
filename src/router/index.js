import Vue from 'vue'
import VueRouter from 'vue-router'
// import Viewboard from '../components/User/Viewboard/Viewboard'
import Register from '../components/Login/Register'
import Login from '../components/Login/Login'
import UserNavbar from '../components/User/Navbar/UserNavbar'
import SubmitSc from '../components/User/SubmitSC/SubmitSC'
import HistorySc from '../components/User/HistorySC/HistorySC'

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
        path:'/login',
        name: 'login',
        component: Login
    },

    {
        path:'/register',
        name: 'register',
        component: Register
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// router.beforeEach(waitForStorageToBeReady)

// router.beforeEach((to, from, next) => {
// 	if(to.matched.some(record => record.meta.user)) {
// 		if (store.state.token) {
// 			next()
// 			return
// 		}
// 		next('/login') 
//     }
//     else if(to.matched.some(record => record.meta.admin)){
//         if (store.state.token) {
//             next()
//             return
//         }
//         next('/login')
//     }
// 	else {
// 		next() 
// 	}
// })

export default router
