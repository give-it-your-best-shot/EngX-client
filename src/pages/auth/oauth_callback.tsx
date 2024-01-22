import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { setCookie } from "cookies-next";
import { REFRESH_TOKEN_EXPIRE } from "src/utils/const";

export default function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const refreshToken = searchParams.get("refresh-token");
    if (refreshToken)
      setCookie("refresh_token", refreshToken, {
        maxAge: REFRESH_TOKEN_EXPIRE,
      });
    navigate("/");
  }, [navigate, searchParams]);

  return <></>;
}
