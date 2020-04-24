<template>
  <v-container fluid ma-0 pa-0>
    <div class="page-title">
      Редактирование абонента
    </div>
    <subscriber-create :subscriber="subscriber" />
  </v-container>
</template>

<script>
import SubscriberCreate from '../../components/subscriber/SubscriberCreate'

export default {
  components: {
    SubscriberCreate
  },
  async asyncData({ store, params, error }) {
    try {
      const subscriber = await store.dispatch(
        'subscriber/fetchSubscriber',
        params.id
      )
      return { subscriber }
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
