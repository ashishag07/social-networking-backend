import server from "./index.js";
import { connectDB } from "./src/configs/mongodb.config.js";

// listen to the server
server.listen(process.env.PORT || 8800, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
  connectDB();
});
