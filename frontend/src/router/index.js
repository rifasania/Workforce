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

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/",
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
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
