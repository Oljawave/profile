import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/gallery', component: () => import('./pages/Gallery.vue') },
    { path: '/ratings', component: () => import('./pages/ratings.vue') },
    { path: '/movies', component: () => import('./pages/Movies.vue') },
    { path: '/music', component: () => import('./pages/Music.vue') },
    { path: '/cities', component: () => import('./pages/Cities.vue') },
    { path: '/history', component: () => import('./pages/History.vue') },
    { path: '/different', component: () => import('./pages/Different.vue') },
    { path: '/sports', component: () => import('./pages/Sports.vue') },
    { path: '/series', component: () => import('./pages/Series.vue') },
    { path: '/malaysia', component: () => import('./pages/Malaysia.vue') },
    { path: '/almaty', component: () => import('./pages/Almaty.vue') },
    { path: '/bali', component: () => import('./pages/Bali.vue') },
    { path: '/losangeles', component: () => import('./pages/Losangeles.vue') },
    { path: '/nyc', component: () => import('./pages/Newyork.vue') },
    { path: '/baku', component: () => import('./pages/Baku.vue') },
    { path: '/astana', component: () => import('./pages/Astana.vue') },
    { path: '/dubai', component: () => import('./pages/Dubai.vue') },
    { path: '/arizona', component: () => import('./pages/Arizona.vue') },
    { path: '/washington', component: () => import('./pages/Washington.vue') },
    { path: '/istanbul', component: () => import('./pages/Istanbul.vue') },
    { path: '/burabay', component: () => import('./pages/Burabay.vue') },
    { path: '/tbilisi', component: () => import('./pages/Tbilisi.vue') },
    { path: '/abudhabi', component: () => import('./pages/Abudhabi.vue') },
    { path: '/philadelphia', component: () => import('./pages/Philadelphia.vue') },
    { path: '/oceancity', component: () => import('./pages/Oceancity.vue') },
    { path: '/sanfrancisco', component: () => import('./pages/Sanfrancisco.vue') },
    { path: '/karaganda', component: () => import('./pages/Karaganda.vue') },
    { path: '/lasvegas', component: () => import('./pages/Lasvegas.vue') },
  ],
});

export default router;
