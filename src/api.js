import {
  CHECK_STATES,
  GEORGIA_STATE,
  STATES_MAP_URL,
  WIKI_URL,
} from "./appConstants";

class StatesApi {
  static async getStatesData() {
    const res = await fetch(STATES_MAP_URL);
    return res.json();
  }

  static async getStateInfo(name) {
    name = CHECK_STATES.includes(name) ? (name = `${name} (state)`) : name;
    if (name === GEORGIA_STATE) name = `${name} (U.S. state)`;

    const res = await fetch(
      `${WIKI_URL}?action=query&prop=extracts&exintro=&explaintext=&format=json&origin=*&titles=${name}&limit=10`
    );
    return res.json();
  }
}

export default StatesApi;
