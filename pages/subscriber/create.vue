<template>
  <v-container fluid ma-0 pa-0>
    <div class="page-title">
      Новый абонент
    </div>
    <subscriber-create />
  </v-container>
</template>

<script>
import SubscriberCreate from '~/components/subscriber/SubscriberCreate.vue'

export default {
  components: {
    SubscriberCreate
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
