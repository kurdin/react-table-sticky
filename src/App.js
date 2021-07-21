import React from "react";
import styled from "styled-components";
import { useTable, useBlockLayout } from "react-table";
import { useSticky } from "react-table-sticky";

import data, { daysHeaders } from "./makeData";

const Styles = styled.div`
  /* This is required to make the table full-width */
  display: block;
  max-width: 100%;

  padding: 1rem;

  .table {
    border: 1px solid #ddd;

    .tr {
      min-width: 100%;
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }

    .th,
    .td {
      padding: 10px 12px;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
      background-color: #fff;
      text-align: center;
      overflow: hidden;

      :last-child {
        border-right: 0;
      }

      :not([data-sticky-td]) {
        flex-grow: 1;
      }

      .resizer {
        display: inline-block;
        width: 5px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;

        &.isResizing {
          background: red;
        }
      }
    }

    .th.left {
      text-align: left; 
    }

    &.sticky {
      overflow: scroll;
      .header,
      .footer {
        position: sticky;
        z-index: 1;
        width: fit-content;
        min-width: 100%;
      }

      .header {
        top: -0.5px;
        box-shadow: 0px 1px 1px #ccc;
      }

      .footer {
        bottom: 0;
        box-shadow: 0px -1px 1px #ccc;
      }

      .body {
        position: relative;
        z-index: 0;
      }

      [data-sticky-td] {
        position: sticky;
      }

      [data-sticky-last-left-td] {
        box-shadow: 1px 0px 1px #ccc;
      }

      [data-sticky-first-right-td] {
        box-shadow: -1px 0px 1px #ccc;
      }
    }
  }
`;

function Table({ columns, data }) {
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 150,
      width: 150,
      maxWidth: 400
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      defaultColumn
    },
    useBlockLayout,
    useSticky
  );

  return (
    <Styles>
      <div
        {...getTableProps()}
        className="table sticky"
        style={{ height: 650 }}
      >
        <div className="header">
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column) => {
                const classes = !column.parent ? 'th left' : 'th';
                return <div {...column.getHeaderProps()} className={classes}>
                  {column.render("Header")}
                </div>
              })}
            </div>
          ))}
        </div>

        <div {...getTableBodyProps()} className="body">
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <div {...row.getRowProps()} className="tr">
                {row.cells.map((cell) => {
                  return (
                    <div {...cell.getCellProps()} className="td">
                      {cell.render("Cell")}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* <div className="footer">
          {footerGroups.map((footerGroup) => (
            <div {...footerGroup.getHeaderGroupProps()} className="tr">
              {footerGroup.headers.map((column) => (
                <div {...column.getHeaderProps()} className="td">
                  {column.render("Footer")}
                </div>
              ))}
            </div>
          ))}
        </div> */}
      </div>
    </Styles>
  );
}

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Groups",
        sticky: "left",
        columns: [
          {
            Header: "Fixed Group 1",
            accessor: "col1"
          },
          {
            Header: "Fixed Group 2",
            accessor: "col2"
          }
        ]
      },
      ...daysHeaders
    ],
    []
  );

  return <Table columns={columns} data={data} />;
}

export default App;
