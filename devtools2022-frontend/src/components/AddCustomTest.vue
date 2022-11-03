<template>
  <el-form ref="form" label-width="120px">
    <el-form-item label="Test Name">
      <el-input placeholder="Add Name" v-model="name"></el-input>
    </el-form-item>
    <el-form-item label="Description">
      <el-input placeholder="Add Description" v-model="description"></el-input>
    </el-form-item>
    <el-form-item label="Words">
      <el-input
        type="textarea"
        placeholder="Add Custom Words"
        v-model="words"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="onSubmit">Submit</el-button>
      <el-button @click="onClear">Clear All</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "AddCustomTest",
  data() {
    return {
      name: "",
      description: "",
      words: "",
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      if (!this.name) {
        alert("Please add a name!");
        return;
      }

      if (!this.words) {
        alert("Please add words!");
        return;
      }

      const newTest = {
        id: Math.floor(Math.random() * 100000),
        name: this.name,
        description: this.description,
        words: this.words,
      };

      console.log(newTest);

      this.$emit("add-test", newTest);

      this.name = "";
      this.description = "";
      this.words = "";
    },
    onClear(e) {
      e.preventDefault();

      this.name = "";
      this.description = "";
      this.words = "";
    },
  },
};
</script>

<style scoped></style>
