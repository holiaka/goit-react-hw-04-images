import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ReactComponent as ReactSVG } from '../../image/svg/icons8-search.svg';
import {
  SearchbarWrapper,
  SearchbarForm,
  SearchbarButton,
  SearchbarInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmitSearch, state }) => {
  const queryProcessing = evt => {
    evt.preventDefault();
    const { value } = evt.target.elements.query;
    const transfValue = value.trim();

    if (transfValue === '') {
      Notify.warning('Please enter a request!!');
      onSubmitSearch({
        photoArr: [],
        btnActive: false,
      });
    } else if (state.query !== transfValue) {
      onSubmitSearch({
        query: transfValue,
        photoArr: [],
        page: 1,
      });
    }
    evt.target.elements.query.value = '';
  };

  return (
    <SearchbarWrapper>
      <SearchbarForm onSubmit={queryProcessing}>
        <SearchbarButton type="submit">
          <ReactSVG width={25} height={25} />
        </SearchbarButton>
        <SearchbarInput
          type="text"
          name="query"
          //   autocomplete="off"
          //   autofocus
          placeholder="Search images and photos"
        />
      </SearchbarForm>
    </SearchbarWrapper>
  );
};

Searchbar.propTypes = {
  onSubmitSearch: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
};
