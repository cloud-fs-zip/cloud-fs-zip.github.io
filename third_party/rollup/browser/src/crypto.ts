import sha1 from 'hash.js/lib/hash/sha/1.js';
// : {
// 	digest: (format: string) => string;
// 	update: (data: unknown) => void;
// } 
export const createHash = () => sha1();
