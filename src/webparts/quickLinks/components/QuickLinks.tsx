import * as React from 'react';
import styles from './QuickLinks.module.scss';
import { IQuickLinksProps } from './IQuickLinksProps';
import { IQuickLinksState, Ioption } from './IQuickLinksState';
import SPService from '../services/SPService';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";

export default class QuickLinks extends React.Component<IQuickLinksProps, IQuickLinksState> {
  private _spServices: SPService;
  constructor(props: IQuickLinksProps) {
    super(props);
    this._spServices = new SPService(this.props.context);
    this.state = { quickLinks: [] }
    this.handleChange = this.handleChange.bind(this);
  }

  public async componentDidMount() {
    this._getvalues();
  }
  private async _getvalues() {
    let items: Ioption[] = [];
    this._spServices.getQuickLinks(this.props.listName).then((responseJSON) => {
      if (responseJSON != null && responseJSON["value"] != null) {
        let listItems = responseJSON.value;
        for (const item of listItems) {
          items.push({ value: item.Link.Url, label: item.Title, open: item.Target });
        }
        this.setState(
          {
            quickLinks: items
          });
      }
    }).catch(err => console.error(err));
  }

  private handleChange = (selected) => {
    let url: string = selected.target.attributes.getNamedItem('data-url').value;
    let urlType = selected.target.attributes.value;
    if (urlType.value == "Automatic") {
      let siteUrl: string = window.location.hostname;
      let count: number = url.indexOf(siteUrl);
      if (count > 0) {
        window.location.href = url;
      }
      else {
        window.open(url);
      }
    }
    else if (urlType.value === "New Window") {
      window.open(url);
    }
    else if (urlType.value === "Same Window") {
      window.location.href = url;
    }
  }

  public render(): React.ReactElement<IQuickLinksProps> {
    let quickLinks = this.state.quickLinks;
    const itemStyle = {
      "cursor": "pointer",
      "font-size": this.props.fontSize != '' ? this.props.fontSize : "20px",
      "padding-bottom": "5px",
      "word-wrap": "break-word",
      "width": "250px",
      "font-family": this.props.fontFamily != '' ? this.props.fontFamily : "Arial, Helvetica, sans-serif",
      "color": this.props.fontColor != '' ? this.props.fontColor : "steelblue"
    }
    return (
      <div className={styles.quickLinks} >
        <div className={styles.container}>
          <WebPartTitle displayMode={this.props.displayMode}
            title={this.props.title}
            updateProperty={this.props.updateTitle} />
          <div className={styles.row}>
            <ul>
              {this.state.quickLinks.map((quickLink, i) => {
                return (
                  <li style={itemStyle} onClick={this.handleChange} data-url={quickLink.value} value={quickLink.open}>{quickLink.label}</li>
                );
              })}
            </ul>
          </div>
        </div>
      </div >
    );
  }
}
