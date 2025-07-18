
import { Card } from '@/components/ui/card';

const ValueProps = () => {
  const valueProps = [
    {
      icon: "🚚",
      title: "Free Shipping",
      description: "On orders over $99+",
      highlight: "Express delivery available"
    },
    {
      icon: "🔒",
      title: "Secure Payment",
      description: "SSL encrypted checkout",
      highlight: "Multiple payment options"
    },
    {
      icon: "🔄",
      title: "30-Day Returns",
      description: "Easy return policy",
      highlight: "Hassle-free process"
    },
    {
      icon: "💬",
      title: "24/7 Support",
      description: "Customer service",
      highlight: "Live chat available"
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueProps.map((prop, index) => (
            <Card key={index} className="p-6 text-center border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="text-3xl mb-4">
                {prop.icon}
              </div>
              <h3 className="text-lg font-poppins font-semibold text-gray-900 mb-2">
                {prop.title}
              </h3>
              <p className="text-gray-600 text-sm mb-1">
                {prop.description}
              </p>
              <p className="text-primary text-xs font-medium">
                {prop.highlight}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
