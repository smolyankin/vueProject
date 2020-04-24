<template>
  <v-container fluid ma-0 pa-0>
    <div class="page-title">
      Абоненты
    </div>
    <v-container fluid>
      <v-row no-gutters style="margin-bottom: 12px">
        <v-col cols="12" md="2">
          <v-btn
            :dark="hasPermission('Add')"
            title="Создать"
            color="primary"
            class="add-button"
            :disabled="!hasPermission('Add')"
            nuxt
            to="/subscriber/create"
          >
            Создать
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <subscriber-list />
    <v-row no-gutters>
      <v-pagination
        v-if="subscribersTotal > limit"
        :value="parseInt($route.query.page, 10) || 1"
        :length="length"
        color="primary"
        total-visible="10"
        @input="onPageChange"
      />
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SubscriberList from '~/components/subscriber/SubscriberList.vue'

export default {
  components: {
    SubscriberList
  },
  async fetch({ store, query, error }) {
    const page = query.page || 1
    const skip = (page - 1) * 10
    try {
      await store.dispatch('subscriber/fetchSubscribers', skip)
    } catch (e) {
      error({ statusCode: 500 })
    }
  },
  data: () => ({
    limit: 10
  }),
  computed: {
    ...mapGetters('user', ['getUser']),
    ...mapGetters('subscriber', ['subscribersTotal']),
    ...mapGetters('user', ['hasPermission']),
    length() {
      return Math.ceil(this.subscribersTotal / this.limit)
    }
  },
  methods: {
    ...mapActions('subscriber', ['fetchSubscribers']),
    onPageChange(v) {
      this.$router.push({ query: { page: v } })
      window.scrollTo(0, 0)
    }
  },
  watchQuery: ['page'],
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
.add-button {
  width: 100% !important;
  height: 34px !important;
  text-transform: none;
  padding: 0 !important;

  span {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
  }

  @media screen and (max-width: 959px) {
    width: 100%;
    margin: 6px 0;
  }
}
</style>
