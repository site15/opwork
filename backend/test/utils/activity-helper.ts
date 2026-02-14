import {
  X_API_KEY_HEADER_NAME,
  X_SESSION_ID_HEADER_NAME,
} from '../../src/guards/auth.guard';
import { AuthUser, Sdk, SignInArgs } from '../generated/client';
import { Client, Config, createClient } from '../generated/client/client';

export class ActivityHelper {
  private apiKey: string | null = null;
  private sessionId: string | null = null;
  private profile: AuthUser | null = null;

  private client: Client;

  sdk: Sdk;

  constructor(config: Config = {}) {
    this.client = createClient(config);
    this.sdk = new Sdk({
      client: this.client,
    });
  }

  async getProfile() {
    const result = await this.sdk.authControllerProfile();
    if (result?.error) {
      throw Object.assign(
        new Error((result.error as any).error || 'Failed to get profile'),
        result.error,
      );
    }
    this.profile = result.data;
    return result.data;
  }

  async register(args: SignInArgs) {
    try {
      const result = await this.sdk.authControllerSignUp({
        body: args,
      });
      if (result?.error) {
        throw Object.assign(
          new Error(
            (result.error as any).error ||
              'Invalid credentials, please try again',
          ),
          result.error,
        );
      }
      this.sessionId = result.data.sessionId;
      this.profile = result.data.profile;
      this.updateClientConfig();
      return result.data;
    } catch (error) {
      this.sessionId = null;
      this.profile = null;
      this.updateClientConfig();
      throw error;
    }
  }

  async login(args: SignInArgs) {
    try {
      const result = await this.sdk.authControllerSignIn({
        body: args,
      });
      if (result?.error) {
        throw Object.assign(
          new Error(
            (result.error as any).error ||
              'Invalid credentials, please try again',
          ),
          result.error,
        );
      }
      this.sessionId = result.data.sessionId;
      this.profile = result.data.profile;
      this.updateClientConfig();
      return result.data;
    } catch (error) {
      this.sessionId = null;
      this.profile = null;
      this.updateClientConfig();
      throw error;
    }
  }

  async loginByApiKey({ apiKey }: { apiKey: string }) {
    try {
      this.apiKey = apiKey;
      this.updateClientConfig();
      const result = await this.sdk.authControllerProfile();
      if (result?.error) {
        throw Object.assign(
          new Error(
            (result.error as any).error ||
              'Invalid credentials, please try again',
          ),
          result.error,
        );
      }
      this.profile = result.data;
      this.updateClientConfig();
      return result.data;
    } catch (error) {
      this.apiKey = null;
      this.profile = null;
      this.updateClientConfig();
      throw error;
    }
  }

  async logout() {
    const result = await this.sdk.authControllerSignOut();
    if (result?.error) {
      throw Object.assign(
        new Error((result.error as any).error || 'Failed to logout'),
        result.error,
      );
    }
    this.apiKey = null;
    this.sessionId = null;
    this.profile = null;
    this.updateClientConfig();
    return result.data;
  }

  private updateClientConfig() {
    this.client.setConfig({
      headers: { [X_SESSION_ID_HEADER_NAME]: this.sessionId || null },
    });
    this.client.setConfig({
      headers: { [X_API_KEY_HEADER_NAME]: this.apiKey || null },
    });
  }
}
