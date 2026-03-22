import { finalize, from, map, mergeMap } from 'rxjs';
import { X_API_KEY, X_SESSION_ID } from '../../src/guards/auth.guard';
import { AuthUser, Sdk, SignInArgs, UserType } from '../generated/client';
import { Client, Config, createClient } from '../generated/client/client';
import { client } from '../generated/client/client.gen';
import { getRandomSha7 } from './utils';

export class ActivityHelper {
  private apiKey: string | null = null;
  private authSessionId: string | null = null;
  private client: Client;

  randomSha7 = getRandomSha7();
  authUser: AuthUser | null = null;
  sdk: Sdk;

  constructor(config: Config = {}) {
    this.client = createClient({ ...config, throwOnError: true });
    this.sdk = new Sdk({
      client: this.client,
    });
  }

  sse<T>(...args: Parameters<typeof client.sse.get>) {
    const controller = new AbortController();
    const options = args[0];
    return from(
      this.client.sse.get({
        ...options,
        signal: controller.signal,
      }),
    ).pipe(
      mergeMap(({ stream }) => from(stream)),
      map((e) => e as T),
      finalize(() => controller.abort()),
    );
  }

  async getProfile() {
    const result = await this.sdk.authControllerInfo();
    this.authUser = result.data || null;
    return result.data;
  }

  async register(args: SignInArgs) {
    if (!args.userType) {
      throw new Error('User type is required');
    }
    try {
      const result = await this.sdk.authControllerSignUp({
        body: { ...args, userType: args.userType! },
      });
      this.authSessionId = result.data?.sessionId || null;
      this.authUser = result.data?.profile || null;
      this.updateClientConfig();
      return result.data;
    } catch (error) {
      this.authSessionId = null;
      this.authUser = null;
      this.updateClientConfig();
      throw error;
    }
  }

  async login(args: SignInArgs) {
    try {
      const result = await this.sdk.authControllerSignIn({
        body: args,
      });
      this.authSessionId = result.data?.sessionId || null;
      this.authUser = result.data?.profile || null;
      this.updateClientConfig();
      return result.data;
    } catch (error) {
      this.authSessionId = null;
      this.authUser = null;
      this.updateClientConfig();
      throw error;
    }
  }

  async loginByApiKey({ apiKey }: { apiKey: string }) {
    try {
      this.apiKey = apiKey;
      this.updateClientConfig();
      const result = await this.sdk.authControllerInfo();
      this.authUser = result.data || null;
      this.updateClientConfig();
      return result.data;
    } catch (error) {
      this.apiKey = null;
      this.authUser = null;
      this.updateClientConfig();
      throw error;
    }
  }

  async registerAndLogin(args: SignInArgs) {
    await this.register(args);
    return await this.login(args);
  }

  async registerAndLoginRandomUser(userType?: UserType) {
    const args = {
      email: `test_${this.randomSha7}_${userType?.toLowerCase()}@example.com`,
      password: 'validPassword123',
      userType,
    };
    await this.register(args);
    return await this.login(args);
  }

  async logout() {
    const result = await this.sdk.authControllerSignOut();
    this.apiKey = null;
    this.authSessionId = null;
    this.authUser = null;
    this.updateClientConfig();
    return result.data;
  }

  private updateClientConfig() {
    this.client.setConfig({
      headers: { [X_SESSION_ID]: this.authSessionId || null },
    });
    this.client.setConfig({
      headers: { [X_API_KEY]: this.apiKey || null },
    });
  }
}
