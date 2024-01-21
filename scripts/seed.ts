import { PrismaClient } from "@prisma/client";

const database = new PrismaClient();

async function main() {
    try{
        
    }catch(error){
        console.log("Error seeding the database categories", error);
    }finally{
        await database.$disconnect();
    }
}