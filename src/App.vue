<template>
  <router-view />
</template>

<script>
export default {
  data() {
    return {
      playlist: [
        import.meta.env.BASE_URL + 'audio/play1.m4a',
        import.meta.env.BASE_URL + 'audio/play2.m4a',
        import.meta.env.BASE_URL + 'audio/play3.m4a'
      ],
      currentTrackIndex: 0,
      audio: null
    };
  },
  mounted() {
    this.playMusic();
  },
  methods: {
    playMusic() {
      if (this.audio) {
        this.audio.pause();
        this.audio.removeEventListener('ended', this.playNext);
      }

      this.audio = new Audio(this.playlist[this.currentTrackIndex]);
      this.audio.loop = false;

      this.audio.addEventListener('canplaythrough', () => {
        this.audio.play().catch(error => {
          console.warn('Автовоспроизведение заблокировано браузером:', error);
        });
      });

      this.audio.addEventListener('ended', this.playNext);
      this.audio.load();
    },
    playNext() {
      this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
      this.playMusic();
    }
  },
  beforeUnmount() {
    if (this.audio) {
      this.audio.removeEventListener('ended', this.playNext);
      this.audio.pause();
    }
  }
};
</script>
