<template>
  <div class="userProfile">
    <el-header>
      <h1>User</h1>
      <!-- <el-form ref="form" :model="user" label-width="120px">
        <el-form-item label="Login">
          <el-input placeholder="Login" v-model="user.login"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input
            placeholder="Password"
            v-model="user.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSignUp">Sign Up</el-button>
          <el-button @click="onLogin">Login</el-button>
        </el-form-item>
      </el-form> -->
    </el-header>
  </div>
</template>

<script>
export default {
  name: "UserProfile",
  data() {
    return {
      user: {
        login: "",
        password: "",
      },
    };
  },
  methods: {
    onSignUp(e) {
      e.preventDefault();
      console.log("signup");
    },
    onLogin(e) {
      e.preventDefault();
      console.log("login");
    },
  },
  props: {},
};
</script>

<style scoped>
header {
  display: flex;
}
</style>
