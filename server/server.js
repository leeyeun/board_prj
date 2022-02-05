const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./config/db');
const PORT = process.env.port || 8000;
const path = require('path');
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const multer = require('multer');
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'upload/');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext);
    },
})
const upload = multer({ storage: storage })

//const upload = multer({ dest: './upload' });

app.use('/image', express.static('upload/'));

//글쓰기
app.post("/board/write", upload.single('image'), (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const userName = req.body.userName;
    const cateName = req.body.cateName;
    console.log('??title', req.body.title)
    // const filename = req.file.filename;
    //console.log('@@@@@@', res);
    console.log('!!!file', req.file);
    // console.log(req.file.filename);
    const image = 'http://localhost:8000/image/' + req.file.filename;
    const sqlQuery = "INSERT INTO board (title, content, userName, image, datetime, cateName) VALUES (?, ?, ?, ?, now(),?)";
    db.query(sqlQuery, [title, content, userName, image, cateName], (err, result) => {
        if (err) {
            console.log(`upload.single error: ${err}`);
            return res.sendStatus(500);
        } else {
            res.send('success!');
        }
    })
});

//글 목록
app.get("/board/list", (req, res) => {
    const sqlQuery = "SELECT * FROM board ORDER BY id DESC;";
    db.query(sqlQuery, (err, result) => {
        res.send(result);
    })
});
app.get("/board/list/:username", (req, res) => {
    const params = [req.params.username];
    const sqlQuery = "SELECT * FROM board where username = ? ORDER BY id DESC;";
    db.query(sqlQuery, params, (err, rows, result) => {
        res.send(rows)
    })
});

//상세글
app.get("/board/post/:id", (req, res) => {
    //const id = req.body.id;
    const sqlQuery = "SELECT * FROM board WHERE id = ?";
    const params = [req.params.id];
    db.query(sqlQuery, params, (err, rows, fields) => {
        res.send(rows)
    })
});

//좋아요
app.post("/board/post/heart/plus/:id", (req, res) => {
    const sqlQuery = "update board set likes = likes + 1 where id = ?;"
    const id = req.body.id;
    const likes = req.body.likes;
    db.query(sqlQuery, [id, likes], (err, rows, fields) => {
        res.send(rows)
    })
})
app.post("/board/post/heart/:id", (req, res) => {
    const sqlQuery = "update board set likes = likes - 1 where id = ?;"
    const id = req.body.id;
    const likes = req.body.likes;
    db.query(sqlQuery, [id, likes], (err, rows, fields) => {
        res.send(rows)
    })
})

app.get("/heart/:boardId", (req, res) => {
    const sqlQuery = 'SELECT * FROM likes WHERE boardId = ?'
    const params = req.params.boardId;
    db.query(sqlQuery, params, (err, rows, result) => {
        res.send(rows)
    })
})
//boardId 별 like 갯수
app.get('/heart/cnt/:boardId', (req, res) => {
    const sqlQuery = 'SELECT count(boardId) as cnt FROM likes WHERE like_cnt = 1 and boardId = ?'
    const params = req.params.boardId;
    db.query(sqlQuery, params, (err, rows, fields) => {
        res.send(rows)
    })
})
app.post("/heart", (req, res) => {
    const sqlQuery = 'INSERT INTO likes (boardId, userName, like_cnt) VALUES (?,?,?)'
    const boardId = req.body.boardId;
    const userName = req.body.userName;
    const like_cnt = req.body.like_cnt;
    db.query(sqlQuery, [boardId, userName, like_cnt], (err, result) => {
        res.send('success!!!');
    })
})
app.post('/heart/plus/:boardId', (req, res) => {
    const sqlQuery = 'update likes set like_cnt = 1 where boardId = ?'
    const boardId = req.body.boardId;
    const like_cnt = req.body.like_cnt;
    db.query(sqlQuery, [boardId, like_cnt], (err, result) => {
        res.send('success!!!');
    })
})
app.post('/heart/minus/:boardId', (req, res) => {
    const sqlQuery = 'update likes set like_cnt = 0 where boardId = ?'
    const boardId = req.body.boardId;
    const like_cnt = req.body.like_cnt;
    db.query(sqlQuery, [boardId, like_cnt], (err, result) => {
        res.send('success!!!');
    })
})
//조회수
app.post("/board/post/view/:id", (req, res) => {
    const sqlQuery = "update board set view_cnt = view_cnt + 1 where id = ?;"
    const id = req.body.id;
    const view_cnt = req.body.view_cnt;
    db.query(sqlQuery, [id, view_cnt], (err, rows, fields) => {
        res.send(rows)
    })
})

