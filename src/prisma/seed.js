import { PrismaClient } from '@prisma/client'
import usersData from '../data/users.json' assert { type: "json" }

const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] })

async function main() {
    const { users } = usersData

    try {
        //seed users
        for (const user of users) {
            await prisma.user.upsert({
                where: { id: user.id },
                update: {},
                create: user,
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