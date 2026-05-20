<template>
    <div class="todo-header">

        <input type="text" placeholder="你想做什么？" v-model="title" @keyup.enter="add" />
        <button class="doThis" @click="add">save task</button>
    </div>
</template>

<script>
import { nanoid } from "nanoid"
import { mapActions } from 'vuex' 
export default {
    name: "MyHeader",
    data() {
        return {
            title: ''
        }
    },
    methods: {
        ...mapActions(['addTodo']),
        add() {
            if (!this.title) return alert('输入不能为空')
            const todoObj = { id: nanoid(), title: this.title, done: false }
            this.addTodo(todoObj),
                this.title = ''
        }
    }
}
</script>

<style scoped>
.todo-header {
    display: flex;
}

.todo-header input {
    width: 560px;
    height: 28px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 4px 7px;
}

.todo-header input:focus {
    outline: none;
    border-color: rgba(82, 168, 236, 0.8);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
}

.doThis {
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 5px;
    width: 120px;
    height: 35px;
    margin-left: 10px;
}
</style>