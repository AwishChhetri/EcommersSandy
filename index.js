var express = require('express');
var session = require('express-session');
var ejs = require('ejs');


var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var app = express();

app.use(session({
    secret: 'This is secret',
    saveUninitialized: true,
    resave: false
}))

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public/static'))



var alert_m = ''
var login_err = ''
var sess = 0;


mongoose.connect('mongodb+srv://abishchhetri2502:YEB0VspRDHbGMexX@cluster0.ujqjgxs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{console.log("db connected")}).catch((err)=>{console.log(err)})
const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    sale_price: Number,
    quantity: Number,
    image: String,
    rating: Number,
    category: String,
    sub_category: String,
    collection: String
});

// Define the schema for Users
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    mobile_no: String
});

const cartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    order_id: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

// Create a model based on the schema
const Cart = mongoose.model('Cart', cartSchema);
// Create models based on the schemas
const Product = mongoose.model('Product', productSchema);
const User = mongoose.model('User', userSchema);
app.get('/', (req, resp) => {
    Product.find({ $or: [{ collection: "home_best_trending" }, { collection: "best_deals_2" }, { collection: "best_deals" }] })
        .then(result => {
            if (sess != 0) {
                console.log(req.session.id)
                resp.render('user', { result });
            } else {
                resp.render('home', { result });
            }
        })
        .catch(err => {
            console.log('Failed to query:', err);
            resp.status(500).send('Failed to fetch products');
        });
});





//LOGIN PAGE RENDERING
app.get('/login', (req, resp) => {
    resp.render('login.ejs', { login_err })
})



//SIGNUP PAGE RENDERING
app.get('/register', (req, resp) => {
    resp.render('register.ejs', { alert_m })
})

app.get('/upload_products', (req, resp) => {
    resp.render('upload_products.ejs')
})

app.get('/appliances', (req, resp) => {
    resp.render('products_pages/appliances.ejs')
})


app.get('/ac', (req, res) => {
    Product.find({ sub_category: "ac" })
        .then(products => {
            res.render('common_products', { result: products });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Failed to fetch products');
        });
});


app.get('/fridge', (req, res) => {
    Product.find({ sub_category: "fridge" })
        .then(products => {
            res.render('common_products', { result: products });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Failed to fetch products');
        });
});
app.get('/tv', (req, res) => {
    Product.find({ sub_category: "tv" })
        .then(products => {
            res.render('common_products', { result: products });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Failed to fetch products');
        });
});


app.get('/wm', (req, res) => {
    Product.find({ sub_category: "wm" })
        .then(products => {
            res.render('common_products', { result: products });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Failed to fetch products');
        });
});


app.get('/mobile', (req, res) => {
    Product.find({ category: "Mobile" })
        .then(products => {
            res.render('common_products', { result: products });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Failed to fetch products');
        });
});

app.get('/kids', (req, res) => {
    Product.find({ category: "Kids" })
        .then(products => {
            res.render('common_products', { result: products });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Failed to fetch products');
        });
});

app.get('/beauty', (req, res) => {
    Product.find({ category: "Beauty" })
        .then(products => {
            res.render('common_products', { result: products });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Failed to fetch products');
        });
});

app.get('/men_fashion', (req, res) => {
    Product.find({ category: "Men" })
        .then(products => {
            res.render('common_products', { result: products });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Failed to fetch products');
        });
});

app.post('/single_product', (req, res) => {
    const id = req.body.item_id;
    Product.findOne({ product_id: id })
        .then(product => {
            res.render('products_pages/one_product', { result: product });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Failed to fetch product');
        });
});







