import { path7za } from '7zip-bin';
import Seven from 'node-7z';
import { execSync } from 'child_process';
const { extractFull } = Seven;
const isLinux = process.platform === 'linux';

export default async function unzip(zipPath, outputPath) {
  const zipStream = extractFull(zipPath, outputPath, {
    $bin: path7za,
    overwrite: 'a',
  });

  return new Promise((resolve) => {
    zipStream.once('end', () => {
      if (isLinux)
        execSync(`convmv -f shift_jis -t utf8 -r --notest ${outputPath}`);
      resolve();
    });
  });
}
