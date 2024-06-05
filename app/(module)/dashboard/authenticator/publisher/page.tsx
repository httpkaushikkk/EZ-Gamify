import PlusIcon from "@/app/assets/svg/plus";
import Link from "next/link";
import React from "react";

interface PublisherInterface {}

const Publisher: React.FC<PublisherInterface> = () => {
  return (
    <div className="bg-white dark:bg-dark-bg">
      <div className="flex items-center justify-center">
        <div className="w-[100%] h-14 flex items-center justify-between mx-8 mt-8 rounded-md ">
          <p>Dashboard / Authenticator / Publisher</p>
          <Link
            href="/dashboard/authenticator/publisher/add"
            className="cursor-pointer"
          >
            <div className="flex items-center border-[1px] border-dark-primary-darkBlue/20 px-4 py-2 rounded-lg">
              <p className="mr-1 text-lg">Add</p>
              <PlusIcon />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Publisher;
