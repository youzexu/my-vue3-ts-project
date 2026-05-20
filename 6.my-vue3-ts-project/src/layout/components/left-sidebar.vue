<template>
 <div class="sidebar" :class="{ collapse: appStore.sidebarCollapsed }">
    <el-menu router :default-active="$route.path" :collapse="appStore.sidebarCollapsed" background-color="transparent"
      text-color="#bfcbd9" active-text-color="#409eff">
     <template v-for="item in menuList" :key="item.path">
       <el-sub-menu v-if="item.children?.length" :index="item.path">
          <template #title>
            <el-icon>
              <location />
            </el-icon>
           <span>{{ item.meta?.title }}</span>
          </template>
         <el-menu-item v-for="children in item.children" :key="children.path"
            :index="`/${item.path}/${children.path}`">
            {{ children.meta?.title }}
          </el-menu-item>
       </el-sub-menu>
        <el-menu-item v-else :index="item.path">
          <el-icon>
            <location />
         </el-icon>
         <span>{{ item.meta?.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup name="leftSidebar">
import { useAppStore } from '@/stores/app'
import router from '@/router'
import { computed } from 'vue'

const appStore = useAppStore();

// 获取路由中菜单列表
const menuList = computed(() => {
  const routes = router.getRoutes()
  const layoutRoute = routes.find(route => route.path === '/')
  if (!layoutRoute?.children) return []
  return layoutRoute.children.filter(route => route.meta?.title)
 })


</script>

<style scoped>
.sidebar {
  width: 208px;
  height: 100%;
  background: #262D36;
  transition: .3s;
  overflow-y: auto;
}

.sidebar.collapse {
  width: 64px;
}

:deep(.el-menu),
:deep(.el-menu-item),
:deep(.el-sub-menu__title) {
  border-right: none !important;
  background: #262D36 !important;
}

.sidebar.collapse :deep(.el-menu-item span),
.sidebar.collapse :deep(.el-sub-menu__title span) {
  display: none;
}

.sidebar::-webkit-scrollbar {
  width: 4px;
}

.sidebar::-webkit-scrollbar-track {
  background: #262D36;
}

.sidebar::-webkit-scrollbar-thumb {
  background: #4a5a6a;
  border-radius: 4px;
}
</style>