
import success from "../Components/images/success.svg";
const ContestantRegistrationSuccess = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: "20px",
      }}
    >
      <h1 className="text-success">Registration Successful. </h1>
      <h1 className="text-primary">We will review the application and get back to you. </h1>
      <img alt="Success" className=" img-fluid m-3" src={success} />
    </div>
  );
};

export default ContestantRegistrationSuccess;