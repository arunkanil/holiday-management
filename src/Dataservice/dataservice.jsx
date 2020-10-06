import Axios from "axios";
import Cookies from "js-cookie";

const headers = {
  headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6ImRkZThjNzVmLTlkYTItYWM3NS02ZTA0LTM5ZjdlYTZlOGRmOSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiaHR0cDovL3d3dy5hc3BuZXRib2lsZXJwbGF0ZS5jb20vaWRlbnRpdHkvY2xhaW1zL3RlbmFudElkIjoiMSIsInN1YiI6IjIiLCJqdGkiOiJkODIzZWJkOS03YzY4LTQ1NmUtYWQ5My1iNDRjMDMwNmI3ZTAiLCJpYXQiOjE2MDE5NjE2NjQsIm5iZiI6MTYwMTk2MTY2NCwiZXhwIjoxNjAyMDQ4MDY0LCJpc3MiOiJIbXMiLCJhdWQiOiJIbXMifQ.UADUpQRNzehLkeHqZlk0XHTRHqbCbRXfc5lIhPJT3lA` },
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
