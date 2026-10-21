const router = require('express').Router();
const c = require('../controllers/userController');
const { basicAuth, requireAdmin, selfOrAdmin } = require('../middleware/auth');
const v = require('../middleware/validate');

router.post('/', v.createRules, c.createUser); // public: register
router.get('/', basicAuth, requireAdmin, v.listRules, c.getUsers);
router.get('/me', basicAuth, (req, res) => res.json({ success: true, data: req.user }));
router.get('/:id', basicAuth, v.idRules, selfOrAdmin, c.getUser);
router.put('/:id', basicAuth, v.updateRules, selfOrAdmin, c.updateUser);
router.delete('/:id', basicAuth, v.idRules, requireAdmin, c.deleteUser);

module.exports = router;
