import axios from "axios";

async function fetcher(url: string) {
  const { data } = await axios.get(url);
  return data;
}

export default fetcher;
