export default function getRefs() {
    return {
        searchForm: document.querySelector('.search-form'),
        searchInput: document.querySelector('.search-input'),
        searchBtn: document.querySelector('.search-btn'),
        imagesContainer: document.querySelector('.gallery'),
        loadMoreBtn: document.querySelector('[data-action="load-more"]'),
    };
}