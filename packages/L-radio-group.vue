<template>
    <div class="li-radio-group">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'li-radio-group',
  provide () {
    return {
      RadioGroup: this
    }
  },
  props: {
    value: null
  },
  methods: {
    handle () {
      console.log('this---', this)
    }
  }
}
</script>
