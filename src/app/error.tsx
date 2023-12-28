"use client";

import Link from "next/link";

const Error = () => {
  return (
    <div>
      Your refresh token expires,login again|| Please contact: Md Emran:
      mdemran.swe@gmail.com
      <Link href={`/login`}></Link>
    </div>
  );
};

export default Error;
