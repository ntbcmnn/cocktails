import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectCocktails, selectIsFetching } from '../../store/slices/cocktailsSlice.ts';
import { useEffect } from 'react';
import { getCocktails } from '../../store/thunks/cocktailsThunk.ts';
import Cocktail from '../../components/Cocktail/Cocktail.tsx';
import { selectUser } from '../../store/slices/usersSlice.ts';
import { ICocktail } from '../../types';
import Loader from '../../components/UI/Loader/Loader.tsx';

const Home = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectCocktails);
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectIsFetching);

  useEffect(() => {
    dispatch(getCocktails());
  }, [dispatch]);

  const filteredCocktails = cocktails.filter((cocktail) => {
    if (cocktail.isPublished) {
      return true;
    }

    if (!user) return false;
    return user.role === 'admin' || user._id === cocktail.user._id;
  });

  return (
    <>
      {
        isLoading ? <Loader/> :
          <div className="container d-flex flex-wrap gap-4 justify-content-center">
            {filteredCocktails.length > 0 ? (
                filteredCocktails.map((cocktail: ICocktail) =>
                  <Cocktail cocktail={cocktail} key={cocktail._id}/>
                )
              ) :
              <h3 className="text-center">No cocktails found</h3>
            }
          </div>
      }
    </>
  );
};

export default Home;