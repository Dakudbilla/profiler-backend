import { Document } from 'mongoose';

/**
 * Describes the shape all Post documents
 * Schema
 */
export default interface Post extends Document {
    title: string;
    body: string;
}
