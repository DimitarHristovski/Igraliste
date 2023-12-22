import router from "next/router";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface UserData {
  name: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  image: string;
  address: string;
  phoneNumber: string;
  biography: string;
}

interface FormData {
  name: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  image: string;
  address: string;
  phoneNumber: string;
  biography: string;
}
interface AuthContextProps {
  isLoggedIn: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  userData: UserData | null;
  formData: FormData;
  updateFormData: (formData: FormData) => void;
  handleLogin: any;
  image: string | null;
  updateImage: (image: string | null) => void;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  password: string;
}
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [formData, setFormData] = useState<FormData>({
    image: "",
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",

    address: "",
    phoneNumber: "",
    biography: "",
  });
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLoginStatus = localStorage.getItem("isLoggedIn");
      if (storedLoginStatus === "true") {
        setLoggedIn(true);
      }

      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }

      const storedImage = localStorage.getItem("image");
      if (storedImage) {
        setImage(storedImage);
      }
    }
  }, []);

  const login = (email: string, password: string) => {
    setLoggedIn(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("isLoggedIn", "true");
    }
  };
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("Password");

    if (storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
    }
  }, []);
  const handleLogin = () => {
    if (typeof window !== "undefined") {
      const storedDataString = localStorage.getItem("formData");

      if (storedDataString !== null) {
        const storedData = JSON.parse(storedDataString);

        if (typeof storedData === "object" && storedData !== null) {
          const { email: storedEmail, password: storedPassword } = storedData;

          //console.log("Entered Email:", email);
          // console.log("Entered Password:", password);
          // console.log("Stored Email:", storedEmail);
          // console.log("Stored Password:", storedPassword);

          if (email === storedEmail && password === storedPassword) {
            setLoggedIn(true);
            router.push("/MyProfile");
            localStorage.setItem("isLoggedIn", "true");

            //  console.log("User is logged in");
          } else {
            //   console.log("Invalid login credentials");
          }
        } else {
          //   console.log("Stored data is not a valid object");
        }
      } else {
        //console.log("No user data found in localStorage");
      }
    }
  };
  const logout = () => {
    setLoggedIn(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userData");
      localStorage.removeItem("image");
    }
  };

  const updateFormData = (newFormData: FormData) => {
    setFormData(newFormData);
  };

  const updateImage = (newImage: string | null) => {
    setImage(newImage);
    if (typeof window !== "undefined") {
      localStorage.setItem("image", newImage || "");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        userData,
        formData,
        updateFormData,
        handleLogin,
        image,
        updateImage,
        setEmail,
        setPassword,
        email,
        password,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
