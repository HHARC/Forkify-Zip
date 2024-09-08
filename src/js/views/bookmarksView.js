import icons from 'url:../../img/icons.svg';
import View from './View.js';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it!';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      const recipeId = btn.dataset.id;
      handler(recipeId);
    });
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => {
        return `
      
          <li class="preview">
            <a class="preview__link" href="#${bookmark.id}">
              <figure class="preview__fig">
                <img src="${bookmark.image}" alt="${bookmark.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${bookmark.title}</h4>
                <p class="preview__publisher">${bookmark.publisher}</p>
                <div class="preview__user-generated ${
                  bookmark.key ? '' : 'hidden'
                }">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                    console.log(${icons}#icon-user);
                  </svg>
                </div>
              </div>
            </a>
            <button class="btn--bookmark" data-id="${bookmark.id}">
              <svg>
            <use href="${icons}#icon-bookmark${
          bookmark.bookmarked ? '-fill' : ''
        }"></use>
              </svg>
            </button>
          </li>
        `;
      })
      .join('');
  }
}

export default new BookmarksView();
