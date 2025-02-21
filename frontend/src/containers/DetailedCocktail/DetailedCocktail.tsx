import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectIsFetching, selectOneCocktail } from '../../store/slices/cocktailsSlice.ts';
import { selectUser } from '../../store/slices/usersSlice.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { deleteCocktail, getCocktailById, getCocktails, publishCocktail } from '../../store/thunks/cocktailsThunk.ts';
import { toast } from 'react-toastify';
import Loader from '../../components/UI/Loader/Loader.tsx';
import { api_URL } from '../../globalConstants.ts';
import ButtonLoading from '../../components/UI/ButtonLoading/ButtonLoading.tsx';

const DetailedCocktail = () => {
  const dispatch = useAppDispatch();
  const cocktail = useAppSelector(selectOneCocktail);
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectIsFetching);
  const navigate = useNavigate();
  const {cocktailId} = useParams();

  useEffect(() => {
    if (cocktailId) {
      dispatch(getCocktailById(cocktailId));
    }
  }, [dispatch, cocktailId]);

  const deleteItem = async (cocktailId: string) => {
    if (confirm('Sure you want to delete cocktail?')) {
      await dispatch(deleteCocktail(cocktailId));
      navigate('/');
      await dispatch(getCocktails());
      toast.info('Cocktail deleted.');
    } else {
      toast.info('You cancelled cocktail deletion');
    }
  };

  const publishItem = async (cockTailId: string) => {
    if (confirm('Are you sure you want to publish cocktail?')) {
      await dispatch(publishCocktail(cockTailId));
      await dispatch(getCocktails());
      toast.info('Cocktail published!');
    } else {
      toast.info('You cancelled cocktail publishing');
    }
  };

  return cocktail && (
    <>
      {isLoading ? <Loader/> :
        <div className="d-flex flex-column align-items-center container">
          <div className="card" style={{maxWidth: '900px'}}>
            <div className="card-header cocktail-card text-center">
              <p
                className="text-white fw-bold fs-4 m-0 p-0 d-inline-flex align-items-center gap-1 text-lowercase"
              >
                💃 {cocktail.name} by {cocktail.user.displayName} 🕺
              </p>
            </div>
            {
              user &&
              user.role === 'admin' ||
              !cocktail.isPublished &&
              <p className="text-bg-danger m-3 p-2 d-inline-flex gap-2 justify-content-center align-items-center"><i
                className="bi bi-info-lg fs-4"></i>Your cocktail is under the moderator's review</p>
            }
            <div className="card-body">

              <div className="d-flex justify-content-between gap-4 align-items-center mb-4">
                <div className="w-100">
                  <img
                    src={`${api_URL}/${cocktail.image}`}
                    className="card-img w-100 h-auto rounded-3"
                    alt={cocktail.name}
                  />
                </div>

                <div className="w-100">
                  {cocktail.ingredients.map((ingredient, id) =>
                    <ul className="list-group list-group-flush" key={id}>
                      <li className="list-group-item  d-inline-flex align-items-center gap-2">
                        <span className="fw-bold d-inline-flex align-items-center gap-2">
                          <i className="bi bi-check fs-5" style={{color: '#4389cc'}}></i>
                          {ingredient.name}:
                        </span> {ingredient.amount}</li>
                    </ul>
                  )}
                </div>
              </div>

              <div className="w-100 px-4 mb-3">
                <h4 className="card-title">Recipe:</h4>
                <p className="card-text">{cocktail.recipe}</p>
              </div>
            </div>

            {user && user.role === 'admin' ?
              <div className="mb-4 d-flex justify-content-center gap-3">
                <ButtonLoading
                  isLoading={isLoading}
                  isDisabled={isLoading}
                  text="Delete"
                  onClick={() => deleteItem(cocktail._id)}
                >
                  <i className="bi bi-x-lg"></i>
                </ButtonLoading>
                {
                  cocktail.isPublished ? null :
                    <ButtonLoading
                      isLoading={isLoading}
                      isDisabled={isLoading}
                      text="Publish"
                      onClick={() => publishItem(cocktail._id)}
                    >
                      <i className="bi bi-upload"></i>
                    </ButtonLoading>
                }
              </div>
              : null
            }
          </div>
        </div>
      }
    </>
  );
};

export default DetailedCocktail;