
// // src/pages/PaymentGateway.jsx
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./PaymentGateway.css";

// function PaymentGateway() {
//   const { notificationId } = useParams();
//   const [amount, setAmount] = useState("");
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   // ✅ Load Razorpay script
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     document.body.appendChild(script);
//   }, []);

//   const handlePayment = async () => {
//     if (!amount || amount <= 0) {
//       return alert("Enter valid amount");
//     }

//     const options = {
//       key: "rzp_test_x5R1mCwyiFA5F8", // ✅ Your Razorpay Test Key
//       amount: amount * 100,
//       currency: "INR",
//       name: "Kongu Engineering College",
//       description: "Conference Registration Payment",

//       prefill: {
//         name: "User",
//         email: "user@gmail.com",
//         contact: "9876543210",
//       },

//       theme: { color: "#0b5ed7" },

//       // ✅ ✅ PAYMENT SUCCESS HANDLER
//       handler: async (response) => {
//         try {
//           // ✅ SAVE PAYMENT IN DB
//           await axios.post(
//             "http://localhost:5000/api/payments/save",
//             {
//               razorpay_payment_id: response.razorpay_payment_id, // ✅ FIXED FIELD NAME
//               amount:Number(amount),
//               notificationId: notificationId,
//             },
//             {
//               headers: { Authorization: `Bearer ${token}` },
//             }
//           );

//           alert("✅ Payment Successful!");
//           navigate("/notifications");

//         } catch (err) {
//           console.error(err.response?.data || err.message);
//           alert("❌ Payment success but server update failed");
//         }
//       },

//       modal: {
//         ondismiss: () => {
//           alert("❌ Payment Cancelled");
//         },
//       },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   return (
//     <div className="payment-container">
//       <h2>💳 Conference Payment</h2>
//       <p>Enter the amount to complete registration</p>

//       <label>Amount (₹)</label>
//       <input
//         type="number"
//         placeholder="Enter amount"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//       />

//       <button className="pay-btn" onClick={handlePayment}>
//         Pay Now
//       </button>
//     </div>
//   );
// }

// export default PaymentGateway;



import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PaymentGateway.css";

function PaymentGateway() {
  const { notificationId } = useParams();
  const [amount, setAmount] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // ✅ Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    if (!amount || amount <= 0) {
      return alert("Enter valid amount");
    }

    if (!token) {
      return alert("❌ You must be logged in to make a payment");
    }

    const options = {
      key: "rzp_test_x5R1mCwyiFA5F8", // ✅ Your Razorpay Test Key
      amount: Number(amount) * 100,    // in paise
      currency: "INR",
      name: "Kongu Engineering College",
      description: "Conference Registration Payment",

      prefill: {
        name: "User",
        email: "user@gmail.com",
        contact: "9876543210",
      },

      theme: { color: "#0b5ed7" },

      // ✅ PAYMENT SUCCESS HANDLER
      handler: async (response) => {
        try {
          // ✅ SAVE PAYMENT IN DB
          await axios.post(
            "http://localhost:5000/api/payments/save",
            {
              razorpay_payment_id: response.razorpay_payment_id,
              amount: Number(amount),   // ✅ Send as number in rupees
              notificationId: notificationId,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          alert("✅ Payment Successful!");
          navigate("/notifications");

        } catch (err) {
          console.error(err.response?.data || err.message);

          // ✅ Handle Unauthorized
          if (err.response?.status === 401) {
            alert("❌ Unauthorized: Please log in again");
          } else {
            alert("❌ Payment success but server update failed");
          }
        }
      },

      modal: {
        ondismiss: () => {
          alert("❌ Payment Cancelled");
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="payment-container">
      <h2>💳 Conference Payment</h2>
      <p>Enter the amount to complete registration</p>

      <label>Amount (₹)</label>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button className="pay-btn" onClick={handlePayment}>
        Pay Now
      </button>
    </div>
  );
}

export default PaymentGateway;
