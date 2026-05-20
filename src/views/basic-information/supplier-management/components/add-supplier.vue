<template>
  <div>
    <el-dialog v-model="showHide" :title="showTitle" width="520" @close="handleCancel">
      <el-divider style="margin-top: 10px; margin-bottom: 24px" />
      <el-form
        label-width="120px"
        label-position="top"
        style="min-height: 600px"
        :model="formList1"
        ref="formOne"
        :rules="rules"
      >
        <el-form-item
          :label="formList1.id !== 0 ? `供应商属性: ${formList1.attribute}供应商` : '供应商属性'"
          style="width: 100%; margin-bottom: 24px"
          size="small"
          prop="attribute"
        >
          <el-select v-if="formList1.id === 0" placeholder="请选择" v-model="formList1.attribute">
            <el-option label="内部" value="内部"></el-option>
            <el-option label="外部" value="外部"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="formList1.id !== 0 ? `供应商类型: ${formList1.type}` : '供应商类型'"
          style="width: 100%; margin-bottom: 24px"
          size="small"
          prop="type"
        >
          <el-select v-if="formList1.id === 0" placeholder="请选择" v-model="formList1.type">
            <el-option label="苹果" value="苹果"></el-option>
            <el-option label="香蕉" value="香蕉"></el-option>
            <el-option label="橘子" value="橘子"></el-option>
            <el-option label="葡萄" value="葡萄"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="formList1.id !== 0"
          label="供应商财务编码"
          style="width: 100%; margin-bottom: 24px"
          size="small"
          prop="coding"
        >
          <el-input placeholder="请输入" v-model="formList1.coding" />
        </el-form-item>
        <el-form-item
          label="客户所属组织"
          style="width: 100%; margin-bottom: 24px"
          size="small"
          prop="organization"
        >
          <el-select placeholder="请选择" v-model="formList1.organization">
            <el-option label="组织1" value="组织1"></el-option>
            <el-option label="组织2" value="组织2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="供应商名称"
          style="width: 100%; margin-bottom: 24px"
          size="small"
          prop="name"
        >
          <el-input placeholder="请输入" v-model="formList1.name" />
        </el-form-item>
        <el-form-item
          label="供应商简称"
          style="width: 100%; margin-bottom: 24px"
          size="small"
          prop="abbreviation"
        >
          <el-input placeholder="请输入" v-model="formList1.abbreviation" />
        </el-form-item>
        <el-form-item
          label="联系电话"
          style="width: 100%; margin-bottom: 24px"
          size="small"
          prop="phone"
        >
          <el-input placeholder="请输入" v-model="formList1.phone" type="number" />
        </el-form-item>
        <el-form-item label="供应商地址" style="width: 100%" size="small" prop="address">
          <el-input v-model="formList1.address" placeholder="请输入地址" />
        </el-form-item>
        <el-form-item label="门牌号" style="width: 100%" size="small" prop="house">
          <el-input
            v-model="formList1.house"
            placeholder="请输入门牌号(50字以内)"
            type="textarea"
            :rows="2"
          />
        </el-form-item>
        <el-form-item
          label="备注"
          style="width: 100%; margin-bottom: 24px"
          size="small"
          prop="remark"
        >
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请填写备注信息 (200字以内)"
            v-model="formList1.remark"
          />
        </el-form-item>
      </el-form>
      <el-divider style="margin: 24px 0 8px 0" />
      <el-row type="flex" justify="end" align="middle">
        <el-button type="primary" size="small" @click="handleSure">确定</el-button>
        <el-button size="small" @click="handleCancel">取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="addSupplier">
import { ElMessage } from 'element-plus'
import { computed, reactive, ref } from 'vue'

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

let id = 21342414123
let coding = 40999999917

const formOne = ref()
// 弹窗状态
const showHide = ref<boolean>(false)
// 新增表单数据
const formList1 = reactive<CustomerData>({
  id: id++,
  coding: coding++,
  attribute: '',
  type: '',
  organization: '',
  name: '',
  phone: '',
  abbreviation: '',
  remark: '',
  address: '',
  house: ''
})
// 弹窗标题
const showTitle = computed(() => {
  return formList1.id !== 0 ? '编辑供应商' : '新增供应商'
})
// 清空表单数据
const clearForm = () => {
  formList1.id = 0
  formList1.coding = coding++
  formList1.attribute = ''
  formList1.type = ''
  formList1.name = ''
  formList1.organization = ''
  formList1.phone = ''
  formList1.abbreviation = ''
  formList1.remark = ''
  formList1.address = ''
  formList1.house = ''
}
// 父组件打开新增弹窗
const open = () => {
  clearForm()
  showHide.value = true
}
// 打开编辑弹窗
const openEdit = (data: CustomerData) => {
  Object.assign(formList1, data)
  showHide.value = true
  // console.log(data)
}
// 传递表单数据
const emit = defineEmits<{
  (e: 'addCustomer', data: CustomerData): void
  (e: 'editCustomer', data: CustomerData): void
}>()
// 表单提交
const handleSure = () => {
  formOne.value.validate((valid: boolean) => {
    if (valid) {
      if (formList1.id === 0) {
        const submitData = JSON.parse(JSON.stringify(formList1))
        submitData.id = id++
        emit('addCustomer', submitData)
        // console.log(submitData)
        showHide.value = false
        ElMessage.success('添加成功')
      } else {
        const editData = JSON.parse(JSON.stringify(formList1))
        emit('editCustomer', editData)
        // console.log(editData)
        showHide.value = false
        ElMessage.success('编辑成功')
      }
    } else {
      ElMessage.error('请填写完整信息')
    }
  })
}
// 表单取消
const handleCancel = () => {
  showHide.value = false
  formOne.value.resetFields()
}
// 表单验证规则
const rules = reactive({
  attribute: [{ required: true, message: '请选择供应商属性', trigger: 'blur' }],
  type: [{ required: true, message: '请选择供应商类型', trigger: 'blur' }],
  organization: [{ required: true, message: '请选择客户所属组织', trigger: 'blur' }],
  name: [{ required: true, message: '请输入供应商名称', trigger: 'blur' }],
  abbreviation: [{ required: true, message: '请输入供应商简称', trigger: 'blur' }],
  coding: [{ required: true, message: '请输入供应商财务编码', trigger: 'blur' }],
  address: [{ required: true, message: '请输入供应商地址', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入联系人电话', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '电话格式不正确', trigger: 'blur' },
    { min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur' }
  ],
  house: [
    { required: true, message: '请输入门牌号', trigger: 'blur' },
    { max: 50, message: '门牌号不能超过50字', trigger: 'blur' }
  ],
  remark: [
    { required: true, message: '请输入备注信息', trigger: 'blur' },
    { max: 200, message: '备注信息不能超过200字', trigger: 'blur' }
  ]
})

defineExpose({ open, openEdit })
</script>

<style scoped></style>
