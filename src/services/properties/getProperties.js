// getProperties.js
import { PrismaClient } from "@prisma/client";

const getProperties = async (id) => {
    const prisma = new PrismaClient();

    const foundWithPrisma = await prisma.property.findMany({
        where: {
            location: {
				contains: id
			}
        }
    });
	// console.log("foundWithPrisma:",foundWithPrisma)
	return foundWithPrisma
}


export default getProperties;