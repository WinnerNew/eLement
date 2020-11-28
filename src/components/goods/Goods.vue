<template>
  <div>
    <!-- 导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 主页面 -->
    <el-card class="box-card">
      <!-- 搜索添加 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入商品名"
            v-model="queryInfo.query"
            clearable
            @clear="getGoodList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getGoodList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button
            type="primary"
            @click="adddialogVisible = !adddialogVisible"
            >添加商品</el-button
          >
        </el-col>
      </el-row>
      <!-- 商品列表 -->
      <el-table :data="goodList" style="width: 100%" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column
          prop="goods_name"
          label="商品名称"
          width="500"
        ></el-table-column>
        <el-table-column
          prop="goods_price"
          label="价格(元)"
          width="60"
        ></el-table-column>
        <el-table-column
          prop="goods_number"
          label="数量"
          width="60"
        ></el-table-column>
        <!-- <el-table-column
          prop="goods_weight"
          label="重量"
          width="60"
        ></el-table-column> -->
        <!-- <el-table-column
          label="热销"
          width="120"
        >
        <template slot-scope="scope">
            <span v-if="scope.row.is_promote" class="el-icon-medal"></span>
        </template>
        </el-table-column> -->
        <el-table-column label="添加时间">
          <template slot-scope="scope">{{
            formatTime(scope.row.add_time, "Y/M/D")
          }}</template>
        </el-table-column>

        <el-table-column label="更新时间">
          <template slot-scope="scope">{{
            formatTime(scope.row.upd_time, "Y/M/D")
          }}</template>
        </el-table-column>

        <el-table-column label="状态" width="80">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.goods_state === 0" type="danger"
              >未通过</el-tag
            >
            <el-tag v-else-if="scope.row.goods_state === 1" type="warning"
              >审核中</el-tag
            >
            <el-tag v-else>已审核</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑商品"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showEditDialog(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除商品"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeUserById(scope.row.id)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页查询 -->
      <div class="user-page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="queryInfo.pagesize"
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
      queryInfo: {
        quary: "",
        // 当前页码
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 10,
      },
      total: 0,
      goodList: [],
    };
  },
  created() {
    this.getGoodList();
  },
  methods: {
    async getGoodList() {
      const { data: res } = await this.$http.get("/goods", {
        params: this.queryInfo,
      });
      if (res.meta.status !== 200) {
        return this.$message.error("获取商品列表失败" + res.meta.msg);
      }
      this.goodList = res.data.goods;
      this.total = res.data.total;
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getGoodList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getGoodList();
    },
    formatTime(number, format) {
      var formateArr = ["Y", "M", "D", "h", "m", "s"];
      var returnArr = [];
      var date = new Date(number * 1000);
      returnArr.push(date.getFullYear());
      returnArr.push(this.formatNumber(date.getMonth() + 1));
      returnArr.push(this.formatNumber(date.getDate()));
      returnArr.push(this.formatNumber(date.getHours()));
      returnArr.push(this.formatNumber(date.getMinutes()));
      returnArr.push(this.formatNumber(date.getSeconds()));
      for (var i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i]);
      }
      return format;
    },
    //数据转化
    formatNumber(n) {
      n = n.toString();
      return n[1] ? n : "0" + n;
    },
  },
};
</script>

<style>
</style>