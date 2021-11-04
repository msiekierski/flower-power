import {
  CardActionArea,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux/cart';
import AddCartItemDialog from '../AddCartItemDialog/AddCartItemDialog';
import { FlowerShopProduct, ProductCategory } from '../../common/types';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import Carousel from 'react-material-ui-carousel';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    rowGap: '10px',
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    maxWidth: '150px',
    maxHeight: '300px',
  },
  addIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: '5px',
    cursor: 'pointer',
  },
}));

const item = {
  productId: '4123213',
  productImageUrl:
    'https://www.ikea.com/nl/en/images/products/smycka-artificial-flower-rose-red__0636963_pe698124_s5.jpg',
  itemDescription: 'description',
  storeName: 'Shop 1',
  itemPrice: 7.99,
  quantity: 1,
};

const flowerShopProduct: FlowerShopProduct = {
  imageUrl:
    'https://www.ikea.com/nl/en/images/products/smycka-artificial-flower-rose-red__0636963_pe698124_s5.jpg',
  productId: '4123213',
  price: 7.99,
  description: 'description',
  category: ProductCategory.BUNCH,
};

type Props = {
  shopItems: Array<FlowerShopProduct>;
};

const FlowerShopItemCard: React.FC<Props> = ({ shopItems }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { addItem } = bindActionCreators(actionCreators, dispatch);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const getDetails = (item: FlowerShopProduct) => {
    if (item.subcategory === 'Flowers') {
      return `(${item.color})`;
    } else if (item.subcategory === 'Bunches') {
      return `(${item.size})`;
    }
  };

  const handleAddClick = () => {
    addItem(item);
    setIsDialogOpen(true);
  };

  return (
    <>
      <div className={classes.mainContainer}>
        <Carousel indicators={false} autoPlay={false}>
          {shopItems.map((item, index) => (
            <>
              <AddCartItemDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                product={flowerShopProduct}
              />

              <CardActionArea className={classes.item}>
                <CardMedia
                  component="img"
                  image="https://www.ikea.com/nl/en/images/products/smycka-artificial-flower-rose-red__0636963_pe698124_s5.jpg"
                  alt="alt"
                />
                <Typography style={{ fontWeight: 'bold' }} align="center">
                  {item.description}
                </Typography>
                <Typography align="center"> {getDetails(item)}</Typography>
                <Typography style={{ color: 'green' }}>
                  {item.price} PLN
                </Typography>
              </CardActionArea>
            </>
          ))}
        </Carousel>
        <div className={classes.addIcon} onClick={() => handleAddClick()}>
          <ShoppingBasketOutlinedIcon />
          <Typography style={{ fontWeight: 'bold' }}>Add</Typography>
        </div>
      </div>
    </>
  );
};

export default FlowerShopItemCard;
