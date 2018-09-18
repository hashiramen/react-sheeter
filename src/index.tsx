/**
 * @class ExampleComponent
 */

import * as React from 'react'

import styles from './styles.css'
import ReactSheeter from './components/ReactSheeter';

export interface IReactSheeterContainerProps {
  data: any[]
}

export default class ReactSheeterContainer extends React.Component<IReactSheeterContainerProps> {
  render() {
    return (
      <div className={styles.reactSheeter}>
        <ReactSheeter 
          data={data}
        />
      </div>
    )
  }
}


const data = [
    {
      sheet: "Customer",
      columns: [
        {
          name: "name",
          type: "boolean",
          checks: [
            (value: any) => value !== 1
          ]
        },
        {
          name: "email",
          type: "string"
        },
        {
          name: "phone",
          type: "number"
        }
      ],
      rows: [
        {
          data: [
            {
              value: false,
              parent: "name"
            }
          ]
        }
      ]
    }
]