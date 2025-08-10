export interface JwtPayload {
  jobId: string;
  status: string;
}

export interface VerifyResult {
  valid: boolean;
  expired: boolean;
  decoded?: JwtPayload;
  error?: string;
}
