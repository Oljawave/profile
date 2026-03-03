<template>
  <div class="photo-album">
    <div class="header">
      <Icon icon="lets-icons:expand-left-light" width="24" height="24" class="back-icon" @click="goBack" />
      <h1>{{ albumTitle }}</h1>
    </div>
    <div class="photo-grid">
      <div v-for="(photo, index) in photos" :key="index" :class="['photo-item', { 'full-width': isFullWidth(index) }]" @click="openPhoto(index)">
        <div v-if="photo.loading" class="placeholder"></div>
        <img v-show="!photo.loading" :src="photo.src" :alt="photo.title" @load="photo.loading = false" />
      </div>
    </div>
    <div v-if="selectedIndex !== null" class="modal" @click="closeModal">
      <button class="modal-close" @click.stop="closeModal">×</button>
      <button class="modal-arrow modal-arrow-left" @click.stop="prevPhoto"><Icon icon="lets-icons:expand-left-light" width="28" height="28" /></button>
      <img :src="photos[selectedIndex].src" class="modal-img" @click.stop />
      <button class="modal-arrow modal-arrow-right" @click.stop="nextPhoto"><Icon icon="lets-icons:expand-right-light" width="28" height="28" /></button>
    </div>
    <button v-show="showScrollTop" class="scroll-top-btn" @click="scrollToTop"><Icon icon="lets-icons:expand-up-light" width="24" height="24" /></button>
  </div>
</template>
<script>
import { Icon } from "@iconify/vue";
export default {
components: { Icon },
data() {
  const baseURL = import.meta.env.BASE_URL;
  return {
    albumTitle: "San Francisco",
    photos: Array.from({ length: 12 }, (_, i) => ({ src: `${baseURL}sanfrancisco/sanfrancisco${i + 1}.webp`, title: `Photo ${i + 1}`, loading: true })),
    selectedIndex: null, showScrollTop: false,
  };
},
methods: {
  goBack() { this.$router.go(-1); },
  openPhoto(index) { this.selectedIndex = index; },
  closeModal() { this.selectedIndex = null; },
  prevPhoto() { this.selectedIndex = (this.selectedIndex - 1 + this.photos.length) % this.photos.length; },
  nextPhoto() { this.selectedIndex = (this.selectedIndex + 1) % this.photos.length; },
  isFullWidth(index) { return (index + 1) % 3 === 0; },
  scrollToTop() { window.scrollTo({ top: 0, behavior: "smooth" }); },
  handleScroll() { this.showScrollTop = window.scrollY > 100; },
},
mounted() { window.scrollTo(0, 0); window.addEventListener("scroll", this.handleScroll); },
beforeUnmount() { window.removeEventListener("scroll", this.handleScroll); },
};
</script>
<style>
.photo-album { text-align: center; background: black; color: white; min-height: 100vh; padding: 20px; }
.header { display: flex; align-items: center; justify-content: center; position: relative; width: 100%; max-width: 400px; margin: 0 auto 20px auto; }
h1 { font-size: 20px; font-weight: 400; margin: 0; }
.back-icon { position: absolute; left: 0; cursor: pointer; transition: transform 0.2s ease; }
.back-icon:hover { transform: scale(1.2); }
.photo-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 3px; max-width: 400px; margin: 0 auto; }
.photo-item { position: relative; width: 100%; height: 190px; }
.photo-item.full-width { grid-column: 1 / -1; height: 440px; }
.photo-item img { width: 100%; height: 100%; border-radius: 0; cursor: pointer; object-fit: cover; }
.placeholder { width: 100%; height: 100%; border-radius: 0; background: #333; animation: pulse 1.5s infinite; }
@keyframes pulse { 0% { background-color: #444; } 50% { background-color: #555; } 100% { background-color: #444; } }
.modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal-img { max-width: 90%; max-height: 90%; border-radius: 12px; }
.modal-close { position: absolute; top: 56px; right: 16px; width: 40px; height: 40px; background: rgba(255,255,255,0.15); border: none; border-radius: 50%; color: white; font-size: 24px; line-height: 1; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s; z-index: 10; }
.modal-close:hover { background: rgba(255,255,255,0.35); }
.modal-arrow { position: absolute; top: 50%; transform: translateY(-50%); width: 44px; height: 44px; background: rgba(255,255,255,0.12); border: none; border-radius: 50%; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s; z-index: 10; }
.modal-arrow:hover { background: rgba(255,255,255,0.3); }
.modal-arrow-left { left: 16px; }
.modal-arrow-right { right: 16px; }
.scroll-top-btn { position: fixed; bottom: 20px; right: 20px; width: 50px; height: 50px; background: rgba(0,0,0,0.7); color: white; border: none; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: opacity 0.3s ease, transform 0.3s ease; opacity: 0.8; }
.scroll-top-btn:hover { opacity: 1; transform: scale(1.1); }
</style>
