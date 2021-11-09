import { CommonService } from '../../service/common/common.service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(private commonService: CommonService, private http: HttpClient) { }
  newTour(tourValue) {
    let formatTourDates = this.formatTourDates(tourValue.tourDate);
    const value = {
      tourName: tourValue.tourName,
      startDate: formatTourDates['start'] ? formatTourDates['start'] : null,
      endDate: formatTourDates['end'] ? formatTourDates['end'] : null,
      country: tourValue.country,
      noOfDays: tourValue.noOfDays,
      travelMode: tourValue.travelMode,
      natureOfTravel: tourValue.natureOfTravel
    };

    return this.http
      .post<{ message: string }>(
        `${this.commonService.api}tour/create`,
        value
      )
      .pipe(catchError(this.handleError));
  }
  getAllTours(){
    return this.http
      .get<{ message: string }>(
        `${this.commonService.api}tour/list`
      )
      .pipe(catchError(this.handleError));
  }
  formatTourDates(dateArray){
    let startDate = dateArray.start ? dateArray.start : null;
    let endDate = dateArray.end ? dateArray.end : null;
    console.log(startDate);
    if(startDate && endDate){
      let formattedDates = {};
      formattedDates['start'] =  moment(startDate.year+'-'+startDate.month+'-'+startDate.day, 'YYYY-MM-DD');
      formattedDates['end'] = moment(endDate.year+'-'+endDate.month+'-'+endDate.day, 'YYYY-MM-DD');
      return formattedDates;
    }
    else{
      return null;
    }
  }
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'AN unknown error occured';
    if (!errorRes.error || !errorRes.error.message) {
      return errorMessage;
    }
    return throwError(errorRes.error.message);
  }
}
