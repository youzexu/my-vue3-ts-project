<template>
   <div class="customer-info">
        <el-form :inline="true" :model="formInline" style="width: 100%;">
            <el-form-item label="供应商属性:">
                <el-select v-model="formInline.attribute" placeholder="请选择供应商属性" clearable style="width: 299px;">
                    <el-option label="外部" value="外部" />
                    <el-option label="内部" value="内部" />
                </el-select>
            </el-form-item>
            <el-form-item label="供应商类型:">
                <el-select v-model="formInline.type" placeholder="请选择客户类型" clearable style="width: 299px;">
                    <el-option label="公司" value="公司" />
                    <el-option label="个人" value="个人" />
                    <el-option label="其他" value="其他" />
                </el-select>
            </el-form-item>
            <el-form-item label="供应商名称:">
                <el-select v-model="formInline.name" placeholder="请选择客户类型" clearable style="width: 299px;">
                    <el-option label="企业" value="1" />
                    <el-option label="个人" value="2" />
                    <el-option label="其他" value="3" />
                </el-select>
            </el-form-item>
            <el-form-item label="供应商简称:">
                <el-input v-model="formInline.abbreviation" placeholder="请输入" clearable style="width: 263px;" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="bottom-menu">
        <el-button class="btn-export" size="small" type="primary" @click="exportData">导出</el-button>
       <el-button class="btn-add" size="small" @click="addCustomer">新增供应商</el-button>
        <div class="bottom-menu1">
            <!-- 表格 -->
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="coding" label="供应商财务编码" min-width="180" />
                <el-table-column prop="attribute" label="供应商属性" min-width="180" />
                <el-table-column prop="type" label="供应商类型" min-width="160" />
               <el-table-column prop="organization" label="供应商组织" min-width="160" />
                <el-table-column prop="address" label="供应商地址" min-width="160" show-overflow-tooltip />
                <el-table-column prop="remark" label="备注" min-width="180" show-overflow-tooltip />
               <el-table-column label="操作" min-width="228">
                    <template v-slot="{ row }">
                        <el-button link type="primary" size="small" @click="viewAddress(row)">查看配送地址</el-button>
                       <el-button link type="primary" size="small" @click="edit(row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-row type="flex" justify="end" align="middle" style="margin-top: 16px;">
                <el-pagination :locale="zhCn" v-model:current-page="currentPage" v-model:page-size="pageSize"
                    :page-sizes="[1, 2, 5, 10]" :total="total" size="small" background
                    layout="total, sizes, prev, pager, next, jumper" @current-change="handlePageChange"
                    @size-change="handleSizeChange" />
            </el-row>
        </div>
        <!-- 查看配送地址 -->
        <el-dialog v-model="showDialog" title="查看配送地址" width="500">
           <el-divider />
           <div class="harvestinformation">
                <span class="span1">| </span>
               <span>收货信息</span>
            </div>
            <div class="Receivingaddress">
               <span>配送收货地址名称：{{ currentAddresses?.address }}</span>
            </div>
           <div class="Receivingaddress">
               <span>门牌号：{{ currentAddresses?.house }}</span>
            </div>
            <el-divider />
            <el-row type="flex" justify="end" align="middle">
                <el-button @click="showDialog = false">
                    关闭
                </el-button>
            </el-row>
        </el-dialog>
    </div>
   <Add-supplier ref="subInstance" @addCustomer="handleAddData" @editCustomer="handleEditData" />
</template>


<script setup lang="ts" name="supplierInfo">
import AddSupplier from './components/add-supplier.vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { ref, reactive, onMounted } from 'vue'

// 定义接口
interface CustomerData {
    id: number
    coding: number
    attribute: string
    type: string
    organization: string
    name: string
    abbreviation: string
    phone: string
    remark: string
    address: string
    house: string
}
interface AddressData { 
    address: string
    house: string
}

