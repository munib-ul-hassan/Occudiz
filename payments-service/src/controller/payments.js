const UserModel = require("../../../userHandler-service/src/models/user");
const Stripe = require("stripe")(process.env.STRIPE_SEC_KEY);

module.exports.createCustomerStripe = async (req, res) => {
  try {
    const userId = req.user;
    const param = {};
    param.name = userId.name;
    param.email = userId.email;
    const user = Stripe.customers.create(param, (error, customer) => {
      if (error) {
        return res.status(400).send({ success: false, error: error });
      }
      if (customer) {
        res.status(200).send({ success: true, data: customer });
      } else {
        return res
          .status(400)
          .send({ success: false, message: "SomeThing went wrong" });
      }
      userId.stripe_Id = customer.id;
      userId.save();
      console.log(userId);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

// const userPayment = async (req, res) => {
//   try {
//     const { project } = req.body;
//     if (!project) {
//       return res.status(400).send({
//         success: false,
//         message: "no project found ",
//       });
//     }
//     const price = await priceingProject.find({ _id: project });
//     const prices = price[0].prices;
//     const orderCompleted = price[0].orderCompleted;
//     const userID = await priceingProject.find({ _id: project }).populate({
//       path: "TaskId",
//       populate: { path: "orderId", populate: { path: "userId" } },
//     });
//     const user = userID[0].TaskId.orderId.userId._id;
//     const email = userID[0].TaskId.orderId.userId.email;
//     const productType = userID[0].TaskId.orderId.orderType;
//     const taskID = userID[0].TaskId._id;
//     const designer = userID[0].TaskId.designerId._id;

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: productType,
//             },
//             unit_amount: prices * 100,
//           },
//           quantity: 1,
//         },
//       ],
//       customer_email: email,
//       mode: "payment",
//       success_url:
//         "https://geekslogicity.com/success?session_id={CHECKOUT_SESSION_ID}", // Replace with your success URL
//       cancel_url: "https://your-website.com/cancel", // Replace with your cancel URL
//     });
//     console.log(session);
//     const Stripe_url = session.url;

//     const result = new Payment({
//       userId: user,
//       orderCompleted: orderCompleted,
//       designerId: designer,
//       TaskId: taskID,
//       prices: prices,
//       stripe_url: Stripe_url,
//     });
//     await result.save();
//     res.status(200).send({
//       success: true,
//       message: "payment added successfully",
//       Stripe_url,
//     });
//   } catch (err) {
//     res.status(500).send(err);
//   }
// };

// const CompletePayment = async (req, res) => {
//   try {
//     const { payment, session_id } = req.body;
//     if (!payment) {
//       return res.status(400).send({
//         success: false,
//         message: "no payment found on that Id",
//       });
//     }
//     if (!session_id) {
//       return res.status(400).send({
//         success: false,
//         message: "no session found",
//       });
//     }
//     const projectID = await Payment.find({ _id: payment }).populate(
//       "orderCompleted"
//     );
//     const PaymentObj = await projectID[0]._id;
//     const userId = projectID[0].userId;
//     const TaskID = projectID[0].TaskId;
//     const SourceFile = projectID[0].orderCompleted.SourceFile;
//     console.log(SourceFile);

//     const result = new paymentSuccess({
//       userId: userId,
//       payment: PaymentObj,
//       TaskId: TaskID,
//       session_id: req.body.session_id,
//       paymentStatus: true,
//     });
//     await result.save();
//     res.status(200).send({
//       success: true,
//       message: "here is the source file",
//       SourceFile,
//     });
//   } catch (err) {
//     res.status(500).send(err);
//   }
// };
