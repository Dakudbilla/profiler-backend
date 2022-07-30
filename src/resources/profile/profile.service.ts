import ProfileModel from '@/resources/profile/profile.model';
import Profile from './profile.interface';

class PostService {
    private post = ProfileModel;
    /**
     * Create a new Post
     */
    public async create(title: string, body: string): Promise<Profile> {
        try {
            const post = await this.post.create({ title, body });

            return post;
        } catch (error) {
            throw new Error('Unable to create post');
        }
    }
}

export default PostService;
