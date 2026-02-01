

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Header from "../components/Header";
// import "./Notification.css";

// function Notification() {
//   const [notifications, setNotifications] = useState([]);
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   // 🔔 Fetch notifications
//   const fetchNotifications = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/notifications", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNotifications(res.data.notifications);
//     } catch (err) {
//       console.error("Error fetching notifications:", err.response?.data || err.message);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();

//     // ✅ Set up interval for polling new notifications every 10s
//     const interval = setInterval(() => {
//       fetchNotifications();
//     }, 10000);

//     return () => clearInterval(interval);
//   }, [token]);

//   // ✔ Mark notification as read
//   const markRead = async (id) => {
//     try {
//       await axios.put(
//         `http://localhost:5000/api/notifications/mark-read/${id}`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setNotifications((prev) =>
//         prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
//       );
//     } catch (err) {
//       console.error("Error marking read:", err.response?.data || err.message);
//     }
//   };

//   // 💳 Navigate to Payment page
//   const goToPayment = (notificationId) => {
//     navigate(`/payment/${notificationId}`);
//   };

//   // ✅ Update payment status locally when returning from PaymentGateway
//   useEffect(() => {
//     const handlePaymentUpdate = (event) => {
//       if (event.data && event.data.type === "PAYMENT_SUCCESS") {
//         const { notificationId } = event.data;
//         setNotifications((prev) =>
//           prev.map((n) =>
//             n._id === notificationId
//               ? { ...n, isPaid: true, message: n.message + " ✅ Payment Completed" }
//               : n
//           )
//         );
//       }
//     };
//     window.addEventListener("message", handlePaymentUpdate);
//     return () => window.removeEventListener("message", handlePaymentUpdate);
//   }, []);

//   return (
//     <>
//       <Header />
//       <div className="noti-page">
//         <h2>🔔 Notifications</h2>

//         {notifications.length > 0 ? (
//           notifications.map((n) => (
//             <div
//               key={n._id}
//               className={`noti-card ${n.isRead ? "read" : "unread"}`}
//               onClick={() => markRead(n._id)}
//             >
//               <p>{n.message}</p>
//               <small>{new Date(n.createdAt).toLocaleString()}</small>

//               {!n.isPaid && n.message.toLowerCase().includes("payment") ? (
//                 <button
//                   className="pay-btn"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     goToPayment(n._id);
//                   }}
//                 >
//                   Make Payment
//                 </button>
//               ) : n.isPaid ? (
//                 <span className="paid-label">Payment Completed ✅</span>
//               ) : null}
//             </div>
//           ))
//         ) : (
//           <p>No notifications yet</p>
//         )}
//       </div>
//     </>
//   );
// }

// export default Notification;




import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "./Notification.css";

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // 🔔 Fetch Notifications
  const fetchNotifications = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res.data.notifications);
    } catch (err) {
      console.error(
        "Error fetching notifications:",
        err.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, [token]);

  // ✔ Mark notification as read
  const markRead = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/notifications/mark-read/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error(
        "Error marking read:",
        err.response?.data || err.message
      );
    }
  };

  // 💳 Navigate to Payment Page
  const goToPayment = (notificationId) => {
    navigate(`/payment/${notificationId}`);
  };

  // ✅ Listen for PAYMENT SUCCESS update
  useEffect(() => {
    const handlePaymentUpdate = (event) => {
      if (event.data?.type === "PAYMENT_SUCCESS") {
        const { notificationId } = event.data;

        setNotifications((prev) =>
          prev.map((n) =>
            n._id === notificationId
              ? {
                  ...n,
                  isPaid: true,
                  message: n.message + " ✅ Payment Completed",
                }
              : n
          )
        );
      }
    };

    window.addEventListener("message", handlePaymentUpdate);
    return () => window.removeEventListener("message", handlePaymentUpdate);
  }, []);

  return (
    <>
      <Header />

      <div className="noti-page">
        <h2>🔔 Notifications</h2>

        {notifications.length > 0 ? (
          notifications.map((n) => (
            <div
              key={n._id}
              className={`noti-card ${n.isRead ? "read" : "unread"}`}
              onClick={() => markRead(n._id)}
            >
              <p>{n.message}</p>
              <small>{new Date(n.createdAt).toLocaleString()}</small>

              {/* ✅ PAYMENT BUTTON FIXED */}
              {!n.isPaid && n.requiresPayment && (
                <button
                  className="pay-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPayment(n._id);
                  }}
                >
                  Make Payment
                </button>
              )}

              {/* ✅ PAYMENT COMPLETED LABEL */}
              {n.isPaid && (
                <span className="paid-label">Payment Completed ✅</span>
              )}
            </div>
          ))
        ) : (
          <p>No notifications yet</p>
        )}
      </div>
    </>
  );
}

export default Notification;
