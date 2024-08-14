import { toast } from "react-toastify";

const Msg = ({ closeToast, toastProps, message }) => (
  <div>
    <h3>{message}</h3>
  </div>
);

export const loadingMsg = (msg) => {
  const id = toast.loading( <Msg message={msg} />);

  return id;
};

export const updateMsg = async (msg, id, type) => {
  // console.log("updating ", id);

  toast.update(id, {
    render: <Msg message={msg} />,
    type,
    isLoading: false,
    autoClose: 2000,
  });
};

export const errorMsg = (msg) => {
  // console.log("running err", msg);

  toast.error(<Msg message={msg} />);
};

export const successMsg = (msg) => {
  toast.success(<Msg message={msg} />);
};

export const warningMsg = (msg) => {
  toast.warning(<Msg message={msg} />);
};
