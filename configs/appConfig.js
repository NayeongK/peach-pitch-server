module.exports = {
  database: {
    uri: process.env.MONGODB_URI,
  },
  cors: {
    origin: process.env.CORS_ORIGIN,
  },
  routes: {
    index: "/",
    login: "/login",
    presentation: "/users/:user_id/presentations",
    slide: "/users/:user_id/presentations/:presentation_id/slides",
    object:
      "/users/:user_id/presentations/:presentation_id/slides/:slide_id/objects",
    animation:
      "/users/:user_id/presentations/:presentation_id/slides/:slide_id/objects/:object_id/animations",
  },
};
