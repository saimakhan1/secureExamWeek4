// "use client";

// import { useState } from "react";
// import { FiCheck } from "react-icons/fi";
// import Swal from "sweetalert2";

// export default function PricingPage() {
//   const plans = [
//     {
//       name: "Basic",
//       price: "Free",
//       features: [
//         "Create Exams",
//         "Up to 50 Students",
//         "Basic Analytics",
//         "Email Support",
//       ],
//     },
//     {
//       name: "Pro",
//       price: "$19 / month",
//       features: [
//         "Unlimited Students",
//         "Advanced Security Monitoring",
//         "Detailed Analytics",
//         "Priority Support",
//       ],
//     },
//     {
//       name: "Enterprise",
//       price: "Custom",
//       features: [
//         "University Level Deployment",
//         "Dedicated Server",
//         "Custom Features",
//         "24/7 Support",
//       ],
//     },
//   ];

//   const [selectedPlan, setSelectedPlan] = useState(null);

//   const handleChoosePlan = (index) => {
//     if (selectedPlan !== index) {
//       Swal.fire({
//         icon: "info",
//         title: "Plan Selected",
//         text: `You selected the ${plans[index].name} plan. Click again to confirm.`,
//         confirmButtonColor: "#0D7C66",
//       });
//       setSelectedPlan(index);
//       return;
//     }

//     // Confirm plan choice
//     Swal.fire({
//       icon: "success",
//       title: "Plan Confirmed",
//       text: `You have chosen the ${plans[index].name} plan!`,
//       confirmButtonColor: "#0D7C66",
//     }).then(() => {
//       const plan = plans[index];
//       // Redirect based on plan
//       if (plan.price !== "Free") {
//         // Replace with actual payment page
//         window.location.href = `/checkout/${plan.name.toLowerCase()}`;
//       } else {
//         // Free plan, redirect to dashboard
//         window.location.href = "/dashboard/student";
//       }
//     });
//   };

//   return (
//     <div className="min-h-screen bg-base-100 py-16 px-6">
//       {/* Header */}
//       <div className="text-center py-20 px-6 bg-[#0D7C66] text-white">
//         <h1 className="text-4xl font-bold mb-4 text-white">Pricing Plans</h1>
//         <p className="text-base-content/70 text-white">
//           Choose the best plan for your institution or classroom.
//         </p>
//       </div>

//       {/* Pricing Cards */}
//       <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mt-10">
//         {plans.map((plan, index) => {
//           const isSelected = selectedPlan === index;
//           return (
//             <div
//               key={index}
//               className={`card border shadow-lg transform transition-all duration-300 cursor-pointer ${
//                 isSelected
//                   ? "border-primary scale-105 shadow-xl"
//                   : "border-base-300"
//               }`}
//             >
//               <div className="card-body">
//                 <h2 className="text-2xl font-bold">{plan.name}</h2>

//                 <p className="text-3xl font-extrabold text-primary">
//                   {plan.price}
//                 </p>

//                 <div className="divider"></div>

//                 <ul className="space-y-3">
//                   {plan.features.map((feature, i) => (
//                     <li key={i} className="flex items-center gap-2">
//                       <FiCheck className="text-primary" />
//                       {feature}
//                     </li>
//                   ))}
//                 </ul>

//                 <button
//                   className={`btn mt-6 w-full ${
//                     isSelected ? "btn-primary" : "btn-outline btn-primary"
//                   }`}
//                   onClick={(e) => {
//                     e.stopPropagation(); // Prevent card click from firing
//                     handleChoosePlan(index);
//                   }}
//                 >
//                   Choose Plan
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { FiCheck } from "react-icons/fi";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

export default function PricingPage() {
  const { data: session } = useSession();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      name: "Basic",
      price: "Free",
      features: [
        "Create Exams",
        "Up to 50 Students",
        "Basic Analytics",
        "Email Support",
      ],
    },
    {
      name: "Pro",
      price: "$19 / month",
      features: [
        "Unlimited Students",
        "Advanced Security Monitoring",
        "Detailed Analytics",
        "Priority Support",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "University Level Deployment",
        "Dedicated Server",
        "Custom Features",
        "24/7 Support",
      ],
    },
  ];

  const handleChoosePlan = (index) => {
    // Problem 2: user not logged in
    if (!session) {
      Swal.fire({
        icon: "info",
        title: "Login Required",
        html: `You need to <a href="/auth/login?callbackUrl=${encodeURIComponent(
          window.location.pathname,
        )}" class="text-[#0D7C66] underline">login</a> to select a plan.`,
        confirmButtonColor: "#0D7C66",
      });
      return;
    }

    // Problem 1: Only update selected plan if logged in
    if (selectedPlan !== index) {
      setSelectedPlan(index);
      Swal.fire({
        icon: "info",
        title: "Plan Selected",
        text: `You selected the ${plans[index].name} plan. Click again to confirm.`,
        confirmButtonColor: "#0D7C66",
      });
      return;
    }

    // Confirm plan choice
    Swal.fire({
      icon: "success",
      title: "Plan Confirmed",
      text: `You have chosen the ${plans[index].name} plan!`,
      confirmButtonColor: "#0D7C66",
    }).then(() => {
      const plan = plans[index];
      if (plan.price !== "Free") {
        window.location.href = `/checkout/${plan.name.toLowerCase()}`;
      } else {
        window.location.href = "/dashboard/student";
      }
    });
  };

  return (
    <div className="min-h-screen bg-base-100 py-16 px-6">
      <div className="text-center py-20 px-6 bg-[#0D7C66] text-white">
        <h1 className="text-4xl font-bold mb-4 text-white">Pricing Plans</h1>
        <p className="text-base-content/70 text-white">
          Choose the best plan for your institution or classroom.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mt-10">
        {plans.map((plan, index) => {
          const isSelected = selectedPlan === index;
          return (
            <div
              key={index}
              className={`card border shadow-lg transform transition-all duration-300 cursor-pointer ${
                isSelected
                  ? "border-primary scale-105 shadow-xl"
                  : "border-base-300"
              }`}
            >
              <div className="card-body">
                <h2 className="text-2xl font-bold">{plan.name}</h2>
                <p className="text-3xl font-extrabold text-primary">
                  {plan.price}
                </p>
                <div className="divider"></div>

                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <FiCheck className="text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={`btn mt-6 w-full ${
                    isSelected ? "btn-primary" : "btn-outline btn-primary"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleChoosePlan(index);
                  }}
                >
                  Choose Plan
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
