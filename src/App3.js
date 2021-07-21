import React, { useMemo } from "react";
import styled from "styled-components";
import { useTable, useBlockLayout, usePagination } from "react-table";
import { useSticky } from "react-table-sticky";

import data,  { daysHeaders } from "./makeData";

const Styles = styled.div`
  /* This is required to make the table full-width */
  display: block;
  max-width: 100%;

  padding: 1rem;

  .pagination {
    padding: 0.5rem;
    position: fixed;
    bottom: 5px;
    background: white;
    border: 1px solid #ddd;
    opacity: 0.9;
  }

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
      .header {
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
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 1, pageSize: 15 },
    },
    useSticky,
    useBlockLayout,
    usePagination,
  );

  const RenderRow = useMemo(() => {
    return page.map((row, i) => {
      prepareRow(row)
      return (
        <div {...row.getRowProps()} className="tr">
          {row.cells.map((cell) => {
            // console.log('cell', cell)
            return (
              <div {...cell.getCellProps()} className="td">
                {cell.render("Cell")}
              </div>
            );
          })}
        </div>
      );
    })
  }, [page, prepareRow])

  return (
    <Styles>
      <div
        {...getTableProps()}
        className="table sticky"
        style={{ height: 665 }}
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
          {RenderRow}
        </div>
      </div>
      
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[15, 30, 50, 100, 150, 200, 300].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
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
