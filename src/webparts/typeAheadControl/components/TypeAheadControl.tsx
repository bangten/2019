import * as React from 'react';
import styles from './TypeAheadControl.module.scss';
import { ITypeAheadControlProps } from './ITypeAheadControlProps';
import { ITypeAheadControlState, Ioption } from './ITypeAheadControlState';
import SPService from '../services/SPService';
import Select from 'react-select-plus';
//import Select from 'react-select';
import 'react-select-plus/dist/react-select-plus.css';

export default class TypeAheadControl extends React.Component<ITypeAheadControlProps, ITypeAheadControlState> {
  private _spServices: SPService;
  constructor(props: ITypeAheadControlProps) {
    super(props);
    this._spServices = new SPService(this.props.context);
    this.state = { selected: [], multiValue: undefined }
    this.handleChange = this.handleChange.bind(this);
  }

  private handleChange = (selected) => {
    if (selected.open == "Automatic") {
      let url: string = window.location.hostname;
      let count: number = selected.value.indexOf(url);
      if (count > 0) {
        window.location.href = selected.value;
      }
      else {
        window.open(selected.value);
      }
    }
    else if (selected.open == "New Window") {
      window.open(selected.value);
    }
    else if (selected.open == "Same Window") {
      window.location.href = selected.value;
    }
  }

  public async componentDidMount() {
    this._getvalues();
  }
  private async _getvalues() {
    let items: Ioption[] = [];
    this._spServices.getDailyNeeds(this.props.listName).then((responseJSON) => {
      if (responseJSON != null && responseJSON["value"] != null) {
        let listItems = responseJSON.value;
        for (const item of listItems) {
          items.push({ value: item.Link.Url, label: item.Title, open: item.Target });
        }
        this.setState(
          {
            selected: items
          });
      }
    }).catch(err => console.error(err));
  }

  public render(): React.ReactElement<ITypeAheadControlProps> {
    const { selected } = this.state;
    let placeHolderText = this.props.placeHolder != '' ? this.props.placeHolder : "Daily Needs....";
    return (
      <div className={styles.typeAheadControl} >
        <div className={styles.container}>
          <Select
            options={this.state.selected}
            onChange={this.handleChange}
            value={this.state.multiValue}
            placeholder={placeHolderText}
            matchProp='label'
          />
        </div>
      </div >
    );
  }
}
