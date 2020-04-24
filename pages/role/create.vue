<template>
  <v-container fluid ma-0 pa-0>
    <div class="page-title">
      Новая роль
    </div>
    <role-create />
  </v-container>
</template>

<script>
import RoleCreate from '~/components/role/RoleCreate.vue'

export default {
  components: {
    RoleCreate
  },
  async fetch({ store, error }) {
    try {
      await store.dispatch('user/fetchUsersWithoutRole')
    } catch (e) {
      error({ statusCode: 500 })
    }
  },
  layout: 'default',
  middleware: 'authenticated'
}
</script>

<style scoped lang="scss">
.page-title {
  text-align: center;
  padding-top: 18px;
  padding-bottom: 30px;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #000000;
}
</style>
