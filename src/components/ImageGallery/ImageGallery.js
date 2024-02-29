import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

const ImageGallery = ({ params, openModal }) => {
  return (
    <ul id="ImageGallery" className={css.ImageGallery}>
      {params.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          alt={tags}
          onOpen={() => openModal(largeImageURL, tags)}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
