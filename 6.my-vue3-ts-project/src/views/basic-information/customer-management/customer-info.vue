<template>
    <div class="customer-info">
       <el-form :inline="true" :model="formInline" style="width: 100%;">
            <el-form-item label="客户属性：">
               <el-select v-model="formInline.attribute" placeholder="请选择客户属性" clearable style="width: 299px;">
                    <el-option label="外部" value="外部" />
                    <el-option label="内部" value="内部" />
                </el-select>
            </el-form-item>
            <el-form-item label="客户类型：">
               <el-select v-model="formInline.type" placeholder="请选择客户类型" clearable style="width: 299px;">
                    <el-option label="企业" value="企业" />
                    <el-option label="个人" value="个人" />
                    <el-option label="其他" value="其他" />
                </el-select>
            </el-form-item>
            <el-form-item label="客户分组：">
               <el-select v-model="formInline.group" placeholder="请选择客户分组" clearable style="width: 299px;">
                    <el-option label="商超" value="商超" />
                    <el-option label="社群" value="社群" />
                    <el-option label="上群" value="上群" />
                    <el-option label="团建" value="团建" />
                </el-select>
            </el-form-item>
            <el-form-item label="客户名称/姓名：">
               <el-input v-model="formInline.name" placeholder="请输入" clearable style="width: 263px;" />
            </el-form-item>
            <el-form-item label="客户简称/别名：">
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
        <el-button class="btn-add" size="small" @click="addCustomer">新增客户</el-button>
        <div class="bottom-menu1">
            <!-- 表格 -->
            <el-table :data="tableData" border style="width: 100%">
               <el-table-column prop="coding" label="客户财务编码" min-width="180" />
                <el-table-column prop="attribute" label="客户属性" min-width="180" />
                <el-table-column prop="type" label="客户类型" min-width="160" />
                <el-table-column prop="group" label="客户分组" min-width="160" />
                <el-table-column prop="name" label="客户名称/姓名" min-width="160" />
                <el-table-column prop="remark" label="备注" min-width="180" show-overflow-tooltip />
                <el-table-column prop="address" label="操作" min-width="228">
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
            <div v-for="(value, index) in currentAddresses" :key="value.id">
                <div class="harvestinformation">
                    <span class="span1">| </span>
                   <span>收货信息{{ index + 1 }}</span>
                </div>
                <div class="Receivingaddress">
                   <span>配送收货地址名称：{{ value.address }}</span>
                </div>
                <div class="Contact">
                   <span>联系人：{{ value.contact }}</span>
                </div>
                <div class="Contactnumber">
                   <span>联系电话：{{ value.phone }}</span>
                </div>
                <div class="Location">
                   <span>所在地区：{{ value.region }}</span>
                </div>
                <div class="detailedaddress">
                   <span>详细地址：{{ value.detailedAddress }}</span>
                </div>
           </div>
            <el-divider />
            <el-row type="flex" justify="end" align="middle">
                <el-button @click="showDialog = false">
                    关闭
                </el-button>
            </el-row>
        </el-dialog>
    </div>
    <!-- 添加客户 -->
   <Add-customer ref="subInstance" @addCustomer="handleAddData" @editCustomer="handleEditData" />
</template>


<script setup lang="ts" name="customerInfo">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import AddCustomer from './components/add-customer.vue'
import { onMounted, reactive, ref } from 'vue'
// 调用分页
onMounted(() => onSubmit())
// 规范化数据接口
interface CustomerData {
    id: number
    coding: number
    attribute: string
    type: string
    group: string
    name: string
    remark: string
    organization: string
    abbreviation: string
    addresses: {
        id: number
        address: string
        contact: string
        phone: string
        region: string
        detailedAddress: string
    }[]
}