app.get('/women_fashion', (req, resp) => {
    con.query('SELECT * FROM products WHERE category="Women"', (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(result) 
            resp.render('common_products.ejs', { result: result})
        }
    })
})
app.get('/headphone', (req, resp) => {
    con.query('SELECT * FROM products WHERE sub_category="headphones"', (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(result) 
            resp.render('common_products.ejs', { result: result})
        }
    })
})
app.get('/camera', (req, resp) => {
    con.query('SELECT * FROM products WHERE sub_category="camera"', (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(result) 
            resp.render('common_products.ejs', { result: result})
        }
    })
})
app.get('/laptops', (req, resp) => {
    con.query('SELECT * FROM products WHERE sub_category="laptops"', (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(result) 
            resp.render('common_products.ejs', { result: result})
        }
    })
})
app.get('/printer', (req, resp) => {
    con.query('SELECT * FROM products WHERE sub_category="printer"', (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(result) 
            resp.render('common_products.ejs', { result: result})
        }
    })
})
app.get('/speaker', (req, resp) => {
    con.query('SELECT * FROM products WHERE sub_category="speaker"', (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(result) 
            resp.render('common_products.ejs', { result: result})
        }
    })
})
app.get('/speaker', (req, resp) => {
    con.query('SELECT * FROM products WHERE sub_category="speaker"', (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(result) 
            resp.render('common_products.ejs', { result: result})
        }
    })
})
app.get('/grocery', (req, resp) => {
    resp.render('products_pages/grocery.ejs')
})






//CREATING USER ACCOUNT
app.post('/signup_submit', (req, res) => {
    const { fullname, email, password, phoneNumber, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        console.log("PASSWORD NOT MATCHED");
        res.render('register.ejs', { alert_m: "Password not matched" });
        return;
    }

    User.findOne({ email: email })
        .then(user => {
            if (user) {
                console.log("Email already registered");
                res.render('register.ejs', { alert_m: "Email has already been registered" });
            } else {
                const newUser = new User({
                    name: fullname,
                    email: email,
                    password: password,
                    mobile_no: phoneNumber
                });

                newUser.save()
                    .then(() => {
                        console.log("User created successfully");
                        res.render('login.ejs', { login_err: '' });
                    })
                    .catch(err => {
                        console.error("Error creating user:", err);
                        res.status(500).send("Internal Server Error");
                    });
            }
        })
        .catch(err => {
            console.error("Error finding user:", err);
            res.status(500).send("Internal Server Error");
        });
});



//CHECK FOR USER ACCOUNT
app.post('/login_check', (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                console.log("User not found");
                return res.render('login.ejs', { login_err: "Email not found" });
            }

            if (user.password !== password) {
                console.log("Wrong password");
                return res.render('login.ejs', { login_err: "Wrong password" });
            }

            // Login successful
            req.session.user_id = user._id;
            console.log("SUCCESSFULLY LOGGED IN", user.name);

            Cart.find({ user_id: req.session.user_id })
                .then(cartItems => {
                    const cart_temp = cartItems.map(item => item.order_id);
                    console.log("Fetched cart details of user successfully", cart_temp);
                    req.session.cart = cart_temp;
                    res.redirect('/user');
                })
                .catch(err => {
                    console.error("Error fetching cart details:", err);
                    res.status(500).send("Internal Server Error");
                });
        })
        .catch(err => {
            console.error("Error finding user:", err);
            res.status(500).send("Internal Server Error");
        });
});


app.get('/user', (req, resp) => {
    if (sess!=0) {
        con.query('SELECT * FROM products', (err, result) => {
            resp.render('user.ejs', { result })
        })
    }
    else {
        resp.send("NO USER AUTHENTICATION")
    }
})

app.get('/logout', (req, resp) => {
    if (req.session.user_id) {
        req.session.destroy(function (err) {
            if (err) {
                console.log("cannot log out")
                resp.redirect('/')
            }
            else {
                sess = 0;
                console.log('logout successful')
                resp.redirect('/')
            }
        });
    }

})






// ADDING ITEMS TO CART USING REQUEST OR GET METHOD


