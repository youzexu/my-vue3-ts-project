<template>
    <div>
       <el-dialog v-model="dialogVisible" :title="showTitle" width="520" @close="handleCancel">
            <el-divider style="margin-top: 10px; margin-bottom: 24px;" />
            <el-form label-width="120px" label-position="top" style="min-height: 600px;" :model="formList1"
               ref="customerForm" :rules="rules">
               <el-form-item :label="formList1.id !== 0 ? `客户属性: ${formList1.attribute}` : '客户属性'"
                    style="width: 100%;margin-bottom: 24px;" size="small" prop="attribute">
                    <el-select v-if="formList1.id === 0" placeholder="请选择" v-model="formList1.attribute">
                        <el-option label="外部" value="外部" />
                        <el-option label="内部" value="内部" />
                    </el-select>
                </el-form-item>
               <el-form-item :label="formList1.id !== 0 ? `客户类型: ${formList1.type}` : '客户类型'"
                    style="width: 100%;margin-bottom: 24px;" size="small" prop="type">
                    <el-select v-if="formList1.id === 0" placeholder="请选择" v-model="formList1.type">
                       <el-option label="企业" value="企业"></el-option>
                        <el-option label="个人" value="个人"></el-option>
                        <el-option label="其他" value="其他"></el-option>
                    </el-select>
               </el-form-item>
                <el-form-item v-if="formList1.id !== 0" label="客户编码" style="width: 100%;margin-bottom: 24px;"
                    size="small" prop="coding">
                    <el-input placeholder="请输入" v-model="formList1.coding" />
                </el-form-item>
                <el-form-item label="客户分组" style="width: 100%; margin-bottom: 24px;" size="small" prop="group">
                    <el-select placeholder="请选择" v-model="formList1.group">
                       <el-option label="商超" value="商超"></el-option>
                        <el-option label="社群" value="社群"></el-option>
                        <el-option label="上群" value="上群"></el-option>
                        <el-option label="团建" value="团建"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="客户所属组织" style="width: 100%;margin-bottom: 24px;" size="small" prop="organization">
                    <el-select placeholder="请选择" v-model="formList1.organization">
                        <el-option label="组织1" value="组织1"></el-option>
                        <el-option label="组织2" value="组织2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="客户名称" style="width: 100%;margin-bottom: 24px;" size="small" prop="name">
                    <el-input placeholder="请输入" v-model="formList1.name" />
                </el-form-item>
                <el-form-item label="客户简称" style="width: 100%;margin-bottom: 24px;" size="small" prop="abbreviation">
                    <el-input placeholder="请输入" v-model="formList1.abbreviation" />
                </el-form-item>
                <el-form-item label="备注" style="width: 100%;margin-bottom: 24px;" size="small" prop="remark">
                    <el-input type="textarea" :rows="2" placeholder="请填写备注信息 (200字以内)" v-model="formList1.remark" />
                </el-form-item>
            </el-form>
           <div class="harvestinformation">
                <span class="span1">|</span>
                <span>收货信息</span>
            </div>
           <div v-for="(addresses, index) in formList1.addresses" :key="addresses.id">
               <el-form label-position="top" style="min-height: 500px;" :model="addresses" ref="addressForms"
                    :rules="rules">
                   <div style="display: flex; justify-content: flex-end;" v-if="formList1.addresses.length > 1">
                        <el-button @click="formList1.addresses.splice(index, 1)" link type="danger"
                            size="small">删除此条</el-button>
                    </div>
                    <div class="Form2" style="display: flex; flex-direction: column; align-items: center;">
                        <el-form-item label="配送地址名称" style="width: 440px; margin-bottom: 24px; margin-top: 24px;"
                            size="small" prop="address">
                           <el-input v-model="addresses.address" style="width: 100%;" placeholder="请填写" />
                        </el-form-item>
                        <el-form-item label="联系人" style="width: 440px; margin-bottom: 24px;" size="small"
                            prop="contact">
                           <el-input v-model="addresses.contact" style="width: 100%;" placeholder="请填写" />
                        </el-form-item>
                        <el-form-item label="联系人电话" style="width: 440px; margin-bottom: 24px;" size="small"
                            prop="phone">
                           <el-input v-model="addresses.phone" style="width: 100%;" placeholder="请填写" />
                        </el-form-item>
                        <el-form-item label="所在地区" style="width: 440px; margin-bottom: 24px;" size="small"
                            prop="region">
                           <el-select v-model="addresses.region" style="width: 30%;" placeholder="请选择">
                                <el-option label="重庆" value="重庆"></el-option>
                                <el-option label="北京" value="北京"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="详细地址" style="width: 440px; margin-bottom: 24px;" size="small"
                            prop="detailedAddress">
                           <el-input v-model="addresses.detailedAddress" style="width: 100%;" type="textarea" :rows="3"
                                placeholder="请输入详细地址" />
                        </el-form-item>
                    </div>
                </el-form>
            </div>
           <el-row type="flex" justify="center" align="middle">
                <el-button size="small" style="width: 100%; border: 1px dashed #ccc;" @click="addForm">+ 新增</el-button>
            </el-row>
           <el-divider style="margin: 24px 0 8px 0" />
            <el-row type="flex" justify="end" align="middle">
               <el-button type="primary" size="small" @click="handleConfirm">确定</el-button>
                <el-button size="small" @click="handleCancel">取消</el-button>
            </el-row>
        </el-dialog>
    </div>
