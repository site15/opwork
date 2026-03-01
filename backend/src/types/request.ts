import { AuthSession, OpWorkProfile, Prisma } from '../generated/prisma/client';

export type AppRequest = {
  authUser: Prisma.AuthUserGetPayload<{
    include: {
      OpWorkProfile: {
        include: { opWorkJobSeeker: true; opWorkEmployer: true };
      };
    };
  }>;
  opWorkProfile: OpWorkProfile;
  authSession?: AuthSession;
  //
  authUserId: string;
  opWorkProfileId: string;
  authSessionId: string;
  //
  apiKey: string;
  //
  userIp: string | null;
  headers: Record<string, string>;
} & Request;

export function getAppRequestData(req: AppRequest) {
  return {
    authUser: req.authUser,
    opWorkProfile: req.opWorkProfile,
    authSession: req.authSession,
    //
    authUserId: req.authUserId,
    opWorkProfileId: req.opWorkProfileId,
    authSessionId: req.authSessionId,
    //
    apiKey: req.apiKey,
    //
    userIp: req.userIp,
    headers: req.headers,
  };
}
