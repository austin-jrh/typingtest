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
      <h1>{{ finalWPM }} WPM</h1>
      <el-descriptions :column="4" direction="vertical" border>
        <el-descriptions-item
          label="Raw WPM"
          label-align="center"
          align="center"
          >{{ this.allTypedEntries / 5 }}</el-descriptions-item
        >
        <el-descriptions-item
          label="Time taken"
          label-align="center"
          align="center"
          >{{ this.timePassed }}</el-descriptions-item
        >
        <el-descriptions-item
          label="Total Characters typed"
          label-align="center"
          align="center"
          >{{ this.allTypedEntries }}</el-descriptions-item
        >
        <el-descriptions-item
          label="Wrong Characters typed"
          label-align="center"
          align="center"
          >{{ this.uncorrectedErrors }}</el-descriptions-item
        >
      </el-descriptions>
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
    timeLimit: Number,
    timePassed: Number,
  },
  components: {
    Timer,
  },
  data() {
    return {
      input: "",
      currentWordIndex: 0,
      wrongWordIndex: [],

      // WPM calculation
      allTypedEntries: 0,
      uncorrectedErrors: 0,
      finalWPM: 0,
    };
  },
  watch: {
    input(newInput) {
      if (newInput.length > 0 && this.gameState === "waiting") {
        this.$emit("start-test");
      }
      if (this.gameState === "finished") {
        return;
      }

      if (newInput[newInput.length - 1] === " ") {
        this.allTypedEntries += newInput.length;
        var word = newInput.trim();
        console.log(word);
        this.checkMatch(word);
        this.currentWordIndex = this.currentWordIndex + 1;
        this.input = "";

        // test complete
        if (this.wrongWordIndex.length == this.testWords.length) {
          //console.log(this.calculateWPM());
          this.$emit("finish-test");
        }
        return;
      }

      if (!newInput) {
        return;
      }

      const count = newInput.length;
      const currWord = this.testWords[this.currentWordIndex];
      const compareWord = currWord.substring(0, count);

      this.wrongWordIndex[this.currentWordIndex] = !(compareWord === newInput);
    },

    gameState(newState, oldState) {
      if (newState !== oldState) {
        if (newState === "finished") {
          this.finalWPM = this.calculateWPM();
          console.log(this.finalWPM);

          this.$emit("update-score", this.finalWPM);
        }
      }
    },
  },
  methods: {
    checkMatch(word) {
      const wordToCompare = this.testWords[this.currentWordIndex];
      if (word.length === 0) {
        console.log("no input");
        this.wrongWordIndex[this.currentWordIndex] = true;
        this.uncorrectedErrors += 1;
      } else {
        console.log(
          `${wordToCompare} vs. ${word} is ${wordToCompare === word}`
        );
        this.wrongWordIndex[this.currentWordIndex] = !(wordToCompare === word);

        if (this.wrongWordIndex[this.currentWordIndex] === true) {
          this.uncorrectedErrors += word.length;
        }
      }
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
      this.clearTypingTest();
      this.$emit("reset-test");
    },

    clearTypingTest() {
      this.input = "";
      this.currentWordIndex = 0;
      this.wrongWordIndex = [];
      this.allTypedEntries = 0;
      this.uncorrectedErrors = 0;
    },

    calculateWPM() {
      if (this.allTypedEntries === 0) return 0;

      console.log("allTypedEntries " + this.allTypedEntries);
      var grossWords = this.allTypedEntries / 5;
      console.log("uncorrectedErrors " + this.uncorrectedErrors);

      console.log("timePassed " + this.timePassed);

      var min = this.secondsToMinutes(this.timePassed);
      if (min === 0) {
        return 0;
      }

      console.log("min " + min);

      return (grossWords - this.uncorrectedErrors) / min;
    },

    secondsToMinutes(seconds) {
      if (seconds === 0) {
        return 0;
      }

      return seconds / 60;
    },
  },
  emits: ["start-test", "reset-test", "finish-test", "update-score"],
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
