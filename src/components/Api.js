const getHeaders = () => ({
    headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    })
});

const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error); // eslint-disable-line no-console
    throw error;
}

const parseJSON = (response) => {
    return response.json();
}

export const apiGet = async (command) => (
    fetch(command, {
        method: 'GET',
        headers: new Headers({
            'Accept': 'application/json'
        })
    })
        .then(checkStatus)
        .then(parseJSON)
)

export const apiPost = async (command, body) => {
    const settings = {
        method: 'POST',
        body: JSON.stringify(body),
        ...getHeaders()
    }
    return fetch(command, settings)
        .then(checkStatus)
        .then(parseJSON)
}

