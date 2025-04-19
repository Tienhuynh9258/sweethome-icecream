
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { IceCreamCone } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <IceCreamCone className="h-16 w-16 text-strawberry mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-chocolate mb-6">
                Về Sweethome
              </h1>
            </div>
            <div className="prose prose-lg mx-auto text-chocolate/80">
              <p className="mb-6">
                Sweethome được thành lập vào năm 2020 với mong muốn mang đến những
                hương vị kem thủ công chất lượng cao cho khách hàng. Chúng tôi tin
                rằng mỗi viên kem không chỉ là món tráng miệng, mà còn là một trải
                nghiệm đáng nhớ.
              </p>
              <p className="mb-6">
                Tại Sweethome, chúng tôi chỉ sử dụng những nguyên liệu tươi ngon
                nhất, kết hợp với công thức độc đáo được phát triển bởi các đầu
                bếp giàu kinh nghiệm của chúng tôi.
              </p>
              <p>
                Đội ngũ nhân viên thân thiện và nhiệt tình của chúng tôi luôn sẵn
                sàng phục vụ quý khách với nụ cười trên môi và sự chuyên nghiệp
                trong từng chi tiết.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
