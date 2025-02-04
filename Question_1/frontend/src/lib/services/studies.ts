import { GET } from "../adapters/requests";
import { endPoints } from "../helpers/apiEndpoints";

export const getAllStudies = async (
  page: number,
  status: string,
  country: string,
  title: string
) => {
  let query = "?";
  query = query + `page=${page || 1}`;
  if (title && title != "") {
    query += `&title=${title}`;
  }
  if (status && status != "") {
    query += `&status=${status}`;
  }
  if (country && country != "") {
    query = query + `&country=${country}`;
  }

  const data = await GET(endPoints.fetchStudy + query);
  return data;
};

export const getStudy = async (id: string) => {
  const data = await GET(`${endPoints.fetchStudy}/${id}`);
  return data;
};

export const getStudyCountry = async () => {
  const data = await GET(endPoints.fetchCountry);
  return data;
};
