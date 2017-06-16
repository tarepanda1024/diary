<template>
    <section class="editor-container">
        <el-col :span="24">
            <el-form :inline="true" style="margin-top: 1em;margin-left: 2em">
                <el-form-item label="日期">
                    <el-date-picker
                            v-model="diaryTime"
                            type="datetime"
                            format="yyyy-MM-dd HH:mm:ss"
                            @change="loadDiary()"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="标题">
                    <el-input  v-model="title"></el-input>
                </el-form-item>
                <el-form-item label="天气">
                    <el-input  v-model="weather"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" @click="save()">保存</el-button>
                </el-form-item>

                <el-form-item >
                    <el-button type="danger" >丢弃</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <quill-editor v-model="content"
                      ref="myQuillEditor"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)" class="editor" >
        </quill-editor>
    </section>

</template>

<script>
    import Quill from 'quill'
    import { ImageImport } from '../modules/ImageImport.js'
    import { ImageResize } from '../modules/ImageResize.js'
    Quill.register('modules/imageImport', ImageImport)
    Quill.register('modules/imageResize', ImageResize)
    import db from '../Service/DBService';

    export default {
        data () {
            return {
                diaryTime:new Date(),
                isEdit:false,
                title:'',
                weather:'',
                content: '',
                editorOption: {
                    modules: {
                        imageImport: true,
                        imageResize: {
                            displaySize: true
                        }
                    }
                }
            }
        },
        methods: {
            loadDiary:function () {
                db.findOne({
                    _id:Date.parse(this.diaryTime.toLocaleDateString()),
                }, (err, ret) => {
                    if(ret){
                        this.content=ret.content;
                        this.title =ret.title;
                        this.weather = ret.weather;
                        this.isEdit = true;
                    }else{
                        this.content='';
                        this.title ='';
                        this.weather = '';
                        this.isEdit = false;
                    }

                });
            },
            onEditorBlur(editor) {
            },
            onEditorFocus(editor) {
            },
            onEditorReady(editor) {
            },
            save(){
                var id = Date.parse(this.diaryTime.toLocaleDateString());
                if(this.isEdit){
                    db.update({
                        _id: id
                    }, {
                        $set: {
                            title:this.title,
                            weather:this.weather,
                            content: this.content
                        }
                    }, (err, ret) => {
                        if(!err){
                            console.log("保存成功")
                            this.$message({
                                message: '更新成功',
                                type: 'success'
                            });
                        }
                    });
                }else{
                    db.insert({
                        _id:id,
                        title:this.title,
                        time:this.diaryTime.toLocaleString(),
                        weather:this.weather,
                        content:this.content
                    }, (err, ret) => {
                        if(err){
                            console.log(err);
                        }else{
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                            this.isEdit = true;
                        }
                    });
                }


            }
        },
        // get the current quill instace object.
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill
            }
        },
        mounted() {
          this.loadDiary();
        }
    }
</script>

<style>
    .editor-container {
        width: 100%;
        height: 90%;
    }

    .editor {
        width: 100%;
        height: 100%;
        overflow-y: hidden;
        border: 1px solid #ccc;
        border-top: none;
        resize: vertical;


        box-sizing: border-box;
        cursor: text;
        line-height: 1.42;
        outline: none;

        tab-size: 4;
        -moz-tab-size: 4;
        text-align: left;
        white-space: pre-wrap;
        word-wrap: break-word;
    }

</style>