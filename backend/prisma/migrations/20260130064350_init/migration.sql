CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateTable
CREATE TABLE "AuthUser"(
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "anonymousId" text,
    "supabaseUserId" text,
    "supabaseUserData" jsonb,
    "isActive" boolean,
    "createdAt" timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PK_AUTH_USER" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthApiKey"(
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "userId" uuid NOT NULL,
    "apiKey" varchar(255),
    "isActive" boolean,
    "createdAt" timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PK_AUTH_API_KEY" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthSession"(
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "userId" uuid NOT NULL,
    "isActive" boolean,
    "createdAt" timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PK_AUTH_SESSION" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UQ_AUTH_USER__SUPABASE_USER_ID" ON "AuthUser"("supabaseUserId");

-- CreateIndex
CREATE INDEX "IDX_AUTH_API_KEY__USER_ID" ON "AuthApiKey"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_AUTH_API_KEY__API_KEY" ON "AuthApiKey"("apiKey");

-- CreateIndex
CREATE INDEX "IDX_AUTH_SESSION__USER_ID" ON "AuthSession"("userId");

-- AddForeignKey
ALTER TABLE "AuthApiKey"
    ADD CONSTRAINT "FK_AUTH_API_KEY__USER_ID" FOREIGN KEY ("userId") REFERENCES "AuthUser"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "AuthSession"
    ADD CONSTRAINT "FK_AUTH_SESSION__USER_ID" FOREIGN KEY ("userId") REFERENCES "AuthUser"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

