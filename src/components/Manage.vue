<template>
  <div>
     <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>商户信息系统</el-breadcrumb-item>
      <el-breadcrumb-item>经营信息</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入搜索档位号或执照经营者" v-model.trim="queryInfo.query" clearable @clear="handleInput">
            <el-button slot="append" icon="el-icon-search" @click="handleInput"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4" class="addOne">
          <el-button type="primary" @click="addDialogVisible = true">添加经营信息</el-button>
        </el-col>

        <el-col :span="12" class="el-upload">
          <el-upload
          ref="upload"
          action="http://10.1.32.29/upload_management"
          :file-list="fileList"
          :on-success="handleSuccess"
          :on-error="handleError"
          :auto-upload="false">
          <el-button slot="trigger" size="middle" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="middle" type="success" @click="submitUpload">批量上传到服务器</el-button>
        </el-upload>
        </el-col>

        <!-- 经营信息列表区域 -->
        <el-table border stripe :data="managementList" class="el-table">
          <el-table-column type="index"></el-table-column>
          <el-table-column label="档位号" prop="shop_id"></el-table-column>
          <el-table-column label="档位注册营业执照名称" prop="business_license_name"></el-table-column>
          <el-table-column label="档位注册营业执照号" prop="business_license_no"></el-table-column>
          <el-table-column label="执照经营者" prop="name"></el-table-column>
          <el-table-column label="联系电话" prop="phone"></el-table-column>
          <el-table-column label="主营品类" prop="category"></el-table-column>
          <el-table-column label="自营基地" prop="base"></el-table-column>
          <el-table-column label="其他市场经营" prop="other_market"></el-table-column>
          <el-table-column label="备注" prop="remarks"></el-table-column>
          <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.management_id)"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeManagementById(scope.row.management_id)"></el-button>
          </template>
        </el-table-column>
        </el-table>

        <!-- 分页区域 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[10, 50, 100, 200, 500]" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>

         <!-- 添加经营信息的对话框 -->
        <el-dialog title="添加经营信息" width="60%" :visible.sync="addDialogVisible">
          <!-- 内容主体区域 -->
          <el-form ref="addFormRef" label-width="120px">
            <el-form-item label="档位号" prop="shop_id">
              <el-input v-model="addForm.shop_id"></el-input>
            </el-form-item>
            <el-form-item label="档位注册营业执照名称" prop="business_license_name">
              <el-input v-model="addForm.business_license_name"></el-input>
            </el-form-item>
            <el-form-item label="档位注册营业执照号" prop="business_license_no">
              <el-input v-model="addForm.business_license_no"></el-input>
            </el-form-item>
            <el-form-item label="执照经营者" prop="name">
              <el-input v-model="addForm.name"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="addForm.now_address"></el-input>
            </el-form-item>
            <el-form-item label="主营品类" prop="category">
              <el-input v-model="addForm.category"></el-input>
            </el-form-item>
            <el-form-item label="自营基地" prop="base">
              <el-input v-model="addForm.base"></el-input>
            </el-form-item>
            <el-form-item label="其他市场经营" prop="other_market">
              <el-input v-model="addForm.other_market"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remarks">
              <el-input v-model="addForm.remarks"></el-input>
            </el-form-item>
          </el-form>
          <!-- 底部区域 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <!-- <el-button type="primary" :disabled="disabled" @click="disabled = true;addTenant()">确 定</el-button> -->
            <el-button type="primary" ref="addRef" :disabled="disabled" @click="disabled = true; addManagement()">确 定</el-button>
          </span>
        </el-dialog>

         <!-- 修改经营信息的对话框 -->
        <el-dialog title="修改经营信息" width="60%" :visible.sync="editDialogVisible">
          <!-- 内容主体区域 -->
          <el-form ref="editFormRef" label-width="120px">
            <el-form-item label="档位号" prop="shop_id">
              <el-input v-model="editForm.shop_id"></el-input>
            </el-form-item>
            <el-form-item label="档位注册营业执照名称" prop="business_license_name">
              <el-input v-model="editForm.business_license_name"></el-input>
            </el-form-item>
            <el-form-item label="档位注册营业执照号" prop="business_license_no">
              <el-input v-model="editForm.business_license_no"></el-input>
            </el-form-item>
            <el-form-item label="执照经营者" prop="name">
              <el-input v-model="editForm.name"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="editForm.now_address"></el-input>
            </el-form-item>
            <el-form-item label="主营品类" prop="category">
              <el-input v-model="editForm.category"></el-input>
            </el-form-item>
            <el-form-item label="自营基地" prop="base">
              <el-input v-model="editForm.base"></el-input>
            </el-form-item>
            <el-form-item label="其他市场经营" prop="other_market">
              <el-input v-model="editForm.other_market"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remarks">
              <el-input v-model="editForm.remarks"></el-input>
            </el-form-item>
          </el-form>
          <!-- 底部区域 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" :disabled="disabled" @click="editManagementInfo();disabled = true">确 定</el-button>
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
      managementList: [],
      total: 0,
      addDialogVisible: false,
      editDialogVisible: false,
      // 查询到的经营信息对象
      editForm: {},
      disabled: false,
      addForm: {
        shop_id: '',
        business_license_name: '',
        business_license_no: '',
        name: '',
        phone: '',
        category: '',
        base: '',
        other_market: '',
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
    this.getmanagementList()
  },
  methods: {
    async getmanagementList () {
      const { data: res } = await this.$http.get('getmanagementList', {
        params: this.queryInfo
      })
      if (res.code !== 200) {
        return this.$message.error('获取经营信息失败！')
      }
      this.managementList = res.data
      this.total = res.total
      console.log(this.managementList, this.total)
    },
    handleInput () {
      this.queryInfo.pagenum = 1
      this.getmanagementList()
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getmanagementList()
    },
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getmanagementList()
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
      this.$message.success('批量导入经营信息成功')
      this.getmanagementList()
    },
    handleError () {
      this.$message.error('批量导入经营信息失败')
    },
    async addManagement () {
      console.log(this.disabled)
      const { data: res } = await this.$http.post('addManagement', this.addForm)

      if (res.code !== 200) {
        this.disabled = false
        return this.$message.error('添加经营信息失败！')
      }

      this.$message.success('添加经营信息成功！')
      this.addDialogVisible = false
      this.disabled = false
      this.getmanagementList()
    },
    // 根据Id删除对应的经营信息
    async removeManagementById (managementId) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        '此操作将永久删除该经营信息, 是否继续?',
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

      const { data: res } = await this.$http.post('deleteManagement', managementId)

      if (res.code !== 200) {
        return this.$message.error('删除经营信息失败！')
      }

      this.$message.success('删除经营信息成功！')
      this.getmanagementList()
    },
    async showEditDialog (managementId) {
      const { data: res } = await this.$http.get('getManagement', {
        params: { management_id: managementId }
      })

      if (res.code !== 200) {
        return this.$message.error('查询经营信息失败! ')
      }
      this.editForm = res.data
      this.editDialogVisible = true
    },
    async editManagementInfo () {
      console.log(this.editForm)
      const { data: res } = await this.$http.post('editManagement', this.editForm)
      if (res.code !== 200) {
        this.disabled = false
        return this.$message.error('更新经营信息失败！')
      }

      this.editDialogVisible = false
      this.disabled = false
      this.getmanagementList()
      this.$message.success('更新经营信息成功！')
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
