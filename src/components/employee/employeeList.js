import React from "react";
import styled from "styled-components/macro";
import { Link } from 'react-router-dom';
import {
  Chip,
  Grid,
  Paper as MuiPaper,
  Table,
  TableBody,
  Box,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import {
RemoveRedEye as RemoveRedEyeIcon
} from "@material-ui/icons";
import { spacing } from "@material-ui/system";

const Paper = styled(MuiPaper)(spacing);



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
  { id: "employee_id", alignment: "left", label: "Employee ID" },
  { id: "employee_name", alignment: "left", label: "Employee Name" },
  { id: "department", alignment: "left", label: "Department" },
  { id: "designation", alignment: "left", label: "Designation" },
  { id: "status", alignment: "left", label: "Status" },
  { id: "detail", alignment: "center", label: "Action" },
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



function EnhancedTable({ employees }) {
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
      const newSelecteds = employees.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, employees.length - page * rowsPerPage);

  return (
    <div>
      <Paper>
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={employees.length}
            />
            <TableBody>
              {stableSort(employees, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                    <TableCell align="left">{row.employee_id}</TableCell>
                    <TableCell align="left"><Chip size="small" label={row.full_name} color="primary" /></TableCell>
                    <TableCell align="left"><Chip size="small" label={(row.department && row.department.department_name) || "None"} color="primary" /></TableCell>
                    <TableCell>
                      {(row.designation && row.designation.designation_name.toUpperCase()) || "None"}
                    </TableCell>
                    <TableCell align="left">
                    {
                      row.status === "INVITED" && (<Chip size="small" label={row.status} style={{ background: "rgb(245, 124, 0)", color:"rgb(255, 255, 255)" }} />)
                    }
                    {
                      row.status === "LEFT" && (<Chip size="small" label={row.status} style={{ background: "rgb(244, 67, 54)", color:"rgb(255, 255, 255)" }} />)
                    }
                    {
                      row.status === "JOINED" && (<Chip size="small" label={row.status} style={{ background: "rgb(76, 175, 80)", color:"rgb(255, 255, 255)" }} />)
                    }
                    </TableCell>
                    <TableCell padding="none" align="center">
                      <Box pl={0}>
                        <Link to={`/employee-detail/${row._id}`}>
                          <IconButton aria-label="details">
                            <RemoveRedEyeIcon />
                          </IconButton>
                        </Link>
                      </Box>
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={employees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

function EmployeeList({ employeeList }) {
  return (
    <React.Fragment>
      <Grid container spacing={6} justify="center">
        <Grid item xs={12} md={12} sm={12} lg={12}>
          <EnhancedTable employees={employeeList}/>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default EmployeeList;
