export class DropdownValueExtended implements DropdownValue {
  key: any;
  value: any;
  constructor(key: any, value: any) {
    this.key = key;
    this.value = value;
  }
}
export interface DropdownValue {
  key: any;
  value: any;
}
