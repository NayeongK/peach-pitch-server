const mongoose = require("mongoose");
const {
  addObjectAnimation,
  deleteObjectAnimation,
} = require("../../controllers/animationController");

jest.mock("../../models/Presentation");
const Presentation = require("../../models/Presentation");

describe("AnimationController", () => {
  const mockPresentationId = new mongoose.Types.ObjectId().toString();
  const mockSlideId = new mongoose.Types.ObjectId().toString();
  const mockObjectId = new mongoose.Types.ObjectId().toString();
  const mockAnimationType = "mockAnimationType";

  describe("POST /user/:userId/presentation/:presentationId/slide/:slideId/object/:objectId", () => {
    it("should add an animation when presentation, slide, and object exist", async () => {
      const mockSlide = {
        objects: {
          id: jest.fn().mockReturnValueOnce({
            _id: mockObjectId,
            currentAnimation: null,
          }),
        },
        animationSequence: [],
      };

      const mockPresentation = {
        slides: {
          id: jest.fn().mockReturnValueOnce(mockSlide),
        },
        save: jest.fn(),
      };

      Presentation.findById.mockResolvedValueOnce(mockPresentation);

      const reqMock = {
        params: {
          presentation_id: mockPresentationId,
          slide_id: mockSlideId,
          object_id: mockObjectId,
        },
        body: { animationType: mockAnimationType },
      };

      const resMock = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await addObjectAnimation(reqMock, resMock, () => {});

      expect(resMock.json).toHaveBeenCalledWith({
        result: "success",
        message: "Animation successfully added",
        animationSequence: expect.any(Array),
      });
    });
  });

  describe("DELETE /user/:userId/presentation/:presentationId/slide/:slideId/object/:objectId/animation", () => {
    it("should delete the animation from the object and remove it from animation sequence", async () => {
      const mockPresentation = {
        slides: {
          id: jest.fn().mockReturnValueOnce({
            objects: {
              id: jest.fn().mockReturnValueOnce({
                _id: mockObjectId,
                currentAnimation: mockAnimationType,
              }),
            },
            animationSequence: [
              {
                objectId: mockObjectId,
                animationEffect: mockAnimationType,
              },
            ],
          }),
        },
        save: jest.fn(),
      };

      Presentation.findById.mockResolvedValueOnce(mockPresentation);

      const reqMock = {
        params: {
          presentation_id: mockPresentationId,
          slide_id: mockSlideId,
          object_id: mockObjectId,
        },
      };

      const resMock = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await deleteObjectAnimation(reqMock, resMock, () => {});

      expect(resMock.json).toHaveBeenCalledWith({
        result: "success",
        message:
          "Animation successfully deleted, and was removed from animation sequence",
      });
    });
  });
});
