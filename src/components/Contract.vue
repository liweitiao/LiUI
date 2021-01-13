<template>
  <div>
     <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>商户信息系统</el-breadcrumb-item>
      <el-breadcrumb-item>物业合同更名记录</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入搜索档位号或变更前后名称" v-model.trim="queryInfo.query" clearable @clear="handleInput">
            <el-button slot="append" icon="el-icon-search" @click="handleInput"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4" class="addOne">
          <el-button type="primary" @click="addDialogVisible = true">添加物业合同更名记录</el-button>
        </el-col>

        <el-col :span="12" class="el-upload">
          <el-upload
          ref="upload"
          action="http://127.0.0.1:8000/upload_contract"
          :file-list="fileList"
          :on-success="handleSuccess"
          :on-error="handleError"
          :auto-upload="false">
          <el-button slot="trigger" size="middle" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="middle" type="success" @click="submitUpload">批量上传到服务器</el-button>
        </el-upload>
        </el-col>

        <!-- 合同更名记录列表区域 -->
        <el-table border stripe :data="contractList" class="el-table">
          <el-table-column type="index"></el-table-column>
          <el-table-column label="档位号" prop="shop_id"></el-table-column>
          <el-table-column label="合同更名日期" prop="rename_time"></el-table-column>
          <el-table-column label="变更类型" prop="rename_type"></el-table-column>
          <el-table-column label="变更前名称" prop="rename_before"></el-table-column>
          <el-table-column label="变更后名称" prop="rename_after"></el-table-column>
          <el-table-column label="关系" prop="relationship"></el-table-column>
          <el-table-column label="备注" prop="remarks"></el-table-column>
          <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.record_id)"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeContractById(scope.row.record_id)"></el-button>
          </template>
        </el-table-column>
        </el-table>

        <!-- 分页区域 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[10, 50, 100, 200, 500]" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>

         <!-- 添加合同更名记录的对话框 -->
        <el-dialog title="添加物业合同更名记录" width="60%" :visible.sync="addDialogVisible">
          <!-- 内容主体区域 -->
          <el-form ref="addFormRef" label-width="120px">
            <el-form-item label="档位号" prop="shop_id">
              <el-input v-model="addForm.shop_id"></el-input>
            </el-form-item>
            <el-form-item label="合同更名日期" prop="rename_time">
              <el-input v-model="addForm.rename_time"></el-input>
            </el-form-item>
            <el-form-item label="变更类型" prop="rename_type">
              <el-input v-model="addForm.rename_type"></el-input>
            </el-form-item>
            <el-form-item label="变更前名称" prop="rename_before">
              <el-input v-model="addForm.rename_before"></el-input>
            </el-form-item>
            <el-form-item label="变更后名称" prop="rename_after">
              <el-input v-model="addForm.rename_after"></el-input>
            </el-form-item>
            <el-form-item label="关系" prop="relationship">
              <el-input v-model="addForm.relationship"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remarks">
              <el-input v-model="addForm.remarks"></el-input>
            </el-form-item>
          </el-form>
          <!-- 底部区域 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <!-- <el-button type="primary" :disabled="disabled" @click="disabled = true;addTenant()">确 定</el-button> -->
            <el-button type="primary" ref="addRef" :disabled="disabled" @click="disabled = true; addContract()">确 定</el-button>
          </span>
        </el-dialog>

         <!-- 修改合同更名记录的对话框 -->
        <el-dialog title="修改物业合同更名记录" width="60%" :visible.sync="editDialogVisible">
          <!-- 内容主体区域 -->
          <el-form ref="editFormRef" label-width="120px">
            <el-form-item label="档位号" prop="shop_id">
              <el-input v-model="editForm.shop_id"></el-input>
            </el-form-item>
            <el-form-item label="合同更名日期" prop="name">
              <el-input v-model="editForm.rename_time"></el-input>
            </el-form-item>
            <el-form-item label="变更类型" prop="idno">
              <el-input v-model="editForm.rename_type"></el-input>
            </el-form-item>
            <el-form-item label="变更前名称" prop="id_address">
              <el-input v-model="editForm.rename_before"></el-input>
            </el-form-item>
            <el-form-item label="变更后名称" prop="now_address">
              <el-input v-model="editForm.rename_after"></el-input>
            </el-form-item>
            <el-form-item label="关系" prop="phone">
              <el-input v-model="editForm.relationship"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="native">
              <el-input v-model="editForm.remarks"></el-input>
            </el-form-item>
          </el-form>
          <!-- 底部区域 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" :disabled="disabled" @click="editContractInfo();disabled = true">确 定</el-button>
          </span>
        </el-dialog>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      activePath: '',
      fileList: [],
      contractList: [],
      total: 0,
      addDialogVisible: false,
      editDialogVisible: false,
      // 查询到的合同更名记录信息对象
      editForm: {},
      disabled: false,
      addForm: {
        shop_id: '',
        name: '',
        idno: '',
        id_address: '',
        now_address: '',
        phone: '',
        native: '',
        nation: '',
        legal_person_name: '',
        legal_person_id: '',
        remarks: ''
      }
    }
  },
  // mounted () {
  //   console.log(this.$route.path)
  //   this.activePath = this.$route.path
  //   window.sessionStorage.setItem('activePath', this.activePath)
  //   console.log(this.activePath)
  // },
  created () {
    // console.log(this.$route.path)
    this.activePath = this.$route.path
    window.sessionStorage.setItem('activePath', this.activePath)
    this.activePath = window.sessionStorage.getItem('activePath')
    this.getcontractList()
  },
  methods: {
    async getcontractList () {
      const { data: res } = await this.$http.get('getcontractList', {
        params: this.queryInfo
      })
      if (res.code !== 200) {
        return this.$message.error('获取合同更名记录信息失败！')
      }
      this.contractList = res.data
      this.total = res.total
    },
    handleInput () {
      this.queryInfo.pagenum = 1
      this.getcontractList()
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getcontractList()
    },
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getcontractList()
    },
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
    submitUpload () {
      // console.log(123, this.fileList)
      this.$refs.upload.submit()
    },
    handleSuccess () {
      this.$message.success('批量导入合同更名记录信息成功')
      this.getcontractList()
    },
    handleError () {
      this.$message.error('批量导入合同更名记录信息失败')
    },
    async addContract () {
      console.log(this.disabled)
      const { data: res } = await this.$http.post('addContract', this.addForm)

      if (res.code !== 200) {
        this.disabled = false
        return this.$message.error('添加合同更名记录信息失败！')
      }

      this.$message.success('添加合同更名记录信息成功！')
      this.addDialogVisible = false
      this.disabled = false
      this.getcontractList()
    },
    // 根据Id删除对应的合同更名记录
    async removeContractById (contractId) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        '此操作将永久删除该合同更名记录, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)

      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消了删除，则返回值为字符串 cancel
      // console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }

      const { data: res } = await this.$http.post('deleteContract', contractId)

      if (res.code !== 200) {
        return this.$message.error('删除合同更名记录失败！')
      }

      this.$message.success('删除合同更名记录成功！')
      this.getcontractList()
    },

    async showEditDialog (recordId) {
      const { data: res } = await this.$http.get('getContract', {
        params: { record_id: recordId }
      })

      if (res.code !== 200) {
        return this.$message.error('查询合同更名记录信息失败! ')
      }
      this.editForm = res.data
      this.editDialogVisible = true
    },

    async editContractInfo () {
      console.log(this.editForm)
      const { data: res } = await this.$http.post('editContract', this.editForm)
      if (res.code !== 200) {
        this.disabled = false
        return this.$message.error('更新合同更名记录信息失败！')
      }

      this.editDialogVisible = false
      this.disabled = false
      this.getcontractList()
      this.$message.success('更新合同更名记录信息成功！')
    }
  }
}
</script>

<style>
.el-upload-list__item-name{
  margin-left: 40px;
}

.addOne{
  margin-bottom: 30px;
}
</style>
