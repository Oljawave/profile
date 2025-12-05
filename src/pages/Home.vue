<template>
  <div class="container">
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
      <div
        v-for="(link, index) in filteredLinks"
        :key="link.name"
        :class="['link-item', { first: index === 0, last: index === filteredLinks.length - 1 }]"
      >
        <router-link
          v-if="link.internal"
          :to="link.url"
          class="link"
          @click.prevent="handleInternalLinkClick(link)"
        >
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
      <div v-for="post in blogPosts" :key="post.id" class="blog-post">
        <img
          v-if="post.image"
          :src="`${baseURL}${post.image}`"
          alt="Post Image"
          class="post-image"
          @click="openModal(post.image)"
        />
        <div class="post-content">
          <div v-html="post.text" class="post-text-content"></div>
          <p class="post-date">{{ post.date }}</p>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div v-if="modalImage" class="modal" @click="closeModal">
        <div class="modal-content" @click.stop>
          <span class="close" @click="closeModal">×</span>
          <img :src="`${baseURL}${modalImage}`" class="modal-image" />
        </div>
      </div>
    </transition>

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
      baseURL: import.meta.env.BASE_URL,
      activeTab: 'links',
      modalImage: null,
      links: [
        { name: 'Gallery', url: '/gallery', icon: 'lets-icons:img-box-duotone-line', internal: true },
        { name: 'My Ratings', url: '/ratings', icon: 'lets-icons:fire-light', internal: true },
        { name: 'Telegram Channel', url: 'https://t.me/oljawavetime', icon: 'uit:telegram-alt' },
        { name: 'Behance Portfolio', url: 'https://www.behance.net/olzhasgabdullin', icon: 'ph:behance-logo-light' },
        { name: 'LinkedIn Profile', url: 'https://www.linkedin.com/in/olzhas-gabdullin-87aa7123b/', icon: 'circum:linkedin' },
        { name: 'YouTube', url: 'https://www.youtube.com/@oljawave', icon: 'ph:youtube-logo-light' }
      ],
      telegramLink: { name: 'Telegram', url: 'https://t.me/ocnjandres', icon: 'uit:telegram-alt' },
      blogPosts: [
        {
          "id": 8,
          "text": "<p>And all of it because we want to show others how good we are, how clever, how special. You can fear me, or respect me, but please, consider me special.</p>\n                <p>We all share the same addiction. We are addicted to the drug of approval. We are ready to do anything to get a clap on the back and a cry of 'hip hip hooray!'</p>\n                <p>Look at the clever little boy who won another medal, and now he is polishing his favourite cup until it shines. We are just monkeys in suits, begging for the approval of others. If we understood this, we wouldn't do it, but someone is hiding the truth from us.</p>",
          "image": "blog/eight.jpg",
          "date": "2:09 • December 6, 2025"
        },
        {
          id: 2,
          text: 'Man, Back to the Future is just pure movie magic. No superheroes, no crazy CGI — just a kid, a mad scientist, and a time-traveling car that somehow feels cooler than anything today. It’s fun, it’s wild, and it still hits every single time. 1.21 gigawatts of pure joy',
          image: 'blog/seven.jpg',
          date: '11:47 • Oct 12, 2025'
        },
        {
          id: 2,
          text: `<h3 style="margin-bottom: 10px;">The Gift of Youth</h3>
                <p>Youth is the time to fall, to stumble, to try again.</p>
                <p>We’re not supposed to have it all figured out. Mistakes aren’t always victories — sometimes they hurt. But they shape us, push us, teach us.</p>
                <p>Take risks. Love deeply. Learn loudly. Because the greatest regret isn’t in messing up — it’s in never trying at all.</p>
                <p>But don’t waste your youth on smoke-filled rooms, cheap thrills, and nights you’ll forget. Life has more to offer than empty escapes.</p>
                <p>Build something. Discover yourself. Dream without limits.</p>
                <p><i>Youth is a beautiful chaos. Embrace it — don’t escape it.</i></p>`,
          image: 'blog/six.jpg',
          date: '17:48 • May 6, 2025'
        },
        {
          id: 1,
          text: "Music, Telegram, a bit of LinkedIn. A bit of reality in the screen, a bit of me in the stream. And even if I wanted to spend more, I couldn’t. The screen gets tired of my face too.",
          image: "blog/fifth.jpg",
          date: "19:46 • Apr 05, 2025"
        },
        {
          id: 1,
          text: 'Music is the only language I spoke fluently last year',
          image: 'blog/fourth.JPEG',
          date: '16:19 • Mar 27, 2025'
        },
        {
          id: 1,
          text: `<h3 style="margin-bottom: 10px;">Being Bold or Being Wise?</h3>
                <p>Life often forces us to choose: to be bold and take risks or to be wise and wait for the right moment.</p>
                <p>Boldness drives us toward great achievements, pushing boundaries and opening doors that might otherwise remain closed. But wisdom? Wisdom is the quiet force that helps us navigate uncertainty, avoid unnecessary losses, and make decisions that stand the test of time.</p>
                <p>Perhaps true mastery lies in balancing both—knowing when to act fearlessly and when to step back and observe.</p>
                <p><i>Napoleon once said, "The battle is won by the one who makes the fewest mistakes."</i></p>
                <p>Maybe success isn’t just about courage but also about calculation.</p>`,
          image: 'blog/third.jpg',
          date: '21:09 • Mar 24, 2025'
        },
        {
          id: 1,
          text: 'Astana is a city where the wind blows away the unnecessary, leaving only the essential. Here, the past can’t keep up with the present, and the future is already under construction. The cold teaches resilience, while the endless sky inspires dreams. Perhaps Astana is not just a place, but a state of mind.',
          image: 'blog/second.jpg',
          date: '04:46 • Mar 21, 2025'
        },
        {
          id: 1,
          text: 'The Golden Horde did not build walls—it conquered space. Empires vanish, but the ideas born in the steppe live on for centuries.  ',
          image: 'blog/first.jpg',
          date: '19:57 • Mar 20, 2025'
        },
        { id: 2, text: 'Welcome to my personal profile', date: '11:21 • Mar 19, 2025' }
      ]
    };
  },
  computed: {
    filteredLinks() {
      return this.links;
    }
  },
  methods: {
    openModal(image) {
      this.modalImage = image;
    },
    closeModal() {
      this.modalImage = null;
    },
    handleInternalLinkClick(link) {
      if (link.name === 'Gallery') {
        this.sendTelegramMessage('User clicked on Gallery 🚀');
      }
      this.$router.push(link.url);
    },
    async sendTelegramMessage(message) {
      const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
      const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

      const url = `https://api.telegram.org/bot${token}/sendMessage`;
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message
        })
      });
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
.link-item.last {
  border-radius: 0 0 12px 12px;
  border-bottom: 12px solid #222;
}
.telegram-item {
  background: #222;
  padding: 12px;
  margin-top: 35px;
  border-radius: 12px;
}
.telegram-item a, .link-item a {
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

.blog-post {
  background: #222;
  padding-bottom: 12px;
  margin-bottom: 15px;
  border-radius: 12px;
  overflow: hidden;
}

.post-image {
  display: block;
  width: 100%; 
  max-height: 360px;
  object-fit: cover;
}

.post-content {
  padding: 12px;
  text-align: left;
}

.post-text-content {
  margin-bottom: 8px;
}
.post-text-content p {
  font-weight: 300;
}

.post-text {
  font-size: 16px;
  color: white;
  margin-bottom: 8px;
  font-weight: 300; 
}

.post-date {
  font-size: 14px;
  color: gray;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
}

.modal-image {
  width: 100%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
}

.close {
  position: absolute;
  top: 10px;
  right: 15px;
  color: white;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.3);
  padding: 5px 10px;
  border-radius: 50%;
}

.close:hover {
  background: rgba(255, 255, 255, 0.6);
}

</style>
