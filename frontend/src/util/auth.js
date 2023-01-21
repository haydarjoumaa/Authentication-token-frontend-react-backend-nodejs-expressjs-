import { redirect } from "react-router-dom";

export function getToken() {
  return localStorage.getItem("token");
}
export function tokenlogger() {
  return localStorage.getItem("token");
}

export function protection() {
  const token = localStorage.getItem("token");
  if (!token) {
    return redirect("/auth");
  }
}
