import kyDefault from "ky";

const ky = kyDefault.extend({
  prefixUrl: "/api/",
  timeout: false
});

export default ky;
