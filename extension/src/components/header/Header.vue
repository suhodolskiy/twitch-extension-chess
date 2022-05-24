<script lang="ts" setup>
import Avatar from '@/components/avatar/Avatar.vue'
import Badge from '@/components/badge/Badge.vue'

import type { User } from '@/libs/api/types'

import classes from './header.module.css'

defineProps<{ user: User }>()
</script>

<template>
  <header :class="classes.root">
    <a
      :class="classes.user"
      :href="user.url"
      target="_blank"
      rel="noopener noreferrer nofollow"
    >
      <Avatar :src="user.avatar" :name="user.username" size="32px" />

      <div :class="classes.content">
        <div :class="classes.header">
          <Badge v-if="user.title">
            {{ user.title }}
          </Badge>

          <div :class="classes.username">{{ user.username }}</div>
        </div>

        <span v-if="user.name" :class="classes.fullname">{{ user.name }}</span>
      </div>
    </a>

    <a :href="user.url" target="_blank" rel="noopener noreferrer nofollow">
      <img :class="classes.logo" src="@/assets/logo.png" alt="chess.com" />
    </a>
  </header>
</template>
