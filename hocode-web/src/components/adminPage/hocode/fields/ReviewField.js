import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

const ReviewField = ({ source, record = {} }) => {
  const [reviewStatus, setReviewStatus] = useState(record[source]);

  if (reviewStatus !== "Peding") {
    if (record[source] === "Peding") return <span>Đang xét duyệt</span>;
    if (record[source] === "Active") return <span>Đồng ý</span>;
    if (record[source] === "Inactive") return <span>Từ chối</span>;

    return <span>{record[source]}</span>;
  }

  return (
    <Grid container direction="row" justify="space-between" alignItems="center">
      {" "}
      <Button
        size="small"
        variant="contained"
        aria-label="small outlined button group"
        color="primary"
        onClick={() => {
          var recordNew = record;
          recordNew.agree = true;
          recordNew.status = "Active";

          axios
            .put(
              `https://hocodevn.com/api/v1/curd/certs/${recordNew.id}`,
              recordNew
            )
            .then(res => {
              setReviewStatus(res.status);
            });
        }}
      >
        Đồng ý
      </Button>
      <Button
        size="small"
        variant="contained"
        aria-label="small outlined button group"
        color="secondary"
        onClick={() => {
            var recordNew = record;
            recordNew.agree = false;
            recordNew.status = "Inactive";
  
            axios
              .put(
                `https://hocodevn.com/api/v1/curd/certs/${recordNew.id}`,
                recordNew
              )
              .then(res => {
                setReviewStatus(res.status);
              });
          }}
        >
        Từ chối
      </Button>
    </Grid>
  );
};

ReviewField.propTypes = {
  label: PropTypes.string,
  record: PropTypes.object,
  source: PropTypes.string.isRequired
};

export default ReviewField;
