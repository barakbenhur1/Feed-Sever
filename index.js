const express = require("express")
const app = express()

const fs = require('fs')

app.get("/", function (request, response) {
    response.send("Hello World!")
})

app.listen(10000, function () {
    console.log("Started application on port %d", 10000)
});

app.get('/posts', function (req, res) {
    read('json db/posts.json', res)
})

app.get('/photos', function (req, res) {
    read('json db/photos.json', res)
})

app.get('/toDos', function (req, res) {
    read('json db/toDos.json', res)
})

app.get('/users', function (req, res) {
    read('json db/users.json', res)
})

app.get('/addPost', function (req, res) {
    console.log(req.query.geo)
    let post = {
        "geo": req.query.geo,
        "userId": Number(req.query.userId),
        "id": Number(req.query.id),
        "title": req.query.title,
        "body": req.query.body
    }
    write(post, 'json db/posts.json', res)
})

app.get('/addPhoto', function (req, res) {
    let photo = {
        "geo": req.query.geo,
        "albumId": Number(req.query.albumId),
        "userId": Number(req.query.userId),
        "id": Number(req.query.id),
        "title": req.query.title,
        "url": req.query.url,
        "thumbnailUrl": req.query.url
    }
    write(photo, 'json db/photos.json', res)
})

app.get('/addToDo', function (req, res) {
    let toDo = {
        "geo": req.query.geo,
        "userId": Number(req.query.userId),
        "id": Number(req.query.id),
        "title": req.query.title,
        "completed": false
    }
    write(toDo, 'json db/toDos.json', res)
})

app.get('/addUser', function (req, res) {
    let user = {
        "geo": req.query.geo,
        "id": Number(req.query.id),
        "userId": Number(req.query.userId),
        "name": req.query.name,
        "username": req.query.username,
        "email": req.query.email,
        "address": {
            "street": req.query.street,
            "suite": req.query.suite,
            "city": req.query.city,
            "zipcode": req.query.zipcode,
            "geo": {
                "lat": req.query.lat,
                "lng": req.query.lng
            }
        },
        "phone": req.query.phone,
        "website": req.query.website,
        "company": {
            "name": req.query.companyName,
            "catchPhrase": req.query.catchPhrase,
            "bs": req.query.bs
        }
    }
    write(user, 'json db/users.json', res)
})

app.get('/removePost', function (req, res) {
    remove('json db/posts.json', req.query.id, res)
})

app.get('/removePhoto', function (req, res) {
    remove('json db/photos.json', req.query.id, res)
})

app.get('/removeToDo', function (req, res) {
    remove('json db/toDos.json', req.query.id, res)
})

app.get('/removeUser', function (req, res) {
    remove('json db/users.json', req.query.id, res)
})

app.get('/updatePost', function (req, res) {
    let post = {
        "geo": req.query.geo,
        "userId": Number(req.query.userId),
        "id": Number(req.query.id),
        "title": req.query.title,
        "body": req.query.body
    }
    update('json db/posts.json', req.query.id, post, res)
})

app.get('/updatePhoto', function (req, res) {
    let photo = {
        "geo": req.query.geo,
        "albumId": Number(req.query.albumId),
        "userId": Number(req.query.userId),
        "id": Number(req.query.id),
        "title": req.query.title,
        "url": req.query.url,
        "thumbnailUrl": req.query.url
    }
    console.log(photo)
    update('json db/photos.json', req.query.id, photo, res)
})

app.get('/updateToDo', function (req, res) {
    let toDo = {
        "geo": req.query.geo,
        "userId": Number(req.query.userId),
        "id": Number(req.query.id),
        "title": req.query.title,
        "completed": false
    }
    update('json db/toDos.json', req.query.id, toDo, res)
})

app.get('/updateUser', function (req, res) {
    let user = {
        "geo": req.query.geo,
        "id": Number(req.query.id),
        "userId": Number(req.query.userId),
        "name": req.query.name,
        "username": req.query.username,
        "email": req.query.email,
        "address": {
            "street": req.query.street,
            "suite": req.query.suite,
            "city": req.query.city,
            "zipcode": req.query.zipcode,
            "geo": {
                "lat": req.query.lat,
                "lng": req.query.lng
            }
        },
        "phone": req.query.phone,
        "website": req.query.website,
        "company": {
            "name": req.query.companyName,
            "catchPhrase": req.query.catchPhrase,
            "bs": req.query.bs
        }
    }
    update('json db/users.json', req.query.id, user, res)
})

function remove(filename, id, res) {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading file from disk: ${err}`)
        } else {
            let items = JSON.parse(data)

            for (i = 0; i < items.length; i++) {
                if (items[i]['id'] == Number(id)) {
                    delete items[i]
                    items = items.filter(item => item !== null);
                }
            }

            fs.writeFile(filename, JSON.stringify(items, null, 4), err => {
                if (err) {
                    console.log(`Error reading file from disk: ${err}`)
                }
                else {
                    res.send()
                }
            })
        }
    })
}

function write(item, to, res) {
    fs.readFile(to, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading file from disk: ${err}`)
        } else {
            const items = JSON.parse(data)

            items.push(item)

            fs.writeFile(to, JSON.stringify(items, null, 4), err => {
                if (err) {
                    console.log(`Error reading file from disk: ${err}`)
                }
                else {
                    res.send()
                }
            })
        }
    })
}

function update(filename, id, update, res) {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading file from disk: ${err}`)
        } else {
            let items = JSON.parse(data)
            for (i = 0; i < items.length; i++) {
                if (items[i]['id'] == Number(id)) {
                    items[i] = update
                }
            }

            fs.writeFile(filename, JSON.stringify(items, null, 4), err => {
                if (err) {
                    console.log(`Error reading file from disk: ${err}`)
                }
                else {
                    res.send()
                }
            })
        }
    })
}

function read(fileName, res) {
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading file from disk: ${err}`)
        } else {
            // parse JSON string to JSON object
            const items = JSON.parse(data)
            res.send(items)
        }
    })
}
