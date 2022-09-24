const baseUrl = `http://localhost:5089`;
const catalogAPI = baseUrl + '/Catalog/items?pageSize=12&pageIndex=0';

export const catalogService = {
    getAll
};

function fetchData(apiUrl: string, method: string, jsonData: any) {
    return fetch(apiUrl, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body:jsonData
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
    });
}

function getAll() {
    return fetchData(catalogAPI, 'GET', null);
}