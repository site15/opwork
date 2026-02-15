import { AuthSession, OpWorkProfile, Prisma } from '../generated/prisma/client';

export type AppRequest = {
  authUser: Prisma.AuthUserGetPayload<{ include: { OpWorkProfile: true } }>;
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
