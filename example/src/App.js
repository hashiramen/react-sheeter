import React, { Component } from 'react'

import readXlsxFile from 'read-excel-file' 
import XLSX from 'xlsx'
import ReactSheeter, { sheeterParser, Sheet, ISheetDefinition } from 'react-sheeter'


export default class App extends Component {
  state = {
    parsedData: []
  }

  componentDidMount() {
    console.log(schema);
  }
  
  render () {
    return (
      <div>
        <p>Example app</p>
        <input type="file" name="xlsxFile" onChange={this.handleFileXlsxChange}/>
        <ReactSheeter data={this.state.parsedData}/>
      </div>
    )
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
          parsedData.push(sheeterParsedData);
        } else {
          hasMoreSheets = false
        }

        currentSheet++;
      }
      
      console.log(parsedData);
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
    .addColumn("id", "boolean", true, true)
    .addColumn("column2", "string", false, true)
    .addColumn("column3", "date", true, true)
    .addColumn("column4", "number", true, true)
    .addColumn("column5", "currency", true, true),
  new Sheet("Sheet2")
    .addColumn("ho", "string", true, true)
]