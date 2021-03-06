import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment as ENV } from '../../environments/environment';
import { Endpoints } from '../shared/endpoints';

import { ResortReview } from '../resorts/shared/resort-review.model';
import { ResortRatings } from '../resorts/shared/resort-ratings.model';

@Injectable({ providedIn: 'root' })
export class ReviewsService {

    constructor(public http: HttpClient) { }

    public resortRatings: ResortRatings[] = [];
    public selectedResortRatings: ResortRatings[] = [];
    private url = `${ENV.POWLIST_CONNECT_URL}${Endpoints.RATINGS}`;

    private reviews: ResortReview[] = [];

    submitReview(review: ResortReview): boolean {
        const url = `${ENV.POWLIST_CONNECT_URL}${Endpoints.REVIEWS}`;
        this.http.post(
            url,
            review
        ).subscribe(responseData => {
            console.log(responseData);
        });
        return true;
    }

    submitReviewCategories(resortCategories: ResortRatings): boolean {
        const url = `${ENV.POWLIST_CONNECT_URL}${Endpoints.RATINGS}`;
        this.http.post(
            url,
            resortCategories
        ).subscribe(responseData => {
            console.log(responseData);
        });
        return true;
    }

    async submitUserFeedback(feedback) {
        const url = `${ENV.POWLIST_CONNECT_URL}${Endpoints.FEEDBACK}`;
        await this.http.post(
            url,
            feedback
        ).subscribe(responseData => {
            console.log(responseData);
        });
    }



    getResortRatings(id: string) {
        return this.resortRatings.filter(ratings => ratings.resortId === id);
    }

    fetchResortRatings() {
        this.http.get(this.url)
            .pipe(map(responseData => {
                const resArray = [];
                for (const key in responseData) {
                    if (responseData.hasOwnProperty(key)) {
                        resArray.push({ ...responseData[key]})
                    }
                }
                return resArray;
            })).subscribe(response => {
                this.resortRatings = response;
            });
    }

    retrieveRatings() {
        const url = `${ENV.POWLIST_CONNECT_URL}${Endpoints.RATINGS}`;
        return this.http.get<ResortRatings[]>(url)
            .pipe(map(responseData => {
                const resArray = [];
                for (const key in responseData) {
                    if (responseData.hasOwnProperty(key)) {
                        resArray.push({ ...responseData[key]})
                    }
                }
                return resArray;
            }),
            shareReplay()
            );
    }
    // https://<myid>.firebaseio.com/todos.json?orderBy="id"&equalTo=26

    // retrieveResortReviews(id: string) {
    // const cors = 'https://cors-anywhere.herokuapp.com/'
    // const url = 'https://powfish.firebaseio.com/resorts.json';
    // this.http.get(url)
    //     .pipe(map(responseData => {
    //         console.log('asdfa', responseData);
    //         const resortsArray = [];
    //         for (const key in responseData) {
    //             if (responseData.hasOwnProperty(key)) {
    //                 resortsArray.push({ ...responseData[key], id: key })
    //             }
    //         }
    //         return resortsArray;
    //     }))
    //     .subscribe(response => {
    //         response.forEach(resort => {
    //             this.resorts.push(resort);
    //         })
    //         this.sortResortsByRating();
    //         console.log(response);
    //     })
    // console.log(this.resorts);
    // }



    addNewReview(resortId, review, ratings, currentRatings) {
        // for loop that checks for name of rating
        // ((review.count * score) + newRating / newCount)
        // {}

        // patch request for ratings
        // post request for reviews
    }

    // 
    getRandomNumberBetween1and5() {
        // getRand Number between 1 and 5
        return Math.floor(Math.random() * 5);

    }

    getMockRatings(resorts) {
        console.log('called get mock ratings');
        let mockResortRatingArr = [];
        // fetch all 52 resorts that we have;
        // create a mock review obj
        if (resorts.length > 1) {
            for (let i = 0; i < resorts.length; i++) {
                let rating = {
                    resortId: resorts[i].id,
                    overallRating: {
                        count: 1,
                        label: 'Overall Rating',
                        score: this.getRandomNumberBetween1and5()
                    },
                    reviewCategories: {
                        begTerrain: { count: 1, label: 'Beginner Terrain', score: this.getRandomNumberBetween1and5() },
                        intTerrain: { count: 1, label: 'Intermediate Terrain', score: this.getRandomNumberBetween1and5() },
                        advTerrain: { count: 1, label: 'Advanced Terrain', score: this.getRandomNumberBetween1and5() },
                        exTerrain: { count: 1, label: 'Expert Terrain', score: this.getRandomNumberBetween1and5() },
                        bcAccess: { count: 1, label: 'BC/Sidecountry Access', score: this.getRandomNumberBetween1and5() },
                        crowds: { count: 1, label: 'Crowds', score: this.getRandomNumberBetween1and5() },
                        nightLife: { count: 1, label: 'Night Life', score: this.getRandomNumberBetween1and5() },
                        snow: { count: 1, label: 'Snow', score: this.getRandomNumberBetween1and5() },
                        terrainParks: { count: 1, label: 'Terrain Parks', score: this.getRandomNumberBetween1and5() },
                        value: { count: 1, label: 'Value', score: this.getRandomNumberBetween1and5() }
                    }
                }
                mockResortRatingArr.push(rating);
            }
            console.log('mock resort ratings', JSON.stringify(mockResortRatingArr));
        }
    }
}