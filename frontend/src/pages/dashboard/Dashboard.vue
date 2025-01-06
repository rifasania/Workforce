<script>
// 
import NavbarDashboard from "../../components/NavbarDashboard.vue";
import SideNavDashboard from "../../components/SideNavDashboard.vue";
  
  
  export default {
    name: "Dashboard",
    components: {
      NavbarDashboard,
      SideNavDashboard,
      
    },    
  };
  </script>

<template>
    <div id="dashboard" class="flex">
      <NavbarDashboard/>
      
      <SideNavDashboard/>

      
      
      
    </div>
  </template>
  
