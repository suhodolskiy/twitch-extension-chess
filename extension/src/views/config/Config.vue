<script lang="ts" setup>
import { onMounted, reactive } from 'vue'

import IconChat from '@/components/icons/IconChat.vue'
import IconChess from '@/components/icons/IconChess.vue'
import IconRefresh from '@/components/icons/IconRefresh.vue'

import StatButton from '@/components/stat-button/StatButton.vue'

import Button from '@/components/button/Button.vue'
import twitch from '@/libs/twitch'

import classes from './config.module.css'
import { asyncTimeout } from '@/libs/utils'

import { StatType } from '~/shared/types/api'

const stats = [
  { value: StatType.Fide, text: 'Fide' },
  { value: StatType.Rapid, text: 'Rapid' },
  { value: StatType.Bullet, text: 'Bullet' },
  { value: StatType.Blitz, text: 'Blitz' },
  { value: StatType.PuzzleRush, text: 'Puzzles Rush' },
  { value: StatType.Daily, text: 'Daily' },
  { value: StatType.Daily960, text: 'Daily 960' },
  { value: StatType.Puzzles, text: 'Puzzles' },
]

const state = reactive({
  username: '',
  disabled: false,
  stats: [StatType.Rapid, StatType.Bullet, StatType.Blitz, StatType.Daily],
  text: 'Save',
})

onMounted(async () => {
  await twitch.onAuthorized()
  const config = twitch.getConfigurationSegment()

  if (config?.username) state.username = config.username
  if (config?.stats) state.stats = config.stats
})

const onClick = async () => {
  try {
    state.disabled = true
    twitch.setConfigurationSegment({
      username: state.username,
      stats: state.stats,
    })
    state.text = 'Saving...'
    await asyncTimeout(1000)
    state.disabled = false
    state.text = 'Saved!'
    await asyncTimeout(2000)
  } finally {
    state.text = 'Save'
    state.disabled = false
  }
}

const onClickStat = (stat: StatType) => {
  const idx = state.stats.indexOf(stat)

  if (idx === -1) {
    state.stats.push(stat)
  } else {
    state.stats.splice(idx, 1)
  }
}
</script>

<template>
  <div :class="classes.root">
    <div :class="classes.form">
      <a
        :class="classes.logo"
        href="https://headwayapp.co/chess-profile-extension-release-notes"
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        <img src="@/assets/pawn.png" alt="Chess Extension" />
        <div :class="classes.release">Release notes</div>
      </a>

      <input
        type="text"
        v-model="state.username"
        :class="classes.input"
        placeholder="Please enter chess.com username"
      />

      <h2>What stats to show?</h2>

      <div :class="classes.stats">
        <StatButton
          v-for="stat in stats"
          :key="stat.value"
          :active="state.stats?.includes(stat.value)"
          :text="stat.text"
          :index="state.stats?.indexOf(stat.value)"
          @click="onClickStat(stat.value)"
        />
      </div>

      <Button
        :disabled="state.username.length < 2 || state.disabled"
        @click="onClick"
      >
        {{ state.text }}
      </Button>
    </div>

    <div :class="classes.divider"></div>

    <ul :class="classes.list">
      <li>
        <IconChess />
        The list of games displays your last 20 games in the current month
      </li>
      <li>
        <IconRefresh />
        Statistics and the list of games are not updated in real-time. The delay
        is 10 minutes.
      </li>
      <li>
        <IconChat />
        <span>
          If you have questions or suggestions, feel free to contact me
          <a
            href="https://linktr.ee/suhodolskiy"
            target="_blank"
            rel="noopener noreferrer"
          >
            linktr.ee/suhodolskiy
          </a>
        </span>
      </li>
      <li>* not an official chess.com extension</li>
    </ul>
  </div>
</template>
