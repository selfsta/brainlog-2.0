// Import dependencies.
import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.set('strictQuery', false);

// Connect to the Atlas cluster or local MongoDB.
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);
const db = mongoose.connection;

// Confirm that the database has connected 
// and print a message in the console.
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});


// Define the collection's schema.
const entrySchema = mongoose.Schema({
	wellbeing: { type: Number, required: true },
	emotions: { type: Array, required: true },
	sleep: { type: String, required: true },
	journal: { type: String, required: false },
	date: { type: Date, required: true },
	_user: { type: String, required: true }
});

// Compile the model from the schema.
const Entry = mongoose.model("Entry", entrySchema);



// CREATE model *****************************************
const createEntry = async (wellbeing, emotions, sleep, journal, _u_ID) => {
    const entry = new Entry({ 
        wellbeing: wellbeing,
        emotions: emotions,
        sleep: sleep,
        journal: journal,
        date: new Date(),
        _user: _u_ID
    });
    return entry.save();
}

// RETRIEVE models *****************************************

// Retrieve based on a filter and return a promise.
const findUsers = async (filter) => {
    const query = User.findOne(filter);
    return query.exec();
}

// Retrieve based on the ID and return a promise.
const findById = async (_id) => {
    const query = User.findById(_id);
    return query.exec();
}

// Retrieve based on the ID and return a promise.
const retrieveEntries = async (quantity, _id) => {
    const entries = await Entry.find({ _user: _id })
    .sort({ date: -1 }) // Sort by date in descending order (most recent first)
    .limit(parseInt(quantity)); // Limit the number of results
    return entries
}



// DELETE models  *****************************************
// Delete based on the ID.
const deleteById = async (_id) => {
    const result = await User.deleteOne({_id: _id});
    return result.deletedCount;
};

// Delete based on filter.
const deleteByProperty = async (filter) => {
    const result = await User.deleteMany(filter);
    return result.deletedCount;
}



// UPDATE model *****************************************
const updateUser = async (filter, update) => {
    const result = await User.updateOne(filter, update);
    return result.modifiedCount;
};



// Export our variables for use in the controller file.
export { createEntry, retrieveEntries }