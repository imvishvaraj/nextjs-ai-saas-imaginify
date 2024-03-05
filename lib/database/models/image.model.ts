import { Document, Schema, model, models } from "mongoose";


export interface IImage extends Document {
    title: string;
    transformationType: string;
    publicId: string;
    secureURL: string;
    width?: number; // Optional since width is not marked as required
    height?: number; // Optional since height is not marked as required
    config?: any; // Object type in Schema, but could be more specific if the shape of config is known
    transformationURL?: string; // Optional since transformationURL is not marked as required
    aspectRatio?: string; // Optional since aspectRatio is not marked as required
    color?: string; // Optional since color is not marked as required
    prompt?: string; // Optional since prompt is not marked as required
    author: {
        _id: string;
        firstName: string;
        lastName: string;
    } // Using ObjectId type from MongoDB
    createdAt?: Date; // Default value is provided, so it's automatically set but can be optional in interface
    updatedAt?: Date; // Default value is provided, so it's automatically set but can be optional in interface
}

const ImageSchema = new Schema({
    title: { type: String, required: true },
    transformationType: { type: String, required: true },
    publicId: { type: String, required: true },
    secureURL: { type: String, required: true },
    width: { type: Number },
    height: { type: Number },
    config: { type: Object },
    transformationURL: { type: String },
    aspectRatio: { type: String },
    color: { type: String },
    prompt: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Image = models?.Image || model('Image', ImageSchema);

export default Image;