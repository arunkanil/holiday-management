import Axios from "axios";
import Cookies from "js-cookie";

const headers = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};
export async function GetAPICall(url) {
  let result = await Axios.get(url, headers);
  return result.data;
}
export async function PostAPICall(url, value) {
  let result = await Axios.post(url, value, headers);
  return result.data;
}
export async function DeleteAPICall(url, value) {
  let result = await Axios.delete(`${url}${value}`, headers);
  return result.data;
}
