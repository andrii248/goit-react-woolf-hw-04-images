import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import FetchData from 'services/Api';
import Modal from './Modal/Modal';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Notiflix from 'notiflix';
import * as Scroll from 'react-scroll';
import Button from './Button/Button';

const App = () => {
  const [searchName, setSearchName] = useState('');
  const [perPage, setPerPage] = useState(12);
  const [page, setPage] = useState(1);
  const [imageList, setImageList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openModalItem, setOpenModalItem] = useState({ url: '', alt: '' });

  useEffect(() => {
    if (!searchName) {
      return;
    }
    setLoading(true);
    // console.log('loading stated true', loading);
    FetchData(searchName, page, perPage)
      .then(data => {
        if (data.hits.length === 0) {
          Notiflix.Notify.error(
            'Your query was not successfully completed. Please, try again'
          );
          return;
        }

        const hasMorePhotos = page < Math.ceil(data.totalHits / perPage);

        const filterDataHits = data.hits.map(img => {
          return Object.fromEntries(
            Object.entries(img).filter(([key]) =>
              ['id', 'tags', 'largeImageURL', 'webformatURL'].includes(key)
            )
          );
        });

        setImageList(prev => [...prev, ...filterDataHits]);
        setShowLoadMore(hasMorePhotos);

        if (page === 1) {
          Notiflix.Notify.success(
            `Woo-hoo!!! We've found ${data.totalHits} images.`
          );
        }

        if (!hasMorePhotos) {
          Notiflix.Notify.info(
            "Whoops! You've just reached the end of the image list."
          );
        }
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [page, perPage, searchName]);

  // componentDidUpdate(_, prevState) {
  //   const { searchName, per_page, page } = this.state;

  //   if (
  //     prevState.page !== page ||
  //     prevState.searchName !== searchName
  //   ) {
  //     this.setState({ loading: true });
  //     FetchData(searchName, page, per_page)
  //       .then(data => {
  //         if (data.hits.length === 0) {
  //           Notiflix.Notify.error(
  //             'Your query was not successfully completed. Please, try again!'
  //           );
  //           return;
  //         }

  //         const hasMorePhotos =
  //           page < Math.ceil(data.totalHits / per_page);

  //         const filterDataHits = data.hits.map(img => {
  //           return Object.fromEntries(
  //             Object.entries(img).filter(([key]) =>
  //               ['id', 'tags', 'largeImageURL', 'webformatURL'].includes(key)
  //             )
  //           );
  //         });

  //         this.setState(prev => ({
  //           imageList: [...prev.imageList, ...filterDataHits],
  //           totalHits: data.totalHits,
  //           showLoadMore: hasMorePhotos,
  //         }));

  //         if (page === 1) {
  //           Notiflix.Notify.success(
  //             `Woo-hoo!!! We've found ${data.totalHits} images.`
  //           );
  //         }

  //         if (!hasMorePhotos) {
  //           Notiflix.Notify.info(
  //             "Whoops! You've just reached the end of the image list."
  //           );
  //         }
  //       })
  //       .catch(error => console.log(error))
  //       .finally(() => this.setState({ loading: false }));
  //   }
  // }

  const onSubmit = (name, itemsPerPage) => {
    if (searchName === name) {
      Notiflix.Notify.info(
        `Your query on ${name.toUpperCase()} already completed and currently shown`
      );
      return;
    } else if (itemsPerPage === perPage) {
      return;
    } else {
      setSearchName(name);
      setPage(1);
      setImageList([]);
      setPerPage(perPage);
    }
  };

  const openModal = (url, alt) => {
    setOpenModalItem({ url, alt });
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
    scrollSlowly();
  };

  const scrollSlowly = () => {
    const { height: cardHeight } = document
      .querySelector('#ImageGallery')
      .firstElementChild.getBoundingClientRect();
    Scroll.animateScroll.scrollMore(cardHeight * 2);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={onSubmit} />
      {showModal && (
        <Modal
          url={openModalItem.url}
          alt={openModalItem.alt}
          onClose={closeModal}
        />
      )}
      <ImageGallery params={imageList} openModal={openModal} />
      {loading && <Loader />}
      {showLoadMore && <Button onClick={onLoadMore} title="Load more..." />}
    </div>
  );
};

export default App;
