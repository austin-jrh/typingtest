<template>
  <form @submit="onSubmit" class="add-form">
    <div>
      <label>Name:</label>
      <input type="text" v-model="name" name="name" placeholder="Add Name" />
    </div>
    <div>
      <label>Description:</label>
      <input
        type="text"
        v-model="description"
        name="description"
        placeholder="Add Description"
      />
    </div>
    <div>
      <label>Words:</label>
      <input
        type="text"
        v-model="words"
        name="words"
        placeholder="Add Custom Words"
      />
    </div>
    <input type="submit" value="Save Custom Test" class="btn btn-block" />
  </form>
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
  },
};
</script>

<style scoped></style>
