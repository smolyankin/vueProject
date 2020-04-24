<template>
  <v-container fluid ma-0 pa-0>
    <div class="page-title">
      Редактирование роли
    </div>
    <role-create :user-role="userRole" />
  </v-container>
</template>

<script>
import RoleCreate from '../../components/role/RoleCreate'

export default {
  components: {
    RoleCreate
  },
  async asyncData({ store, params, error }) {
    try {
      const userRole = await store.dispatch('userRole/fetchUserRole', params.id)
      return { userRole }
    } catch (e) {
      error({ statusCode: 404 })
    }
  },
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
