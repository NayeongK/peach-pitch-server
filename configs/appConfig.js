module.exports = {
  database: {
    uri: process.env.MONGODB_URI,
  },
  cors: {
    origin: process.env.CORS_ORIGIN,
  },
  aws: {
    region: process.env.AWS_REGION || "ap-northeast-2",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  multer: {
    bucket: process.env.AWS_S3_BUCKET || "peachpitch",
    key: (req, file, cb) => {
      cb(null, Date.now().toString());
    },
  },
  routes: {
    login: "/login",
    presentation: "/users/:user_id/presentations",
    slide: "/users/:user_id/presentations/:presentation_id/slides",
    object:
      "/users/:user_id/presentations/:presentation_id/slides/:slide_id/objects",
    animation:
      "/users/:user_id/presentations/:presentation_id/slides/:slide_id/objects/:object_id/animations",
  },
};
