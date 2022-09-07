const getDB = require("../database/getDB")

const main = async()=>{

    
    try {
        const pool = getDB();

        for (let index = 0; index < Number(process.argv[2]); index++) {
            console.log(index)
            await pool.query(`insert into users (email, password, name) values("guille${index}@correo.es", 12345678, "guille${index}");`);

            await pool.query(`insert into publications ()`)
            
        }
        

    } catch (error) {
        console.log(error)
    }finally{
        process.kill(0)
    }

}


main()