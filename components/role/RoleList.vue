<template>
  <v-container fluid pa-0 ma-0>
    <v-row v-for="item in userRoles" :key="item.id" no-gutters class="row-item">
      <v-col cols="12" md="4">
        <characteristic title="Название">
          <nuxt-link :to="getLink(item.id)">
            {{ item.title }}
          </nuxt-link>
        </characteristic>
      </v-col>
      <v-col cols="12" md="4">
        <characteristic title="Типы доступа">
          {{
            item.userRoleTypes !== null && item.userRoleTypes.length > 0
              ? types(item).join(', ')
              : 'Не указано'
          }}
        </characteristic>
      </v-col>
      <v-col cols="9" md="3">
        <characteristic title="Кол-во пользователей">
          {{ item.users !== null ? item.users.length : '0' }}
        </characteristic>
      </v-col>
    </v-row>
    <v-row v-if="userRoles.length === 0">
      <v-col cols="12">
        Ролей не найдено. Создайте новую роль.
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import Characteristic from '~/components/common/Characteristic'
import UserRoleType from '~/helpers/UserRoleType'

export default {
  components: { Characteristic },
  computed: {
    ...mapGetters('userRole', ['userRoles'])
  },
  methods: {
    getLink: (id) => `/role/${id}`,
    types(item) {
      return item.userRoleTypes.map((x) => UserRoleType.getById(x).title)
    }
  }
}
</script>

<style scoped lang="scss">
.row-item {
  align-items: center;
  border: 1px solid #dddddd;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 20px;
}
</style>
