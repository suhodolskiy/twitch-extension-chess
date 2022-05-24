<script lang="ts" setup>
import { onMounted, reactive } from 'vue'

import IconChat from '@/components/icons/IconChat.vue'
import IconChess from '@/components/icons/IconChess.vue'
import IconRefresh from '@/components/icons/IconRefresh.vue'

import Button from '@/components/button/Button.vue'
import twitch from '@/libs/twitch'

import classes from './config.module.css'
import { asyncTimeout } from '@/libs/utils'

const state = reactive({
  username: '',
  disabled: false,
  text: 'Save',
})

onMounted(async () => {
  await twitch.onAuthorized()

  const config = twitch.getConfigurationSegment()
  if (config?.username) state.username = config.username
})

const onClick = async () => {
  try {
    state.disabled = true
    twitch.setConfigurationSegment({ username: state.username })
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
</script>

<template>
  <div :class="classes.root">
    <div :class="classes.form">
      <img
        :class="classes.pawn"
        src="@/assets/pawn.png"
        alt="Chess Extension"
      />

      <input
        type="text"
        v-model="state.username"
        :class="classes.input"
        placeholder="Please enter chess.com username"
      />
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
    </ul>
  </div>
</template>
