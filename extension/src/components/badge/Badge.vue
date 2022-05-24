<script lang="ts" setup>
import classes from './badge.module.css'
</script>

<template>
  <div :class="classes.root">
    <slot />
  </div>
</template>
