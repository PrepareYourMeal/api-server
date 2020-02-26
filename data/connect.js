const mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        console.log(`MongoDB connected to ${process.env.MONGO_URI}`);
    } catch (err) {
        console.error(err.message);
        process.exit(1); // Exit process with failure
    }
};