// 定义表格数据
const tableData = ref([
    {
    id: 2103972301201,
    coding: 40999999911,
    attribute: '外部',
    group: '商超',
    name: '加剋夫',
    remark: '我带我活动i啊我都i啊我活动kkkk',
    type: '个人',
    organization: '北京分公司',
    abbreviation: '加剋夫',
            addresses: [
                {
                id: 2103972001,
                address: '美团一仓',
                contact: '杨丽',
                phone: '13251175885',
                region: '重庆市 市辖区 渝北区',
                detailedAddress: '重庆市渝北区东湖南路3号中铁峰汇B座22楼'
            },
                {
                 id: 2103972002,
                address: '美团二仓',
                contact: '嘉豪',
                phone: '1532478232',
                region: '重庆市 市辖区 渝北区',
                detailedAddress: '重庆市渝北区东湖南路3号中铁峰汇B座22楼'
                },
            {
                 id: 2103972013,
                address: '美团十三仓',
                contact: '嘉豪',
                phone: '1532478232',
                region: '重庆市 市辖区 渝北区',
                detailedAddress: '重庆市渝北区东湖南路3号中铁峰汇B座22楼'
            }
        ]
  },
    {
    id: 2103972301202,
    coding: 40999999912,
    attribute: '外部',
    group: '上群',
    name: '好又多',
    remark: '备注',
        type: '个人',
        organization: '重庆分公司',
        abbreviation: '好又多',
             addresses: [
                 {
                 id: 2103972003,
                address: '美团三仓',
                contact: '帅哥',
                phone: '13251175885',
                region: '重庆市 市辖区 渝北区',
                detailedAddress: '重庆市渝北区东湖南路3号中铁峰汇B座22楼'
            }
        ]
  },
    {
    id: 2103972301203,
    coding: 40999999913,
    attribute: '内部',
    group: '社群',
    name: '中百大潮',
    remark: '备注',
    type: '个人',
    organization: '四川分公司',
        abbreviation: '中百大潮',
            addresses: [
                {
                 id: 2103972004,
                address: '美团五仓',
                contact: '杨丽',
                phone: '13251175885',
                region: '重庆市 市辖区 渝北区',
                detailedAddress: '重庆市渝北区东湖南路3号中铁峰汇B座22楼'
            },
                {
                 id: 2103972005,
                address: '美团六仓',
                contact: '嘉豪',
                phone: '1532478232',
                region: '重庆市 市辖区 渝北区',
                detailedAddress: '重庆市渝北区东湖南路3号中铁峰汇B座22楼'
            }
        ]
  },
    {
    id: 2103972301204,
    coding: 40999999914,
    attribute: '内部',
    group: '团建',
    name: '加号团建',
    remark: '备注',
    type: '个人',
    organization: '上海分公司',
        abbreviation: '加号团建',
        addresses: [
            {
                 id: 2103972006,
                address: '美团七仓',
                contact: '杨丽',
                phone: '13251175885',
                region: '重庆市 市辖区 渝北区',
                detailedAddress: '重庆市渝北区东湖南路3号中铁峰汇B座22楼'
            },
            {
                 id: 2103972007,
                address: '美团八仓',
                contact: '嘉豪',
                phone: '1532478232',
                region: '重庆市 市辖区 渝北区',
                detailedAddress: '重庆市渝北区东湖南路3号中铁峰汇B座22楼'
            }
        ]
  },
    {
    id: 2103972301205,
    coding: 40999999915,
    attribute: '内部',
    group: '社群',
    name: '重庆批发',
    remark: '备注',
    type: '个人',
    organization: '南京分公司',
        abbreviation: '中百大潮',
             addresses: [
                 {
                 id: 2103972008,
                address: '美团九仓',
                contact: '杨丽',
                phone: '13251175885',
                region: '重庆市 市辖区 渝北区',
                detailedAddress: '重庆市渝北区东湖南路3号中铁峰汇B座22楼'
            },
                 {
                 id: 2103972009,
                address: '美团十仓',
                contact: '嘉豪',
                phone: '1532478232',
                region: '重庆市 市辖区 渝北区',
                detailedAddress: '重庆市渝北区东湖南路3号中铁峰汇B座22楼'
            }
        ]
  },
    {
    id: 2103972301206,
    coding: 40999999916,
    attribute: '内部',
    group: '社群',
    name: '重庆批发',
    remark: '备注',
    type: '个人',
    organization: '河北分公司',
        abbreviation: '中百大潮',
             addresses: [
                 {
                 id: 2103972010,
                address: '美团十一仓',
                contact: '杨丽',
                phone: '13251175885',
                region: '重庆市 市辖区 渝北区',
                detailedAddress: '重庆市渝北区东湖南路3号中铁峰汇B座22楼'
            },
                 {
                 id: 2103972011,
                address: '美团十二仓',
                contact: '嘉豪',
                phone: '1532478232',
                region: '重庆市 市辖区 渝北区',
                detailedAddress: '重庆市渝北区东湖南路3号中铁峰汇B座22楼'
            }
        ]
  },
])
// 定义表格数据
const currentAddresses = ref<{
    id: number
    address: string
    contact: string
    phone: string
    region: string
    detailedAddress: string
}[]>([])
// 总数
const total = ref(0) 
// 当前页码
const currentPage = ref(1)  
// 每页条数
const pageSize = ref(5)   
// 当前页显示的数据
const showDialog = ref(false)
// 定义子组件
const subInstance = ref()
// 定义查询数据
const formInline = reactive({
  attribute: '',
  type: '',
  group: '',
  name: '',
  abbreviation: '',
})
// 保存原始数据
const originTableData = ref<CustomerData[]>([...tableData.value])

