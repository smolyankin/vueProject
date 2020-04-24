<template>
  <v-container style="max-width: 800px;">
    <v-form @submit.prevent="submit">
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
      <v-row no-gutters style="text-align: center;">
        <v-col cols="12">
          <v-text-field
            v-model="title"
            label="Название*"
            required
            outlined
            :error-messages="titleErrors"
            @input="$v.title.$touch()"
            @blur="$v.title.$touch()"
          />
        </v-col>
        <v-col cols="12">
          <v-select
            v-model="userRoleTypes"
            label="Действия"
            :items="roleTypes"
            item-text="title"
            item-value="id"
            multiple
            clearable
            outlined
            placeholder="Не выбрано"
          />
        </v-col>
        <v-col v-if="usersWithoutRole.length" cols="12">
          <v-select
            v-model="selectedUsers"
            :items="usersWithoutRole"
            placeholder="Не выбрано"
            item-text="name"
            item-value="id"
            multiple
            clearable
            outlined
            hide-no-data
          />
        </v-col>
        <v-col cols="12">
          <v-btn
            color="primary"
            :disabled="$v.$invalid"
            style="text-transform: none;"
            @click="submit"
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
import UserRoleType from '~/helpers/UserRoleType'

export default {
  props: {
    userRole: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    title: null
  }),
  computed: {
    ...mapGetters('user', ['getUser'])
  },
  beforeMount() {
    this.title = this.userRole.title
  },
  methods: {
    ...mapActions('userRole', ['updateUserRole']),
    types() {
      return this.userRole.userRoleTypes.map(
        (x) => UserRoleType.getById(x).title
      )
    }
  }
}
</script>
