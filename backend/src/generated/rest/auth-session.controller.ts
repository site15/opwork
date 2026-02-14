import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Inject,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiProperty,
  ApiPropertyOptional,
  ApiTags,
} from '@nestjs/swagger';
import { IsOptional, isUUID } from 'class-validator';
import {
  PRISMA_SERVICE,
  FindManyArgs,
  FindManyResponseMeta,
  getFirstSkipFromCurPerPage,
  PrismaSdk,
  PrismaService,
} from '../../services/prisma.service';
import { StatusResponse } from '../../types/status-response';
import { Prisma } from '../prisma/client';
import { AuthSessionDto } from './auth-session.dto';
import { AuthSession } from './auth-session.entity';
import { CreateAuthSessionDto } from './create-auth-session.dto';
import { UpdateAuthSessionDto } from './update-auth-session.dto';

export class FindManyAuthSessionArgs extends FindManyArgs {
  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  userId?: string;}

export class FindManyAuthSessionResponseMeta extends FindManyResponseMeta {}

export class FindManyAuthSessionResponse {
  @ApiProperty({ type: () => [AuthSession] })
  items!: AuthSession[];

  @ApiProperty({ type: () => FindManyAuthSessionResponseMeta })
  meta!: FindManyAuthSessionResponseMeta;
}

@ApiTags('auth')
@Controller('auth/session')
export class AuthSessionController {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService
  ) {}

  @Get()
  @ApiOkResponse({ type: FindManyAuthSessionResponse })
  async findMany(@Query() args: FindManyAuthSessionArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const { searchText, ...otherArgs } = args;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in PrismaSdk.Prisma.AuthSessionScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const authSessionWhereInput: Prisma.AuthSessionWhereInput = {
      ...(searchText
        ? {
            OR: [
              ...(isUUID(searchText) ? [{ id: { equals: searchText } }] : []),
              
            ],
          }
        : {}),
      AND: [
        
          ...(isUUID(otherArgs.userId)
            ? [{ userId: { equals: otherArgs.userId } }]
            : []),
      ],
      
    };

    const result = await this.prismaService.$transaction(async (prisma) => {
      return {
        items: await prisma.authSession.findMany({
          include:{
AuthUser: true
          },
          where: authSessionWhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.authSession.count({
          where: authSessionWhereInput,
        }),
      };
    });
    return {
      items: result.items,
      meta: {
        totalResults: result.totalResults,
        curPage,
        perPage,
      },
    };
  }

  @Post()
  @ApiCreatedResponse({ type: AuthSessionDto })
  async createOne(
    @Body() args: CreateAuthSessionDto,
  ) {    
    return await this.prismaService.authSession.create({
      data: { 
        ...args,
        AuthUser:{connect:{id:args.AuthUser?.connect.id}}
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: AuthSessionDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateAuthSessionDto,
  ) {
    return await this.prismaService.authSession.update({
      data: {
        ...args,
        updatedAt: new Date(),
        
        ...(!args.AuthUser?{AuthUser:undefined}:{AuthUser: { connect: { id: args.AuthUser?.connect.id } }})
      },
      where: {
        id,
        
      },
    });
  }

  @Delete(':id')
  @ApiOkResponse({ type: StatusResponse })
  async deleteOne(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.prismaService.authSession.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: AuthSessionDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaService.authSession.findFirstOrThrow({
      where: {
        id,
        
      },
    });
  }
}
