<template>
  <div class="userProfile">
    <el-container>
      <!-- <el-header> User </el-header> -->
      <!-- Login -->
      <el-main v-show="shouldShowScreen('login')">
        <el-form ref="form" :model="user" label-width="120px">
          <el-form-item label="Login">
            <el-input placeholder="Login" v-model="user.login"></el-input>
          </el-form-item>
          <el-form-item label="Password">
            <el-input
              placeholder="Password (NOT SECURE)"
              v-model="user.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="onSignUp">Sign Up</el-button>
            <el-button @click="onLogin">Login</el-button>
          </el-form-item>
        </el-form>
      </el-main>
      <!-- Logged in, display user -->
      <el-main v-show="shouldShowScreen('user')">
        <h3>Welcome, {{ user.displayName }}</h3>
        <el-descriptions :column="1" direction="horizontal">
          <el-descriptions-item label="Best WPM">10 WPM</el-descriptions-item>
        </el-descriptions>
        <el-row>
          <el-button type="default" @click="onEditProfile"
            >Edit profile
          </el-button>
          <el-button type="info" @click="onLogout">Logout </el-button>
        </el-row>
      </el-main>
      <!-- Register -->
      <el-main v-show="shouldShowScreen('register')">
        <el-form ref="form" :model="newUser" label-width="120px">
          <el-form-item label="Login">
            <el-input placeholder="Login" v-model="newUser.login"></el-input>
          </el-form-item>
          <el-form-item label="Display Name">
            <el-input
              placeholder="Display Name"
              v-model="newUser.displayName"
            ></el-input>
          </el-form-item>
          <el-form-item label="Password">
            <el-input
              placeholder="Password (NOT SECURE)"
              show-password
              v-model="newUser.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="onRegister">Register</el-button>
            <el-button @click="onCancelRegister">Cancel</el-button>
          </el-form-item>
        </el-form>
      </el-main>
      <!-- Edit profile -->
      <el-main v-show="shouldShowScreen('edit')">
        <el-form ref="form" label-width="120px">
          <el-form-item label="Display Name">
            <el-input placeholder="New Display Name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="onSaveEdit">Save</el-button>
            <el-button @click="onCancelEdit">Cancel</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { breakpointsTailwind } from "@vueuse/core";
import Service from "../Service.js";

export default {
  name: "UserProfile",
  props: {
    user: Object,
  },
  data() {
    return {
      newUser: {
        login: "",
        displayName: "",
        password: "",
      },
      currentScreen: "login", // login, user, register, edit
    };
  },
  methods: {
    onSignUp(e) {
      e.preventDefault();
      this.currentScreen = "register";
    },
    onLogin(e) {
      e.preventDefault();
      //TODO: check if have user with credentials
      this.currentScreen = "user";
    },
    onCancelRegister(e) {
      e.preventDefault();
      this.currentScreen = "login";
    },
    async onRegister(e) {
      e.preventDefault();
      //TODO: validate if all fields are filled
      //validate if not existing user
      const response = await Service.createUser(this.newUser);
      switch (response.status) {
        case "success":
          this.user.login = this.newUser.login;
          this.user.displayName = this.newUser.displayName;
          this.user.password = this.newUser.password;
          this.currentScreen = "user";
          break;
        case "error":
          break;
      }

      //this.currentScreen = "user";
    },
    onLogout(e) {
      e.preventDefault();
      this.currentScreen = "login";
    },
    onEditProfile(e) {
      e.preventDefault();
      //TODO: fill up the fields with current info
      this.currentScreen = "edit";
    },
    onSaveEdit(e) {
      e.preventDefault();
      this.currentScreen = "user";
    },
    onCancelEdit(e) {
      e.preventDefault();
      this.currentScreen = "user";
    },
    shouldShowScreen(screen) {
      return screen === this.currentScreen;
    },
    welcomeMessage() {
      return `Welcome, ${user.displayName}`;
    },
  },
  emits: ["add-user"],
};
</script>

<style scoped>
header {
  display: flex;
}
h3 {
  text-align: left;
}
</style>
