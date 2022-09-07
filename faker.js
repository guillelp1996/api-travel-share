const {faker} = require('@faker-js/faker');
const bcrypt = require("bcrypt");
const getDB = require("./database/getDB");

const pool = getDB();


let userName  = faker.name.firstName()
let category = "playa"
let city = faker.address.city();
let description = faker.lorem.paragraphs()


const typeCommand  = process.argv[2] || "all";
const quantity = Number(process.argv[3] )|| 3;

// console.log(typeCommand , quantity)


const main = async ()=>{
    try {
        const countAdmin= false;
        switch (typeCommand) {
            case "user":
                inserUsersInDB(quantity);
                break;
            case "data":
                insertPublicationsinDB(quantity)
                break
            case "all":
                inserUsersInDB(quantity);
                insertPublicationsinDB(quantity)
                inserAdmin();
                break;
            case "admin":
                inserAdmin();
                break;
            default:
                console.error("invalid argumen")
        }
        
    } catch (error) {
        
    }
}

const inserUsersInDB =async (arg)=>{
    try {
       return console.log(`created ${arg} users`)
        
    } catch (error) {
        throw new Error(error)
    }
}

const insertPublicationsinDB =async(arg)=>{
    try {
        
        await pool.query(`INSERT INTO  publications (user_id, category, title, description) VALUES (?,?,?,?)`, [1,category, `fuimos a ${city} y lo pasamos genial`, description])
        
        console.log(`created ${arg} publications`)


    } catch (error) {
        throw new Error(error)
    }
}
const inserAdmin = async()=>{
    try {
        // we find if admin exist
        const [[isAdmin]] = await pool.query(" SELECT * FROM users WHERE role = 'admin'");
        if(isAdmin){
            console.log('admin was created, sorry!')
            return;
        }

        const pass =await  bcrypt.hash('123456',10);
        await pool.query(`INSERT INTO users (email, password, role, name) VALUES (?, ?, ?, ?)`,["admin@admin.es", pass,"admin","admin"])

        return console.log("admin created...")
    } catch (error) {
        console.error(error)
    } finally {
        process.kill(0) 
        
    }
}
main()