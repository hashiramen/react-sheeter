import React, { Component } from 'react'

import readXlsxFile from 'read-excel-file' 
import XLSX from 'xlsx'
import ReactSheeter, { sheeterParser } from 'react-sheeter'


export default class App extends Component {
  state = {
    parsedData: []
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
      while ( hasMoreSheets ) {
        const wsname = wb.SheetNames[currentSheet];
        console.log("@NAME: ", wsname)
        if ( typeof wsname !== 'undefined' ) {
          const ws = wb.Sheets[wsname];
          /* Convert array of arrays */
          const data = XLSX.utils.sheet_to_json(ws, {header:1});
          /* Update state */

          const sheeterParsedData = sheeterParser({
            name: wsname,
            rowsData: data
          }, { schema })
          console.log("@PARSED: ", sheeterParsedData)
          console.log("____");
        } else {
          hasMoreSheets = false
        }

        currentSheet++;
      }
		};
    if(rABS) {
      reader.readAsBinaryString(file)
    } else {
      reader.readAsArrayBuffer(file)
    }
  }
}


const make_cols = refstr => {
	let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
	for(var i = 0; i < C; ++i) o[i] = {name:XLSX.utils.encode_col(i), key:i}
	return o;
};

const schema = [
  {
    name: "Sheet2",
    columns: [
      {
        name: "ho",
        mandatory: true,
        type: "string"
      }
    ]
  }
]