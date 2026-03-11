// import React, { useState } from 'react'
// import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa'
// import { useNavigate } from 'react-router-dom'
// import { motion } from "motion/react";
// import axios from 'axios';
// import { ServerUrl } from '../App';
// import { useDispatch } from 'react-redux';
// import { setUserData } from '../redux/userSlice';
// function Pricing() {
//   const navigate = useNavigate()
//   const [selectedPlan, setSelectedPlan] = useState("free");
//   const [loadingPlan, setLoadingPlan] = useState(null);
//   const dispatch = useDispatch()

//   const plans = [
//     {
//       id: "free",
//       name: "Free",
//       price: "₹0",
//       credits: 100,
//       description: "Perfect for beginners starting interview preparation.",
//       features: [
//         "100 AI Interview Credits",
//         "Basic Performance Report",
//         "Voice Interview Access",
//         "Limited History Tracking",
//       ],
//       default: true,
//     },
//     {
//       id: "basic",
//       name: "Starter Pack",
//       price: "₹100",
//       credits: 150,
//       description: "Great for focused practice and skill improvement.",
//       features: [
//         "150 AI Interview Credits",
//         "Detailed Feedback",
//         "Performance Analytics",
//         "Full Interview History",
//       ],
//     },
//     {
//       id: "pro",
//       name: "Pro Pack",
//       price: "₹500",
//       credits: 650,
//       description: "Best value for serious job preparation.",
//       features: [
//         "650 AI Interview Credits",
//         "Advanced AI Feedback",
//         "Skill Trend Analysis",
//         "Priority AI Processing",
//       ],
//       badge: "Best Value",
//     },
//   ];



//   const handlePayment = async (plan) => {
//     try {
//       setLoadingPlan(plan.id)

//       const amount =  
//       plan.id === "basic" ? 100 :
//       plan.id === "pro" ? 500 : 0;

//       const result = await axios.post(ServerUrl + "/api/payment/order" , {
//         planId: plan.id,
//         amount: amount,
//         credits: plan.credits,
//       },{withCredentials:true})
      

//       const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//       amount: result.data.amount,
//       currency: "INR",
//       name: "InterviewIQ.AI",
//       description: `${plan.name} - ${plan.credits} Credits`,
//       order_id: result.data.id,

//       handler:async function (response) {
//         const verifypay = await axios.post(ServerUrl + "/api/payment/verify" ,response , {withCredentials:true})
//         dispatch(setUserData(verifypay.data.user))

//           alert("Payment Successful 🎉 Credits Added!");
//           navigate("/")

//       },
//       theme:{
//         color: "#10b981",
//       },

//       }

//       const rzp = new window.Razorpay(options)
//       rzp.open()

//       setLoadingPlan(null);
//     } catch (error) {
//      console.log(error)
//      setLoadingPlan(null);
//     }
//   }



//   return (

//     <div className='min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 py-16 px-6'>

//       <div className='max-w-6xl mx-auto mb-14 flex items-start gap-4'>

//         <button onClick={() => navigate("/")} className='mt-2 p-3 rounded-full bg-white shadow hover:shadow-md transition'>
//           <FaArrowLeft className='text-gray-600' />
//         </button>

//         <div className="text-center w-full">
//           <h1 className="text-4xl font-bold text-gray-800">
//             Choose Your Plan
//           </h1>
//           <p className="text-gray-500 mt-3 text-lg">
//             Flexible pricing to match your interview preparation goals.
//           </p>
//         </div>
//       </div>


//       <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>

//         {plans.map((plan) => {
//           const isSelected = selectedPlan === plan.id

//           return (
//             <motion.div key={plan.id}
//               whileHover={!plan.default && { scale: 1.03 }}
//               onClick={() => !plan.default && setSelectedPlan(plan.id)}

//               className={`relative rounded-3xl p-8 transition-all duration-300 border 
//                 ${isSelected
//                   ? "border-emerald-600 shadow-2xl bg-white"
//                   : "border-gray-200 bg-white shadow-md"
//                 }
//                 ${plan.default ? "cursor-default" : "cursor-pointer"}
//               `}
//             >

//               {/* Badge */}
//               {plan.badge && (
//                 <div className="absolute top-6 right-6 bg-emerald-600 text-white text-xs px-4 py-1 rounded-full shadow">
//                   {plan.badge}
//                 </div>
//               )}

