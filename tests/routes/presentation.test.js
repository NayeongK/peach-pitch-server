require("dotenv").config();

const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");

const Presentation = require("../../models/Presentation");

describe("Presentation Router", () => {
  const userId = process.env.VALID_USER_ID;
  const invalidUserId = "peach";
  let presentationId;

  beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });
  afterEach(async () => {
    await mongoose.connection.close();
  });

  describe("GET `/users/:user_id/presentations`", () => {
    it("should return all the presentations the user has", done => {
      request(app)
        .get(`/users/${userId}/presentations`)
        .end(async (err, res) => {
          if (err) return done(err);

          expect(res.statusCode).toEqual(200);
          expect(res.body).toHaveProperty("result", "success");
          expect(res.body).toHaveProperty("presentations");

          const allPresentations = await Presentation.where({ userId });

          expect(res.body.presentations).toHaveLength(allPresentations.length);

          done();
        });
    });

    it("should NOT get any presentations with invalid user id", done => {
      request(app)
        .get(`/users/${invalidUserId}/presentations`)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.statusCode).toEqual(500);

          done();
        });
    });
  });

  describe("POST `/users/:user_id/presentations`", () => {
    const title = `${Date.now()}`;

    it("should add a new presentation into the database", done => {
      request(app)
        .post(`/users/${userId}/presentations`)
        .send({ title })
        .end(async (err, res) => {
          if (err) return done(err);

          expect(res.body).toHaveProperty("presentation");
          expect(res.body).toHaveProperty("presentation.title", title);

          const presentations = await Presentation.where({ userId });
          const presentation = presentations.find(
            param => param.title === title,
          );

          expect(res.body.presentation._id).toStrictEqual(
            presentation._id.toString(),
          );

          presentationId = res.body.presentation._id;

          done();
        });
    });

    it("should NOT add a new presentation with invalid user id", done => {
      request(app)
        .post(`/users/${invalidUserId}/presentations`)
        .send({ title })
        .end((err, res) => {
          if (err) done(err);

          expect(res.statusCode).toEqual(500);

          done();
        });
    });
  });

  describe("DELETE `/users/:user_id/presentations/:presentation_id`", () => {
    it("should delete existing presentation", done => {
      request(app)
        .delete(`/users/${userId}/presentations/${presentationId}`)
        .type("json")
        .end(async (err, res) => {
          if (err) return done(err);

          expect(res.body).toHaveProperty("result", "success");
          expect(res.body).toHaveProperty(
            "message",
            "Presentation successfully deleted",
          );

          const presentations = await Presentation.where({ userId });
          const presentation = presentations.find(
            param => param._id === presentationId,
          );

          expect(presentation).toBeUndefined();

          done();
        });
    });
  });
});
