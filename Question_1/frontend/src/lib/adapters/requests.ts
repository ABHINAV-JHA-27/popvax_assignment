import { BASE_URL } from "../helpers/apiEndpoints";

export const GET = async (url: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${url}`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const POST = async (url: string, body: any) => {
  try {
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const PATCH = async (url: string, body: any) => {
  try {
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const PUT = async (url: string, body: any) => {
  try {
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const DELETE = async (url: string, id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${url}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const POSTWithoutAuth = async (url: string, body: any) => {
  try {
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
