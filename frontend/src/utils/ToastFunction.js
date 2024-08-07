import { toast } from "react-toastify";

export const loadingMsg = (msg) => {
  const id = toast.loading(msg);

  return id;
};

export const updateMsg = async (msg, id, type) => {
  // console.log("updating ", id);

  toast.update(id, {
    render: msg,
    type,
    isLoading: false,
    autoClose: 2000,
  });
};

export const errorMsg = (msg) => {
  console.log("running err", msg);

  toast.error(msg);
};

export const successMsg = (msg) => {
  toast.success(msg);
};

export const warningMsg = (msg) => {
  toast.warning(msg);
};