app.use('/board/update/:id', upload.single('image'), (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const content = req.body.content;
    console.log('!!!!', req.file);
    console.log('@@@@', req.file.filename);
    const image = 'http://localhost:8000/image/' + req.file.filename;
    if (title == '') {
        const sqlQuery2 = "UPDATE board SET content = ?, image = ?, datetime = now() WHERE id = ?";
        db.query(sqlQuery2, [content, image, id], (err, rows, fields) => {
            res.send(rows)
        })
    } else if (content === '') {
        const sqlQuery3 = "UPDATE board SET title = ?, image = ?, datetime = now() WHERE id = ?";
        db.query(sqlQuery3, [title, image, id], (err, rows, fields) => {
            res.send(rows)
        })
    } else if (req.file.filename === undefined) {
        console.log('!!');
        const sqlQuery4 = "UPDATE board SET title = ?, content = ?, datetime = now() WHERE id = ?";
        db.query(sqlQuery4, [title, content, id], (err, rows, fields) => {
            res.send(rows)
        })
    } else if (title === '' && content === '') {
        const sqlQuery5 = "UPDATE board SET image = ?, datetime = now() WHERE id = ?";
        db.query(sqlQuery5, [image, id], (err, rows, fields) => {
            res.send(rows)
        })
    } else if (title === '' && image === '') {
        const sqlQuery6 = "UPDATE board SET content = ?, datetime = now() WHERE id = ?";
        db.query(sqlQuery6, [content, id], (err, rows, fields) => {
            res.send(rows)
        })
    } else if (content === '' && image === '') {
        const sqlQuery7 = "UPDATE board SET title = ?, datetime = now() WHERE id = ?";
        db.query(sqlQuery7, [title, id], (err, rows, fields) => {
            res.send(rows)
        })
    } else {
        const sqlQuery = "UPDATE board SET title = ?, content = ?, image = ?, datetime = now() WHERE id = ?";
        db.query(sqlQuery, [title, content, image, id], (err, rows, fields) => {
            res.send(rows)
        })
    }
});

//글삭제
app.post('/board/post/:id', (req, res) => {
    const sqlQuery = "DELETE FROM board WHERE id= ?";
    const params = [req.params.id];
    db.query(sqlQuery, params, (err, rows, fields) => {
        res.send(rows);
    })
});
//board.id.user
app.get('/board/comment/:id', (req, res) => {
    const sqlQuery = "SELECT usename FROM board WHERE id = ?";
    const id = req.body.id;
    const usename = req.body.usename;
    const params = [usename, id];

    db.query(sqlQuery, params, (err, result) => {
        res.send(result);
    })
})
app.get("/board/cnt", (req, res) => {
    //const id = req.body.id;
    const sqlQuery = "select count(id) as cnt from board";
    const params = [req.params.id];
    db.query(sqlQuery, params, (err, rows, fields) => {
        res.send(rows)
    })
});
//댓글 생성
app.post("/post/comment", (req, res) => {
    const comment = req.body.comment;
    const userId = req.body.userId;
    const boardId = req.body.boardId;
    const sqlQuery = "INSERT INTO board_comment (comment, userId, boardId, datetime) VALUES (?, ?, ?, now())";
    db.query(sqlQuery, [comment, userId, boardId], (err, result) => {
        res.send('success!!!');
    })
})
app.get('/comment/mypage/:userId', (req, res) => {
    const sqlQuery = "SELECT * FROM board_comment WHERE userId = ?";
    const userId = req.body.userId;
    db.query(sqlQuery, [userId], (err, result) => {
        res.send(result);
    })
})
//댓글 목록 
app.get("/comment/:userId", (req, res) => {
    const sqlQuery = "SELECT * FROM board_comment WHERE userId = ? order by comId desc";
    const userId = req.body.userId;
    const params = req.params.userId;
    db.query(sqlQuery, params, (err, result) => {
        res.send(result);
    })
});
app.get("/comment/list/:boardId", (req, res) => {
    const sqlQuery = "SELECT * FROM board_comment WHERE boardId = ?";
    const params = [req.params.boardId];
    db.query(sqlQuery, params, (err, result) => {
        res.send(result);
    })
});
//댓글 수
app.get("/comment/post/view/:boardId", (req, res) => {
    //const id = req.body.id;
    const sqlQuery = "select count(boardId) as cntview from board_comment where boardId = ?;";
    const params = [req.params.boardId];
    db.query(sqlQuery, params, (err, rows, fields) => {
        res.send(rows)
    })
});
//댓글 하나씪 목록 
app.get("/comment/modify", (req, res) => {
    const sqlQuery = "SELECT * FROM board_comment WHERE comId = ?";
    const params = [req.params.comId];
    db.query(sqlQuery, params, (err, result, fields) => {
        res.send(result);
    })
});
//댓글 수정
app.post('/comment/modify/:comId', (req, res) => {
    const sqlQuery = "UPDATE board_comment SET comment = ? WHERE comId = ?";
    const comment = req.body.comment;
    const comId = req.body.comId;
    db.query(sqlQuery, [comment, comId], (err, rows, fields) => {
        res.send(rows);
    })
})
//댓글 삭제
app.post('/comment/:comId', (req, res) => {
    const params = [req.body.comId];
    const sqlQuery = "DELETE FROM board_comment WHERE comId = ?"
    db.query(sqlQuery, params, (err, result) => {
        res.send(result);
    })
})

