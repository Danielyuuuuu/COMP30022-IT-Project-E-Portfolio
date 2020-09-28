import React from 'react';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Button } from '@material-ui/core';

import Dialogs from "../../components/Dialogs/Dialogs"

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(name, Stock, fat, Price, Options, price) {
  return {
    name,
    Stock,
    fat,
    Price,
    Options,
    price,
    details: { image: 'https://abc.def.com', description: "This item is really nice!" },
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.Stock}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.Price}</TableCell>
        <TableCell align="right">
            {/* {row.Options}  */}
            <Dialogs mode={"Edit"} variant="contained" color="primary"></Dialogs>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell align="right">Description</TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                    <TableRow key={row.details.image}>
                      <TableCell component="th" scope="row">
                        {row.details.image}
                      </TableCell>
                      <TableCell align="right">{row.details.description}</TableCell>
                    
                    </TableRow>
                  
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    Stock: PropTypes.number.isRequired,
    Price: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    details: 
      PropTypes.shape({
        image: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    Options: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

export default function Store() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell><Dialogs mode={"New"} variant="contained" color="Secondary"></Dialogs></TableCell>
            <TableCell>Item </TableCell>
            <TableCell align="right">Stock</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Like</TableCell>
            <TableCell align="right">Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

