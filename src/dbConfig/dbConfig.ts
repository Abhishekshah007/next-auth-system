const mongoose = require("mongoose");

const connect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URI!);
    conn.connection.on("connected", () => {
      console.log("MongoDB Connected");
    });
    conn.connection.on("error", (error: any) => { // Passing error to console.error
      console.error("MongoDB connection error:", error); // Logging error properly
      process.exit(1);
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connect;
