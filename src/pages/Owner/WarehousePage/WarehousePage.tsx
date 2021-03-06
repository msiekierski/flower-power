import {
  Backdrop,
  CircularProgress,
  IconButton,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import StoreSelector from '../../../components/Owner/StoreSelector/StoreSelector';
import SearchIcon from '@material-ui/icons/Search';
import SortingSelector from './SortingSelector/SortingSelector';
import { GrAddCircle } from 'react-icons/gr';
import { FaRegEdit } from 'react-icons/fa';
import ProductTable from './ProductTable/ProductTable';
import { FiTrash } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/root-reducer';
import ErrorPage from '../../ErrorPage/ErrorPage';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../redux/warehouse';
import AddNewProductModal from './AddNewProductModal/AddNewProductModal';
import { WarehouseItem } from '../../../common/types';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(3),
  },
  pageContent: {
    display: 'inline-grid',
    gridTemplateColumns: '2fr 5fr',
    marginTop: theme.spacing(6),
    position: 'absolute',
    left: '16px',
    justifyContent: 'space-between',
  },
  filters: {
    paddingRight: '5vw',
    borderRight: '1px solid',
    borderRightColor: theme.palette.divider,
    height: 'auto',
  },
  panel: { margin: '0 2.5vw' },
  tableOptions: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '10px',
  },
  iconText: {
    display: 'flex',
    gap: '10px',
    cursor: 'pointer',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedItemsOptions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    justifyContent: 'flex-start',
    alignItems: 'start',
  },
}));

const WarehousePage = () => {
  const classes = useStyles();
  const { isLoading, isError, items } = useSelector(
    (root: RootState) => root.warehouse
  );
  const dispatch = useDispatch();
  const { fetchData, removeSelected } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [searchInput, setSearchInput] = useState<string>('');

  const filterItems = (): Array<WarehouseItem> => {
    let filteredItems = items;
    filteredItems = filteredItems.filter((item) =>
      item.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    return filteredItems;
  };

  return (
    <>
      <AddNewProductModal
        isShown={showAddProductModal}
        onClose={() => setShowAddProductModal(false)}
      />
      <div className={classes.header}>
        <Typography variant="h4" style={{ fontWeight: 'bold' }}>
          OWNER'S DASHBOARD - WAREHOUSE
        </Typography>
        <StoreSelector />
      </div>
      <div className={classes.pageContent}>
        <div className={classes.filters}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae,
          tempore adipisci quidem culpa eum magni laborum odit. Adipisci aliquam
          numquam pariatur qui nostrum illum rem! Consequatur pariatur aliquid
          nam nostrum facere dolore. Sequi quam mollitia, labore doloremque
          laudantium iusto illo quis cupiditate culpa ut iste suscipit impedit.
          Ea, dicta eius.
        </div>
        <div className={classes.panel}>
          <div className={classes.tableOptions}>
            <TextField
              variant="outlined"
              color="secondary"
              value={searchInput}
              onChange={(e: any) => setSearchInput(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <SortingSelector />
            <div
              className={classes.iconText}
              onClick={() => setShowAddProductModal(true)}
            >
              <GrAddCircle size="2rem" />
              <Typography variant="h6">Add&nbsp;new</Typography>
            </div>
            <div className={classes.selectedItemsOptions}>
              <div className={classes.iconText}>
                <FaRegEdit size="2rem" />
                <Typography variant="h6">Edit&nbsp;Selected</Typography>
              </div>
              <div
                className={classes.iconText}
                onClick={() => removeSelected()}
              >
                <FiTrash size="2rem" />
                <Typography variant="h6">Remove&nbsp;Selected</Typography>
              </div>
            </div>
            <ProductTable items={filterItems()} />
          </div>
        </div>
      </div>
    </>
  );
};

export default WarehousePage;
