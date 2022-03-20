<template>
  <el-upload
    class="single__uploader"
    :action="action"
    :data="{ token: token }"
    :show-file-list="false"
    :accept="accept"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <i v-else class="el-icon-plus single__uploader-icon"></i>
  </el-upload>
</template>

<script>
import { getQiNiuToken } from '@/api/common/common';
import { IMAGE_UPLOAD } from '@/utils/config';
export default {
  props: {
    action: {
      type: String,
      default: IMAGE_UPLOAD,
    },
    accept: {
      type: String,
      default: 'image/*',
    },
    cover: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      imageUrl: '',
      token: '',
    };
  },
  mounted() {
    if (this.cover) {
      this.imageUrl = process.env.VUE_APP_IMAGE_PATH + this.cover;
    }
    getQiNiuToken().then(res => {
      this.token = res.data;
    });
  },
  watch: {
    cover: function () {
      this.imageUrl = process.env.VUE_APP_IMAGE_PATH + this.cover;
    },
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = process.env.VUE_APP_IMAGE_PATH + res.hash;
      this.$emit('success', res);
    },
    beforeAvatarUpload(file) {
      const sizeLimit = file.size <= 1024 * 1024 * 10;
      if (!sizeLimit) {
        this.$message.error('图片大小不能超过10MB!');
      }
      return sizeLimit;
    },
  },
};
</script>

<style>
.single__uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.single__uploader .el-upload:hover {
  border-color: #409eff;
}
.single__uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
