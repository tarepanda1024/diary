<template>
    <el-row class="container">

        <el-row class="header" style="-webkit-app-region: drag">
            <el-col :span="8">
                <span style="letter-spacing:0.3em;color: #fbfdff;position: absolute;left: 20px;top: 16px">甜甜私房猫日记本</span>
            </el-col>
            <el-col :span="16">
                <el-button type="text" class="el-icon-minus" style="color: #f0f0f0;-webkit-app-region:no-drag" id="btn_min" @click="min()"></el-button>
                <el-button type="text" class="el-icon-close" style="color: #f0f0f0;-webkit-app-region:no-drag" id="btn_close" @click="close()"></el-button>
            </el-col>
        </el-row>
        <el-col :span="24" class="main">


            <aside class="nav-menu">
                <!--导航菜单-->
                <el-menu default-active="/main-page" class="el-menu-vertical"
                         unique-opened router v-show="!collapsed">
                    <el-menu-item index="/main-page"><i class="el-icon-menu"></i>主页</el-menu-item>
                    <el-menu-item index="/editor"><i class="el-icon-edit"></i>编辑</el-menu-item>
                    <el-menu-item index="/detail"><i class="el-icon-search"></i>浏览</el-menu-item>
                </el-menu>
                <!--导航菜单-折叠后-->
                <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">

                </ul>
            </aside>
            <section class="content-container">
                <router-view></router-view>

            </section>
        </el-col>
    </el-row>
</template>

<script>
    var ipcRenderer=require('electron').ipcRenderer;
    var isBig=true;//窗口放大还原标示
    export default {
        data() {
            this.$router.push('/main-page');
            return {
                collapsed: false,
            }
        },
        methods: {
            //最小化
            min:function () {
                ipcRenderer.send('hide-window');
            },
            //关闭
            close:function () {
                ipcRenderer.send('window-all-closed');
            },

            //折叠导航栏
            collapse: function () {
                this.collapsed = !this.collapsed;
            },
            showMenu(i, status){
                this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
            }
        },
        mounted() {

        }
    }
</script>

<style>
    #btn_min{
        position: absolute;
        top: 8px;
        right: 60px;
    }
    #btn_close{
        position: absolute;
        top: 8px;
        right: 20px;
    }
    .container {
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 100%;
        overflow-y: hidden;
    }

    .main {
        display: flex;
        width: 100%;
        height: 100%;
    }
    .header{
        height:60px;
        background-color: #58B7FF;
    }
    .nav-menu, .el-menu-vertical {
        flex: 0 0 230px;
        width: 230px;
        height: 100%;

    }

    .content-container {
        flex: 1;
        height: 90%;
    }
</style>