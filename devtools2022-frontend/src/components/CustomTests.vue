<template>
  <div :key="test.id" v-for="test in tests">
    <CustomTest
      @run-test="$emit('run-test', test.id)"
      @edit-test="$emit('edit-test', test.id)"
      @delete-test="$emit('delete-test', test.id)"
      :test="test"
    />
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
  emits: ["run-test", "edit-test", "delete-test"],
};
</script>
