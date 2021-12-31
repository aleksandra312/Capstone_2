import {
  CHECK_STATES,
  GEORGIA_STATE,
  STATES_MAP_URL,
  WIKI_URL,
  CENSUS_DATA_URL,
} from "../appConstants";

class ExternalApi {
  static async getStatesData() {
    try {
      const res = await fetch(STATES_MAP_URL);
      return res.json();
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getStateInfo(name) {
    name = CHECK_STATES.includes(name) ? (name = `${name} (state)`) : name;
    if (name === GEORGIA_STATE) name = `${name} (U.S. state)`;

    try {
      const res = await fetch(
        `${WIKI_URL}?action=query&prop=extracts&exintro=&explaintext=&format=json&origin=*&titles=${name}&limit=10`
      );
      return res.json();
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getStatePopulation(id, year) {
    try {
      const res = await fetch(
        `${CENSUS_DATA_URL}/data/${year}/pep/population?get=POP&for=state:${id}`
      );
      return res.json();
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }
}

export default ExternalApi;
