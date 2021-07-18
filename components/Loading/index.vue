<template>
  <div v-show="loading" class="preloader">
    <div class="preloader-inner">
      <div class="preloader-icon">
        <span />
        <span />
      </div>
    </div>
  </div>
</template>

<script>
import './style.css'
export default {
  data: () => ({
    loading: true,
    overlay: false
  }),
  methods: {
    start () {
      this.loading = true
      this.overlay = true
    },
    finish () {
      this.loading = false
      this.overlay = false
    }
  }
}
</script>
