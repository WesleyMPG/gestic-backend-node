require('dotenv/config');

const ProjectRepository = require('../repository/Project')

class Project {
    constructor() {
        this.projectRepository = new ProjectRepository();
        
    }

   insertProject = async ({
      name,
      description,
      userId
   }) => {
       try {
           
           
       } catch (err) {
           throw err;
       }
   }

    register = async ({
        tag,
        name,
        cpf,
        email,
        password
    }) => {
        try {
            const profile = await this.profileRepository.getRow({ tag });

            if (!profile) throw new Error('Invalid tag.');

            const createdUser = await this.userRepository.insertRow({
                profileId: profile.id,
                name,
                cpf,
                email,
                password
            });

            return createdUser;
        } catch (err) {
            throw err;
        }
    }
    
}

module.exports = Project;