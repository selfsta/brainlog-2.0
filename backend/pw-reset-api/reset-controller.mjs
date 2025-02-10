import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as users from './users-model.mjs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport'
import xoauth2 from 'xoauth2'
const app = express();
app.use(express.json());



const PORT = process.env.PORT;
const KEY = process.env.JWT_SECRET
const EMAIL = process.env.NODE_EMAIL
const PSSW = process.env.NODE_PSSWRD

// exploration-using-mongoose-to-implement-crud-operations


// CREATE controller ******************************************
app.post('/users', asyncHandler(async (req,res) => {
    const {name, email, password} = req.body
    const exists = await users.findByEmail(email)
    if (exists) {
        res.status(409).json({ error: 'User already exists' });
    } else {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await users.createUser(
            name, 
            email, 
            hashedPassword
            )
        res.send(user);
    }
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

// Get user
    app.get('/user:_id', asyncHandler(async (req,res) => { 
    const filter = userFilter(req.params._id);
    const result = await users.findUsers(filter)
    res.send(result);
}));

// Login   
app.post('/auth', asyncHandler( async (req,res) => { 
    const { email, password } = req.body
    const user =  await users.findByEmail(email)

    if(user != null && await bcrypt.compare(password, user.password)) {
        const _id = user._id.toString()
        const _name = user.name
        const token = jwt.sign({
            id: _id,
            email: user.email
        }, KEY)
        res.status(200).json({token: token,_id: _id,_name: _name});
    } else {
        res.status(404).json({ Error: 'Requested user could not be found.' });
    }         
}));


app.post('/forgot', asyncHandler( async (req,res) => { 
    const { email } = req.body
    const user =  await users.findByEmail(email)
    if(user != null) {
        const _name = user.name

    // Create a transporter object
    const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // use false for STARTTLS; true for SSL on port 465
    auth: {
        user: EMAIL,
        pass: PSSW,
    }
    });

    //const emailHtml = await render(<Email name={_name} url="localhost/5174/login" />);
    const emailHtml = `<h2>Reset your password.</h2>
                        <h3>Hello ${_name}!</h3>
                        <p>Click the link below to reset you account password. If you did not request this, disregard this email.</p>`

    // Configure the mailoptions object
    const options = {
    from: 'brainlog@donotreply.com',
    to: email,
    subject: 'Reset your BrainLog Password.',
    html: emailHtml,
    };
    
        // Send the email
    transporter.sendMail(options, function(error, info){
    if (error) {
        console.log('Error:', error);
    } else {
        res.status(200).send()
    }
    });
    } else {
        res.status(404).json({ Error: 'Requested user could not be found.' });
    }         
}));



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