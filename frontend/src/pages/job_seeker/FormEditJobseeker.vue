<script>
import NavbarDashboard from "../../components/NavbarDashboard.vue";
import Footer from "../../components/Footer.vue";
import axios from 'axios';

export default {
  name: "EditJobseeker",
  data() {
    return {
      jobseeker: {
        nama_provinsi: "",
        nama_kabupaten_kota: "",
        jumlah_pencari_kerja: "",
        satuan: "",
        tahun: "",
      },
      isLoading: true, // Indikator loading
      error: null, // Menyimpan pesan error jika ada
      kabupatenKotaList: [
        { nama: "KABUPATEN BANDUNG", kode: "3204" },
        { nama: "KABUPATEN BANDUNG BARAT", kode: "3217" },
        { nama: "KABUPATEN BEKASI", kode: "3216" },
        { nama: "KABUPATEN BOGOR", kode: "3201" },
        { nama: "KABUPATEN CIAMIS", kode: "3207" },
        { nama: "KABUPATEN CIANJUR", kode: "3203" },
        { nama: "KABUPATEN CIREBON", kode: "3209" },
        { nama: "KABUPATEN GARUT", kode: "3205" },
        { nama: "KABUPATEN INDRAMAYU", kode: "3212" },
        { nama: "KABUPATEN KARAWANG", kode: "3215" },
        { nama: "KABUPATEN KUNINGAN", kode: "3208" },
        { nama: "KABUPATEN MAJALENGKA", kode: "3210" },
        { nama: "KABUPATEN PANGANDARAN", kode: "3218" },
        { nama: "KABUPATEN PURWAKARTA", kode: "3214" },
        { nama: "KABUPATEN SUBANG", kode: "3213" },
        { nama: "KABUPATEN SUKABUMI", kode: "3202" },
        { nama: "KABUPATEN SUMEDANG", kode: "3211" },
        { nama: "KABUPATEN TASIKMALAYA", kode: "3206" },
        { nama: "KOTA BANDUNG", kode: "3273" },
        { nama: "KOTA BANJAR", kode: "3279" },
        { nama: "KOTA BEKASI", kode: "3275" },
        { nama: "KOTA BOGOR", kode: "3271" },
        { nama: "KOTA CIMAHI", kode: "3277" },
        { nama: "KOTA CIREBON", kode: "3274" },
        { nama: "KOTA DEPOK", kode: "3276" },
        { nama: "KOTA SUKABUMI", kode: "3272" },
        { nama: "KOTA TASIKMALAYA", kode: "3278" },
      ],
    };
  },
  async mounted() {
    const jobseekerId = this.$route.params.id; // Ambil ID dari URL
    try {
      const response = await axios.get(`http://localhost:5001/api/jobseeker/${jobseekerId}`);
      this.jobseeker = response.data;
      this.isLoading = false;
    } catch (error) {
      console.error("Error fetching product details:", error);
      this.error = "Gagal memuat detail produk.";
      this.isLoading = false;
    }
  },
  methods: {
    async updateJobseeker() {
      const jobseekerId = this.$route.params.id;
      try {
        await axios.put(`http://localhost:5001/api/jobseeker/${jobseekerId}`, this.jobseeker);
        alert("Data berhasil diperbarui.");
        this.$router.push("/registered-job-seeker"); // Redirect ke halaman lain setelah update
      } catch (error) {
        console.error("Error updating jobseeker:", error);
        alert("Gagal memperbarui data.");
      }
    },
    updateKodeKabupatenKota() {
      const selected = this.kabupatenKotaList.find(
        (item) => item.nama === this.jobseeker.nama_kabupaten_kota
      );
      this.jobseeker.kode_kabupaten_kota = selected ? selected.kode : "";
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
  <div v-if="isLoading" class="text-center p-8">Memuat detail produk...</div>
  <div v-else-if="error" class="text-center p-8 text-red-500">{{ error }}</div>
  <div v-else>
    <section class="bg-white dark:bg-gray-900">
      <div class="max-w-2xl px-4 py-8 mx-auto lg:py-16">
        <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update Data Pencari Kerja Terdaftar</h2>
        <form @submit.prevent="updateJobseeker">
          <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
            <div class="w-full">
              <label for="kode_provinsi" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kode Provinsi</label>
              <input type="text" id="kode_provinsi" v-model="jobseeker.kode_provinsi" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required disabled/>
            </div>
            <div class="w-full">
              <label for="nama_provinsi" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Provinsi</label>
              <input type="text" id="nama_provinsi" v-model="jobseeker.nama_provinsi" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required disabled/>
            </div>

            <!-- KODE KABUPATEN/KOTA -->
            <div class="w-full">
              <label
                for="kode_kabupaten_kota"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Kode Kabupaten/Kota</label>
              <input
                type="text"
                id="kode_kabupaten_kota"
                v-model="jobseeker.kode_kabupaten_kota"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                disabled
              />
            </div>

            <!-- NAMA KABUPATEN/KOTA -->
            <div class="w-full">
              <label
                for="nama_kabupaten_kota"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Nama Kabupaten/Kota</label>
              <select
                id="nama_kabupaten_kota"
                v-model="jobseeker.nama_kabupaten_kota"
                @change="updateKodeKabupatenKota"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              >
                <option disabled value="">Pilih Kabupaten/Kota</option>
                <option v-for="item in kabupatenKotaList" :key="item.kode" :value="item.nama">
                  {{ item.nama }}
                </option>
              </select>
            </div>


            <div class="sm:col-span-2">
              <label
                for="jumlah_pencari_kerja"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Jumlah Pencari Kerja Terdaftar</label>
              <input
                type="text"
                id="jumlah_pencari_kerja"
                v-model="jobseeker.jumlah_pencari_kerja"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
              />
            </div>
            <div class="sm:col-span-2">
              <label
                for="satuan"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Satuan</label>
              <input
                type="text"
                id="satuan"
                v-model="jobseeker.satuan"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required disabled
              />
            </div>
            <div class="sm:col-span-2">
              <label
                for="tahun"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Tahun</label>
              <input
                type="number"
                id="tahun"
                v-model="jobseeker.tahun"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
              />
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <button
              type="submit"
              class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >Update Data</button>
            <router-link to="/registered-job-seeker" class="text-gray-600 border border-gray-600 hover:bg-gray-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-900">
              Cancel
            </router-link>
          </div>
        </form>
      </div>
    </section>
  </div>
  <Footer />
</template>
