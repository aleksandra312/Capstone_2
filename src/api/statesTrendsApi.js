import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class StatesTrendsApi {
  static async getComments(usState = "", username = "") {
    let res = await axios.get(
      `${BASE_URL}/comments/?usState=${usState}&username=${username}`
    );
    return res.data.comments;
  }

  static async postComment(data) {
    let res = await axios.post(`${BASE_URL}/comments/`, data);
    return res.data.comments;
  }

  static async getSurveyData(
    usState = "",
    fromDate = "",
    toDate = "",
    username = ""
  ) {
    let res = await axios.get(
      `${BASE_URL}/comments/trend?usState=${usState}&username=${username}&fromDate=${fromDate}&toDate=${toDate}`
    );
    return res.data.survey;
  }
}

export default StatesTrendsApi;
