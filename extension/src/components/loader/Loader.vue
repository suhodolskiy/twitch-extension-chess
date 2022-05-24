<script lang="ts" setup>
import { computed } from 'vue'

import classes from './loader.module.css'

const props = defineProps({
  size: {
    type: Number,
    default: 24,
  },
  width: {
    type: Number,
    default: 3,
  },
  color: {
    type: String,
    default: '#fff',
  },
  underlayColor: {
    type: String,
    default: 'rgba(255, 255, 255, 0.3)',
  },
})

const radius = 20

const viewBoxSize = computed(() => {
  return radius / (1 - props.width / props.size)
})

const strokeWidth = computed(() => {
  return (props.width / props.size) * viewBoxSize.value * 2
})
</script>

<template>
  <div :class="classes.loader">
    <svg
      :viewBox="`${viewBoxSize} ${viewBoxSize} ${2 * viewBoxSize} ${
        2 * viewBoxSize
      }`"
      :class="classes.svg"
      :height="size"
      :width="size"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        :style="{ color: underlayColor }"
        :class="classes.circleUnderlay"
        :stroke-width="strokeWidth"
        :cx="2 * viewBoxSize"
        :cy="2 * viewBoxSize"
        :r="radius"
      />
      <circle
        :stroke-width="strokeWidth"
        :style="{ color: color }"
        :class="classes.circle"
        :cx="2 * viewBoxSize"
        :cy="2 * viewBoxSize"
        :r="radius"
      />
    </svg>
  </div>
</template>
