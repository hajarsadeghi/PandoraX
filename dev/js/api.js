export const verify_email = (url, params, callback) => {
    return fetch(
        url,
        {
            method: "POST",
            body: JSON.stringify(params)
        }
    ).then(response => {
        if (response.ok) {
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
                if (response.ok) {
                    response.json().then(res => {
                        callback(true, res);
                    });
                } else {
                    callback(false, res);
                }
            })
}

export const create_budget = (url, params, callback) => {
    return fetch(
        url,
        {
            method: "POST",
            body: JSON.stringify(params),
            headers:{
                'Content-Type': 'application/json',
                'Space-Id':space_id
            }
        }
    ).then(response => {
        if (response.ok) {
            response.json().then(res => {
                callback(true, res);
            });
        } else {
            callback(false, res);
        }
    })
}

export const get_created_budget = (url, params, callback) => {
    return fetch(
        url,
        {
            method: "GET",
            headers:{
                'Content-Type': 'application/json',
                'Space-Id':space_id
            }
        }
    ).then(response => {
        if (response.ok) {
            response.json().then(res => {
                callback(true, res);
            });
        } else {
            callback(false, res);
        }
    })
}
// ... badge images
export const get_badge_images = (callback) => {
    return fetch(
        '/api/badge/icon/',
        {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Space-Id':space_id
            }
        }
    ).then(response => {
        if (response.ok) {
            response.json().then(res => {
                callback(true, res)
            })
        } else {
            callback(false, res)
        }
    })
}
// ... badge list
export const get_badge_list = (callback) => {
    return fetch(
        '/api/badge/',
        {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Space-Id':space_id
            }
        }
    ).then(response => {
        if (response.ok) {
            response.json().then(res => {
                callback(true, res)
            })
        } else {
            callback(false, res)
        }
    })
}
// ... new badge
export const add_new_badge = (params, callback) => {
    return fetch(
        '/api/badge/',
        {
            method: 'POST',
            body: JSON.stringify(params),
            headers:{
                'Content-Type': 'application/json',
                'Space-Id':space_id
            }
        }
    ).then(response => {
        if (response.ok) {
            response.json().then(res => {
                callback(true, res)
            })
        } else {
            callback(false, res)
        }
    })
}
// ... list of users 
export const get_users = (params, callback) => {
    return fetch(
        '/api/space/members/?' + $.param(params),
        {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Space-Id':space_id
            }
        }
        ).then(response => {
            if (response.ok) {
                response.json().then(res => {
                    callback(true, res)
                })
            } else {
                callback(false, response)
            }
        })
}
// ... New Recognition / Post
export const new_post = (params, callback) => {
    return fetch(
        '/api/activity/',
        {
            method: 'POST',
            body: JSON.stringify(params),
            headers:{
                'Content-Type': 'application/json',
                'Space-Id':space_id
            }
        }
        ).then(response => {
            if (response.ok) {
                response.json().then(res => {
                    callback(true, res)
                })
            } else {
                callback(false, response)
            }
        })
}

// ... Get Feed
export const getFeed = (callback) => {
    return fetch(
        '/api/activity/',
        {
            headers:{
                'Content-Type': 'application/json',
                'Space-Id':space_id
            }
        }
        ).then(response => {
            if (response.ok) {
                response.json().then(res => {
                    callback(true, res)
                })
            } else {
                callback(false, response)
            }
        })
}

// ... toggle like
export const toggleLike = (id, callback) => {
    return fetch(
        '/api/activity/'+ id +'/like/',
        {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Space-Id':space_id
            }
        }
        ).then(response => {
            if (response.ok) {
                response.json().then(res => {
                    callback(true, res)
                })
            } else {
                callback(false, response)
            }
        })
}