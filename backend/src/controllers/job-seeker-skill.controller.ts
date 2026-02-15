import { Body, Controller, Inject, Put } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CurrentAppRequest } from '../decorators/current-app-request.decorator';
import { OpWorkJobSeekerSkillDto } from '../generated/rest/op-work-job-seeker-skill.dto';
import { PRISMA_SERVICE, PrismaService } from '../services/prisma.service';
import { SetJobSeekerSkillArgs } from '../types/job-seeker-types';
import { AppRequest } from '../types/request';

@ApiTags('job-seeker')
@Controller('job-seeker/skill')
export class JobSeekerSkillController {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService,
  ) {}

  @Put()
  @ApiOkResponse({ type: OpWorkJobSeekerSkillDto })
  async setSkill(
    @CurrentAppRequest() req: AppRequest,
    @Body() args: SetJobSeekerSkillArgs,
  ): Promise<OpWorkJobSeekerSkillDto> {
    if (!args.skillId && args.skillName) {
      args.skillId = (
        (await this.prismaService.opWorkSkill.findFirst({
          where: { name: args.skillName },
        })) ||
        (await this.prismaService.opWorkSkill.create({
          data: { name: args.skillName, popularity: -1 },
        }))
      ).id;
    }
    if (args.id) {
      return await this.prismaService.opWorkJobSeekerSkill.update({
        where: { id: args.id },
        data: {
          isPrimary: args.isPrimary,
          lastUsed: args.lastUsed,
          level: args.level,
          yearsOfExp: args.yearsOfExp,
          OpWorkSkill: { connect: { id: args.skillId } },
        },
      });
    } else {
      const opWorkJobSeeker =
        await this.prismaService.opWorkJobSeeker.findFirstOrThrow({
          where: {
            profileId: req.opWorkProfileId,
          },
        });
      return await this.prismaService.opWorkJobSeekerSkill.create({
        data: {
          isPrimary: args.isPrimary,
          lastUsed: args.lastUsed,
          level: args.level,
          yearsOfExp: args.yearsOfExp,
          OpWorkSkill: { connect: { id: args.skillId } },
          OpWorkJobSeeker: {
            connect: {
              id: opWorkJobSeeker.id,
            },
          },
          OpWorkProfile: { connect: { id: req.opWorkProfileId } },
        },
      });
    }
  }
}
