<template>
  <el-container>
    <el-main>
      <UserProfile />
      <TypingTest :timeLeft="timeLeft" />
      <AddCustomTest @add-test="addTest" />
      <CustomTests
        @run-test="runTest"
        @edit-test="editTest"
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
    };
  },
  methods: {
    // Custom Test functionalities
    addTest(test) {
      this.tests = [test, ...this.tests];
      ElMessage({
        type: "success",
        message: "Add successful.",
      });
    },
    runTest(id) {
      console.log("runTest " + id);
    },
    editTest(id) {
      console.log("editTest " + id);
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
  },
  created() {
    // typically, we make a request here
    this.tests = [
      {
        id: 1,
        name: "Test 1",
        description: "This is test 1",
        words: "hi hello world how are you",
      },
      {
        id: 2,
        name: "Test 2",
        description: "This is the second test",
        words: "ni hao ma wo hen xie",
      },
      {
        id: 3,
        name: "Test 3",
        description: "Third test woot woot!",
        words: "one two three four five",
      },
    ];
  },
  mounted() {
    this.startTimer();
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
