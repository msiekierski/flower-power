import {
  alpha,
  AppBar,
  makeStyles,
  Toolbar,
  InputBase,
  MenuItem,
  Popper,
  MenuList,
  Typography,
  Grow,
  Badge,
  TextField,
  Collapse,
  Paper,
  ClickAwayListener,
} from '@material-ui/core';
import { ReactComponent as Logo } from '../../resources/icons/logo.svg';
import SearchIcon from '@material-ui/icons/Search';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useEffect, useRef, useState } from 'react';
import { Theme } from '../../App';
import { useWindowSize } from '../../utils/customHooks/useWindowSize';
import { categories } from '../../utils/constants/Categories';
import { Link } from 'react-router-dom';
import { PERSONAL_DATA } from '../../utils/constants/SettingsMenus';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';
import SearchBar from './SearchBar/SearchBar';
import LocationInput from './LocationInput/LocationInput';
import LocationOnIcon from '@mui/icons-material/LocationOn';

type StyleProps = {
  isSearchFocused: boolean;
};

const useStyles = (props: StyleProps) =>
  makeStyles((theme) => ({
    navigation: {
      margin: '0 1.5%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    iconsPanel: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2.5rem',
      gap: '30%',
    },
    logo: {},
    menuIcon: {
      display: 'none',
    },
    mobileMenu: {
      display: 'flex',
      justifyItems: 'center',
      backgroundColor: `${theme.palette.primary.light}`,
      width: 'calc(100% - 12px)',
      zIndex: 10000,
      border: '2px solid silver',
      borderBottomLeftRadius: '10px',
      borderBottomRightRadius: '10px',
    },
    accountOptions: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    mobileMenuIcon: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    mobileMenuSplit: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      '& h5': {
        marginBottom: '10px',
      },
      margin: '2px 8px',
    },
    location: {
      margin: 'auto',
      position: 'absolute',
      bottom: '-48px',
      right: '100px',
    },
    [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
      iconsPanel: {
        display: 'none',
      },
      navigation: {
        justifyContent: 'space-between',
      },
      logo: {
        display: 'none',
      },
      menuIcon: {
        display: 'block',
      },
    },
    [theme.breakpoints.between(
      theme.breakpoints.values.xs,
      theme.breakpoints.values.md
    )]: {
      menuIcon: {
        display: props.isSearchFocused ? 'none' : 'block',
      },
      logo: {
        display: props.isSearchFocused ? 'none' : 'block',
      },
      search: {
        width: props.isSearchFocused ? '100%' : 'inherit',
      },
      iconsPanel: {
        display: 'none',
      },
      mobileMenu: {
        display: 'block',
      },
      navigation: {
        margin: 0,
      },
    },
    appBar: {
      [theme.breakpoints.down(500)]: {
        '& .MuiToolbar-root': {
          padding: '0 5px',
        },
      },
    },
  }));

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const classes = useStyles({ isSearchFocused })();
  const navRef = useRef<HTMLDivElement | null>(null);
  const locIconRef = useRef<HTMLDivElement | null>(null);
  const [width, height] = useWindowSize();
  const [isLocationShown, setIsLocationShow] = useState<boolean>(false);

  const root = useSelector((root: RootState) => root);
  const { items, bouquets } = root.cart;
  const { location } = root.user;
  const totalQuantity = items
    .map((item) => item.quantity)
    .reduce((acc, quantity) => acc + quantity, 0);
  const totalBouquets = bouquets
    .map((bouquet) => bouquet.quantity)
    .reduce((acc, quantity) => acc + quantity, 0);

  useEffect(() => {
    const { xs, md } = Theme.breakpoints.values;
    if (width < xs || width > md) {
      setIsMenuOpen(false);
    }
  }, [width]);

  return (
    <>
      <AppBar ref={navRef} className={classes.appBar}>
        <Toolbar className={classes.navigation}>
          <Link to="/" className={classes.logo}>
            <Logo style={{ maxWidth: '30vw' }} />
          </Link>
          <SearchBar
            isSearchFocused={isSearchFocused}
            setIsSearchFocused={setIsSearchFocused}
          />

          <div className={classes.iconsPanel}>
            <Badge
              badgeContent={location.city}
              color="secondary"
              onClick={() => setIsLocationShow(!isLocationShown)}
              ref={locIconRef}
              style={{ cursor: 'pointer' }}
            >
              <LocationOnIcon fontSize="inherit" />
            </Badge>

            <Link to={'/settings/' + PERSONAL_DATA}>
              <Badge invisible>
                <PersonOutlineOutlinedIcon fontSize="inherit" />
              </Badge>
            </Link>
            <Link to="/cart">
              <Badge
                badgeContent={totalQuantity + totalBouquets}
                showZero
                color="secondary"
              >
                <ShoppingBasketOutlinedIcon fontSize="inherit" />
              </Badge>
            </Link>
          </div>
          <MenuIcon
            className={classes.menuIcon}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            fontSize="large"
          />
        </Toolbar>
        <Popper
          open={isLocationShown}
          anchorEl={locIconRef.current}
          placement={'bottom'}
          transition
          style={{ zIndex: 30000 }}
        >
          {() => (
            <ClickAwayListener onClickAway={() => setIsLocationShow(false)}>
              <Paper>
                <LocationInput />
              </Paper>
            </ClickAwayListener>
          )}
        </Popper>
      </AppBar>
      <Toolbar />
      <Grow in={isMenuOpen}>
        <Popper
          className={classes.mobileMenu}
          open={true}
          style={{
            top: `${navRef.current?.offsetHeight}px`,
            height: `calc(${height}px - ${navRef.current?.offsetHeight}px - 3px)`,
            margin: '0 4px',
          }}
        >
          <MenuList>
            <div className={classes.accountOptions}>
              <MenuItem>
                <Link
                  to={'/settings/' + PERSONAL_DATA}
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                >
                  <Badge>
                    <div className={classes.mobileMenuIcon}>
                      <PersonOutlineOutlinedIcon
                        fontSize="large"
                        style={{ padding: 0 }}
                      />
                      Profile
                    </div>
                  </Badge>
                </Link>
              </MenuItem>
              <MenuItem style={{ paddingTop: '10px' }}>
                <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
                  <Badge
                    badgeContent={totalQuantity + totalBouquets}
                    color="secondary"
                    showZero
                  >
                    <div className={classes.mobileMenuIcon}>
                      <ShoppingBasketOutlinedIcon fontSize="large" />
                      Cart
                    </div>
                  </Badge>
                </Link>
              </MenuItem>
            </div>
            <hr />
            <div className={classes.mobileMenuSplit}>
              <div>
                <Typography variant="h5">Categories</Typography>
                {categories.slice(0, 5).map((category, index) => {
                  return <MenuItem key={index}>{category}</MenuItem>;
                })}
              </div>
              <div>
                <Typography variant="h5">Tools</Typography>
                {categories.slice(5).map((category, index) => {
                  return <MenuItem key={index}>{category}</MenuItem>;
                })}
              </div>
            </div>
          </MenuList>
        </Popper>
      </Grow>
    </>
  );
};

export default NavBar;
