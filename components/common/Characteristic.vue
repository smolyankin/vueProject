<template>
  <l-text-field class="characteristic">
    <template #label>
      <div class="characteristic__title">
        {{ title }}
      </div>
    </template>
    <template #text>
      <div class="characteristic__content">
        <slot />
      </div>
    </template>
  </l-text-field>
</template>

<script>
import LTextField from '~/components/common/LTextField'

export default {
  components: {
    LTextField
  },
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.characteristic {
  padding-top: 8px;
  padding-bottom: 8px;

  &__title {
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    color: #bbbbbb;
  }
  &__content {
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
  }
}
</style>
