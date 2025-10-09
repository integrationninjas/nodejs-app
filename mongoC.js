import { MongoClient } from "mongodb";

const password = encodeURIComponent(process.env.MONGO_PASSWORD.trim());
const connectionString = `mongodb+srv://kunalkashyap8024_db_user:${password}@cluster0.hgb489o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`; // clustore url
const client = new MongoClient(connectionString);
let conn;
try {
  conn = await client.connect();
  console.log("connection successful")
} catch(e) {
  console.error(e);
}
let db = conn.db("integration_ninjas");
export default db;
