import { PrismaClient } from '@prisma/client'
import usersData from '../data/users.json' assert { type: "json" }
import propertiesData from '../data/properties.json' assert { type: "json" }
import amenitiesData from '../data/amenities.json' assert { type: "json" }

const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] })

async function main() {
    const { users } = usersData
    const { properties } = propertiesData
    const { amenities } = amenitiesData

    try {
        //seed users
        for (const user of users) {
            await prisma.user.upsert({
                where: { id: user.id },
                update: {},
                create: user,
            })
        }

        //seed properties
        for (const property of properties) {
            await prisma.property.upsert({
                where: { id: property.id },
                update: {},
                create: property,
            })
        }

        //seed amenities
        for (const amenity of amenities) {
            await prisma.amenity.upsert({
                where: { id: amenity.id },
                update: {},
                create: amenity,
            })
        }

        console.log('Data seeding completed succesfully.')
    } catch (error) {
        console.error('Error during data seeding:', error)
    } finally {
        await prisma.$disconnect()
    }
}


main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })