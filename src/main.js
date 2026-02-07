import { createApp } from 'vue'
import App from './App.vue'
import './main.css'
import './glass.css'
import './background.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

import { createWebHistory, createRouter } from 'vue-router'

import Account from './Account.vue'
import Home from './Home.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/:accountName', component: Account },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App).use(router).mount('#app')