//               {/* Default Tag */}
//               {plan.default && (
//                 <div className="absolute top-6 right-6 bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
//                   Default
//                 </div>
//               )}

//               {/* Plan Name */}
//               <h3 className="text-xl font-semibold text-gray-800">
//                 {plan.name}
//               </h3>

//               {/* Price */}
//               <div className="mt-4">
//                 <span className="text-3xl font-bold text-emerald-600">
//                   {plan.price}
//                 </span>
//                 <p className="text-gray-500 mt-1">
//                   {plan.credits} Credits
//                 </p>
//               </div>

//               {/* Description */}
//               <p className="text-gray-500 mt-4 text-sm leading-relaxed">
//                 {plan.description}
//               </p>

//               {/* Features */}
//               <div className="mt-6 space-y-3 text-left">
//                 {plan.features.map((feature, i) => (
//                   <div key={i} className="flex items-center gap-3">
//                     <FaCheckCircle className="text-emerald-500 text-sm" />
//                     <span className="text-gray-700 text-sm">
//                       {feature}
//                     </span>
//                   </div>
//                 ))}
//               </div>

//               {!plan.default &&
//                 <button
//                 disabled={loadingPlan === plan.id}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     if (!isSelected) {
//                       setSelectedPlan(plan.id)
//                     } else {
//                       handlePayment(plan)
//                     }
//                   }} className={`w-full mt-8 py-3 rounded-xl font-semibold transition ${isSelected
//                     ? "bg-emerald-600 text-white hover:opacity-90"
//                     : "bg-gray-100 text-gray-700 hover:bg-emerald-50"
//                     }`}>
//                   {loadingPlan === plan.id
//                     ? "Processing..."
//                     : isSelected
//                       ? "Proceed to Pay"
//                       : "Select Plan"}

//                 </button>
//               }
//             </motion.div>
//           )
//         })}
//       </div>

//     </div>

//   )
// }

// export default Pricing





















