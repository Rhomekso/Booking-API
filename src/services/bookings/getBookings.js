// getBookings.js
import { PrismaClient } from "@prisma/client";

const getBookings = async (id) => {
    const prisma = new PrismaClient();

    const gevondenMetPrisma = await prisma.booking.findMany({
        where: {
            userId: {
				contains: id
			}
        }
    });
	// console.log("gevondenMetPrisma:",gevondenMetPrisma)
	return gevondenMetPrisma
}


export default getBookings;