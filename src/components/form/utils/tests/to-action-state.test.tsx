import { describe, expect,it } from "vitest";
import { ZodError, ZodIssue } from "zod";
import { ActionState, fromErrorToActionState, toActionState } from "../to-action-state";

describe("toActionState", () => {
    it("returns an ActionState", () => {
        const expected: ActionState = {
            status: "SUCCESS",
            message: "Test message",
            fieldErrors: {},
            timestamp: Date.now(),
        }

        const actual = toActionState("SUCCESS", "Test message");
        expect(actual.status).toEqual(expected.status);
        expect(actual.message).toEqual(expected.message);
        expect(actual.fieldErrors).toEqual({});
    });
});

describe("fromErrorToActionState", () => {
    it("returns an ActionState from a ZodError", () => {
        const issues: ZodIssue[] = [
            {
                code: "invalid_type",
                expected: "string",
                received: "number",
                path: ["username"],
                message: "Username must be a string",
            },
            {
                code: "too_small",
                minimum: 8,
                type: "string",
                inclusive: true,
                path: ["password"],
                message: "Password must be at least 8 characters",
            },
        ];
        const zodError = new ZodError(issues);
        
        const expected: ActionState = {
            status: "ERROR",
            message: zodError.errors[0].message,
            payload: undefined,
            fieldErrors: {
                username: ["Username must be a string"],
                password: ["Password must be at least 8 characters"],
            },
            timestamp: expect.any(Number),
        };

        const actual = fromErrorToActionState(zodError);
        expect(actual.status).toEqual(expected.status);
        expect(actual.message).toEqual(expected.message);
        expect(actual.fieldErrors).toEqual(expected.fieldErrors);
    });

    it("returns an ActionState from a generic Error", () => {
        const error = new Error("Generic error");
        const expected: ActionState = {
            status: "ERROR",
            message: error.message,
            payload: undefined,
            fieldErrors: {},
            timestamp: Date.now(),
        };

        const actual = toActionState("ERROR", error.message);
        expect(actual.status).toEqual(expected.status);
        expect(actual.message).toEqual(expected.message);
        expect(actual.fieldErrors).toEqual(expected.fieldErrors);
    });

    it("returns an ActionState from an unknown error", () => {
        const error = "Unknown error";
        const expected: ActionState = {
            status: "ERROR",
            message: "An unknown error occurred",
            payload: undefined,
            fieldErrors: {},
            timestamp: Date.now(),
        };

        const actual = fromErrorToActionState(error);
        expect(actual.status).toEqual(expected.status);
        expect(actual.message).toEqual(expected.message);
        expect(actual.fieldErrors).toEqual(expected.fieldErrors);
    });
});

