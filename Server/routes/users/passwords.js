const express= require('express')

const {recoverPasswordCtrl, resetCtrl, resetPasswordCtrl}= require('../../controllers/users/passwords')

const passRoutes=express.Router()

passRoutes.get('/reset/:token', resetCtrl);
passRoutes.post('/reset/:token', resetPasswordCtrl)
passRoutes.post('/recover', recoverPasswordCtrl)

module.exports = passRoutes

