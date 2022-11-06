<template>
  <div class="test" v-show="!showEdit">
    <el-card shadow="never" class="box-card">
      <div slot="header" class="card-header">
        <h3>{{ test.name }}</h3>
        <el-row>
          <el-button type="success" @click="$emit('run-test', test.id)"
            >Run</el-button
          >
          <el-button type="warning" @click="showEditForm">Edit</el-button>
          <el-button type="danger" @click="$emit('delete-test', test.id)"
            >Delete</el-button
          >
        </el-row>
      </div>
      <div>Description: {{ test.description }}</div>
      <div>Custom Words: {{ test.words }}</div>
    </el-card>
  </div>
  <div class="editTest" v-show="showEdit">
    <el-card shadow="never" class="box-card">
      <el-form ref="form">
        <div slot="header" class="card-header">
          <el-form-item label="Test Name">
            <el-input placeholder="Add Name" v-model="tempName"></el-input>
          </el-form-item>
          <el-row>
            <el-button
              type="warning"
              @click="
                hideEditForm();
                $emit('save-edit-test', test);
              "
              >Save</el-button
            >
            <el-button type="info" @click="hideEditForm">Cancel</el-button>
          </el-row>
        </div>
        <el-form-item label="Description">
          <el-input
            type="textarea"
            autosize
            placeholder="Add Description"
            v-model="tempDesc"
          ></el-input>
        </el-form-item>
        <el-form-item label="Words">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2 }"
            placeholder="Add Custom Words"
            v-model="tempWords"
          ></el-input>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "CustomTest",
  props: {
    test: Object,
  },
  data() {
    return {
      showEdit: false,
      tempName: "",
      tempDesc: "",
      tempWords: "",
    };
  },
  methods: {
    showEditForm() {
      this.tempName = this.test.name;
      this.tempDesc = this.test.description;
      this.tempWords = this.test.words;
      this.showEdit = true;
    },
    hideEditForm() {
      this.test.name = this.tempName;
      this.test.description = this.tempDesc;
      this.test.words = this.tempWords;
      this.showEdit = false;
    },
  },
  emits: ["run-test", "save-edit-test", "delete-test"],
};
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
</style>
