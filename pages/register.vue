<template>
  <Register />
</template>
<script>
import Register from '@/components/Register'
export default {
  components: {
    Register
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
  },
  methods: {

  }
}
</script>
