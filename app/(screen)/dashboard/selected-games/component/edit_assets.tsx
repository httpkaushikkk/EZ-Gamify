import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Image from "next/image";
import api, { imageURL } from "@/app/helper/axios";
import edit from "@/app/assets/svg/edit.svg";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import toast from "react-hot-toast";
import { getCookie } from "cookies-next";

interface EditAssetsInterface {
  open: boolean;
  handleClose: any;
  data: any;
}

const EditAssets: React.FC<EditAssetsInterface> = ({
  open,
  handleClose,
  data,
}) => {
  const theme = useTheme();
  const fileInputRef: any = React.useRef(null);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const allowedMimeTypes = [
    "image/png",
    "image/gif",
    "image/jpeg",
    "image/jpg",
  ];

  const [selectImage, setselectImage] = React.useState<any>({});
  const [selectedAssets, setSelectedAssets] = React.useState<any>([]);
  const [newAssets, setnewAssets] = React.useState<any>([]);

  const handleClick = (item: any) => {
    setselectImage(item);
    fileInputRef.current.click();
  };

  const fetchSelectedImage = (event: any) => {
    const file = event.target.files[0];
    setnewAssets([...newAssets, file]);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        let data = {
          url: reader.result,
          name: selectImage.name,
        };
        setSelectedAssets([...selectedAssets, data]);
      };
      reader.readAsDataURL(file);
    }
  };

  const editGameAssets = async () => {
    try {
      const formData: any = new FormData();
      formData.append("user_id", getCookie("auth-id"));
      formData.append("mediaType", "edit_assets");
      formData.append("folder", "flippy");
      newAssets.forEach((file: any) => {
        formData.append("filess", file);
        console.log(file);
      });

      const data = await api({
        url: "/common/edit-assets",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getCookie("auth-token")}`,
        },
      });
      console.log(data);
      // handleClose();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <Dialog
      open={open}
      fullScreen={fullScreen}
      // onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Edit Game's Assets</DialogTitle>
      <DialogContent>
        <p className="mb-4">
          Replace your own assets but make sure assest's name are same.
        </p>
        <DialogContentText id="alert-dialog-description">
          <div className="grid grid-cols-4 gap-2 relative">
            {data &&
              data.game_assets &&
              data.game_assets.length != 0 &&
              data.game_assets.map((item: any, index: number) => {
                return (
                  <div className="relative">
                    <React.Fragment key={index}>
                      {selectedAssets.length != 0 &&
                        selectedAssets.map((el: any) => {
                          return (
                            <React.Fragment>
                              {el.name == item.name && (
                                <div
                                  className="z-50 cursor-pointer w-12 h-12 flex items-center justify-center absolute right-0 border-2 rounded-full p-1"
                                  onClick={() => alert("hello")}
                                >
                                  <img
                                    src={el.url}
                                    alt=""
                                    className="w-10 h-10 rounded-full"
                                  />
                                </div>
                              )}
                            </React.Fragment>
                          );
                        })}
                      <React.Fragment>
                        {allowedMimeTypes.includes(item.mimetype) && (
                          <a href={void 0}>
                            <div className="relative">
                              <img
                                src={imageURL + item.path}
                                alt={item.name}
                                width={30}
                                height={30}
                                className="m-2 w-24 h-44 object-contain"
                                onClick={() => handleClick(item)}
                              />
                              <p>{item.name}</p>
                            </div>
                          </a>
                        )}
                      </React.Fragment>
                      <input
                        type="file"
                        ref={fileInputRef}
                        hidden
                        onChange={fetchSelectedImage}
                      />
                    </React.Fragment>
                  </div>
                );
              })}
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={editGameAssets} autoFocus>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAssets;
