import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      author: "John Doe",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer gravida congue urna, eu iaculis augue vestibulum et.",
    },
    {
      id: 2,
      author: "Jane Smith",
      message:
        "Fusce nec lacus eu lorem molestie molestie ut eget metus. Proin a libero eget erat vehicula eleifend.",
    },
  ];

  return (
    <div className="testimonial-section" id="testimonials">
      <h2 className="testimonial-title">Testimonials</h2>
      <div className="testimonial-container">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial">
            <p className="testimonial-message">{testimonial.message}</p>
            <p className="testimonial-author">- {testimonial.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
