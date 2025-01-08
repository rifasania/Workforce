<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Chart 1: Jumlah Pencari Kerja
const chart1Series = ref([]);
const chart1Options = ref({
  chart: {
    height: 350,
    type: 'bar',
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent'],
  },
  xaxis: {
    categories: [], // Nama kabupaten/kota akan diisi di sini
    labels: {
      rotate: -45,
      style: {
        fontSize: '12px',
        colors: '#008FFB',
      },
    },
  },
  yaxis: {
    title: {
      text: 'Jumlah Pencari Kerja',
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    x: {
      formatter: function (val, opts) {
        return opts.w.globals.labels[opts.dataPointIndex];
      },
    },
    y: {
      formatter: function (val) {
        return val + ' orang';
      },
    },
  },
});

// Chart 2, 3, 4: Dummy Data
const chart2Series = ref([
  { name: 'Dummy Data', data: [10, 20, 30, 40, 50] },
]);
const chart2Options = ref({
  chart: {
    height: 350,
    type: 'bar',
  },
  xaxis: {
    categories: ['A', 'B', 'C', 'D', 'E'],
  },
});

const chart3Series = ref([
  { name: 'Dummy Data', data: [15, 25, 35, 45, 55] },
]);
const chart3Options = ref({
  chart: {
    height: 350,
    type: 'bar',
  },
  xaxis: {
    categories: ['X', 'Y', 'Z', 'W', 'V'],
  },
});

const chart4Series = ref([
  { name: 'Dummy Data', data: [5, 15, 25, 35, 45] },
]);
const chart4Options = ref({
  chart: {
    height: 350,
    type: 'bar',
  },
  xaxis: {
    categories: ['P', 'Q', 'R', 'S', 'T'],
  },
});

// Fetch data for Chart 1
const fetchChart1Data = async () => {
  try {
    const response = await axios.get('http://localhost:5001/api/jobseeker');
    const data = response.data;

    // Kelompokkan data berdasarkan tahun
    const groupedByYear = data.reduce((acc, item) => {
      if (!acc[item.tahun]) acc[item.tahun] = [];
      acc[item.tahun].push(item);
      return acc;
    }, {});

    // Ambil daftar nama kabupaten/kota unik
    const categories = [...new Set(data.map((item) => item.nama_kabupaten_kota))];

    // Buat seri berdasarkan tahun
    const series = Object.keys(groupedByYear).map((year) => {
      const yearData = groupedByYear[year];
      const dataPerCity = categories.map((city) => {
        const cityData = yearData.find(
          (item) => item.nama_kabupaten_kota === city
        );
        return cityData ? cityData.jumlah_pencari_kerja : 0;
      });

      return {
        name: `Tahun ${year}`,
        data: dataPerCity,
      };
    });

    // Update chart options dan data
    chart1Options.value.xaxis.categories = categories;
    chart1Series.value = series;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Fetch data on mount
onMounted(() => {
  fetchChart1Data();
});
</script>

<script>
import NavbarDashboard from "../../components/NavbarDashboard.vue";
import Footer from "../../components/Footer.vue";
  
  
  export default {
    name: "Dashboard",
    components: {
      NavbarDashboard,
      Footer,
      
    },    
  };
</script>

<template>
  <div id="dashboard" class="flex">
    <NavbarDashboard />
  </div>
  <div class="flex flex-col gap-10 p-10 bg-gray-100">
    <h1 class="text-3xl font-semibold text-gray-800 mb-6">
      Dashboard: Belum Jadi
    </h1>

    <div class="grid grid-cols-2 gap-8">
      <!-- Chart 1 -->
      <div class="bg-white p-6 rounded-xl shadow-lg">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">
          Chart 1: Jumlah Pencari Kerja
        </h2>
        <apexchart type="bar" :series="chart1Series" :options="chart1Options" />
      </div>

      <!-- Chart 2 -->
      <div class="bg-white p-6 rounded-xl shadow-lg">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">
          Chart 2: Dummy Data
        </h2>
        <apexchart type="bar" :series="chart2Series" :options="chart2Options" />
      </div>

      <!-- Chart 3 -->
      <div class="bg-white p-6 rounded-xl shadow-lg">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">
          Chart 3: Dummy Data
        </h2>
        <apexchart type="bar" :series="chart3Series" :options="chart3Options" />
      </div>

      <!-- Chart 4 -->
      <div class="bg-white p-6 rounded-xl shadow-lg">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">
          Chart 4: Dummy Data
        </h2>
        <apexchart type="bar" :series="chart4Series" :options="chart4Options" />
      </div>
    </div>
  </div>
  <Footer/>
</template>
