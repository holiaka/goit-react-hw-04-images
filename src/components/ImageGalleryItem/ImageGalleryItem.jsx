import PropTypes from 'prop-types';
import { Image, Item } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  discription,
  smallImg,
  id,
  switchModal,
}) => {
  return (
    <>
      <Item id={id} onClick={switchModal}>
        <Image src={smallImg} alt={discription} />
      </Item>
    </>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  discription: PropTypes.string.isRequired,
  smallImg: PropTypes.string.isRequired,
  bigImg: PropTypes.string.isRequired,
  switchModal: PropTypes.func.isRequired,
};
