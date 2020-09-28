import React from "react";

import Spinner from "components/Spinner/Spinner";
import Modal from "components/Modal/Modal";

const ModalLoading = () => {
  return (
    <div>
      <Modal show transparent>
        <Spinner />
      </Modal>
    </div>
  );
};

export default ModalLoading;
