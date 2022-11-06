<template>
  <el-card>
    <el-card shadow="never">
      <Timer :timeLeft="timeLeft" />
      <!-- grey #d9d9d9 -->
      <!-- red #ff8080 -->
      <span v-bind:class="getWordClass(i)" v-for="(word, i) in testWords">{{
        word
      }}</span>
    </el-card>

    <el-input v-model="input" />
  </el-card>
</template>

<script>
import { Fragment } from "vue";
import Timer from "./Timer.vue";

export default {
  name: "TypingTest",
  props: {
    timeLeft: Number,
    testWords: Array,
  },
  components: {
    Timer,
    Fragment,
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

      console.log(this.wrongWordIndex);
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
  },
};
</script>

<style scoped>
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
