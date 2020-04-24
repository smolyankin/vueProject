<template>
  <v-container fluid ma-0 pa-0>
    <div class="page-title">
      Абоненты
    </div>
    <v-row
      v-for="item in subscribersToPrint"
      :key="item.id"
      no-gutters
      class="row-item"
    >
      <v-col cols="6" md="4">
        <characteristic title="ИНН">
          {{ item.inn ? item.inn : 'Не указано' }}
        </characteristic>
      </v-col>
      <v-col cols="6" md="4">
        <characteristic title="Краткое наименование">
          {{ item.shortTitle ? item.shortTitle : 'Не указано' }}
        </characteristic>
      </v-col>
      <v-col cols="6" md="4">
        <characteristic title="Телефоны">
          {{ item.phones ? item.phones : 'Не указано' }}
        </characteristic>
      </v-col>
      <v-col cols="6" md="4">
        <characteristic title="Полное наименование">
          {{ item.fullTitle ? item.fullTitle : 'Не указано' }}
        </characteristic>
      </v-col>
      <v-col cols="6" md="4">
        <characteristic title="Адрес">
          {{ item.address ? item.address : 'Не указано' }}
        </characteristic>
      </v-col>
      <v-col cols="6" md="4">
        <characteristic title="ФИО руководителя">
          {{ item.ownerName ? item.ownerName : 'Не указано' }}
        </characteristic>
      </v-col>
      <v-col cols="6" md="4">
        <characteristic title="Представитель">
          {{ item.representative ? item.representative : 'Не указано' }}
        </characteristic>
      </v-col>
      <v-col cols="6" md="4">
        <characteristic title="Телефоны представителя">
          {{
            item.representativePhones ? item.representativePhones : 'Не указано'
          }}
        </characteristic>
      </v-col>
    </v-row>
    <v-row v-if="subscribersToPrint.length === 0">
      <v-col cols="6">
        Абонентов не найдено.
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import Characteristic from '~/components/common/Characteristic'

export default {
  components: {
    Characteristic
  },
  async fetch({ store, error }) {
    try {
      await store.dispatch('subscriber/fetchSubscribersToPrint')
    } catch (e) {
      error({ statusCode: 500 })
    }
  },
  data: () => ({
    limit: 10
  }),
  computed: {
    ...mapGetters('user', ['getUser']),
    ...mapGetters('subscriber', ['subscribersToPrint']),
    ...mapGetters('user', ['hasPermission'])
  },
  mounted() {
    window.print()
  },
  methods: {
    onPageChange(v) {
      this.$router.push({ query: { page: v } })
      window.scrollTo(0, 0)
    }
  },
  watchQuery: ['page'],
  layout: 'blank',
  middleware: ['authenticated', 'canPrint']
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
.row-item {
  align-items: center;
  border: 1px solid #dddddd;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 20px;
}
</style>
