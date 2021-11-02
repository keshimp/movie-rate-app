import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AllowedRatingIntegers, ApiMovie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  animations: [
    /**
     * This animation is a simple fade in / out animation - using angular's built in
     * animations
     */
    trigger('fadeInOutAnimation', [
        state('in', style({opacity: 1})),
        transition(':enter', [
            style({opacity: 0}),
            animate(400)
    ]),
    transition(':leave',
        animate(400, style({opacity: 0})))
    ]),
  ]
})
export class MovieListComponent {
    /**
     * The allowed ratings that can be given (integers), though the DB will technically store
     * floating point numbers :)
     */
    AllowedRatingIntegers: number[] = AllowedRatingIntegers;

    /**
     * A list of movies being used / manipulated by the component
     * Directly derives from the local cache in the service by default,
     * and can be filtered using the filters
     */
    Movies: ApiMovie[] = [];

    /**
     * The currently showing movies based on the filters
     * Defaults to the full movie cache on page load
     */
    FilteredMovies: ApiMovie[] = [];

    /**
     * Form used to filter movies based on user input
     */
    FilterForm: FormGroup;

    constructor(private movieService: MovieService) {
        this.FilterForm = new FormGroup({
            search: new FormControl('', Validators.maxLength(128)),
            rating: new FormControl(null, [Validators.maxLength(2), Validators.min(0), Validators.max(10), Validators.pattern(/\-?\d*\.?\d{1,2}/)])
        });

        this.movieService.MovieCache.subscribe(movieCache => {
            this.Movies = movieCache;
            this.FilteredMovies = movieCache;
        });
    }

    /**
     * Calls the service to delete a movie
     * @param Id The Id of the movie to delete
     */
    DeleteMovie(Id: number): void {
        this.movieService.DeleteMovie(Id);
    }

    /**
     * Applies filters given in the filter form
     */
    ApplyFilters(): void {
        if (this.FilterForm == null) {
            return;
        }

        this.FilteredMovies = [];
        const ratingValue = this.FilterForm.get('rating').value;
        const titleSearchValue = this.FilterForm.get('search').value;

        // If the user specified nothing in the filters, return all movies (spread operator)
        if (ratingValue == null && titleSearchValue == null) {
            this.Movies.forEach(movie => {
                this.FilteredMovies.push(movie);
            });
        }

        // If rating has a value and, filter
        if (ratingValue != null) {
            this.filterOutMoviesByRating(ratingValue);
        }

        if (titleSearchValue != null) {
            this.filterOutMoviesByString(titleSearchValue);
        }
    }

    /**
     * Filters out below average movies
     */
    FilterOutBelowAverageMovies(): void {
        this.FilteredMovies = [];

        // Set average and total sum of all movie ratings to 0 by default
        let average = 0;
        let totalSum = 0;

        // Loop through all of the cached movie's ratings and sum them together
        this.Movies.map(x => x.rating).forEach(val => {
                const numVal = Number(val);
                totalSum += numVal;
            });


        // Divide the sum by the length of the movies to get the average of all movies in the db
        average = totalSum / this.Movies.length;

        // Filter out any movies that don't meet the requirement
        this.filterOutMoviesByRating(average);
    }

    /**
     * Used on reset button click to add improved UX (without value changes)
     */
    ResetForm(): void {
        this.FilterForm.reset();
    }

    /**
     * Filters out any movies in the FilteredMovies (view) array that don't meet
     * the required threshold
     */
    private filterOutMoviesByRating(ratingThreshold: number): void {
        this.Movies.forEach(movie => {
            if (Number(movie.rating) >= ratingThreshold) {
                if (!this.FilteredMovies.includes(movie)) {
                    this.FilteredMovies.push(movie);
                }
            }
        });
    }

    /**
     * Filters movies based on the title string the user searches for
     */
    private filterOutMoviesByString(searchString: string): void {
        this.Movies.forEach(movie => {
            if (movie.title.toLowerCase().includes(searchString.toLowerCase())) {
                if (!this.FilteredMovies.includes(movie)) {
                    this.FilteredMovies.push(movie);
                }
            }
        });
    }
}
