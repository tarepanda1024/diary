<template>
    <section class="editor-container">

        <el-row type="flex"  justify="center">
            <img :src="logo" style="width: 200px;height: 200px;margin-top: 200px">
        </el-row>
        <el-row type="flex"  justify="center">
            <div style="margin-top: 40px;font-size: 20px">
                共记录{{diaryCount}}篇日记
            </div>

        </el-row>
    </section>

</template>

<script>
    import db from '../Service/DBService';
    import cat from './assets/photo.jpeg'
    export default {
        data () {
            return {
                logo:cat,
                diaryCount:0,
            }
        },
        methods : {
            loadCount:function () {
                db.count({},(err, count) => {
                    this.diaryCount = count;
                });
            },
        },
        mounted() {
            this.loadCount();
        }
    }
</script>

<style>
    .editor-container {
        width: 100%;
        height: 100%;
    }

    .editor {
        width: 100%;
        height: 90%;
    }
</style>