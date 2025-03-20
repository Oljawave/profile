<template>
    <div class="gallery">
      <div class="header">
        <Icon icon="lets-icons:expand-left-light" width="24" height="24" class="back-icon" @click="goBack" />
        <h1>Gallery</h1>
      </div>
  
      <div class="image-list">
        <div v-for="(item, index) in images" :key="index" class="image-item" @click="goToPage(item.route)">
          <img :src="item.src" :alt="item.title" />
        </div>
      </div>
  
      <button v-show="showScrollTop" class="scroll-top-btn" @click="scrollToTop">
        <Icon icon="lets-icons:expand-up-light" width="24" height="24" />
      </button>
    </div>
  </template>
  
  <script>
  import { Icon } from "@iconify/vue";
  
  export default {
    components: { Icon },
    data() {
      const baseURL = import.meta.env.BASE_URL;
  
      return {
        images: [
          { src: `${baseURL}malaysia.jpg`, title: "Kuala Lumpur", route: "/malaysia" },
          { src: `${baseURL}almaty.jpg`, title: "Almaty", route: "/almaty" },
          { src: `${baseURL}losangeles.jpg`, title: "Los Angeles", route: "/losangeles" },
          { src: `${baseURL}denpasar.jpg`, title: "Bali", route: "/bali" },
          { src: `${baseURL}newyork.jpg`, title: "New-York", route: "/nyc" },
          { src: `${baseURL}baku.jpg`, title: "Baku", route: "/baku" },
          { src: `${baseURL}astana.jpg`, title: "Astana", route: "/astana" },
          { src: `${baseURL}dubai.jpg`, title: "Dubai", route: "/dubai" },
          { src: `${baseURL}arizona.jpg`, title: "Arizona", route: "/arizona" },
          { src: `${baseURL}washington.jpg`, title: "Washington", route: "/washington" },
          { src: `${baseURL}turkiye.jpg`, title: "Istanbul", route: "/istanbul" },
          { src: `${baseURL}burabay.jpg`, title: "Burabay", route: "/burabay" },
          { src: `${baseURL}tbilisi.jpg`, title: "Tbilisi", route: "/tbilisi" },
          { src: `${baseURL}abudhabi.jpg`, title: "Abu Dhabi", route: "/abudhabi" },
          { src: `${baseURL}philadelphia.jpg`, title: "Philadelphia", route: "/philadelphia" },
          { src: `${baseURL}oc.jpg`, title: "Ocean City", route: "/oceancity" },
          { src: `${baseURL}sanfrancisco.jpg`, title: "San Francisco", route: "/sanfrancisco" },
          { src: `${baseURL}karaganda.jpg`, title: "Karaganda", route: "/karaganda" },
          { src: `${baseURL}lasvegas.jpg`, title: "Las Vegas", route: "/lasvegas" }
        ],
        showScrollTop: false,
      };
    },
    methods: {
      goToPage(route) {
        sessionStorage.setItem("scrollPosition", window.scrollY);
  
        if (route.startsWith("http")) {
          window.location.href = route;
        } else {
          this.$router.push(route);
        }
      },
      goBack() {
        this.$router.go(-1);
      },
      scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      handleScroll() {
        this.showScrollTop = window.scrollY > 100;
      },
    },
    mounted() {
      window.addEventListener("scroll", this.handleScroll);
  
      const savedScrollY = sessionStorage.getItem("scrollPosition");
      if (savedScrollY) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedScrollY, 10));
        }, 100);
      }
    },
    beforeUnmount() {
      window.removeEventListener("scroll", this.handleScroll);
    },
  };
  </script>
  
  
  <style>
  .gallery {
    text-align: center;
    background: black;
    color: white;
    min-height: 100vh;
    padding: 20px;
  }
  
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    max-width: 400px;
    margin: 0 auto 20px auto;
  }
  
  h1 {
    font-size: 20px;
    font-weight: 400;
    margin: 0;
  }
  
  .back-icon {
    position: absolute;
    left: 0;
    cursor: pointer;
    transition: transform 0.2s ease;
  }
  
  .back-icon:hover {
    transform: scale(1.2);
  }
  
  .image-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 400px;
    margin: 0 auto;
  }
  
  .image-item img {
    width: 100%;
    border-radius: 12px;
    cursor: pointer;
    transition: transform 0.3s ease;
  }
  
  .image-item img:hover {
    transform: scale(1.05);
  }
  
  .scroll-top-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: opacity 0.3s ease, transform 0.3s ease;
    opacity: 0.8;
  }
  
  .scroll-top-btn:hover {
    opacity: 1;
    transform: scale(1.1);
  }
  </style>
  