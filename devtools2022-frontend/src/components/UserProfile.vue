<template>
  <header>
    <div>
      <h1>User</h1>
      <div>
        <label>Login:</label>
        <input type="text" placeholder="Login" />
        <label>Password:</label>
        <input type="text" placeholder="Password" />
        <Button text="Sign up" />
        <Button text="Login" />
      </div>
    </div>
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
