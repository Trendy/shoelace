import { Component, Prop, h } from '@stencil/core';

/**
 * @since 2.1
 * @status alpha
 */

@Component({
  tag: 'sl-table',
  styleUrl: 'table.scss',
  shadow: true
})
export class Table {
  @Prop() tableData: any[][];
  @Prop() columns: string[];

  componentWillLoad() {
    this.tableData = [['Hello world', 'Something else', 'even more stuff']];
    this.columns = ['one', 'two', 'three'];
  }

  

  render() {
    return (
      <table>
        <tr>
          {this.columns.map(title => {
            return <th>{title}</th>;
          })}
        </tr>
        {this.tableData.map(row => {
          return (
            <tr>
              {row.map(column => {
                return <td>{column}</td>;
              })}
            </tr>
          );
        })}
      </table>
    );
  }
}
