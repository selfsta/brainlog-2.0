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
    console.log('Successfully connected to "Users" using Mongoose!');
});


// Define the collection's schema.
const userSchema = mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true }
});

// Compile the model from the schema.
const User = mongoose.model("User", userSchema);



// CREATE model *****************************************
const createUser = async (name, email, password) => {
    const user = new User({ 
        name: name,
        email: email,
        password: password 
    });
    return user.save();
}

// RETRIEVE models *****************************************


// Retrieve based on email and return a promise.
const findByEmail = async (email) => {
    return await User.findOne({email: email})
}

// Retrieve based on a filter and return a promise.
const findUsers = async (filter) => {
    return await User.findOne(filter);
}

// Retrieve based on the ID and return a promise.
const findById = async (_id) => {
    const query = User.findById(_id);
    return query.exec();
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
export { createUser, findUsers, findById, updateUser, deleteById, deleteByProperty, findByEmail }