<template>
  <el-form size="small" label-position="left" label-width="100px" :model="entity" ref="saveNode" :rules="rules">
    <el-form-item label="人力成本" prop="title">
      <el-input v-model="entity.manpower" />
    </el-form-item>
    <el-form-item label="租金" prop="title">
      <el-input v-model="entity.rent" />
    </el-form-item>
    <el-form-item label="材料成本" prop="title">
      <el-input v-model="entity.material" />
    </el-form-item>
    <el-form-item label="杂项" prop="title">
      <el-input v-model="entity.sundry" />
    </el-form-item>
    <div class="dialog-footer">
      <el-button type="primary" @click="save"> 修改 </el-button>
    </div>
  </el-form>
</template>

<script>
import {saveCost,getCost} from '@/api/goods/cost';

export default {
  name: 'cost',
  components: {},
  data() {
    return {
      entity: {},
      rules: {
      },
      Dialog: false,
    };
  },
  created() {
    this.initParam();
  },
  methods: {
    initParam() {
      getCost().then(res=>{
        this.entity=res.data;
      })
    },
    loadEntity() {

    },
    cancel() {
      this.$router.go(-1);
    },
    clearCeid() {
      this.entity.ceid = '';
    },save(){
      saveCost(this.entity).then(res=>{
        this.$message.success('修改成功!');
      })
    }
  },
  watch: {

  },
};
</script>

<style scoped>
.el-form {
  width: 80%;
  margin: 20px auto;
  padding: 20px;
  border: 1px dashed #d9d9d9;
}
.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
