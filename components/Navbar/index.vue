<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-navbar">
    <div class="container">
      <NuxtLink class="nav-link" aria-current="page" to="/">
        <i class="fa fa-home" />
      </NuxtLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div id="navbarSupportedContent" class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li v-if="user" class="nav-item">
            <NuxtLink class="nav-link" aria-current="page" to="/about">
              <i class="fa fa-check" /> about
            </NuxtLink>
          </li>
        </ul>

        <ul v-if="!user" class="navbar-nav mr-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <NuxtLink class="nav-link" to="/login">
              Sign In
            </NuxtLink>
          </li>
          <li class="nav-item sign-up">
            <NuxtLink class="nav-link" to="/register">
              Sign Up
            </NuxtLink>
          </li>
        </ul>

        <ul v-else class="navbar-nav mr-auto mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <a
              id="navbarDropdown"
              class="nav-link dropdown-toggle"
              href="/"
              role="button"
              data-bs-toggle="dropdown"
            >
              <i class="fa fa-user">  {{ user.name }} </i>

            </a>

            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li class="text-center cursor-pointer" @click="$auth.logout()">
                <i class="fa fa-sign-out"> Sign out </i>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import './style.css'
export default {
  computed: {
    user () {
      return this.$auth.user
    }
  }
}
</script>
