import mongoose from "mongoose";
export const userSchema = new mongoose.Schema({
  name: String,
  url: {
    url: String,
    public_id: String,
  },
  urls: [
    {
      url: String,
      public_id: String,
    },
  ],
});
