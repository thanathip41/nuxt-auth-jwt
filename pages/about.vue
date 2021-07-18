<template>
  <About />
</template>
<script>
import About from '@/components/About'

export default {
  components: {
    About
  },
  middleware: 'auth',
  mounted () {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 1000)
    })
  }
}
</script>
