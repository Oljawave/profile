<template>
  <div class="container">
    <!-- Анимированный эквалайзер -->
    <div class="music-equalizer" v-if="isPlaying">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>

    <div class="profile">
      <img src="/src/assets/profile.png" alt="Profile" class="avatar" />
      <h2>Gabdullin Olzhas</h2>
      <p style="margin-top: 10px; margin-bottom: 10px; color: #555;">@oljawave</p>
    </div>

    <div class="tabs">
      <button :class="{ active: activeTab === 'links' }" @click="activeTab = 'links'">Links</button>
      <button :class="{ active: activeTab === 'blog' }" @click="activeTab = 'blog'">Blog</button>
    </div>

    <div class="links" v-if="activeTab === 'links'">
      <div v-for="(link, index) in filteredLinks" :key="link.name"
           :class="['link-item', { 'first': index === 0, 'last': index === filteredLinks.length - 1 }]">

        <router-link v-if="link.internal" :to="link.url" class="link">
          <div class="link-content">
            <Icon :icon="link.icon" width="24" height="24" class="icon" />
            <span class="link-text">{{ link.name }}</span>
          </div>
          <Icon icon="lets-icons:expand-right-light" width="24" height="24" class="arrow" />
        </router-link>

        <a v-else :href="link.url" target="_blank">
          <div class="link-content">
            <Icon :icon="link.icon" width="24" height="24" class="icon" />
            <span class="link-text">{{ link.name }}</span>
          </div>
          <Icon icon="lets-icons:expand-right-light" width="24" height="24" class="arrow" />
        </a>
      </div>

      <div class="telegram-item">
        <a :href="telegramLink.url" target="_blank">
          <div class="link-content">
            <Icon :icon="telegramLink.icon" width="24" height="24" class="icon" />
            <span class="link-text">{{ telegramLink.name }}</span>
          </div>
          <Icon icon="lets-icons:expand-right-light" width="24" height="24" class="arrow" />
        </a>
      </div>

      <p style="margin-top: 20px; color: #555;">designed by Oljawave</p>
    </div>

    <div class="blog" v-if="activeTab === 'blog'">
      <p class="soon-text">Soon</p>
    </div>

    <router-view />
  </div>
</template>

  
<script>
import { Icon } from '@iconify/vue';

export default {
  components: {
    Icon
  },
  data() {
    return {
      activeTab: 'links',
      links: [
        { name: 'Gallery', url: '/gallery', icon: 'lets-icons:img-box-duotone-line', internal: true },
        { name: 'My Ratings', url: '/ratings', icon: 'lets-icons:fire-light', internal: true  },
        { name: 'Behance Portfolio', url: 'https://www.behance.net/olzhasgabdullin', icon: 'ph:behance-logo-light' },
        { name: 'LinkedIn Profile', url: 'https://www.linkedin.com/in/olzhas-gabdullin-87aa7123b/', icon: 'circum:linkedin' },
        { name: 'YouTube', url: 'https://www.youtube.com/@oljawave', icon: 'ph:youtube-logo-light' }
      ],
      telegramLink: { name: 'Telegram', url: 'https://t.me/oljawave', icon: 'uit:telegram-alt' }
    };
  },
  computed: {
    filteredLinks() {
      return this.links;
    }
  }
};
</script>


  
  
  <style>
  * {
    font-family: 'SF Pro Display', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body {
    background: black !important;
    color: white;
    width: 100%;
    height: 100%;
  }
  
  #app {
    background: black;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .container {
    width: 100%;
    max-width: 400px;
    text-align: center;
    background: black;
    color: white;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .tabs {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    background: #222;
    border-radius: 12px;
    overflow: hidden;
  }
  .tabs button {
    flex: 1;
    background: #222;
    border: none;
    padding: 10px 20px;
    color: white;
    cursor: pointer;
    font-weight: bold;
  }
  .tabs .active {
    background: white;
    color: black;
  }
  .links {
    margin-top: 20px;
  }
  .link-item {
    background: #222;
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #333;
  }
  .link-item:first-child {
    border-radius: 12px 12px 0 0;
  }
  .link-item:last-child {
    border-radius: 0 0 12px 12px;
    border-bottom: 12px solid #222;
  }
  .telegram-item {
    background: #222;
    padding: 12px;
    margin-top: 35px;
    border-radius: 12px;
  }
  .telegram-item a,
  .link-item a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    color: white;
    text-decoration: none;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: 500;
  }
  .link-content {
    display: flex;
    align-items: center;
  }
  .icon {
    margin-right: 10px;
  }
  .link-text {
    margin-left: 8px;
  }
  .arrow {
    font-size: 18px;
    margin-left: auto;
  }
  .blog {
    margin-top: 20px;
  }
  .soon-text {
    font-size: 18px;
    font-weight: bold;
    color: gray;
  }
  .links, .blog {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .music-equalizer {
  position: absolute;
  top: 50px; /* Выравниваю по уровню аватарки */
  right: 0; /* Прижимаю к правому краю контейнера */
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 30px;
  height: 20px;
  padding-right: 10px; /* Небольшой отступ от края */
}

.bar {
  width: 5px;
  height: 100%;
  background: white; /* Белый цвет */
  border-radius: 2px;
  animation: equalizer 1s infinite ease-in-out;
}

.bar:nth-child(1) {
  animation-delay: 0.1s;
}

.bar:nth-child(2) {
  animation-delay: 0.2s;
}

.bar:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes equalizer {
  0%, 100% {
    height: 30%;
  }
  50% {
    height: 100%;
  }
}
  </style>