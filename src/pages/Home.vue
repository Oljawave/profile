<template>
  <div class="container">

    <div class="bg-glow"></div>

    <div class="equalizer" @click="togglePlay; showPlayer = true">
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
      <div class="avatar-container">
        <div class="dragonfly-field">
          <!-- крылья вверх-вниз от тела, как настоящая стрекоза сверху -->
          <div class="dragonfly df1">
            <svg class="df-svg" viewBox="0 0 72 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g class="wings">
                <ellipse cx="20" cy="12" rx="8" ry="12" transform="rotate(-18 20 12)" stroke="white" stroke-width="0.9" fill="rgba(255,255,255,0.11)"/>
                <ellipse cx="20" cy="38" rx="8" ry="12" transform="rotate(18 20 38)"  stroke="white" stroke-width="0.9" fill="rgba(255,255,255,0.11)"/>
                <ellipse cx="29" cy="14" rx="6.5" ry="10" transform="rotate(-12 29 14)" stroke="white" stroke-width="0.75" fill="rgba(255,255,255,0.07)"/>
                <ellipse cx="29" cy="36" rx="6.5" ry="10" transform="rotate(12 29 36)"  stroke="white" stroke-width="0.75" fill="rgba(255,255,255,0.07)"/>
              </g>
              <circle cx="7" cy="25" r="4.5" fill="white"/>
              <ellipse cx="20" cy="25" rx="7.5" ry="4.5" fill="white"/>
              <line x1="27" y1="25" x2="69" y2="25" stroke="white" stroke-width="2.4" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
        <div class="avatar-ring">
          <img src="/src/assets/profile.png" alt="Profile" class="avatar" />
        </div>
      </div>
      <h2 class="profile-name">Gabdullin Olzhas</h2>
      <p class="profile-handle">@oljawave</p>
    </div>

    <div class="tabs">
      <button :class="{ active: activeTab === 'links' }" @click="activeTab = 'links'">{{ ui.links }}</button>
      <button :class="{ active: activeTab === 'blog' }" @click="activeTab = 'blog'; sendTelegramMessage('User opened Blog 📝')">{{ ui.blog }}</button>
    </div>

    <div class="links" v-if="activeTab === 'links'">
      <div
        v-for="(link, index) in filteredLinks"
        :key="link.name"
        class="link-item"
      >
        <router-link
          v-if="link.internal"
          :to="link.url"
          class="link-anchor"
          @click.prevent="handleInternalLinkClick(link)"
        >
          <div class="link-content">
            <div class="link-icon-wrap">
              <Icon :icon="link.icon" width="20" height="20" />
            </div>
            <span class="link-text">{{ link.name }}</span>
          </div>
          <Icon icon="lets-icons:expand-right-light" width="20" height="20" class="arrow" />
        </router-link>

        <a v-else :href="link.url" target="_blank" class="link-anchor" @click="sendTelegramMessage(`User clicked on ${link.name} 🚀`)">
          <div class="link-content">
            <div class="link-icon-wrap">
              <Icon :icon="link.icon" width="20" height="20" />
            </div>
            <span class="link-text">{{ link.name }}</span>
          </div>
          <Icon icon="lets-icons:expand-right-light" width="20" height="20" class="arrow" />
        </a>
      </div>

      <div class="link-item telegram-item">
        <a :href="currentTelegramLink.url" target="_blank" class="link-anchor" @click="sendTelegramMessage(`User clicked on ${currentTelegramLink.name} 🚀`)">
          <div class="link-content">
            <div class="link-icon-wrap tg-icon">
              <Icon :icon="currentTelegramLink.icon" width="20" height="20" />
            </div>
            <span class="link-text">{{ currentTelegramLink.name }}</span>
          </div>
          <Icon icon="lets-icons:expand-right-light" width="20" height="20" class="arrow" />
        </a>
      </div>

      <p class="designed-by">{{ ui.designedBy }}</p>
    </div>

    <div class="blog" v-if="activeTab === 'blog'">
      <div v-for="post in currentBlogPosts" :key="post.id" class="blog-post">
        <div class="post-image-wrap" v-if="post.image" @click="openModal(post.image)">
          <img
            :src="`${baseURL}${post.image}`"
            alt="Post Image"
            class="post-image"
          />
          <div class="post-image-overlay"></div>
        </div>
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

    <div v-if="showPlayer" class="player-overlay" @click="showPlayer = false"></div>

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
        /* {
          id: 11,
          text: `She wanted him to see the colors of the world, and eventually, he did. He saw them all. But none of them seemed to stick. Three years later, through every sunrise and every shadow, he was still looking for the one that looked like her.`,
          image: 'blog/ten.PNG',
          date: '18:30 • May 8, 2026'
        }, */
        {
          id: 10,
          text: `<p>We so often put life off for later. We think: "I'll do it later", "now's not the time", "someday". And there seem to be reasons, but honestly — most of the time it's just fear. Fear of disappointing someone, not living up to expectations, looking stupid, or being judged.</p>
                <p>Because of this, we make things harder for ourselves. We set limits, create boundaries nobody asked us to create. We wait for some perfect moment when we'll be "ready enough". But it may never come.</p>
                <p>And yet nobody knows how much time we actually have.</p>
                <p>So sometimes you just have to do it. Not perfectly, not with every detail figured out — just as it comes. Try, even when it's scary. Go where you want to go, not where you "have to".</p>
                <p>Didn't work out? Okay, you move on. That's normal.</p>
                <p>Far worse is never trying at all.</p>
                <p>So don't put it off. Live now, enjoy now. Because "later" might never come.</p>`,
          image: 'blog/nine.jpeg',
          date: '14:00 • April 21, 2026'
        },
        {
          id: 9,
          text: `My grandpa used to say: "Don't look for the hard way, life's already tough enough. If there's an easier path, just take it." And he's 100% right. Why overcomplicate things? Let go of what's dragging you down and move on to something better. There's so much cool stuff ahead, don't waste your energy on the past.`,
          image: 'blog/ata.png',
          date: '12:25 • March 16, 2026'
        },
        {
          "id": 8,
          "text": "<p>And all of it because we want to show others how good we are, how clever, how special. You can fear me, or respect me, but please, consider me special.</p>\n                <p>We all share the same addiction. We are addicted to the drug of approval. We are ready to do anything to get a clap on the back and a cry of 'hip hip hooray!'</p>\n                <p>Look at the clever little boy who won another medal, and now he is polishing his favourite cup until it shines. We are just monkeys in suits, begging for the approval of others. If we understood this, we wouldn't do it, but someone is hiding the truth from us.</p>",
          "image": "blog/eight.jpg",
          "date": "2:09 • December 6, 2025"
        },
        {
          id: 2,
          text: 'Man, Back to the Future is just pure movie magic. No superheroes, no crazy CGI — just a kid, a mad scientist, and a time-traveling car that somehow feels cooler than anything today. It\'s fun, it\'s wild, and it still hits every single time. 1.21 gigawatts of pure joy',
          image: 'blog/seven.jpg',
          date: '11:47 • Oct 12, 2025'
        },
        {
          id: 2,
          text: `<h3 style="margin-bottom: 10px;">The Gift of Youth</h3>
                <p>Youth is the time to fall, to stumble, to try again.</p>
                <p>We're not supposed to have it all figured out. Mistakes aren't always victories — sometimes they hurt. But they shape us, push us, teach us.</p>
                <p>Take risks. Love deeply. Learn loudly. Because the greatest regret isn't in messing up — it's in never trying at all.</p>
                <p>But don't waste your youth on smoke-filled rooms, cheap thrills, and nights you'll forget. Life has more to offer than empty escapes.</p>
                <p>Build something. Discover yourself. Dream without limits.</p>
                <p><i>Youth is a beautiful chaos. Embrace it — don't escape it.</i></p>`,
          image: 'blog/six.jpg',
          date: '17:48 • May 6, 2025'
        },
        {
          id: 1,
          text: "Music, Telegram, a bit of LinkedIn. A bit of reality in the screen, a bit of me in the stream. And even if I wanted to spend more, I couldn't. The screen gets tired of my face too.",
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
                <p>Maybe success isn't just about courage but also about calculation.</p>`,
          image: 'blog/third.jpg',
          date: '21:09 • Mar 24, 2025'
        },
        {
          id: 1,
          text: 'Astana is a city where the wind blows away the unnecessary, leaving only the essential. Here, the past can\'t keep up with the present, and the future is already under construction. The cold teaches resilience, while the endless sky inspires dreams. Perhaps Astana is not just a place, but a state of mind.',
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
        /* {
          id: 11,
          text: `Ол жігіттің бұл өмірдің барлық бояуын көргенін қалады. Уақыт өте келе, ол шынымен де бәрін көрді. Бірақ сол түстердің ешқайсысы оның жанында тұрақтап қалмады. Үш жыл өтсе де, әрбір атқан таң мен әрбір түскен көлеңкенің арасынан ол әлі де тек оған ұқсайтын сол бір түсті іздеумен жүр.`,
          image: 'blog/ten.PNG',
          date: '18:30 • Мамыр 8, 2026'
        }, */
        {
          id: 10,
          text: `<p>Өмірді жиі ертеңге қалдырамыз. «Кейін жасармын», «қазір уақыты емес», «бір күні» деп ойлаймыз. Себептер бар сияқты, бірақ шынын айтсақ — көбінесе бұл жай ғана қорқыныш. Біреуді көңілін қалдырудан, үмітті ақтамаудан, ақымақ болып көрінуден немесе сын естуден қорқу.</p>
                <p>Осыдан біз өзімізге бәрін қиындатамыз. Ешкім сұрамаса да шектеулер қоямыз, шеңберлер ойлап табамыз. «Жеткілікті дайын» боламыз деген бір керемет сәтті күтеміз. Ал ол сәт мүлде келмеуі мүмкін.</p>
                <p>Сонымен қатар ешкім бізде қанша уақыт бар екенін білмейді.</p>
                <p>Сондықтан кейде жай ғана жасау керек. Мінсіз емес, бәрін ойластырмай — қалай шықса солай. Қорқынышты болса да, байқап көру керек. «Қажет» жерге емес, қалаған жеріңе бару керек.</p>
                <p>Шықпады ма? Жарайды, алға жүресің. Бұл қалыпты.</p>
                <p>Мүлде байқап та көрмеу — одан да жаман.</p>
                <p>Сондықтан кейінге қалдырма. Қазір өмір сүр, қазір қуан. Өйткені «кейін» мүлде келмеуі мүмкін.</p>`,
          image: 'blog/nine.jpeg',
          date: '14:00 • Сәуір 21, 2026'
        },
        {
          id: 9,
          text: 'Атам үнемі айтатын: «Жолдың қиынын іздеме, өмір онсыз да қиын. Егер жеңіл жолы болса, сонымен жүр», — деп. Шынымен де, бәрін қиындатып қажеті не? Болмаған нәрсені өткенде қалдырып, алға жылжу керек. Алда әлі талай қызық бар, бір орында тұрып қалма.',
          image: 'blog/ata.png',
          date: '12:25 • Наурыз 16, 2026'
        },
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
      this.sendTelegramMessage(`User clicked on ${link.name} 🚀`);
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
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  background: #0a0a0a;
  color: white;
  width: 100%;
  height: 100%;
}

