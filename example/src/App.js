import React, { Component } from 'react'

import readXlsxFile from 'read-excel-file' 
import ReactSheeter, { sheeterParser } from 'react-sheeter'


export default class App extends Component {
  state = {
    parsedData: []
  }
  
  render () {
    return (
      <div>
        <p>Example app</p>
        <input type="file" name="xlsxFile" onChange={this.handleFileChange}/>
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
}
