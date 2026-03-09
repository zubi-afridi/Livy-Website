import React from "react";

const PropertyMap: React.FC = () => {
  return (
    <div className="mt-20 pt-20 border-t border-gray-100 pb-20">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 font-manrope">
        You will be here
      </h2>
      <div className="w-full h-112.5 rounded-3xl overflow-hidden shadow-xl ring-1 ring-gray-200 relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14966.3888806256!2d-40.2974221!3d-20.3216147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xb816223d6a2a07%3A0x6b450714b8a4f94b!2sVila%20Velha%2C%20State%20of%20Esp%C3%ADrito%20Santo%2C%20Brazil!5e0!3m2!1sen!2s!4v1710123456789!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Property Location"
        ></iframe>
      </div>
    </div>
  );
};

export default PropertyMap;
