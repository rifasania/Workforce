<script>
import NavbarDashboard from "../../components/NavbarDashboard.vue";
import Footer from "../../components/Footer.vue";
import axios from "axios";

export default {
  name: "UpahMinimum",
  data() {
    return {
      upahminimum: [],
      filteredUpah: [],
      searchTerm: "",
      limit: "ALL", // Default limit
      currentPage: 1,
      totalPages: 1,
    };
  },
  async mounted() {
    try {
      const response = await axios.get("http://localhost:5001/api/upah");
      console.log(response.data); // Periksa apakah data sudah benar
      this.upahminimum = response.data;
      this.filteredUpah = response.data; 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  methods: {
    async deleteItem(id) {
      const confirmed = window.confirm(
        "Are you sure you want to delete this item?"
      );
      if (confirmed) {
        try {
          await axios.delete(`http://localhost:5001/api/upah/${id}`);
          this.upahminimum = this.upahminimum.filter((item) => item._id !== id);

          location.reload();
          alert("Item deleted successfully!");
        } catch (error) {
          console.error("Error deleting data:", error);
          alert("Failed to delete the item. Please try again.");
        }
      }
    },
    handleSearch() {
      this.filteredUpah = this.upahminimum.filter(upahminimum => {
        const searchLower = this.searchTerm.toLowerCase();
        return (
          upahminimum.nama_provinsi.toLowerCase().includes(searchLower) || 
          upahminimum.nama_kabupaten_kota.toLowerCase().includes(searchLower) ||
          upahminimum.besaran_upah_minimum.toLowerCase().includes(searchLower) ||
          upahminimum.satuan.toLowerCase().includes(searchLower) ||
          upahminimum.tahun.toString().toLowerCase().includes(searchLower)
        );
      });
      this.updatePagination();
    },
    updatePagination() {
      this.totalPages =
        this.limit === "ALL" ? 1 : Math.ceil(this.filteredUpah.length / this.limit);
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
  computed: {
    paginatedUpah() {
      if (this.limit === "ALL") {
        return this.filteredUpah;
      }
      const start = (this.currentPage - 1) * this.limit;
      const end = start + this.limit;
      return this.filteredUpah.slice(start, end);
    },
    totalPages() {
      if (this.limit === 'ALL') {
        return 1;
      }
      return Math.ceil(this.filteredUpah.length / this.limit);
    },
  },
  components: {
    NavbarDashboard,    
    Footer
  },
};
</script>

<template>
  <NavbarDashboard />
  <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
    <h1 class="text-xl font-bold text-center">
        DAFTAR UPAH MINIMUM
      </h1>
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
      
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
            
            <router-link
              to="/add-upah"
              type="button"
              class="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
              <svg
                class="h-5 w-5 mr-2"
                fill="currentColor"
                viewbox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                />
              </svg>
              Add Data
            </router-link>
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <table
            class="w-full text-sm text-center text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-4 py-3">No</th>
                <th scope="col" class="px-4 py-3">Nama Provinsi</th>
                <th scope="col" class="px-4 py-3">Nama Kabupaten/Kota</th>
                <th scope="col" class="px-4 py-3">Upah Minimum</th>
                <th scope="col" class="px-4 py-3">Satuan</th>
                <th scope="col" class="px-4 py-3">Tahun</th>
                <th scope="col" class="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody v-if="paginatedUpah.length">
              <tr
                v-for="(item, index) in paginatedUpah"
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
                  {{ item.nama_provinsi }}
                </th>
                <td class="px-4 py-3">{{ item.nama_kabupaten_kota }}</td>
                <td class="px-4 py-3">{{ item.besaran_upah_minimum }}</td>
                <td class="px-4 py-3">{{ item.satuan }}</td>
                <td class="px-4 py-3">{{ item.tahun }}</td>
                <td class="flex justify-center items-center gap-2">
                  <!-- Edit Button -->
                  <router-link
                    :to="`/edit-upah/${item._id}`"
                    type="button"
                    class="text-blue-600 inline-flex items-center hover:text-white border border-blue-600 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-900"
                  >
                    <svg
                      class="w-5 h-5 mr-1 -ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.414 2.586a2 2 0 00-2.828 0L4 13.172V16h2.828l10.586-10.586a2 2 0 000-2.828zM5 15H4v-1l9.172-9.172 1 1L5 15z"
                      />
                    </svg>
                    Edit
                  </router-link>

                  <!-- Delete Button -->
                  <button
                    type="button"
                    class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    @click="deleteItem(item._id)"
                  >
                    <svg
                      class="w-5 h-5 mr-1 -ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
            <tr v-else>
              <td colspan="6" class="text-center">No data available</td>
            </tr>
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
