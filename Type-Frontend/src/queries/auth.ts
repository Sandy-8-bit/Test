// src/lib/queries/auth.ts

import axios from "axios";
import {type RegisterRequest, type RegisterResponse,type Loginrequest ,type LoginResponse } from "../types/Auth";
import { apiRoutes } from "../route/apiroute";


export const registerUser = async (
  data: RegisterRequest
): Promise<RegisterResponse> => {
  const response = await axios.post<RegisterResponse>(`${apiRoutes.base}${apiRoutes.register}`, data);
  return response.data;
};


export const loginUser = async (
  data: Loginrequest
): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`${apiRoutes.base}${apiRoutes.login}`, data);
  return response.data;
};
