import View from "./view";
import { ICONS } from "../config";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");
  _currentPage;

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    this._currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1 and there are other pages
    if (this._currentPage === 1 && numPages > 1) {
      return this._generateMarkupPageNext();
    }

    // //     // Last page
    if (this._currentPage === numPages && numPages > 1) {
      return this._generateMarkupPagePrevious();
    }

    // Other page
    if (this._currentPage < numPages) {
      return (
        this._generateMarkupPagePrevious() + this._generateMarkupPageNext()
      );
    }

    // Page one and there are no other pages
    return "";
  }

  _generateMarkupPageNext() {
    return `
        <button data-goto="${
          this._currentPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>page ${this._currentPage + 1}</span>
            <svg class="search__icon">
                <use href="${ICONS}#icon-arrow-right"></use>
            </svg>
        </button>
    `;
  }

  _generateMarkupPagePrevious() {
    return `
        <button data-goto="${
          this._currentPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${ICONS}#icon-arrow-left"></use>
            </svg>
            <span>page ${this._currentPage - 1}</span>
        </button>
     `;
  }
}
export default new PaginationView();
