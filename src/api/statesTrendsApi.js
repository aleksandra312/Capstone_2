import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class StatesTrendsApi {
  static async getComments(usState = "", username = "") {
    try {
      let res = await axios.get(
        `${BASE_URL}/comments/?usState=${usState}&username=${username}`
      );
      return res.data.comments;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async postComment(data) {
    try {
      let res = await axios.post(`${BASE_URL}/comments/`, data);
      return res.data.comments;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getSurveyData(
    usState = "",
    fromDate = "",
    toDate = "",
    username = "",
    orderBy = ""
  ) {
    try {
      let res = await axios.get(
        `${BASE_URL}/comments/trend?usState=${usState}&username=${username}&fromDate=${fromDate}&toDate=${toDate}&orderBy=${orderBy}`
      );
      return res.data.survey;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }
}

export default StatesTrendsApi;
