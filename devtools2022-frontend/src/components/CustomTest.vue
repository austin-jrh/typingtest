<template>
  <div class="test">
    <el-card shadow="never" class="box-card">
      <div slot="header" class="card-header">
        <h3>{{ test.name }}</h3>
        <el-row>
          <el-button type="success" @click="$emit('run-test', test.id)"
            >Run</el-button
          >
          <el-button type="warning" @click="$emit('edit-test', test.id)"
            >Edit</el-button
          >
          <el-button type="danger" @click="$emit('delete-test', test.id)"
            >Delete</el-button
          >
        </el-row>
      </div>
      <div>Description: {{ test.description }}</div>
      <div>Custom Words: {{ test.words }}</div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "CustomTest",
  props: {
    test: Object,
  },
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
