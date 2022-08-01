import mongoose, { Schema, model } from 'mongoose';
import Profile from '@/resources/profile/profile.interface';

/**
 * Models the kind of data allowed to create a Post to database
 */
const ProfileSchema = new Schema(
    {
        /**
         * TODO: Use Mongoose Populate to fill in the name and age from user
         * and then remove name and age from schema
         * Help link: https://mongoosejs.com/docs/typescript/populate.html
         */
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        employment_status: { type: String },
        skills: [
            {
                name: {
                    type: String,
                    required: true,
                },
                years_of_experience: {
                    type: Number,
                },
            },
        ],
        bio: { type: String },
        profile_image: { type: String },
        experience: [
            {
                title: {
                    type: String,
                    required: true,
                },
                company: {
                    type: String,
                    required: true,
                },
                location: { type: String },
                from: { type: Date, required: true },
                to: {
                    type: Date,
                },
                current: {
                    type: Boolean,
                    default: false,
                },
                description: {
                    type: String,
                },
            },
        ],
        education: [
            {
                school: {
                    type: String,
                    required: true,
                },
                degree: {
                    type: String,
                    required: true,
                },
                fieldofstudy: {
                    type: String,
                    required: true,
                },
                from: {
                    type: Date,
                    required: true,
                },
                to: {
                    type: Date,
                },
                current: {
                    type: Boolean,
                    default: false,
                },
                description: {
                    type: String,
                },
            },
        ],
        certification: [
            {
                name: {
                    type: String,
                    required: true,
                },
                issuing_org: {
                    type: String,
                    required: true,
                },
                issue_date: {
                    type: Date,
                },
                expiry_date: {
                    type: Date,
                },
                credential_url: {
                    type: String,
                },
            },
        ],
        social: {
            youtube: {
                type: String,
            },
            facebook: {
                type: String,
            },
            twitter: {
                type: String,
            },
            linkedin: {
                type: String,
            },
            instagram: {
                type: String,
            },
        },
    },
    {
        timestamps: true,
    }
);

//Create profile collection in databse according to the schema(shaped according to Profile interface)
export default model<Profile>('Profile', ProfileSchema);
