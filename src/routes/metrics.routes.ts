import { Router } from "express"
import { SentToday, SubmitReport } from "@/controllers/metrics.controller"

const router = Router()


router.get('/today/:patientId', SentToday)
router.post('/:patientId', SubmitReport)
export default router