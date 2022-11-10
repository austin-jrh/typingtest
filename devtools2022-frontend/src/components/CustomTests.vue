<template>
  <div>
    <div :key="test.id" v-for="test in tests">
      <CustomTest
        @run-test="$emit('run-test', test.id)"
        @save-edit-test="$emit('save-edit-test', test)"
        @delete-test="$emit('delete-test', test.id)"
        :test="test"
      />
    </div>
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
  emits: ["run-test", "save-edit-test", "delete-test"],
};
</script>
