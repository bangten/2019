export interface ITypeAheadControlState {
  selected: Ioption[];
  multiValue: Ioption[];
}
export interface Ioption {
  value: string;
  label: string;
  open: string;
}