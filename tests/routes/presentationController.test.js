const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
const Presentation = require("../../models/Presentation");

jest.mock("../../models/Presentation", () => ({
  find: jest.fn(),
  create: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

describe("Presentation Controller Tests", () => {
  const mockUserId = new mongoose.Types.ObjectId().toString();

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("GET /users/:user_id/presentations", () => {
    it("should get all presentations by user ID", async () => {
      const mockPresentations = [
        {
          title: "Presentation 1",
          userId: mockUserId,
          slides: [],
        },
        {
          title: "Presentation 2",
          userId: mockUserId,
          slides: [],
        },
      ];

      Presentation.find.mockResolvedValue(mockPresentations);

      const res = await request(app).get(`/users/${mockUserId}/presentations`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        result: "success",
        presentations: mockPresentations,
      });
    });
  });

  describe("POST /users/:user_id/presentations", () => {
    it("should create a new presentation and return it", async () => {
      const mockTitle = "New Presentation";
      const mockSlide = {
        slideId: new mongoose.Types.ObjectId().toString(),
        objects: [],
        animationSeq: [],
      };

      Presentation.create.mockResolvedValue({
        title: mockTitle,
        userId: mockUserId,
        slides: [mockSlide],
      });

      const res = await request(app)
        .post(`/users/${mockUserId}/presentations`)
        .send({
          title: mockTitle,
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        result: "success",
        presentation: {
          title: mockTitle,
          userId: mockUserId,
          slides: [mockSlide],
        },
      });
    });
  });

  describe("DELETE /users/:user_id/presentations/:presentation_id", () => {
    it("should successfully delete a presentation", async () => {
      const mockPresentationId = new mongoose.Types.ObjectId().toString();

      Presentation.findByIdAndDelete.mockResolvedValue({
        _id: mockPresentationId,
        title: "Some Presentation",
        userId: mockUserId,
        slides: [],
      });

      const res = await request(app).delete(
        `/users/${mockUserId}/presentations/${mockPresentationId}`,
      );

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        result: "success",
        message: "Presentation successfully deleted",
      });
    });

    it("should return an error when trying to delete a non-existent presentation", async () => {
      const nonExistentPresentationId =
        new mongoose.Types.ObjectId().toString();

      Presentation.findByIdAndDelete.mockResolvedValue(null);

      const res = await request(app).delete(
        `/users/${mockUserId}/presentations/${nonExistentPresentationId}`,
      );

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({
        result: "error",
        message: "No presentation found to delete",
      });
    });
  });
});
