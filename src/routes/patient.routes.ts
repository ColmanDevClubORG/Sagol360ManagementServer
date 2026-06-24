import { Router } from 'express';
import { getPatientByPatientId } from '../controllers/patient/patient.controller';
import { authenticate } from '@/auth/authenticate';

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /api/patients/{patientId}:
 *   get:
 *     summary: Returns patient details by patientId
 *     description: Returns patient data using the patient's patientId identifier.
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^\d+$'
 *         description: The patient's patientId
 *     responses:
 *       200:
 *         description: Patient found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 patientId:
 *                   type: string
 *                   example: "1622017"
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
 *                 - patientId
 *                 - firstName
 *                 - totalProtocolTreatments
 *                 - currentTreatmentNumber
 *       400:
 *         description: Invalid patientId format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: patientId must be a string containing only digits
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
router.get('/:patientId', getPatientByPatientId);

export default router;
