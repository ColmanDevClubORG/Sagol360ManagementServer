import { sendEmail } from '@/controllers/email/email.controller';
import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * /api/email:
 *   post:
 *     summary: Send an email
 *     description: Sends an attendance update email according to the provided email type and payload.
 *     tags:
 *       - Email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - emailType
 *               - email
 *               - payload
 *             properties:
 *               emailType:
 *                 type: string
 *                 enum:
 *                   - ATTENDANCE_UPDATE
 *                 example: ATTENDANCE_UPDATE
 *               email:
 *                 type: string
 *                 format: email
 *                 example: secretary@example.com
 *               payload:
 *                 type: object
 *                 required:
 *                   - patientName
 *                   - patientNumber
 *                   - attendanceStatus
 *                   - time
 *                   - cell
 *                   - building
 *                 properties:
 *                   patientName:
 *                     type: string
 *                     example: ישראל ישראלי
 *                   patientNumber:
 *                     type: string
 *                     example: "123456"
 *                   attendanceStatus:
 *                     type: string
 *                     enum:
 *                       - COMING
 *                       - NOT_COMING
 *                     example: NOT_COMING
 *                   time:
 *                     type: string
 *                     example: "18:00"
 *                   cell:
 *                     type: string
 *                     example: כתום
 *                   building:
 *                     type: string
 *                     example: אריסון
 *     responses:
 *       200:
 *         description: Email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email sent successfully
 *       400:
 *         description: Invalid email data or unsupported email type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid email data
 *       500:
 *         description: Email was not sent or server email configuration is missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email was not sent
 */
router.post('/', sendEmail);

export default router;
