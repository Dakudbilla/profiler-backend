import Joi from 'joi';

const social = Joi.object({
    youtube: Joi.string().min(5),
    facebook: Joi.string().min(5),
    twitter: Joi.string().min(5),
    linkedin: Joi.string().min(5),
    instagram: Joi.string().min(5),
});

const skill = Joi.object({
    name: Joi.string().min(4),
    years_of_experience: Joi.number().min(0).max(90),
});

const experience = Joi.object({
    title: Joi.string().min(4),
    company: Joi.string().min(4),
    company_location: Joi.string().min(4),
    from: Joi.date(),
    to: Joi.date(),
    current: Joi.bool(),
    description: Joi.string().min(4),
});
const certification = Joi.object({
    name: Joi.string().min(2),
    issuing_org: Joi.string(),
    expiry_date: Joi.date(),
    issuing_date: Joi.date(),
    credential_url: Joi.string(),
});

const education = Joi.object({
    school: Joi.string().min(2),
    from: Joi.date(),
    to: Joi.date(),
    field_of_study: Joi.string().min(2),
    degree: Joi.string().min(2),
    current: Joi.bool(),
    description: Joi.string().min(4),
});

const constantFields = Joi.object({
    user: Joi.string().min(9),
    name: Joi.string().min(1),
    age: Joi.number().min(10),
    employment_status: Joi.string().min(2),
    bio: Joi.string().min(8).required(),
    profile_image: Joi.string().min(3),
});
/**
 * Validate data that will be passed for creating a post
 */
const create = Joi.object({
    user: Joi.string().min(9),
    name: Joi.string().min(1),
    age: Joi.number().min(10),
    employment_status: Joi.string().min(2),
    bio: Joi.string().min(8).required(),
    profile_image: Joi.string().min(3),

    skills: Joi.array()
        .items(
            Joi.object({
                name: Joi.string().min(1),
                years_of_experience: Joi.number().min(0).max(90),
            })
        )
        .required(),
    experience: Joi.array().items(
        Joi.object({
            title: Joi.string().min(4),
            company: Joi.string().min(4),
            company_location: Joi.string().min(4),
            from: Joi.date(),
            to: Joi.date(),
            current: Joi.bool(),
            description: Joi.string().min(4),
        })
    ),
    education: Joi.array().items(
        Joi.object({
            school: Joi.string().min(2),
            from: Joi.date(),
            to: Joi.date(),
            field_of_study: Joi.string().min(2),
            degree: Joi.string().min(2),
            current: Joi.bool(),
            description: Joi.string().min(4),
        })
    ),
    certification: Joi.array().items(
        Joi.object({
            name: Joi.string().min(2),
            issuing_org: Joi.string(),
            expiry_date: Joi.date(),
            issuing_date: Joi.date(),
            credential_url: Joi.string(),
        })
    ),
    social: Joi.object({
        youtube: Joi.string().min(5),
        facebook: Joi.string().min(5),
        twitter: Joi.string().min(5),
        linkedin: Joi.string().min(5),
        instagram: Joi.string().min(5),
    }),
});

const update = create;

export default { create, update };
