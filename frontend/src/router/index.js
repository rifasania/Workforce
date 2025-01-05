import { createRouter, createWebHistory } from 'vue-router';
import Landing from '../pages/landing/Landing.vue';
import UpahMinimum from '../pages/upah_minimum/UpahMinimum.vue';
import PengangguranTerbuka from '../pages/pengangguran_terbuka/PengangguranTerbuka.vue';

const routes = [
    {
        path: '/',
        name: 'Landing',
        component: Landing,
    },   
    {
        path: '/upah-minimum',
        name: 'UpahMinimum',
        component: UpahMinimum,
    },
    {
        path: '/pengangguran-terbuka',
        name: 'PengangguranTerbuka',
        component: PengangguranTerbuka,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), 
    routes,
  });
  
  export default router;