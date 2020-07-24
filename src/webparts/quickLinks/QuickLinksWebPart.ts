import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import * as strings from 'QuickLinksWebPartStrings';
import QuickLinks from './components/QuickLinks';
import { IQuickLinksProps } from './components/IQuickLinksProps';

export interface IQuickLinksWebPartProps {
  listName: string;
  title: string;
  fontSize: string;
  fontFamily: string;
  fontColor: string;
}

export default class QuickLinksWebPart extends BaseClientSideWebPart<IQuickLinksWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IQuickLinksProps> = React.createElement(
      QuickLinks,
      {
        context: this.context,
        listName: this.properties.listName,
        title: this.properties.title,
        fontSize: this.properties.fontSize,
        fontFamily: this.properties.fontFamily,
        fontColor: this.properties.fontColor,
        displayMode: this.displayMode,
        updateTitle: (value: string) => {
          this.properties.title = value;
        }
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('listName', {
                  label: strings.ListName
                }),
                PropertyPaneTextField('fontFamily', {
                  label: strings.FontFamily
                }),
                PropertyPaneTextField('fontColor', {
                  label: strings.FontColor
                }),
                PropertyPaneTextField('fontSize', {
                  label: strings.FontSize
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
