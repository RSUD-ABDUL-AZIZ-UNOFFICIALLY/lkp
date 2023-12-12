const express = require('express');
const router = express.Router();
const middleware = require('../middleware/rest');
const { checkHakAkses } = require('../middleware');
const controller = require('../controllers/hardin');

router.post('/daftar/sendOtp', controller.sendOtp);
router.post('/daftar', controller.daftar);
router.post('/login/sendOtp', controller.loginSendOtp);
router.post('/login', controller.login);

router.get('/myfamily', middleware.check, controller.getFamily);
router.get('/family', checkHakAkses('rm'), controller.getFamilys);
router.post('/family', checkHakAkses('rm'), controller.addFamily);
router.get('/rm/user', checkHakAkses('rm'), controller.getUser);
router.get('/rm/pasien', checkHakAkses('rm'), controller.getPasien);
router.get('/rm/pasien/:no_rkm_medis', checkHakAkses('rm'), controller.getPasienDetail);

module.exports = router;