<template>
  <div class="container">
    <UserProfile />
    <AddCustomTest @add-test="addTest" />
    <CustomTests @delete-test="deleteTest" :tests="tests" />
  </div>
</template>

<script>
import UserProfile from "./components/UserProfile";
import CustomTests from "./components/CustomTests.vue";
import AddCustomTest from "./components/AddCustomTest.vue";

export default {
  name: "App",
  components: {
    UserProfile,
    CustomTests,
    AddCustomTest,
  },
  data() {
    return {
      tests: [],
    };
  },
  methods: {
    addTest(test) {
      this.tests = [...this.tests, test];
    },
    deleteTest(id) {
      if (confirm("Are you sure?")) {
        this.tests = this.tests.filter((test) => test.id !== id);
      }
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
</style>
