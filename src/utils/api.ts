export const apiService = {
    getAll,
    post
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

function getAll(api: string) {
    return fetchData(api, 'GET', null);
}

function post(api: string, data: any) {
    return fetchData(api, 'POST', data);
}