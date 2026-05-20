<template>
  <div class="todo-footer">
    <span>
      <span>已完成{{ doneTotal }}</span> / 全部{{ todos.length }}
    </span>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'MyFooter',
  computed: {
    ...mapState(['todos']),
    ...mapGetters(['doneTotal'])
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
