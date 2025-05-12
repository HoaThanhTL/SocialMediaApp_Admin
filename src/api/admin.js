import api from "./api";
export const getListUser = async () => {
  const response = await api.get(`odata/Users/Active/User`);
  return response.data;
};
export const getPostAdmin = async () => {
  const response = await api.get(`/odata/GetAllReportByPost/Reports`);
  return response.data;
};
export const updatePost = async (id, status) => {
  const response = await api.put(
    `/odata/Reports/${id}/${status}/BanReportByPostId`
  );
  return response.data;
};
export const getBanUserAdmin = async () => {
  const response = await api.get(`/odata/GetAllReportByUser/Reports`);
  return response.data;
};
export const updateBanUser = async (reportId, status) => {
  const response = await api.put(
    `/odata/Reports/${reportId}/${status}/BanUserByReporterId`
  );
  return response.data;
};
export const getTotalUser = async () => {
  const response = await api.get(`/odata/Accounts/CountAllAccount`);
  return response.data;
};
export const getTotalPost = async () => {
  const response = await api.get(`/odata/Posts/Active/CountAllPost`);
  return response.data;
};
export const getTotalInvoice = async () => {
  const response = await api.get(`/odata/Invoices/GetAggregateinvoices`);
  return response.data;
};
export const getTotalComment = async () => {
  const response = await api.get(`/odata/GetMostCommonCommentStyle`);
  return response.data;
};
export const openBanUser = async (key) => {
  const response = await api.put(`odata/Users/${key}/OpenBanUserByAccountId`);
  return response.data;
};
export const getPackage = async () => {
  const response = await api.get(`/odata/Package/GetAllPackages`);
  return response.data;
};
export const addPackage = async (data) =>{
  const response = await api.post(`/odata/Post/AddNewPackage`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  return response.data;
};
export const updatePackage = async (key, data) =>{
  const response = await api.put(`Package/${key}/UpdatePackage`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  return response.data;
};
