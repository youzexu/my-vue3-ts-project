<template>
  <div class="todo-footer">
    <span>
      <span>已完成{{ doneTotal }}</span> / 全部{{ todos.length}}
    </span>
  </div>
</template>
<script>
export default {
  name: 'MyFooter',
  props: ['todos'],
  computed: {
    doneTotal() {
      return this.todos.reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0)
    }
  }
}
</script>

<style scoped>
.todo-footer {
    border: 1px solid #ddd;
    border-radius: 7px;
    background-color: white;
    margin: 20px;
    height: 30px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