// 重置表单
const reset = () => { 
    Object.assign(formInline, {
    attribute: '',
    type: '',
    group: '',
    name: '',
    abbreviation: '',
    })
    tableData.value = [...originTableData.value]
    currentPage.value = 1
    onSubmit()
}
// 调用子组件新增
const addCustomer = () => {
    subInstance.value.open()
}
// 新增
const handleAddData = (data: CustomerData) => {
    // console.log(data);
    // tableData.value.unshift(data)
    originTableData.value.unshift(data)
    onSubmit()
}
// 子组件编辑
const edit = (row:CustomerData) => {
    subInstance.value.openEdit(row)
}
// 编辑
const handleEditData = (data: CustomerData) => {
    const originIndex = originTableData.value.findIndex(item => item.id === data.id)
    if (originIndex !== -1) {
        originTableData.value[originIndex] = { ...originTableData.value[originIndex], ...data }
    }
    onSubmit()
}
// 打开查询地址表单
const viewAddress = (row:CustomerData) => {
    currentAddresses.value = row.addresses
    showDialog.value = true
}
// 查询表单
const onSubmit = () => {
    // 筛选数据
    const filtered = originTableData.value.filter(item => {
        if (formInline.attribute && item.attribute !== formInline.attribute) return false
        if (formInline.type && item.type !== formInline.type) return false
        if (formInline.group && item.group !== formInline.group) return false
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
    console.log(originTableData.value);
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
    background: #FFFFFF;
    height: 459px;
}

.bottom-menu1 {
    height: 323px;
    margin-bottom: 72px;
    margin-left: 24px;
    margin-right: 24px;
    flex: 1;
    overflow-x: auto;
    overflow-y: auto;
        
    min-height: 0;
}

.btn-export {
    width: 60px;
    height: 32px;
    margin-left: 24px;
    margin-top: 16px;
    margin-bottom: 16px;
}

.btn-add {
    margin-right: 10px;
    margin-top: 16px;
    width: 88px;
    height: 32px;
    margin-bottom: 16px;
}

.mt-4 {
    margin-top: 20px;
    margin-right: 30px;
}

.Receivingaddress {
    margin-top: 16px;
}

.harvestinformation {
    margin-top: 24px;
    font-family: Microsoft YaHei;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0px;
    color: black;
}

.Contact {
    margin-top: 16px;
}

.Contactnumber {
    margin-top: 16px;
}

.Location {
    margin-top: 16px;
}

.detailedaddress {
    margin-top: 16px;
}

.span1 {
    color: #0065FE;
    font-weight: 900;
    font-size: 18px;
}
</style>