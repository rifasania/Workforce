<script>
import axios from "axios";

export default {
  name: "StatsUpah",
  data() {
    return {
      dataAggregasi: [],
    };
  },
  methods: {
    async fetchAggregatedData() {
      try {
        const response = await axios.get("http://localhost:5001/api/upah/aggregated");
        this.dataAggregasi = response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(value);
    },
  },
  mounted() {
    this.fetchAggregatedData();
  },
};
</script>


<template>
    <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">
          Statistik Upah Minimum
        </h2>
        <p class="mt-4 text-gray-500 sm:text-xl">
          Statistik tahunan upah minimum berdasarkan data yang tersedia.
        </p>
      </div>
  
      <dl v-for="(item, index) in dataAggregasi" :key="index" class="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
        <div class="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
          <dt class="order-last text-lg font-medium text-gray-500">
            Total Besaran Upah Tahun {{ item._id }}
          </dt>
          <dd class="text-4xl font-extrabold text-blue-600 md:text-5xl">
            {{ formatCurrency(item.totalUpahMinimum) }}
          </dd>
        </div>
        <div class="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
          <dt class="order-last text-lg font-medium text-gray-500">
            Rata-Rata Upah Tahun {{ item._id }}
          </dt>
          <dd class="text-4xl font-extrabold text-blue-600 md:text-5xl">
            {{ formatCurrency(item.rataRataUpahMinimum) }}
          </dd>
        </div>
        <div class="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
          <dt class="order-last text-lg font-medium text-gray-500">
            Tertinggi ({{ item.tertinggiData[0]?.nama_kabupaten_kota || "-" }})
          </dt>
          <dd class="text-4xl font-extrabold text-blue-600 md:text-5xl">
            {{ formatCurrency(item.tertinggi) }}
          </dd>
        </div>
        <div class="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
          <dt class="order-last text-lg font-medium text-gray-500">
            Terendah ({{ item.terendahData[0]?.nama_kabupaten_kota || "-" }})
          </dt>
          <dd class="text-4xl font-extrabold text-blue-600 md:text-5xl">
            {{ formatCurrency(item.terendah) }}
          </dd>
        </div>
      </dl>
    </div>
  </template>
  