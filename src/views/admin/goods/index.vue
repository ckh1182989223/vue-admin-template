<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.content"
        placeholder="商品名称"
        size="small"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleSearch" />
      <el-select  size="small" clearable v-model="listQuery.type" placeholder="类型"  style="width: 150px" class="filter-item" @change="getList">
        <el-option  label="店长推荐" value="0" />
        <el-option  label="营养套餐" value="1" />
        <el-option  label="小吃" value="2" />
        <el-option  label="饮品" value="3" />
        <el-option  label="收藏福利" value="4" />
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        size="small"
        type="primary"
        icon="el-icon-search"
        @click="handleSearch"
        style="margin-left: 10px">
        搜索
      </el-button>

      <el-button
        class="filter-item"
        size="small"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="addGoods">
        添加
      </el-button>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      size="small"
      highlight-current-row
      style="width: 100%; margin-top: 20px"
      @sort-change="sortChange">
      <el-table-column label="商品名称" min-width="110px" align="center">
        <template slot-scope="{ row }">
          <span class="link-type">{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="100px" align="center">
        <template slot-scope="{ row }">
          <span>{{ format(row.createtime, 'yyyy-MM-dd') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="价格" width="80px" align="center">
        <template slot-scope="{ row }">
          <span class="link-type">{{ row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="成本" width="80px" align="center">
        <template slot-scope="{ row }">
          <span class="link-type">{{ row.cost }}</span>
        </template>
      </el-table-column>
      <el-table-column label="辅料" width="80px" align="center">
        <template slot-scope="{ row }">
          <span class="link-type">{{ row.materials }}</span>
        </template>
      </el-table-column>
      <el-table-column label="包装费" width="130px" align="center">
        <template slot-scope="{ row }">
          <span class="link-type">{{ row.packfee }}</span>
        </template>
      </el-table-column>
      <el-table-column label="净利润" width="130px" align="center">
        <template slot-scope="{ row }">
          <span class="link-type">{{ row.profit }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类别" width="130px" align="center">
        <template slot-scope="{ row }">
          <span v-if="row.type==0" class="link-type">店长推荐</span>
          <span v-if="row.type==1" class="link-type">营养套餐</span>
          <span v-if="row.type==2" class="link-type">小吃</span>
          <span v-if="row.type==3" class="link-type">饮品</span>
          <span v-if="row.type==4" class="link-type">收藏福利</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="130px" align="center">
        <template slot-scope="{ row }">
          <span class="link-type">{{ row.info }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="300" class-name="small-padding fixed-width">
        <template slot-scope="{ row }">
          <el-button type="text" size="mini" @click="editGoods(row)">编辑</el-button>
          <el-button type="text" size="mini" @click="deleteGoods(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="listQuery.total > 0"
      :total="listQuery.total"
      :page.sync="listQuery.pageNum"
      :limit.sync="listQuery.pageSize"
      @pagination="getList" />

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" @close="getList">
      <el-form
        ref="goods"
        :rules="rules"
        :model="goods"
        size="small"
        label-position="left"
        label-width="70px"
        style="width: 500px; margin-left: 50px">
        <el-form-item label="商品名" prop="name">
          <el-input v-model="goods.name" />
        </el-form-item>

        <el-form-item label="商品分类" prop="type">
          <el-select v-model="goods.type" placeholder="请选择">
            <el-option label="店长推荐" :value="0"> </el-option>
            <el-option label="营养套餐" :value="1"> </el-option>
            <el-option label="小吃" :value="2"> </el-option>
            <el-option label="饮品" :value="3"> </el-option>
            <el-option label="收藏福利" :value=4> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="goods.price" />
        </el-form-item>

        <el-form-item label="成本" prop="price">
          <el-input v-model="goods.cost" />
        </el-form-item>
        <el-form-item label="包装费" prop="cost">
          <el-input v-model="goods.packfee" />
        </el-form-item>
        <el-form-item label="辅料" prop="cost">
          <el-input v-model="goods.materials" />
        </el-form-item>
        <el-form-item label="备注" prop="info">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="备注"
            v-model="goods.info">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> 取消 </el-button>
        <el-button type="primary" @click="handleConfirm"> 确认 </el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
import { goodList ,saveGoods,deleteGoods} from '@/api/goods/goods';
import waves from '@/directive/waves';
import { format } from 'date-fns';
import Pagination from '@/components/Pagination';

export default {
  name: 'goods',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      page: {
        size: 10,
        num: 1,
        total: 10,
      },
      list: [],
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        content: undefined,
        type:undefined
      },
      dialogVisible: false,
      dialogFormVisible: false,
      dialogStatus: 0,
      goods: {
        type: 0,
        name: '',
        price: 0,
        cost: 0,
        packfee: 0,
        materials:0,
        info: '',
      },
      rules: {
        title: [{ required: true, message: '请填写标题', trigger: 'blur' }],
        cover: [{ required: true, message: '请上传封面', trigger: 'blur' }],
      },
      downloadLoading: false,
    };
  },
  created() {
      this.getList();
  },
  computed: {
    format() {
      return format;
    },
    dialogTitle() {
      return this.dialogStatus ? '添加商品' : '编辑商品';
    },
  },
  methods: {
    getList() {
      this.listLoading = true;
      goodList(this.listQuery).then(response => {
        this.list = response.data.list;
        this.listQuery.total = response.data.total;
        this.listLoading = false;
        // Just to simulate the time of the request
      });
    },addGoods(){
      this.goods={
          type: 0,
          name: '',
          price: 0,
          cost: 0,
          packfee: 0,
          materials:0,
          info: '',
      }
      this.dialogFormVisible=true;
      this.dialogStatus = 1;
    },editGoods(row){
      this.dialogFormVisible=true;
      this.dialogStatus = 0;
      this.goods = row;
    },deleteGoods(id){
      let that = this;
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
        .then(() => {
          deleteGoods(id).then(res => {
            this.$message({ message: '删除成功', type: 'success' });
            that.getList();
          });
        })
        .catch(() => {});
    },
    sortChange() {},
    handleSearch() {
      //this.listQuery.content = content;
      this.getList();
    },
    handleDownload() {},
  handleConfirm() {
    this.$refs['goods'].validate(valid => {
      if (valid) {
        saveGoods(this.goods).then(res => {
          this.$message({ message: '修改成功', type: 'success' });
          this.dialogFormVisible = false;
          this.getList();
        });
      } else {
        this.$message.error('请将表单填写完整~');
      }
    });
  }
  },
};
</script>
