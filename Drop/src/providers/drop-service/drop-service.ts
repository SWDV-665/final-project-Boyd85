import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { map, catchError } from 'rxjs/operators';


/*
  Generated class for the DropServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DropServiceProvider {


  items: any = [];

  baseURL = "https://drop-server-1.herokuapp.com";

  dataChanged$: Observable<boolean>;

  private dataChangeSubject: Subject<boolean>;

  constructor(public http: HttpClient) {

    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }

  getItems(): Observable<object[]> {
    return this.http.get(this.baseURL + "/api/drop").pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData(res: Response) {
    let body  = res;
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString()
    }
    return Observable.throw(errMsg)
  }


  removeItem(id) {
    this.http.delete(this.baseURL + "/api/drop/" + id).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    });
  }

  addItem(object) {
    this.http.post(this.baseURL + "/api/drop/", object).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    });
  }

  editItem(object, index) {
    this.http.put(this.baseURL + "/api/drop/" + object._id, object).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    });
  }

  pushMessageAndCoords(object){
    this.items.push(object);
  }

}
