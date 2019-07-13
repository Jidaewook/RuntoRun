//@뭘 만들더라도 회원가입, 로그인 창구는 기본적으로 같다. 
//@회원가입에 필요한 양식(무엇을 물어볼지 정도)
//@직접 등록이 아닌, 등록되어 있는 플랫폼을 걸 수도 있다. 예를 들어, 구글/카카오/네이버/페이스북 정도. 좀 더 트렌디하려면 인스타??

const express = require('express');
const router = express.Router();

const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const passport = require('passport');
const passportConf = require('../../passport');

const {validateBody, schemas} = require('../../helpers/routeHelpers');

// const JWT = require('jsonwebtoken');

//질문사항
//이걸 왜 해야하지? 원래는 컨트롤러에 하게 되어 있긴 한데, 컨트롤러쪽이 잘 이해가 안감

// const {JWT_SECRET} = require('../../config/index');
//Load user Model
const userModel = require('../../models/user');

//@router GET api/users/test
//@desc Tests users route
//@access Public

router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

//@router GET api/users/secret
//@desc ??
//@access Public
//이건 무슨 항목이지? 로그인/개인화면인건 알겠는데, 레지스터/로그인이 따로 있는데 필요한가?

// router.route('/secret')
//     .get(passport.authenticate('jwt', {session: false}), userController.secret);


//@router POST api/users/register
//@desc Register user
//@access Public

router.post('/register', (req, res) => {
    userModel
        .findOne({email: req.body.email})
        .then(user => {
            if(user){
                return res.status(400).json({
                    email: 'Email already exists'
                });
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                });
                const newUser = new userModel({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => res.json(err));
                    })
                })
            }
        })
        .catch(err => console.log(err));
});

//@route POST api/users/login
//@desc Login user / Returning JWT Token
//@access Public

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    //Find user by email
    userModel
        .findOne({email})
        .then(user => {
            if(!user){
                return res.status(400).json({
                    email: 'user not found'
                });

            }
            bcrypt
                .compare(password, user.password)
                .then(isMatch => {
                    if(isMatch){
                        res.json({msg: 'success'})
                    } else{
                        return res.status(404).json({
                            password: 'Password incorrect'
                        });
                    }
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));

});



module.exports = router; 