<script>
import NavbarDashboard from "../../components/NavbarDashboard.vue";
import Footer from "../../components/Footer.vue";
import axios from "axios";

export default {
  name: "AddPengangguran",
  data() {
    return {
      form: {
        kode_provinsi: "",
        nama_provinsi: "",
        kode_kabupaten_kota: "",
        nama_kabupaten_kota: "",
        tingkat_pengangguran_terbuka: "",
        satuan: "",
        tahun: "",
      },
      error: null,
      successMessage: null,
      isLoading: false,
    };
  },
  methods: {
    async handleSubmit() {
      this.error = null;
      this.successMessage = null;
      this.isLoading = true;

      try {
        const response = await axios.post("http://localhost:5001/api/pengangguran", this.form);        
        alert("Data berhasil ditambahkan.");
        this.$router.push("/pengangguran-terbuka");
        this.isLoading = false;

        // Reset form setelah berhasil
        this.form = {
          kode_provinsi: "",
          nama_provinsi: "",
          kode_kabupaten_kota: "",
          nama_kabupaten_kota: "",
          tingkat_pengangguran_terbuka: "",
          satuan: "",
          tahun: "",
        };
      } catch (err) {
        this.error = err.response?.data?.message || "Terjadi kesalahan saat menambahkan data.";
        this.isLoading = false;
      }
    },
  },
  components: {
    NavbarDashboard,
    Footer,
  },
};
</script>

<template>
  <div>
    <NavbarDashboard />
    <section class="bg-white dark:bg-gray-900">
      <div class="max-w-2xl px-4 py-8 mx-auto lg:py-16">
        <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Tambah Data Pengangguran Terbuka</h2>

        <div v-if="error" class="mb-4 text-sm text-red-500">{{ error }}</div>
        <div v-if="successMessage" class="mb-4 text-sm text-green-500">{{ successMessage }}</div>

        <form @submit.prevent="handleSubmit">
          <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
            <div class="w-full">
              <label for="kode_provinsi" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Kode Provinsi
              </label>
              <input
                v-model="form.kode_provinsi"
                id="kode_provinsi"
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>

            <div class="w-full">
              <label for="nama_provinsi" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nama Provinsi
              </label>
              <input
                v-model="form.nama_provinsi"
                id="nama_provinsi"
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>

            <div class="w-full">
              <label for="kode_kabupaten_kota" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Kode Kabupaten/Kota
              </label>
              <input
                v-model="form.kode_kabupaten_kota"
                id="kode_kabupaten_kota"
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>

            <div class="w-full">
              <label for="nama_kabupaten_kota" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nama Kabupaten/Kota
              </label>
              <input
                v-model="form.nama_kabupaten_kota"
                id="nama_kabupaten_kota"
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>

            <div class="sm:col-span-2">
              <label for="tingkat_pengangguran_terbuka" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Tingkat Pengangguran Terbuka
              </label>
              <input
                v-model="form.tingkat_pengangguran_terbuka"
                id="tingkat_pengangguran_terbuka"
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>

            <div class="sm:col-span-2">
              <label for="satuan" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Satuan</label>
              <input
                v-model="form.satuan"
                id="satuan"
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>

            <div class="sm:col-span-2">
              <label for="tahun" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tahun</label>
              <input
                v-model="form.tahun"
                id="tahun"
                type="number"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <button
              type="submit"
              class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Tambah Data
            </button>
            <router-link
              to="/pengangguran-terbuka"
              class="text-gray-900 hover:text-white border border-gray-300 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Cancel
            </router-link>
          </div>
        </form>
      </div>
    </section>
    <Footer />
  </div>
</template>
