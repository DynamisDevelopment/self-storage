import axios from "axios"

export default axios.create({
  baseURL: "https://fe-test.marketing4storage.com/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
})
