
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";


export class SPService {
  constructor(private _context: WebPartContext | ApplicationCustomizerContext) {
  }

  // Get Daily Needs 
  public async getDailyNeeds(listName: string) {
    try {
      let dailyNeedsListName: string = "Daily Needs";
      let query = "<View Scope='RecursiveAll'><ViewFields><FieldRef Name='Title'/><FieldRef Name='Link'/><FieldRef Name='Target'/></ViewFields><RowLimit>5000</RowLimit></View>";
      let camlQueryPayLoad: any = {
        query: {
          __metadata: { 'type': 'SP.CamlQuery' },
          ViewXml: query
        }
      };
      if (!listName) {
        dailyNeedsListName = listName;
      }
      let spOpts = {
        headers: { 'odata-version': '3.0' },
        body: JSON.stringify(camlQueryPayLoad)
      };
      const records = await this._context.spHttpClient.post(this._context.pageContext.web.absoluteUrl +
        "/_api/web/lists/GetByTitle('" + dailyNeedsListName + "')/GetItems", SPHttpClient.configurations.v1, spOpts);
      let myData = await records.json();
      return myData;
    }
    catch (error) {
      console.dir(error);
      throw error;
    }
  }
}
export default SPService;
