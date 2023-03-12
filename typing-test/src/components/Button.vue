<template>
  <button @click="onClick(text)">{{ text }}</button>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: String,
  },
  methods: {
    onClick(string) {
      console.log(`${string} onClick()`);
    },
  },
};
</script>
