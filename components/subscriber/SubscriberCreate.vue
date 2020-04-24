<template>
  <v-container style="max-width: 800px;">
    <v-alert
      v-model="baseErrorShow"
      dismissible
      dark
      color="error"
      width="400"
      class="v-alert"
    >
      {{ baseErrorText }}
    </v-alert>
    <v-form v-model="valid">
      <v-row style="text-align: center;">
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.inn"
            label="ИНН"
            type="number"
            :rules="[(x) => (x || '').length <= 12]"
            required
            outlined
            counter="12"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.shortTitle"
            label="Краткое наименование"
            :rules="[(x) => (x || '').length <= 50]"
            required
            outlined
            counter="50"
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="form.fullTitle"
            label="Полное наименование"
            :rules="[(x) => (x || '').length <= 4000]"
            required
            outlined
            counter="4000"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.address"
            label="Адрес"
            :rules="[(x) => (x || '').length <= 200]"
            required
            outlined
            counter="200"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.phones"
            label="Телефоны"
            :rules="[(x) => (x || '').length <= 200]"
            required
            outlined
            counter="200"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.ownerName"
            label="ФИО руководителя"
            :rules="[(x) => (x || '').length <= 200]"
            required
            outlined
            counter="200"
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="form.representative"
            label="Представитель"
            :rules="[(x) => (x || '').length <= 4000]"
            required
            outlined
            counter="4000"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.representativePhones"
            label="Телефоны представителя"
            :rules="[(x) => (x || '').length <= 200]"
            required
            outlined
            counter="200"
          />
        </v-col>
        <v-col cols="12">
          <v-btn
            v-if="subscriber === null"
            color="primary"
            style="text-transform: none;"
            :disabled="!valid"
            @click="submit"
          >
            Создать
          </v-btn>
          <v-btn
            v-else
            color="primary"
            style="text-transform: none;"
            :disabled="!valid"
            @click="submitExist"
          >
            Сохранить
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    subscriber: {
      type: Object,
      required: false,
      default: null
    }
  },
  data: () => ({
    baseErrorShow: false,
    baseErrorText: '',
    valid: true,
    form: {
      id: null,
      inn: '',
      shortTitle: '',
      fullTitle: '',
      address: '',
      phones: '',
      ownerName: '',
      representative: '',
      representativePhones: ''
    }
  }),
  computed: {
    ...mapGetters('user', ['getUser'])
  },
  beforeMount() {
    if (this.subscriber !== null) {
      this.form = { ...this.subscriber }
    }
  },
  methods: {
    ...mapActions('subscriber', ['addSubscriber', 'updateSubscriber']),
    async submit() {
      try {
        await this.addSubscriber(this.form)
        this.$router.push('/subscriber')
      } catch (error) {
        this.baseErrorText = 'Произошла ошибка.'
        this.baseErrorShow = true
      }
    },
    async submitExist() {
      try {
        await this.updateSubscriber(this.form)
        this.$router.push('/subscriber')
      } catch (error) {
        this.baseErrorText = 'Произошла ошибка.'
        this.baseErrorShow = true
      }
    }
  }
}
</script>
