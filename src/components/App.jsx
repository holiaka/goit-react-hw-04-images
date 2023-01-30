import { useState, useEffect } from 'react';
import { api } from 'services/restApi';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Div } from './CssForApp/App.styled';

export const App = () => {
  const [query, setQuery] = useState('');
  const [photoArr, setPhotoArr] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [btnActive, setBtnActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectPhotoId, setSelectPhotoId] = useState('');

  const state = { query, photoArr, page };

  const addSearchQueryParam = obj => {
    setQuery(obj.query);
    setPhotoArr(obj.photoArr);
    setPage(obj.page);
    setBtnActive(obj.btnActive);
  };

  const clickButton = () => {
    setPage(prev => prev + 1);
  };

  const switchModal = evt => {
    const { id } = evt.target.parentNode;

    if (!id) {
      setShowModal(false);
      setSelectPhotoId('');
    } else if (id) {
      setShowModal(true);
      setSelectPhotoId(id);
    }
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    const fetchPrepare = async () => {
      setIsLoading(true);
      const response = await api(query, page);
      if (!response) {
        setIsLoading(false);
        return;
      }
      const { hits, totalHits } = response;

      if (!totalHits) {
        Notify.failure('Unfortunately, nothing was found for your request!');
        setIsLoading(false);
        return;
      } else if (page === 1) {
        Notify.success(
          `The search was successful! ${totalHits} photos are available for viewing!`
        );
      }
      setIsLoading(false);

      const imgData = hits.map(item => {
        return {
          disc: item.tags,
          smallImg: item.webformatURL,
          bigImg: item.largeImageURL,
        };
      });

      if (page < Math.ceil(totalHits / 12) || !totalHits) {
        setBtnActive(true);
      } else {
        setBtnActive(false);
      }

      setPhotoArr((prev) => [...prev, ...imgData]);
      setPage(page);

    };

    fetchPrepare();
  }, [query, page]);

  return (
    <Div>
      <Searchbar onSubmitSearch={addSearchQueryParam} state={state}></Searchbar>
      <ImageGallery state={state} switchModal={switchModal}></ImageGallery>
      {isLoading && <Loader />}
      {btnActive && <Button onClick={clickButton}></Button>}
      {showModal && photoArr[selectPhotoId] && (
        <Modal
          bigImg={photoArr[selectPhotoId].bigImg}
          switchModal={switchModal}
        />
      )}
    </Div>
  );
};
