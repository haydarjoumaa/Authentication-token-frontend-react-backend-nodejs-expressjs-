import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;
export async function action({ request }) {
  const params = new URL(request.url).searchParams;
  const mode = params.get("mode") || "login";
  const data = await request.formData();
  const authdata = {
    email: data.get("email"),
    password: data.get("password"),
  };
  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "mode noy supported" }, { status: 422 });
  }
  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(authdata),
  });
  if (response.status === 422 || response.status === 401) {
    return response;
  }
  if (!response.ok) {
    throw json({ message: "could not authenticate user." }, { status: 500 });
  }
  const resdata = await response.json();
  const token = resdata.token;
  localStorage.setItem("token", token);
  return redirect("/");
}
