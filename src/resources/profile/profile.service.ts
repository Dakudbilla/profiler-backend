import ProfileModel from '@/resources/profile/profile.model';
import Profile from '@/resources/profile/profile.interface';
import HttpException from '@/utils/exceptions/http.exception';

class ProfileService {
    private profileModel = ProfileModel;
    /**
     * Create a new Profile
     */
    public async create(profile: Profile): Promise<Profile> {
        try {
            const newprofile = await this.profileModel.create(profile);
            return newprofile;
        } catch (error: any) {
            throw new HttpException(400, error.message);
        }
    }

    /**
     * Update a Profile
     */
    public async update(
        profile: Profile,
        profileId: string
    ): Promise<Profile | void> {
        try {
            const updated_profile = await ProfileModel.findById(profileId);

            if (!updated_profile) {
                throw new HttpException(400, 'Profile not Found');
            }
            const {
                employment_status,
                profile_image,
                bio,
                skills,
                education,
                certification,
                experience,
                social,
            } = profile;
            if (employment_status)
                updated_profile.employment_status = employment_status;
            if (profile_image) updated_profile.profile_image = profile_image;
            if (bio) updated_profile.bio = bio;
            if (social) {
                updated_profile.social = social;
            }
            if (experience) {
                // experience.map((exp) => {
                // //Find index of experience to be updated
                // const expToUpdate= profile.experience.findIndex((myexp)=>myexp.id===exp.id)

                // //if the experience already exists, update the relevant fields otherwise create new experience
                // if (expToUpdate!==-1) {
                //     profile.experience[expToUpdate]={...profile.experience[expToUpdate],...exp}
                // }else{
                //     profile.experience = [...profile.experience,exp];
                // }
                // });
                updated_profile.experience = experience;
            }
            if (education) updated_profile.education = education;
            if (certification) updated_profile.certification = certification;
            if (skills) updated_profile.skills = skills;

            await updated_profile.save();
            return updated_profile;
        } catch (error: any) {
            throw new HttpException(400, error.message);
        }
    }

    /**
     * Get all Profiles
     */

    public async getAll(): Promise<Profile[]> {
        try {
            const profiles = await ProfileModel.find().populate('user', [
                'name',
                'age',
            ]);
            return profiles;
        } catch (error: any) {
            throw new HttpException(400, error.message);
        }
    }
    /**
     * Get single Profile
     */

    public async getSingle(profileId: String): Promise<Profile> {
        try {
            const profile = await ProfileModel.findById(profileId).populate(
                'user',
                ['name', 'age']
            );
            if (profile) {
                return profile;
            }
            throw new HttpException(400, 'Profile Not Found');
        } catch (error: any) {
            throw new HttpException(400, error.message);
        }
    }

    /**
     * Delete single Profile
     */

    public async delete(profileId: String): Promise<string> {
        try {
            await ProfileModel.findOneAndDelete(profileId);
            return `${profileId} deleted succesfully`;
        } catch (error: any) {
            throw new HttpException(400, error.message);
        }
    }
}

export default ProfileService;
