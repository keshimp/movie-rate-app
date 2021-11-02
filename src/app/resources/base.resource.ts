import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BaseResource<TModel, TUpdateModel, TCreateModel> {
    /** Private BASE url - set only in the base resource, cannot be changed by other resources */
    private BASE_API_URL = 'http://localhost:3000';

    /** Protected API endpoint url - can be changed by other resources who extend base resource,
     * cannot be changed by components who inject it
     */
    protected API_ENDPOINT_URL = '';

    constructor(protected httpClient: HttpClient) { }

    /**
     * Base REST function for GetAll - calls the given API endpoint
     */
    public GetAll(): Observable<TModel[]> {
        return this.httpClient.get<TModel[]>(`${this.BASE_API_URL}/${this.API_ENDPOINT_URL}`)
            .pipe(catchError(this.handleError));
    }

    /**
     * Base REST function for GET - calls the given API endpoint
     */
    public Get(Id: number): Observable<TModel> {
        return this.httpClient.get<TModel>(`${this.BASE_API_URL}/${this.API_ENDPOINT_URL}/${Id}`)
            .pipe(catchError(this.handleError));
    }

    /**
     * Base REST function for POST - calls the given API endpoint
     */
    public Create(model: TCreateModel): Observable<TModel> {
        const headers = { 'content-type': 'application/json'};
        const body = JSON.stringify(model);

        return this.httpClient.post<TModel>(`${this.BASE_API_URL}/${this.API_ENDPOINT_URL}`, body, { headers })
            .pipe(catchError(this.handleError));
    }

    /**
     * Base REST function for UPDATE (PUT) - calls the given API endpoint
     */
    public Update(model: TUpdateModel, Id: number): Observable<TModel> {
        const body = JSON.stringify(model);

        return this.httpClient.put<TModel>(`${this.BASE_API_URL}/${this.API_ENDPOINT_URL}/${Id}`, body)
            .pipe(catchError(this.handleError));
    }

    /**
     * Base REST function for DELETE - calls the given API endpoint
     */
    public Delete(Id: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.BASE_API_URL}/${this.API_ENDPOINT_URL}/${Id}`)
            .pipe(catchError(this.handleError));
    }

    /**
     * Handles any errors by throwing a window alert - stretch goal would be implementing error
     * handling in components and returning a string to that component
     */
    private handleError(error: HttpErrorResponse): Observable<never> {
        let errorMessage = 'Unknown error!';
        if (error.error instanceof ErrorEvent) {
            // Client-side errors
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side errors
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        // Throw an alert to the browser window
        window.alert(errorMessage);
        return throwError(errorMessage);
    }
}
