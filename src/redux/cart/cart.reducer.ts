import { CartBouquet, CartProduct } from '../../common/types';
import { ActionType } from './action.types';
import { Action } from './cart.actions';

export type Cart = {
  items: Array<CartProduct>;
  bouquets: Array<CartBouquet>;
};

const initialState: Cart = {
  items: [],
  bouquets: [],
};

const reducer = (state: Cart = initialState, action: Action): Cart => {
  if (action.type === ActionType.REMOVE_ITEM) {
    return {
      ...state,
      items: state.items.filter((item) => item.productId != action.payload),
    };
  }
  if (action.type === ActionType.INCREASE_QUANTITY) {
    const tempItems = state.items.map((item) => {
      if (item.productId == action.payload) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    return { ...state, items: tempItems };
  }
  if (action.type === ActionType.DECREASE_QUANTITY) {
    const item = state.items.find((item) => item.productId == action.payload);
    if (item?.quantity === 1) {
      return {
        ...state,
        items: state.items.filter((item) => item.productId != action.payload),
      };
    }
    return {
      ...state,
      items: state.items.map((item) => {
        if (item.productId == action.payload) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }),
    };
  }
  if (action.type === ActionType.CLEAR_CART) {
    return { ...state, items: [], bouquets: [] };
  }
  if (action.type === ActionType.ADD_ITEM) {
    const { productId, storeName } = action.payload;
    const itemIndex = state.items.findIndex(
      (item) => item.productId == productId && item.storeName == storeName
    );

    if (itemIndex >= 0) {
      return {
        ...state,
        items: state.items.map((item, index) => {
          if (index == itemIndex)
            return { ...item, quantity: item.quantity + 1 };
          return item;
        }),
      };
    }

    return { ...state, items: [...state.items, action.payload] };
  }
  if (action.type === ActionType.SET_ARBITRARY_VALUE) {
    return {
      ...state,
      items: state.items.map((item) => {
        if (item.productId == action.payload.id) {
          return { ...item, quantity: action.payload.value };
        } else {
          return item;
        }
      }),
    };
  }
  if (action.type === ActionType.ADD_BOUQUET) {
    return { ...state, bouquets: [...state.bouquets, action.payload] };
  }
  if (action.type === ActionType.REMOVE_BOUQUET) {
    return {
      ...state,
      bouquets: state.bouquets.filter(
        (bouquet) => bouquet.bouquetId !== action.payload
      ),
    };
  }
  if (action.type === ActionType.SET_BOUQUET_QUANTITY) {
    const index = state.bouquets.findIndex(
      (bouquet) => bouquet.bouquetId === action.payload.id
    );
    if (index < 0) {
      return state;
    }
    if (action.payload.quantity <= 0) {
      return {
        ...state,
        bouquets: state.bouquets.filter(
          (bouquet) => bouquet.bouquetId !== action.payload.id
        ),
      };
    }
    return {
      ...state,
      bouquets: state.bouquets.map((bouquet) => {
        if (bouquet.bouquetId === action.payload.id) {
          return { ...bouquet, quantity: action.payload.quantity };
        } else {
          return bouquet;
        }
      }),
    };
  }
  return state;
};

export default reducer;
