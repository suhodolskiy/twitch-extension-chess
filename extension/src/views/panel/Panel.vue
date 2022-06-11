<script lang="ts" setup>
import { reactive, onMounted } from 'vue'

import Header from '@/components/header/Header.vue'
import Loader from '@/components/loader/Loader.vue'
import IconHorse from '@/components/icons/IconHorse.vue'
import StatCard from '@/components/stat-card/StatCard.vue'
import GameCard from '@/components/game-card/GameCard.vue'

import twitch from '@/libs/twitch'
import api from '@/libs/api'

import { StatType, type User } from '~/shared/types/api'

import classes from './panel.module.css'
import { AxiosError } from 'axios'
import { computed } from '@vue/reactivity'

const state = reactive<{
  user?: User
  stats?: StatType[]
  loading: boolean
  error?: string
}>({
  loading: true,
})

const stats = computed(() => {
  if (!state.user?.stats) return []

  const result = []

  for (const type of state.stats || []) {
    const stat = state.user.stats.find((stat) => stat.type === type)
    if (stat) result.push(stat)
  }

  return result
})

onMounted(async () => {
  const app = document.getElementById('app')

  try {
    await twitch.onAuthorized()

    const config = twitch.getConfigurationSegment()

    if (!config?.username?.length) {
      throw 'Please configure the extension'
    }

    state.stats = config.stats || [
      StatType.Rapid,
      StatType.Bullet,
      StatType.Blitz,
      StatType.Daily,
    ]

    const response = await api.getUser(config.username)

    if (!response.data?.username) {
      throw 'Failed to load user data'
    }

    state.user = response.data

    if (response.data.avatar && app) {
      app.style.backgroundImage = `url(${response.data.avatar})`
    }
  } catch (error) {
    if (app?.style.backgroundImage) {
      app.style.backgroundImage = ''
    }

    switch (true) {
      case error instanceof AxiosError && error.response?.status === 404:
        state.error = 'User not found'
        break
      case error instanceof String:
        state.error = error as string
        break
      default:
        state.error = 'Something went wrong'
    }
  } finally {
    state.loading = false
  }
})
</script>

<template>
  <div v-if="state.loading || state.error" :class="classes.loader">
    <img :class="classes.pawn" src="@/assets/pawn.png" alt="Chess Extension" />

    <Loader v-if="state.loading" color="#c2c0bf" />

    <template v-if="state.error">
      <div :class="classes.message">
        {{ state.error }}
      </div>

      <div :class="classes.hint">
        If you have questions or suggestions, feel free to contact me
        <a
          href="https://linktr.ee/suhodolskiy"
          target="_blank"
          rel="noopener noreferrer"
        >
          linktr.ee/suhodolskiy
        </a>
      </div>
    </template>
  </div>

  <div v-if="state.user" :class="classes.root">
    <Header :user="state.user" />

    <div :class="classes.panel">
      <div v-if="stats.length" :class="classes.stats">
        <StatCard
          v-for="stat in stats"
          :username="state.user.username"
          v-bind="stat"
          :key="stat.type"
        />
      </div>

      <template v-if="state.user.games.length">
        <h2>Completed Games</h2>

        <div :class="classes.games">
          <GameCard
            v-for="game in state.user.games"
            :game="game"
            :key="game.id"
          />
        </div>
      </template>

      <div v-else :class="classes.empty">
        <IconHorse /> No completed games this month
      </div>
    </div>
  </div>
</template>