app.get('/add_to_cart', (req, resp) => {
    function Productalreadyadded(cart, item_id) {
        var c = 0;
        cart.forEach(element => {
            if (element == item_id) {
                c = 1;
            }
        });
        if (c != 0) {
            return true
        }
        else {
            return false
        }

    }
    let products = [req.body.item_id]
    if (req.session.user_id) {
        if (req.session.cart.length > 0) {
            cart = req.session.cart
            if (Productalreadyadded(cart, req.body.item_id)) {
                console.log("PRODUCT ALREADY ADDED TO CART")
                resp.redirect('/user')
            }
            else {
                req.session.cart.push(products)
                query = "INSERT INTO cart(user_id,order_id,quantity) VALUES?";
                values = [
                    [req.session.user_id, req.body.item_id, 1]
                ]
                con.query(query, [values], (err, result) => {
                    if (err) {
                        console.log("NOT ADDED TO CART", err)
                    }
                    else {
                        // con.query("SELECT Users.name FROM cart INNER JOIN Users ON cart.user_id=Users.id",(err,result)=>{
                        //     if(err)
                        //     {
                        //         console.log("NOT RECEIVED DATA:",err)

                        //     }
                        //     else{
                        //     console.log(result)
                        //     }
                        // });
                        console.log("ADDED TO CART SUCCESSFULLY", result)
                        resp.redirect('/user')
                    }
                })
            }
        }
        else {
            req.session.cart = [products]
            query = "INSERT INTO cart(user_id,order_id,quantity) VALUES?";
            values = [
                [req.session.user_id, req.body.item_id, 1]
            ]
            con.query(query, [values], (err, result) => {
                if (err) {
                    console.log("NOT ADDED TO CART2", err)
                    resp.redirect('/user')

                }
                else {
                    console.log("ADDED TO CART SUCCESSFULLY2", result)
                    resp.redirect('/user')
                }
            })
        }
    }
    else {
        resp.redirect('/login')
    }
})

// ADDING ITEMS TO CART USING POST METHOD


app.post('/add_to_cart', (req, resp) => {
    function Productalreadyadded(cart, item_id) {
        var c = 0;
        cart.forEach(element => {
            if (element == item_id) {
                c = 1;
            }
        });
        if (c != 0) {
            return true
        }
        else {
            return false
        }

    }
    let products = [req.body.item_id]
    if (req.session.user_id) {
        if (req.session.cart.length > 0) {
            cart = req.session.cart
            if (Productalreadyadded(cart, req.body.item_id)) {
                console.log("PRODUCT ALREADY ADDED TO CART")
                resp.redirect('/user')
            }
            else {
                req.session.cart.push(products)
                query = "INSERT INTO cart(user_id,order_id,quantity) VALUES?";
                values = [
                    [req.session.user_id, req.body.item_id, 1]
                ]
                con.query(query, [values], (err, result) => {
                    if (err) {
                        console.log("NOT ADDED TO CART", err)
                    }
                    else {
                        // con.query("SELECT Users.name FROM cart INNER JOIN Users ON cart.user_id=Users.id",(err,result)=>{
                        //     if(err)
                        //     {
                        //         console.log("NOT RECEIVED DATA:",err)

                        //     }
                        //     else{
                        //     console.log(result)
                        //     }
                        // });
                        console.log("ADDED TO CART SUCCESSFULLY", result)
                        resp.redirect('/user')
                    }
                })
            }
        }
        else {
            req.session.cart = [products]
            query = "INSERT INTO cart(user_id,order_id,quantity) VALUES?";
            values = [
                [req.session.user_id, req.body.item_id, 1]
            ]
            con.query(query, [values], (err, result) => {
                if (err) {
                    console.log("NOT ADDED TO CART2", err)
                    resp.redirect('/user')

                }
                else {
                    console.log("ADDED TO CART SUCCESSFULLY2", result)
                    resp.redirect('/user')
                }
            })
        }
    }
    else {
        resp.redirect('/login')
    }
})
















// SELL OR UPLOADING PRODUCTS
app.post('/upload_products', (req, resp) => {
    console.log(req.body)
    query = "INSERT INTO products(name,description,price,sale_price,quantity,image,rating,category,sub_category,collection) VALUES?";
    values = [
        [req.body.name, req.body.description, req.body.price, req.body.sale_price, req.body.quantity, req.body.image,req.body.rate, req.body.category, req.body.sub_category, req.body.collection]
    ]
    con.query(query, [values], (err, result) => {
        if (err) {
            console.log("Products failed add into inventory", err)
            resp.redirect('/upload_products')
        }
        else {
            console.log("Products Successfully added to inventory")
            resp.redirect('/user')
        }
    })
})











app.listen(port = 8000)