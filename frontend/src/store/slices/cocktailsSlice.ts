import { createSlice } from '@reduxjs/toolkit';
import { ICocktail, ValidationError } from '../../types';
import {
  addCocktail,
  deleteCocktail,
  getCocktailById,
  getCocktails, getMyCocktails,
  publishCocktail,
} from '../thunks/cocktailsThunk.ts';
import { RootState } from '../../app/store.ts';

interface CocktailsState {
  cocktails: ICocktail[];
  cocktail: ICocktail | null;
  isFetching: boolean;
  fetchingError: boolean;
  isCreating: boolean;
  creatingError: ValidationError | null;
}

const initialState: CocktailsState = {
  cocktails: [],
  cocktail: null,
  isFetching: false,
  fetchingError: false,
  isCreating: false,
  creatingError: null,
};

export const selectCocktails = (state: RootState) => state.cocktails.cocktails;
export const selectOneCocktail = (state: RootState) => state.cocktails.cocktail;

export const selectIsFetching = (state: RootState) => state.cocktails.isFetching;
export const selectIsCreating = (state: RootState) => state.cocktails.isCreating;

export const selectCreatingError = (state: RootState) => state.cocktails.creatingError;

const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCocktails.pending, (state) => {
        state.isFetching = true;
        state.fetchingError = false;
      })
      .addCase(getCocktails.fulfilled, (state, {payload: cocktails}) => {
        state.isFetching = false;
        state.cocktails = cocktails;
      })
      .addCase(getCocktails.rejected, (state) => {
        state.isFetching = false;
        state.fetchingError = true;
      })

      .addCase(getMyCocktails.pending, (state) => {
        state.isFetching = true;
        state.fetchingError = false;
      })
      .addCase(getMyCocktails.fulfilled, (state, {payload: cocktails}) => {
        state.isFetching = false;
        state.cocktails = cocktails;
      })
      .addCase(getMyCocktails.rejected, (state) => {
        state.isFetching = false;
        state.fetchingError = true;
      })

      .addCase(getCocktailById.pending, (state) => {
        state.isFetching = true;
        state.fetchingError = false;
      })
      .addCase(getCocktailById.fulfilled, (state, {payload: cocktail}) => {
        state.isFetching = false;
        state.cocktail = cocktail || null;
      })
      .addCase(getCocktailById.rejected, (state) => {
        state.isFetching = false;
        state.fetchingError = true;
      })

      .addCase(addCocktail.pending, (state) => {
        state.isCreating = true;
        state.creatingError = null;
      })
      .addCase(addCocktail.fulfilled, (state, {payload: cocktail}) => {
        state.isCreating = false;
        state.cocktail = cocktail;
      })
      .addCase(addCocktail.rejected, (state, {payload: error}) => {
        state.isCreating = false;
        state.creatingError = error || null;
      })

      .addCase(deleteCocktail.pending, (state) => {
        state.isFetching = true;
        state.fetchingError = false;
      })
      .addCase(deleteCocktail.fulfilled, (state) => {
        state.isFetching = false;
      })
      .addCase(deleteCocktail.rejected, (state) => {
        state.isFetching = false;
        state.fetchingError = true;
      })

      .addCase(publishCocktail.pending, (state) => {
        state.isFetching = true;
        state.fetchingError = false;
      })
      .addCase(publishCocktail.fulfilled, (state) => {
        state.isFetching = false;
      })
      .addCase(publishCocktail.rejected, (state) => {
        state.isFetching = false;
        state.fetchingError = true;
      });
  }
});

export const cocktailsReducer = cocktailsSlice.reducer;