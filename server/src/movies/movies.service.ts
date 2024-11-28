import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './schemas/movie.schema';
import { createMovieSchema } from './utils';
import { UploadedFile } from 'src/files/adapters/s3/interfaces';
import { S3AdapterFactory } from 'src/files/adapters/s3/s3.adapter.factory';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { Pagination } from 'src/shared/types';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private readonly movieModel: Model<Movie>,
    private s3AdapterFactory: S3AdapterFactory,
  ) {}

  async create(
    createMovieDto: CreateMovieDto,
    moviePoster: UploadedFile,
  ): Promise<Movie> {
    try {
      createMovieSchema.parse(createMovieDto);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new BadRequestException(
          error.errors.map((e) => JSON.stringify(e)).join(', '),
        );
      }
      throw error; // Handle other unexpected errors
    }

    const uploadedResponse = await this.s3AdapterFactory
      .getS3Adapter()
      .put(moviePoster, uuidv4());

    const newMovie = new this.movieModel({
      ...createMovieDto,
      poster: uploadedResponse.url,
    });

    return await newMovie.save();
  }

  async listMovies(paginationConfig: Pagination) {
    const { page, per_page } = paginationConfig;
    const skip = (page - 1) * per_page;
    const movies = await this.movieModel
      .find()
      .skip(skip)
      .limit(per_page)
      .exec();
    const noOfPages = await this.movieModel.countDocuments().exec();
    return {
      movies,
      noOfPages: Math.ceil(noOfPages / per_page),
      page,
      per_page,
    };
  }

  async deleteMovie(movieId: string) {
    const movie = await this.movieModel.findById(movieId).catch(() => {
      throw new BadRequestException('Movie id is is invalid');
    });
    if (!movie) {
      throw new BadRequestException('Movie is is invalid');
    }

    return await this.movieModel.findByIdAndDelete(movieId).exec();
  }

  async updateMovie(
    movieId: string,
    updateMovieDto: CreateMovieDto,
    moviePoster?: UploadedFile,
  ) {
    const movie = await this.movieModel.findById(movieId).catch(() => {
      throw new BadRequestException('Movie id is is invalid');
    });
    if (!movie) {
      throw new BadRequestException('Movie deos not exist');
    }

    const updatedMovie: any = { ...updateMovieDto };
    if (moviePoster) {
      const uploadedResponse = await this.s3AdapterFactory
        .getS3Adapter()
        .put(moviePoster, uuidv4());
      updatedMovie.poster = uploadedResponse.url;
    }
    return await this.movieModel
      .findByIdAndUpdate(movieId, updatedMovie, { new: true })
      .exec();
  }
}
