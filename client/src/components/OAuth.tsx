import { BASE_URL } from "../config";
import { app } from "../firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
function OAuth() {
  //#region variables
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //#endregion

  //#region functions
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch(`${BASE_URL}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.displayName,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      console.log("Could not connect with google", error);
    }
  };
  //#endregion
  return (
    <button
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
      onClick={() => handleGoogleClick()}
    >
      Continue with google
    </button>
  );
}

export default OAuth;
