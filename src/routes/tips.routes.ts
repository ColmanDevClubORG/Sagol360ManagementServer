import { Router } from 'express';
import { getTip } from '../controllers/tips.controller';

const router = Router();

/**
 * @swagger
 * /api/tips:
 *   get:
 *     summary: Returns a daily health tip
 *     description: Returns a personalized health tip based on the patient's treatment progress.
 *     parameters:
 *       - in: query
 *         name: totalProtocolTreatments
 *         required: true
 *         schema:
 *           type: integer
 *           example: 60
 *         description: Total number of treatments in the protocol
 *       - in: query
 *         name: currentTreatmentNumber
 *         required: true
 *         schema:
 *           type: integer
 *           example: 30
 *         description: The current treatment number the patient is on
 *     responses:
 *       200:
 *         description: A daily health tip
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tip:
 *                   type: string
 *                   example: "נוזלים, נוזלים, נוזלים. הטיפול בתא הלחץ יכול לייבש - הקפידו לשתות מים לפני ואחרי הטיפול."
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
 *                 tip:
 *                   type: string
 *                   example: "יש להקפיד על שתיית מים בכמות מספקת"
 */

router.get('/', getTip);

export default router;
