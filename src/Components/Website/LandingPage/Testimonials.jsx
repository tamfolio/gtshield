import React from "react";

function Testimonials() {
  const testimonials = [
    {
      quote: "Before Gateway Shield, reporting an incident felt like shouting into thin air. Now, I can make a report from my phone, and the police actually respond. It makes me feel like my safety matters",
      name: "Tunde A., Abeokuta",
      role: "From a Resident"
    },
    {
      quote: "We close late at my shop, so security is a big deal. With Gateway Shield, I can alert the authorities if anything suspicious happens, and I know there's a record of it. It's peace of mind for me and my staff",
      name: "Mrs. Funke B., Ijebu-Ode",
      role: "From a Small Business Owner"
    },
    {
      quote: "Gateway Shield has brought the police and our community closer. We're not just reporting crimes; we're working together to prevent them. That's a huge shift",
      name: "Cheif Adewale O., Sagamu",
      role: "From a Community Leader"
    },
    {
      quote: "The platform helps us respond faster and with better information. We can see exactly where the call is coming from, and it's easier to coordinate with other units. It's making our work more effective.",
      name: "Insp. I. Musa, Ogun State Police Command",
      role: "From a Police Officer"
    },
    {
      quote: "Knowing there's a system in place that connects us directly to the police makes me feel safer when my kids going to school and back. It's one less thing to worry about.",
      name: "Mrs. Kemi L., Abeokuta",
      role: "From a Parent"
    },
    {
      quote: "We close late at my shop, so security is a big deal. With Gateway Shield, I can alert the authorities if anything suspicious happens, and I know there's a record of it. It's peace of mind for me and my staff",
      name: "Mrs.Funke B., Ijebu-Ode",
      role: "From a Small Business Owner"
    },
    {
      quote: "The platform helps us respond faster and with better information. We can see exactly where the call is coming from, and it's easier to coordinate with other units. It's making our work more effective.",
      name: "Insp. I. Musa, Ogun State Police Command",
      role: "From a Police Officer"
    },
    {
      quote: "Before Gateway Shield, reporting an incident felt like shouting into thin air. Now, I can make a report from my phone, and the police actually respond. It makes me feel like my safety matters",
      name: "Tunde A., Abeokuta",
      role: "From a Resident"
    },
    {
      quote: "Before Gateway Shield, reporting an incident felt like shouting into thin air. Now, I can make a report from my phone, and the police actually respond. It makes me feel like my safety matters",
      name: "Tunde A., Abeokuta",
      role: "From a Resident"
    }
  ];

  return (
    <div className="px-4 lg:px-[112px] bg-white py-[96px]">
      <div className="w-full text-center flex flex-col items-center justify-center px-4 md:px-0">
        <h1 className="text-[#3538CD] font-semibold text-[16px] mb-3">
          Testimonials
        </h1>
        <h2 className="text-4xl font-semibold text-[#181D27] mb-5">
          Don't just take our word for it
        </h2>
        <p className="text-lg text-[#535862] font-normal">
          Hear first hand from our incredible community of users
        </p>
      </div>
      
      <div className="mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="w-full border border-[#E9EAEB] rounded-[12px] p-6 sm:p-8 bg-white"
            >
              <p className="text-[#535862] text-[16px] mb-8 sm:mb-12 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div>
                <div className="font-semibold text-[16px] text-[#181D27] mb-1">
                  {testimonial.name}
                </div>
                <p className="text-[#535862] text-[14px]">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;