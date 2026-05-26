export interface QRCreateBody {
  userId?: string;
  password?: string;
}

export interface QRVerifyBody {
  token?: string;
}
