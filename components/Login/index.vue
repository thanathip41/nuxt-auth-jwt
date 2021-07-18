<template>
  <div class="container-login">
    <div class="card">
      <div class="card-body">
        <form class="container" @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label class="form-label">Email address</label>
            <input
              id="email"
              ref="email"
              type="text"
              class="form-control"
              name="email"
              @change="handleChange"
            >
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input
              id="password"
              ref="password"
              type="password"
              class="form-control"
              name="password"
              autocomplete="off"
              @change="handleChange"
            >
          </div>
          <button class="btn btn-primary btn-block">
            Sign In
          </button>
        </form>
      </div>
      <div class="text-center pt-2 pb-3">
        New to account?
        <NuxtLink class="m-2" to="/register">
          Create an account.
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import Validate from '@/shared/validate'
// import { authLogin, userProfile } from '@/api'
import './style.css'
export default {
  data () {
    return {
      login: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    handleChange  (e) {
      this.login = {
        ...this.login,
        [e.target.name]: e.target.value
      }
    },
    async handleSubmit (event) {
      try {
        const objRequire = {
          email: this.$refs.email,
          password: this.$refs.password
        }
        const formElem = event.target
        const $v = new Validate(formElem)
        $v.validateRequired(objRequire)
        $v.validateEmail({ email: this.$refs.email })

        const formValidate = $v.formValidate()
        if (!formValidate) { this.addErrorLogin(event) }
        await this.$auth.loginWith('local', { data: this.login })
        return
      } catch (err) {
        console.log(err)
        this.addErrorLogin(event)
      }
    },
    reponseSuccess (data) {
      this.$store.commit('setUser', data)
    },
    addErrorLogin (event) {
      for (const i in this.login) {
        const inputElem = this.$refs[i]
        inputElem.classList.remove('is-valid')
        inputElem.classList.add('is-invalid')
      }
    }
  }

}
</script>
