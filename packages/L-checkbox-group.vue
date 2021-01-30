<template>
    <div class="li-checkbox-group">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'li-checkbox-group',
  provide () {
    return {
      CheckboxGroup: this
    }
  },
  props: {
    value: {
      type: Array
    }
  }
}
</script>
