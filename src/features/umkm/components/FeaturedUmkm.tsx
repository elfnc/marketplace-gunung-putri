import { getFeaturedUmkms } from "../server/getUmkm"
import { UmkmCard } from "./UmkmCard"


export async function FeaturedUmkm() {
  const umkms = await getFeaturedUmkms()

  return (
    <section className="py-16 bg-white border-t border-[#E6E3DF]">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#1C1C1C]">UMKM Lokal</h2>
          <p className="text-muted-foreground">Kenalan sama penjualnya langsung.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {umkms.map((umkm) => (
            <UmkmCard
              key={umkm.id}
              {...umkm}
              category={umkm.category.name}
              productCount={umkm._count.products}
              operationalHours={umkm.operationalHours}
            />
          ))}
        </div>
      </div>
    </section>
  )
}