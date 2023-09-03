import axios from 'axios';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import { searchItem } from './js/api';

import {
  refs,
  createPhotoCard,
  notifyError,
  notifyFoundly,
  warning,
} from './js/helpers';

let valueInput = '';
let count = 40;
let currentPage = 0;

refs.searchForm.addEventListener('submit', onSearch);
refs.btnLoadMore.addEventListener('click', onLoadMore);

async function onSearch(evt) {
  evt.preventDefault();
  valueInput = evt.target.searchQuery.value.trim();
  defValue();
  refs.btnLoadMore.style.display = 'none';

  // console.log(currentPage);

  if (!valueInput) {
    warning();
    return;
  }

  try {
    const { hits, totalHits } = await searchItem(currentPage, valueInput);
    // console.log(hits);
    // console.log(totalHits);

    // if (hits.length === 0) {
    //   // console.log('run hits.length');
    //   throw error;
    // }

    if (hits.length > 0) {
      refs.picturesContainer.insertAdjacentHTML(
        'beforeend',
        createPhotoCard(hits)
      );
    } else {
      notifyError();
      refs.endSearchResult.style.display = 'none';
    }

    refs.picturesContainer.style.display = 'flex';

    if (totalHits > 0) {
      notifyFoundly(totalHits);
    }

    if (totalHits <= 0) {
      // notifyError();
      refs.btnLoadMore.style.display = 'none';
      return;
    }

    if (Math.ceil(totalHits / 40) < 1) {
      console.log(Math.ceil(totalHits / 40));

      // refs.endSearchResult.style.display = 'block';
      refs.btnLoadMore.style.display = 'none';
      return;
    }
  } catch (err) {
    // console.log(err);
    notifyError();
  }

  evt.target.reset();
}

async function onLoadMore() {
  currentPage += 1;
  // console.log(currentPage);
  try {
    const { hits, totalHits } = await searchItem(currentPage, valueInput);

    refs.picturesContainer.insertAdjacentHTML(
      'beforeend',
      createPhotoCard(hits)
    );
    // console.log(currentPage);
    console.log(Math.ceil(totalHits / 40));
    // console.log(totalHits);

    if (currentPage === Math.ceil(totalHits / 40)) {
      refs.endSearchResult.style.display = 'block';
      refs.btnLoadMore.style.display = 'none';
      return;
    }
  } catch (err) {
    console.log(err);
  }
}

function defValue() {
  // refs.picturesContainer.style.display = 'none';
  refs.picturesContainer.innerHTML = '';
  refs.btnLoadMore.style.display = 'block';
  currentPage = 1;
  refs.endSearchResult.style.display = 'none';
}

export { valueInput, currentPage };
