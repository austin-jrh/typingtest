<template>
  <el-card>
    <el-card shadow="never" v-show="!(gameState === 'finished')">
      <Timer :timeLeft="timeLeft" />
      <span v-bind:class="getWordClass(i)" v-for="(word, i) in testWords">{{
        word
      }}</span>
    </el-card>
    <el-card class="testResult" v-show="gameState === 'finished'">
      <h3>Typing Test Result</h3>
      <h1>5 WPM</h1>
      <div>Words Per Minute</div>
    </el-card>
    <el-row>
      <el-input v-model="input" />
      <el-button type="primary" @click="onClickReset">Reset</el-button>
    </el-row>
  </el-card>
</template>

<script>
import Timer from "./Timer.vue";

export default {
  name: "TypingTest",
  props: {
    timeLeft: Number,
    testWords: Array,
    gameState: String,
  },
  components: {
    Timer,
  },
  data() {
    return {
      input: "",
      currentWordIndex: 0,
      wrongWordIndex: [],
    };
  },
  watch: {
    input(newInput) {
      if (newInput.length > 0 && this.gameState === "waiting") {
        this.$emit("start-test");
      }
      if (newInput[newInput.length - 1] === " ") {
        var word = newInput.trim();
        console.log(word);
        this.checkMatch(word);
        this.currentWordIndex = this.currentWordIndex + 1;
        this.input = "";
        return;
      }

      const count = newInput.length;
      const currWord = this.testWords[this.currentWordIndex];
      const compareWord = currWord.substring(0, count);

      this.wrongWordIndex[this.currentWordIndex] = !(compareWord === newInput);
    },
  },
  methods: {
    checkMatch(word) {
      const wordToCompare = this.testWords[this.currentWordIndex];
      console.log(`${wordToCompare} vs. ${word} is ${wordToCompare === word}`);
      this.wrongWordIndex[this.currentWordIndex] = !(wordToCompare === word);
    },

    getWordClass(i) {
      if (i > this.currentWordIndex) {
        return "none";
      } else if (i == this.currentWordIndex) {
        return this.wrongWordIndex[i] ? "currentWrong" : "currentCorrect";
      } else {
        return this.wrongWordIndex[i] ? "pastWrong" : "pastCorrect";
      }
    },

    onClickReset() {
      this.input = "";
      this.currentWordIndex = 0;
      this.wrongWordIndex = [];
      this.$emit("reset-test");
    },
  },
  emits: ["start-test", "reset-test"],
};
</script>

<style scoped>
h1 {
  font-size: 50px;
}
.el-input {
  width: 500px;
}

.el-row {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

span {
  display: inline-block;
  margin-left: 10px;
}

.currentCorrect {
  background-color: #d9d9d9;
}

.currentWrong {
  background-color: #ff8080;
}

.none {
  background-color: #ffffff;
}

.pastCorrect {
  color: green;
}

.pastWrong {
  color: red;
}
</style>
