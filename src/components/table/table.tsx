import { Component, Element, Event, Host, Prop, h, EventEmitter, State } from '@stencil/core';
import { SortOrder, SupportedTypes } from './table.enums';

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

  /** The column to sort by initially, defaults to the first column */
  @Prop() sortBy: string;

  /** Sort order, ASC/DESC */
  @Prop() sortOrder: SortOrder = SortOrder.ASC;

  /** Overrides the default sorting functionality with a custom sort function */
  @Prop() customSortFunction: any;

  /** Sorted table data */
  @State() sortedTableData: any[];

  /** Emitted before sorting occurs */
  @Event() beforeSort: EventEmitter;

  /** Emitted after sorting occurs */
  @Event() afterSort: EventEmitter;

  componentWillLoad() {
    //default to first column for sort if sortBy prop isn't provided
    this.sortBy = this.sortBy || this.columns[0];

    this.sortedTableData = [...this.sortTable(this.sortBy, this.sortOrder)];
  }

  sortTable(key: string, sortOrder: SortOrder = SortOrder.ASC): any[] {
    const keyType = this.getTypeForValue(this.tableData[0][key]);

    switch (keyType) {
      case SupportedTypes.DATE:
        return this.dateSort(key, sortOrder);
      case SupportedTypes.NUMBER:
        return this.numberSort(key, sortOrder);
      case SupportedTypes.STRING:
        return this.stringSort(key, sortOrder);
    }
  }

  stringSort(a, b) {
    return this.tableData;
  }

  numberSort(a, b) {
    return this.tableData;
  }

  dateSort(key, sortOrder) {
    return this.tableData;
  }

  getTypeForValue(value) {
    return Object.prototype.toString.call(value).match(/[^\[object ](\w*)[^\]]/g);
  }

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