import React, { useState } from 'react'
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from "motion/react";
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Pricing() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [loadingPlan, setLoadingPlan] = useState(null);
  const dispatch = useDispatch()

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "₹0",
      credits: 100,
      description: "Perfect for beginners starting interview preparation.",
      features: [
        "100 AI Interview Credits",
        "Basic Performance Report",
        "Voice Interview Access",
        "Limited History Tracking",
      ],
      default: true,
    },
    {
      id: "basic",
      name: "Starter Pack",
      price: "₹100",
      credits: 150,
      description: "Great for focused practice and skill improvement.",
      features: [
        "150 AI Interview Credits",
        "Detailed Feedback",
        "Performance Analytics",
        "Full Interview History",
      ],
    },
    {
      id: "pro",
      name: "Pro Pack",
      price: "₹500",
      credits: 650,
      description: "Best value for serious job preparation.",
      features: [
        "650 AI Interview Credits",
        "Advanced AI Feedback",
        "Skill Trend Analysis",
        "Priority AI Processing",
      ],
      badge: "Best Value",
    },
  ];

  const handlePayment = async (plan) => {
    try {
      setLoadingPlan(plan.id)
      const amount =
        plan.id === "basic" ? 100 :
        plan.id === "pro" ? 500 : 0;

      const result = await axios.post(ServerUrl + "/api/payment/order", {
        planId: plan.id,
        amount: amount,
        credits: plan.credits,
      }, { withCredentials: true })

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: result.data.amount,
        currency: "INR",
        name: "MockMaster.ai",
        description: `${plan.name} - ${plan.credits} Credits`,
        order_id: result.data.id,
        handler: async function (response) {
          const verifypay = await axios.post(ServerUrl + "/api/payment/verify", response, { withCredentials: true })
          dispatch(setUserData(verifypay.data.user))
          alert("Payment Successful 🎉 Credits Added!");
          navigate("/")
        },
        theme: { color: "#10b981" },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
      setLoadingPlan(null);
    } catch (error) {
      console.log(error)
      setLoadingPlan(null);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        .pricing-page {
          min-height: 100vh;
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: #f8fafc;
          position: relative;
          overflow-x: hidden;
        }

        /* soft mesh background */
        .pricing-page::before {
          content: '';
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 50% at 20% -10%, rgba(16,185,129,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 110%, rgba(16,185,129,0.05) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        .pricing-content { position: relative; z-index: 1; }

        /* navbar */
        .pricing-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 40px;
          background: rgba(255,255,255,0.8);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(0,0,0,0.06);
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
          background: white;
          color: #374151;
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.18s ease;
          font-family: 'Plus Jakarta Sans', sans-serif;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
        }
        .back-btn:hover {
          border-color: #10b981;
          color: #10b981;
          box-shadow: 0 2px 8px rgba(16,185,129,0.12);
        }

        .nav-logo {
          font-size: 14px;
          font-weight: 700;
          color: #111827;
          letter-spacing: -0.01em;
        }
        .nav-logo span { color: #10b981; }

        /* hero */
        .pricing-hero {
          text-align: center;
          padding: 72px 24px 48px;
          max-width: 580px;
          margin: 0 auto;
        }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 12px;
          font-weight: 600;
          color: #10b981;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 20px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          padding: 5px 14px;
          border-radius: 100px;
        }
        .eyebrow-dot {
          width: 6px; height: 6px;
          background: #10b981;
          border-radius: 50%;
        }

        .hero-title {
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 800;
          color: #0f172a;
          line-height: 1.15;
          letter-spacing: -0.03em;
          margin-bottom: 16px;
        }

        .hero-sub {
          font-size: 16px;
          color: #64748b;
          line-height: 1.65;
          font-weight: 400;
          max-width: 400px;
          margin: 0 auto;
        }

        /* cards */
        .cards-wrap {
          max-width: 1060px;
          margin: 0 auto;
          padding: 0 24px 80px;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
          gap: 22px;
        }

        .plan-card {
          background: white;
          border-radius: 20px;
          padding: 32px 28px;
          border: 1.5px solid #f1f5f9;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04);
          cursor: pointer;
          transition: all 0.22s ease;
          position: relative;
          overflow: hidden;
        }
        .plan-card:not(.plan-card--default):hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 6px rgba(0,0,0,0.04), 0 16px 40px rgba(0,0,0,0.08);
          border-color: #d1fae5;
        }
        .plan-card--selected {
          border-color: #10b981 !important;
          box-shadow: 0 0 0 4px rgba(16,185,129,0.08), 0 16px 40px rgba(16,185,129,0.12) !important;
        }
        .plan-card--default { cursor: default; }

        /* card top accent line */
        .card-accent {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          border-radius: 20px 20px 0 0;
          background: linear-gradient(90deg, #10b981, #34d399);
          opacity: 0;
          transition: opacity 0.22s;
        }
        .plan-card--selected .card-accent,
        .plan-card:not(.plan-card--default):hover .card-accent { opacity: 1; }

        .card-badge {
          position: absolute;
          top: 20px; right: 20px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.04em;
          padding: 4px 12px;
          border-radius: 100px;
        }
        .badge--highlight {
          background: #ecfdf5;
          color: #059669;
          border: 1px solid #a7f3d0;
        }
        .badge--default {
          background: #f8fafc;
          color: #94a3b8;
          border: 1px solid #e2e8f0;
        }

        .plan-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #94a3b8;
          margin-bottom: 12px;
        }

        .plan-price {
          font-size: 44px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.03em;
          line-height: 1;
          margin-bottom: 6px;
        }

        .plan-credits {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12.5px;
          color: #64748b;
          font-weight: 500;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 7px;
          padding: 4px 10px;
          margin-bottom: 20px;
        }
        .credits-dot {
          width: 5px; height: 5px;
          background: #10b981;
          border-radius: 50%;
        }

        .plan-divider {
          height: 1px;
          background: linear-gradient(90deg, #f1f5f9, transparent);
          margin-bottom: 18px;
        }

        .plan-desc {
          font-size: 13.5px;
          color: #64748b;
          line-height: 1.65;
          margin-bottom: 20px;
          font-weight: 400;
        }

        .feature-list { list-style: none; padding: 0; margin: 0 0 24px; display: flex; flex-direction: column; gap: 11px; }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13.5px;
          color: #374151;
          font-weight: 400;
        }
        .feature-icon {
          flex-shrink: 0;
          transition: color 0.2s;
        }
        .feature-icon--active { color: #10b981; }
        .feature-icon--inactive { color: #d1d5db; }

        .cta-btn {
          width: 100%;
          padding: 13px 20px;
          border-radius: 12px;
          border: none;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14.5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: 0.01em;
        }
        .cta-btn:disabled { opacity: 0.55; cursor: not-allowed; }

        .cta-btn--active {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          box-shadow: 0 4px 14px rgba(16,185,129,0.35);
        }
        .cta-btn--active:hover:not(:disabled) {
          box-shadow: 0 6px 20px rgba(16,185,129,0.45);
          transform: translateY(-1px);
        }

        .cta-btn--inactive {
          background: #f8fafc;
          color: #475569;
          border: 1.5px solid #e2e8f0;
        }
        .cta-btn--inactive:hover:not(:disabled) {
          background: #f0fdf4;
          border-color: #a7f3d0;
          color: #059669;
        }

        .footer-note {
          text-align: center;
          font-size: 12.5px;
          color: #94a3b8;
          margin-top: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }
        .footer-dot { width: 3px; height: 3px; background: #cbd5e1; border-radius: 50%; }

        .spin {
          display: inline-block;
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.65s linear infinite;
          vertical-align: middle;
          margin-right: 7px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="pricing-page">
        <div className="pricing-content">

          {/* Nav */}
          <nav className="pricing-nav">
            <button className="back-btn" onClick={() => navigate("/")}>
              <FaArrowLeft size={11} />
              Back
            </button>
            <span className="nav-logo">MockMaster.ai</span>
            <div style={{ width: 80 }} />
          </nav>

          {/* Hero */}
          <div className="pricing-hero">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="hero-eyebrow">
                <span className="eyebrow-dot" />
                Pricing Plans
              </div>
              <h1 className="hero-title">
                Invest in your<br />dream career
              </h1>
              <p className="hero-sub">
                One-time credit packs. No subscriptions. Use them whenever you're ready to practice.
              </p>
            </motion.div>
          </div>

          {/* Cards */}
          <div className="cards-wrap">
            <div className="cards-grid">
              {plans.map((plan, idx) => {
                const isSelected = selectedPlan === plan.id

                return (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.45 }}
                    className={`plan-card ${isSelected ? 'plan-card--selected' : ''} ${plan.default ? 'plan-card--default' : ''}`}
                    onClick={() => !plan.default && setSelectedPlan(plan.id)}
                  >
                    <div className="card-accent" />

                    {/* Badge */}
                    {plan.badge && (
                      <span className="card-badge badge--highlight">✦ {plan.badge}</span>
                    )}
                    {plan.default && (
                      <span className="card-badge badge--default">Current</span>
                    )}

                    <p className="plan-label">{plan.name}</p>
                    <div className="plan-price">{plan.price}</div>

                    <div className="plan-credits">
                      <span className="credits-dot" />
                      {plan.credits} AI Credits
                    </div>

                    <div className="plan-divider" />

                    <p className="plan-desc">{plan.description}</p>

                    <ul className="feature-list">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="feature-item">
                          <FaCheckCircle
                            className={`feature-icon ${isSelected ? 'feature-icon--active' : 'feature-icon--inactive'}`}
                            size={13}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {!plan.default && (
                      <button
                        disabled={loadingPlan === plan.id}
                        className={`cta-btn ${isSelected ? 'cta-btn--active' : 'cta-btn--inactive'}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isSelected) setSelectedPlan(plan.id)
                          else handlePayment(plan)
                        }}
                      >
                        <AnimatePresence mode="wait">
                          {loadingPlan === plan.id ? (
                            <motion.span key="load" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                              <span className="spin" />
                              Processing...
                            </motion.span>
                          ) : isSelected ? (
                            <motion.span key="pay" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                              Proceed to Pay →
                            </motion.span>
                          ) : (
                            <motion.span key="sel" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                              Select Plan
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </button>
                    )}
                  </motion.div>
                )
              })}
            </div>

            <div className="footer-note">
              <span>🔒 Secured by Razorpay</span>
              <span className="footer-dot" />
              <span>Credits never expire</span>
              <span className="footer-dot" />
              <span>No hidden charges</span>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Pricing