import View from './View.js';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded!';

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArray = [...new FormData(this)];
      const data = Object.fromEntries(dataArray);
      console.log(data);
      handler(data);
    });
  }

  _generateMarkup() {
    return '';
  }

  toggleWindow() {
    //console.log('Toggle window method called');
    const window = document.querySelector('.add-recipe-window');
    window.classList.toggle('hidden');
    document.querySelector('.overlay').classList.toggle('hidden');
  }

  renderMessage() {
    alert(this._message);
  }

  renderError(message) {
    alert(message);
  }

  renderSpinner() {
    // Define your spinner rendering method if needed
  }

  addHandlerClose(handler) {
    const closeButton = document.querySelector('.btn--close-modal');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        this.toggleWindow();
      });
    }
  }
}

export default new AddRecipeView();
