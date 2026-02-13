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
import { AuthApiKeyDto } from './auth-api-key.dto';
import { AuthApiKey } from './auth-api-key.entity';
import { CreateAuthApiKeyDto } from './create-auth-api-key.dto';
import { UpdateAuthApiKeyDto } from './update-auth-api-key.dto';

export class FindManyAuthApiKeyArgs extends FindManyArgs {
  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  userId?: string;}

export class FindManyAuthApiKeyResponseMeta extends FindManyResponseMeta {}

export class FindManyAuthApiKeyResponse {
  @ApiProperty({ type: () => [AuthApiKey] })
  items!: AuthApiKey[];

  @ApiProperty({ type: () => FindManyAuthApiKeyResponseMeta })
  meta!: FindManyAuthApiKeyResponseMeta;
}

@ApiTags('auth')
@Controller('auth/api-key')
export class AuthApiKeyController {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService
  ) {}

  @Get()
  @ApiOkResponse({ type: FindManyAuthApiKeyResponse })
  async findMany(@Query() args: FindManyAuthApiKeyArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const { searchText, ...otherArgs } = args;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in PrismaSdk.Prisma.AuthApiKeyScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const authApiKeyWhereInput: Prisma.AuthApiKeyWhereInput = {
      ...(searchText
        ? {
            OR: [
              ...(isUUID(searchText) ? [{ id: { equals: searchText } }] : []),
              { apiKey: { contains: searchText, mode: 'insensitive' } }
            ],
            AND: [
              
          ...(isUUID(otherArgs.userId)
            ? [{ userId: { equals: otherArgs.userId } }]
            : []),
            ],
          }
        : {}),
      
    };

    const result = await this.prismaService.$transaction(async (prisma) => {
      return {
        items: await prisma.authApiKey.findMany({
          include:{
AuthUser: true
          },
          where: authApiKeyWhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.authApiKey.count({
          where: authApiKeyWhereInput,
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
  @ApiCreatedResponse({ type: AuthApiKeyDto })
  async createOne(
    @Body() args: CreateAuthApiKeyDto,
  ) {    
    return await this.prismaService.authApiKey.create({
      data: { 
        ...args,
        AuthUser:{connect:{id:args.AuthUser?.connect.id}}
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: AuthApiKeyDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateAuthApiKeyDto,
  ) {
    return await this.prismaService.authApiKey.update({
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
    await this.prismaService.authApiKey.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: AuthApiKeyDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaService.authApiKey.findFirstOrThrow({
      where: {
        id,
        
      },
    });
  }
}
