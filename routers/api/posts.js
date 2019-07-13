//@게시글은 뭘 하든 마찬가지고, 링크로 연동을 시키거나 하면 되기 때문에 별다를 것 없음

const express = require('express');
const router = express.Router();


//@router GET api/posts/test
//@desc Tests post route
//@access Public


router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }));


module.exports = router; 