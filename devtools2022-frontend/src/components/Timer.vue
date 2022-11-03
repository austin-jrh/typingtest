<template>
  <h1>{{ timeLeft }}</h1>
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
};
</script>
