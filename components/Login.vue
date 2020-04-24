<template>
  <v-container style="max-width: 350px">
    <v-form @submit.prevent="submit">
      <v-container>
        <v-layout wrap>
          <v-alert
            v-model="baseErrorShow"
            dismissible
            dark
            color="error"
            width="350"
          >
            {{ baseErrorText }}
          </v-alert>
          <v-flex xs12>
            <v-text-field
              v-model="email"
              label="Email*"
              required
              outlined
              :error-messages="emailErrors"
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            />
          </v-flex>
          <v-flex xs12>
            <v-text-field
              v-model="password"
              label="Пароль*"
              required
              outlined
              :error-messages="passwordErrors"
              :type="showP ? 'text' : 'password'"
              :append-icon="showP ? 'mdi-eye-off' : 'mdi-eye'"
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
              @click:append="showP = !showP"
            />
          </v-flex>
        </v-layout>
      </v-container>
      <div style="margin: 20px 0;">
        <v-btn
          type="submit"
          color="primary"
          style="width: 70%;"
          class="login-button"
        >
          Войти
        </v-btn>
      </div>
      <div style="margin: 20px 0;">
        <v-btn
          outlined
          color="primary"
          class="login-button"
          nuxt
          to="/registration"
        >
          Регистрация
        </v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import _get from 'lodash/get'
import { validationMixin } from 'vuelidate'
import { email, required } from 'vuelidate/lib/validators'
import _md5 from 'md5'

export default {
  mixins: [validationMixin],
  data: () => ({
    showP: false,
    baseErrorText: '',
    baseErrorShow: false,
    email: '',
    password: ''
  }),
  validations: {
    email: { required, email },
    password: { required }
  },
  computed: {
    ...mapGetters('user', ['getUser']),
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) {
        return errors
      }
      !this.$v.password.required &&
        errors.push('Поле обязательно для заполнения.')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) {
        return errors
      }
      !this.$v.email.email && errors.push('Введен неправльный e-mail адрес.')
      !this.$v.email.required && errors.push('Поле обязательно для заполнения.')
      return errors
    }
  },
  methods: {
    submit() {
      this.$v.$touch()
      this.baseErrorShow = false
      if (this.$v.$invalid) {
      } else {
        const hash = _md5(this.password + 'qwerty123')
        const request = this.$store.dispatch('user/login', {
          email: this.email,
          password: hash
        })
        request
          .then(() => {
            this.$router.push('/')
          })
          .catch((e) => {
            this.baseErrorText = _get(
              e,
              'response.data.error_description',
              'invalid email or password'
            )
            this.baseErrorShow = true
          })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.login-button {
  text-transform: none;
}
</style>
