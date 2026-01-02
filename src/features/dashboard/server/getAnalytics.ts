import { prisma } from "@/lib/prisma"

export async function getDashboardAnalytics() {
    const [
        totalUmkm,
        activeUmkm,
        totalProducts,
        productsThisMonth,
        totalEvents,
        activeEvents
    ] = await prisma.$transaction([
        // 1. Total UMKM
        prisma.umkm.count(),

        // 2. Active UMKM (Verify if isActive field exists, otherwise skip/adjust)
        prisma.umkm.count({ where: { isActive: true } }),

        // 3. Total Products 
        prisma.product.count(),

        // 4. Products Created This Month
        prisma.product.count({
            where: {
                createdAt: {
                    gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                }
            }
        }),

        // 5. Total Events
        prisma.event.count(),

        // 6. Active Events (Next/Upcoming)
        prisma.event.count({
            where: {
                isActive: true,
                startDate: { gte: new Date() } // Future events
            }
        })
    ])

    return {
        umkm: {
            total: totalUmkm,
            active: activeUmkm
        },
        products: {
            total: totalProducts,
            newThisMonth: productsThisMonth
        },
        events: {
            total: totalEvents,
            upcoming: activeEvents
        }
    }
}
