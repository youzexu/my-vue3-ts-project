import Vue from 'vue'
//引入vuex
import Vuex from 'vuex'
Vue.use(Vuex)
//准备action--响应组件中的动作
const actions = {
    addTodo({ commit }, todoObj) {
        commit('ADD_TODO', todoObj)
    },
    checkTodo({ commit }, id) {
        commit('CHECK_TODO', id)
    },
    deleteTodo({ commit }, id) {
        commit('DELETE_TODO', id)
    }
}
//准备mutations--用于操作数据（state）
const mutations = {
    ADD_TODO(state, todoObj) {
        state.todos.unshift(todoObj)
    },
    CHECK_TODO(state, id) {
        state.todos.forEach((todo) => {
            if (todo.id === id) todo.done = !todo.done
        })
    },
    DELETE_TODO(state, id) {
        state.todos = state.todos.filter(todo => todo.id !== id)
    }
}
//准备state--用于存储数据
const state = {
    todos: [
        { id: '001', title: '吃饭', done: false },
        { id: '002', title: '睡觉', done: false },
        { id: '003', title: '打豆豆', done: false }
    ]
}
//准备getters--用于获取数据
const getters = {
    doneTotal() {
        return state.todos.reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0)
    }
}
// 创建并暴露 store 实例
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})

