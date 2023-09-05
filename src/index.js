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

  if (!valueInput) {
    warning();
    return;
  }

  try {
    const { hits, totalHits } = await searchItem(currentPage, valueInput);

    if (totalHits > 0) {
      notifyFoundly(totalHits);
    }

    if (hits.length < 40) {
      refs.endSearchResult.style.display = 'block';
    } else {
      refs.endSearchResult.style.display = 'none';
    }
    if (hits.length === 0) {
      refs.endSearchResult.style.display = 'none';
    }

    if (hits.length > 0) {
      refs.picturesContainer.insertAdjacentHTML(
        'beforeend',
        createPhotoCard(hits)
      );
    } else {
      notifyError();
      // refs.endSearchResult.style.display = 'none';
    }

    refs.picturesContainer.style.display = 'flex';

    if (totalHits <= 0) {
      refs.btnLoadMore.style.display = 'none';
      return;
    }

    if (currentPage === Math.ceil(totalHits / 40)) {
      // refs.endSearchResult.style.display = 'block';
      refs.btnLoadMore.style.display = 'none';
      return;
    }
    refs.btnLoadMore.style.display = 'block';
  } catch (err) {
    notifyError();
  }

  evt.target.reset();
}

async function onLoadMore() {
  currentPage += 1;
  try {
    const { hits, totalHits } = await searchItem(currentPage, valueInput);

    refs.picturesContainer.insertAdjacentHTML(
      'beforeend',
      createPhotoCard(hits)
    );
    console.log(Math.ceil(totalHits / 40));

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
  refs.picturesContainer.innerHTML = '';
  currentPage = 1;
  refs.endSearchResult.style.display = 'none';
}

export { valueInput, currentPage };
