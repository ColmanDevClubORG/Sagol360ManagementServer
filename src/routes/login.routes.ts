import { createQR, verifyQR } from '@/controllers/login/login.controller';
import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * /api/login/QR/create:
 *   post:
 *     summary: Create a mock QR login token
 *     tags:
 *       - Login
 *     description: Validates mock login credentials, encodes them into a signed mock token, and returns the token for the frontend QR flow.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - password
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "1622017"
 *                 description: Mock patientId used as the login userId.
 *               password:
 *                 type: string
 *                 example: "123456789"
 *     responses:
 *       200:
 *         description: QR login token created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: mock-token
 *       400:
 *         description: Missing userId or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: userId and password are required
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid userId or password
 */
router.post('/QR/create', createQR);

/**
 * @swagger
 * /api/login/QR/verify:
 *   post:
 *     summary: Verify a mock QR login token
 *     tags:
 *       - Login
 *     description: Decodes the QR token and checks that the credentials still match the mock login user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 example: mock-token
 *     responses:
 *       200:
 *         description: QR login verified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: QR login success
 *                 user:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       example: "1622017"
 *       400:
 *         description: Missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token is required
 *       401:
 *         description: Invalid token or user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid QR token
 */
router.post('/QR/verify', verifyQR);

export default router;
