# BMG-Backend-Test

Collection for routes Backend Test
===============================================================


**User Register**
----
  Register Account


* **URL**

  /user/register


* **Method:**

  `POST`


* **DATA PARAMS**
  REQUIRED

  `userName = [string]`
  `password = [string]`
  `name = [string]`
  `email = [string]`
  `referralCode = [string]`


* **Succes Response**

  * **Code:** 201 <br />
    **Content:**
    {
        "userName": "Username User",
        "name": "Name User",
        "email": "Email User"
    }


* **Error Response:**

  * **Code:** 

  400 BAD REQUEST
    **Content:**
    {
        "errors": 
            "Validation error: Username REQUIRED,\n
            Validation error: PLease input ALPHANUMERIC,\n
            Validation error: Password REQUIRED,\n
            Validation error: Please input ALPHANUMERIC,\n
            Validation error: Name REQUIRED,\n
            Validation error: please input with format email (foo@bar.com)"
    }

  OR

  500 INTERNAL SERVICE EROR
    **Content:**
    { errors: `Internal Server Error` }


--------------------------------------------------------


**User Login**
----
  Login Account


* **URL**

  /user/login


* **Method:**

  `POST`


* **DATA PARAMS**
  REQUIRED

  `userName = [string]`
  `password = [string]`


* **Succes Response**

  * **Code:** 200 <br />
    **Content:**
    {
        "access_token": "access_token"
    }


* **Error Response:**

  * **Code:** 

  400 BAD REQUEST
    **Content:**
    {
        "message": "Password/Email Ivalid"
    }

  OR

  500 INTERNAL SERVICE EROR
    **Content:**
    { errors: `Internal Server Error` }


--------------------------------------------------------

**Update Data User**
----
  Update Data User


* **URL**

  /user/update


* **Method:**
  
  `PUT`


* **Request Headers**
  REQUIRED
  `headers = 'access_token'`


* **DATA PARAMS**
  REQUIRED
  
  `userName = [string]`
  `name = [string]`
  `email = [string]`
  
  
* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:**
    {
        "id": "Id User",
        "userName": "Username User",
        "name": "Name User",
        "email": "Email User",
        "referralCode": "Referral Code User"
    }
 

* **Error Response:**

  * **Code:** 
  400 BAD REQUEST <br />
    **Content**
    {
    "error": [
            "Username REQUIRED",
            "PLease input ALPHANUMERIC",
            "Name REQUIRED",
            "Please input ALPHANUMERIC",
            "please input with format email (foo@bar.com)"
        ]
    }

  OR

  500 INTERNAL SERVICE EROR
    **Content:**
    { errors: `Internal Server Error` }


  ------------------------------------------------------------


**GET Information With Acces Refferal Code**
----
  GET DATA With Acces Refferal Code


* **URL**

  /user/information


* **Method:**
  
  `POST`


* **Request Headers**
  REQUIRED
  `headers = 'access_token'`


* **DATA PARAMS**
  REQUIRED
  
  `inputUser = [string]`
  `codeRefferal = [string]`


* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:**
    {
        "id": "Id User",
        "userName": "Username User",
        "password": "Password User",
        "name": "Name User",
        "email": "Email User",
        "referralCode": "Code Refferal User",
        "createdAt": "new Date()",
        "updatedAt": "new Date()"
    }
 

* **Error Response:**

  * **Code:** 
  401 Unauthorized <br />
    **Content:**
    {
        "message": "Please login first"
    }

  OR

  500 INTERNAL SERVICE EROR
    **Content:**
    { errors: `Internal Server Error` }


------------------------------------------------------------


**Find Username By Req.body**
----
  Find Username User


* **URL**

  /user/find


* **Method:**
  
  `POST`


* **DATA PARAMS**
  REQUIRED
  
  `inputUser = [string]`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    [
        {
            "id": "Id User",
            "userName": "Username User",
            "password": "Password User",
            "name": "Name User",
            "email": "Email User",
            "referralCode": "Referral Code User",
            "createdAt": "new Date()",
            "updatedAt": "new Date()"
        }
    ]


* **Error Response:**

  * **Code:** 
  500 INTERNAL SERVICE EROR
    **Content:**
    { errors: `Internal Server Error` }


------------------------------------------------------------


**Read Data From 3rd Party API**
----
  GET Data With Input For Give Suggest from Request API


* **URL**

  /user/hero


* **Method:**
  
  `POST`

  
* **Success Response:**
  
  * **Code:** 200 
    **Content:**
    {
    "data": [
        {
            "version": "Data Version",
            "id": "Data Id",
            "key": "Data Key",
            "name": "Data Name",
            "title": "Data Title",
            "blurb": "Data Blurb",
            "info": {
                "attack": "Data Attack",
                "defense": ""Data Defense",
                "magic": "Data Magic",
                "difficulty": "Data Difficulty"
            },
            "image": {
                "full": "Ahri.png",
                "sprite": "champion0.png",
                "group": "champion",
                "x": 48,
                "y": 0,
                "w": 48,
                "h": 48
            },
            "tags": [
                "Mage",
                "Assassin"
            ],
            "partype": "MP",
            "stats": {
                "hp": 514.4,
                "hpperlevel": 80,
                "mp": 334,
                "mpperlevel": 50,
                "movespeed": 330,
                "armor": 20.88,
                "armorperlevel": 3.5,
                "spellblock": 30,
                "spellblockperlevel": 0,
                "attackrange": 550,
                "hpregen": 6.505,
                "hpregenperlevel": 0.6,
                "mpregen": 6,
                "mpregenperlevel": 0.8,
                "crit": 0,
                "critperlevel": 0,
                "attackdamage": 53.04,
                "attackdamageperlevel": 3,
                "attackspeedoffset": -0.065,
                "attackspeedperlevel": 2
                }
            }
        ]
    }
 
* **Error Response:**

  * **Code:** 
  500 INTERNAL SERVER ERROR
    **Content:**
    { errors: `Internal Server Error` }