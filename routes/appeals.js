const controller = require('../controllers/appeals');
const router = require('express').Router();

router.post('/appeal', controller.createAppel);
router.put('/appeal/take/:id', controller.takeAppeal);
router.put('/appeal/resolve/:id', controller.resolveAppeal);
router.put('/appeal/reject/:id', controller.rejectAppeal);
router.get('/appeal/find', controller.findAppealsByDate);
router.put('/appeal/rejectAll', controller.rejectAppeals);

module.exports = router;