</template>


<script setup lang="ts" name="addCustomer">
import { ref, reactive, computed } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
// 规范数据
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

// 全局变量
let nextCustomerId = 2103972301206
let nextCoding = 40999999917
let nextAddressId = 1

// 弹窗状态
const dialogVisible = ref(false)
// 表单验证规则
const customerForm = ref()
// 地址表单验证规则
const addressForms = ref<FormInstance[]>([])
// 组件数据
const formList1 = reactive<CustomerData>({
    id: 0,
    attribute: '',
    type: '',
    coding: nextCoding++,
    group: '',
    organization: '',
    name: '',
    abbreviation: '',
    remark: '',
    addresses: [
        {
            id: nextAddressId++,
            address: '',
            contact: '',
            phone: '',
            region: '',
            detailedAddress: '',
        }
    ] 
})
// 动态弹窗标题
const showTitle = computed(() => {
    return formList1.id === 0 ? '新增客户' : '编辑客户'
})
// 清空表单方法
const clearForm = () => {
    formList1.id = 0
    formList1.attribute = ''
    formList1.type = ''
    formList1.group = ''
    formList1.organization = ''
    formList1.name = ''
    formList1.abbreviation = ''
    formList1.remark = ''
    nextAddressId = 1
    formList1.addresses = [
        {
            id: nextAddressId++,
            address: '',
            contact: '',
            phone: '',
            region: '',
            detailedAddress: ''
        }
    ]
}
// 添加地址表单
const addForm = () => {   
    formList1.addresses.push({
        id: nextAddressId++,
        address: '',
        contact: '',
        phone: '',
        region: '',
        detailedAddress: '',
    })
}
// 打开新增弹窗
const open = () => {
    dialogVisible.value = true
    clearForm()
}
// 打开编辑弹窗
const openEdit = (data: CustomerData) => {
    Object.assign(formList1, data)
    dialogVisible.value = true
}
// 自定义添加编辑事件
const emit = defineEmits<{
     (e: 'addCustomer', data: CustomerData): void
     (e: 'editCustomer', data: CustomerData): void
}>()
// 确定按钮事件
const handleConfirm = async () => {
    try {
        const validations = [
            customerForm.value?.validate(),
            ...addressForms.value.map(form => form?.validate())
        ]
        await Promise.all(validations)
        if (formList1.id !== 0) { 
            const editData = JSON.parse(JSON.stringify(formList1))
            emit('editCustomer', editData)
            ElMessage.success('编辑成功')
        } else {
            const newData = JSON.parse(JSON.stringify(formList1))
            newData.id = nextCustomerId++ 
            newData.coding = nextCoding++ 
            emit('addCustomer', newData)
            // console.log(formList1);
            ElMessage.success('添加成功')
        }
        dialogVisible.value = false
    } catch {
        ElMessage.error('请填写完整信息')
    }
}
// 取消按钮事件
const handleCancel = () => {
    if (formList1.id !== 0) {
       customerForm.value?.clearValidate()
    } else {
        customerForm.value?.resetFields()
        addressForms.value.forEach(form => form?.resetFields())
        clearForm()
    }
    dialogVisible.value = false
}
// 表单验证规则
const rules = reactive({
    attribute: [
        { required: true, message: '请选择客户属性', trigger: 'blur' }
    ],
    type: [
        { required: true, message: '请选择客户类型', trigger: 'blur' }
    ],
    group: [
        { required: true, message: '请选择客户分组', trigger: 'blur' }
    ],
    coding: [
        { required: true, message: '请填写客户编码', trigger: 'blur' }
    ],
    organization: [
        { required: true, message: '请选择客户所属组织', trigger: 'blur' }
    ],
    name: [
        { required: true, message: '请填写客户名称', trigger: 'blur' }
    ],
    abbreviation: [
        { required: true, message: '请填写客户简称', trigger: 'blur' }
    ],
    remark: [
        { required: true, message: '请填写备注信息', trigger: 'blur' },
        { max: 200, message: '备注信息不能超过200字', trigger: 'blur' }
    ],
    address: [
        { required: true, message: '请填写配送地址名称', trigger: 'blur' }
    ],
    contact: [
        { required: true, message: '请填写联系人', trigger: 'blur' }
    ],
    phone: [
        { required: true, message: '请填写联系人电话', trigger: 'blur' }
    ],
    region: [
        { required: true, message: '请选择所在地区', trigger: 'blur' }
    ],
    detailedAddress: [
        { required: true, message: '请填写详细地址', trigger: 'blur' }
    ]
})

defineExpose({ open, openEdit })
</script>

<style scoped>
.Form2 {
    margin: 0 auto;
    background: #FAFAFA;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.09);
}

.harvestinformation {
    margin-top: 24px;
    font-family: Microsoft YaHei;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0px;
    color: black;
    margin-bottom: 8px;
}

.span1 {
    color: #0065FE;
    font-weight: 900;
    font-size: 18px;
}
</style>