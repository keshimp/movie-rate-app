import { Injectable } from '@angular/core';
import { ApiCreateMovie, ApiMovie, ApiUpdateMovie } from '../models/movie.model';

import { BaseResource } from './base.resource';


@Injectable({
  providedIn: 'root'
})
export class MovieResource extends BaseResource<ApiMovie, ApiUpdateMovie, ApiCreateMovie> {
    /**
     * Set API Endpoint URL to the api/movies endpoint
     */
    API_ENDPOINT_URL = 'movies';
}
