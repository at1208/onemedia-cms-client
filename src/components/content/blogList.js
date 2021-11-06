
import React from "react";
import styled from "styled-components/macro";
import { useHistory } from 'react-router-dom';

import {
  Box,
  Chip,
  Grid,
  IconButton,
  Typography,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from "@material-ui/core";

import {
  RemoveRedEye as RemoveRedEyeIcon,
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
  { id: "title", alignment: "left", label: "Blog Title" },
  { id: "task_id", alignment: "left", label: "Task ID" },
  { id: "status", alignment: "left", label: "Status" },
  { id: "approval", alignment: "left", label: "Approval Status" },
  { id: "domain", alignment: "left", label: "Domain" },
  { id: "postedBy", alignment: "right", label: "Posted By" },
  { id: "detail", alignment: "right", label: "Detail" },
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



function EnhancedTable({ blogs }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("customer");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const history = useHistory();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = blogs.map((n) => n.id);
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
    rowsPerPage - Math.min(rowsPerPage, blogs.length - page * rowsPerPage);

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
              rowCount={blogs.length}
            />
              {blogs.length === 0?<Box p={2}><Typography variant="h5">No Blog found</Typography></Box>:
            <TableBody>
              {stableSort(blogs, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);


                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={`${row.title}-${index}`}
                      selected={isItemSelected}
                    >
                      <TableCell align="left">{row.title}</TableCell>
                      <TableCell align="left">{row.task && row.task.task_id}</TableCell>

                      <TableCell align="left">
                      {
                        row.status === true && (<Chip size="small" label={"ACTIVE"} style={{ background: "rgb(76, 175, 80)", color:"rgb(255, 255, 255)" }} />)
                      }
                      {
                        row.status === false && (<Chip size="small" label={"INACTIVE"} style={{ background: "rgb(244, 67, 54)", color:"rgb(255, 255, 255)" }} />)
                      }
                      </TableCell>
                      <TableCell align="left">
                      {
                        row.approval === "WAITING" && (<Chip size="small" label={row.approval} style={{ background: "rgb(245, 124, 0)", color:"rgb(255, 255, 255)" }} />)
                      }
                      {
                        row.approval === "APPROVED" && (<Chip size="small" label={row.approval} style={{ background: "rgb(76, 175, 80)", color:"rgb(255, 255, 255)" }} />)
                      }
                      {
                        row.approval === "NOT APPROVED" && (<Chip size="small" label={row.approval} style={{ background: "rgb(244, 67, 54)", color:"rgb(255, 255, 255)" }} />)
                      }
                      </TableCell>
                      <TableCell align="left">{ (row.domain && row.domain.name) || "Deleted"}</TableCell>
                      <TableCell align="right">{(row.postedBy && row.postedBy.full_name) || "Deleted user"}</TableCell>
                      <TableCell padding="none" align="right">
                        <Box mr={2}>
                          <IconButton aria-label="details" onClick={() => history.push(`/content/blog/detail/${row._id}`)}>
                            <RemoveRedEyeIcon />
                          </IconButton>
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
            </TableBody>}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={blogs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

function BlogListing({ blogs }) {
  return (
    <React.Fragment>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <EnhancedTable blogs={blogs}/>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default BlogListing;
