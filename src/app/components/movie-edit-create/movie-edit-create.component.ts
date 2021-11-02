import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AllowedRatingIntegers, ApiCreateMovie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-edit-create',
  templateUrl: './movie-edit-create.component.html',
  styleUrls: ['./movie-edit-create.component.scss']
})
export class MovieEditCreateComponent {
    /**
     * The allowed rating integers that can be used for a movie rating
     */
     AllowedRatingIntegers: number[] = AllowedRatingIntegers;

    /**
     * Error to show if creation is unsuccessful
     */
    Error = '';

    /**
     * Success message to show if creation is sucessful
     */
    Success = '';

    MovieForm: FormGroup;

    constructor(private movieService: MovieService) {
        this.MovieForm = new FormGroup({
            title: new FormControl('', [Validators.maxLength(128), Validators.required]),
            description: new FormControl('', [Validators.maxLength(528), Validators.required]),
            rating: new FormControl(1,
                [
                    Validators.required,
                    Validators.min(1),
                    Validators.max(10)
                ]
            )
        });
    }

    /**
     * Submits the model to update / create based on the form values
     */
    Submit(): void {
        // Reset success and error messages before execution
        this.Success = '';
        this.Error = '';

        // If the form is somehow invalid at this point, return and show an error
        if (!this.MovieForm.valid) {
            this.Error = 'Could not create the movie.';
            return;
        }

        const movieToCreate: ApiCreateMovie = {
            rating: Number(this.MovieForm.get('rating').value),
            title: this.MovieForm.get('title').value,
            description: this.MovieForm.get('description').value
        };

        // Create the movie and add a success message - reset the form
        this.movieService.AddMovie(movieToCreate);
        this.Success = `The movie ${movieToCreate.title} was created successfully!`;
        this.MovieForm.reset();
    }
}
