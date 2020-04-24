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
      <v-col
        v-if="
          userRole === null
            ? usersWithoutRole.length
            : existUserRole.availableUsers.length
        "
        cols="12"
      >
        <v-select
          v-model="selectedUsers"
          :items="
            userRole === null ? usersWithoutRole : existUserRole.availableUsers
          "
          placeholder="Не выбрано"
          item-text="name"
          item-value="id"
          multiple
          clearable
          outlined
          hide-no-data
          :value-comparator="userComparator"
        />
      </v-col>
      <v-col cols="12">
        <v-btn
          v-if="userRole === null"
          color="primary"
          :disabled="$v.$invalid"
          style="text-transform: none;"
          @click="submit"
        >
          Создать
        </v-btn>
        <v-btn
          v-else
          color="primary"
          :disabled="$v.$invalid"
          style="text-transform: none;"
          @click="submitExist"
        >
          Сохранить
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'
import UserRoleType from '~/helpers/UserRoleType'

export default {
  mixins: [validationMixin],
  props: {
    userRole: {
      type: Object,
      required: false,
      default: null
    }
  },
  data: () => ({
    baseErrorShow: false,
    baseErrorText: '',
    title: '',
    userRoleTypes: null,
    selectedUsers: null
  }),
  validations: {
    title: { required }
  },
  computed: {
    ...mapGetters('user', ['getUser', 'usersWithoutRole']),
    ...mapGetters('userRole', { existUserRole: 'userRole' }),
    titleErrors() {
      const errors = []
      if (!this.$v.title.$dirty) {
        return errors
      }
      !this.$v.title.required && errors.push('Поле обязательно для заполнения')
      return errors
    },
    roleTypes: () => UserRoleType.getAll()
  },
  beforeMount() {
    if (this.userRole !== null) {
      this.title = this.userRole.title
      this.userRoleTypes = this.userRole.userRoleTypes
      this.selectedUsers = this.userRole.users.map((x) => x.id)
    }
  },
  methods: {
    ...mapActions('userRole', ['addUserRole', 'updateUserRole']),
    async submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        // eslint-disable-next-line no-console
        console.warn('Error')
        return
      }
      try {
        const role = {
          title: this.title,
          userRoleTypes: this.userRoleTypes,
          userIds: this.selectedUsers
        }
        await this.addUserRole(role)
        this.$router.push('/role')
      } catch (error) {
        this.baseErrorText = 'Произошла ошибка.'
        this.baseErrorShow = true
      }
    },
    async submitExist() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        // eslint-disable-next-line no-console
        console.warn('Error')
        return
      }
      try {
        const role = {
          id: this.userRole.id,
          title: this.title,
          userRoleTypes: this.userRoleTypes,
          userIds: this.selectedUsers
        }
        await this.updateUserRole(role)
        this.$router.push('/role')
      } catch (error) {
        this.baseErrorText = 'Произошла ошибка.'
        this.baseErrorShow = true
      }
    },
    userComparator(first, second) {
      return first === second
    }
  }
}
</script>
