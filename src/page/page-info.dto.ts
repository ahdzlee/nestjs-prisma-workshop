import { ApiProperty } from '@nestjs/swagger';

export class PageInfoDto {
  @ApiProperty()
  hasNextPage: boolean;

  @ApiProperty()
  hasPreviousPage: boolean;

  @ApiProperty({ required: false, nullable: true })
  startCursor?: string;

  @ApiProperty({ required: false, nullable: true })
  endCursor?: string;
}
