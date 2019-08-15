export const verify_email = (url, params, callback) => {
    return fetch(
        url,
        {
            method: "POST",
            body: JSON.stringify(params)
        }
    ).then(response => {
        if (response.status >= 200 && response.status <= 299) {
            response.json().then(res => {
                callback(true, res);
            });
        }
    })
}
// ... check company slug, create space, add teammates
export const create_space = (url, params, callback) => {
    return fetch(
                url,
                {
                    method: "POST",
                    body: JSON.stringify(params)
                }
            ).then(response => {
                if (response.status >= 200 && response.status <= 299) {
                    response.json().then(res => {
                        callback(true, res);
                    });
                } else {
                    callback(false, res);
                }
            })
}