import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../pages/dashboard/Dashboard.vue";
import Landing from "../pages/landing/Landing.vue";
import UpahMinimum from "../pages/upah_minimum/UpahMinimum.vue";
import PengangguranTerbuka from "../pages/pengangguran_terbuka/PengangguranTerbuka.vue";
import AddPengangguran from "../pages/pengangguran_terbuka/FormAddpengangguran.vue";
import EditPengangguran from "../pages/pengangguran_terbuka/FormEditPengangguran.vue";
import JobSeeker from "../pages/job_seeker/JobSeeker.vue";
import jumLoker from "../pages/jumlah_loker/JumLoker.vue";
import EditUpah from "../pages/upah_minimum/FormEditUpah.vue";
import AddUpah from "../pages/upah_minimum/FormAddUpah.vue";
import EditLoker from "../pages/jumlah_loker/FormEditLoker.vue";
import AddLoker from "../pages/jumlah_loker/FormAddLoker.vue";
import AddJobSeeker from "../pages/job_seeker/FormAddJobseeker.vue";
import EditJobseeker from "../pages/job_seeker/FormEditJobseeker.vue";
import StatsUpah from "../pages/dashboard/statsUpah.vue";
import StatsLoker from "../pages/dashboard/statsLoker.vue";
import StatsJobSeeker from "../pages/dashboard/statsJobSeeker.vue";
import StatsPengangguran from "../pages/dashboard/statsPengangguran.vue";
import ChartJobSeeker from "../pages/dashboard/Chart-JobSeeker.vue";
import ChartUpah from "../pages/dashboard/Chart-Upah.vue";
import ChartLoker from "../pages/dashboard/Chart-Loker.vue";
import ChartPengangguran from "../pages/dashboard/Chart-Pengangguran.vue";
import DataGabungan from "../pages/gabungan/Gabungan.vue";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/landing-page",
    name: "Landing",
    component: Landing,
  },
  {
    path: "/upah-minimum",
    name: "UpahMinimum",
    component: UpahMinimum,
  },
  {
    path: "/pengangguran-terbuka",
    name: "PengangguranTerbuka",
    component: PengangguranTerbuka,
  },
  {
    path: "/registered-job-seeker",
    name: "PencariKerjaTerdaftar",
    component: JobSeeker,
  },
  {
    path: "/jum-loker",
    name: "JumlahLowonganKerja",
    component: jumLoker,
  },
  {
    path: "/edit-upah/:id",
    name: "EditUpah",
    component: EditUpah,
  },
  {
    path: "/add-upah",
    name: "AddUpah",
    component: AddUpah,
  },
  {
    path: "/edit-loker/:id",
    name: "EditLoker",
    component: EditLoker,
  },
  {
    path: "/add-pengangguran",
    name: "AddPengangguran",
    component: AddPengangguran,
  },
  {
    path: "/edit-pengangguran/:id",
    name: "EditPenganguran",
    component: EditPengangguran,
  },
  {
    path: "/add-loker",
    name: "AddLoker",
    component: AddLoker,
  },
  {
    path: "/edit-jobseeker/:id",
    name: "EditJobseeker",
    component: EditJobseeker,
  },
  {
    path: "/add-jobseeker",
    name: "AddJobSeeker",
    component: AddJobSeeker,
  },
  {
    path: "/stats-upah",
    name: "StatsUpah",
    component: StatsUpah,
  },
  {
    path: '/chart-registered-jobseeker',
    name: 'ChartJobSeeker',
    component: ChartJobSeeker,
  },
  {
      path: '/chart-upah-minimum',
      name: 'ChartUpah',
      component: ChartUpah,
  },
  {
      path: '/chart-loker',
      name: 'ChartLoker',
      component: ChartLoker,
  },
  {
      path: '/chart-pengangguran-terbuka',
      name: 'ChartPengangguranTerbuka',
      component: ChartPengangguran,
  },
  {
    path: "/stats-loker",
    name: "StatsLoker",
    component: StatsLoker,
  },
  {
    path: "/stats-jobseeker",
    name: "StatsJobSeeker",
    component: StatsJobSeeker,
  },
  {
    path: "/stats-pengangguran",
    name: "StatsPengangguran",
    component: StatsPengangguran,
  },
  {
    path: "/data-gabungan",
    name: "DataGabungan",
    component: DataGabungan,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
