<template>
  <header>
    <h1>User</h1>
    <Button text="Sign up" />
    <Button text="Login" />
  </header>
</template>

<script>
import Button from "./Button.vue";
export default {
  name: "UserProfile",
  props: {},
  components: {
    Button,
  },
};
</script>

<style scoped>
header {
  display: flex;
}
</style>
