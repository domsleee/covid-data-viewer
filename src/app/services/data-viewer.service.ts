import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { DataService } from './data.service';
export const DATA_URL = 'https://data.nsw.gov.au/data/api/3/action/package_show?id=aefcde60-3b0c-4bc0-9af1-6fe652944ec2';

interface IDataResult {
  result: {
    resources: {
      last_modified: string;
      url: string;
    }[]
  }
};

@Injectable({
  providedIn: 'root'
})
export class DataViewerService {
  private lastUpdateDate: Date | null = null;
  private setupDoneSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private dataService: DataService) { }

  init() {
    this.getDataInfo().subscribe(ret => {
      this.getDataFromUrl(ret.url).subscribe(r => {
        this.dataService.setup(r.body);
        this.setupDoneSubject.next(true);
      })
    })
  }

  getLastUpdateDate = () => this.lastUpdateDate;
  getEntries = () => this.dataService.getEntries();
  getDateEntries = () => this.dataService.getDateEntries();
  getSetupDoneObservable = () => this.setupDoneSubject.asObservable();

  private getDataInfo() {
    return this.http.get<IDataResult>(DATA_URL).pipe(
      map(ret => {
        const resource = ret.result.resources[0];
        this.lastUpdateDate = new Date(resource.last_modified+'Z');
        return resource;
      })
    );
  }

  private getDataFromUrl(url: string) {
    const headers = {
      "Content-Type": "text/csv"
    };
    const s = new Subject<HttpResponse<any>>();
    this.http.get(url, {headers, reportProgress: true, observe: "events", responseType: "text"}).subscribe(e => {
      if (e instanceof HttpResponse) {
        s.next(e);
        s.complete();
      }
    })
    return s;
  }
}
