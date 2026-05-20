// stores/app.ts
import { defineStore } from 'pinia'

// 定义数据类型
interface AppState {
    sidebarCollapsed: boolean
}

export const useAppStore = defineStore('app', {
    state: (): AppState => ({
        sidebarCollapsed: false 
    }),

    actions: {
        toggleSidebar() {
            this.sidebarCollapsed = !this.sidebarCollapsed
        },
    }
})