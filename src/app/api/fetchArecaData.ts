import { MAMCOS_URL, BRANCHES } from "./constents";
import { FetchResponse } from "./types";

const fetchArecaData = async (branch: string): Promise<FetchResponse> => {
  if (BRANCHES.indexOf(branch.toUpperCase()) === -1) {
    return {
      status: 404,
      error: "Branch not Found",
    };
  }

  if (!MAMCOS_URL) {
    return {
      status: 500,
      error: "MAMCOS_URL is not defined",
    };
  }

  try {
    const body = new URLSearchParams();
    body.append("branch", branch.toUpperCase());

    const res = await fetch(MAMCOS_URL, {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!res.ok) {
      return {
        status: res.status,
        error: `HTTP error! status: ${res.status}`,
      };
    }

    const data = await res.text();
    return {
      status: 200,
      data: data,
    };
  } catch (error) {
    return {
      status: 500,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};

export default fetchArecaData;
