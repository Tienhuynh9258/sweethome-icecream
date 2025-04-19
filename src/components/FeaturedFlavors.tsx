
import { Card, CardContent } from "./ui/card";

const flavors = [
  {
    name: "Vani Pháp",
    description: "Hương vị ngọt ngào từ những hạt vani tự nhiên",
    color: "bg-vanilla",
  },
  {
    name: "Dâu tươi",
    description: "Được làm từ dâu tây tươi ngon nhất",
    color: "bg-strawberry",
  },
  {
    name: "Bạc hà",
    description: "Vị the mát, sảng khoái",
    color: "bg-mint",
  },
];

const FeaturedFlavors = () => {
  return (
    <section className="py-16 bg-cream">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-chocolate text-center mb-12">
          Hương vị đặc trưng
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {flavors.map((flavor) => (
            <Card key={flavor.name} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className={`${flavor.color} p-6 h-full min-h-[200px] flex flex-col justify-center items-center text-center`}>
                <h3 className="text-xl font-bold text-chocolate mb-4">{flavor.name}</h3>
                <p className="text-chocolate/80">{flavor.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedFlavors;
