/**
 * Model used to represent a movie
 */
export interface ApiMovie extends ApiUpdateMovie {
    id: number;
    /**
     * The movie's title
     */
}

// tslint:disable-next-line: no-empty-interface
export interface ApiUpdateMovie extends ApiCreateMovie {

}

export interface ApiCreateMovie {
    title: string;
    /**
     * The movie's description
     */
    description: string;
    /**
     * The rating of the movie
     * (NOTE): Ratings must be validated
     * and enforce to be 1-10 inclusive
     */
    rating: number;
}

/**
 * The allowed ratings (currently integers) for all movies
 */
export const AllowedRatingIntegers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
