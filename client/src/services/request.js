const request = async (method, url, data) => {
    try {
        const user = localStorage.getItem('user');
        const auth = JSON.parse(user || '{}');

        let headers = {}

        if (auth.accessToken) {
            headers['x-access-token'] = auth.accessToken;
        }

        let request;

        if (method === 'GET') {
            request = fetch(url, { headers });
        } else {
            request = fetch(url, {
                method,
                mode: 'cors',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        }
        const response = await request;

        const result = await response.json();

        return result;
    } catch (error) {
        console.log({error: error.message});
    }
};

export const get = request.bind({}, 'GET');
export const post = request.bind({}, 'POST');

