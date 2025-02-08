import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as users from './users-model.mjs';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

const PORT = process.env.PORT;
const KEY = process.env.JWT_SECRET

// exploration-using-mongoose-to-implement-crud-operations


// CREATE controller ******************************************
app.post ('/users', asyncHandler(async (req,res) => { 
    console.log(req.body)
    const user = await users.createUser(
        req.body.email, 
        req.body.password
        )
    res.send(user);
}));

// FILTER through the object using If Else syntax  ****************** 
// 1 PARM ONLY --- does not work when asking for multiple params
function userFilter(req) {
    let filter = {};
    if (req.query._id !== undefined) {
        filter._id = req.query._id;
    } if (req.query.email !== undefined) {
         filter.email = req.query.email;
    } 
    return filter;
}


// RETRIEVE ****************************************************

// Retrieve user by login   
app.post('/auth', (req,res) => { 
    const email = req.body.email
    users.findByEmail(email).then(user => {
        if (user != null) {
            if (req.body.password == user.password) {
                const token = jwt.sign({
                    id: user._id,
                    email: user.email,
                }, KEY)
                res.status(200).json({token});
            }
        } else {
            res.status(404).json({ Error: 'Requested user could not be found.' });
        }         
     })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'There was a problem retreiving user information.' });
    });
});



// ALL or filtered set of documents controller   
app.get ('/retrieve', asyncHandler(async (req,res) => { 
    const filter = userFilter(req);
    const result = await users.findUsers(filter)
    res.send(result);
}));



// DELETE Functions and Controller ******************************

// Delete by ID with error catching
function deleteById(req, res) {
    users.deleteById(req.query._id)
        .then(deletedCount => {
            res.send({ deletedCount: deletedCount });
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
}

// Delete based on the filter
function deleteByProperty(req, res) {
    const filters = userFilter(req);
    users.deleteByProperty(filters)
        .then(deletedCount => {
            res.send({ deletedCount: deletedCount });
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
}

// DELETE document by ID or by Property controller
app.get('/delete', (req, res) => {
    if (req.query._id !== undefined) {
        deleteById(req, res);
    } else {
        deleteByProperty(req, res);
    }
});



// UPDATE documents controller ************************************
app.get('/update', (req, res) => {
    // Find the user via the _id and if found, filter, 
    // make the update, and print the number of updated documents.
    users.findById(req.query._id)
        .then(user => {
            if (user !== null) {
                const update = {};
                if (req.query.email !== undefined) {
                    update.email = req.query.email;
                }
                if (req.query.password !== undefined) {
                    update.password = req.query.password;
                }
                users.updateUser({ _id: req.query._id }, update)
                    .then(updateCount => {
                        res.send({ updateCount: updateCount });
                    })
                    .catch(error => {
                        console.error(error);
                        res.send({ Error: 'The document was not updated.'});
                    });
            } else {
                res.send({ Error: 'The document was not found.' });
            }
        })
        .catch(error => {
            console.error(error);
            res.json({ Error: error });
        });

});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});