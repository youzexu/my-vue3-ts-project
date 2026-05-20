<template>
  <div class="app-header">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item class="Navigation font" :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item class="Navigation font1" v-for="item in breadcrumbs" :key="item.path">
        {{ item.meta?.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts" name="appHeader">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const breadcrumbs = computed(() => {
  return route.matched.filter(item => item.meta?.title && item.path !== '/')
})
</script>

<style scoped>
.app-header {
  width: 100%;
  height: 48px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  z-index: 100;
}

.breadcrumb {
  flex: 1;
}
</style>