//카테고리
app.get('/category', (req, res) => {
    const sqlQuery = "SELECT * FROM category";
    db.query(sqlQuery, (err, result) => {
        res.send(result);
    })
});
app.get("/category/:cateId", (req, res) => {
    const params = [req.params.cateId];
    const sqlQuery = "SELECT * FROM category WHERE cateId = ?";
    db.query(sqlQuery, params, (err, result, fields) => {
        res.send(result);
    })
});
//카테고리 번호별 게시물 불러오기
app.get("/cate/:cateName", (req, res) => {
    const params = [req.params.cateName];
    const sqlQuery = "SELECT * FROM board WHERE cateName = ? order by id desc";
    db.query(sqlQuery, params, (err, result, fields) => {
        res.send(result);
    })
})
app.get("/cate/cateCnt/:cateName", (req, res) => {
    //const id = req.body.id;
    const sqlQuery = "select count(cateName) as cateCnt from board where cateName = ?;";
    const params = [req.params.cateName];
    db.query(sqlQuery, params, (err, rows, fields) => {
        res.send(rows)
    })
});
//카테고리 추가
app.post('/category/add', (req, res) => {
    const cateName = req.body.cateName;
    const sqlQuery = "INSERT INTO category (cateName) VALUES (?)";
    db.query(sqlQuery, [cateName], (err, result) => {
        res.send('success!');
    })
})
//카테고리 삭제
app.post('/category/:cateId', (req, res) => {
    const sqlQuery = "DELETE FROM category WHERE cateId= ?";
    const params = [req.params.cateId];
    db.query(sqlQuery, params, (err, rows, fields) => {
        res.send(rows);
    })
});
//카테고리 수정
app.post('/category/modify/:cateId', (req, res) => {
    const sqlQuery = "UPDATE category SET cateName = ? WHERE cateId = ?";
    const cateName = req.body.cateName;
    const cateId = req.body.cateId;
    db.query(sqlQuery, [cateName, cateId], (err, rows, fields) => {
        res.send(rows);
    })
})

//검색
// app.post('/post/search', (req, res) => {
//     const sqlQuery = "SELECT * FROM board WHERE title like %?%";
//     const title = req.body.title;
//     db.query(sqlQuery, [title], (err, rows, fields) => {
//         res.send(rows);
//     })
// });
//로그인
app.get("/login", (req, res) => {
    res.send({ data: 'data' })
})
app.post("/onlogin", (req, res) => {
    // console.log(`= = = > req : ${util.inspect(req)}`)

    const userId = req.query.userId;
    const userPw = req.query.userPw;
    // 입력된 id 와 동일한 id 가 mysql 에 있는 지 확인
    const sql1 = 'SELECT COUNT(*) AS result FROM user WHERE userId = ?'
    db.query(sql1, userId, (err, data) => {
        if (!err) {
            // 결과값이 1보다 작다면(동일한 id 가 없다면)
            if (data[0].result < 1) {
                res.send({ 'msg': '입력하신 id 가 일치하지 않습니다.' })
            } else { // 동일한 id 가 있으면 비밀번호 일치 확인
                const sql2 = `SELECT 
                                CASE (SELECT COUNT(*) FROM user WHERE userId = ? AND userPw = ?)
                                    WHEN '0' THEN NULL
                                    ELSE (SELECT userId FROM user WHERE userId = ? AND userPw = ?)
                                END AS userId
                                , CASE (SELECT COUNT(*) FROM user WHERE userId = ? AND userPw = ?)
                                    WHEN '0' THEN NULL
                                    ELSE (SELECT userPw FROM user WHERE userId = ? AND userPw = ?)
                                END AS userPw`;
                // sql 란에 필요한 parameter 값을 순서대로 기재
                const params = [userId, userPw, userId, userPw, userId, userPw, userId, userPw]
                db.query(sql2, params, (err, data) => {
                    if (!err) {
                        res.send(data[0])
                    } else {
                        res.send(err)
                    }
                })
            }
        } else {
            res.send(err)
        }
    })
})
//회원가입
app.post("/user/join", (req, res) => {
    const userId = req.body.userId;
    const userPw = req.body.userPw;
    const userName = req.body.userName;
    const userNick = req.body.userNick;
    const userNumber = req.body.userNumber;
    const userEmail = req.body.userEmail;
    const sqlQuery = "INSERT INTO user (userId, userPw, userName, userNick, userNumber, userEmail) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sqlQuery, [userId, userPw, userName, userNick, userNumber, userEmail], (err, result) => {
        res.send('success join!');
    })
});

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
});