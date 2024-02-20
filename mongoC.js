import { MongoClient } from "mongodb";

const password = encodeURIComponent(process.env.MONGO_PASSWORD.trim());
const connectionString = `mongodb+srv://epodatascience:${password}@devcluster.8mcy1vw.mongodb.net/?retryWrites=true&w=majority`; // clustore url
// mongodb+srv://epodatascience:<password>@devcluster.8mcy1vw.mongodb.net/?retryWrites=true&w=majority
const client = new MongoClient(connectionString);
let conn;
try {
  conn = await client.connect();
  console.log("connection successful")
} catch(e) {
  console.error(e);
}
let db = conn.db("intergation_ninjas");
export default db;