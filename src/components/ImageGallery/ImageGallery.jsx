import PropTypes from 'prop-types';
import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ state, switchModal }) => {
  return (
    <Gallery>
      {state.photoArr.map(({ disc, smallImg, bigImg }, idx) => {
        return (
          <ImageGalleryItem
            switchModal={switchModal}
            key={idx}
            discription={disc}
            smallImg={smallImg}
            bigImg={bigImg}            
                     
          />
        );
      })}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  state: PropTypes.object.isRequired,
  switchModal: PropTypes.func.isRequired,
};
