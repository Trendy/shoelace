import { Component, Element, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'sl-table',
  styleUrl: 'table.scss',
  shadow: true
})
export class Table {
  @Element() table: HTMLSlTableElement;

  /** Array of columns, in order */
  @Prop() columns: string[];

  /** The table data */
  @Prop() tableData: any[];

  render() {
    return (
      <Host>
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
      </Host>
    );
  }
}