#app {
  background: #0a0a0a;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.container {
  width: 100%;
  max-width: 420px;
  text-align: center;
  padding: 24px 18px 100px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  z-index: 1;
}

.bg-glow { display: none; }

/* ─── Equalizer ─── */
.equalizer {
  position: absolute;
  top: 26px;
  left: 24px;
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 18px;
  cursor: pointer;
  z-index: 10;
}

.bar {
  width: 3px;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  transition: background 0.3s;
}

.bar.playing {
  background: rgba(255, 255, 255, 0.85);
  animation: equalize 1s ease-in-out infinite;
}

.bar.playing:nth-child(1) { animation-delay: 0s; }
.bar.playing:nth-child(2) { animation-delay: 0.2s; }
.bar.playing:nth-child(3) { animation-delay: 0.35s; }
.bar.playing:nth-child(4) { animation-delay: 0.1s; }

@keyframes equalize {
  0%, 100% { height: 4px; }
  50%       { height: 16px; }
}

/* ─── Lang switcher ─── */
.lang-switcher {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 5px 12px;
  z-index: 10;
}

.lang-switcher button {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.28);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  letter-spacing: 0.4px;
  transition: color 0.2s;
}

.lang-switcher button.lang-active {
  color: #fff;
  font-weight: 600;
}

