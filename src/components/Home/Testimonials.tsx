export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      quote: "Their attention to detail and innovative approach transformed our vision into reality. The project was completed on time and exceeded our expectations.",
      author: "Sarah Johnson",
      role: "Real Estate Developer",
    },
    {
      id: 2,
      quote: "Working with this team was a game-changer for our company. Their architectural expertise and commitment to quality are unmatched.",
      author: "Michael Chen",
      role: "Corporate Partner",
    },
    {
      id: 3,
      quote: "From concept to completion, their team delivered exceptional results. The design perfectly balances aesthetics with functionality.",
      author: "David Williams",
      role: "Government Agency Director",
    },
  ];

  return (
    <section className="py-16 bg-primary-light-brown">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center fade-in">
          <h2 className="text-base font-semibold text-primary-dark-brown tracking-wide uppercase">Testimonials</h2>
          <p className="mt-2 text-3xl font-extrabold text-primary-deep-brown sm:text-4xl">
            Client Experiences
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-white rounded-lg p-8 shadow-sm slide-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-primary-light-brown flex items-center justify-center">
                    <span className="text-primary-dark-brown font-bold">C</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-primary-deep-brown">{testimonial.author}</h4>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <blockquote className="mt-6 text-gray-600">
                <p>"{testimonial.quote}"</p>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}