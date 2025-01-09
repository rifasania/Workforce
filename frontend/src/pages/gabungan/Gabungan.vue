<script>
import NavbarDashboard from "../../components/NavbarDashboard.vue";
import Footer from "../../components/Footer.vue";
import axios from "axios";

export default {
  name: "DataGabungan",
  data() {
    return {
      combinedData: [], // Data gabungan dari API
      loading: true,    // Indikator loading
      error: null,      // Pesan error
      filteredGabungan: [],
      searchTerm: "",
      limit: "ALL", // Default limit
      currentPage: 1,
      totalPages: 1,
    };
  },
  methods: {
    async fetchCombinedData() {
      try {
        const response = await axios.get("http://localhost:5001/api/upah/datagabungan"); // Sesuaikan endpoint
        this.combinedData = response.data;
        this.filteredGabungan = response.data;
        this.loading = false;
      } catch (error) {
        console.error("Error fetching combined data:", error);
        this.error = "Gagal memuat data.";
        this.loading = false;
      }
    },
    handleSearch() {
      this.filteredGabungan = this.combinedData.filter(combinedData => {
        const searchLower = this.searchTerm.toLowerCase();
        return (
          combinedData.nama_kabupaten_kota.toLowerCase().includes(searchLower) || 
          combinedData.upahMinimum.toLowerCase().includes(searchLower) ||
          combinedData.tahun.toString().toLowerCase().includes(searchLower)
        );
      });
      this.updatePagination();
    },
    updatePagination() {
      this.totalPages =
        this.limit === "ALL" ? 1 : Math.ceil(this.filteredGabungan.length / this.limit);
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
    },
    changeLimit(newLimit) {
      this.limit = newLimit === "ALL" ? "ALL" : parseInt(newLimit);
      this.currentPage = 1;
      this.updatePagination();
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
  mounted() {
    this.fetchCombinedData(); // Fetch data saat komponen dimuat
  },
  computed: {
    paginatedGabungan() {
      if (this.limit === "ALL") {
        return this.filteredGabungan;
      }
      const start = (this.currentPage - 1) * this.limit;
      const end = start + this.limit;
      return this.filteredGabungan.slice(start, end);
    },
    totalPages() {
      if (this.limit === 'ALL') {
        return 1;
      }
      return Math.ceil(this.filteredGabungan.length / this.limit);
    },
  },
  components: {
    NavbarDashboard,
    Footer,
  },
};
</script>

<template>
  <NavbarDashboard />
  <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
    <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">
          Data Gabungan Statistik
        </h2>
        <p class="mt-4 text-gray-500 sm:text-xl">
          Tabel data gabungan berdasarkan kabupaten/kota dan tahun.
        </p>
      </div>
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">

      <!-- Loading Indicator -->
      <div v-if="loading" class="text-center mt-8">
        <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
        <p class="text-gray-600 mt-2">Memuat data...</p>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="text-center mt-8 text-red-600">
        <p>{{ error }}</p>
      </div>
      
      <!-- Start coding here -->
      <div
        class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden"
      >
        <div
          class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4"
        >
          <div class="w-full md:w-1/2">
            <form class="flex items-center">
              <label for="simple-search" class="sr-only">Search</label>
              <div class="relative w-full">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewbox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  v-model="searchTerm"
                  @input="handleSearch"
                  type="text"
                  placeholder="Cari berdasarkan Kabupaten/Kota atau Tahun"                    
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"

                />
              </div>
            </form>
          </div>
          <div
            class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
          >          

          <div class="flex items-center space-x-2">
            <span>Show:</span>
            <select
              v-model="limit"
              @change="changeLimit($event.target.value)"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
              <option value="ALL">All</option>
            </select>
          </div>
            
          </div>
        </div>
        
        <div v-if="!loading && !error" class="overflow-x-auto">
          <table
            class="w-full text-sm text-center text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-4 py-3">No</th>
                <th scope="col" class="px-4 py-3">Nama Kabupaten/Kota</th>
                <th scope="col" class="px-4 py-3">Tahun</th>
                <th scope="col" class="px-4 py-3">Upah Minimum</th>
                <th scope="col" class="px-4 py-3">Lowongan Kerja</th>
                <th scope="col" class="px-4 py-3">Pencari Kerja</th>
              </tr>
            </thead>
            <tbody >
              <tr
              v-for="(item, index) in paginatedGabungan" 
              :key="index" 
                class="border-b dark:border-gray-700"
              >
                <td class="px-4 py-3">
                  {{ limit === 'ALL' ? index + 1 : (currentPage - 1) * limit + index + 1 }}
                </td>  
                <th
                  scope="row"
                  class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                {{ item.nama_kabupaten_kota }}
                </th>
                <td class="px-4 py-3">{{ item.tahun }}</td>
                <td class="px-4 py-3">{{ item.upahMinimum || '-' }}</td>
                <td class="px-4 py-3">{{ item.lowonganKerja || '-' }}</td>
                <td class="px-4 py-3">{{ item.jobSeeker || '-' }}</td>
                
              </tr>
            </tbody>
            
          </table>
        </div>
        <div class="flex items-center space-x-2">
          <button
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
            class="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button
            :disabled="currentPage === totalPages"
            @click="changePage(currentPage + 1)"
            class="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </section>
  <Footer/>
</template>
