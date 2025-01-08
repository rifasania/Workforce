<script>
import NavbarDashboard from "../../components/NavbarDashboard.vue";
import Footer from "../../components/Footer.vue";
import axios from "axios";

export default {
  name: "StatsUpah",
  data() {
    return {
      dataAggregasi: [],
    };
  },
  async mounted() {
    try {
      const response = await axios.get("http://localhost:5001/api/upah/aggregated");
      console.log("Data fetched:", response.data); // Periksa data yang diterima
      this.dataAggregasi = response.data;
      console.log("Data set to dataAggregasi:", this.dataAggregasi); // Periksa data yang disimpan
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  methods: {
    formatRupiah(angka) {
      if (angka === null || angka === undefined) return "-";
      return "Rp " + Number(angka).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
  },
  components: {
    NavbarDashboard,    
    Footer
  },
};
</script>

<template>
    <NavbarDashboard/>
    <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="text-3xl font-bold text-gray-900 sm:text-2xl">
          Statistik Upah Minimum
        </h2>
        <p class="mt-4 text-gray-500 sm:text-xl">
          Statistik tahunan upah minimum berdasarkan data yang tersedia.
        </p>
      </div>

      <div class="mt-6">
        <h3 class="font-bold text-gray-900">TOTAL BESARAN UPAH PER TAHUN</h3>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="(item, index) in dataAggregasi" :key="index" class="flex flex-col rounded-lg bg-blue-100 px-4 py-4 text-center">
            <h3 class="text-lg font-medium text-gray-500">
              Total Besaran Upah Tahun {{ item._id }}
            </h3>
            <p class="text-2xl font-extrabold text-blue-600 ">
              {{ formatRupiah(item.totalUpahMinimum) }}
            </p>
          </div>
        </div>
      </div>

      <div class="mt-6">
        <h3 class="font-bold text-gray-900">RATA-RATA UPAH PER TAHUN</h3>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="(item, index) in dataAggregasi" :key="index" class="flex flex-col rounded-lg bg-blue-100 px-4 py-4 text-center">
            <h3 class="text-lg font-medium text-gray-500">
              Rata-Rata Upah Tahun {{ item._id }}
            </h3>
            <p class="text-2xl font-extrabold text-blue-600 ">
              {{ formatRupiah(item.rataRataUpahMinimum) }}
            </p>
          </div>
        </div>
      </div>

      <div class="mt-6">
        <h3 class="font-bold text-gray-900">UPAH TERTINGGI PER TAHUN</h3>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="(item, index) in dataAggregasi" :key="index" class="flex flex-col rounded-lg bg-blue-100 px-4 py-4 text-center">
            <h3 class="text-lg font-medium text-gray-500">
              Tertinggi Tahun {{ item._id }}
            </h3>
            <p class="text-2xl font-extrabold text-blue-600 ">
              {{ formatRupiah(item.tertinggi) }}
            </p>
          </div>
        </div>
      </div>

      <div class="mt-6">
        <h3 class="font-bold text-gray-900">UPAH TERENDAH PER TAHUN</h3>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="(item, index) in dataAggregasi" :key="index" class="flex flex-col rounded-lg bg-blue-100 px-4 py-4 text-center">
            <h3 class="text-lg font-medium text-gray-500">
              Terendah Tahun {{ item._id }}
            </h3>
            <p class="text-2xl font-extrabold text-blue-600 ">
              {{ formatRupiah(item.tertinggi) }}
            </p>
          </div>
        </div>
      </div>  
    </div>
    <Footer/>
  </template>