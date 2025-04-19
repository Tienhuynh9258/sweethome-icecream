
import { Card, CardContent } from "./ui/card";
import { useFlavors } from "@/hooks/useFlavors";
import { Skeleton } from "./ui/skeleton";

const FeaturedFlavors = () => {
  const { flavors, isLoading, error } = useFlavors();

  if (isLoading) {
    return (
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-chocolate text-center mb-12">
            Hương vị đặc trưng
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} className="h-[300px] w-full rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <p className="text-red-500 text-center">Error loading flavors: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-cream">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-chocolate text-center mb-12">
          Hương vị đặc trưng
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {flavors.map((flavor) => (
            <Card key={flavor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className={`bg-vanilla p-6 h-full min-h-[300px] flex flex-col justify-between items-center text-center`}>
                <div>
                  <img 
                    src={flavor.image_url} 
                    alt={flavor.name} 
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-bold text-chocolate mb-4">{flavor.name}</h3>
                  <p className="text-chocolate/80 mb-4">{flavor.description}</p>
                </div>
                <div className="text-chocolate font-semibold">
                  {new Intl.NumberFormat('vi-VN', { 
                    style: 'currency', 
                    currency: 'VND' 
                  }).format(flavor.price)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedFlavors;
