// Import dependencies.
import mongoose from 'mongoose';
import 'dotenv/config';
import { v1 as uuidv1 } from 'uuid';

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
const resetSchema = mongoose.Schema({
	email: { type: String, required: true },
	code: { type: String, required: true },
	expires: { type: Date, required: true },
});

// Compile the model from the schema.
const Reset = mongoose.model("Reset", resetSchema);



// CREATE model *****************************************
const createReset = async (email) => {
    newCode = uuidv1().slice(0, 5)
    const userReset = new Reset({ 
        email: email,
        code: newCode,
        expires: new Date(new Date.getTime() + 10 * 60000);
    });
    return userReset.save();
}

// RETRIEVE models *****************************************


// Retrieve based on email and return a promise.
const findByEmail = async (email) => {
    return await Reset.findOne({email: email})
}

// Retrieve based on email and return a promise.
const findByID = async (ID) => {
    return await Reset.findOne({_id: ID})
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
export { createReset, findByEmail, findByID }