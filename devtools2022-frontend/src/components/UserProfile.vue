<template>
  <div class="userProfile">
    <el-container>
      <!-- Login -->
      <el-main v-show="shouldShowScreen('login')">
        <el-form ref="form" :model="inputUser" label-width="120px">
          <el-form-item label="Login">
            <el-input placeholder="Login" v-model="inputUser.login"></el-input>
          </el-form-item>
          <el-form-item label="Password">
            <el-input
              placeholder="Password (NOT SECURE)"
              v-model="inputUser.password"
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
        <h3>{{ user.displayName }}</h3>
        <el-descriptions :column="1" direction="horizontal" border>
          <el-descriptions-item label="Login">{{
            user.login
          }}</el-descriptions-item>
          <el-descriptions-item label="Best WPM"
            >{{ user.highscore.toFixed(2) }} WPM</el-descriptions-item
          >
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
        <el-form ref="form" :model="inputUser" label-width="120px">
          <el-form-item label="Login">
            <el-input placeholder="Login" v-model="inputUser.login"></el-input>
          </el-form-item>
          <el-form-item label="Display Name">
            <el-input
              placeholder="Display Name"
              v-model="inputUser.displayName"
            ></el-input>
          </el-form-item>
          <el-form-item label="Password">
            <el-input
              placeholder="Password (NOT SECURE)"
              show-password
              v-model="inputUser.password"
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
            <el-input
              placeholder="New Display Name"
              v-model="inputUser.displayName"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="onSaveEdit">Save</el-button>
            <el-button @click="onCancelEdit" type="info">Cancel</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import Service from "../Service.js";

export default {
  name: "UserProfile",
  props: {
    user: Object,
  },
  data() {
    return {
      inputUser: {
        // separated from "user" so that we can clear the fields
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
      this.clearInputUser();
      this.currentScreen = "register";
    },
    async onLogin(e) {
      e.preventDefault();
      //check if login is filled
      if (this.inputUser.login === "") {
        ElMessage({
          message: "Please fill in Login field",
          type: "warning",
        });
        return;
      }
      //TODO: check if have user with credentials
      const response = await Service.loginUser(this.inputUser);
      if (response === null) {
        //user does not exist
        ElMessage({
          type: "error",
          message: "Wrong login or password.",
        });
      } else {
        this.updateUser(response);
        this.currentScreen = "user";
        this.clearInputUser();
        this.$emit("login-user");
        ElMessage({
          type: "success",
          message: "Login successful.",
        });
      }
    },
    onCancelRegister(e) {
      e.preventDefault();
      this.clearInputUser();
      this.currentScreen = "login";
    },
    async onRegister(e) {
      e.preventDefault();
      //TODO: validate if all fields are filled
      if (this.inputUser.login === "" || this.inputUser.displayName === "") {
        ElMessage({
          type: "warning",
          message: "Please enter Login and Display Name.",
        });
        return;
      }
      //validate if not existing user
      const response = await Service.createUser(this.inputUser);
      switch (response.status) {
        case "success":
          this.inputUser.highscore = 0;
          this.updateUser(this.inputUser);
          this.clearInputUser();
          this.currentScreen = "user";
          break;
        case "error":
          ElMessage({
            type: "error",
            message: response.message,
          });
          break;
        default:
          console.log("something went wrong...");
      }
    },
    onLogout(e) {
      e.preventDefault();
      this.user.login = "";
      this.user.displayName = "";
      this.user.password = "";
      this.user.highscore = 0;
      this.currentScreen = "login";
      this.$emit("logout-user");
    },
    onEditProfile(e) {
      e.preventDefault();
      //TODO: fill up the fields with current info
      this.inputUser.login = this.user.login;
      this.inputUser.displayName = this.user.displayName;
      this.inputUser.password = this.user.password;
      this.inputUser.highscore = this.user.highscore;
      this.currentScreen = "edit";
    },
    async onSaveEdit(e) {
      e.preventDefault();
      const response = await Service.updateUser(this.inputUser);
      switch (response.status) {
        case "success":
          this.updateUser(this.inputUser);
          ElMessage({
            type: "success",
            message: "Updated profile.",
          });
          break;
        case "error":
          ElMessage({
            type: "warning",
            message: "Error. Unable to update profile.",
          });
        default:
          console.log("something went wrong...");
      }
      this.currentScreen = "user";
    },
    onCancelEdit(e) {
      e.preventDefault();
      this.clearInputUser();
      this.currentScreen = "user";
    },
    shouldShowScreen(screen) {
      return screen === this.currentScreen;
    },
    clearInputUser() {
      this.inputUser.login = "";
      this.inputUser.displayName = "";
      this.inputUser.password = "";
    },
    updateUser(newUser) {
      this.user.login = newUser.login;
      this.user.displayName = newUser.displayName;
      this.user.password = newUser.password;
      this.user.highscore = newUser.highscore;
    },

    async onMount() {
      if (this.user.login !== "") {
        const response = await Service.loginUser(this.user);
        if (response === null) {
          //user does not exist
          ElMessage({
            type: "error",
            message: "Wrong login or password.",
          });
        } else {
          this.updateUser(response);
          this.currentScreen = "user";
          this.clearInputUser();
          this.$emit("login-user");
          ElMessage({
            type: "success",
            message: "Login successful.",
          });
        }
      }
    },
  },
  mounted() {},
  emits: ["login-user", "logout-user"],
};
</script>

<style scoped>
header {
  display: flex;
}
h3 {
  text-align: left;
}
.el-form {
  width: 25%;
  min-width: 400px;
}

.el-descriptions {
  width: 25%;
  min-width: 400px;
  margin: 10px;
}
</style>
