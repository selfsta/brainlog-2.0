import 'dotenv/config';
import express, { json } from 'express';
import asyncHandler from 'express-async-handler';
import * as entries from './entry-model.mjs';
const app = express();
app.use(express.json());

const PORT = process.env.PORT;

// CREATE controller ******************************************
app.post ('/entry', asyncHandler(async (req,res) => { 
    const {wellbeing, emotions, sleep, journal, _u_ID} = req.body
    
    const latest = await entries.retrieveEntries(1, _u_ID)
    let hourDiff = 0
    if (latest.length == 0) {
        hourDiff = 25
    } else {
        const today = new Date()
        const lastEntry = latest[0].date
        hourDiff = Math.abs(today - lastEntry)  / (3600000);
    }

    if (hourDiff < 24.0) {
        res.status(409).json({ error: "You can only post once per day. Try again later" });
    } else {
        const entry = await entries.createEntry(
            wellbeing, emotions, sleep, journal, _u_ID
            )
        res.send(entry);
    }
}));

// RETRIEVE ****************************************************

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