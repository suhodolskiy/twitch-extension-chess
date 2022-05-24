<script lang="ts" setup>
defineProps({
  viewBox: {
    type: String,
    default: '0 0 24 24',
  },
  size: {
    type: String,
    default: '24px',
  },
  width: {
    type: String,
    default: null,
  },
  height: {
    type: String,
    default: null,
  },
})
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :height="height || size"
    :width="width || size"
    :viewBox="viewBox"
  >
    <slot />
  </svg>
</template>
