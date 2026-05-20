<template>
    <div>
        <h1>人员列表</h1>
        <input type="text" placeholder="请输入名字" v-model="name">
        <button @click="addperson">添加</button>
        <ul>
            <li v-for="p in personList" :key="p.id">{{ p.name }}</li>
        </ul>
        <h3>上方组件的和为{{ sum }}</h3>
    </div>
</template>

<script>
import { nanoid } from 'nanoid'
import { mapState } from 'vuex';
export default {
    name: 'personOne',
    data(){
        return{
            name:''
        }
    },
    computed: {
        ...mapState(['personList','sum'])
    },
    methods: {
        addperson() {
            const personObj = { id: nanoid(), name: this.name }
            this.$store.commit('ADD_PERSON', personObj)
            this.name = ''

        }
    }
}
</script>

<style></style>