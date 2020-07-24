import { DisplayMode } from '@microsoft/sp-core-library';
export interface IQuickLinksProps {
  context: any;
  listName: string;
  fontSize: string;
  fontFamily: string;
  fontColor: string;
  title: string;
  displayMode: DisplayMode;
  updateTitle: (value: string) => void;
}
