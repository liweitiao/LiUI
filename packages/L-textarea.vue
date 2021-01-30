<template>
  <div>
    <textarea
    name=""
    id="li-textarea"
    :placeholder="placeholder"
    :maxlength="maxLength"
    cols="30"
    :style="{resize: resize, width: width}"
    v-model="inputText"
    @input="printText"
    rows="10">
    </textarea>
    <br>
    <span>{{ inputNum }}/{{ maxLength }}</span>
  </div>
</template>

<script>
export default {
  name: 'li-textarea',
  props: {
    maxLength: {
      type: Number,
      default: 300
    },
    resize: {
      type: String,
      default: 'none'
    },
    width: {
      type: String,
      default: '400px'
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      size: 400,
      inputText: ''
    }
  },
  computed: {
    inputNum () {
      return this.inputText.length
    }
  },
  methods: {
    printText () {
      console.log(this.inputText)
    }
  },
  mounted () {
    console.log(this.maxLength)
  }
}
</script>

<style>
#li-textarea {
  /* width: 500px; */
  height: 100px;
  border: 1px solid #dadada;
  /* resize:vertical; */
}

#li-textarea:focus {
  outline: 1px solid red;
}
</style>
