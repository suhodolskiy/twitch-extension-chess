<script lang="ts" setup>
import classes from './stat-button.module.css'

defineProps<{
  index?: number
  active?: boolean
  text: string
}>()
</script>

<template>
  <div :class="[classes.root, active && classes.active]">
    <div v-if="active" :class="classes.number">
      {{ (index || 0) + 1 }}
    </div>

    {{ text }}
  </div>
</template>
