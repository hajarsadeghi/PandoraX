export const verify_email = (params, callback) => {
    return fetch(
                "api/user/login/otp/request/",
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
            });
}