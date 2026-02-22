import { lastValueFrom, take, toArray } from 'rxjs';
import { UserType } from '../src/types/auth-types';
import { TimeControllerStreamData } from './generated/client';
import { ActivityHelper } from './utils/activity-helper';

describe('Time (e2e)', () => {
  const userActivity = new ActivityHelper({
    baseUrl: process.env.VITE_GLOB_API_URL,
  });

  it('Register and login', async () => {
    await userActivity.registerAndLoginRandomUser(UserType.EMPLOYER);
  });

  it('Get time', async () => {
    const timeControllerTimeResult =
      await userActivity.sdk.timeControllerTime();
    const time = timeControllerTimeResult.data;
    expect(time ? +new Date(time as unknown as string) : null).not.toBeNaN();
  });

  it('Get time over SSE', async () => {
    const times = await lastValueFrom(
      userActivity
        .sse<Date>({
          url: '/api/time/stream' satisfies TimeControllerStreamData['url'],
        })
        .pipe(take(2), toArray()),
    );
    expect(
      times[0] ? +new Date(times[0] as unknown as string) : null,
    ).not.toBeNaN();
    expect(
      times[1] ? +new Date(times[1] as unknown as string) : null,
    ).not.toBeNaN();
  });
});
