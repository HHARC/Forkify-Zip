import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const curPage = this._data.page;

    if (numPages === 1) return '';

    if (curPage === 1) {
      return this._generateMarkupButton(curPage, 'next');
    }

    if (curPage === numPages) {
      return this._generateMarkupButton(curPage, 'prev');
    }

    return `
      ${this._generateMarkupButton(curPage, 'prev')}
      ${this._generateMarkupButton(curPage, 'next')}
    `;
  }

  _generateMarkupButton(page, type) {
    return `
      <button class="btn--inline pagination__btn--${type}" data-goto="${
      type === 'next' ? page + 1 : page - 1
    }">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-${
      type === 'next' ? 'right' : 'left'
    }"></use>
        </svg>
        <span>Page ${type === 'next' ? page + 1 : page - 1}</span>
      </button>
    `;
  }
}

export default new PaginationView();
