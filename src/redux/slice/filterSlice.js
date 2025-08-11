import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categoryId: 0,
    sort: {
        name: 'популярности', // Добавьте name в начальное состояние
        sortProperty: 'rating' },
    currentPage: 1,
};

const filterSlice = createSlice({
    name: 'filterSlice',
    initialState,
    reducers: {
        setCategoryId: (state, action) => {
            state.categoryId = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setFilters: (state, action) => {
            state.sort = action.payload.sort;
            state.currentPage = Number(action.payload.currentPage);
            state.categoryId = Number(action.payload.categoryId);
        },
        setSort: (state, action) => {
            state.sort = action.payload;
        }
    },
});

export const { setCategoryId, setCurrentPage, setFilters, setSort } = filterSlice.actions;
export default filterSlice.reducer;