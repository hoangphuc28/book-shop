'use client';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { CartItems } from '../interfaces/cart';
import { Promotion } from '../interfaces/promotion';
import { useMutation, useQuery } from '@apollo/client';
import {
  getPromotion,
  getCart,
  updateCart as updateCartQuery,
  clearCart,
} from '../api/graphQL/query';
import { CheckPromotionLevel } from '../checkLevelPromotion';

export const OrderContext = createContext<{
  cart: CartItems[];
  setCart: Dispatch<SetStateAction<CartItems[]>>;
  promotions: Promotion[];
  setPromotions: Dispatch<SetStateAction<Promotion[]>>;
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
  updateCart: (quantity: string, productId: string, isReplace: boolean) => Promise<void>;
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  promotion: Promotion | null
  setPromotion: Dispatch<SetStateAction<Promotion | null>>;
  applyPromotion: (promotion: Promotion) => void
  resetOrder: () => void;
} | null>(null);
export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  //state
  const [cart, setCart] = useState<CartItems[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [amount, setAmount] = useState(0);
  const [count, setCount] = useState(0);
  const [promotion, setPromotion] = useState<Promotion | null>(null)

  //graphQL
  const promotionData = useQuery(getPromotion);
  const { data } = useQuery(getCart, {
    fetchPolicy: 'network-only', // Always fetch fresh data
  });
  const [updateCartMutation] = useMutation(updateCartQuery);
  const [clearCartMuation] = useMutation(clearCart);

  //useEffect
  useEffect(() => {
    setCart(data?.getCart?.cartItem);
    setAmount(data?.getCart?.amount);
    setPromotions(promotionData?.data?.getPromotions);
    let countTemp = 0;
    for (let i = 0; i < cart?.length; i++) {
      countTemp += cart[i]?.quantity
    }
    setCount(countTemp)

  }, [data, promotions, count, cart, promotionData?.data?.getPromotions]);

  //action
  const updateCart = async (quantity: string, productId: string, isReplace: boolean) => {
    try {
      const { data } = await updateCartMutation({
        variables: {
          bookId: productId,
          quantity: parseInt(quantity),
          isReplace: isReplace,
        },
      });

      console.log(data.updateCart.cartItem);
    } catch (error) {
      console.log(error)
    }
  };
  //apply promotion
  const applyPromotion = (promotion: Promotion): boolean => {
    if (CheckPromotionLevel(promotion) === 1) {
      if (promotion?.validationRule?.limit !== undefined) {
        if (amount < promotion?.validationRule?.limit) {
          return false
        }
      }
    }
    else {
      const doesCartContainPromotionProduct = cart.some(cartItem =>
        promotion?.validationRule?.productIdList?.includes(cartItem?.book?.id)
      );
      if (!doesCartContainPromotionProduct)
        return false
    }

    setPromotion(promotion)
    return true
  }
  const resetOrder = async () => {
    await clearCartMuation()
    setCart([]);
    setPromotions([]);
    setAmount(0);
    setCount(0);
    setPromotion(null);
    console.log(cart)
  };
  return (
    <OrderContext.Provider
      value={{
        cart,
        setCart,
        promotions,
        setPromotions,
        amount,
        setAmount,
        updateCart,
        count,
        setCount,
        promotion,
        setPromotion,
        applyPromotion,
        resetOrder
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within a OrderProvider');
  }
  return context;
};
