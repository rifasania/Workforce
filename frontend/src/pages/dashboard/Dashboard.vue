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

const chart2Series = ref([]);
const chart2Options = ref({
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
      text: 'Jumlah Lowongan Kerja',
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
        return val + ' lowongan';
      },
    },
  },
});

const chart3Series = ref([]);
const chart3Options = ref({
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
      text: 'Besaran Upah Minimum',
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
        return val + ' rupiah';
      },
    },
  },
});

const chart4Series = ref([]);
const chart4Options = ref({
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
      text: 'Tingkat Pengangguran Terbuka',
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
        return val + ' persen';
      },
    },
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


// Fetch data for Chart 2
const fetchChart2Data = async () => {
  try {
    const response = await axios.get('http://localhost:5001/api/loker');
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
        return cityData ? cityData.jumlah_lowongan_kerja : 0;
      });

      return {
        name: `Tahun ${year}`,
        data: dataPerCity,
      };
    });

    // Update chart options dan data
    chart2Options.value.xaxis.categories = categories;
    chart2Series.value = series;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const fetchChart3Data = async () => {
  try {
      const response = await axios.get('http://localhost:5001/api/upah');
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
          return cityData ? cityData.besaran_upah_minimum : 0;
        });
  
        return {
          name: `Tahun ${year}`,
          data: dataPerCity,
        };
      });
  
      console.log('Categories:', categories);
      console.log('Series:', series);
  
      // Update chart options dan data
      
    chart3Options.value.xaxis.categories = categories;
    chart3Series.value = series;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchChart4Data = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/pengangguran');
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
          return cityData ? cityData.tingkat_pengangguran_terbuka : 0;
        });
  
        return {
          name: `Tahun ${year}`,
          data: dataPerCity,
        };
      });
  
      console.log('Categories:', categories);
      console.log('Series:', series);
  
      // Update chart options dan data
      
    chart4Options.value.xaxis.categories = categories;
    chart4Series.value = series;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


// Fetch data on mount
onMounted(() => {
  fetchChart1Data();
  fetchChart2Data();
  fetchChart3Data();
  fetchChart4Data();
});
</script>

<script>
import NavbarDashboard from "../../components/NavbarDashboard.vue";
import Footer from "../../components/Footer.vue";
import { RouterLink } from 'vue-router';
  
  
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
    <!-- <h1 class="text-3xl font-semibold text-gray-800 mb-6">
      Dashboard
    </h1> -->

    <div class="flex flex-col gap-10">
      <!-- Chart 1 -->
      <div class="flex items-start gap-6">
        <div class="flex-1">
          <h2 class="text-xl font-semibold text-gray-700 mb-2">
            Jumlah Pencari Kerja Terdaftar
          </h2>
          <p class="text-gray-600 mb-4">
            Menampilkan data jumlah pencari kerja di Jawa Barat berdasarkan kabupaten/kota tiap tahun.
          </p>
          <button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            <RouterLink to="/chart-registered-jobseeker" class="text-white">Full Screen View</RouterLink>
          </button>
        </div>
        <div class="flex-1 bg-white p-6 rounded-xl shadow-lg">
          <apexchart type="bar" :series="chart1Series" :options="chart1Options" />
        </div>
      </div>

      <!-- Chart 2 -->
      <div class="flex items-start gap-6">
        <div class="flex-1">
          <h2 class="text-xl font-semibold text-gray-700 mb-2">
            Jumlah Lowongan Kerja
          </h2>
          <p class="text-gray-600 mb-4">
            Menampilkan data jumlah lowongan kerja di Jawa Barat berdasarkan kabupaten/kota tiap tahun
          </p>
          <button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            
            <RouterLink to="/chart-loker" class="text-white">Full Screen View</RouterLink>
          
          </button>
        </div>
        <div class="flex-1 bg-white p-6 rounded-xl shadow-lg">
          <apexchart type="bar" :series="chart2Series" :options="chart2Options" />
        </div>
      </div>

      <!-- Chart 3 -->
      <div class="flex items-start gap-6">
        <div class="flex-1">
          <h2 class="text-xl font-semibold text-gray-700 mb-2">
            Besaran Upah Minimum
          </h2>
          <p class="text-gray-600 mb-4">
            Menampilkan data besaran upah minimum di Jawa Barat berdasarkan kabupaten/kota tiap tahun
          </p>
          <button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            
            <RouterLink to="/chart-upah-minimum" class="text-white">Full Screen View</RouterLink>
          
          </button>
        </div>
        <div class="flex-1 bg-white p-6 rounded-xl shadow-lg">
          <apexchart type="bar" :series="chart3Series" :options="chart3Options" />
        </div>
      </div>

      <!-- Chart 4 -->
      <div class="flex items-start gap-6">
        <div class="flex-1">
          <h2 class="text-xl font-semibold text-gray-700 mb-2">
            Tingkat Pengangguran Terbuka
          </h2>
          <p class="text-gray-600 mb-4">
            Menampilkan data tingkat pengangguran terbuka di Jawa Barat berdasarkan kabupaten/kota tiap tahun
          </p>
          <button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            
            <RouterLink to="/chart-pengangguran-terbuka" class="text-white">Full Screen View</RouterLink>
          
          </button>
        </div>
        <div class="flex-1 bg-white p-6 rounded-xl shadow-lg">
          <apexchart type="bar" :series="chart4Series" :options="chart4Options" />
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>
