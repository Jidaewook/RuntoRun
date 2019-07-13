//@프로필 등록사항으로 둘 것은, 이름/준비하는 시험/준비기간 정도로 해두자
//@회원가입에 필요한 양식(무엇을 물어볼지 정도)
//@직접 등록이 아닌, 등록되어 있는 플랫폼을 걸 수도 있다. 예를 들어, 구글/카카오/네이버/페이스북 정도. 좀 더 트렌디하려면 인스타??

const express = require('express');
const router = express.Router();


//@router GET api/profile/test
//@desc Tests profile route
//@access Public


router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));


module.exports = router; 