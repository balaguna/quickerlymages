import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  SwipeableDrawer,
  makeStyles
} from '@material-ui/core';
import getInitials from '../../../utils/getInitials';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: 240,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }
}));


const Results = ({ className, customers, orders, ...rest }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [open, setOpen] = useState(false)


  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleSelect = (customer) => {
    setSelectedCustomer(customer)
    setOpen(true)
  }

  return (
    <>
      <Card
        className={clsx(classes.root, className)}
        {...rest}
      >
        <PerfectScrollbar>
          <Box minWidth={1050}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Name
                </TableCell>
                  <TableCell>
                    Email
                </TableCell>
                  <TableCell>
                    Location
                </TableCell>
                  <TableCell>
                    Postal Code
                </TableCell>
                  <TableCell>
                    Phone
                </TableCell>
                  <TableCell>
                    Registration date
                </TableCell>
                </TableRow>
              </TableHead>
              {customers && <TableBody>
                {customers.slice(0, limit).map((customer) => (
                  <TableRow
                    hover
                    onClick={() => handleSelect(customer)}
                    style={{ cursor: 'default' }}
                    key={customer.userEmail}
                  >
                    <TableCell>
                      <Box
                        alignItems="center"
                        display="flex"
                      >
                        <Avatar
                          className={classes.avatar}
                          src={customer.photo}
                        >
                          {getInitials(customer.userName)}
                        </Avatar>
                        <Typography
                          color="textPrimary"
                          variant="body1"
                        >
                          {customer.userName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {customer.userEmail}
                    </TableCell>
                    <TableCell>
                      {customer.userAddress}
                    </TableCell>
                    <TableCell>
                      {customer.userPostalCode}
                    </TableCell>
                    <TableCell>
                      {customer.userContact}
                    </TableCell>
                    <TableCell>
                      {customer.registrationDate}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>}
            </Table>
          </Box>
        </PerfectScrollbar>
        {customers && <TablePagination
          component="div"
          count={customers.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />}
      </Card>
      <SwipeableDrawer open={open} onClose={() => { setSelectedCustomer(null); setOpen(false) }} anchor='right' variant='temporary' >
        <Typography color='secondary' style={{ fontSize: '1.3em', textAlign: 'center', marginTop: '5vh' }} >Orders placed by {selectedCustomer ? selectedCustomer.userName.toUpperCase() : ''}</Typography>
        <Table key={2} size="medium">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          {orders && selectedCustomer && <TableBody>
            {orders.filter(order => order.userEmail === selectedCustomer.userEmail).map((row) => (
              <TableRow hover style={{ cursor: 'pointer' }} key={row._id}>
                {row.deliveryOrder && <TableCell>{row.deliveryOrder}</TableCell>}
                <TableCell>{row.userName}</TableCell>
                <TableCell>{row.userAddress}</TableCell>
                <TableCell>{row.userContact}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>}
        </Table>
      </SwipeableDrawer>
    </>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};



export default Results
