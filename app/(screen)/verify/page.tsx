"use client";
import api from "@/app/helper/axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface VerifyInterface {}

const EmailVerify: React.FC<VerifyInterface> = ({ params }: any) => {
  const [validUrl, setValidUrl] = useState<boolean>(false);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const url = `http://localhost:8080/api/users/${params.id}/verify/${params.token}`;
        await api({
          url: url,
          data: {},
          headers: {},
        });
        setValidUrl(true);
      } catch (err: any) {
        console.log(err);
        setValidUrl(false);
      }
    };
    verifyEmail();
  }, [params]);

  return (
    <React.Fragment>
      {validUrl ? (
        <div>
          <p>verify email</p>
          <Link href="/login">
            <button>Login</button>
          </Link>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </React.Fragment>
  );
};

export default EmailVerify;
