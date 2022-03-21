<template>
  <div class="app-container">
    <div class="filter-container">
        <el-date-picker
          v-model="listQuery.daystr"
          type="date"
          size="small"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          @change="getList">
        </el-date-picker>
      <el-input
        v-model="listQuery.content"
        placeholder="商品名称"
        size="small"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleSearch" />
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
      <el-table-column label="时间" width="100px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.daystr}}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" min-width="110px" align="center">
        <template slot-scope="{ row }">
          <span class="link-type">{{ row.name }}</span>
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
      <el-table-column label="销量" width="100px" align="center">
        <template slot-scope="{ row }">
          <span class="link-type">{{ row.count }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="300" class-name="small-padding fixed-width">
        <template slot-scope="{ row }">
          <el-button type="text" size="mini" @click="editCount(row)">编辑</el-button>

        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="listQuery.total > 0"
      :total="listQuery.total"
      :page.sync="listQuery.pageNum"
      :limit.sync="listQuery.pageSize"
      @pagination="getList" />
  </div>

</template>

<script>
import { dayStatistics,changeCount} from '@/api/goods/statistics';
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
        daystr:undefined
      },
      dialogVisible: false,
      dialogFormVisible: false,
      dialogStatus: 0,
      statistics: {
        name: '',
        daystr: 0,
        count:0
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
    editCount(row){
      this.$prompt('请输入销量', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        const param = {
          id: row.id,
          count: value,
        };
        changeCount(param).then(res=>{
          this.$message({
            type: 'success',
            message: '修改成功'
          });
          this.getList();
        })

      });
    },
    getList() {
      this.listLoading = true;
      dayStatistics(this.listQuery).then(response => {
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
      /*let that = this;
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
        .catch(() => {});*/
    },
    changeCount(row){
      console.log("1234");
      const { count, id } = row;
      const param = {
        id: id,
        count: count,
      };
      changeCount(param).then(() => {
        this.$message.success('修改成功!');
        this.getList();
      });
    },
    sortChange() {},
    handleSearch() {
      //this.listQuery.content = content;
      this.getList();
    },
    handleDownload() {},
    handleConfirm() {
    }
  },
};
</script>