.lang-divider {
  color: rgba(255, 255, 255, 0.1);
  font-size: 12px;
}

/* ─── Profile ─── */
.profile {
  padding-top: 62px;
  margin-bottom: 24px;
}

.avatar-container {
  position: relative;
  width: 96px;
  height: 96px;
  margin: 0 auto 14px;
  overflow: visible;
}

.dragonfly-field {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: visible;
}

.dragonfly {
  position: absolute;
  top: 50%;
  left: 50%;
}

.df1 {
  width: 68px;
  height: 47px;
  margin-left: -34px;
  margin-top: -24px;
  opacity: 0.62;
  animation: df-fly-1 9s ease-in-out infinite;
}

.df2 {
  width: 58px;
  height: 40px;
  margin-left: -29px;
  margin-top: -20px;
  opacity: 0.5;
  animation: df-fly-2 7s ease-in-out infinite 2.2s;
}

.df3 {
  width: 50px;
  height: 35px;
  margin-left: -25px;
  margin-top: -18px;
  opacity: 0.56;
  animation: df-fly-3 11s ease-in-out infinite 4.5s;
}

.df-svg { display: block; width: 100%; height: 100%; }

.wings {
  transform-box: fill-box;
  transform-origin: center;
  animation: wingflap 0.18s linear infinite;
}