// 供应商列表数据
const tableData = ref([
    {
        id: 12412414111,
        coding: 123456789,
        attribute: '外部',
        type: '水果',
        organization: '北京分公司',
        name: '1111111111111111111',
        abbreviation: '加剋夫',
        phone: '13251175885',
        remark: '我带我活动i啊我都i啊我活动kkkk',
        house: '美国',
        address: '美团一仓',
    },
    {
        id: 12412414112,
        coding: 123456789,
        attribute: '外部',
        type: '公司',
        organization: '北京分公司',
        name: '1111111111111111111',
        abbreviation: '加剋夫',
        phone: '13251175885',
        remark: '我带我活动i啊我都i啊我活动kkkk',
        house: '11栋',
        address: '重庆',
    },
    {
        id: 12412414113,
        coding: 123456789,
        attribute: '外部',
        type: '公司',
        organization: '北京分公司',
        name: '1111111111111111111',
        abbreviation: '加剋夫',
        phone: '13251175885',
        remark: '我带我活动i啊我都i啊我活动kkkk',
        house: '12栋',
        address: '北京',
    },
    {
        id: 12412414114,
        coding: 123456789,
        attribute: '外部',
        type: '公司',
        organization: '北京分公司',
        name: '1111111111111111111',
        abbreviation: '加剋夫',
        phone: '13251175885',
        remark: '我带我活动i啊我都i啊我活动kkkk',
        house: '13栋',
        address: '上海',
    },
    {
        id: 12412414115,
        coding: 123456789,
        attribute: '外部',
        type: '公司',
        organization: '北京分公司',
        name: '1111111111111111111',
        abbreviation: '加剋夫',
        phone: '13251175885',
        remark: '我带我活动i啊我都i啊我活动kkkk',
        house: '14栋',
        address: '广州',
    },
    {
        id: 12412414116,
        coding: 123456789,
        attribute: '外部',
        type: '公司',
        organization: '北京分公司',
        name: '1111111111111111111',
        abbreviation: '加剋夫',
        phone: '13251175885',
        remark: '我带我活动i啊我都i啊我活动kkkk',
        house: '15栋',
        address: '南京',
    },
])
// 当前选中地址
const currentAddresses = ref<AddressData>()
// 子组件实例
const subInstance = ref() 
// 总数
const total = ref(0) 
// 当前页码
const currentPage = ref(1)  
// 每页条数
const pageSize = ref(5)   
// 配送地址弹窗
const showDialog = ref(false)
// 保存原始数据
const originTableData = ref<CustomerData[]>([...tableData.value])
// 查询表单
const formInline = reactive({
  attribute: '',
  type: '',
  name: '',
  abbreviation: '',
})

onMounted(() => {
    onSubmit()
})
// 重置表单
const reset = () => { 
    Object.assign(formInline, {
    attribute: '',
    type: '',
    name: '',
    abbreviation: '',
    })
    tableData.value = [...originTableData.value]
    currentPage.value = 1
    onSubmit()
}
// 新增供应商弹窗
const addCustomer = () => {
   subInstance.value.open()
 }
// 新增供应商
const handleAddData = (data: CustomerData) => { 
    console.log(data)
    originTableData.value.unshift(data)
    onSubmit()
}
// 编辑供应商弹窗
const edit = (row: CustomerData) => { 
    subInstance.value.openEdit(row)
    // console.log(row)
}
// 编辑供应商
const handleEditData = (data: CustomerData) => {
    // console.log(data)
    const index = originTableData.value.findIndex(item => item.id === data.id)
    if (index !== -1) {
        originTableData.value[index] = { ...originTableData.value[index], ...data }
    }
    onSubmit()
}
// 查看地址
const viewAddress = (row: CustomerData) => {
    currentAddresses.value = {
        address: row.address,
        house: row.house,
    }
    // console.log(row.address)
    // console.log(currentAddresses.value)
    showDialog.value = true
}
// 查询表单
const onSubmit = () => {
    // 筛选数据
    const filtered = originTableData.value.filter(item => {
        if (formInline.attribute && item.attribute !== formInline.attribute) return false
        if (formInline.type && item.type !== formInline.type) return false
        if (formInline.name && !item.name.includes(formInline.name)) return false
        if (formInline.abbreviation && !item.abbreviation.includes(formInline.abbreviation)) return false
        return true
    })
    // 更新总数
    total.value = filtered.length 
    // 分页
    const start = (currentPage.value - 1) * pageSize.value
    tableData.value = filtered.slice(start, start + pageSize.value)
}
// 每页条数切换（新增）
const handleSizeChange = (size: number) => {
    pageSize.value = size
    currentPage.value = 1
    onSubmit()
}
// 分页切换
const handlePageChange = (page: number) => {
    currentPage.value = page
    onSubmit()
}
// 导出数据
const exportData = () => {
    console.log(tableData.value)
}

</script>

<style scoped>
.customer-info {
    background-color: #fff;
    padding: 20px;
    border-radius: 4px;
}

.bottom-menu {
    margin-top: 20px;
    background: #fff;
    height: 459px;
}

.btn-export {
    width: 60px;
    height: 32px;
    margin: 16px 10px 16px 24px;
}

.btn-add {
    width: 88px;
    height: 32px;
    margin: 16px 10px 16px 0;
}

.bottom-menu1 {
    flex: 1;
    height: 323px;
    min-height: 0;
        margin: 0 24px 72px 24px;
    overflow-x: auto;
    overflow-y: auto;
}

.harvestinformation {
    margin-top: 24px;
    margin-bottom: 8px;
        font-family: 'Microsoft YaHei', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0;
        color: #000;
}

.Receivingaddress {
    margin-top: 16px;
}

.span1 {
    color: #0065fe;
    font-weight: 900;
    font-size: 18px;
}
</style>