import React from "react";
import Footer from "./Footer"; // Assuming you have a Footer component

const About = () => {
  return (
    <div>
      {/* Image Section */}
      <div className="w-full h-96">
        <img
          src="https://www.terawork.com/blog/wp-content/uploads/2022/11/ecommerce-mcommerce-featured-image-5fd09a3a5ff2a-1-1.png"
          alt="Ecommerce"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Section */}
      <div className="text-center py-16 bg-white">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg text-gray-600 mb-8 px-4 sm:px-16">
          Welcome to our online store! We offer a wide range of high-quality products that cater to all your needs. Whether you're looking for beauty products, fragrances, or accessories, we've got you covered. Our goal is to provide you with an exceptional shopping experience that combines convenience, affordability, and top-notch customer service.
        </p>
        <p className="text-lg text-gray-600 mb-8 px-4 sm:px-16">
          Our team is passionate about curating the best products from renowned brands, ensuring that you always have access to the latest trends and innovations. We prioritize quality, sustainability, and your satisfaction in every product we offer. From exclusive deals to fast shipping, we aim to exceed your expectations.
        </p>
        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg text-gray-600 mb-8 px-4 sm:px-16">
          Our mission is to empower customers by providing them with the best shopping experience possible. We believe in delivering value, and we are committed to offering a variety of products that cater to every need. Our goal is to build long-lasting relationships with our customers by offering excellent service and unmatched product quality.
        </p>
        <h2 className="text-3xl font-semibold mb-4">Our Values</h2>
        <ul className="list-disc list-inside px-4 sm:px-16 text-lg text-gray-600 mb-8">
          <li>Quality: We ensure that every product we sell meets our high standards.</li>
          <li>Customer Satisfaction: We put our customers first in everything we do.</li>
          <li>Innovation: We are always on the lookout for new and exciting products.</li>
          <li>Sustainability: We care about the environment and strive to reduce our carbon footprint.</li>
        </ul>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default About;
