import React from "react";
import styled from "styled-components/macro";
import {
  Grid,
  Paper as MuiPaper,
  Table,
  Checkbox,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel
} from "@material-ui/core";

import { spacing } from "@material-ui/system";
import { makeStyles } from '@material-ui/core/styles';

const Paper = styled(MuiPaper)(spacing);


const useStyles = makeStyles((theme) => ({

}));


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {

  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}



const headCells = [
  { id: "Module", alignment: "left", label: "Module" },
  { id: "Read", alignment: "center", label: "Read" },
  { id: "Write", alignment: "center", label: "Write" },
  { id: "Update", alignment: "center", label: "Update" },
  { id: "Delete", alignment: "center", label: "Delete" }
];

function EnhancedTableHead(props) {
  const {
    order,
    orderBy,
    onRequestSort
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignment}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}


function EmployeeList({ permission,  onChangePermission }) {
    const classes = useStyles();
    const [state, setState] = React.useState(permission);
    const modules = Object.entries(state).map(item => ({[item[0]]: item[1]}));
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("customer");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelecteds = [{}, {}].map((n) => n.id);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, modules.length - page * rowsPerPage);

    const handleCheckbox =  (modulex) => type => e => {
      setState({...state, [modulex]: {...state.[modulex], [type]: e.target.checked }});
    }


    React.useEffect(() => {
        onChangePermission(state)
    }, [state])



  return (
    <React.Fragment>
      <Grid container spacing={6} justify="center">
        <Grid item xs={12} md={12} sm={12} lg={12}>
          <Paper>
            <TableContainer>
              <Table
                aria-labelledby="tableTitle"
                size="small"
                aria-label="enhanced table"
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={modules.length}
                />
                <TableBody>
                  {stableSort(modules, getComparator(order, orderBy))
                    .map((row, index) => {
                      const isItemSelected = isSelected(row._id);
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={`${row._id}-${index}`}
                          selected={isItemSelected}
                        >
                        <TableCell align="left">{Object.keys(row)[0]}</TableCell>
                        <TableCell align="center">
                          <Checkbox
                            className="private-checkbox"
                            onChange={handleCheckbox(Object.keys(row)[0])("read")}
                            checked={Object.values(row)[0]['read']}
                            color="primary"
                           />
                        </TableCell>
                        <TableCell align="center">
                         <Checkbox
                           onChange={handleCheckbox(Object.keys(row)[0])("write")}
                           checked={Object.values(row)[0]['write']}
                           color="primary"
                              />
                        </TableCell>
                        <TableCell  align="center">
                          <Checkbox
                            checked={Object.values(row)[0]['update']}
                            onChange={handleCheckbox(Object.keys(row)[0])("update")}
                            color="primary"
                           />
                        </TableCell>
                        <TableCell align="center">
                          <Checkbox
                            onChange={handleCheckbox(Object.keys(row)[0])("delete")}
                            checked={Object.values(row)[0]['delete']}
                            color="primary"
                           />
                        </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 20 * emptyRows }}>
                      <TableCell colSpan={8} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default EmployeeList;
