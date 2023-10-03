import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthSuccess() {
 
//   const history = useHistory();
const navigate = useNavigate();
  const [state, setState] = useState(null);
  const [code, setCode] = useState(null);

  useEffect(() => {
    // Simulate receiving state and code parameters after a 2-second delay
    const delay = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      setState(params.get("state"));
      setCode(params.get("code"));
    }, 0);

    // Redirect to "/home" after 2 seconds
    const redirectTimeout = setTimeout(() => {
      navigate("/home");
    }, 22000);

    return () => {
      clearTimeout(delay);
      clearTimeout(redirectTimeout);
    };
  }, [navigate]);
  const params = new URLSearchParams(window.location.search);

  return (
    <div>
        <div style={{height:"250px"}}>

        </div>
      {state && <p>State: {params.get('state')}</p>}
      {code && <p>Code: {code}</p>}
      <p>Redirecting to "/home" in 2 seconds...</p>
    </div>
  );
}
