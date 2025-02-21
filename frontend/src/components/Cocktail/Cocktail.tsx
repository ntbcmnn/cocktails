import React from 'react';
import { api_URL } from '../../globalConstants.ts';
import { ICocktail } from '../../types';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../../store/slices/usersSlice.ts';
import { deleteCocktail, getCocktails, publishCocktail } from '../../store/thunks/cocktailsThunk.ts';
import { toast } from 'react-toastify';
import ButtonLoading from '../UI/ButtonLoading/ButtonLoading.tsx';
import { selectIsFetching } from '../../store/slices/cocktailsSlice.ts';

interface Props {
  cocktail: ICocktail;
}

const Cocktail: React.FC<Props> = ({cocktail}) => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsFetching);

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

  return (
    <div className="card mb-3 d-flex flex-column" style={{maxWidth: '400px'}}>
      <div className="w-100 card-header cocktail-card">
        <h4 className="text-white card-title text-center m-0 p-0 text-lowercase">{cocktail.name}</h4>
      </div>

      {
        user &&
        user.role === 'admin' ||
        !cocktail.isPublished &&
        <p className="text-bg-danger m-3 p-2 d-inline-flex gap-2 align-items-center"><i
          className="bi bi-info-lg fs-4"></i>Your cocktail is under the moderator's review</p>
      }

      <div className="card-body d-flex flex-column gap-4 align-items-center">
        <div className="w-100">
          <img src={`${api_URL}/${cocktail.image}`} className="w-100 h-auto rounded-3" alt={cocktail.name}/>
        </div>
      </div>

      <NavLink to={`/cocktails/${cocktail._id}`} className="btn mb-3 mx-3 btn-blue">View full recipe</NavLink>
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
  );
};

export default Cocktail;