import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('.searchQuery'),
  searchForm: document.querySelector('.search-form'),
  picturesContainer: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.load-more'),
  endSearchResult: document.querySelector('.endSearchResult'),
};

function createPhotoCard(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width='250px' height='170px'/>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div>`;
      }
    )
    .join('');
}

function notifyError(err) {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function notifyFoundly(total) {
  Notiflix.Notify.success(`Hooray! We found ${total} images.`);
}

function warning(err) {
  Notiflix.Notify.warning('Please, fill the input');
}

export { refs, createPhotoCard, notifyError, notifyFoundly, warning };
