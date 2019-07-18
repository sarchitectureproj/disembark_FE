import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router = new Router({
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
            component: () => import('./views/Passenger/ShowPassenger.vue')
        },
        {
            path: '/passengers/new',
            name: 'new passenger',
            component: () => import('./views/Passenger/NewPassenger.vue')
        },
        {
            path: '/confiscated_items',
            name: 'Confiscated Items Menu',
            component: () => import('./views/CItems.vue')
        },
        {
            path: '/luggage',
            name: 'luggage',
            component: () => import('./views/LuggageMenu.vue')
        },
        {
            path: '/luggage/viewLuggages',
            name: 'luggage',
            component: () => import('./views/Luggage.vue')
        },
        {
            path: '/luggage/viewTags',
            name: 'luggage',
            component: () => import('./views/Tag.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/Login.vue')
        },
        {
            path: '*',
            redirect: '/'
        },
    ]
})
export default router;