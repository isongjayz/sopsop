// ========================================
// useStore - Zustand Root Store
// 모든 슬라이스를 통합하고 aesop-storage 키로 persist 설정
// ========================================

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { createAuthSlice } from './slices/authSlice';
import { createProductSlice } from './slices/productSlice';
import { createCartSlice } from './slices/cartSlice';
import { createOrderSlice } from './slices/orderSlice';
import { createBoardSlice } from './slices/boardSlice';
import { createWishlistSlice } from './slices/wishlistSlice';

const useStore = create(
    persist(
        (set, get) => ({
            ...createAuthSlice(set, get),
            ...createProductSlice(set, get),
            ...createCartSlice(set, get),
            ...createOrderSlice(set, get),
            ...createBoardSlice(set, get),
            ...createWishlistSlice(set, get),
        }),
        {
            name: 'aesop-storage',
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state) => {
                // 수정: localStorage에 기존 주문 데이터가 있어도 테스트 계정 seed 주문이 항상 복구되도록 보정
                state?.ensureSeedOrders?.();
            },
            // 영속 저장 대상만 선택 (partialize)
            partialize: (state) => ({
                users: state.users,
                user: state.user,
                isLoggedIn: state.isLoggedIn,
                cartItems: state.cartItems,
                inquiries: state.inquiries,
                qnas: state.qnas,
                orders: state.orders,
                wishlist: state.wishlist,
                reviews: state.reviews,
            }),
        }
    )
);

export default useStore;
