import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    items: [],
};

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        addItem(state, action) {
            const findItem = state.items.find(obj =>
                obj.id === action.payload.id &&
                obj.type === action.payload.type &&
                obj.size === action.payload.size
            );

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({ ...action.payload, count: 1 });
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum;
            }, 0);
        },


        removeItem(state, action) {
            const { id, type, size } = action.payload;
            const findItem = state.items.find(
                obj => obj.id === id && obj.type === type && obj.size === size
            );

            if (findItem) {
                if (findItem.count > 1) {
                    findItem.count--;
                } else {
                    state.items = state.items.filter(
                        obj => !(obj.id === id && obj.type === type && obj.size === size)
                    );
                }
            }

            state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
        },
        removeItemsById(state, action) {
            const id = action.payload;
            state.items = state.items.filter(obj => obj.id !== id);
        },


        clearItems(state) {
            state.items = [];
        },
    },
});

export const { addItem, removeItem, clearItems, removeItemsById } = cartSlice.actions;

export default cartSlice.reducer;