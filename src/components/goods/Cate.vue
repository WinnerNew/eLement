<template >
  <div>
    <!-- 导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary">添加分类</el-button>
        </el-col>
      </el-row>
      <div
        v-loading="loading"
      >
        <tree-table
          :data="cateList"
          :columns="columns"
          show-index
          index-text="#"
          border
          :selection-type="false"
          :expand-type="false"
          :show-row-hover="false"
          class="mtop"
        >
          <template slot="isok" slot-scope="scope">
            <i
              class="el-icon-success"
              style="color:lightgreen"
              v-if="scope.row.cat_deleted === false"
            ></i>
            <i class="el-icon-error" style="color:red" v-else></i>
          </template>
          <template slot="order" slot-scope="scope">
            <el-tag size="mini" type v-if="scope.row.cat_level === 0">一级</el-tag>
            <el-tag size="mini" type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
            <el-tag size="mini" type="warning" v-else>三级</el-tag>
          </template>
          <template slot="opt" slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
          </template>
        </tree-table>
      </div>

      <div class="cate-page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="querInfo.pagenum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="querInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      querInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5,
      },
      cateList: [],
      total: 0,
      columns: [
        {
          lable: "分类名称",
          prop: "cat_name",
        },
        {
          label: "是否有效",
          type: "template",
          template: "isok",
        },
        {
          label: "排序",
          type: "template",
          template: "order",
        },
        {
          label: "操作",
          type: "template",
          template: "opt",
        },
      ],
      loading: false,
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    async getCateList() {
      this.loading = true;
      const { data: res } = await this.$http.get("categories", {
        params: this.querInfo,
      });
      if (res.meta.status !== 200) {
        return this.$message.error("获取商品分类列表失败!");
      }
      this.cateList = res.data.result;
      this.total = res.data.total;
       this.loading = false;
    },
    handleSizeChange(pagesize) {
      this.querInfo.pagesize = pagesize;
      this.getCateList();
    },
    handleCurrentChange(pagenum) {
      this.querInfo.pagenum = pagenum;
      this.getCateList();
    },
  },
};
</script>
<style lang="less" scoped>
.mtop {
  margin-top: 15px;
}
.cate-page {
  display: flex;
  justify-content: center;
}
</style>