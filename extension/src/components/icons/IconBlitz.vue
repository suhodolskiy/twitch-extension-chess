<script lang="ts" setup>
import Icon from '@/components/icon/Icon.vue'

defineProps({
  color: {
    type: String,
    default: 'var(--color-yellow)',
  },
})
</script>

<template>
  <Icon>
    <path
      d="M8.871 2 6.586 12.514H10.3L8.271 22h1.2l7.943-12.571h-4.057L16.386 2H8.87Z"
      :fill="color"
    />
  </Icon>
</template>
