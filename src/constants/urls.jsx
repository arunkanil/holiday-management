// export const DASHBOARD = "/dashboard";
export const DEPARTMENT_URL = "/masters/department";
export const LEAVE_TYPE_URL = "/masters/leave_type";
export const LEVEL_URL = "/masters/level";
export const COUNTRY_URL = "/masters/country";
export const PUBLICHOLIDAYS_URL = "/masters/public_holidays";
export const LEAVENTITLEMENT_URL = "/masters/leave_entitlement";


// API URLS
export const BASE_URL = "http://amhms.azurewebsites.net/";
export const GET_DEPARTMENT = "api/services/app/Department/GetAll";
export const POST_DEPARTMENT = "api/services/app/Department/CreateOrEdit";
export const DELETE_DEPARTMENT = "api/services/app/Department/Delete?id=";
export const GET_COUNTRY = "api/services/app/Country/GetAll";
export const POST_COUNTRY = "api/services/app/Country/CreateOrEdit";
export const DELETE_COUNTRY = "api/services/app/Country/Delete?id=";
export const GET_LEAVETYPE = "api/services/app/LeaveType/GetAll";
export const POST_LEAVETYPE = "api/services/app/LeaveType/CreateOrEdit";
export const DELETE_LEAVETYPE = "api/services/app/LeaveType/Delete?id=";
export const GET_PUBLICHOLIDAY = "api/services/app/PublicHoliday/GetAll";
export const POST_PUBLICHOLIDAY = "api/services/app/PublicHoliday/CreateOrEdit";
export const DELETE_PUBLICHOLIDAY = "api/services/app/PublicHoliday/Delete?id=";
export const GET_LEAVENTITLEMENT = "api/services/app/LeaveEntitlement/GetAll";
export const POST_LEAVENTITLEMENT = "/api/services/app/LeaveEntitlement/CreateOrEdit";
export const DELETE_LEAVENTITLEMENT = "api/services/app/LeaveEntitlement/Delete?id=";