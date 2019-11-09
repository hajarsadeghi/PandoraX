export const verifyEmail = (url, params, callback) => {
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
export const createSpace = (url, params, callback) => {
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

export const createBudget = (url, params, callback) => {
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

export const getCreatedBudget = (url, params, callback) => {
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
export const getBadgeImages = (callback) => {
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
export const getBadgeList = (callback) => {
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
export const addNewBadge = (params, callback) => {
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
export const getUsers = (params, callback) => {
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
export const newPost = (params, callback) => {
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
export const getFeed = (params, callback) => {
    return fetch(
        '/api/activity?' + $.param(params),
        {
            data_type: 'json',
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
// ... get likers detail
export const listOfLikers = (id, callback) => {
    return fetch(
        '/api/activity/'+ id +'/like/',
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
// ... comment
export const postComment = (id, params, callback) => {
    return fetch(
        '/api/activity/'+ id +'/comment/',
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
// ... view comment
export const viewComment = (url, callback) => {
    return fetch(
        url,
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
// ... like comment
export const likeComment = (id, cmt_id, callback) => {
    return fetch(
        '/api/activity/'+ id +'/comment/' + cmt_id + '/like/',
        {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Space-Id': space_id
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
// ... wallet 
export const getWallet = (callback) => {
    return fetch(
        '/api/transaction/wallet_status/',
        {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Space-Id': space_id
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