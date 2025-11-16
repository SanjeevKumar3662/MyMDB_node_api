import app from "./app.js";
import { connectDB } from "./db/db.js";

(async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {}
})();
