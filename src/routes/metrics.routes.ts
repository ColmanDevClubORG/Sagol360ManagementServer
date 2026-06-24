import { Router } from 'express';
import { SentToday, SubmitReport } from '@/controllers/metrics.controller';

const router = Router();

/**
 * @swagger
 * /api/metrics/today/{patientId}:
 *   get:
 *     summary: Check if a patient has already submitted a metrics report today
 *     tags:
 *       - Metrics
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         example: "1622017"
 *     responses:
 *       200:
 *         description: Boolean indicating whether a report was submitted today
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
 *               example: false
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "something went wrong"
 */
router.get('/today/:patientId', SentToday);

/**
 * @swagger
 * /api/metrics/{patientId}:
 *   post:
 *     summary: Submit a daily metrics report for a patient
 *     tags:
 *       - Metrics
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         example: "1622017"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - energyLevel
 *               - sleepQuality
 *               - painLevel
 *               - concentration
 *               - brainFog
 *               - mood
 *             properties:
 *               energyLevel:
 *                 type: number
 *                 example: 7
 *               sleepQuality:
 *                 type: number
 *                 example: 6
 *               painLevel:
 *                 type: number
 *                 example: 3
 *               concentration:
 *                 type: number
 *                 example: 8
 *               brainFog:
 *                 type: number
 *                 example: 2
 *               mood:
 *                 type: number
 *                 example: 7
 *     responses:
 *       201:
 *         description: Report submitted successfully
 *       409:
 *         description: Report already submitted today
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Report already submitted today"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "something went wrong"
 */
router.post('/:patientId', SubmitReport);

export default router;
