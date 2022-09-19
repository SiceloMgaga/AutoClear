import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Review } from './review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  CreateReview(createForm: Review): Observable<Object>
  {
    return this.http.post(`${environment.apiURL + 'Reviews/createReview'}`, createForm);
  }

  getReviewsList() : Observable<Review[]>
  {
    return this.http.get<Review[]>(environment.apiURL + 'Reviews/GetReviews');
  }

  getReviewById(ReviewId: number): Observable<Review>
  {
    return this.http.get<Review>(`${environment.apiURL + 'Reviews'}/${ReviewId}`);
  }

  updateReview(ReviewId: number, review: Review): Observable<Object>
  {
    return this.http.put(`${environment.apiURL + 'Reviews'}/${ReviewId}`, review);
  }

  deleteReview(ReviewId: number): Observable<Object>
  {
    return this.http.delete(`${environment.apiURL + 'Reviews'}/${ReviewId}`);
  }

}
