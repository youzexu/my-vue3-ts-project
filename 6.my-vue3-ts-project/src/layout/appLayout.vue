<template>
  <div class="layout">
    <topBar />
    <div class="main-wrapper">
      <leftSidebar  />
      <div class="content-wrapper">
        <appMain />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="appLayout">
import TopBar from './components/top-bar.vue'
import LeftSidebar from './components/left-sidebar.vue'
import AppMain from './components/app-main.vue'



</script>

<style scoped>
.layout {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.main-wrapper {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.content-wrapper {
  flex: 1;
  overflow: hidden;
  background-color: #f0f2f6;
  padding: 16px;
  min-width: 0;
  min-height: 0;
}
</style>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
