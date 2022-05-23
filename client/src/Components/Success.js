
import success from "../Components/images/success.svg";
const Success = ({heading, message}) => {
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
      <h1 className="text-success">{heading} </h1>
      <h1 className="text-primary">{message} </h1>
      <img alt="Success" className=" img-fluid m-3" src={success} />
    </div>
  );
};

export default Success;