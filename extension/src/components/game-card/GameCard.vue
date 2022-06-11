<script lang="ts" setup>
import { computed } from 'vue'

import IconDaily960 from '@/components/icons/IconDaily960.vue'
import IconBullet from '@/components/icons/IconBullet.vue'
import IconRapid from '@/components/icons/IconRapid.vue'
import IconBlitz from '@/components/icons/IconBlitz.vue'
import IconDaily from '@/components/icons/IconDaily.vue'
import IconLoss from '@/components/icons/IconLoss.vue'
import IconDraw from '@/components/icons/IconDraw.vue'
import IconWin from '@/components/icons/IconWin.vue'

import { GameStatus, GameType, type Game } from '~/shared/types/api'

import classes from './game-card.module.css'

const props = defineProps<{ game: Game }>()

const typeIcon = computed(() => {
  switch (props.game.type) {
    case GameType.Blitz:
      return IconBlitz
    case GameType.Bullet:
      return IconBullet
    case GameType.Daily:
      return IconDaily
    case GameType.Daily960:
      return IconDaily960
    default:
      return IconRapid
  }
})

const statusIcon = computed(() => {
  switch (props.game.status) {
    case GameStatus.Win:
      return IconWin
    case GameStatus.Draw:
      return IconDraw
    default:
      return IconLoss
  }
})

const onClick = () => window.open(props.game.url, '_blank')
</script>

<template>
  <div :class="classes.root" @click="onClick">
    <component :is="typeIcon" size="16px" />

    <!-- <Avatar
      :src="game.opponent.avatar"
      :name="game.opponent.username"
      size="22px"
    /> -->

    <div :class="classes.content">
      <div :class="classes.username">{{ game.opponent.username }}</div>
      <span>{{ game.opponent.stat }}</span>
    </div>

    <component :is="statusIcon" size="20px" />
  </div>
</template>
