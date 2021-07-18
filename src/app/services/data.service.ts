import { Injectable } from '@angular/core';
import { IDateEntry } from '../shared/IDateEntry';
import { IEntry, IEntryKeys } from '../shared/IEntry';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private entries: IEntry[] = [];
  private dateEntries: IDateEntry[] = [];

  constructor() { }

  getEntries(): ReadonlyArray<IEntry> {
    return this.entries;
  }

  getDateEntries(): ReadonlyArray<IDateEntry> {
    return this.dateEntries;
  }

  setup(data: string) {
    console.time('loadData');
    const lines = data.split('\n');
    const entries: { [key: string]: IEntry } = {};
    for (let i = 1; i < lines.length; ++i) {
      const spl = lines[i].split(',');
      const key = this.getKey(spl);
      if (key in entries) {
        entries[key].count++;
      } else {
        const entry: IEntry = {
          notification_date: new Date(spl[0]),
          postcode: parseInt(spl[1]),
          lhd_2010_code: spl[2],
          lhd_2010_name: spl[3],
          lga_code19: parseInt(spl[4]),
          lga_name19: spl[5],
          count: 1
        };
        entries[key] = entry;
      }
    }

    this.entries = Object.values(entries);
    console.timeEnd('loadData');
    this.populateDailyAgg();
  }

  private getKey(spl: string[]) {
    return `${spl[0]}_${spl[1]}`;
  }

  private populateDailyAgg() {
    console.time('populateDateAgg');

    const dateEntries: { [key: number]: IDateEntry } = {};
    for (let entry of this.entries) {
      const v = entry.notification_date.getTime();
      if (v in dateEntries) {
        dateEntries[v].count += entry.count;
      } else {
        dateEntries[v] = {
          date: entry.notification_date,
          count: entry.count
        };
      }
    }

    this.dateEntries = Object.values(dateEntries);

    console.timeEnd('populateDateAgg');
  }


}
