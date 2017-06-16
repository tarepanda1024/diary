/**
 * Created by lxd on 2017/5/28.
 */

const nedb = require('nedb');
// 实例化连接对象（不带参数默认为内存数据库）
const db = new nedb({
    filename: 'data/diary.db',
    autoload: true
});

export default db;
