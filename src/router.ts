import exp from 'constants'
import {Router} from 'express'
import { body } from 'express-validator'
import { handleInputErrors } from './modules/middleware'
import { createProduct, getProduct , getProducts, deleteProduct} from './handlers/product'
import { deleteUpdate, getUpdate, getUpdates, updateUpdate } from './handlers/update'

const router = Router()

/***
 * Product routes
 */
router.get('/product', getProducts)
router.get('/product/:id', getProduct)
router.put('/product/:id', body('name').isString(), handleInputErrors, (req, res) => {
  
})
router.post('/product', body('name').isString(), handleInputErrors, createProduct)
router.delete('/product/:id', deleteProduct)


/***
 * Update routes
 */
router.get('/update', getUpdates)
router.get('/update/:id', getUpdate)
router.put('/update/:id', 
  body('title').optional(),
  body('body').optional(),
  body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
  body('version').optional(),
  updateUpdate
)
router.post('/update',
  body('title').exists().isString(),
  body('body').exists().isString(),
  body('productId').exists().isString(),
  
)
router.delete('/update/:id',deleteUpdate)


/**
 * Update Point
 */

router.get('/updatepoint', () => {})
router.get('/updatepoint/:id', () => {})
router.put('/updatepoint/:id', 
  body('name').optional().isString(), 
  body('description').optional().isString(),
  () => {}
)
router.post('/updatepoint', 
  body('name').isString(), 
  body('description').isString(),
  body('updateId').exists().isString(),
  () => {}
)
router.delete('/updatepoint/:id', () => {})

export default router