<script>
import NavbarDashboard from "../../components/NavbarDashboard.vue";
import Footer from "../../components/Footer.vue";
import axios from "axios";

export default {
  name: "StatsJobSeeker",
  data() {
    return {
      dataTotal: [],
      dataRataRata:[],
      dataTinggiRendah: [],
    };
  },
  async mounted() {
    try {
      const totalResponse = await axios.get("http://localhost:5001/api/jobseeker/total");
      console.log("Total Data fetched:", totalResponse.data); // Periksa data yang diterima
      this.dataTotal = totalResponse.data;
      console.log("Data set to dataTotal:", this.dataTotal); // Periksa data yang disimpan

      const totalRataRata = await axios.get("http://localhost:5001/api/jobseeker/rata-rata");
      console.log("Total Data fetched:", totalRataRata.data); // Periksa data yang diterima
      this.dataRataRata = totalRataRata.data;
      console.log("Data set to dataRataRata:", this.dataRataRata); // Periksa data yang disimpan

      const totalTinggiRendah = await axios.get("http://localhost:5001/api/jobseeker/tertinggi-terendah");
      console.log("Total Data fetched:", totalTinggiRendah.data); // Periksa data yang diterima
      this.dataTinggiRendah = totalTinggiRendah.data;
      console.log("Data set to dataTinggiRendah:", this.dataTinggiRendah); // Periksa data yang disimpan

    } catch (error) {
      console.error("Error fetching data:", error);
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
          Statistik Pencari Kerja
        </h2>
        <p class="mt-4 text-gray-500 sm:text-xl">
          Statistik tahunan pencari kerja berdasarkan data yang tersedia.
        </p>
      </div>

      <div class="mt-6">
        <h3 class="font-bold text-gray-900">TOTAL PENCARI KERJA PER TAHUN</h3>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="(item, index) in dataTotal" :key="index" class="flex flex-col rounded-lg bg-blue-100 px-4 py-4 text-center">
            <h3 class="text-lg font-medium text-gray-500">
              Total Pencari Kerja Tahun {{ item._id }}
            </h3>
            <p class="text-2xl font-extrabold text-blue-600 ">
              {{ item.totalPencariKerja }}
            </p>
          </div>
        </div>
      </div>

      <div class="mt-6">
        <h3 class="font-bold text-gray-900">RATA-RATA PENCARI KERJA PER TAHUN</h3>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="(item, index) in dataRataRata" :key="index" class="flex flex-col rounded-lg bg-blue-100 px-4 py-4 text-center">
            <h3 class="text-lg font-medium text-gray-500">
              Rata-Rata Tahun {{ item._id }}
            </h3>
            <p class="text-2xl font-extrabold text-blue-600 ">
              {{ item.rataRataTahun.toFixed(2) }}
            </p>
          </div>
        </div>
      </div>

      <div class="mt-6">
        <h3 class="font-bold text-gray-900">JUMLAH PENCARI KERJA TERTINGGI PER TAHUN</h3>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="(item, index) in dataTinggiRendah" :key="index" class="flex flex-col rounded-lg bg-blue-100 px-4 py-4 text-center">
            <h3 class="text-lg font-medium text-gray-500">
              Tahun {{ item._id }}
            </h3>
            <h2 class="text-lg font-medium text-gray-500">
              {{ item.tertinggiData.nama_kabupaten_kota }}
            </h2>
            <p class="text-2xl font-extrabold text-blue-600 ">
              {{ item.tertinggi }}
            </p>            
          </div>
        </div>
      </div>

      <div class="mt-6">
        <h3 class="font-bold text-gray-900">JUMLAH PENCARI KERJA TERENDAH PER TAHUN</h3>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="(item, index) in dataTinggiRendah" :key="index" class="flex flex-col rounded-lg bg-blue-100 px-4 py-4 text-center">
            <h3 class="text-lg font-medium text-gray-500">
              Tahun {{ item._id }}
            </h3>
            <h2 class="text-lg font-medium text-gray-500">
              {{ item.terendahData.nama_kabupaten_kota }}
            </h2>
            <p class="text-2xl font-extrabold text-blue-600 ">
              {{ item.terendah }}
            </p>            
          </div>
        </div>
      </div>

    </div>
    <Footer/>
  </template>