import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ApiCreateMovie, ApiMovie } from '../models/movie.model';
import { MovieResource } from '../resources/movie.resource';


@Injectable({
  providedIn: 'root'
})
export class MovieService {
    /**
     * Behavior subject (has an initial empty array value) that holds the movies that will be cached and used
     * among the observing components
     */
    public MovieCache: BehaviorSubject<ApiMovie[]> = new BehaviorSubject<ApiMovie[]>([]);

    constructor(private movieResource: MovieResource) {
      /** When this service gets contstructed, subscribe to GetAll and return movies
       * from the db
       */
      this.movieResource.GetAll().subscribe(movies => {
          this.MovieCache.next(movies);
      });
    }

    /**
     * Deletes a movie on the backend and removes it form the local cache
     * @param Id The Id of the movie to delete
     */
    DeleteMovie(Id: number): void {
      this.movieResource.Delete(Id).subscribe(() => {
          this.RemoveMovieFromCache(Id).subscribe();
      });
    }

    /**
     * Creates a movie on the backend and adds it to the local cache
     * @param movieToCreate The movie to create
     */
    AddMovie(movieToCreate: ApiCreateMovie): void {
      this.movieResource.Create(movieToCreate).subscribe(movie => {
          this.AddMovieToCache(movie).subscribe();
      });
    }

    /**
     * Adds a movie to the cache by exposing the source observable in the behaviorSubject
     * and adding the movie to the list of movies
     * @param movieToAdd The movie to add to the local cache
     * @returns An observable with no return value
     */
    private AddMovieToCache(movieToAdd: ApiMovie): Observable<void> {
      return this.MovieCache.pipe(take(1), map(movieCache => {
          movieCache.push(movieToAdd);
          this.MovieCache.next(movieCache);
      }));
    }

    /**
     * Removes a movie from the local cache by splicing the found element from the source array
     * @param Id The Id of the movie to remove from the cache
     * @returns An observable with no return value
     */
    private RemoveMovieFromCache(Id: number): Observable<void> {
        return this.MovieCache.pipe(take(1), map(movieCache => {
            movieCache.splice(movieCache.findIndex(x => x.id === Id), 1);
            this.MovieCache.next(movieCache);
        }));
    }
}
