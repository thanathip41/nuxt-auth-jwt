<template>
  <section class="section text-center">
    <h1 class="title ">
      About
    </h1>
    <h3 class="title ">
      name : {{ user.name }}
    </h3>
    <h3 class="title ">
      email : {{ user.email }}
    </h3>
  </section>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$auth.user
    }
  }
}
</script>
