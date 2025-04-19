
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-cream to-vanilla min-h-[80vh] flex items-center">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-chocolate mb-6 animate-float">
            Kem Sweethome
          </h1>
          <p className="text-xl md:text-2xl text-chocolate/80 mb-8 max-w-2xl mx-auto">
            Hương vị ngọt ngào của tổ ấm, nơi mỗi muỗng kem là một kỷ niệm đáng nhớ
          </p>
          <Button className="bg-strawberry hover:bg-strawberry/90 text-white px-8 py-6 text-lg">
            Khám phá menu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
