import * as openpgp from 'openpgp';
import {promises as fs} from 'fs';
import * as path from 'path';

export async function encryptForMultipleRecipientsFromFolder(
    messageText: string,
    publicKeyFolderPath: string,
    perm: number
): Promise<string> {
    // 收集当前等级及更高等级的所有公钥
    const allPublicKeys: openpgp.Key[] = [];

    // 从等级1开始收集到当前等级的所有公钥
    for (let level = perm; ; level++) {
        const levelPath = path.join(publicKeyFolderPath, `level${level}`);

        try {
            // 检查目录是否存在
            await fs.access(levelPath);
            const files: string[] = await fs.readdir(levelPath);

            // 过滤出可能是公钥文件的扩展名
            const keyFiles: string[] = files.filter(file =>
                file.endsWith('.asc') || file.endsWith('.pgp')
            );

            // 读取并解析所有公钥
            const levelPublicKeys: openpgp.Key[] = await Promise.all(
                keyFiles.map(async (filename) => {
                    const filePath = path.join(levelPath, filename);
                    const armoredKey: string = await fs.readFile(filePath, 'utf8');
                    const key: openpgp.Key = await openpgp.readKey({ armoredKey });
                    return key;
                })
            );

            allPublicKeys.push(...levelPublicKeys);
        } catch (error) {
            // 如果目录不存在，跳过这个等级
            console.warn(`Level ${level} directory not found, skipping...`);
            break;
        }
    }

    if (allPublicKeys.length === 0) {
        throw new Error(`No public keys found for permission levels${perm}+`);
    }

    console.log(`Encrypting for permission level${perm}+ with ${allPublicKeys.length} public keys`);

    // 创建加密消息
    const message = await openpgp.createMessage({ text: messageText });

    // 加密
    return await openpgp.encrypt({
        message,
        encryptionKeys: allPublicKeys,
    });
}
