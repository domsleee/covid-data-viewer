export interface IEntry {
  notification_date: Date;
  postcode: number;
  lhd_2010_code: string;
  lhd_2010_name: string;
  lga_code19: number;
  lga_name19: string;
  count: number;
}

const sampleEntry: IEntry = {
  notification_date: new Date('2020-01-25'),
  postcode: 2134,
  lhd_2010_code: 'X700',
  lhd_2010_name: 'Sydney',
  lga_code19: 11300,
  lga_name19: 'Burwood (A)',
  count: 1
}

export const IEntryKeys = Object.keys(sampleEntry);