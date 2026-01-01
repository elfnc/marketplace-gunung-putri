import { getFeaturedProducts } from "../server/getProduct"
import { ProductCard } from "./ProductCard"

export async function FeaturedProducts() {
    const products = await getFeaturedProducts()

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-[#1C1C1C]">Produk Unggulan</h2>
                    <p className="text-muted-foreground">Pilihan terbaik dari tetangga sekitar.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            slug={product.slug}
                            price={Number(product.price)}
                            imageUrl={product.imageUrl}
                            umkmName={product.umkm.name}
                            category={product.umkm.category.name}
                            description={product.description}
                            umkmAddress={product.umkm.address}
                            umkmId={product.umkmId}
                            umkmPhone={product.umkm.phone}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}