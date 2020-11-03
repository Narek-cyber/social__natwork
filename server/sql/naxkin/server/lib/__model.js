const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'social_narek'
});

connection.connect();

module.exports = {
   getData: function(table) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM ' + table, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    },

    removeMany: function(id, myID) {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM friends 
                              WHERE (user1=${id} AND user2=${myID}) 
                              OR 
                              (user1=${myID} AND user2=${id})`, 
            (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    },
    
    getMessages:function(user1, user2){
        return new Promise((resolve, reject)=>{
            let hraman = `SELECT  chat.*,(
                                SELECT users.photo FROM users WHERE id = ${user1}
                            ) AS 'user1_photo', (
                                SELECT users.photo FROM users WHERE id = ${user2}
                            ) AS 'user2_photo' FROM chat 
                            WHERE (user1 = ${user1} AND user2 = ${user2})  
                            OR
                            (user1 = ${user2} AND user2 = ${user1})
                        `
                        connection.query(hraman, (err, data) => {
                            if (err) reject(err);
                            resolve(data);
                        });
        })
    },

    getCommentMessages:function(user1, user2, post_id){
        return new Promise((resolve, reject)=>{
            let hraman = `SELECT  * FROM comments 
                            WHERE (
                                user1=${user1} 
                                AND 
                                user2=${user2} 
                                AND
                                post_id=${post_id}
                            )
                                OR 
                            (
                                user1=${user2} 
                                AND
                                user2=${user1} 
                                AND
                                post_id=${post_id}
                            )
                                OR 
                            (
                                user1=user2
                                AND
                                post_id=${post_id}
                            )
                        `
                        connection.query(hraman, (err, data) => {
                            if (err) reject(err);
                            resolve(data);
                        });
        })
    },

    getOtherMessages:function(user1, user2, post_id){
        return new Promise((resolve, reject)=>{
            let hraman = `SELECT  * FROM comments 
                            WHERE (
                                user1=${user1} 
                                AND 
                                user2=${user2} 
                                AND
                                post_id=${post_id}
                            )
                                OR 
                            (
                                user1=${user2} 
                                AND
                                user2=${user1} 
                                AND
                                post_id=${post_id}
                            )
                                OR 
                            (
                                user1=user2
                                AND
                                post_id=${post_id}
                            )
                        `
                        connection.query(hraman, (err, data) => {
                            if (err) reject(err);
                            resolve(data);
                        });
        })
    },

    async findUsers(text, mytoken){
        return new Promise(async (resolve, reject)=>{
            let command = `SELECT * FROM users WHERE name LIKE '${text}%'`;

            let myData = await this.findAll("users", { token: mytoken })
            if (myData.length > 0) {
                myData = myData[0].id;
            }

            connection.query(command, async (err, data) => {
                if(err) reject(err);
                for (let i = 0; i < data.length; i++) {
                    delete data[i].password;
                    delete data[i].login;
                    delete data[i].token;
                    data[i].isRequestSent = await this.findAll("requests", { user1: myData, user2: data[i].id });
                    data[i].areWeFriends = await this.findAreFriends(myData, data[i].id);
                }
                resolve(data);
            })
        })
    },

    findAreFriends(myId, id){
        return new Promise(async (resolve, reject)=>{
            let command = `
                            SELECT count(*) AS 'qanak' 
                            FROM friends
                            WHERE (user1 = '${myId}' AND user2 = '${id}') 
                            OR (user2 = '${myId}' AND user1 = '${id}')`;

            connection.query(command, async (err, data) => {
                if(err) reject(err);               
                resolve(data);
            })
        })
    },

    findRequests(id){
        // console.log("ID", id);
        return new Promise((resolve, reject) => {
            let command = `
                            SELECT * FROM users 
                            WHERE id IN (
                                SELECT user1 FROM requests 
                                WHERE user2 = '${id}'
                            )
                        `;
            connection.query(command, (err, data) => {
                if(err) reject(err);
                resolve(data);
            })
        })
    },

    findFriends(id){
        return new Promise((resolve, reject)=>{
            let command = `
                            SELECT * FROM users 
                            WHERE id IN (
                                SELECT user1 FROM friends 
                                WHERE user2 = '${id}'
                                UNION
                                SELECT user2 FROM friends
                                WHERE user1 = '${id}'
                            )
                        `;
            connection.query(command, (err, data) => {
                if(err) reject(err);
                resolve(data);
            })
        })
    },

    findAll(table, obj){
        return new Promise((resolve, reject) => {
            let command = `SELECT * FROM ${table} WHERE `
            for(let key in obj){
                command += `${key} = '${obj[key]}' AND `
            }
            command = command.substring(0, command.length-4)
            
            connection.query(command, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    },

    findAllUsers(table, obj) {
        return new Promise((resolve, reject)=>{
            let command = `SELECT * FROM ${table} WHERE type = ${obj}`;

            connection.query(command, (err, data) => {
                if(err) reject(err);
                for (let i = 0; i < data.length; i++) {
                    delete data[i].password;
                    delete data[i].login;
                    delete data[i].token;
                }
                resolve(data);
            })
        })
    },

    add: function(table, obj) {
        return new Promise((resolve, reject) => {
            let h = 'INSERT INTO ' + table + '('
            for (let key in obj) {
                h += key + ','
            }
            h = h.substring(0, h.length - 1) + ')'

            h += ' VALUES('   
            for (let key in obj) {
                h += `'${obj[key]}',`
            }
            h = h.substring(0, h.length - 1) + ')';

            connection.query(h, (err, data) => {
                if(err) reject(err);    
                resolve(data);
            });
        });
    },

    remove: function(table, obj) {
        return new Promise((resolve, reject) => {
            let d = 'DELETE FROM ' + table
            d += ' WHERE'
            for (let key in obj) {
                d += ` ${key} = '${obj[key]}' AND `
            }
            d = d.substring(0, d.length - 4);
            connection.query(d, (err, data) => {
                if (err) reject(err);   
                resolve(data);
            })
        })
    },

    update: function (table, obj, obj1) {
        return new Promise((resolve, reject) => {
            let query = 'UPDATE ' + table
            query += ' SET'
            for (let key1 in obj1) {
                query += ` ${key1} = '${obj1[key1]}',`
            }
            query = query.substring(0, query.length - 1);

            query += ' WHERE'
            for (let key in obj) {
                query += ` ${key} = '${obj[key]}' AND `
            }
            query = query.substring(0, query.length - 4);
            
            connection.query(query, (err, data) => {
                if (err) reject(err);  
                resolve(data);
            });
        });
    },

    emailCheck: function(obj, obj1) {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT login FROM users WHERE login='${obj1}'`, (err, data) => {
                if (err) reject(err);
                else {
                    if (data.length > 0) {
                        reject(new Error('Լոգինը զբաղված է'));
                    } else {
                        connection.query(`
                                            INSERT INTO 
                                            users (
                                                login, 
                                                password, 
                                                name, 
                                                surname
                                            ) 
                                            VALUES (
                                                '${obj.login}', 
                                                '${obj.password}', 
                                                '${obj.name}', 
                                                '${obj.surname}
                                                '
                                            )`, (err, data) => {
                            if (err) reject(err);
                            resolve(data);
                        });
                    }
                }  
            });
        });
    }
}



