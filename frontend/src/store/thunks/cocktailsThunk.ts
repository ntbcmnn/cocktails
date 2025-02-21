import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICocktail, ICocktailMutation, ValidationError } from '../../types';
import axiosApi from '../../axiosApi.ts';
import { RootState } from '../../app/store.ts';
import { isAxiosError } from 'axios';

export const getCocktails = createAsyncThunk<ICocktail[], void, { state: RootState; rejectValue: ValidationError }>(
  'cocktails/getCocktails',
  async (_, {getState}) => {
    const token = getState().users.user?.token;

    const response = await axiosApi.get<ICocktail[]>('/cocktails', {headers: {Authorization: token ? token : ''}});
    return response.data;
  }
);

export const getMyCocktails = createAsyncThunk<
  ICocktail[],
  string,
  { state: RootState; rejectValue: ValidationError }
>
(
  'cocktails/getMyCocktails',
  async (userId, {getState, rejectWithValue}) => {
    const token = getState().users.user?.token;

    if (!token) {
      throw new Error('Token not found');
    }

    try {
      const response = await axiosApi.get<ICocktail[]>(`/cocktails?user=${userId}`, {headers: {Authorization: token}});
      return response.data || [];
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.status === 400
      ) {
        return rejectWithValue(error.response.data as ValidationError);
      }
      throw error;
    }
  }
);

export const getCocktailById = createAsyncThunk<ICocktail, string>(
  'cocktails/getCocktailById',
  async (cocktailId) => {
    const response = await axiosApi.get<ICocktail>(`/cocktails/${cocktailId}`);
    return response.data;
  }
);

export const addCocktail = createAsyncThunk<
  ICocktail,
  ICocktailMutation,
  { state: RootState; rejectValue: ValidationError }>
(
  '/cocktails/addCocktail',
  async (cocktailMutation, {getState, rejectWithValue}) => {
    const token = getState().users.user?.token;
    try {
      const formData = new FormData();

      formData.append('name', cocktailMutation.name);

      if (cocktailMutation.image !== null) {
        formData.append('image', cocktailMutation.image);
      }

      formData.append('recipe', cocktailMutation.recipe);

      formData.append('ingredients', JSON.stringify(cocktailMutation.ingredients));


      const response = await axiosApi.post<ICocktail>('/cocktails', formData, {headers: {Authorization: token}});
      return response.data;
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.status === 400
      ) {
        return rejectWithValue(error.response.data as ValidationError);
      }
      throw error;
    }
  }
);

export const deleteCocktail = createAsyncThunk<void, string, { state: RootState }>(
  'cocktails/deleteCocktail',
  async (cocktailId, {getState}) => {
    const token = getState().users.user?.token;

    await axiosApi.delete(`/cocktails/${cocktailId}`, {headers: {'Authorization': token}});
  }
);

export const publishCocktail = createAsyncThunk<boolean, string, { state: RootState }>(
  'cocktails/publishCocktail',
  async (cocktailId, {getState}) => {
    const token = getState().users.user?.token;

    await axiosApi.patch(`/cocktails/${cocktailId}/togglePublished`, {}, {headers: {'Authorization': token}});
    return true;
  }
);