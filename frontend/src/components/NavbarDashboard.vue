<template>
    <header class="w-full">
  <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
      <div class="flex flex-wrap justify-between items-center">
          <div class="flex justify-start items-center">
              
              <button aria-expanded="true" aria-controls="sidebar" class="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <svg class="w-[18px] h-[18px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/></svg>
                <span class="sr-only">Toggle sidebar</span>
              </button>
              <a href="https://flowbite.com" class="flex mr-4">
                <img src="../assets/jw.png" class="mr-3 h-8" alt="FlowBite Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Jabar Workforce</span>
              </a>
              <div class="hidden justify-between items-left w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">  
                    <li>
                        <router-link to="/" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Dashboard</router-link>
                    </li>
                    <li class="relative group">
                        <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Data Jabar</a>
                        <!-- Submenu -->
                        <ul class="absolute left-0 z-10 hidden w-48 bg-white border border-gray-100 rounded-lg shadow-lg group-hover:block">
                            <li>
                                <router-link to="/jum-loker" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Jumlah Lowongan Kerja</router-link>
                            </li>  
                            <li>
                                <router-link to="/upah-minimum" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Daftar Upah Minimum</router-link>
                            </li>    
                            <li>
                                <router-link to="/pengangguran-terbuka" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Pengangguran Terbuka</router-link>
                            </li>  
                            <li>
                                <router-link to="/registered-job-seeker" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Jumlah Pencari Kerja Terdaftar</router-link>
                            </li>                                                  
                        </ul>
                    </li>                                      
                    <li class="relative group">
                        <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Statistik</a>
                        <!-- Submenu -->
                        <ul class="absolute left-0 z-10 hidden w-48 bg-white border border-gray-100 rounded-lg shadow-lg group-hover:block">
                            <li>
                                <router-link to="/stats-loker" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Statistik Lowongan Kerja</router-link>
                            </li>  
                            <li>
                                <router-link to="/stats-upah" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Statistik Upah Minimum</router-link>
                            </li>    
                            <li>
                                <router-link to="/stats-pengangguran" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Statistik Pengangguran Terbuka</router-link>
                            </li>  
                            <li>
                                <router-link to="/stats-jobseeker" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Statistik Pencari Kerja Terdaftar</router-link>
                            </li>                                                  
                        </ul>
                    </li>     
                    <li>
                        <router-link to="/data-gabungan" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Data Gabungan</router-link>
                    </li>
                </ul>
            </div>
            </div>
          <div class="flex items-center lg:order-2">
              
              <span >Kelompok 11</span>
              <button type="button" class="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="dropdown">
                  <span class="sr-only">Open user menu</span>
                  <img class="w-8 h-8 rounded-full" src="https://thumbs.dreamstime.com/b/teamwork-community-connection-logo-group-people-symmetrical-interlaced-48850102.jpg" alt="user photo"  >
              </button>
              <!-- Dropdown menu -->
              <div class="hidden z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown">
                  <div class="py-3 px-4">
                      <span class="block text-sm font-semibold text-gray-900 dark:text-white">Anggota Kelompok :</span>
                  </div>
                  <ul class="py-1 text-gray-500 dark:text-gray-400" aria-labelledby="dropdown">
                      <li>
                          <a href="#" class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">2202046 Nurainun </a>
                      </li>
                      <li>
                          <a href="#" class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">2206697 Rifa Sania </a>
                      </li>
                      <li>
                          <a href="#" class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">2207186 Salma Ghaida </a>
                      </li>
                      <li >
                          <a href="#" class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">2202014 Siti Rija Dana P </a>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
  </nav>  
</header>
</template>