import { AuthSession, OpWorkProfile, Prisma } from '../generated/prisma/client';

export type AppRequest = {
  user: Prisma.AuthUserGetPayload<{ include: { OpWorkProfile: true } }>;
  profile: OpWorkProfile;
  session?: AuthSession;
  //
  userId: string;
  profileId: string;
  sessionId: string;
  //
  apiKey: string;
  //
  userIp: string | null;
  headers: Record<string, string>;
} & Request;
