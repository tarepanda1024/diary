<template>
    <section class="editor-container">
        <el-row>
            <el-col :span="8" class="grid-content">

            </el-col>
            <el-col :span="8" class="grid-content" style="font-size: 24px">
                {{title}}
            </el-col>
            <el-col :span="8" class="grid-content" >
                {{weather}}  {{time}}
            </el-col>
        </el-row>
        <div class="html ql-editor" v-html="content"></div>
    </section>

</template>

<script>
    import db from '../Service/DBService';

    export default {
        data () {
            return {
                id:0,
                content:'',
                title:'',
                weather:'',
                time:''
            }
        },
        methods : {
            loadDiary:function () {
                db.findOne({
                    _id:this.id,
                }, (err, ret) => {
                    if(ret){
                        this.content = ret.content;
                        this.title = ret.title;
                        this.weather = ret.weather;
                        this.time = ret.time;
                    }

                });
            },
        },
        mounted() {
            this.id=parseInt(this.$route.params.id);
            this.loadDiary();
        }
    }
</script>

<style>
    .editor-container {
        width: 100%;
        height: 100%;
    }

    .grid-content {
        min-height: 36px;
        margin-top: 8px;
    }
    .ql-container .ql-editor {
        min-height: 20em;
        padding-bottom: 1em;
    }
    .html {
        overflow-y: auto;
        resize: vertical;
    }
</style>
