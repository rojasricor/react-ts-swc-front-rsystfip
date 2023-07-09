import axios from "axios";
import { API_ROUTE } from "../constants";

export default axios.create({ baseURL: API_ROUTE });
