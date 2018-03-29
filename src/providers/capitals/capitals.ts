import {Capital} from "../../models/capital";
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

/*
  Generated class for the CapitalsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const URL_API = '/countryApi/';

@Injectable()
export class CapitalsProvider {

  constructor(public http: HttpClient) {
  }

  getCapital(country: string, format: string): Promise<Capital> {
    return this.http.get<{Results:{Capital:Capital}}>(URL_API + country + "." + format).toPromise().then(function (response){
      return response.Results.Capital;
    });
  }

}
