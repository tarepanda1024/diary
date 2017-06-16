export default [
    {
        path: '/',
        component: require('components/Home'),
        iconCls: 'el-icon-message',//图标样式class
        children: [
            {path: '/main-page', component: require('components/MainPageView/MainPage'), name: '主页'},
            {path: '/editor', component: require('components/EditorView/Editor'), name: '编辑器'},
            {path: '/detail', component: require('components/DetailView/DetailPage'), name: '浏览'},
            {path: '/content/:id', component: require('components/DetailView/Content'), name: '内容'}
        ]
    },
]
