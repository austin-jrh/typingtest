<template>
  <el-card>
    <el-card shadow="never">
      <Timer :timeLeft="timeLeft" />
      <div>words words words</div>
    </el-card>

    <el-input v-model="input" />
  </el-card>
</template>

<script>
import Timer from "./Timer.vue";

export default {
  name: "TypingTest",
  props: {
    timeLeft: Number,
  },
  components: {
    Timer,
  },
  data() {
    return {
      input: "",
    };
  },
  watch: {
    input(newInput) {
      if (newInput[newInput.length - 1] == " ") {
        console.log(newInput);

        this.input = "";
      }
    },
  },
  methods: {},
};
</script>

<style></style>
