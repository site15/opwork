import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CurrentAppRequest } from '../decorators/current-app-request.decorator';
import { OpWorkJobTagDto } from '../generated/rest/op-work-job-tag.dto';
import { OpWorkJobTag } from '../generated/rest/op-work-job-tag.entity';
import { PRISMA_SERVICE, PrismaService } from '../services/prisma.service';
import { SetEmployerJobTagsArgs } from '../types/employer-types';
import { AppRequest } from '../types/request';
import { StatusResponse } from '../types/status-response';

@ApiTags('employer')
@Controller('employer/job-tags')
export class EmployerJobTagsController {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService,
  ) {}

  @Get('all')
  @ApiOkResponse({ type: OpWorkJobTag, isArray: true })
  async getAllTags(
    @CurrentAppRequest() req: AppRequest,
  ): Promise<OpWorkJobTagDto[]> {
    if (!req.opWorkProfileId) {
      return [];
    }
    return await this.prismaService.opWorkJobTag.findMany({
      where: {
        OpWorkJob: { profileId: req.opWorkProfileId },
      },
    });
  }

  @Get(':job_id')
  @ApiOkResponse({ type: OpWorkJobTagDto, isArray: true })
  async getJobTags(
    @Param('job_id', new ParseUUIDPipe()) jobId: string,
  ): Promise<OpWorkJobTagDto[]> {
    return await this.prismaService.opWorkJobTag.findMany({
      where: {
        OpWorkJob: { id: jobId },
      },
    });
  }

  @Put(':job_id')
  @ApiOkResponse({ type: OpWorkJobTagDto })
  async setJobTag(
    @CurrentAppRequest() req: AppRequest,
    @Param('job_id', new ParseUUIDPipe()) jobId: string,
    @Body() args: SetEmployerJobTagsArgs,
  ): Promise<OpWorkJobTagDto> {
    if (args.id) {
      return await this.prismaService.opWorkJobTag.update({
        where: { id: args.id },
        data: {
          color: args.color,
          name: args.name,
        },
      });
    } else {
      return await this.prismaService.opWorkJobTag.create({
        data: {
          color: args.color,
          name: args.name,
          OpWorkJob: { connect: { id: jobId } },
          OpWorkProfile: { connect: { id: req.opWorkProfileId } },
        },
      });
    }
  }

  @Delete(':job_tag_id')
  @ApiOkResponse({ type: StatusResponse })
  async delJobTag(
    @CurrentAppRequest() req: AppRequest,
    @Param('job_tag_id', new ParseUUIDPipe()) jobTagId: string,
  ): Promise<StatusResponse> {
    await this.prismaService.opWorkJobTag.delete({
      where: { id: jobTagId },
    });
    return { message: 'ok' };
  }
}
