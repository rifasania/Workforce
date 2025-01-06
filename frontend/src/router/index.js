import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../pages/dashboard/Dashboard.vue';
import Landing from '../pages/landing/Landing.vue';
import UpahMinimum from '../pages/upah_minimum/UpahMinimum.vue';
import PengangguranTerbuka from '../pages/pengangguran_terbuka/PengangguranTerbuka.vue';
import JobSeeker from '../pages/job_seeker/JobSeeker.vue';
import EditUpah from '../pages/upah_minimum/FormEditUpah.vue'
import AddUpah from '../pages/upah_minimum/FormAddUpah.vue'

const routes = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
    },   
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
    {
        path: '/registered-job-seeker',
        name: 'PencariKerjaTerdaftar',
        component: JobSeeker,
    },
    {
        path: '/edit-upah/:id',
        name: 'EditUpah',
        component: EditUpah,
    },
    {
        path: '/add-upah',
        name: 'AddUpah',
        component: AddUpah,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), 
    routes,
  });
  
  export default router;