import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectCocktails, selectIsFetching } from '../../store/slices/cocktailsSlice.ts';
import { getMyCocktails } from '../../store/thunks/cocktailsThunk.ts';
import Loader from '../../components/UI/Loader/Loader.tsx';
import Cocktail from '../../components/Cocktail/Cocktail.tsx';

const MyCocktails = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectCocktails);
  const isLoading = useAppSelector(selectIsFetching);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('user');

  useEffect(() => {
    if (userId) {
      dispatch(getMyCocktails(userId));
    }
  }, [dispatch, userId]);

  return (
    <>
      {isLoading ?
        <Loader/>
        : cocktails.length > 0 ?
          <div className="container d-flex flex-wrap gap-4 justify-content-center">
            {
              cocktails
                .map(cocktail => (
                  <Cocktail cocktail={cocktail} key={cocktail._id}/>
                ))
            }
          </div>
          :
          <h3 className="text-center">No cocktails found</h3>
      }
    </>
  );
};

export default MyCocktails;