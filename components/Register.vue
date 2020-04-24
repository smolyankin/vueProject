<template>
  <v-container style="max-width: 400px;">
    <v-stepper v-model="step" style="box-shadow: white !important;">
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-form @submit.prevent="submit">
            <v-alert
              v-model="baseErrorShow"
              dismissible
              dark
              color="error"
              width="400"
              style="text-align: left;"
            >
              {{ baseErrorText }}
            </v-alert>
            <v-row no-gutters>
              <v-col cols="12" style="margin-top: 10px;">
                <v-text-field
                  v-model="form.name"
                  label="Имя*"
                  required
                  outlined
                  :error-messages="nameErrors"
                  @input="$v.form.name.$touch()"
                  @blur="$v.form.name.$touch()"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.email"
                  label="Email*"
                  required
                  outlined
                  :error-messages="emailErrors"
                  @input="$v.form.email.$touch()"
                  @blur="$v.form.email.$touch()"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.password"
                  label="Пароль*"
                  required
                  outlined
                  :error-messages="passwordErrors"
                  :type="showP ? 'text' : 'password'"
                  :append-icon="showP ? 'mdi-eye-off' : 'mdi-eye'"
                  color="primary"
                  @input="$v.form.password.$touch()"
                  @blur="$v.form.password.$touch()"
                  @click:append="showP = !showP"
                />
              </v-col>
              <v-col cols="12">
                <v-btn
                  color="primary"
                  :disabled="$v.form.$invalid"
                  style="text-transform: none;"
                  @click="submit"
                >
                  Регистрация
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-stepper-content>
        <v-stepper-content step="2">
          Благодарим за регистрацию.
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { email, required } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import _md5 from 'md5'

export default {
  mixins: [validationMixin],
  data: () => ({
    form: {
      name: '',
      email: '',
      password: ''
    },
    showP: false,
    baseErrorShow: false,
    baseErrorText: '',
    step: 1
  }),
  validations: {
    form: {
      name: { required },
      email: { required, email },
      password: { required }
    }
  },
  computed: {
    nameErrors() {
      const errors = []
      if (!this.$v.form.name.$dirty) {
        return errors
      }
      !this.$v.form.name.required &&
        errors.push('Поле обязательно для заполнения')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.form.password.$dirty) {
        return errors
      }
      !this.$v.form.password.required &&
        errors.push('Поле обязательно для заполнения')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.form.email.$dirty) {
        return errors
      }
      !this.$v.form.email.email &&
        errors.push('Не действительный адрес электронной почты')
      !this.$v.form.email.required &&
        errors.push('Поле обязательно для заполнения')
      return errors
    }
  },
  methods: {
    ...mapActions('user', { userRegister: 'register' }),
    async submit() {
      this.$v.form.$touch()
      if (this.$v.form.$invalid) {
        // eslint-disable-next-line no-console
        console.warn('Error')
        return
      }
      try {
        const hash = _md5(this.form.password + 'qwerty123')
        const data = {
          name: this.form.name,
          email: this.form.email,
          password: hash
        }
        await this.userRegister(data)
        this.step = 2
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('произошла ошибка при регистрации', error)
        if (error.response.data === 'user already exist') {
          this.baseErrorText = 'Email занят'
        } else {
          this.baseErrorText = 'При регистрации произошла ошибка.'
        }
        this.baseErrorShow = true
      }
    }
  }
}
</script>

<style lang="scss">
.v-alert__wrapper {
  max-width: 94%;
}
</style>

<style scoped lang="scss">
.v-stepper {
  box-shadow: 0px 0px white !important;
}
.v-stepper__content {
  padding: 0px !important;
}
</style>
