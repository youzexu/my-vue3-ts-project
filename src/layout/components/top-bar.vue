<template>
  <div class="top-bar">
    <div class="leftSide">
      <img class="icons" src="@/icons/水果.svg" />
      <span>水果产业供应链SaaS平台</span>
      <el-divider direction="vertical" />
      <span>重庆一仓-生产系统</span>
      <el-dropdown>
        <el-icon>
          <arrow-down />
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>二仓</el-dropdown-item>
            <el-dropdown-item>三仓</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div class="fold" @click="appStore.toggleSidebar">
        <el-icon>
          <Fold v-if="!appStore.sidebarCollapsed" />
          <Expand v-else />
        </el-icon>
      </div>
    </div>
    <div class="language-item">
      <img class="icons2" src="@/icons/多语言.svg" />
      <span class="lang">中文</span>
      <el-divider direction="vertical" />
      <span class="userName">用户名</span>
    </div>
  </div>
</template>

<script setup lang="ts" name="topBar">
import { useAppStore } from '@/stores/app'
import { Fold, Expand } from '@element-plus/icons-vue'

const appStore = useAppStore()
</script>

<style scoped>
.top-bar {
  height: 48px;
  background: #1d232b;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  color: #fff;
}
.leftSide {
  display: flex;
  align-items: center;
  gap: 12px;
}

.fold {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 4px;
}

.fold:hover {
  background: rgba(255, 255, 255, 0.1);
}

.language-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icons {
  width: 30px;
  height: 30px;
}

.icons2 {
  width: 16px;
  height: 16px;
}

.el-divider--vertical {
  height: 16px;
  margin: 0;
}
</style>
