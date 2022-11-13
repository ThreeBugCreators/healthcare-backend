import bcrypt from 'bcryptjs';

const hash = async rawPassword => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(rawPassword, salt);
};

const compare = async (rawPassword, hashedPassword) => (
    await bcrypt.compare(rawPassword, hashedPassword)
);

const Hasher = {
    hash,
    compare,
};

export default Hasher;
