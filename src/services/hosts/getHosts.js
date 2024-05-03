// getHosts.js
import { PrismaClient } from "@prisma/client";


const getHosts = async (id) => {
    const prisma = new PrismaClient();

    const foundWithPrisma = await prisma.host.findMany({
        where: {
            name: {
				contains: id
			}
        }
    });
	return foundWithPrisma
}

export default getHosts;