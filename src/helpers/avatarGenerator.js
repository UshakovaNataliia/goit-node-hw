const AvatarGenerator = require('avatar-generator')
const path = require('path')
const id = require('nanoid')
const avatar = new AvatarGenerator();
const variant = "male";

exports.avatarCreate = async function avatarCreate() {
    const image = await avatar.generate("email@example.com", variant);
    const point = path.join(__dirname, "../public/images/");
    const nameAvatar = `${id.nanoid(3)}.png`;
    image.png().toFile(`${point}${nameAvatar}`);
    return nameAvatar;
};