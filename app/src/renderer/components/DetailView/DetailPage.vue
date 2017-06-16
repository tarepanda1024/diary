<template>
    <section class="editor-container">
        <el-row>
            <el-col :span="24">
                <el-form :inline="true" style="margin-top: 1em;margin-left: 2em">
                    <el-form-item label="日期">
                        <el-date-picker
                                v-model="diaryTime"
                                type="datetime"
                                format="yyyy-MM-dd hh:mm:ss"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadDiaryByPage()">搜索</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row>
            <!--列表-->
            <el-table :data="diarys" highlight-current-row v-loading="listLoading" border
                      style="width: 100%;" @row-dblclick="showContent" >
                <el-table-column prop="title" label="标题"  align="center" :formatter="formatTitle">
                </el-table-column>
                <el-table-column prop="time" label="创建时间"  align="center">
                </el-table-column>

            </el-table>

        </el-row>


        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="loadDiaryByPage" :page-size="10"
                           :page-count="total" style="float:right;">
            </el-pagination>
        </el-col>

    </section>

</template>

<script>

    import db from '../Service/DBService';

    export default {
        data () {
            return {
                diaryTime: new Date(),
                title: '',
                weather: '',
                content: '',
                time: '',
                listLoading: false,
                total: 0,
                page:1,
                diarys: [],
            }
        },
        methods: {
            //性别显示转换
            formatSex: function (row, column) {
                return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
            },
            formatTitle: function (row, column) {
                if(row.title==''){
                   row.title="暂无标题";
                }
                return row.title ;
            },
            loadDiaryByPage:function(val){
                db.count({},(err, count) => {
                    var tmp=parseInt(count/10);
                    if(count%10==0){
                        this.total=tmp;
                    }else{
                        this.total=tmp+1;
                    }
                });
                this.listLoading=true;
                this.page = val;
                console.log(this.page);
                db.find({}).skip((this.page-1)*10).limit(10).exec((err, docs) =>  {
                    this.listLoading=false;
                    this.diarys=docs;
                });
            },
            loadDiary:function () {
                db.findOne({
                    _id:Date.parse(this.diaryTime.toLocaleDateString()),
                }, (err, ret) => {

                if(ret){
                    this.content = ret.content;
                    this.title = ret.title;
                    this.weather = ret.weather;
                    this.time = ret.time;
                }

            });
            },
            showContent:function (row, event) {
                console.log('/content/'+row._id);
                this.$router.push('/content/'+row._id);
            }
        },
        // get the current quill instace object.
        computed: {},
        mounted() {
            this.loadDiaryByPage();
        }
    }
</script>

<style>
    .editor-container {
        width: 100%;
        height: 100%;
    }

    .html {
        height: 100%;
        overflow-y: auto;
        border: 1px solid #ccc;
        border-top: none;
        resize: vertical;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
        text-align: center;
    }
</style>