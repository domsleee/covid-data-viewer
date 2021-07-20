import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColumnMode, TableColumn } from '@swimlane/ngx-datatable';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { WrappedDatePipe } from 'src/app/pipes/wrapped-date.pipe';
import { DataViewerService } from 'src/app/services/data-viewer.service';
import { DataService } from 'src/app/services/data.service';
import { getOffsetString } from 'src/app/shared/date';
import { IDateEntry } from 'src/app/shared/IDateEntry';
import { IEntry, IEntryKeys } from 'src/app/shared/IEntry';
import { Route } from 'src/app/shared/route';


@Component({
  selector: 'app-data-viewer',
  templateUrl: './data-viewer.component.html',
  styleUrls: ['./data-viewer.component.sass']
})
export class DataViewerComponent implements OnInit, OnDestroy {
  setupDone = false;
  setupDoneSubscription!: Subscription;
  columnMode = ColumnMode.force;
  activeRoute!: Observable<string>;
  dateOffset = getOffsetString();

  entries: Array<IEntry> = [];
  entryColumns: Array<TableColumn> = [{ prop: 'notification_date', pipe: new WrappedDatePipe('yyyy-MM-dd') }, { name: 'postcode' }, { name: 'count' }];

  dateEntries: Array<IDateEntry> = [];
  dateEntryColumns: Array<TableColumn> = [{ prop: 'date', pipe: new WrappedDatePipe('yyyy-MM-dd') }, { name: 'count' }];

  aggregateRoute = Route.AGGREGATE;
  dataSource = "https://data.nsw.gov.au/data/dataset/covid-19-cases-by-location";
  lastUpdated: Date|null = null;

  constructor(
    private dataViewerService: DataViewerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activeRoute = this.route.url.pipe(map(t => t.toString()));
    this.dataViewerService.init();
    this.setupDoneSubscription = this.dataViewerService.getSetupDoneObservable().subscribe(() => {
      this.entries = [...this.dataViewerService.getEntries()];
      this.dateEntries = [...this.dataViewerService.getDateEntries()];
      this.lastUpdated = this.dataViewerService.getLastUpdateDate();

      this.setupDone = true;
    });
  }

  ngOnDestroy() {
    this.setupDoneSubscription.unsubscribe();
  }
}

function getWrappedPipe() {
  
}
