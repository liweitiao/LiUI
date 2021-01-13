<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>商户信息系统</el-breadcrumb-item>
      <el-breadcrumb-item>承租人信息表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入搜索档位号或姓名或身份证号" v-model.trim="queryInfo.query" clearable @clear="handleInput">
            <el-button slot="append" icon="el-icon-search" @click="handleInput"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4" class="addOne">
          <el-button type="primary" @click="addDialogVisible = true">添加承租人</el-button>
        </el-col>

        <el-col :span="12" class="el-upload">
          <el-upload
          ref="upload"
          action="http://127.0.0.1:8000/upload_tenant"
          :file-list="fileList"
          :on-success="handleSuccess"
          :on-error="handleError"
          :auto-upload="false">
          <el-button slot="trigger" size="middle" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="middle" type="success" @click="submitUpload">批量上传到服务器</el-button>
        </el-upload>
        </el-col>

        <!-- 用户列表区域 -->
        <el-table border stripe :data="tenantList" class="el-table">
          <el-table-column type="index"></el-table-column>
          <el-table-column label="档位号" prop="shop_id"></el-table-column>
          <el-table-column label="承租人姓名" prop="name"></el-table-column>
          <el-table-column label="身份证号码(或执照号)" prop="idno"></el-table-column>
          <el-table-column label="身份证住址" prop="id_address"></el-table-column>
          <el-table-column label="现居住地址" prop="now_address"></el-table-column>
          <el-table-column label="联系电话" prop="phone"></el-table-column>
          <el-table-column label="籍贯" prop="native"></el-table-column>
          <el-table-column label="民族" prop="nation"></el-table-column>
          <el-table-column label="承租人公司法人姓名" prop="legal_person_name"></el-table-column>
          <el-table-column label="承租人法人身份证号码" prop="legal_person_id"></el-table-column>
          <el-table-column label="备注" prop="remarks"></el-table-column>
          <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.tenant_id)"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeTenantById(scope.row.tenant_id)"></el-button>
          </template>
        </el-table-column>
        </el-table>

        <!-- 分页区域 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[10, 50, 100, 200, 500]" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>

         <!-- 添加承租人的对话框 -->
        <el-dialog title="添加承租人" width="60%" :visible.sync="addDialogVisible">
          <!-- 内容主体区域 -->
          <el-form ref="addFormRef" label-width="120px">
            <el-form-item label="档位号" prop="shop_id">
              <el-input v-model="addForm.shop_id"></el-input>
            </el-form-item>
            <el-form-item label="承租人姓名" prop="name">
              <el-input v-model="addForm.name"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码(或执照号)" prop="idno">
              <el-input v-model="addForm.idno"></el-input>
            </el-form-item>
            <el-form-item label="身份证住址" prop="id_address">
              <el-input v-model="addForm.id_address"></el-input>
            </el-form-item>
            <el-form-item label="现居住地址" prop="now_address">
              <el-input v-model="addForm.now_address"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="addForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="籍贯" prop="native">
              <el-input v-model="addForm.native"></el-input>
            </el-form-item>
            <el-form-item label="民族" prop="nation">
              <el-input v-model="addForm.nation"></el-input>
            </el-form-item>
            <el-form-item label="承租人公司法人姓名" prop="legal_person_name">
              <el-input v-model="addForm.legal_person_name"></el-input>
            </el-form-item>
            <el-form-item label="承租人法人身份证号码" prop="legal_person_id">
              <el-input v-model="addForm.legal_person_id"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remarks">
              <el-input v-model="addForm.remarks"></el-input>
            </el-form-item>
          </el-form>
          <!-- 底部区域 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <!-- <el-button type="primary" :disabled="disabled" @click="disabled = true;addTenant()">确 定</el-button> -->
            <el-button type="primary" ref="addRef" :disabled="disabled" @click="disabled = true; addTenant()">确 定</el-button>
          </span>
        </el-dialog>

         <!-- 修改承租人的对话框 -->
        <el-dialog title="修改承租人信息" width="60%" :visible.sync="editDialogVisible">
          <!-- 内容主体区域 -->
          <el-form ref="editFormRef" label-width="120px">
            <el-form-item label="档位号" prop="shop_id">
              <el-input v-model="editForm.shop_id"></el-input>
            </el-form-item>
            <el-form-item label="承租人姓名" prop="name">
              <el-input v-model="editForm.name"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码(或执照号)" prop="idno">
              <el-input v-model="editForm.idno"></el-input>
            </el-form-item>
            <el-form-item label="身份证住址" prop="id_address">
              <el-input v-model="editForm.id_address"></el-input>
            </el-form-item>
            <el-form-item label="现居住地址" prop="now_address">
              <el-input v-model="editForm.now_address"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="editForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="籍贯" prop="native">
              <el-input v-model="editForm.native"></el-input>
            </el-form-item>
            <el-form-item label="民族" prop="nation">
              <el-input v-model="editForm.nation"></el-input>
            </el-form-item>
            <el-form-item label="承租人公司法人姓名" prop="legal_person_name">
              <el-input v-model="editForm.legal_person_name"></el-input>
            </el-form-item>
            <el-form-item label="承租人法人身份证号码" prop="legal_person_id">
              <el-input v-model="editForm.legal_person_id"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remarks">
              <el-input v-model="editForm.remarks"></el-input>
            </el-form-item>
          </el-form>
          <!-- 底部区域 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" :disabled="disabled" @click="editTenantInfo();disabled = true">确 定</el-button>
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
      tenantList: [],
      total: 0,
      addDialogVisible: false,
      editDialogVisible: false,
      // 查询到的承租人信息对象
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
  created () {
    // console.log(this.$route.path)
    this.activePath = this.$route.path
    window.sessionStorage.setItem('activePath', this.activePath)
    this.activePath = window.sessionStorage.getItem('activePath')
    this.gettenantList()
  },
  methods: {
    async gettenantList () {
      const { data: res } = await this.$http.get('gettenantList', {
        params: this.queryInfo
      })
      if (res.code !== 200) {
        return this.$message.error('获取承租人信息失败！')
      }
      this.tenantList = res.data
      this.total = res.total
      console.log(this.tenantList, this.total)
    },
    handleInput () {
      this.queryInfo.pagenum = 1
      this.gettenantList()
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.gettenantList()
    },
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.gettenantList()
    },
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
    submitUpload () {
      console.log(123, this.fileList)
      this.$refs.upload.submit()
    },
    handleSuccess () {
      this.$message.success('批量导入承租人信息成功')
      this.gettenantList()
    },
    handleError () {
      this.$message.error('批量导入承租人信息失败')
    },
    async addTenant () {
      console.log(this.disabled)
      const { data: res } = await this.$http.post('addTenant', this.addForm)

      if (res.code !== 200) {
        this.disabled = false
        return this.$message.error('添加承租人失败！')
      }

      this.$message.success('添加承租人成功！')
      this.addDialogVisible = false
      this.disabled = false
      this.gettenantList()
    },
    // 根据Id删除对应的用户信息
    async removeTenantById (tenantId) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        '此操作将永久删除该承租人, 是否继续?',
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

      const { data: res } = await this.$http.post('deleteTenant', tenantId)

      if (res.code !== 200) {
        return this.$message.error('删除承租人失败！')
      }

      this.$message.success('删除承租人成功！')
      this.gettenantList()
    },
    async showEditDialog (tenantId) {
      const { data: res } = await this.$http.get('getTenant', {
        params: { tenantId: tenantId }
      })

      if (res.code !== 200) {
        return this.$message.error('查询承租人信息失败! ')
      }
      this.editForm = res.data
      this.editDialogVisible = true
    },
    async editTenantInfo () {
      console.log(this.editForm)
      const { data: res } = await this.$http.post('editTenant', this.editForm)
      if (res.code !== 200) {
        this.disabled = false
        return this.$message.error('更新承租人信息失败！')
      }

      this.editDialogVisible = false
      this.disabled = false
      this.gettenantList()
      this.$message.success('更新用户信息成功！')
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
