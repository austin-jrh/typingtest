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
      await this.createTest(data);
      this.tests = await this.getData(testsURL);
      ElMessage({
        type: "success",
        message: "Add successful.",
      });
    },
    runTest(id) {
      console.log("runTest " + id);
    },
    async saveEditTest(test) {
      // await this.editTest(test);
      // this.tests = await this.getData(testsURL);
      // console.log(test);
      this.editTest(test).then(() => {
        this.getData(testsURL).then((response) => {
          this.tests = response;
        });
      });
      // var tempTests = this.tests;
      // var index = tempTests.findIndex((item) => item.id == test.id);
      // tempTests[index] = test;
      // this.tests = tempTests;
    },
    deleteTest(id) {
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
          this.tests = this.tests.filter((test) => test.id !== id);
          ElMessage({
            type: "success",
            message: "Delete completed.",
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
    async getData(url) {
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
    async createTest(data) {
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
    async editTest(data) {
      await fetch(testsURL, {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        // .then(() => {
        //   this.getData(testsURL);
        // })
        .catch((error) => {
          console.error("Error ", error);
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
      this.tests = await this.getData(testsURL);
    } catch (error) {
      console.log(error.message);
    }
  },
  mounted() {
    this.startTimer();
    //this.getData(profileURL);
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
