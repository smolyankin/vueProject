<template>
  <div
    :class="
      isDetails ? 'l-text-field-container-details' : 'l-text-field-container'
    "
  >
    <div :class="isDetails ? 'l-text-field-label-details' : ''">
      <slot name="label" />
    </div>
    <div :class="isDetails ? 'l-text-field-text-details' : 'l-text-field-text'">
      <slot name="text" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LTextField',
  props: {
    isDetails: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="scss">
.l-text-field-container {
  padding-top: 4px;
  padding-bottom: 4px;
}
.l-text-field-container-details {
  padding-bottom: 20px;
}
.l-text-field-label-details {
  text-align: left;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: #000000;
  padding-bottom: 10px;
}
.l-text-field-text {
  padding-top: 4px;
  word-break: break-word;
}
.l-text-field-text-details {
  padding-top: 8px;
  word-break: break-word;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
  padding-bottom: 8px;
  border: 1px solid grey;
  border-radius: 4px;
  padding-left: 10px;
}
</style>
