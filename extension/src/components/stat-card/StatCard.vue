<script lang="ts" setup>
import { computed } from 'vue'

import IconRapid from '@/components/icons/IconRapid.vue'
import IconBullet from '@/components/icons/IconBullet.vue'
import IconBlitz from '@/components/icons/IconBlitz.vue'
import IconPuzzleRush from '@/components/icons/IconPuzzleRush.vue'

import { StatType } from '@/libs/api/types'

import classes from './stat-card.module.css'

const props = defineProps<{
  type: StatType
  title: string
  value?: number
  username: string
}>()

const icon = computed(() => {
  switch (props.type) {
    case StatType.Bullet:
      return IconBullet
    case StatType.Blitz:
      return IconBlitz
    case StatType.PuzzlesRush:
      return IconPuzzleRush
    default:
      return IconRapid
  }
})

const url = computed(() => {
  switch (props.type) {
    case StatType.Bullet:
      return `https://chess.com/stats/live/bullet/${props.username}`
    case StatType.Blitz:
      return `https://chess.com/stats/live/blitz/${props.username}`
    case StatType.PuzzlesRush:
      return `https://chess.com/stats/puzzles/${props.username}`
    default:
      return `https://chess.com/stats/live/rapid/${props.username}`
  }
})
</script>

<template>
  <a
    :class="classes.root"
    :href="url"
    target="_blank"
    rel="noopener noreferrer nofollow"
  >
    <component :is="icon" size="20px" />
    <div :class="classes.content">
      <div :class="classes.result">{{ value || '–' }}</div>
      <div :class="classes.name">{{ title }}</div>
    </div>
  </a>
</template>
