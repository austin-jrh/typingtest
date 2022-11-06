<template>
  <el-container>
    <el-main>
      <UserProfile />
      <TypingTest :timeLeft="timeLeft" />
      <AddCustomTest @add-test="addTest" />
      <CustomTests
        @run-test="runTest"
        @save-edit-test="saveEditTest"
        @delete-test="deleteTest"
        :tests="tests"
      />
    </el-main>
  </el-container>
</template>

<script>
import UserProfile from "./components/UserProfile";
import CustomTests from "./components/CustomTests.vue";
import AddCustomTest from "./components/AddCustomTest.vue";
import TypingTest from "./components/TypingTest.vue";
import { ElMessage, ElMessageBox } from "element-plus";

const profileURL = "http://localhost:3001/profiles";
const testsURL = "http://localhost:3001/tests";

export default {
  name: "App",
  components: {
    UserProfile,
    CustomTests,
    AddCustomTest,
    TypingTest,
  },
  data() {
    return {
      tests: [],
      timeLimit: 20,
      timePassed: 0,
      timerInterval: null,
      currentLogin: "guest",
    };
  },
  methods: {
    // Custom Test functionalities
    async addTest(test) {
      //this.tests = [test, ...this.tests];
      var data = test;
      data.owner = this.currentLogin;
      console.log(`addTest() : ${data}`);
      this.createTestAPI(data)
        .then(() => {
          this.getDataAPI(testsURL).then((response) => {
            this.tests = response;
            ElMessage({
              type: "success",
              message: "Add successful.",
            });
          });
        })
        .catch((error) => {
          ElMessage({
            type: "danger",
            message: `Something went wrong. ${error}`,
          });
        });
    },
    runTest(id) {
      console.log("runTest " + id);
    },
    async saveEditTest(test) {
      this.editTestAPI(test)
        .then(() => {
          this.getDataAPI(testsURL).then((response) => {
            this.tests = response;
            ElMessage({
              type: "warning",
              message: "Edit successful.",
            });
          });
        })
        .catch((error) => {
          ElMessage({
            type: "danger",
            message: `Something went wrong. ${error}`,
          });
        });
    },
    async deleteTest(id) {
      ElMessageBox.confirm(
        "Are you sure you want to delete this test?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => {
          this.deleteTestAPI(id).then(() => {
            this.getDataAPI(testsURL).then((response) => {
              this.tests = response;
              ElMessage({
                type: "success",
                message: "Delete completed.",
              });
            });
          });
        })
        .catch(() => {
          ElMessage({ type: "info", message: "Delete canceled." });
        });
    },

    // Timer functionalities
    startTimer() {
      this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
    },
    onTimesUp() {
      clearInterval(this.timerInterval);
    },

    // API
    async getDataAPI(url) {
      try {
        let response = await fetch(url);

        if (response.status === 200) {
          let data = await response.json();
          console.log(data);
          return data.rows;
        }
      } catch (err) {
        console.log(err.message);
      }
    },
    async getTestAPI(_id) {
      await fetch(
        testsURL +
          "/test" +
          new URLSearchParams({
            owner: this.currentLogin,
            id: _id,
          }),
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          return data.row;
        })
        .catch((error) => {
          console.error("Error", error);
        });
    },
    async createTestAPI(data) {
      try {
        await fetch(testsURL, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      } catch (err) {
        console.log(err.message);
      }
    },
    async editTestAPI(data) {
      await fetch(testsURL, {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).catch((error) => {
        console.error("Error ", error);
      });
    },
    async deleteTestAPI(_id) {
      let url =
        testsURL +
        "/test?" +
        new URLSearchParams({ owner: this.currentLogin, id: _id });
      await fetch(url, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }).catch((error) => {
        console.error("Error", error);
      });
    },
  },
  async created() {
    // this.tests = [
    //   {
    //     id: 1,
    //     name: "Test 1",
    //     description: "This is test 1",
    //     words: "hi hello world how are you",
    //   },
    //   {
    //     id: 2,
    //     name: "Test 2",
    //     description: "This is the second test",
    //     words: "ni hao ma wo hen xie",
    //   },
    //   {
    //     id: 3,
    //     name: "Test 3",
    //     description: "Third test woot woot!",
    //     words: "one two three four five",
    //   },
    // ];
    try {
      this.tests = await this.getDataAPI(testsURL);
    } catch (error) {
      console.log(error.message);
    }
  },
  mounted() {
    this.startTimer();
    //this.getDataAPI(profileURL);
  },
  computed: {
    timeLeft() {
      return this.timeLimit - this.timePassed;
    },
  },

  watch: {
    timeLeft(newValue) {
      if (newValue === 0) {
        this.onTimesUp();
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  /* line-height: 60px; */
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  /* line-height: 160px; */
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
