import { Schema, model } from 'mongoose';
import Post from '@/resources/post/post.interface';

/**
 * Models the kind of data allowed to create a Post to database
 */
const PostSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

//Create post collection in databse according to the schema(shaped according to Post interface)
export default model<Post>('Post', PostSchema);
