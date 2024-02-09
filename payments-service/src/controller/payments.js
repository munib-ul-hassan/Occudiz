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

module.exports.userPayment = async (req, res) => {
  try {
    const { number, exp_month, exp_year, cvc } = req.body;
    console.log("🚀 ~ module.exports.userPayment= ~ body:", req.body);

    const paymentMethod = await Stripe.paymentMethods.create({
      type: "card",
      card: {
        number: number,
        exp_month: exp_month,
        exp_year: exp_year,
        cvc: cvc,
      },
    });
    res.status(200).send({ success: true, data: paymentMethod });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ success: false, message: "Internal server error", error: err });
  }
};

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
