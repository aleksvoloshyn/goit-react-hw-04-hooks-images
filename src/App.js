// import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Searchbar } from './Components/Searchbar/Searchbar';
import { Modal } from './Components/Modal/Modal';
import { ImageGallery } from './Components/ImageGallery/ImageGallery';
import { Button } from './Components/Button/Button';
import { GetImagesApi } from './Components/Api/ImageApi';
import { Load } from './Loader/Loader';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function scrollPageDown() {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  });
}

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [pictures, setPictures] = useState([]);
  const [searchRequest, setSearchRequest] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [largeImageSrc, setLargeImageSrc] = useState('');
  const [alt, setAlt] = useState('');

  useEffect(() => {
    getData(searchRequest, page, 'searchBtn');
  }, [searchRequest]);

  useEffect(() => {
    getData(searchRequest, page, 'loadMoreBtn');
  }, [page]);

  const getData = (request, page, target) => {
    GetImagesApi(request, page)
      .then(response => {
        if (response.status === 200 && searchRequest.trim().length) {
          if (target === 'searchBtn') {
            setPictures([...response.data.hits]);
          }
          if (target === 'loadMoreBtn') {
            setPictures([...pictures, ...response.data.hits]);
            scrollPageDown();
          }
        }
        if (response.status === 404) {
          throw new Error(response.message || 'pictures not exist');
        }
      })
      .catch(function (error) {
        console.error('error', error);
      })
      .then(() => {
        setLoading(false);
      });
  };

  const getSearchRequest = request => {
    setLoading(true);
    setSearchRequest(request);
  };

  const pageIncrement = () => {
    setPage(page + 1);
    setLoading(true);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const setCurrentPictureSrc = e => {
    setShowModal(!showModal);
    if (e !== undefined) {
      setLargeImageSrc(e.target.dataset.largeimage);
      setAlt(e.target.alt);
    }
  };

  return (
    <div className="App">
      <ToastContainer autoClose={2000} newestOnTop={true} />

      <Searchbar onSubmit={getSearchRequest} />

      {pictures.length !== 0 && (
        <ImageGallery toggleModal={setCurrentPictureSrc} images={pictures} />
      )}

      {showModal && (
        <Modal onClose={toggleModal}>
          <div>
            <img src={largeImageSrc} alt={alt} />
          </div>
        </Modal>
      )}
      {loading && <Load />}
      {pictures.length > 0 && (
        <div className={'container'}>
          <Button id="loadmore" onClick={pageIncrement} />
        </div>
      )}
    </div>
  );
};
// class App extends Component {
//   state = {
//     showModal: false,
//     pictures: [],
//     searchRequest: '',
//     loading: false,
//     error: '',
//     page: 1,
//     largeImageSrc: '',
//     alt: '',
//   };

//   componentDidMount() {
//     this.getData(this.state.searchRequest, this.state.page);
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.searchRequest !== this.state.searchRequest) {
//       this.setState({ pictures: [] });
//     }
//   }

//   getData = (request, page) => {
//     GetImagesApi(request, page)
//       .then(response => {
//         if (response.status === 200 && this.state.searchRequest.trim().length) {
//           this.setState({
//             pictures: [...this.state.pictures, ...response.data.hits],
//           });

//           if (this.state.pictures.length === 0) {
//             toast.error('По вашему запросу - НИЧЕГО НЕ НАЙДЕНО!');
//           }
//           scrollPageDown();
//         }
//         if (response.status === 404) {
//           throw new Error(response.message || 'pictures not exist');
//         }
//       })
//       .catch(function (error) {
//         console.error('error', error);
//       })
//       .then(() => {
//         this.setState({ loading: false });
//       });
//   };

//   setSearchRequest = request => {
//     this.setState({ loading: true });
//     this.setState({ searchRequest: request });
//     this.getData(request, this.state.page);
//   };

//   pageIncrement = () => {
//     this.setState({ page: this.state.page + 1 });
//     this.getData(this.state.searchRequest, this.state.page + 1);
//     this.setState({ loading: true });

//     return;
//   };

//   toggleModal = () => {
//     this.setState({ showModal: !this.state.showModal });
//   };

//   setCurrentPictureSrc = e => {
//     this.setState({ showModal: !this.state.showModal });
//     if (e !== undefined) {
//       this.setState({ largeImageSrc: e.target.dataset.largeimage });
//       this.setState({ alt: e.target.alt });
//     }
//   };

//   render() {
//     return (
//       <div className="App">
//         <ToastContainer autoClose={2000} newestOnTop={true} />

//         <Searchbar onSubmit={this.setSearchRequest} />

//         {this.state.pictures.length !== 0 && (
//           <ImageGallery
//             toggleModal={this.setCurrentPictureSrc}
//             images={this.state.pictures}
//           />
//         )}

//         {this.state.showModal && (
//           <Modal onClose={this.toggleModal}>
//             <div>
//               <img src={this.state.largeImageSrc} alt={this.state.alt} />
//             </div>
//           </Modal>
//         )}
//         {this.state.loading && <Load />}
//         {this.state.pictures.length > 0 && (
//           <div className={'container'}>
//             <Button onClick={this.pageIncrement} />
//           </div>
//         )}
//       </div>
//     );
//   }
// }

export default App;
