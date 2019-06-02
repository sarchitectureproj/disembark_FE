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
        {
            path: '/meeting_points',
            name: 'meetingPoint',
            component: () => import('./views/MeetingPoint.vue')
        },
    ]
})