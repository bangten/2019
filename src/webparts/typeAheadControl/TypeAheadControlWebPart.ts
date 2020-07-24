import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'TypeAheadControlWebPartStrings';
import TypeAheadControl from './components/TypeAheadControl';
import { ITypeAheadControlProps } from './components/ITypeAheadControlProps';

export interface ITypeAheadControlWebPartProps {
  listName: string;
  placeHolder: string;
}

export default class TypeAheadControlWebPart extends BaseClientSideWebPart<ITypeAheadControlWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ITypeAheadControlProps> = React.createElement(
      TypeAheadControl,
      {
        context: this.context,
        listName: this.properties.listName,
        placeHolder: this.properties.placeHolder       
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
                PropertyPaneTextField('placeHolder', {
                  label: strings.PlaceHolder
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
