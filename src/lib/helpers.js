const bcryptj =  require('bcryptjs'),
    helpers    =  {};

    helpers.encryptPassword = async(password) => {
        const sal  = await bcryptj.genSalt(10),
              hash = await bcryptj.hash(password, sal);
        return hash;
    };

    helpers.matchPassword = async(password, savedPassword) => {
        try {
           return await bcryptj.compare(password, savedPassword);                    
        } catch (error) {
            console.log(error)
        }
    }

module.exports = helpers;