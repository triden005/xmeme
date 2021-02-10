var config = {
    backendIp: process.env.REACT_APP_BACKENDIP || "http://localhost:8081",
};
console.log(process.env.REACT_APP_BACKENDIP);
export default config;
