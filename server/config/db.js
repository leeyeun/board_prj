var mysql = require('mysql');
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '@dldhfsu0109',
    database: 'boardprj',
    dateStrings: 'date'
});

module.exports = db;