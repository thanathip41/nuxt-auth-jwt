<template>
  <Home />
</template>
<script>
import Home from '@/components/Home'

export default {
  components: {
    Home
  },
  mounted () {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 1000)
    })
  }
}
</script>
