import './sass/main.scss';//импорт стилей
import  ImagesApiService from './js/image-service';//Api запросы
import { Notify } from 'notiflix/build/notiflix-notify-aio';//библиотека уведомлнений
import SimpleLightbox from 'simplelightbox';//библиотека модальные окна
import 'simplelightbox/dist/simple-lightbox.min.css';//стили для библиотки модальных коно
import hitsCard from'./templates/hits.hbs';//импорт разметки карточки картинок
import getRefs from './js/refs';//импорт ссылок
import LoadMoreBtn from './js/load-more-btn';//кнопка загрузки фото
import Notiflix from './js/notification';//уведомления

const refs = getRefs();
const imagesApiService = new ImagesApiService();

const loadMoreBtn = new LoadMoreBtn({ selector: '[data-action="load-more"]', hidden: true });
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

refs.searchForm.addEventListener('submit', onSearch);

const lightbox = new SimpleLightbox('.gallery a');//В разметке необходимо будет обернуть каждую карточку изображения в ссылку, как указано в документации.

function onSearch(e) {
  e.preventDefault();
  clearImagesContainer();
  
  imagesApiService.query = e.currentTarget.elements.query.value;
  imagesApiService.resetPage();

  if (!imagesApiService.query) {
    loadMoreBtn.hide();
    return Notiflix.error();
  }
  
  imagesApiService.fetchImages()
  .then(({hits, totalHits}) => {
    if (hits.length === 0) {
        loadMoreBtn.hide();
        return Notiflix.error(); 
      }
     
      Notify.info(`Hooray! We found ${totalHits} images.`);
  
      appendHitsMarkup(hits);
      lightbox.refresh();
      loadMoreBtn.show();
  });
}

function onLoadMore() {
  loadMoreBtn.disable();

    imagesApiService.fetchImages()
    .then(({hits})=> {
      if(hits.length < 40) {
        Notiflix.warning();
        loadMoreBtn.hide();
        appendHitsMarkup(hits);
        return;
      }
      appendHitsMarkup(hits);
        loadMoreBtn.enable();
        lightbox.refresh();
        smoothScroll ();
    });
}

function appendHitsMarkup (data) {
  refs.imagesContainer.insertAdjacentHTML('beforeend', hitsCard(data))
}

function clearImagesContainer(){
  refs.imagesContainer.innerHTML = "";
}

function smoothScroll () {
  const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 12,
  behavior: "smooth",
});
}