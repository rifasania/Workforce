<script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import NavbarDashboard from '../../components/NavbarDashboard.vue';
  
  const barChartSeries = ref([]);
  const barChartOptions = ref({
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
        rotate: -45, // Memutar label agar tidak saling tumpang tindih
        style: {
          fontSize: '12px',
          //warna biru
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
          return val + ' rupiah';
        },
      },
    },
  });
  
  const fetchData = async () => {
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
  
      console.log('Categories:', categories);
      console.log('Series:', series);
  
      // Update chart options dan data
      barChartOptions.value.xaxis.categories = categories;
      barChartSeries.value = series;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  // Memanggil fetchData saat komponen dimuat
  onMounted(fetchData);

</script>
<script>
export default {
  components: {
    NavbarDashboard,
  },
};

</script>


<template>
    <div id="dashboard" class="flex">
      <NavbarDashboard/>
    </div>
    <div class="flex flex-col gap-10 p-10 bg-gray-100">
        <h1 class="text-3xl font-semibold text-gray-800">Chart Jumlah Lowongan Pekerjaan Tiap Kota/ Kabupaten</h1>
        <div class="w-100 bg-white p-8 rounded-xl p-4 shadow-lg">
            <apexchart type="bar" :series="barChartSeries" :options="barChartOptions" />
    
        </div>
    </div>
</template>