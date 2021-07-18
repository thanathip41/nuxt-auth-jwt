<template>
  <Login />
</template>
<script>
import Login from '@/components/Login'
export default {
  components: {
    Login
  },
  layout: 'guest',
  middleware: 'auth',
  auth: 'guest',
  data () {
    return {
      login: {
        email: '',
        mobile: ''
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 1000)
    })
  }
}
</script>
