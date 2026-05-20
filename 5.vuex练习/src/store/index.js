import Vue from 'vue'
//引入vuex
import Vuex from 'vuex'
Vue.use(Vuex)
//准备action--响应组件中的动作
const actions = {
    increment({ commit }, value) {
        commit('INCRE_MENT', value)
    },
    decrement({ commit }, value) {
        commit('DECRE_MENT', value)
    },
    incrementOdd({ commit }, value) {
        if (state.sum % 2 !== 0)
            commit('INCRE_MENT', value)
    },
    incrementWait({ commit }, value) {
        setTimeout(() => {
            commit('INCRE_MENT', value)
        }, 1000)
    }
}
//准备mutations--用于操作数据（state）
const mutations = {
    INCRE_MENT(state, value) {
        state.sum += value
    },
    DECRE_MENT(state, value) {
        state.sum -= value
    },
    ADD_PERSON(state, personObj) {
        state.personList.unshift(personObj)
    }
}
//准备state--用于存储数据
const state = {
    sum: 0,
    school: '北京大学',
    subject: '计算机科学与技术',
    personList: [
        { id: '001', name: '张三' }
    ]
}
//准备getters--用于获取数据将state中的数据进行加工
const getters = {
    bigsum(state) {
        return state.sum * 10
    }
}
// 创建并暴露 store 实例
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})

