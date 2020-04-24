<template>
  <v-container fluid pa-0 ma-0>
    <v-row
      v-if="subscribers.length > 0"
      no-gutters
      style="margin-bottom: 20px;"
    >
      <v-spacer />
      <v-col cols="12" md="2">
        <v-btn
          title="Печать"
          :disabled="!hasPermission('Print')"
          @click="print()"
        >
          Печать
        </v-btn>
      </v-col>
    </v-row>
    <v-row
      v-for="item in subscribers"
      :key="item.id"
      no-gutters
      class="row-item"
    >
      <v-col cols="12" md="4">
        <characteristic title="ИНН">
          {{ item.inn ? item.inn : 'Не указано' }}
        </characteristic>
      </v-col>
      <v-col cols="12" md="3">
        <characteristic title="Краткое наименование">
          {{ item.shortTitle ? item.shortTitle : 'Не указано' }}
        </characteristic>
      </v-col>
      <v-col cols="9" md="3">
        <characteristic title="Телефоны">
          {{ item.phones ? item.phones : 'Не указано' }}
        </characteristic>
      </v-col>
      <v-col cols="12" md="2">
        <v-btn
          title="Редактировать"
          icon
          :disabled="!hasPermission('Edit')"
          nuxt
          :to="getLink(item.id)"
        >
          <v-icon>
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn
          title="Удалить"
          icon
          color="red"
          :disabled="!hasPermission('Delete')"
          @click="deleteSubscriber(item.id)"
        >
          <v-icon>
            mdi-delete
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="subscribers.length === 0">
      <v-col cols="12">
        Абонентов не найдено. Создайте нового абонента.
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Characteristic from '~/components/common/Characteristic'

export default {
  components: { Characteristic },
  computed: {
    ...mapGetters('subscriber', ['subscribers']),
    ...mapGetters('user', ['hasPermission'])
  },
  methods: {
    ...mapActions('subscriber', ['deleteSubscriber']),
    getLink: (id) => `/subscriber/${id}`,
    print() {
      const routeData = this.$router.resolve({
        name: '/subscriber/print'
      })
      window.open(routeData.location.name, 'Print', 'height=1000,width=1000')
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
