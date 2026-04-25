import { Router } from 'express';
import { getPatientBySerializeNumber } from '../controllers/patient/patient.controller';

const router = Router();

/**
 * @swagger
 * /api/patients/{serializeNumber}:
 *   get:
 *     summary: Returns patient details by serializeNumber
 *     description: Returns patient data using the patient's serializeNumber identifier.
 *     parameters:
 *       - in: path
 *         name: serializeNumber
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^\d+$'
 *         description: The patient's serializeNumber
 *     responses:
 *       200:
 *         description: Patient found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 serializeNumber:
 *                   type: number
 *                   example: 1622017
 *                 firstName:
 *                   type: string
 *                   example: "שלמה"
 *                 totalProtocolTreatments:
 *                   type: number
 *                   example: 60
 *                 currentTreatmentNumber:
 *                   type: number
 *                   example: 30
 *               required:
 *                 - serializeNumber
 *                 - firstName
 *                 - totalProtocolTreatments
 *                 - currentTreatmentNumber
 *       400:
 *         description: Invalid serializeNumber format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: serializeNumber must contain only digits
 *       404:
 *         description: Patient not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Patient not found
 */
router.get('/:serializeNumber', getPatientBySerializeNumber);

export default router;
