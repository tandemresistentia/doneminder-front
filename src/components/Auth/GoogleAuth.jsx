import GoogleLogin from "react-google-login";
import axios from "axios";
import baseURL from '../config';

// get env vars
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const drfClientId = process.env.REACT_APP_DRF_CLIENT_ID;
const drfClientSecret = process.env.REACT_APP_DRF_CLIENT_SECRET;

const GoogleAuth2 = (accessToken) => {
  axios
    .post(`${baseURL}/auth/convert-token`, {
      token: accessToken,
      backend: "google-oauth2",
      grant_type: "convert_token",
      client_id: drfClientId,
      client_secret: drfClientSecret,
    })
    .then((res) => {
      const { access_token, refresh_token } = res.data;
      console.log({ access_token, refresh_token });
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
    })
    .catch((err) => {
      console.log("Error Google login", err);
    });
};

const GoogleAuth = () => {

  return (
    <div className="App">
      <GoogleLogin
        clientId='269138259579-rmhpnnvj57rgjj7a27v5ul96sc95tc2e.apps.googleusercontent.com'
        buttonText="LOGIN WITH GOOGLE"
        onSuccess={(response) => GoogleAuth2(response.accessToken)}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            type="button"
            className="login-with-google-btn"
          >
            Sign up with Google
          </button>
        )}
        onFailure={(err) => console.log("Google Login failed", err)}
      />
    </div>
  );
};

export default GoogleAuth;
