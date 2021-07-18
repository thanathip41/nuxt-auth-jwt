<template>
  <div class="container-login">
    <div class="card">
      <div class="card-body">
        <form class="container" @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label class="form-label"> Name</label>
            <input
              id="name"
              ref="name"
              type="text"
              class="form-control"
              name="name"
              @change="handleChange"
            >
          </div>
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
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input
              id="passwordConfirmation"
              ref="passwordConfirmation"
              type="password"
              class="form-control"
              name="password_confirmation"
              autocomplete="off"
              @change="handleChange"
            >
          </div>
          <button class="btn btn-primary btn-block">
            Sign Up
          </button>
        </form>
      </div>
      <div class="text-center pt-2 pb-3">
        Account?
        <NuxtLink class="m-2" to="login">
          Sign in.
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import Validate from '@/shared/validate'
import { authRegister } from '@/api'
import './style.css'
export default {
  data () {
    return {
      register: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  methods: {
    handleChange  (e) {
      this.register = {
        ...this.register,
        [e.target.name]: e.target.value
      }
    },
    async handleSubmit (event) {
      try {
        const objRequire = {
          name: this.$refs.name,
          email: this.$refs.email,
          password: this.$refs.password,
          passwordConfirmation: this.$refs.passwordConfirmation
        }
        const formElem = event.target
        const $v = new Validate(formElem)
        $v.validateRequired(objRequire)
        $v.validateEmail({ email: this.$refs.email })

        const formValidate = $v.formValidate()
        if (formValidate) {
          const response = await authRegister(this.register)
          if (response.success) {
            await this.$auth.loginWith('local', {
              data: {
                email: this.register.email,
                password: this.register.password
              }
            })
          }
        } else {
          this.addErrorLogin(event)
        }
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
