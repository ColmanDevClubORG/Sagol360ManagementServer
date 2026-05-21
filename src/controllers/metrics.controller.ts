import { Request, Response, NextFunction } from 'express';
import { error } from 'node:console';
import { SentToday as ServiceSentToday,
    SubmitReport as ServiceSubmitReport
 } from '@/services/metrics.service';
import { StatusCodes } from 'http-status-codes';


export const SentToday = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const patientId = req.params.patientId as string
        const sentToday = await ServiceSentToday(patientId)
        res.json(sentToday)
    }catch(error){
        next(error)
    }
}

export const SubmitReport = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const patientId = req.params.patientId as string;
        const metrics = req.body
        const submitReport = await ServiceSubmitReport(patientId, metrics)
        res.status(StatusCodes.CREATED).json(submitReport)
    }catch(error){
        next(error)
    }
}