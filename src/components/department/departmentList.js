import React from "react";
import { useHistory } from "react-router-dom";
import {

  Grid,
  IconButton,
  Paper,
  Table,
  Box,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import {
  RemoveRedEye as RemoveRedEyeIcon
} from "@material-ui/icons";
import { getDepartments } from '../../actions/department';
import { getCookie } from '../../actions/auth';
 

const headCells = [
    { id: "department_name", numeric: false, disablePadding: true, label: "Department Name" },

    { id: "View", numeric: true, disablePadding: false, label: "View" },
];

function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow>
        <TableCell>
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
          >
            <TableSortLabel>
              <b>{headCell.label}</b>
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}



function EnhancedTable() {
  const history = useHistory();
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const token = getCookie("token")

  React.useEffect(() => {
     getDepartments(token)
       .then( response => {
         if(response && response.departments){
           let departmentData = response.departments.map((item) => {
             let { department_name, createdAt, _id} = item;
             return {
                _id,
                 department_name,
                 createdAt
             }
           })
           setRows(departmentData)
         }
       })
       .catch((err) => {
         console.log(err)
       })
  }, [])



  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };





  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div>
      <Paper>
        <TableContainer>
          <Table
            size={"small"}
          >
            <EnhancedTableHead />
            <TableBody>
              { rows
                .map((row, index) => {

                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.department_name)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row._id}
                    >
                      <TableCell padding="checkbox">
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                    {row.department_name}
                      </TableCell>

                      <TableCell align="right">
                      <Box mr={0}>
                        <IconButton aria-label="details" onClick={() => history.push(`/employee-detail/${row._id}`)}>
                          <RemoveRedEyeIcon />
                        </IconButton>
                      </Box>
                      </TableCell>

                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 33 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

function AdvancedTable() {
  return (
    <>
    <Grid container justify="center">
      <Grid item xs={12} md={10} sm={10} lg={10}>
        <EnhancedTable />
      </Grid>
    </Grid>
    </>
  );
}

export default AdvancedTable;
