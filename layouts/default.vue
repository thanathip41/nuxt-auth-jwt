<template>
  <Wrapper>
    <Navbar />
    <div class="container">
      <Nuxt />
    </div>
  </Wrapper>
</template>

<script>
import Navbar from '@/components/Navbar'
import Wrapper from '@/context/Wrapper'
export default {
  components: {
    Navbar,
    Wrapper
  }
}
</script>
