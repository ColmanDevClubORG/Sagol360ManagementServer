import { Router } from 'express';
import { getAllAppointments, getNextAppointment } from '@/controllers/appointments.controller';
import { authenticate } from '@/auth/authenticate';

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /api/appointment/nextAppointment:
 *   get:
 *     summary: Get the next upcoming appointment for a patient
 *     tags:
 *       - Appointments
 *     parameters:
 *       - in: query
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         example: "1622017"
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         example: "2026-04-13"
 *     responses:
 *       200:
 *         description: The next appointment for the patient
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 appointmentId:
 *                   type: string
 *                   example: "A-1001"
 *                 patientId:
 *                   type: string
 *                   example: "1622017"
 *                 date:
 *                   type: string
 *                   format: date
 *                   example: "2026-04-13"
 *                 time:
 *                   type: string
 *                   example: "09:30"
 *                 chamber:
 *                   type: string
 *                   example: "Red"
 *                 chairNumber:
 *                   type: integer
 *                   example: 9
 *                 treatmentNumber:
 *                   type: integer
 *                   example: 2
 *                 status:
 *                   type: string
 *                   example: "confirmed"
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
router.get('/nextAppointment', getNextAppointment);

/**
 * @swagger
 * /api/appointment/Appointments:
 *   get:
 *     summary: Get all appointments for a patient
 *     tags:
 *       - Appointments
 *     parameters:
 *       - in: query
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         example: "1622017"
 *     responses:
 *       200:
 *         description: List of all appointments for the patient
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   appointmentId:
 *                     type: string
 *                     example: "A-1001"
 *                   patientId:
 *                     type: string
 *                     example: "1622017"
 *                   date:
 *                     type: string
 *                     format: date
 *                     example: "2026-04-13"
 *                   time:
 *                     type: string
 *                     example: "09:30"
 *                   chamber:
 *                     type: string
 *                     example: "Red"
 *                   chairNumber:
 *                     type: integer
 *                     example: 9
 *                   treatmentNumber:
 *                     type: integer
 *                     example: 2
 *                   status:
 *                     type: string
 *                     example: "confirmed"
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
router.get('/Appointments', getAllAppointments);

export default router;
