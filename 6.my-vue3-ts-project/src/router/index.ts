import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/appLayout.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 路由配置
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: Layout,
            redirect: '/foundation/customer',
            children: [
                // 基础信息路由
                {
                    path: 'foundation',
                    name: 'Foundation',
                    meta: {
                        title: '基础信息',
                    },
                    children: [
                        {
                            path: 'customer',
                            name: 'Customer',
                            component: () => import('../views/basic-information/customer-management/customer-info.vue'),
                            meta: {
                                title: '客户管理',
                            }
                        },
                        {
                            path: 'supplier',
                            name: 'Supplier',
                            component: () => import('../views/basic-information/supplier-management/supplier-info.vue'),
                            meta: {
                                title: '供应商管理',
                            }
                        },
                        {
                            path: 'team',
                            name: 'Team',
                            component: () => import('../views/basic-information/team-management/team-info.vue'),
                            meta: {
                                title: '团队管理',
                            }
                        }
                    ]
                },
                // 库存信息路由
                {
                    path: 'inventory',
                    name: 'Inventory',
                    meta: {
                        title: '库存管理',
                    },
                    children: [
                        {
                            path: 'warehousing',
                            name: 'Warehousing',
                            component: () => import('../views/inventory-record/stock-record/stock-info.vue'),
                            meta: {
                                title: '入库记录',
                            }
                        },
                        {
                            path: 'outbound',
                            name: 'Outbound',
                            component: () => import('../views/inventory-record/outbound-record/outbound-info.vue'),
                            meta: {
                                title: '出库记录',
                            }
                        },
                        {
                            path: 'transformation',
                            name: 'Transformation',
                            component: () => import('../views/inventory-record/conversion-record/conversion-info.vue'),
                            meta: {
                                title: '转换记录',
                            }
                        }
                    ]
                },
                // 收入管理
                {
                    path: 'revenue',
                    name: 'Revenue',
                    meta: {
                        title: '收入管理',
                    },
                    children: [
                        {
                            path: 'financial',
                            name: 'Financial',
                            component: () => import('../views/revenue-management/financial-review/financial-info.vue'),
                            meta: {
                                title: '财务复核'
                            }
                        },
                        {
                            path: 'income',
                            name: 'Income',
                            component: () => import('../views/revenue-management/income-approval/income-info.vue'),
                            meta: {
                                title: '收入审批'
                            }
                        }
                    ]
                }
            ]
        }
    ]
})

// 全局路由守卫
router.beforeEach((to, from) => {
    NProgress.start()
    return true
})
router.afterEach(() => {
    NProgress.done()
})
export default router