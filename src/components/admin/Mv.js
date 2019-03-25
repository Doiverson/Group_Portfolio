import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Button from '@material-ui/core/Button';
import Moon from '../.././connection/Moon';
import { Link } from "react-router-dom";

const moon = new Moon();

// let counter = 0;
// function createData(balance, authID, phoneNumber, email, coverAreas, coverCities) {
//     counter += 1;

//     return { id: counter, balance, authID, phoneNumber, email, coverAreas, coverCities};
// }

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}//ソート関数

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}//ソート関数

const rows = [
    
    { id: 'authID', numeric: false, disablePadding: true, label: 'ID' },
    { id: 'companyName', numeric: false, disablePadding: false, label: 'COMPANY' },
    { id: 'phoneNumber', numeric: false, disablePadding: false, label: 'PHONE' },
    { id: 'email', numeric: false, disablePadding: false, label: 'E-MAIL' },
    { id: 'coverAreas', numeric: false, disablePadding: false, label: 'COVERAREA' },
    { id: 'coverCities', numeric: false, disablePadding: false, label: 'COVERCITIES' }, 
    { id: 'balance', numeric: false, disablePadding: false, label: 'BALANCE' },
    { id: 'invoice', numeric: false, disablePadding: false, label: 'INVOICE' }, 
    { id: 'moreInfo', numeric: false, disablePadding: false, label: 'MOREINFO' }, 
];//テーブルラベルの型

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {rows.map(
                        row => (
                            <TableCell
                                key={row.id}
                                align={row.numeric ? 'right' : 'left'}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        ),
                        this,
                    )}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});

let EnhancedTableToolbar = props => {
    const { numSelected, classes } = props;

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subtitle1">
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography variant="h6" id="tableTitle">
                        COMPANY's INFO (ALL)
                    </Typography>
                )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton aria-label="Delete">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton aria-label="Filter list">
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </div>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class EnhancedTable extends React.Component {
    state = {
        order: 'asc',
        orderBy: '',
        selected: [],
        data: [],
        page: 0,
        rowsPerPage: 5,
    };

    componentWillMount() {
       
        moon
            .get('api/company/all')
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {

                    // console.log("aaaaaa"+res.data[1].paymentInfo.currentBalance.toString());
                    this.setState({data:res.data})
                    console.log('😍😍😍' + JSON.stringify(this.state.data))

                    // this.setState({ data: [createData(this.state.data.concat([res.data[i].id],[res.data[i].fullName]))]});

                    // this.setState({ data: this.state.data.concat([createData(
                    //     [res.data[i].paymentInfo.currentBalance],
                    //     [res.data[i].authID],
                    //     [res.data[i].phoneNumber],
                    //     [res.data[i].email],
                    //     [res.data[i].coverAreas.map(cityname=>(cityname.areaID.name))],
                    //     [res.data[i].coverCities.map(cityname=>(cityname.cityID.city))],
                    // )])});

                    // ！！このページではcreateDataの関数を使用しなくなったので上記不要、代わりに下のsetstateを使用
                }
                console.log("data[] is :"+ JSON.stringify(this.state.data));
            })
            .catch(err => {
                console.log(JSON.stringify(err));
            })
    }


    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({ selected: state.data.map(n => n.id) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;


    render() {
        const { classes } = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {stableSort(data, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((n,i)=> {
                                   
                                    if(i==0){console.log("😓 n => "+JSON.stringify(n));}
                                    if(n){console.log("😓 i => "+i);}
                                    if(n.length){console.log("😓 n.length => "+n.length);}
                                    if(n.balance){console.log("😓 n.balance => "+n.paymentInfo);}
                                    if(n.authID){console.log("😓 n.authID => "+n.authID);}
                                    if(n.phoneNumber){console.log("😓 n.phoneNumber => "+n.phoneNumber);}
                                    if(n.email){console.log("😓 n.email => "+n.email);}
                                    if(n.coverAreas){
                                        console.log("😓 n.areaName => "+JSON.stringify(n.coverAreas.map(coverArea => coverArea.areaID.name)))
                                    }
                                    if(n.coverCities){
                                        console.log("😓 n.coverCities => "+JSON.stringify(n.coverCities.map(coverCity => coverCity.cityID.city)))
                                    }
                                  
                                    const isSelected = this.isSelected(n.id);

                                    return (
                                        //一人分の型を作る（データは入っていない）
                                        <TableRow
                                            hover
                                            onClick={event => this.handleClick(event, n.id)}
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.id}
                                            selected={isSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={isSelected} />
                                            </TableCell>
                                            <TableCell component="th" scope="row" padding="none">{n.authID}</TableCell>
                                            <TableCell align="left">{n.companyName}</TableCell>
                                            <TableCell align="left">{n.phoneNumber}</TableCell>
                                            <TableCell align="left">{n.email}</TableCell>
                                            <TableCell align="left">{n.coverAreas.map(coverArea => coverArea.areaID.name)}</TableCell>
                                            <TableCell align="left">{n.coverCities.map(coverCity => coverCity.cityID.city)}</TableCell>
                                            <TableCell align="left">{n.paymentInfo.currentBalance}</TableCell>
                                            <TableCell align="left"> 
                                                <Link to="/invoice">
                                                    <button type="button">
                                                        INVOICE
                                                    </button>
                                                </Link>
                                            </TableCell>
                                            <TableCell align="left"> 
                                                <Link to="/moreinfo">
                                                    <button type="button">
                                                        MOREINFO
                                                    </button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
