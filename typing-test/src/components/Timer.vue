<template>
  <div>
    <h1>{{ timeLeft }}</h1>
  </div>
</template>

<script>
export default {
  name: "Timer",
  props: {
    timeLeft: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
h1 {
  font-size: 50px;
  color: black;
}
</style>
