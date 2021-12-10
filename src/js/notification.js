import Notiflix from 'notiflix';

function needMore() {
  Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
}

function error() {
  Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
}

export default { needMore, error };