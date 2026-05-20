<template>
  <li>
    <label>
      <input type="checkbox" @click="handleCheck(todo.id)" />
      <span :class="{completed: todo.done}">{{ todo.title }}</span>
    </label>
    <button class="btn btn-danger" @click="removeTodo(todo.id)">删除</button>
  </li>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: 'MyItem',
  props: ['todo'],
  methods: {
    ...mapMutations(['CHECK_TODO', 'DELETE_TODO']),
    handleCheck(id) {
      this.CHECK_TODO(id)
    },
    removeTodo(id) {
      this.DELETE_TODO(id)
    }
  }
}
</script>


<style scoped>
.completed {
  text-decoration: line-through;
  color: #999;
}
li {
  list-style: none;
  height: 50px;
  line-height: 40px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

li:hover {
  background-color: #ddd;
}

li:hover button {
  display: block;
}
</style>