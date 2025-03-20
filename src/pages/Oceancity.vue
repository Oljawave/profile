<template>
  <div class="photo-album">
    <div class="header">
      <Icon icon="lets-icons:expand-left-light" width="24" height="24" class="back-icon" @click="goBack" />
      <h1>{{ albumTitle }}</h1>
    </div>
    
    <div class="photo-grid">
      <div v-for="(photo, index) in photos" :key="index" class="photo-item" @click="openPhoto(photo.src)">
        <!-- Заглушка, пока изображение загружается -->
        <div v-if="photo.loading" class="placeholder"></div>
        
        <!-- Основное изображение -->
        <img 
          v-show="!photo.loading"
          :src="photo.src" 
          :alt="photo.title" 
          @load="photo.loading = false"
        />
      </div>
    </div>

    <!-- Модальное окно для увеличенного изображения -->
    <div v-if="selectedPhoto" class="modal" @click="selectedPhoto = null">
      <img :src="selectedPhoto" class="modal-img" />
    </div>

    <!-- <button v-show="showScrollTop" class="scroll-top-btn" @click="scrollToTop">
      <Icon icon="lets-icons:expand-up-light" width="24" height="24" />
    </button> -->
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";

export default {
components: { Icon },

data() {
  const baseURL = import.meta.env.BASE_URL;

  return {
    albumTitle: "Ocean City",
    photos: Array.from({ length: 50 }, (_, i) => ({
      src: `${baseURL}oceancity/oceancity${i + 1}.webp`,
      title: `Photo ${i + 1}`,
      loading: true,
    })),
    selectedPhoto: null,
    showScrollTop: false,
  };
},
methods: {
  goBack() {
    this.$router.go(-1);
  },
  openPhoto(src) {
    this.selectedPhoto = src;
  },
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
  handleScroll() {
    this.showScrollTop = window.scrollY > 100;
  },
},
mounted() {
  window.scrollTo(0, 0);
  window.addEventListener("scroll", this.handleScroll);
},

beforeUnmount() {
  window.removeEventListener("scroll", this.handleScroll);
},
};
</script>

<style>
.photo-album {
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

.photo-grid {
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 10px;
max-width: 400px;
margin: 0 auto;
}

.photo-item {
position: relative;
width: 100%;
height: 200px;
}

.photo-item img {
width: 100%;
height: 100%;
border-radius: 12px;
cursor: pointer;
object-fit: cover;
transition: transform 0.3s ease;
}

.photo-item img:hover {
transform: scale(1.05);
}

/* Заглушка (плейсхолдер) */
.placeholder {
width: 100%;
height: 100%;
border-radius: 12px;
background: #333;
animation: pulse 1.5s infinite;
}

@keyframes pulse {
0% { background-color: #444; }
50% { background-color: #555; }
100% { background-color: #444; }
}

.modal {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: rgba(0, 0, 0, 0.8);
display: flex;
align-items: center;
justify-content: center;
z-index: 1000;
}

.modal-img {
max-width: 90%;
max-height: 90%;
border-radius: 12px;
transition: transform 0.3s ease;
}

.modal:hover .modal-img {
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
