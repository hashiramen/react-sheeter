import React, { Component } from 'react'

import readXlsxFile from 'read-excel-file' 
import XLSX from 'xlsx'
import ReactSheeter, { sheeterParser, Sheet, ISheetDefinition } from 'react-sheeter'


export default class App extends Component {
  state = {
    parsedData: []
  }
  
  render () {
    return (
      <div>
        <p>Example app</p>
        <input type="file" name="xlsxFile" onChange={this.handleFileXlsxChange}/>
        <div style={{ maxWidth: "90%", margin: "auto"}}>
          <ReactSheeter data={this.state.parsedData} handleSheetsUpdate={this.handleSheetsUpdate}/>
        </div>
      </div>
    )
  }

  handleSheetsUpdate = ( _updatedSheets ) => {
    this.setState({
      parsedData: _updatedSheets
    })
  }

  handleFileChange = (e) => {
    const file = e.target.files[0]
    readXlsxFile(file).then( (rows) => {
      const parsedData = sheeterParser(rows)
      this.setState({ parsedData })
    })
  }

  handleFileXlsxChange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader();
		const rABS = !!reader.readAsBinaryString;
		reader.onload = (e) => {
			/* Parse data */
			const bstr = e.target.result;
			const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array'});
      /* Get first worksheet */
      let hasMoreSheets = true;
      let currentSheet = 0
      const parsedData: ISheetDefinition[] = []
      while ( hasMoreSheets ) {
        const wsname = wb.SheetNames[currentSheet];
        if ( typeof wsname !== 'undefined' ) {
          const ws = wb.Sheets[wsname];
          /* Convert array of arrays */
          const data = XLSX.utils.sheet_to_json(ws, {header:1});
          /* Update state */

          const sheeterParsedData = sheeterParser({
            name: wsname,
            rowsData: data
          }, { schema })
          if(typeof sheeterParsedData !== 'undefined')
            parsedData.push(sheeterParsedData);
        } else {
          hasMoreSheets = false
        }

        currentSheet++;
      }
      
      this.setState({ parsedData })
		};
    if(rABS) {
      reader.readAsBinaryString(file)
    } else {
      reader.readAsArrayBuffer(file)
    }
  }
}


// const make_cols = refstr => {
// 	let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
// 	for(var i = 0; i < C; ++i) o[i] = {name:XLSX.utils.encode_col(i), key:i}
// 	return o;
// };



const schema = [
  new Sheet("Sheet1")
    .addColumn("key", "key", [], 1)
    .addColumn("id", "number", true, true, [
      ( value ) => {
        if( parseInt(value) !== 1 )
          return {
            errorMessage: "This value should be equal to 1",
            isValid: false,
          }

          return {
            errorMessage: "",
            isValid: true,
          }
      }
    ])
    .addColumn("column2", "string")
    .addColumn("column3", "date")
    .addColumn("column4", "number")
    .addColumn("column5", "currency"),
  new Sheet("Sheet3")
    .addColumn("refKey", "refKey", [], 2, "Sheet1", "key")
    .addColumn("key", "key", [], 1)
    .addColumn("last_name", "string")
    .addColumn("id", "number")
    .addColumn("first_named", "string")
    .addColumn("email", "string")
    .addColumn("gender", "string")
    .addColumn("ip_address", "string"),
  new Sheet("ReferenceSheet")
    .addColumn("refKey", "refKey", [], 2, "Sheet3", "key")
    .addColumn("partner", "string")
    .addColumn("something", "string"),
  new Sheet("Leneo")
    .addColumn("Restværdi", "key", [], 1)
    .addColumn("Refference", "refKey", [], 2, "Leneo", "Restværdi")
]