import { AuthService } from './AuthService';
import { client } from './generated/client/client.gen';

describe('Auth Api Key (e2e)', () => {
  let authService: AuthService;

  beforeEach(async () => {
    authService = new AuthService();
    client.setConfig({
      baseUrl: process.env.VITE_GLOB_API_URL,
    });
  });

  it('login by ApiKey', async () => {
    const result = await authService.login({
      apiKey: process.env.ADMIN_API_KEYS?.split(',')[0] || '',
    });
    expect(result.isActive).toBeTruthy();
    expect(result.email).toContain('admin');
    console.log({ result });
  });
});
