import Vue from 'vue'
import VueRouter from 'vue-router'


// import Viewboard from '../components/User/Viewboard/Viewboard'
import Register from '../components/Login/Register'
import Login from '../components/Login/Login'
import UserNavbar from '../components/User/Navbar/UserNavbar'
import HistorySc from '../components/User/HistorySC/HistorySC'
import SubmitSc from '../components/User/SubmitSC/SubmitSC'
import SubmitAic from '../components/User/SubmitAIC/SubmitAIC'
// import SubmittedSc from '../components/User/SubmittedSC/Submittedsc'

import Leaderboard from '../components/User/Leaderboard/Leaderboard'
import LeaderboardDosen from '../components/User/Leaderboard/LeaderboardDosen'
import LeaderboardTeam from '../components/User/Leaderboard/LeaderboardTeam'


import Team from '../components/User/Teams/AllTeamUsers'


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
                component: Leaderboard
                
            },
            {
                path:'/rankdosen',
                component: LeaderboardDosen
            },
            {
                path: '/rankteam',
                component: LeaderboardTeam
            },
            {
                path: '/submitsc',
                component: SubmitSc
            },
            {
                path: '/submitaic',
                component: SubmitAic
            },
            {
                path: '/historysc',
                component: HistorySc
            },
            {
                path: '/profile',
                component: () => import('@/components/User/Viewboard/Viewboard')
            },
            {
                path: '/profile/:id/:email',
                name: 'view-profile',
                component: () => import('@/components/User/Profile/ViewProfile'),
            },
            {

                path: '/teams',
                component: Team
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
            },
            {
                path: '/admin/givesc',
                component: () => import('@/components/Admin/GiveSC/GiveSubmit')
            },
            {
                path: '/givesc/:id/:name',
                name: 'give-sc',
                component: () => import('@/components/Admin/GiveSC/Submit'),
            },
            {
                path: '/admin/user',
                name: 'allusers',
                component: () => import('@/components/Admin/AddUser/AllUser'),
            },
            {
                path: '/admin/teams',
                name: 'allteams',
                component: () => import('@/components/Admin/Teams/AllTeams'),
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

