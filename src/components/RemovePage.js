import { deleteData } from "@/utils/sampleFirebase";
import React, { useState } from "react";
import Styles from "../styles/EditDeletePage.module.css";
import { HashLoader } from "react-spinners";
import { useSelector } from "react-redux";

function RemovePage(props) {
  const theme = useSelector((state) => state.login.theme);
  const [isLoading, setIsLoading] = useState(false);
  const dataObject = {
    name: props.name,
    amount: props.money,
    reason: props.reason,
    date: props.date,
    status: props.status,
    lendingStatus: props.status === "given" ? true : false,
  };

  const onClick = async () => {
    setIsLoading(true);
    await deleteData(props.uid, dataObject);
    setIsLoading(false);
    props.setPage(false);
  };
  return (
    <div className={Styles.editPage}>
      <div className={Styles.removeContainer}>
        <h2 className={Styles.heading}>
          Are you sure you want to delete this entry
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <button className="button button-delete" onClick={() => onClick()}>
            Continue
          </button>
          <button
            className="button button-disabled button-cancel"
            onClick={() => props.setPage(false)}
          >
            Cancel
          </button>
        </div>
        {isLoading ? (
          <HashLoader
            color={theme === "dark" ? "white" : "black"}
            size="40"
            style={{ justifyContent: "center" }}
          />
        ) : null}
      </div>
      <h1 className={Styles.closeButton} onClick={() => props.setPage(false)}>
        X
      </h1>
    </div>
  );
}

export default RemovePage;
