<template>
  <Wrapper>
    <Navbar />
    <Nuxt />
  </Wrapper>
</template>

<script>
import Navbar from '@/components/Navbar/guest'
import Wrapper from '@/context/Wrapper'
export default {
  components: {
    Navbar,
    Wrapper
  }
}
</script>

<style>
.page-scroll.active {
  font-weight: 800;
  font-size: 1.1rem !important;
}
input + small {
  color:red;
}
</style>