@keyframes wingflap {
  0%, 100% { transform: scaleY(1); }
  50%       { transform: scaleY(0.08); }
}

@keyframes df-fly-1 {
  0%   { transform: translate(-10px, -82px) rotate(-30deg); }
  8%   { transform: translate(42px,  -92px) rotate(12deg);  }
  20%  { transform: translate(90px,  -12px) rotate(82deg);  }
  30%  { transform: translate(76px,   22px) rotate(88deg);  }
  32%  { transform: translate(74px,   26px) rotate(90deg);  }
  44%  { transform: translate(18px,   80px) rotate(10deg);  }
  54%  { transform: translate(-52px,  68px) rotate(-62deg); }
  66%  { transform: translate(-92px,   2px) rotate(-98deg); }
  76%  { transform: translate(-70px, -30px) rotate(-70deg); }
  88%  { transform: translate(-28px, -88px) rotate(-28deg); }
  100% { transform: translate(-10px, -82px) rotate(-30deg); }
}

@keyframes df-fly-2 {
  0%   { transform: translate(74px,  -30px) rotate(62deg);  }
  10%  { transform: translate(22px,   15px) rotate(118deg); }
  22%  { transform: translate(-58px,  58px) rotate(-128deg);}
  34%  { transform: translate(-80px,   4px) rotate(-92deg); }
  44%  { transform: translate(-28px, -65px) rotate(-22deg); }
  52%  { transform: translate(12px,  -18px) rotate(22deg);  }
  62%  { transform: translate(80px,  -75px) rotate(38deg);  }
  74%  { transform: translate(90px,   10px) rotate(78deg);  }
  86%  { transform: translate(55px,   50px) rotate(50deg);  }
  93%  { transform: translate(30px,  -10px) rotate(55deg);  }
  100% { transform: translate(74px,  -30px) rotate(62deg);  }
}

@keyframes df-fly-3 {
  0%   { transform: translate(-44px, -74px) rotate(-28deg); }
  7%   { transform: translate(-80px, -24px) rotate(-78deg); }
  16%  { transform: translate(-60px,  48px) rotate(-145deg);}
  26%  { transform: translate(12px,   80px) rotate(12deg);  }
  34%  { transform: translate(75px,   50px) rotate(72deg);  }
  40%  { transform: translate(85px,  -14px) rotate(88deg);  }
  46%  { transform: translate(50px,  -70px) rotate(44deg);  }
  54%  { transform: translate(8px,   -88px) rotate(2deg);   }
  62%  { transform: translate(-32px, -76px) rotate(-38deg); }
  70%  { transform: translate(-74px, -36px) rotate(-72deg); }
  80%  { transform: translate(-88px,  18px) rotate(-98deg); }
  90%  { transform: translate(-50px,  62px) rotate(-140deg);}
  96%  { transform: translate(-20px,  30px) rotate(-50deg); }
  100% { transform: translate(-44px, -74px) rotate(-28deg); }
}

.avatar-ring {
  position: relative;
  z-index: 1;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 3px;
  background: transparent;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  display: block;
}

.profile-name {
  font-size: 21px;
  font-weight: 700;
  letter-spacing: -0.4px;
  color: #fff;
  margin-bottom: 5px;
}

.profile-handle {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.28);
  font-weight: 400;
  letter-spacing: 0.3px;
}

/* ─── Tabs ─── */
.tabs {
  display: flex;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 14px;
  padding: 4px;
}

.tabs button {
  flex: 1;
  background: transparent;
  border: none;
  padding: 9px 20px;
  color: rgba(255, 255, 255, 0.35);
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  border-radius: 10px;
  transition: all 0.22s ease;
  letter-spacing: 0.2px;
}

