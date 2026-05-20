<template>
    <ul class="todo-main">
        <MyItem v-for="todoObj in todos" :key="todoObj.id" :todo="todoObj" />
    </ul>
</template>

<script>
import MyItem from './MyItem.vue'
import { mapState } from 'vuex'
export default {
    name: 'MyList',
    components: { MyItem },
    computed: {
        ...mapState(['todos'])
    }
}
</script>

<style>
.todo-main {
    margin-left: 0px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0px;
    background-color: white;
}
</style>