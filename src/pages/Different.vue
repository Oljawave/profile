<template>
    <div class="ratings-page">
      <div class="header">
        <Icon icon="lets-icons:expand-left-light" width="24" height="24" class="back-icon" @click="goBack" />
        <h1>Different</h1>
      </div>
  
      <div class="ratings-list">
        <div v-for="(rating, index) in ratings" :key="index" class="rating-card">
          <div class="image-container">
            <img :src="baseURL + rating.image" alt="rating.name" class="rating-image" />
            <div class="overlay"></div>
            <div class="trophy-container">
              <div class="trophy-bg"></div>
              <Icon icon="solar:cup-first-bold" class="trophy-icon" />
            </div>
            <div class="text-overlay">
              <span class="category">{{ rating.category }}</span>
              <h2 class="winner">{{ rating.winner }}</h2>
            </div>
          </div>
          <div class="rating-info">
            <div class="other-places">
              <p v-for="(person, idx) in rating.others" :key="idx" class="other-place">
                #{{ idx + 2 }} {{ person }}
              </p>
            </div>
          </div>
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
      return {
        baseURL: import.meta.env.BASE_URL,
        showScrollTop: false,
        ratings: [
          {
            category: "Other",
            winner: "coming soon",
            others: [],
            image: "rating/soon.jpg",
          },
        ],
      };
    },
    methods: {
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
    },
    beforeUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    },
    };
  </script>
  
  <style scoped>
  .ratings-page {
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
  
  .ratings-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .rating-card {
    background: #1c1c1c;
    border-radius: 12px;
    overflow: hidden;
    width: 350px;
  }
  
  .image-container {
    position: relative;
    width: 350px;
    height: 175px;
    overflow: hidden;
  }
  
  .rating-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
  
  .text-overlay {
    position: absolute;
    bottom: 12px;
    left: 15px;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  
  .category {
    font-size: 10px;
    color: #ccc;
  }
  
  .winner {
    font-size: 18px;
    margin: 0;
  }
  
  .trophy-container {
    position: absolute;
    top: 10px;
    left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
  }
  
  .trophy-bg {
    position: absolute;
    width: 30px;
    height: 30px;
    background: #EFBF04;
    border-radius: 6px;
  }
  
  .trophy-icon {
    position: relative;
    font-size: 24px;
    color: white;
  }
  
  .rating-info {
    padding: 15px;
  }
  
  .other-places {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .other-place {
    font-size: 16px;
    color: #bbb;
    margin: 0;
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
  