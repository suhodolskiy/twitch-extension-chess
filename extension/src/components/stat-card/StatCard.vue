<script lang="ts" setup>
import { computed } from 'vue'

import IconRapid from '@/components/icons/IconRapid.vue'
import IconHorse from '@/components/icons/IconHorse.vue'
import IconBullet from '@/components/icons/IconBullet.vue'
import IconBlitz from '@/components/icons/IconBlitz.vue'
import IconDaily960 from '@/components/icons/IconDaily960.vue'
import IconDaily from '@/components/icons/IconDaily.vue'
import IconPuzzle from '@/components/icons/IconPuzzle.vue'
import IconPuzzleRush from '@/components/icons/IconPuzzleRush.vue'

import { StatType } from '~/shared/types/api'

import classes from './stat-card.module.css'

const props = defineProps<{
  type: StatType
  value?: number
  username: string
}>()

const icon = computed(() => {
  switch (props.type) {
    case StatType.Fide:
      return IconHorse
    case StatType.Bullet:
      return IconBullet
    case StatType.Blitz:
      return IconBlitz
    case StatType.PuzzleRush:
      return IconPuzzleRush
    case StatType.Daily:
      return IconDaily
    case StatType.Puzzles:
      return IconPuzzle
    case StatType.Daily960:
      return IconDaily960
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
    case StatType.PuzzleRush:
      return `https://chess.com/stats/puzzles/${props.username}`
    case StatType.Rapid:
      return `https://chess.com/stats/live/rapid/${props.username}`
    case StatType.Daily960:
      return `https://www.chess.com/stats/daily/chess960/${props.username}`
    case StatType.Daily:
      return `https://www.chess.com/stats/daily/chess/${props.username}`
    default:
      return `https://www.chess.com/member/${props.username}`
  }
})

const name = computed(() => {
  switch (props.type) {
    case StatType.Fide:
      return 'Fide'
    case StatType.Rapid:
      return 'Rapid'
    case StatType.Bullet:
      return 'Bullet'
    case StatType.Blitz:
      return 'Blitz'
    case StatType.PuzzleRush:
      return 'Puzzle R'
    case StatType.Daily:
      return 'Daily'
    case StatType.Daily960:
      return 'Daily'
    case StatType.Puzzles:
      return 'Puzzles'
    default:
      return '–'
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
      <div :class="classes.name">{{ name }}</div>
    </div>
  </a>
</template>
