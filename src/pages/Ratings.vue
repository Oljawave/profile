<template>
  <div class="ratings">
    <div class="header">
      <Icon icon="lets-icons:expand-left-light" width="24" height="24" class="back-icon" @click="goBack" />
      <h1>My Ratings</h1>
    </div>

    <div class="grid">
      <div
        v-for="(item, index) in categories"
        :key="index"
        class="card"
        :class="{ 'full-width': item.fullWidth }"
        @click="navigateTo(item.route)"
      >
        <Icon :icon="item.icon" width="24" height="24" class="icon" />
        <div class="bottom-content">
          <span class="text">{{ item.name }}</span>
          <Icon icon="lets-icons:expand-right-light" class="arrow" />
        </div>
      </div>
    </div>
    <p class="disclaimer">
      Attention! <br><br>
      This rating is based solely on my opinion.<br><br>
      I couldn't care less about yours.
    </p>

  </div>
</template>

<script>
import { Icon } from "@iconify/vue";

export default {
  components: { Icon },
  data() {
    return {
      categories: [
        { name: "Movies", icon: "ph:popcorn-light", route: "/movies" },
        { name: "Music", icon: "iconamoon:music-2-thin", route: "/music" },
        { name: "TV Series", icon: "solar:tv-outline", fullWidth: true, route: "/series" },
        // { name: "Cities and Counties", icon: "lets-icons:world-2-light", fullWidth: true, route: "/cities" },
        // { name: "Sports", icon: "material-symbols-light:sports-soccer", route: "/sports" },
        // { name: "Different", icon: "material-symbols-light:computer-outline", route: "/different" },
        { name: "History and People", icon: "prime:building-columns", fullWidth: true, route: "/history" },
      ],
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    navigateTo(route) {
      if (route) {
        this.$router.push(route);
      }
    },
  },
};
</script>

<style scoped>
.ratings {
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

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background: #1c1c1c;
  padding: 15px;
  border-radius: 12px;
  min-width: 170px;
  min-height: 100px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.card:hover {
  background: #292929;
}

.full-width {
  grid-column: span 2;
}

.icon {
  font-size: 24px;
  margin-bottom: 10px;
  align-self: flex-start;
}

.bottom-content {
  display: flex;
  align-items: center;
  width: 100%;
}

.text {
  font-size: 16px;
  flex-grow: 1;
}

.arrow {
  font-size: 16px;
}

.disclaimer {
  text-align: center;
  font-size: 14px;
  color: gray;
  margin-top: 20px;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

</style>
