import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('./views/Home.vue')
        },
        {
            path: '/deck',
            name: 'deck',
            component: () => import('./views/Deck.vue')
        },


        //MEETING POINTS ROUTES
        {
            path: '/meeting_points',
            name: 'meetingPoint',
            component: () => import('./views/MeetingPoint.vue')
        },
        //PASSENGER ROUTES
        {
            path: '/passengers',
            name: 'passenger',
            component: () => import('./views/Passenger/IndexPassenger.vue')
        },
        {
            path: '/passengers/new',
            name: 'new passenger',
            component: () => import('./views/Passenger/NewPassenger.vue')
        },
        {
            path: '/passengers/edit',
            name: 'edit passenger',
            component: () => import('./views/Passenger/EditPassenger.vue')
        },
        {
            path: '/passengers/show',
            name: 'show passenger',
            component: () => import('./views/Passenger/ShowPassenger.vue')
        },
        {
            path: '/passengers/delete',
            name: 'show passenger',
            component: () => import('./views/Passenger/DeletePassenger.vue')
        },

        {
            path: '/citems',
            name: 'citems',
            component: () => import('./views/CItems.vue')
        },
    ]
})
