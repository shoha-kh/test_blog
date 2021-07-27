<template>
  <svg :class="`svg-icon ${style}`" aria-hidden="true">
    <use :href="iconName()" />
    <!-- <use :xlink:href="iconName()" /> -->
  </svg>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    iconClass: { type: String, required: true },
    lineIcon: { type: Boolean, default: false }
  },
  setup: props => {
    const style = ref('')

    style.value = props.lineIcon ? 'stroke' : 'fill'

    const iconName = () => {
      return `#icon-${props.iconClass}`
    }

    return { style, iconName }
  }
})

// '.svg-icon' styles in @/assets/styles/global/basic/svg-cion.css
</script>
