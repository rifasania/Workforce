<template>
  <div class="landing">
    <Navbar/>
    <Hero />
    <About />
    <Features />
    <Team />
    <Quotes />
    
    <Footer />
  </div>
</template>

<script>
import Navbar from "../../components/Navbar.vue";
// import NavbarA from "../../components/NavbarA.vue";
import Footer from "../../components/Footer.vue";
import Hero from "./Hero.vue";


import axios from "axios";
import About from "./About.vue";
import Features from "./Features.vue";
import Quotes from "./Quotes.vue";
import Team from "./Team.vue"; 


export default {
  name: "Landing",
  components: {
    Navbar,
    
    Hero,
    About,
    Features,
    Team,
    Quotes,
    
    Footer
  },
  data() {
    return {
      isLoggedIn: false,
    };
  },
    created() {
    const userInfo = localStorage.getItem("userInfo");
    this.isLoggedIn = !!userInfo;
  },
  methods: {
    async logout() {
      try {
        await axios.post("http://localhost:5000/api/users/logout", {}, { withCredentials: true });
        localStorage.removeItem("userInfo");
        this.isLoggedIn = false;
      } catch (error) {
        console.error("Logout failed", error);
      }
    },
  },
};
</script>