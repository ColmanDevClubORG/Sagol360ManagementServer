import { Router } from 'express';
import { getExample } from '../controllers/example.controller';

const router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Returns an example message
 *     description: Example endpoint to demonstrate MVC structure and Swagger documentation
 *     responses:
 *       200:
 *         description: A successful response with the example message
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Hello Express + TypeScript (MVC Architecture)
 */
router.get('/', getExample);

export default router;
