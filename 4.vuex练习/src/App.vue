<template>
  <div id="app" class="app1">
    <h1> React Todo</h1>
    <MyList/>
    <MyFooter/>
    <MyHeader/>
  </div>
</template>

<script>
import MyHeader from './components/MyHeader.vue';
import MyList from './components/MyList.vue';
import MyFooter from './components/MyFooter.vue';
export default {
  name: 'App',
  components: {
    MyHeader,
    MyList,
    MyFooter,
  }
}

</script>

<style>
.app1 {
  width: 100%;
  max-width: 500px;
  background-color: rgb(242, 240, 240);
  border-radius: 7px;
  padding: 24px;
  border: 1px solid #cecccc;
}

* {
  box-sizing: border-box;
}

h1 {
  font-size: 30px;
  font-weight: 400;
  margin-top: 0;
  margin-bottom: 24px;
  margin-left: 145px;
  color: #1e293b;
}

body {
  background: #ffffff;
  display: flex;
  justify-content: center;
  max-height: 100vh;
  margin: 0;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;

}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;

}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}

.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
