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
}

export default StatesTrendsApi;
