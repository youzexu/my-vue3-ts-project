<template>
  <div>
    <h1>当前求和的值为{{ sum }}</h1>
    <h2>当前求和放大十倍为{{ bigsum }}</h2>
    <h3>我在{{ school }},学习{{ subject }}</h3>
    <h4 style="color:red">下方组件的总人数为{{personList.length}}</h4>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="increment(n)">+</button>
    <button @click="decrement(n)">-</button>
    <button @click="incrementOdd(n)">当前为奇数再加</button>
    <button @click="incrementWait(n)">等一等再加</button>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
export default {
  name: 'CountOne',
  data() {
    return {
      n: 1,
    }
  },
  methods: {
    ...mapActions(['increment', 'decrement', 'incrementOdd', 'incrementWait']),
  },
  computed:{
    ...mapState(['sum', 'school','subject','personList']),
    ...mapGetters(['bigsum']),
  }
  
}
</script>

<style></style>