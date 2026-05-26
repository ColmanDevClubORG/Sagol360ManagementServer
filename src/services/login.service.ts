import { createHash } from 'node:crypto';
import type { Patient } from '@/models/patientModel.mongoose';
import patientsData from '../db/patients.json';

const QR_SECRET = 'my-secret-key';
const TOKEN_PREFIX = 'mock';
const SIGNATURE_LENGTH = 16;
const patients = patientsData as Patient[];

export interface QrPayload {
  userId: string;
  password: string;
}

function getKey() {
  return QR_SECRET;
}

export function createQrToken(userId: string, password: string) {
  const encodedPayload = Buffer.from(JSON.stringify({ userId, password }), 'utf8').toString(
    'base64url',
  );
  const signature = signPayload(encodedPayload);

  return [TOKEN_PREFIX, encodedPayload, signature].join('.');
}

export function findPatientByLogin(userId: string, password: string): Patient | null {
  return (
    patients.find((patient) => patient.patientId === userId && patient.password === password) ??
    null
  );
}


const isQrPayload = (payload: unknown): payload is QrPayload => {
  if (!payload || typeof payload !== 'object') {
    return false;
  }

  const candidate = payload as Partial<QrPayload>;

  return typeof candidate.userId === 'string' && typeof candidate.password === 'string';
};

const signPayload = (encodedPayload: string): string => {
  return createHash('sha256')
    .update(`${encodedPayload}.${getKey()}`)
    .digest('base64url')
    .slice(0, SIGNATURE_LENGTH);
};

export function verifyQrToken(token: string): QrPayload | null {
  try {
    const [prefix, encodedPayload, signature, extraPart] = token.split('.');

    if (prefix !== TOKEN_PREFIX || !encodedPayload || !signature || extraPart) {
      return null;
    }

    if (signPayload(encodedPayload) !== signature) {
      return null;
    }

    const payload = JSON.parse(
      Buffer.from(encodedPayload, 'base64url').toString('utf8'),
    ) as unknown;

    if (!isQrPayload(payload)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export const decryptQrToken = verifyQrToken;
//TODO Should come from JWT instead
