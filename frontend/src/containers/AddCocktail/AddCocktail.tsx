import React, { useState } from 'react';
import Loader from '../../components/UI/Loader/Loader.tsx';
import { useNavigate } from 'react-router-dom';
import { ICocktailMutation } from '../../types';
import { selectCreatingError, selectIsCreating } from '../../store/slices/cocktailsSlice.ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { addCocktail } from '../../store/thunks/cocktailsThunk.ts';
import { toast } from 'react-toastify';
import FileInput from '../../components/UI/FileInput/FileInput.tsx';
import ButtonLoading from '../../components/UI/ButtonLoading/ButtonLoading.tsx';

const AddCocktail = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsCreating);
  const validationErr = useAppSelector(selectCreatingError);
  const navigate = useNavigate();
  const [form, setForm] = useState<ICocktailMutation>({
    name: '',
    image: null,
    recipe: '',
    ingredients: [
      {
        name: '',
        amount: '',
      }
    ],
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(addCocktail(form)).unwrap();
      navigate('/');
      toast.info('Cocktail created successfully!');
    } catch (e) {
      console.error(e);
    }

  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setForm((prevState) => ({...prevState, [name]: value}));
  };

  const onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const {name, files} = e.target;

    if (files) {
      setForm((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  const addIngredient = () => {
    setForm(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, {name: '', amount: ''}]
    }));
  };

  const deleteIngredient = (index: number) => {
    setForm(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const onIngredientsChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {name, value} = e.target;
    setForm((prevState) => {
      const ingredCopy = [...prevState.ingredients];
      ingredCopy[index] = {...ingredCopy[index], [name]: value};

      return {
        ...prevState,
        ingredients: ingredCopy,
      };
    });
  };

  const getFieldError = (fieldName: string) => {
    try {
      return validationErr?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <div className="container mt-5" style={{padding: '10px', maxWidth: '500px'}}>
      <div className="text-center mb-4">
        <h2 className="mt-2">Create a cocktail</h2>
      </div>

      {isLoading ? <Loader/> :
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Cocktail name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={onChange}
              className={`form-control ${getFieldError('name') ? 'is-invalid' : ''}`}
            />
            {getFieldError('name') && (
              <div className="invalid-feedback">{getFieldError('name')}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="ingredients" className="form-label">Ingredients</label>
            <>
              {form.ingredients.map((ing, i) => (
                <div key={i} className="container">
                  <div className="mb-3">
                    <input
                      type="text"
                      name="name"
                      value={ing.name}
                      onChange={e => onIngredientsChange(i, e)}
                      className="form-control"
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      name="amount"
                      value={ing.amount}
                      onChange={e => onIngredientsChange(i, e)}
                      className="form-control"
                    />
                  </div>

                  <div className="mb-4">
                    <button type="button" className="btn btn-blue d-inline-flex gap-2 align-items-center"
                            onClick={() => deleteIngredient(i)}>
                      Remove
                      <i className="bi bi-x-circle"></i>
                    </button>
                  </div>
                </div>
              ))}
            </>
            <div>
              <button type="button" className="btn btn-blue" onClick={addIngredient}>Add ingredient</button>
            </div>
          </div>

          <div className="mb-3">
            <FileInput
              id="image"
              name="image"
              label="Image"
              onGetFile={onFileChange}
              file={form.image}
              className={`form-control ${getFieldError('image') ? 'is-invalid' : ''}`}
            />
            {getFieldError('image') && (
              <div className="invalid-feedback">{getFieldError('image')}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="recipe" className="form-label">Recipe</label>
            <textarea
              id="recipe"
              name="recipe"
              value={form.recipe}
              onChange={onChange}
              className={`form-control ${getFieldError('recipe') ? 'is-invalid' : ''}`}
            />
            {getFieldError('recipe') && (
              <div className="invalid-feedback">{getFieldError('recipe')}</div>
            )}
          </div>

          <div className="d-flex gap-3 justify-content-center mb-3">
            <ButtonLoading
              isLoading={isLoading}
              isDisabled={isLoading}
              text="Create"
            />
          </div>
        </form>
      }
    </div>
  );
};

export default AddCocktail;