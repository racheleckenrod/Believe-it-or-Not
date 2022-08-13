const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
           
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // uncommenting this code crashed my server... WHY???
            // useFindAndModify: false
            console.log(`MongoDB Connected: ${conn.connection.host}`)
        

       
    } catch (err) {
        console.error(err)
        console.log(`Made mistake`)
        process.exit(1)
    }
}

module.exports = connectDB