import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Image from "next/image";
import { imageURL } from "@/app/helper/axios";
import edit from "@/app/assets/svg/edit.svg";

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
  const fileInputRef: any = React.useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Edit Game's Assets</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <div className="grid grid-cols-4 gap-2">
            {data &&
              data.game_assets &&
              data.game_assets.length != 0 &&
              data.game_assets.map((item: any, index: number) => {
                return (
                  <a
                    key={index}
                    href={void 0}
                    onClick={handleClick}
                    className="flex items-center"
                  >
                    <div className="relative">
                      <Image
                        src={imageURL + item.path}
                        alt={item.name}
                        width={30}
                        height={30}
                        className="m-2 w-24 h-48 object-contain"
                      />
                      <div className="absolute top-0 right-0 left-0 bottom-0">
                        {/* <Image src={edit} alt="edit" className="w-10 h-10" /> */}
                        <p>kaushik</p>
                      </div>
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      hidden
                      onChange={(e: any) => {
                        console.log(e.target.files[0]);
                      }}
                    />
                  </a>
                );
              })}
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose} autoFocus>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAssets;
