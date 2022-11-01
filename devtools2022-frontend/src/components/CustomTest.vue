<template>
  <div class="test">
    <h3>
      {{ test.name }}
      <i @click="$emit('delete-test', test.id)" class="fas fa-times"></i>
    </h3>
    <p>{{ test.description }}</p>
    <p>{{ test.words }}</p>
  </div>
</template>

<script>
export default {
  name: "CustomTest",
  props: {
    test: Object,
  },
};
</script>

<style scoped>
.fas {
  color: red;
}
</style>
