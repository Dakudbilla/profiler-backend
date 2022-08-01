import { Document } from 'mongoose';

/**
 * Describes the shape all Profile documents
 * Schema
 */
export default interface Profile extends Document {
    user: string;
    name: string;
    age: number;
    employment_status: string;
    skills: Skill[];
    bio: string;
    profile_image: string;
    experience: Experience[];
    education: Education[];
    certification?: Certification[];
    social_links?: Social;
}

export interface Education {
    school: string;
    from: Date;
    to?: Date;
    field_of_study: string;
    degree: string;
    current: boolean;
    description?: string;
}

export interface Experience {
    title: string;
    company: string;
    company_location: string;
    from: Date;
    to?: string;
    current: boolean;
    description: string;
}

export interface Certification {
    name: string;
    issuing_org: string;
    issue_date: Date;
    expiry_date?: Date;
    credential_url?: string;
}

export interface Skill {
    name: string;
    years_of_experience: number;
}

export interface Social {
    youtube?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
}
