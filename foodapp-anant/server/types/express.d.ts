/// <reference types="multer" />

// This file extends the default Express Request interface.

// We are telling TypeScript that we are adding our own properties to the Express module.
declare global {
  namespace Express {
    export interface Request {
      // This tells TypeScript that the Request object can have an 'id' property which is a string.
      id?: string;

      // This tells TypeScript that the Request object can also have a 'file' property.
      // The Express.Multer.File type is made available by the triple-slash directive above.
      file?: Express.Multer.File;
    }
  }
}

// You must export something to make this file a module.
export {};
