import axios from "axios";
import { API_ROUTE } from "../constants";

export const api = axios.create({ baseURL: API_ROUTE });
