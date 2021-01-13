<template>
  <div>
     <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>商户信息系统</el-breadcrumb-item>
      <el-breadcrumb-item>会员荣誉</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入搜索姓名或身份证号码" v-model.trim="queryInfo.query" clearable @clear="handleInput">
            <el-button slot="append" icon="el-icon-search" @click="handleInput"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4" class="addOne">
          <el-button type="primary" @click="addDialogVisible = true">添加会员荣誉</el-button>
        </el-col>

        <el-col :span="12" class="el-upload">
          <el-upload
          ref="upload"
          action="http://127.0.0.1:8000/upload_member_honor"
          :file-list="fileList"
          :on-success="handleSuccess"
          :on-error="handleError"
          :auto-upload="false">
          <el-button slot="trigger" size="middle" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="middle" type="success" @click="submitUpload">批量上传到服务器</el-button>
        </el-upload>
        </el-col>

        <!-- 会员荣誉列表区域 -->
        <el-table border stripe :data="honorList" class="el-table">
          <el-table-column type="index"></el-table-column>
          <el-table-column label="姓名" prop="name"></el-table-column>
          <el-table-column label="身份证号码" prop="idno"></el-table-column>
          <el-table-column label="年份" prop="year"></el-table-column>
          <el-table-column label="获得荣誉" prop="honor"></el-table-column>
          <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.honor_id)"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeHonorById(scope.row.honor_id)"></el-button>
          </template>
        </el-table-column>
        </el-table>

        <!-- 分页区域 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 50, 100, 200, 500]" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>

         <!-- 添加会员荣誉的对话框 -->
        <el-dialog title="添加会员荣誉" width="60%" :visible.sync="addDialogVisible">
          <!-- 内容主体区域 -->
          <el-form ref="addFormRef" label-width="120px">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="addForm.name"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="idno">
              <el-input v-model="addForm.idno"></el-input>
            </el-form-item>
            <el-form-item label="年份" prop="year">
              <el-input v-model="addForm.year"></el-input>
            </el-form-item>
            <el-form-item label="获得荣誉" prop="honor">
              <el-input v-model="addForm.honor"></el-input>
            </el-form-item>
          </el-form>
          <!-- 底部区域 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <!-- <el-button type="primary" :disabled="disabled" @click="disabled = true;addTenant()">确 定</el-button> -->
            <el-button type="primary" ref="addRef" :disabled="disabled" @click="disabled = true; addHonor()">确 定</el-button>
          </span>
        </el-dialog>

         <!-- 修改会员荣誉的对话框 -->
        <el-dialog title="修改会员荣誉信息" width="60%" :visible.sync="editDialogVisible">
          <!-- 内容主体区域 -->
          <el-form ref="editFormRef" label-width="120px">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="editForm.name"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="idno">
              <el-input v-model="editForm.idno"></el-input>
            </el-form-item>
            <el-form-item label="年份" prop="year">
              <el-input v-model="editForm.year"></el-input>
            </el-form-item>
            <el-form-item label="获得荣誉" prop="honor">
              <el-input v-model="editForm.honor"></el-input>
            </el-form-item>
          </el-form>
          <!-- 底部区域 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" :disabled="disabled" @click="editHonorInfo();disabled = true">确 定</el-button>
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
      honorList: [],
      total: 0,
      addDialogVisible: false,
      editDialogVisible: false,
      // 查询到的会员荣誉信息对象
      editForm: {},
      disabled: false,
      addForm: {
        name: '',
        idno: '',
        year: '',
        honor: ''
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
    this.gethonorList()
  },
  methods: {
    async gethonorList () {
      const { data: res } = await this.$http.get('gethonorList', {
        params: this.queryInfo
      })
      if (res.code !== 200) {
        return this.$message.error('获取会员荣誉信息失败！')
      }
      this.honorList = res.data
      this.total = res.total
      console.log(this.honorList, this.total)
    },
    handleInput () {
      this.queryInfo.pagenum = 1
      this.gethonorList()
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.gethonorList()
    },
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.gethonorList()
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
      this.$message.success('批量导入会员荣誉信息成功')
      this.gethonorList()
    },
    handleError () {
      this.$message.error('批量导入会员荣誉信息失败')
    },
    async addHonor () {
      console.log(this.disabled)
      const { data: res } = await this.$http.post('addHonor', this.addForm)

      if (res.code !== 200) {
        this.disabled = false
        return this.$message.error('添加会员荣誉失败！')
      }

      this.$message.success('添加会员荣誉成功！')
      this.addDialogVisible = false
      this.disabled = false
      this.gethonorList()
    },
    // 根据Id删除对应的用户信息
    async removeHonorById (honorId) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        '此操作将永久删除该会员荣誉, 是否继续?',
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

      const { data: res } = await this.$http.post('deleteHonor', honorId)

      if (res.code !== 200) {
        return this.$message.error('删除会员荣誉失败！')
      }

      this.$message.success('删除会员荣誉成功！')
      this.gethonorList()
    },
    async showEditDialog (honorId) {
      const { data: res } = await this.$http.get('getHonor', {
        params: { honor_id: honorId }
      })

      if (res.code !== 200) {
        return this.$message.error('查询会员荣誉信息失败! ')
      }
      this.editForm = res.data
      this.editDialogVisible = true
    },
    async editHonorInfo () {
      console.log(this.editForm)
      const { data: res } = await this.$http.post('editHonor', this.editForm)
      if (res.code !== 200) {
        this.disabled = false
        return this.$message.error('更新会员荣誉信息失败！')
      }

      this.editDialogVisible = false
      this.disabled = false
      this.gethonorList()
      this.$message.success('更新会员荣誉信息成功！')
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
