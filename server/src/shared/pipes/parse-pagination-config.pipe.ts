import { PipeTransform, Injectable } from '@nestjs/common';
import {
  PAGINATION_DEFAULT_PAGE,
  PAGINATION_DEFAULT_PER_PAGE,
} from '../constants';
import { Pagination } from '../types';

@Injectable()
export class ParsePaginationConfigPipe
  implements PipeTransform<any, Pagination>
{
  transform(value: any) {
    return {
      page: value?.page
        ? Math.max(parseInt(value?.page), 1)
        : PAGINATION_DEFAULT_PAGE,
      per_page: value?.per_page
        ? parseInt(value?.per_page)
        : PAGINATION_DEFAULT_PER_PAGE,
    };
  }
}
