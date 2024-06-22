import { useSelector } from "react-redux";

export const checkPermission = (text: string) => {
  const data = useSelector((state: any) => state.user.permission);
  let isActionAvailable = true;
  if (Array.isArray(data)) {
    // isActionAvailable = data.some((item) => item.name === text);
  } else if (typeof data === "object" && data !== null) {
    isActionAvailable = Object.values(data).some(
      (item: any) => item.name === text
    );
  } else {
    isActionAvailable = false;
  }
  return isActionAvailable;
};
