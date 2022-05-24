<script lang="ts" setup>
import { computed } from 'vue'

import classes from './avatar.module.css'

const props = defineProps<{
  src?: string
  name: string
  size: string
}>()

const background = computed(() => {
  if (props.src) return

  const colors = [
    '#ee1e34',
    '#ff7a2a',
    '#1e9850',
    '#1c6bff',
    '#df2f9b',
    '#af34fe',
    '#473497',
    '#473497',
    '#12b2f3',
    '#15c1b0',
    '#79a00b',
  ]

  let sum = 0

  for (let idx = 0; idx < props.name.length; idx++) {
    sum += props.name.charCodeAt(idx)
  }

  return colors[sum % colors.length]
})
</script>

<template>
  <div
    :class="[classes.root]"
    :style="{ background, width: size, height: size }"
  >
    <img v-if="src" :src="src" :alt="name" />
    <template v-else>{{ name[0] }}</template>
  </div>
</template>
