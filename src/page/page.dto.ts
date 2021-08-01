import { ApiProperty } from '@nestjs/swagger';

import { EdgeDto } from './edge.dto';
import { PageInfoDto } from './page-info.dto';

export class PageDto<Record> {
  edges: EdgeDto<Record>[];

  @ApiProperty()
  pageInfo: PageInfoDto;

  @ApiProperty()
  totalCount: number;
}
