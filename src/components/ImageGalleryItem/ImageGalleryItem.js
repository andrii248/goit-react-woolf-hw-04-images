import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, alt, onOpen }) => {
  return (
    <li className={css.ImageGalleryItem} onClick={onOpen}>
      <img src={webformatURL} alt={alt} />
    </li>
  );
};

export default ImageGalleryItem;
