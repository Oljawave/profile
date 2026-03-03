<template>
  <div class="container">

    <div class="equalizer" @click="togglePlay">
      <span class="bar" :class="{ playing: isPlaying }"></span>
      <span class="bar" :class="{ playing: isPlaying }"></span>
      <span class="bar" :class="{ playing: isPlaying }"></span>
      <span class="bar" :class="{ playing: isPlaying }"></span>
    </div>

    <div class="lang-switcher">
      <button :class="{ 'lang-active': lang === 'en' }" @click="lang = 'en'">Eng</button>
      <span class="lang-divider">|</span>
      <button :class="{ 'lang-active': lang === 'kz' }" @click="lang = 'kz'">Қаз</button>
    </div>

    <div class="profile">
      <img src="/src/assets/profile.png" alt="Profile" class="avatar" />
      <h2>Gabdullin Olzhas</h2>
      <p style="margin-top: 10px; margin-bottom: 10px; color: #555;">@oljawave</p>
    </div>

    <div class="tabs">
      <button :class="{ active: activeTab === 'links' }" @click="activeTab = 'links'">{{ ui.links }}</button>
      <button :class="{ active: activeTab === 'blog' }" @click="activeTab = 'blog'">{{ ui.blog }}</button>
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
        <a :href="currentTelegramLink.url" target="_blank">
          <div class="link-content">
            <Icon :icon="currentTelegramLink.icon" width="24" height="24" class="icon" />
            <span class="link-text">{{ currentTelegramLink.name }}</span>
          </div>
          <Icon icon="lets-icons:expand-right-light" width="24" height="24" class="arrow" />
        </a>
      </div>

      <p style="margin-top: 20px; color: #555;">{{ ui.designedBy }}</p>
    </div>

    <div class="blog" v-if="activeTab === 'blog'">
      <div v-for="post in currentBlogPosts" :key="post.id" class="blog-post">
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

    <!-- Player overlay -->
    <div v-if="showPlayer" class="player-overlay" @click="showPlayer = false"></div>

    <!-- Player bottom sheet -->
    <transition name="slide-up">
      <div v-if="showPlayer" class="player-modal">
        <div class="player-handle"></div>
        <div class="player-track-info">
          <img v-if="currentTrack.cover" :src="currentTrack.cover" class="player-cover" />
          <div class="player-cover-placeholder" v-else>
            <Icon icon="lets-icons:music-note-light" width="28" height="28" />
          </div>
          <div class="player-meta">
            <p class="player-title">{{ currentTrack.title }}</p>
            <p class="player-artist">{{ currentTrack.artist }}</p>
          </div>
        </div>
        <input type="range" class="player-progress" :value="currentTime" :max="duration || 1" step="0.1" @input="seek($event)" />
        <div class="player-time">
          <span>{{ formatTime(currentTime) }}</span>
          <span>{{ formatTime(duration) }}</span>
        </div>
        <div class="player-controls">
          <button class="ctrl-btn" @click="prevTrack"><Icon icon="lets-icons:skip-back-light" width="28" height="28" /></button>
          <button class="ctrl-btn play-btn" @click="togglePlay">
            <Icon :icon="isPlaying ? 'lets-icons:pause-light' : 'lets-icons:play-light'" width="32" height="32" />
          </button>
          <button class="ctrl-btn" @click="nextTrack"><Icon icon="lets-icons:skip-forward-light" width="28" height="28" /></button>
        </div>
      </div>
    </transition>
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
      lang: 'en',
      baseURL: import.meta.env.BASE_URL,
      activeTab: 'links',
      modalImage: null,
      showPlayer: false,
      isPlaying: false,
      currentTrackIndex: 0,
      currentTime: 0,
      duration: 0,
      tracks: [
        { title: 'Skywave', artist: 'Oljawave', cover: null, src: import.meta.env.BASE_URL + 'music/track1.mp3' },
        { title: 'Дала', artist: 'Oljawave', cover: null, src: import.meta.env.BASE_URL + 'music/track2.mp3' },
      ],
      links: [
        { name: 'Gallery', url: '/gallery', icon: 'lets-icons:img-box-duotone-line', internal: true },
        { name: 'My Ratings', url: '/ratings', icon: 'lets-icons:fire-light', internal: true },
        { name: 'Telegram Channel', url: 'https://t.me/oljawavetime', icon: 'uit:telegram-alt' },
        { name: 'Behance Portfolio', url: 'https://www.behance.net/olzhasgabdullin', icon: 'ph:behance-logo-light' },
        { name: 'LinkedIn Profile', url: 'https://www.linkedin.com/in/olzhas-gabdullin-87aa7123b/', icon: 'circum:linkedin' },
        { name: 'YouTube', url: 'https://www.youtube.com/@oljawave', icon: 'ph:youtube-logo-light' }
      ],
      linksKz: [
        { name: 'Галерея', url: '/gallery', icon: 'lets-icons:img-box-duotone-line', internal: true },
        { name: 'Менің рейтингтерім', url: '/ratings', icon: 'lets-icons:fire-light', internal: true },
        { name: 'Telegram арнасы', url: 'https://t.me/oljawavetime', icon: 'uit:telegram-alt' },
        { name: 'Behance портфолиосы', url: 'https://www.behance.net/olzhasgabdullin', icon: 'ph:behance-logo-light' },
        { name: 'LinkedIn профилі', url: 'https://www.linkedin.com/in/olzhas-gabdullin-87aa7123b/', icon: 'circum:linkedin' },
        { name: 'YouTube', url: 'https://www.youtube.com/@oljawave', icon: 'ph:youtube-logo-light' }
      ],
      telegramLink: { name: 'Telegram', url: 'https://t.me/ocnjandres', icon: 'uit:telegram-alt' },
      telegramLinkKz: { name: 'Telegram', url: 'https://t.me/ocnjandres', icon: 'uit:telegram-alt' },
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
      ],
      blogPostsKz: [
        {
          "id": 8,
          "text": "<p>Мұның бәрі басқаларға қаншалықты жақсы, ақылды немесе ерекше екенімізді көрсеткіміз келгендіктен. Менен қорықсаңыз да, сыйласаңыз да мейлі, тек мені «ерекше» деп санасаңыз болғаны.</p>\n<p>Бәріміз бір нәрсеге тәуелдіміз. Ол — өзгелердің мақтауы. Арқадан қағып, «жарайсың!» деген сөзді есту үшін бәріне дайынбыз.</p>\n<p>Тағы бір медаль алып, оны жарқыратып сүртіп отырған ақылды балақайға қараңызшы. Біз тек костюм киген, өзгелердің ризашылығын күткен маймылдар сияқтымыз. Егер мұны түсінсек, бұлай істемес едік, бірақ біреу бізден шындықты жасырып жатыр.</p>",
          "image": "blog/eight.jpg",
          "date": "2:09 • Желтоқсан 6, 2025"
        },
        {
          "id": 2,
          "text": "«Болашаққа қайта оралу» (Back to the Future) — нағыз кино сиқыры. Суперқаһармандарсыз-ақ, ешқандай CGI-сыз, жай ғана бала, есі ауысқан ғалым және қазіргі көліктерден әлдеқайдаเท่ көрінетін уақыт машинасы. Қызықты, ерекше және әр көрген сайын қуантады. 1.21 гигаватт таза шабыт!",
          "image": "blog/seven.jpg",
          "date": "11:47 • Қаз 12, 2025"
        },
        {
          "id": 2,
          "text": `<h3 style="margin-bottom: 10px;">Жастық шақ — баға жетпес сый</h3>
                <p>Жастық шақ — бұл құлау, қателесу және қайтадан талпыну уақыты.</p>
                <p>Біз бәрін бірден білуге міндетті емеспіз. Қателіктер әрқашан жеңіс әкелмейді, кейде олар жанға батады. Бірақ олар бізді шыңдайды, алға итермелейді және үйретеді.</p>
                <p>Тәуекелге бел буыңыз. Шын жүректен сүйіңіз. Дауыстап үйреніңіз. Ең үлкен өкініш — қателесу емес, ешқашан әрекет етпеу.</p>
                <p>Бірақ жастық шағыңызды мағынасыз кештер мен бос ермектерге жұмсамаңыз. Өмірдің ұсынары бұдан әлдеқайда көп.</p>
                <p>Бір нәрсе тұрғызыңыз. Өзіңізді таныңыз. Армандарға шек қоймаңыз.</p>
                <p><i>Жастық шақ — бұл әдемі хаос. Одан қашпаңыз, оны сезініңіз.</i></p>`,
          "image": 'blog/six.jpg',
          "date": '17:48 • Мамыр 6, 2025'
        },
        {
          "id": 1,
          "text": "Музыка, Telegram, сәл LinkedIn. Экрандағы шынайылықтың бір бөлшегі, ағындағы менің бір бөлшегім. Көбірек уақыт өткізгім келсе де, экранның өзі менің түрімнен шаршап кететін сияқты.",
          "image": "blog/fifth.jpg",
          "date": "19:46 • Сәу 05, 2025"
        },
        {
          "id": 1,
          "text": 'Өткен жылы менің ең еркін сөйлеген тілім — музыка болды.',
          "image": 'blog/fourth.JPEG',
          "date": '16:19 • Нау 27, 2025'
        },
        {
          "id": 1,
          "text": `<h3 style="margin-bottom: 10px;">Батылдық па әлде даналық па?</h3>
                <p>Өмір бізді жиі таңдау алдына қояды: батыл болып тәуекелге бару ма, әлде дана болып сәтті сәтті күту ме?</p>
                <p>Батылдық бізді үлкен жетістіктерге жетелейді, шекараларды бұзып, жабық есіктерді ашады. Ал даналық ше? Даналық — белгісіздікте жол тауып, артық шығыннан сақтайтын және дұрыс шешім қабылдауға көмектесетін байсалды күш.</p>
                <p>Мүмкін, нағыз шеберлік — осы екеуінің арасындағы тепе-теңдікті табуда шығар: қашан қорықпай әрекет ету керек, ал қашан тоқтап, сырттай бақылау керек екенін білу.</p>
                <p><i>Наполеон айтқандай: «Шайқасты ең аз қателік жіберген адам жеңеді».</i></p>
                <p>Мүмкін, табыс тек батылдықта емес, дұрыс есептей білуде де болар.</p>`,
          "image": 'blog/third.jpg',
          "date": '21:09 • Нау 24, 2025'
        },
        {
          "id": 1,
          "text": 'Астана — артық нәрсенің бәрін желмен ұшырып жіберіп, тек ең маңыздысын қалдыратын қала. Мұнда өткен шақ қазіргі уақытқа жете алмайды, ал болашақ әлдеқашан салынып қойған. Суығы төзімділікке баулиды, ал шексіз аспаны арманға қанат бітіреді. Мүмкін, Астана жай ғана мекен емес, ол — көңіл-күйдің ерекше күйі шығар.',
          "image": 'blog/second.jpg',
          "date": '04:46 • Нау 21, 2025'
        },
        {
          "id": 1,
          "text": 'Алтын Орда қабырға тұрғызған жоқ — ол кеңістікті бағындырды. Империялар жойылады, бірақ дала төсінде туған идеялар ғасырлар бойы өмір сүреді.',
          "image": 'blog/first.jpg',
          "date": '19:57 • Нау 20, 2025'
        },
        { 
          "id": 2, 
          "text": 'Жеке профиліме қош келдіңіз!', 
          "date": '11:21 • Нау 19, 2025' 
        }
      ]
    };
  },
  computed: {
    currentTrack() {
      return this.tracks[this.currentTrackIndex];
    },
    ui() {
      return {
        links: this.lang === 'en' ? 'Links' : 'Сілтемелер',
        blog: this.lang === 'en' ? 'Blog' : 'Блог',
        designedBy: this.lang === 'en' ? 'designed by Oljawave' : 'Oljawave жасаған'
      };
    },
    filteredLinks() {
      return this.lang === 'en' ? this.links : this.linksKz;
    },
    currentTelegramLink() {
      return this.lang === 'en' ? this.telegramLink : this.telegramLinkKz;
    },
    currentBlogPosts() {
      return this.lang === 'en' ? this.blogPosts : this.blogPostsKz;
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
      if (link.url === '/gallery') {
        this.sendTelegramMessage('User clicked on Gallery 🚀');
      }
      this.$router.push(link.url);
    },
    togglePlay() {
      if (!this._audio) return;
      if (this.isPlaying) {
        this._audio.pause();
      } else {
        this._audio.play();
      }
      this.isPlaying = !this.isPlaying;
    },
    prevTrack() {
      this.currentTrackIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
      this._loadTrack(this.isPlaying);
    },
    nextTrack() {
      this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
      this._loadTrack(this.isPlaying);
    },
    _loadTrack(autoplay) {
      this._audio.src = this.currentTrack.src;
      this.currentTime = 0;
      this.duration = 0;
      if (autoplay) this._audio.play();
    },
    seek(e) {
      this._audio.currentTime = Number(e.target.value);
    },
    formatTime(s) {
      if (!s || isNaN(s)) return '0:00';
      const m = Math.floor(s / 60);
      const sec = Math.floor(s % 60).toString().padStart(2, '0');
      return `${m}:${sec}`;
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
  },
  mounted() {
    this._audio = new Audio(this.currentTrack.src);
    this._audio.addEventListener('timeupdate', () => { this.currentTime = this._audio.currentTime; });
    this._audio.addEventListener('loadedmetadata', () => { this.duration = this._audio.duration; });
    this._audio.addEventListener('ended', () => { this.isPlaying = false; this.nextTrack(); });
  },
  beforeUnmount() {
    if (this._audio) { this._audio.pause(); this._audio = null; }
  },
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
  position: relative;
}
.equalizer {
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 16px;
  cursor: pointer;
}
.bar {
  width: 3px;
  height: 4px;
  background: white;
  border-radius: 2px;
  transition: height 0.3s;
}
.bar.playing { animation: equalize 1s ease-in-out infinite; }
.bar.playing:nth-child(1) { animation-delay: 0s; }
.bar.playing:nth-child(2) { animation-delay: 0.2s; }
.bar.playing:nth-child(3) { animation-delay: 0.35s; }
.bar.playing:nth-child(4) { animation-delay: 0.1s; }
@keyframes equalize {
  0%, 100% { height: 4px; }
  50% { height: 14px; }
}
.player-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 1900;
}
.player-modal {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 400px;
  background: #1a1a1a;
  border-radius: 20px 20px 0 0;
  padding: 12px 24px 36px;
  z-index: 2000;
}
.player-handle {
  width: 36px;
  height: 4px;
  background: #444;
  border-radius: 2px;
  margin: 0 auto 20px;
}
.player-track-info {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
}
.player-cover {
  width: 52px;
  height: 52px;
  border-radius: 8px;
  object-fit: cover;
}
.player-cover-placeholder {
  width: 52px;
  height: 52px;
  border-radius: 8px;
  background: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  flex-shrink: 0;
}
.player-meta { text-align: left; }
.player-title { font-size: 15px; font-weight: 600; margin-bottom: 3px; }
.player-artist { font-size: 13px; color: #888; }
.player-progress {
  width: 100%;
  accent-color: white;
  cursor: pointer;
  margin-bottom: 4px;
}
.player-time {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #666;
  margin-bottom: 20px;
}
.player-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
}
.ctrl-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}
.play-btn {
  width: 56px;
  height: 56px;
  background: white;
  border-radius: 50%;
  color: black;
}
.slide-up-enter-active, .slide-up-leave-active { transition: transform 0.35s ease; }
.slide-up-enter-from, .slide-up-leave-to { transform: translateX(-50%) translateY(100%); }
.slide-up-enter-to, .slide-up-leave-from { transform: translateX(-50%) translateY(0); }
.lang-switcher {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 4px;
}
.lang-switcher button {
  background: none;
  border: none;
  color: #555;
  font-size: 13px;
  cursor: pointer;
  padding: 0;
}
.lang-switcher button.lang-active {
  color: white;
  font-weight: 700;
}
.lang-divider {
  color: #555;
  font-size: 13px;
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
