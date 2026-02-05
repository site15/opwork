
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsOptional,IsString,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'

export class OpWorkNotificationSettingsUqOpWorkNotificationSettingsProfileUniqueInputDto {
    @ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
profileId!: string ;
  }

@ApiExtraModels(OpWorkNotificationSettingsUqOpWorkNotificationSettingsProfileUniqueInputDto)
export class ConnectOpWorkNotificationSettingsDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
id?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
profileId?: string ;
@ApiProperty({
  type: OpWorkNotificationSettingsUqOpWorkNotificationSettingsProfileUniqueInputDto,
  required: false,
})
@IsOptional()
@ValidateNested()
@Type(() => OpWorkNotificationSettingsUqOpWorkNotificationSettingsProfileUniqueInputDto)
uqOpWorkNotificationSettingsProfile?: OpWorkNotificationSettingsUqOpWorkNotificationSettingsProfileUniqueInputDto ;
}
