const express = require('express')
const { createShortId, handleRedirection, getHistory } = require('../controller/urlController')

const router = express.Router()



router.post('/',createShortId)
router.get('/:shortid',handleRedirection)
router.get('/',getHistory)






module.exports = router