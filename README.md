# E-Commerce CMS
E-Commerce CMS is an application to manage your products. This app has :<br>
* RESTful endpoint for product's CRUD operation
* JSON formatted response

|  No | URL               | Method        |
|-----| -------------     |:-------------:|
|  1  | /login            | POST          |
|  2  | /products         | POST          |
|  3  | /products         | GET           |
|  4  | /products/:id     | GET           |
|  5  | /products/:id     | PUT           |
|  6  | /products/:id     | DELETE        |

<br>

## RESTful endpoints
### Global Responses
> For all endpoints that required token

_Response (404 - Token Not Found)_
```json
{
    "message": "Token not found"
}
```
> For all endpoints

_Response (500 - Internal Server Error)_
```json
{
    "message": "Internal server error"
}
```
---
### POST /login
> Login using user account

_Request Body_
```json
{
    "email": "<your email>",
    "password": "<your password>",
}
```
_Response (200 - Ok)_
```
{
    "id": <given id by system>,
    "email": "<posted email>",
    "token": "<your token>"
}
```
_Response (400 - Bad Request)_
```json
{
    "message": "Username/Password not match"
}
```
_Response (404 - Not Found)_
```json
{
    "message": "Username not found"
}
```
---
### POST /products
> Create new product

_Request Header_
```json
{
    "token": "<your token>"
}
```
_Request Body_
```json
{
    "name": "product name",
    "image_url": "http://your-image-url.com/img.png",
    "price": 100000,
    "stock": 100
}
```
_Response (201 - Created)_
```json
{
    "id": 1,
    "name": "product name",
    "image_url": "http://your-image-url.com/img.png",
    "price": 100000,
    "stock": 100,
    "UserId": 1,
    "updatedAt": "2020-06-17T16:38:51.584Z",
    "createdAt": "2020-06-17T16:38:51.584Z"
}
```
_Response (400 - Bad Request)_
```json
{
    "message": "Name can't be empty,Name min 3 characters,Invalid url format,Price can't be empty,Stock can't be empty"
}
```
---
### GET /products
> Show all products

_Request Header_
```json
{
    "token": "<your token>"
}
```
_Response (200 - Ok)_
```json
[
    {
        "id": 1,
        "name": "product name",
        "image_url": "http://your-image-url.com/img.png",
        "price": 100000,
        "stock": 100,
        "UserId": 1,
        "updatedAt": "2020-06-17T16:38:51.584Z",
        "createdAt": "2020-06-17T16:38:51.584Z"
    }, {
        ...
    }
]
```
---
### GET /products/:id
> Show product based on ID

_Request Header_
```json
{
    "token": "<your token>"
}
```
_Response (200 - Ok)_
```json
{
    "id": 1,
    "name": "product name",
    "image_url": "http://your-image-url.com/img.png",
    "price": 100000,
    "stock": 100,
    "UserId": 1,
    "updatedAt": "2020-06-17T16:38:51.584Z",
    "createdAt": "2020-06-17T16:38:51.584Z"
}
```
_Response (404 - Not Found)_
```json
{
    "message": "Product not found"
}
```
---
### PUT /products/:id
> Edit product based on ID

_Request Params_
```
{
    "id": integer
}
```
_Request Header_
```json
{
    "token": "<your token>"
}
```
_Request Body_
```json
{
    "name": "product name 2",
    "image_url": "http://your-image-url-2.com/img.png",
    "price": 200000,
    "stock": 200,
}
```
_Response (200 - Updated)_
```json
{
    "name": "product name 2",
    "image_url": "http://your-image-url-2.com/img.png",
    "price": 200000,
    "stock": 200,
}
```
_Response (400 - Bad Request)_
```json
{
    "message": "Name can't be empty, Name min 3 characters, Invalid url format, Price can't be below zero, Stock can't be below zero"
}
```
_Response (404 - Not Found)_
```json
{
    "message": "Product not found"
}
```
---
### DELETE /products/:id
> Delete product based on ID

_Request Params_
```
{
    "id": integer
}
```
_Request Header_
```json
{
    "token": "<your token>"
}
```
_Response (200 - oK)_
```json
{
    "message": "product successfully deleted"
}
```
