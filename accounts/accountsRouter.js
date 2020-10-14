const express = require("express")
const db = require("../data/dbConfig.js");

const router = express.Router()

// to fetch all accounts list
router.get("/", async (req, res, next) => {
    try {
       //SELECT * FROM accounts;
    //    const accounts = await db.select("*").from("accounts")
    // Other way
        const accounts = await db("accounts")
        res.json(accounts)
    } catch (err) {
        next(err)
    }
   });

// to fetch an specific list
router.get("/:id", async (req, res, next) => {
    try {
        //SELECT * FROM accounts WHERE id = ? LIMIT 1;
        const [accounts] = await 
        // db.select("*")
        // .from("accounts")
        //or
        db("accounts")
        .where("id", req.params.id)
        .limit(1)
        res.json(accounts)
     } catch (err) {
         next(err)
     }
})

// to insert an new list for accounts
router.post("/", async (req, res, next) => {
    try {
    
    const payload =  {
        name: req.body.name,
        budget: req.body.budget,
    }
     if (!payload.name || !payload.budget) {
         return res.status(400).json({
             message: "need a name and budget fields"
         })
     }

     //INSERT INTO messages (title, contents) VALUES (?,?) 
     const [id] = await db.insert(payload).into('accounts')
     const account = await db
     .first("*") //shortcut for destructuring the array and limit to 1
     .from("accounts")
     .where("id", id)
  
    res.json(account)
 } catch (err) {
     next(err)
 }
})

// to edit a specifi list in accounts
router.put("/:id", async (req, res, next) => {
    try {
    
        const payload =  {
            name: req.body.name,
            budget: req.body.budget,
        }
         if (!payload.name || !payload.budget) {
             return res.status(400).json({
                 message: "need a name and budget fields"
             })
         }
    
         //UPDATE messages SET title = ? AND contents = ? WHERE id = ?
         await db("accounts").where("id", req.params.id).update(payload)
         const account = await db
         .first("*") //shortcut for destructuring the array and limit to 1
         .from("accounts")
         .where("id", req.params.id)
      
        res.json(account)
     } catch (err) {
         next(err)
     }
})

// to delete a specific list from accounts
router.delete("/:id", async (req, res, next) => {
    try {
       //DELETE FROM messages WHERE id = ?
       await db("accounts").where("id", req.params.id).del()
       res.status(204).end()
     } catch (err) {
         next(err)
     }
})
   


module.exports = router