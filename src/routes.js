const express = require('express');
const {
  verifyAccessToken,
  authByAdmin,
  authByRoles,
} = require('@luikingkit/auth-simplified');
const { proxyToDomain } = require('./middleware');
const { loginMember, authGuest } = require('./controller');
const ROLES = require('./roles');

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

const proxy = proxyToDomain('https://jsonplaceholder.typicode.com');

router.post('/api/auth/members/login', loginMember);
router.post('/api/auth/guest', authGuest);

// admin, member, guest can read posts
const getPostRouter = express.Router();
getPostRouter.use(
  verifyAccessToken,
  authByRoles([ROLES.GUEST, ROLES.MEMBER]),
  proxy,
);
router.get('/api/posts', getPostRouter);
router.get('/api/posts/:postId', getPostRouter);

// admin, member can create, edit, delete posts
const postRouter = express.Router();
postRouter.use(verifyAccessToken, authByRoles([ROLES.MEMBER]), proxy);
router.use('/api/posts', postRouter);
router.use('/api/posts/:postId', postRouter);

// the others are admin only, like users resource
router.use('/api', verifyAccessToken, authByAdmin, proxy);

module.exports = router;
