const API_KEY = '24728459-be2225cc9633c01bc9e770090';//https://pixabay.com/api/docs/
const BASE_URL = 'https://pixabay.com/api/';
const axios = require('axios');//https://axios-http.com/docs/example

export default class ImagesApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchImages() {
        const searchParams = new URLSearchParams({
            key: API_KEY, // key - твой уникальный ключ доступа к API.
            q: this.searchQuery, // q - термин для поиска. То, что будет вводить пользователь.
            image_type: 'photo', // image_type - тип изображения. Мы хотим только фотографии, поэтому задай значение photo.
            orientation: 'horizontal', // orientation - ориентация фотографии. Задай значение horizontal.
            safesearch: true, // safesearch - фильтр по возрасту. Задай значение true.
            page: this.page,//Pixabay API поддерживает пагинацию и предоставляет параметры page
            per_page: 40,//и per_page. Сделай так, чтобы в каждом ответе приходило 40 объектов (по умолчанию 20).
        })
        const url = `${BASE_URL}?${searchParams}`;

        try {
            const resp = await axios.get(url);
            this.incrementPage();
            return resp.data;
        }
        catch (error) {
            return error;
        }
    }
    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;//При поиске по новому ключевому слову значение page надо вернуть в исходное, так как будет пагинация по новой коллекции изображений.
    }

    incrementPage() {
        this.page += 1;//При каждом последующем запросе, его необходимо увеличить на 1.
    }

    resetPage() {
        this.page = 1;//Изначально значение параметра page должно быть 1.
    }
}