.tabs .active {
  background: #fff;
  color: #0a0a0a;
}

/* ─── Links ─── */
.links {
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.link-item {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 14px;
  overflow: hidden;
  transition: background 0.2s, border-color 0.2s, transform 0.2s;
}

.link-item:hover {
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(255, 255, 255, 0.14);
  transform: translateY(-1px);
}

.telegram-item {
  margin-top: 10px;
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.06);
}

.telegram-item .tg-icon {
  background: rgba(255, 255, 255, 0.06);
}

.link-anchor {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: white;
  text-decoration: none;
  padding: 13px 16px;
}

.link-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.link-icon-wrap {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: rgba(255, 255, 255, 0.65);
  transition: background 0.2s, color 0.2s;
}

.link-item:hover .link-icon-wrap {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.link-text {
  font-size: 15px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
}

.arrow {
  color: rgba(255, 255, 255, 0.18);
  flex-shrink: 0;
  transition: color 0.2s, transform 0.2s;
}

.link-item:hover .arrow {
  color: rgba(255, 255, 255, 0.4);
  transform: translateX(2px);
}

.designed-by {
  margin-top: 28px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.13);
  letter-spacing: 0.5px;
}

/* ─── Blog ─── */
.blog {
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.blog-post {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  overflow: hidden;
}

.post-image-wrap {
  position: relative;
  cursor: pointer;
  overflow: hidden;
}

.post-image {
  display: block;
  width: 100%;
  max-height: 360px;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.post-image-wrap:hover .post-image {
  transform: scale(1.03);
}

.post-image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10, 10, 10, 0.45) 0%, transparent 55%);
  pointer-events: none;
}

.post-content {
  padding: 14px 16px 16px;
  text-align: left;
}

.post-text-content {
  font-size: 15px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.65;
  margin-bottom: 10px;
}

.post-text-content p {
  margin-bottom: 8px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.78);
}

.post-text-content p:last-child { margin-bottom: 0; }

.post-text-content h3 {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 10px;
}

.post-text-content i {
  color: rgba(255, 255, 255, 0.45);
}

.post-date {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.2);
  letter-spacing: 0.3px;
}

/* ─── Modal ─── */
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(12px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  max-width: 92%;
  max-height: 90%;
}

.modal-image {
  width: 100%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 14px;
}

.close {
  position: absolute;
  top: -14px;
  right: -14px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
  border-radius: 50%;
  font-size: 20px;
  line-height: 1;
  transition: background 0.2s;
  user-select: none;
}

.close:hover {
  background: rgba(255, 255, 255, 0.25);
}

/* ─── Fade ─── */
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }

/* ─── Player overlay ─── */
.player-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1900;
}

/* ─── Player modal ─── */
.player-modal {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 420px;
  background: rgba(16, 16, 16, 0.97);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: none;
  border-radius: 24px 24px 0 0;
  padding: 12px 26px 48px;
  z-index: 2000;
}

.player-handle {
  width: 36px;
  height: 4px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 2px;
  margin: 0 auto 26px;
}

.player-track-info {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
}

.player-cover {
  width: 58px;
  height: 58px;
  border-radius: 11px;
  object-fit: cover;
  flex-shrink: 0;
}

.player-cover-placeholder {
  width: 58px;
  height: 58px;
  border-radius: 11px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.4);
  flex-shrink: 0;
}

.player-meta { text-align: left; }

.player-title {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 4px;
}

.player-artist {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.35);
}

.player-progress {
  width: 100%;
  accent-color: #fff;
  cursor: pointer;
  margin-bottom: 6px;
}

.player-time {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.25);
  margin-bottom: 28px;
}

.player-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 36px;
}

.ctrl-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.55);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: color 0.2s, transform 0.15s;
}

.ctrl-btn:hover {
  color: white;
  transform: scale(1.1);
}

.play-btn {
  width: 58px;
  height: 58px;
  background: #fff;
  border-radius: 50%;
  color: #0a0a0a;
}

.play-btn:hover {
  transform: scale(1.07) !important;
}

/* ─── Slide-up transition ─── */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.slide-up-enter-from,
.slide-up-leave-to   { transform: translateX(-50%) translateY(100%); }
.slide-up-enter-to,
.slide-up-leave-from { transform: translateX(-50%) translateY(0); }
</style>
