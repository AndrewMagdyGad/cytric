import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MoviesService } from './movies.service';
import { Pagination } from 'src/shared/types';
import { ParsePaginationConfigPipe } from 'src/shared/pipes/parse-pagination-config.pipe';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async create(
    @Body() createMovieDto: CreateMovieDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10000000 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.moviesService.create(createMovieDto, file);
  }

  @Get()
  async listMovies(
    @Query(ParsePaginationConfigPipe) paginationConfig: Pagination,
  ) {
    return this.moviesService.listMovies(paginationConfig);
  }

  @Delete(':id')
  async deleteMovie(@Param('id') movieId: string) {
    return this.moviesService.deleteMovie(movieId);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Patch(':id')
  async updateMovie(
    @Param('id') movieId: string,
    @Body() updateMovieDto: CreateMovieDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10000000 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.moviesService.updateMovie(movieId, updateMovieDto, file);
  }
}
