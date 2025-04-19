
import { useCart } from "@/contexts/CartContext";
import { useFlavors } from "@/hooks/useFlavors";
import { Button } from "./ui/button";

const FeaturedFlavors = () => {
  const { flavors, isLoading, error } = useFlavors();
  const { addToCart } = useCart();

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {flavors.map((flavor) => (
          <div
            key={flavor.id}
            className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
          >
            <img
              src={flavor.image_url}
              alt={flavor.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-chocolate mb-2">
                {flavor.name}
              </h3>
              <p className="text-gray-600 mb-4">{flavor.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-strawberry font-bold text-lg">
                  {flavor.price.toLocaleString()}đ
                </span>
                <Button
                  onClick={() => addToCart(flavor)}
                  className="bg-strawberry hover:bg-strawberry/90"
                >
                  Thêm vào giỏ
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedFlavors;
