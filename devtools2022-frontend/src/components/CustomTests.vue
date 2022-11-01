<template>
  <div :key="test.id" v-for="test in tests">
    <CustomTest @delete-test="$emit('delete-test', test.id)" :test="test" />
  </div>
</template>

<script>
import CustomTest from "./CustomTest.vue";
export default {
  name: "CustomTests",
  props: {
    tests: Array,
  },
  components: {
    CustomTest,
  },
  emits: ["delete-test"],
};
</script>
