<script lang="ts" setup>
import type { PropType } from 'vue'

import Loader from '@/components/loader/Loader.vue'

import classes from './button.module.css'

const emit = defineEmits<{ (event: 'click', value: Event): void }>()

const props = defineProps({
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const onClick = (event: Event) => {
  if (props.disabled) return
  emit('click', event)
}
</script>

<template>
  <button
    :type="type"
    :class="[classes.root, { [classes.disabled]: disabled }]"
    @click="onClick"
  >
    <slot />
  </button>
</template>
