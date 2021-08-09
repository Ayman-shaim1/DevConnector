import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeAlert } from "../redux/alert/alertActions";
const Alert = () => {
  const alert = useSelector((state) => state.alert);

  const dispatch = useDispatch();

  const removeAlertHandler = (id) => {
    dispatch(removeAlert(id));
  };

  useEffect(() => {
    if (alert !== null && alert.length !== 0) {
      alert.forEach((alert) =>
        setTimeout(() => dispatch(removeAlert(alert.id)), 4000)
      );
    }
  }, [alert, dispatch]);
  return (
    <React.Fragment>
      {alert !== null &&
        alert.length !== 0 &&
        alert.map((alert) => (
          <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            <span>{alert.msg}</span>
            <span onClick={() => removeAlertHandler(alert.id)}>
              <i className="fas fa-times"></i>
            </span>
          </div>
        ))}
    </React.Fragment>
  );
};

export default Alert;
