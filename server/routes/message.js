const { Router } = require('express');
const { createMessage, getMessages } = require('../controller/messages');

const router = Router({ mergeParams: true });

router.route('/').post(createMessage).get(getMessages);

module.exports = router;
